import { StereoBuffer } from '../core/types.js';
import { decodeWav } from '../formats/wav.js';
import { decodeAiff } from '../formats/aiff.js';
import { decodeFlacVerbatim } from '../formats/flac.js';
import { decodeFlacBundled, decodeMp3Bundled, decodeOggOpusBundled, decodeOggVorbisBundled } from '../formats/codecAdapters.js';
import { decodeWebmOpusBundled } from '../formats/webmOpus.js';

const banned = /\.(m4a|aac|mp4)$/i;
const MAX_IMPORT_BYTES = 256 * 1024 * 1024;
const text = new TextDecoder('latin1');

export function allowedAudioName(name: string) { return /\.(wav|wave|aif|aiff|flac|mp3|ogg|oga|opus|webm)$/i.test(name) && !banned.test(name); }
function starts(bytes: Uint8Array, value: string, offset = 0) { return bytes.length >= offset + value.length && text.decode(bytes.subarray(offset, offset + value.length)) === value; }
function oggCodec(bytes: Uint8Array) {
  if (!starts(bytes, 'OggS')) throw new Error('Ogg import requires an Ogg capture pattern');
  const probe = text.decode(bytes.subarray(0, Math.min(bytes.length, 65_536)));
  if (probe.includes('OpusHead')) return 'opus';
  if (probe.includes('\x01vorbis')) return 'vorbis';
  throw new Error('Unsupported Ogg codec: only Opus and Vorbis are guaranteed');
}

export async function decodeAudioBytes(bytes: Uint8Array, name: string, mime = ''): Promise<StereoBuffer> {
  if (!(bytes instanceof Uint8Array) || !bytes.length) throw new Error('Audio import is empty');
  if (bytes.length > MAX_IMPORT_BYTES) throw new Error('Audio import exceeds the 256 MiB safety limit');
  if (banned.test(name) || /aac|mp4/i.test(mime)) throw new Error('AAC/M4A is intentionally unsupported');
  if (/\.wav$|\.wave$/i.test(name) || /audio\/wav/i.test(mime) || starts(bytes, 'RIFF')) return decodeWav(bytes);
  if (/\.aif$|\.aiff$/i.test(name) || /audio\/(aiff|x-aiff)/i.test(mime) || starts(bytes, 'FORM')) return decodeAiff(bytes);
  if (/\.flac$/i.test(name) || /audio\/flac/i.test(mime) || starts(bytes, 'fLaC')) { try { return decodeFlacVerbatim(bytes); } catch { return decodeFlacBundled(bytes); } }
  if (/\.mp3$/i.test(name) || /audio\/mpeg/i.test(mime) || starts(bytes, 'ID3') || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0)) return decodeMp3Bundled(bytes);
  if (/\.(ogg|oga|opus)$/i.test(name) || /audio\/(ogg|opus)/i.test(mime) || starts(bytes, 'OggS')) return oggCodec(bytes) === 'opus' ? decodeOggOpusBundled(bytes) : decodeOggVorbisBundled(bytes);
  if (/\.webm$/i.test(name) || /audio\/webm/i.test(mime) || (bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3)) return decodeWebmOpusBundled(bytes);
  throw new Error('Unsupported audio container. Supported: WAV, AIFF, FLAC, MP3, Ogg Opus, Ogg Vorbis, and WebM Opus when its bundled demuxer is installed.');
}
