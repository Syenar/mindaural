import { StereoBuffer } from '../core/types.js';
import { FLACDecoder } from '@wasm-audio-decoders/flac';
import { OggVorbisDecoder } from '@wasm-audio-decoders/ogg-vorbis';
import { OggOpusDecoder } from 'ogg-opus-decoder';
import decodeMp3 from '@audio/decode-mp3';
import createMp3Encoder from '@audio/encode-mp3';
import { createOggEncoder } from 'wasm-media-encoders';

/** Pinned codec boundary: this code never calls a browser media decoder. */
const MAX_DECODED_FRAMES = 96_000_000;
type Decoded = { channelData: Float32Array[]; samplesDecoded: number; sampleRate: number; errors: unknown[] };

function stereo(decoded: Decoded, label: string): StereoBuffer {
  if (!Number.isInteger(decoded.sampleRate) || decoded.sampleRate < 1 || decoded.sampleRate > 384_000) throw new Error(`${label} decoder returned an invalid sample rate`);
  if (!Number.isInteger(decoded.samplesDecoded) || decoded.samplesDecoded < 0 || decoded.samplesDecoded > MAX_DECODED_FRAMES) throw new Error(`${label} decoder exceeded the safe frame limit`);
  if (decoded.errors?.length) throw new Error(`${label} decoder reported ${decoded.errors.length} stream error(s)`);
  const left = decoded.channelData?.[0], right = decoded.channelData?.[1] || left;
  if (!(left instanceof Float32Array) || !(right instanceof Float32Array) || left.length !== decoded.samplesDecoded || right.length !== decoded.samplesDecoded) throw new Error(`${label} decoder returned malformed PCM`);
  const outL = new Float32Array(left.length), outR = new Float32Array(right.length);
  for (let i = 0; i < left.length; i++) { outL[i] = Number.isFinite(left[i]) ? Math.max(-1, Math.min(1, left[i])) : 0; outR[i] = Number.isFinite(right[i]) ? Math.max(-1, Math.min(1, right[i])) : 0; }
  return { sampleRate: decoded.sampleRate, left: outL, right: outR, duration: outL.length / decoded.sampleRate };
}

export async function decodeFlacBundled(bytes: Uint8Array): Promise<StereoBuffer> { const decoder = new FLACDecoder(); try { await decoder.ready; return stereo(await decoder.decodeFile(bytes), 'FLAC'); } finally { decoder.free(); } }
export async function decodeOggVorbisBundled(bytes: Uint8Array): Promise<StereoBuffer> { const decoder = new OggVorbisDecoder(); try { await decoder.ready; return stereo(await decoder.decodeFile(bytes), 'Ogg Vorbis'); } finally { decoder.free(); } }
export async function decodeOggOpusBundled(bytes: Uint8Array): Promise<StereoBuffer> { const decoder = new OggOpusDecoder({ forceStereo: true }); try { await decoder.ready; return stereo(await decoder.decodeFile(bytes), 'Ogg Opus'); } finally { decoder.free(); } }

export async function decodeMp3Bundled(bytes: Uint8Array): Promise<StereoBuffer> {
  if (bytes.length < 4) throw new Error('MP3 stream is truncated');
  const result = await decodeMp3(bytes);
  return stereo({ channelData: result.channelData, samplesDecoded: result.channelData?.[0]?.length ?? 0, sampleRate: result.sampleRate, errors: [] }, 'MP3');
}

/** Isolated MIT libmp3lame-WASM boundary; emitted bytes are portable standard MP3. */
export async function encodeMp3Bundled(input: StereoBuffer, kbps = 192): Promise<Uint8Array> {
  if (input.left.length !== input.right.length || input.left.length < 1) throw new Error('MP3 export requires non-empty equal-length stereo PCM');
  if (!Number.isInteger(input.sampleRate) || input.sampleRate < 8_000 || input.sampleRate > 48_000) throw new Error('MP3 export supports 8–48 kHz sample rates');
  if (!Number.isInteger(kbps) || kbps < 32 || kbps > 320) throw new Error('MP3 bitrate must be 32–320 kbps');
  const encoder = await createMp3Encoder({ sampleRate: input.sampleRate, channels: 2, bitrate: kbps }), chunks = [encoder.encode([input.left, input.right]), encoder.flush()];
  encoder.free();
  const length = chunks.reduce((n, chunk) => n + chunk.length, 0); if (!length) throw new Error('MP3 encoder returned no bytes');
  const out = new Uint8Array(length); let offset = 0; for (const chunk of chunks) { out.set(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength), offset); offset += chunk.length; } return out;
}

/** MIT libvorbis/libogg WASM boundary for the Ogg/Vorbis export target. */
export async function encodeOggVorbisBundled(input: StereoBuffer, quality = 4): Promise<Uint8Array> {
  if (input.left.length !== input.right.length || input.left.length < 1) throw new Error('Ogg Vorbis export requires non-empty equal-length stereo PCM');
  if (!Number.isInteger(input.sampleRate) || input.sampleRate < 8_000 || input.sampleRate > 192_000) throw new Error('Ogg Vorbis sample rate is out of range');
  if (!Number.isFinite(quality) || quality < -1 || quality > 10) throw new Error('Ogg Vorbis quality must be between -1 and 10');
  const encoder: any = await (createOggEncoder as any)();
  encoder.configure({ sampleRate: input.sampleRate, channels: 2, vbrQuality: quality });
  const first = new Uint8Array(encoder.encode([input.left, input.right]));
  const last = new Uint8Array(encoder.finalize());
  const out = new Uint8Array(first.length + last.length); out.set(first); out.set(last, first.length);
  if (!out.length || String.fromCharCode(...out.slice(0, 4)) !== 'OggS') throw new Error('Ogg Vorbis encoder returned an invalid container');
  return out;
}
