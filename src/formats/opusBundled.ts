import OpusScript from 'opusscript';
import { StereoBuffer } from '../core/types.js';
import { OpusPacket, muxOggOpus, muxWebmOpus } from './opus.js';

function pcm16(input: StereoBuffer, start: number, count: number) {
  const out = new Int16Array(count * 2);
  for (let i = 0; i < count; i++) {
    const l = Number.isFinite(input.left[start + i]) ? Math.max(-1, Math.min(1, input.left[start + i])) : 0;
    const r = Number.isFinite(input.right[start + i]) ? Math.max(-1, Math.min(1, input.right[start + i])) : 0;
    out[i * 2] = Math.round(l * (l < 0 ? 32768 : 32767)); out[i * 2 + 1] = Math.round(r * (r < 0 ? 32768 : 32767));
  }
  return out;
}

/** Bundled libopus encoder. Input is resampled by the caller/render policy to 48 kHz. */
export function encodeOpusPacketsBundled(input: StereoBuffer, bitrate = 128_000): OpusPacket[] {
  if (input.sampleRate !== 48_000) throw new Error('Bundled Opus encoder requires a 48 kHz render buffer');
  if (input.left.length !== input.right.length || input.left.length < 1) throw new Error('Opus export requires non-empty equal-length stereo PCM');
  if (!Number.isInteger(bitrate) || bitrate < 6_000 || bitrate > 512_000) throw new Error('Opus bitrate is out of range');
  const encoder: any = new (OpusScript as any)(48_000, 2, (OpusScript as any).Application.AUDIO, { bitrate });
  const packets: OpusPacket[] = [];
  try {
    for (let start = 0; start < input.left.length; start += 960) {
      const count = Math.min(960, input.left.length - start), pcm = pcm16(input, start, 960), data = encoder.encode(new Uint8Array(pcm.buffer), 960);
      packets.push({ data: new Uint8Array(data), samples: count, timestampUs: Math.round(start / 48_000 * 1_000_000) });
    }
  } finally { encoder.delete(); }
  if (!packets.length) throw new Error('Bundled Opus encoder returned no packets');
  return packets;
}

export function encodeOggOpusBundled(input: StereoBuffer, bitrate = 128_000) { return muxOggOpus(encodeOpusPacketsBundled(input, bitrate), 2, 48_000); }
export function encodeWebmOpusBundled(input: StereoBuffer, bitrate = 128_000) { return muxWebmOpus(encodeOpusPacketsBundled(input, bitrate), 2, 48_000); }
