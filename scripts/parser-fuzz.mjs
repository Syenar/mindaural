import assert from 'node:assert/strict';
import {decodeWav,encodeWav} from '../dist/src/formats/wav.js';
import {decodeAiff,encodeAiff} from '../dist/src/formats/aiff.js';
import {createDefaultProject} from '../dist/src/core/project.js';
import {renderProject} from '../dist/src/audio/render.js';

const p=createDefaultProject('fuzz');p.duration=.03;p.voices[0].duration=.03;p.voices[0].fadeIn=0;p.voices[0].fadeOut=0;
const stereo=renderProject(p),wav=encodeWav(stereo,24),aiff=encodeAiff(stereo,24);
assert.equal(decodeWav(wav).left.length,stereo.left.length);assert.equal(decodeAiff(aiff).left.length,stereo.left.length);
for(const source of [wav,aiff])for(let i=0;i<200;i++){const n=(i*7919+17)%(source.length+1),x=source.slice(0,n);for(const decode of [decodeWav,decodeAiff]){try{const out=decode(x);assert.ok(Number.isFinite(out.duration));assert.ok(out.left.length<=96_000_000);}catch(err){assert.ok(err instanceof Error);}}}
const bad=wav.slice();new DataView(bad.buffer,bad.byteOffset,bad.byteLength).setUint32(4,0xffffffff,true);assert.throws(()=>decodeWav(bad),/Truncated RIFF/);
console.log('PASS PCM parser truncation fuzz and RIFF bounds checks');
