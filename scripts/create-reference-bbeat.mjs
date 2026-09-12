import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { exportProjectPackage } from '../dist/src/formats/projectPackage.js';

const input = process.argv[2];
const output = process.argv[3];
if (!input || !output) throw new Error('Usage: node scripts/create-reference-bbeat.mjs INPUT.wav OUTPUT.bbeat');

const bytes = new Uint8Array(await readFile(input));
const hash = createHash('sha256').update(bytes).digest('hex');
const assetId = `asset-${hash.slice(0, 20)}`;
const now = new Date().toISOString();
const decoded = await import('../dist/src/formats/wav.js').then(async ({ decodeWav }) => decodeWav(bytes));
const project = {
  schemaVersion: '1.0.0',
  id: `reference-${hash.slice(0, 16)}`,
  title: 'Quiet Stream with pretheta reference',
  description: 'Reference WAV imported as an audio track; no procedural reconstruction claimed.',
  duration: decoded.duration,
  sampleRate: decoded.sampleRate,
  masterGain: 1,
  voices: [],
  noiseTracks: [],
  audioTracks: [{
    id: `audio-${hash.slice(0, 16)}`,
    name: 'QuietStreamWith-pretheta.wav',
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
  assets: [{ id: assetId, name: 'QuietStreamWith-pretheta.wav', mime: 'audio/wav', size: bytes.length, hash, license: 'user-owned', source: 'local reference import' }],
  segments: [{ id: `segment-${hash.slice(0, 16)}`, name: 'Reference', start: 0, duration: decoded.duration, repeat: 1, crossfade: 0 }],
  markers: [],
  evidence: { state: 'Experimental', claim: 'Reference audio asset; no outcome is guaranteed.' },
  provenance: { author: 'Local user', createdAt: now, updatedAt: now, appVersion: '1.0.2', engineVersion: '1.0.2-webgpu', source: input },
  tags: ['reference', 'imported-audio', 'quiet-stream'],
  revision: 1,
};

const packageBytes = await exportProjectPackage(project, { [assetId]: bytes });
await mkdir(new URL('../artifacts/', import.meta.url), { recursive: true });
await writeFile(output, packageBytes);
console.log(JSON.stringify({ input, output, bytes: packageBytes.length, duration: decoded.duration, sampleRate: decoded.sampleRate, assetHash: hash }, null, 2));
