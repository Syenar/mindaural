import {spawnSync} from 'node:child_process';import {readFileSync,readdirSync,statSync} from 'node:fs';import {dirname,join,resolve} from 'node:path';import {fileURLToPath} from 'node:url';
const root=dirname(fileURLToPath(import.meta.url));
const tsc=resolve(root,'..','node_modules','typescript','bin','tsc');
const steps=[['TypeScript typecheck',process.execPath,[tsc,'-p','tsconfig.json','--noEmit']],['Clean build','node',['scripts/build.mjs']],['Runtime signal/file tests','node',['scripts/test.mjs']],['Headless browser smoke','node',['scripts/browser-smoke.mjs']],['Planning baseline','python',['tests/validate_planning_baseline.py']]];
let fail=0;for(const [name,cmd,args] of steps){console.log(`\n=== ${name} ===`);const r=spawnSync(cmd,args,{stdio:'inherit'});if(r.status!==0){console.error(`FAILED: ${name}`);fail++;break;}}
function walk(d){for(const n of readdirSync(d)){if(['dist','.git','node_modules'].includes(n))continue;const p=join(d,n);if(statSync(p).isDirectory())walk(p);else if(/\.(json|mjs|ts|tsx|js|md|yml|yaml)$/i.test(n)){const t=readFileSync(p,'utf8');if(p!==join(process.cwd(),'scripts','gauntlet.mjs') && /\b(?:TODO|FIXME)\b/.test(t)){console.error(`Unresolved marker: ${p}`);fail++;}}}}
walk(process.cwd());console.log(`\nGAUNTLET ${fail?'FAILED':'PASS'}`);process.exit(fail?1:0);
