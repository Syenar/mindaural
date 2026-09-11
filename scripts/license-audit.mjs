import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
assert.ok(existsSync(resolve(root,'THIRD_PARTY_NOTICES.txt')),'third-party notice inventory is missing');
const notices=readFileSync(resolve(root,'THIRD_PARTY_NOTICES.txt'),'utf8');
for(const name of ['@audio/decode-mp3','@audio/encode-mp3','@wasm-audio-decoders/flac','@wasm-audio-decoders/ogg-vorbis','ogg-opus-decoder','opusscript','react','react-dom']) assert.match(notices,new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
const pkg=JSON.parse(readFileSync(resolve(root,'package.json'),'utf8'));
for(const name of Object.keys({...pkg.dependencies,...pkg.devDependencies})){
 const meta=JSON.parse(readFileSync(resolve(root,'node_modules',...name.split('/'),'package.json'),'utf8'));
 assert.ok(meta.license,`missing license metadata for ${name}`);
 assert.doesNotMatch(String(meta.license),/GPL|AGPL|UNLICENSED/i,`unallowlisted package license ${name}: ${meta.license}`);
}
const controlled=['package.json','package-lock.json','src','scripts','supabase','docs','index.html'];
for(const part of controlled){const text=part==='package.json'||part==='package-lock.json'||part==='index.html'?readFileSync(resolve(root,part),'utf8'):'';assert.doesNotMatch(text,/ffmpeg/i,`prohibited FFmpeg reference in ${part}`);}
console.log('PASS license audit: notice inventory, installed package metadata, and controlled FFmpeg policy checks');
