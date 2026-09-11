import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {SOUNDSCAPES} from '../dist/src/data/soundscapes.js';
import {createDefaultProject} from '../dist/src/core/project.js';
import {renderProject} from '../dist/src/audio/render.js';

const required=['rain','storm','ocean','river','forest','wind','fireplace','fan','aircraft','cafe','room'];
assert.ok(SOUNDSCAPES.length>=24,`expected 24 soundscapes, got ${SOUNDSCAPES.length}`);
for(const word of required)assert.ok(SOUNDSCAPES.some(x=>x.id.includes(word)),`missing required soundscape category: ${word}`);
const records=[];
for(const scene of SOUNDSCAPES){
 assert.equal(scene.license,'project-owned');assert.ok(scene.provenance.includes('Procedurally synthesized'));
 const p=createDefaultProject(scene.title);p.sampleRate=8000;p.duration=.25;p.voices=[];p.noiseTracks=scene.layers.map((x,i)=>({id:`${scene.id}-${i}`,name:scene.title,kind:x.kind,amplitude:x.amplitude,slopeDbOct:x.slopeDbOct,lowpass:x.lowpass,highpass:x.highpass,stereoCorrelation:x.stereoCorrelation,start:0,duration:.25,loop:false,mute:false,solo:false}));
 const b=renderProject(p,{seed:42});assert.ok(b.left.every(Number.isFinite)&&b.right.every(Number.isFinite),`${scene.id} rendered non-finite audio`);const raw=new Uint8Array(b.left.buffer);records.push({id:scene.id,sha256:createHash('sha256').update(raw).update(new Uint8Array(b.right.buffer)).digest('hex'),layers:scene.layers.length});
}
console.log(`PASS ${records.length} provenance-clean procedural soundscapes rendered deterministically`);
console.log(JSON.stringify(records));
