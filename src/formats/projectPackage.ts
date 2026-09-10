import {Project} from '../core/types.js';
import {deserializeSession,serializeSession} from '../core/sessionSchema.js';
import {migrateSessionDocument} from '../core/migrations.js';
import {signBytes,verifyBytes} from '../security/signing.js';
import {createZip,readStoredZip} from './zip.js';

const te=new TextEncoder(),td=new TextDecoder();
const MAX_PACKAGE_BYTES=256*1024*1024,MAX_SESSION_BYTES=4*1024*1024;
export type PackageSignatureState='unsigned'|'valid'|'invalid';
export interface PackageSigner{publicKey:string;privateKey:string;}
export interface PackageSignature{version:1;algorithm:'Ed25519';signedPath:'manifest.json';publicKey:string;signature:string;}

export async function sha256(b:Uint8Array){const copy=new Uint8Array(b);const h=await crypto.subtle.digest('SHA-256',copy.buffer);return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('');}

export async function exportProjectPackage(project:Project,assetBytes:Record<string,Uint8Array>={},signer?:PackageSigner){
 const normalized=structuredClone(project); for(const a of normalized.assets){const bytes=assetBytes[a.id];if(bytes)a.hash=await sha256(bytes);}
 const session=te.encode(JSON.stringify(serializeSession(normalized),null,2));
 const entries:Record<string,Uint8Array|string>={'session.json':session,'provenance.json':JSON.stringify(normalized.provenance,null,2)};
 const manifestEntries:any[]=[{path:'session.json',sha256:await sha256(session),size:session.length}];
 for(const a of normalized.assets){const bytes=assetBytes[a.id];if(!bytes)continue;const path=`assets/${a.id}`;entries[path]=bytes;manifestEntries.push({path,sha256:await sha256(bytes),size:bytes.length,mediaType:a.mime,license:a.license});}
 const manifest={format:'bbeat',version:1,schemaVersion:'1.0.0',createdAt:new Date().toISOString(),entries:manifestEntries};
 const manifestBytes=te.encode(JSON.stringify(manifest,null,2)); entries['manifest.json']=manifestBytes;
 if(signer){const sig:PackageSignature={version:1,algorithm:'Ed25519',signedPath:'manifest.json',publicKey:signer.publicKey,signature:await signBytes(manifestBytes,signer.privateKey)};entries['signature.json']=JSON.stringify(sig,null,2);}
 return createZip(entries);
}

export async function importProjectPackageDetailed(bytes:Uint8Array):Promise<{project:Project;assets:Record<string,Uint8Array>;signature:{state:PackageSignatureState;publicKey?:string;reason?:string}}> {
 if(bytes.length>MAX_PACKAGE_BYTES)throw new Error('Package exceeds the 256 MiB import limit');
 const e=readStoredZip(bytes);
 if(!e['manifest.json']||!e['session.json'])throw new Error('Invalid .bbeat package');
 if(e['session.json'].length>MAX_SESSION_BYTES)throw new Error('Session metadata exceeds the 4 MiB import limit');
 let manifest:any; try{manifest=JSON.parse(td.decode(e['manifest.json']));}catch{throw new Error('Invalid package manifest JSON');}
 if(manifest.format!=='bbeat'||manifest.version!==1)throw new Error('Unsupported .bbeat version');
 if(!Array.isArray(manifest.entries)||manifest.entries.length>256)throw new Error('Invalid package manifest entries');
 for(const item of manifest.entries){if(!item||typeof item.path!=='string'||!Number.isSafeInteger(item.size)||item.size<0||typeof item.sha256!=='string')throw new Error('Invalid package manifest entry');const data=e[item.path];if(!data)throw new Error(`Missing package entry: ${item.path}`);if(data.length!==item.size||await sha256(data)!==item.sha256)throw new Error(`Project integrity check failed: ${item.path}`);}
 let signature:{state:PackageSignatureState;publicKey?:string;reason?:string}={state:'unsigned'};
 if(e['signature.json']){try{const sig=JSON.parse(td.decode(e['signature.json'])) as PackageSignature;if(sig.version!==1||sig.algorithm!=='Ed25519'||sig.signedPath!=='manifest.json'||!sig.publicKey||!sig.signature)throw new Error('Unsupported signature metadata');const ok=await verifyBytes(e['manifest.json'],sig.signature,sig.publicKey);signature=ok?{state:'valid',publicKey:sig.publicKey}:{state:'invalid',publicKey:sig.publicKey,reason:'Signature verification failed'};}catch(err){signature={state:'invalid',reason:err instanceof Error?err.message:String(err)};}}
 let raw:any;try{raw=JSON.parse(td.decode(e['session.json']));}catch{throw new Error('Invalid session JSON');}
 const project=deserializeSession(migrateSessionDocument(raw)),assets:Record<string,Uint8Array>={};
 for(const a of project.assets){const path=`assets/${a.id}`;if(e[path])assets[a.id]=e[path];}
 return {project,assets,signature};
}
export async function importProjectPackage(bytes:Uint8Array):Promise<Project>{return (await importProjectPackageDetailed(bytes)).project;}
