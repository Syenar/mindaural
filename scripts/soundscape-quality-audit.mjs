import assert from 'node:assert/strict';
import {SOUNDSCAPES} from '../dist/src/data/soundscapes.js';
import {createDefaultProject} from '../dist/src/core/project.js';
import {renderProject} from '../dist/src/audio/render.js';
import {stats} from '../dist/src/audio/analyze.js';

const records=[];
for(const scene of SOUNDSCAPES){
  const p=createDefaultProject(scene.title);p.sampleRate=8000;p.duration=.5;p.voices=[];
  p.noiseTracks=scene.layers.map((x,i)=>({id:`${scene.id}-${i}`,name:scene.title,kind:x.kind,amplitude:x.amplitude,slopeDbOct:x.slopeDbOct,lowpass:x.lowpass,highpass:x.highpass,stereoCorrelation:x.stereoCorrelation,start:0,duration:.5,loop:false,mute:false,solo:false}));
  const b=renderProject(p,{seed:42}),s=stats(b);
  assert.ok(b.left.every(Number.isFinite)&&b.right.every(Number.isFinite),`${scene.id}: non-finite sample`);
  assert.ok(!s.clipping&&s.peakLeft<.95&&s.peakRight<.95,`${scene.id}: insufficient headroom (${s.peakLeft}, ${s.peakRight})`);
  assert.ok(s.rmsLeft>0&&s.rmsRight>0,`${scene.id}: silent render`);
  assert.ok(Math.abs(s.dcLeft)<.1&&Math.abs(s.dcRight)<.1,`${scene.id}: excessive DC offset`);
  records.push({id:scene.id,peakLeft:Number(s.peakLeft.toFixed(6)),peakRight:Number(s.peakRight.toFixed(6)),rmsLeft:Number(s.rmsLeft.toFixed(6)),rmsRight:Number(s.rmsRight.toFixed(6)),correlation:Number(s.correlation.toFixed(6)),dcLeft:Number(s.dcLeft.toFixed(6)),dcRight:Number(s.dcRight.toFixed(6)),duration:b.duration});
}
console.log(`PASS ${records.length} soundscapes passed provisional render-quality checks (finite, headroom, audible, DC, stereo metrics)`);
console.log(JSON.stringify(records));
