import OpusScript from 'opusscript';
import { StereoBuffer } from '../core/types.js';

const MAX_BYTES = 256 * 1024 * 1024, EBML = 0x1a45dfa3, SEGMENT = 0x18538067, TRACKS = 0x1654ae6b, TRACK_ENTRY = 0xae, CLUSTER = 0x1f43b675, SIMPLE_BLOCK = 0xa3, TIMECODE = 0xe7, CODEC_ID = 0x86, CODEC_PRIVATE = 0x63a2, TIMECODE_SCALE = 0x2ad7b1;
function idValue(a: Uint8Array, start: number, len: number) { let n = 0; for (let i = 0; i < len; i++) n = n * 256 + a[start + i]; return n; }
function vint(a: Uint8Array, start: number, mask = true) { const first = a[start]; if (!first) throw new Error('Invalid EBML variable integer'); let len = 1; while (len <= 8 && !(first & (1 << (8 - len)))) len++; if (len > 8 || start + len > a.length) throw new Error('Truncated EBML variable integer'); let n = first & (mask ? (0xff >>> len) : 0xff); for (let i = 1; i < len; i++) n = n * 256 + a[start + i]; return { value: n, length: len }; }
function element(a: Uint8Array, start: number, end: number) { const id = vint(a, start, false), size = vint(a, start + id.length); const dataStart = start + id.length + size.length, dataEnd = dataStart + size.value; if (dataEnd > end || dataEnd > a.length) throw new Error('Truncated EBML element'); return { id: id.value, dataStart, dataEnd, next: dataEnd }; }
function text(a: Uint8Array, s: number, e: number) { return new TextDecoder().decode(a.subarray(s, e)); }
function uint(a: Uint8Array, s: number, e: number) { return idValue(a, s, e - s); }

export interface WebmOpusPacket { data: Uint8Array; timestampUs: number; samples: number; }
export function demuxWebmOpus(bytes: Uint8Array): { packets: WebmOpusPacket[]; sampleRate: number; channels: number; preSkip: number } {
  if (!(bytes instanceof Uint8Array) || bytes.length < 4 || bytes.length > MAX_BYTES || idValue(bytes, 0, 4) !== EBML) throw new Error('Not a safe WebM/EBML stream');
  let sampleRate = 48_000, channels = 2, preSkip = 0, scale = 1_000_000, track = 1, opusTrack = 1, clusterTime = 0; const packets: WebmOpusPacket[] = [];
  const walk = (s: number, e: number, parent = 0) => { for (let p = s; p < e;) { const x = element(bytes, p, e); p = x.next;
    if (x.id === SEGMENT || x.id === EBML || x.id === TRACKS || x.id === TRACK_ENTRY || x.id === CLUSTER) { walk(x.dataStart, x.dataEnd, x.id); continue; }
    if (parent === TRACK_ENTRY && x.id === 0xd7) track = uint(bytes, x.dataStart, x.dataEnd);
    else if (parent === TRACK_ENTRY && x.id === 0x83 && uint(bytes, x.dataStart, x.dataEnd) !== 2) { /* non-audio track */ }
    else if (parent === TRACK_ENTRY && x.id === CODEC_ID && text(bytes, x.dataStart, x.dataEnd) !== 'A_OPUS') throw new Error('WebM track is not Opus');
    else if (parent === TRACK_ENTRY && x.id === CODEC_PRIVATE) { if (x.dataEnd - x.dataStart < 19 || text(bytes, x.dataStart, x.dataStart + 8) !== 'OpusHead') throw new Error('Invalid WebM OpusHead'); channels = bytes[x.dataStart + 9]; preSkip = bytes[x.dataStart + 10] | (bytes[x.dataStart + 11] << 8); }
    else if (parent === 0x1549a966 && x.id === TIMECODE_SCALE) scale = uint(bytes, x.dataStart, x.dataEnd);
    else if (parent === CLUSTER && x.id === TIMECODE) clusterTime = uint(bytes, x.dataStart, x.dataEnd);
    else if (parent === CLUSTER && x.id === SIMPLE_BLOCK) { const tr = vint(bytes, x.dataStart); if (tr.value !== opusTrack) continue; const tc = (bytes[x.dataStart + tr.length] << 8) | bytes[x.dataStart + tr.length + 1]; const signed = tc & 0x8000 ? tc - 0x10000 : tc; const payload = x.dataStart + tr.length + 3; if (payload >= x.dataEnd) throw new Error('Empty WebM Opus block'); packets.push({ data: bytes.slice(payload, x.dataEnd), timestampUs: Math.round((clusterTime + signed) * scale / 1000), samples: 960 }); }
  } };
  walk(0, bytes.length); if (!packets.length) throw new Error('WebM contains no Opus audio blocks'); packets.sort((a, b) => a.timestampUs - b.timestampUs); return { packets, sampleRate, channels, preSkip };
}

export function decodeWebmOpusBundled(bytes: Uint8Array): StereoBuffer {
  const demuxed = demuxWebmOpus(bytes); if (demuxed.sampleRate !== 48_000 || demuxed.channels !== 2) throw new Error('Bundled WebM Opus decoder supports 48 kHz stereo only');
  const decoder: any = new (OpusScript as any)(48_000, 2, (OpusScript as any).Application.AUDIO); const left: number[] = [], right: number[] = [];
  try { for (const packet of demuxed.packets) { const pcm = new Int16Array(decoder.decode(packet.data)); const frames = Math.min(packet.samples, Math.floor(pcm.length / 2)); for (let i = 0; i < frames; i++) { left.push(pcm[i * 2] / 32768); right.push(pcm[i * 2 + 1] / 32768); } } } finally { decoder.delete(); }
  const trim = Math.min(demuxed.preSkip, left.length), l = Float32Array.from(left.slice(trim)), r = Float32Array.from(right.slice(trim)); return { sampleRate: 48_000, left: l, right: r, duration: l.length / 48_000 };
}
