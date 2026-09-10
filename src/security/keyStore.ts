import {createSigningKey,decryptSigningKey,encryptSigningKey,EncryptedSigningKey,SigningKeyBundle} from './signing.js';
const STORAGE='bbs.signing.encrypted.v1';
let unlocked:SigningKeyBundle|null=null;
export function encryptedKey():EncryptedSigningKey|null{try{const s=localStorage.getItem(STORAGE);return s?JSON.parse(s):null}catch{return null}}
export function signer(){return unlocked?{publicKey:unlocked.publicKey,privateKey:unlocked.privateKey}:undefined;}
export function signingStatus(){const box=encryptedKey();return {exists:!!box,unlocked:!!unlocked,publicKey:unlocked?.publicKey||box?.publicKey,createdAt:unlocked?.createdAt||box?.createdAt};}
export async function createAndStoreSigningKey(passphrase:string){const bundle=await createSigningKey(),box=await encryptSigningKey(bundle,passphrase);localStorage.setItem(STORAGE,JSON.stringify(box));unlocked=bundle;return signingStatus();}
export async function unlockSigningKey(passphrase:string){const box=encryptedKey();if(!box)throw new Error('No local signing key exists.');unlocked=await decryptSigningKey(box,passphrase);return signingStatus();}
export function lockSigningKey(){unlocked=null;return signingStatus();}
export function removeSigningKey(){unlocked=null;localStorage.removeItem(STORAGE);}
export function exportEncryptedSigningKey(){const box=encryptedKey();if(!box)throw new Error('No signing key to export.');return JSON.stringify(box,null,2);}
export function importEncryptedSigningKey(text:string){const x=JSON.parse(text) as EncryptedSigningKey;if(x.version!==1||x.algorithm!=='PBKDF2-SHA256/AES-256-GCM'||!x.publicKey||!x.ciphertext)throw new Error('Unsupported signing-key file.');localStorage.setItem(STORAGE,JSON.stringify(x));unlocked=null;return signingStatus();}
