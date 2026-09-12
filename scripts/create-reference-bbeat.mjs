import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { basename, extname } from 'node:path';
import { exportProjectPackage } from '../dist/src/formats/projectPackage.js';
import { decodeWav, encodeWav } from '../dist/src/formats/wav.js';

const input = process.argv[2];
const output = process.argv[3];
if (!input || !output) throw new Error('Usage: node scripts/create-reference-bbeat.mjs INPUT.wav OUTPUT.bbeat');
const sourceName = basename(input), sourceTitle = basename(input, extname(input));

const sourceBytes = new Uint8Array(await readFile(input));
function readTag(bytes, offset) { return String.fromCharCode(...bytes.slice(offset, offset + 4)); }
function readPcm(bytes) {
  if (bytes.length < 44 || readTag(bytes, 0) !== 'RIFF' || readTag(bytes, 8) !== 'WAVE') throw new Error('Not a RIFF/WAVE file');
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let format = 0, channels = 0, sampleRate = 0, bits = 0, blockAlign = 0, dataOffset = -1, dataLength = 0;
  let p = 12;
  while (p + 8 <= bytes.length) {
    const id = readTag(bytes, p), length = view.getUint32(p + 4, true), body = p + 8;
    if (body + length > bytes.length) throw new Error(`Truncated WAV ${id} chunk`);
    if (id === 'fmt ') { format = view.getUint16(body, true); channels = view.getUint16(body + 2, true); sampleRate = view.getUint32(body + 4, true); blockAlign = view.getUint16(body + 12, true); bits = view.getUint16(body + 14, true); }
    if (id === 'data' && dataOffset < 0) { dataOffset = body; dataLength = length; }
    p = body + length + (length & 1);
  }
  if (format !== 1 || ![1, 2].includes(channels) || ![8, 16, 24, 32].includes(bits) || dataOffset < 0 || !sampleRate) throw new Error('Unsupported WAV encoding');
  const bytesPerSample = bits / 8;
  const expectedAlign = channels * bytesPerSample;
  if (dataLength % expectedAlign) throw new Error('Invalid WAV frame alignment');
  const frames = dataLength / expectedAlign, left = new Float32Array(frames), right = new Float32Array(frames);
  let o = dataOffset;
  const readSample = () => {
    let x;
    if (bits === 8) x = (view.getUint8(o) - 128) / 128;
    else if (bits === 16) x = view.getInt16(o, true) / 32768;
    else if (bits === 24) { let q = view.getUint8(o) | (view.getUint8(o + 1) << 8) | (view.getUint8(o + 2) << 16); if (q & 0x800000) q |= 0xff000000; x = q / 8388608; }
    else x = view.getInt32(o, true) / 2147483648;
    o += bytesPerSample;
    return Math.max(-1, Math.min(1, x));
  };
  for (let i = 0; i < frames; i++) {
    left[i] = readSample(); right[i] = channels === 1 ? left[i] : readSample();
  }
  return { sampleRate, left, right, duration: frames / sampleRate };
}
let decoded, bytes = sourceBytes, normalized = false;
try { decoded = decodeWav(sourceBytes); } catch (error) {
  decoded = readPcm(sourceBytes);
  bytes = encodeWav(decoded, 24);
  normalized = true;
}
const hash = createHash('sha256').update(bytes).digest('hex');
const assetId = `asset-${hash.slice(0, 20)}`;
const now = new Date().toISOString();
const project = {
  schemaVersion: '1.0.0',
  id: `reference-${hash.slice(0, 16)}`,
  title: `${sourceTitle} reference`,
  description: `Reference WAV ${sourceName} imported as an audio track; no procedural reconstruction claimed.`,
  duration: decoded.duration,
  sampleRate: decoded.sampleRate,
  masterGain: 1,
  voices: [],
  noiseTracks: [],
  audioTracks: [{
    id: `audio-${hash.slice(0, 16)}`,
    name: sourceName,
    assetId,
    start: 0,
    duration: decoded.duration,
    offset: 0,
    amplitude: 1,
    pan: 0,
    loop: false,
    fadeIn: 0,
    fadeOut: 0,
    mute: false,
    solo: false,
  }],
  assets: [{ id: assetId, name: sourceName, mime: normalized ? 'audio/wav' : 'audio/wav', size: bytes.length, hash, license: 'user-owned', source: 'local reference import' }],
  segments: [{ id: `segment-${hash.slice(0, 16)}`, name: 'Reference', start: 0, duration: decoded.duration, repeat: 1, crossfade: 0 }],
  markers: [],
  evidence: { state: 'Experimental', claim: 'Reference audio asset; no outcome is guaranteed.' },
  provenance: { author: 'Local user', createdAt: now, updatedAt: now, appVersion: '1.0.2', engineVersion: '1.0.2-webgpu', source: input },
  tags: ['reference', 'imported-audio', sourceTitle.toLowerCase()],
  revision: 1,
};

const packageBytes = await exportProjectPackage(project, { [assetId]: bytes });
await mkdir(new URL('../artifacts/', import.meta.url), { recursive: true });
await writeFile(output, packageBytes);
console.log(JSON.stringify({ input, output, bytes: packageBytes.length, duration: decoded.duration, sampleRate: decoded.sampleRate, assetHash: hash, normalizedMono: normalized }, null, 2));
