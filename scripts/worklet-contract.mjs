import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source=readFileSync(new URL('../src/audio/worklet.ts',import.meta.url),'utf8');
const engine=readFileSync(new URL('../src/audio/liveEngine.ts',import.meta.url),'utf8');
const built=readFileSync(new URL('../public/worklet.js',import.meta.url),'utf8');
for(const term of ['class BinauralProcessor','registerProcessor','resolveVoiceFrame','phaseStep','nextNoiseStereo','audioTrackSample']) assert.match(source,new RegExp(term),`worklet contract missing ${term}`);
for(const forbidden of ['AudioEncoder','AudioDecoder','AudioContext','navigator','fetch(','localStorage','sessionStorage','requestAdapter','createBuffer']) assert.doesNotMatch(source,new RegExp(forbidden.replace(/[()]/g,'\\$&')),`real-time worklet contains forbidden operation ${forbidden}`);
assert.match(source,/for\(let vi=0;vi<p\.voices\.length;vi\+\+\)/,'protected voice path is explicitly rendered per voice');
assert.match(source,/for\(let ni=0;ni<p\.noiseTracks\.length;ni\+\+\)/,'background noise path is explicitly separate from voice rendering');
assert.match(engine,/outputChannelCount:\[2\]/,'live engine output must remain stereo');
assert.match(engine,/channelInterpretation='discrete'/,'live engine must preserve discrete channel routing');
assert.match(built,/registerProcessor\(['"]binaural-studio/,'generated worklet does not register the production processor');
assert.match(built,/resolveVoiceFrame/,'generated worklet omitted shared signal math');
console.log('PASS AudioWorklet contract: shared DSP, stateful phase, bounded real-time operations, and stereo routing present');
