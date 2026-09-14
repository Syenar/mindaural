import { createSigningKey, decryptSigningKey, encryptSigningKey } from './signing.js';
const STORAGE = 'bbs.signing.encrypted.v1';
let unlocked = null;
export function encryptedKey() { try {
    const s = localStorage.getItem(STORAGE);
    return s ? JSON.parse(s) : null;
}
catch {
    return null;
} }
export function signer() { return unlocked ? { publicKey: unlocked.publicKey, privateKey: unlocked.privateKey } : undefined; }
export function signingStatus() { const box = encryptedKey(); return { exists: !!box, unlocked: !!unlocked, publicKey: unlocked?.publicKey || box?.publicKey, createdAt: unlocked?.createdAt || box?.createdAt }; }
export async function createAndStoreSigningKey(passphrase) { const bundle = await createSigningKey(), box = await encryptSigningKey(bundle, passphrase); localStorage.setItem(STORAGE, JSON.stringify(box)); unlocked = bundle; return signingStatus(); }
export async function unlockSigningKey(passphrase) { const box = encryptedKey(); if (!box)
    throw new Error('No local signing key exists.'); unlocked = await decryptSigningKey(box, passphrase); return signingStatus(); }
export function lockSigningKey() { unlocked = null; return signingStatus(); }
export function removeSigningKey() { unlocked = null; localStorage.removeItem(STORAGE); }
export function exportEncryptedSigningKey() { const box = encryptedKey(); if (!box)
    throw new Error('No signing key to export.'); return JSON.stringify(box, null, 2); }
export function importEncryptedSigningKey(text) { const x = JSON.parse(text); if (x.version !== 1 || x.algorithm !== 'PBKDF2-SHA256/AES-256-GCM' || !x.publicKey || !x.ciphertext)
    throw new Error('Unsupported signing-key file.'); localStorage.setItem(STORAGE, JSON.stringify(x)); unlocked = null; return signingStatus(); }
//# sourceMappingURL=keyStore.js.map