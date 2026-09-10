import assert from 'node:assert/strict';
import {createDefaultProject} from '../dist/src/core/project.js';
import {migrateSessionDocument} from '../dist/src/core/migrations.js';
import {createZip} from '../dist/src/formats/zip.js';
import {importProjectPackageDetailed,sha256} from '../dist/src/formats/projectPackage.js';

const p=createDefaultProject('Legacy');
p.sampleRate=44100; p.duration=12; p.voices[0].leftHz=392; p.voices[0].rightHz=402;
const legacy={schemaVersion:'0.9.0',project:p};
const migrated=migrateSessionDocument(legacy);
assert.equal(migrated.schemaVersion,'1.0.0');
assert.equal(migrated.sampleRatePolicy.offlineHz,44100);
assert.equal(migrated.tracks[0].voices[0].leftHz,392);
assert.equal(migrated.tracks[0].voices[0].rightHz,402);
assert.equal(migrated.migration.from,'0.9.0');
assert.throws(()=>migrateSessionDocument({schemaVersion:'9.0.0'}),/Unsupported session schema/);

const session=new TextEncoder().encode(JSON.stringify(legacy));
const manifest=new TextEncoder().encode(JSON.stringify({format:'bbeat',version:1,entries:[{path:'session.json',size:session.length,sha256:await sha256(session)}]}));
const imported=await importProjectPackageDetailed(createZip({'manifest.json':manifest,'session.json':session}));
assert.equal(imported.project.sampleRate,44100);
assert.equal(imported.project.voices[0].leftHz,392);
assert.equal(imported.project.voices[0].rightHz,402);
console.log('PASS 0.9 package migration preserves core signal fields');
