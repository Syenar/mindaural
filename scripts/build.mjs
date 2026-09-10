import { rm, mkdir, cp, copyFile, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
await rm('dist',{recursive:true,force:true});
// Resolve the local compiler explicitly. On Windows, spawnSync does not search
// npm's .bin shim unless a shell is involved, which previously made builds fail
// silently on a clean checkout.
const here = dirname(fileURLToPath(import.meta.url));
const tsc = resolve(here, '..', 'node_modules', 'typescript', 'bin', 'tsc');
const r=spawnSync(process.execPath,[tsc,'-p','tsconfig.json'],{stdio:'inherit'});
if(r.error) { console.error(r.error); process.exit(1); }
if(r.status!==0) process.exit(r.status??1);
const esbuild = process.platform === 'win32'
  ? resolve(here, '..', 'node_modules', '@esbuild', 'win32-x64', 'esbuild.exe')
  : resolve(here, '..', 'node_modules', 'esbuild', 'bin', 'esbuild');
const bundle = spawnSync(esbuild,['./src/main.tsx','--bundle','--format=iife','--outfile=./dist/app.bundle.js','--target=es2022','--log-level=warning'],{stdio:'inherit',cwd:resolve(here,'..')});
if(bundle.error) { console.error(bundle.error); process.exit(1); }
if(bundle.status!==0) process.exit(bundle.status??1);
await mkdir('dist/vendor',{recursive:true}); await mkdir('dist/public',{recursive:true});
for (const f of ['index.html','styles.css','app.webmanifest']) await copyFile(f,`dist/${f}`);
await cp('vendor','dist/vendor',{recursive:true}); await cp('public','dist/public',{recursive:true});
// Keep the standalone browser shell aligned with the hook-based source UI.
await copyFile('node_modules/react/umd/react.production.min.js','dist/vendor/react.production.min.js');
await copyFile('node_modules/react-dom/umd/react-dom.production.min.js','dist/vendor/react-dom.production.min.js');
console.log('Build complete: dist/');
