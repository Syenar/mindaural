const te = new TextEncoder();
function b64(b) { const u = b instanceof Uint8Array ? b : new Uint8Array(b); let s = ''; for (const x of u)
    s += String.fromCharCode(x); return btoa(s); }
function unb64(s) { const r = atob(s), b = new Uint8Array(r.length); for (let i = 0; i < r.length; i++)
    b[i] = r.charCodeAt(i); return b; }
export async function createSigningKey() { const pair = await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']); return { publicKey: b64(await crypto.subtle.exportKey('spki', pair.publicKey)), privateKey: b64(await crypto.subtle.exportKey('pkcs8', pair.privateKey)), createdAt: new Date().toISOString() }; }
export async function signBytes(data, privateKey) { const key = await crypto.subtle.importKey('pkcs8', unb64(privateKey), { name: 'Ed25519' }, false, ['sign']); return b64(await crypto.subtle.sign('Ed25519', key, new Uint8Array(data))); }
export async function verifyBytes(data, signature, publicKey) { const key = await crypto.subtle.importKey('spki', unb64(publicKey), { name: 'Ed25519' }, false, ['verify']); return crypto.subtle.verify('Ed25519', key, unb64(signature), new Uint8Array(data)); }
export async function signText(text, privateKey) { return signBytes(te.encode(text), privateKey); }
export async function verifyText(text, signature, publicKey) { return verifyBytes(te.encode(text), signature, publicKey); }
async function deriveAesKey(passphrase, salt, iterations, usage) { const base = await crypto.subtle.importKey('raw', te.encode(passphrase), 'PBKDF2', false, ['deriveKey']); return crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt: new Uint8Array(salt), iterations }, base, { name: 'AES-GCM', length: 256 }, false, usage); }
export async function encryptSigningKey(bundle, passphrase, iterations = 310000) { if (passphrase.length < 10)
    throw new Error('Signing-key passphrase must be at least 10 characters.'); const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12)), key = await deriveAesKey(passphrase, salt, iterations, ['encrypt']); const plaintext = te.encode(bundle.privateKey), ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, plaintext); plaintext.fill(0); return { version: 1, algorithm: 'PBKDF2-SHA256/AES-256-GCM', publicKey: bundle.publicKey, createdAt: bundle.createdAt, salt: b64(salt), iv: b64(iv), iterations, ciphertext: b64(ciphertext) }; }
export async function decryptSigningKey(box, passphrase) { if (box.version !== 1 || box.algorithm !== 'PBKDF2-SHA256/AES-256-GCM')
    throw new Error('Unsupported encrypted signing-key format.'); const key = await deriveAesKey(passphrase, unb64(box.salt), box.iterations, ['decrypt']); let plain; try {
    plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(box.iv) }, key, unb64(box.ciphertext));
}
catch {
    throw new Error('Incorrect passphrase or damaged signing key.');
} return { publicKey: box.publicKey, privateKey: new TextDecoder().decode(plain), createdAt: box.createdAt }; }
//# sourceMappingURL=signing.js.map