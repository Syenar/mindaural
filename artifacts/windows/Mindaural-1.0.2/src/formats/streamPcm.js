import { renderProjectChunks } from '../audio/render.js';
function ascii(v, o, s) { for (let i = 0; i < s.length; i++)
    v.setUint8(o + i, s.charCodeAt(i)); }
function ext80(rate) { let exp = Math.floor(Math.log2(rate)), frac = rate / Math.pow(2, exp), e = exp + 16383; return { e, hi: Math.floor(frac * Math.pow(2, 31)), lo: Math.floor((frac * Math.pow(2, 63)) % Math.pow(2, 32)) }; }
function wavHeader(frames, sampleRate, bits) { const bps = bits === 'f32' ? 32 : bits, bytes = bps / 8, dataBytes = frames * 2 * bytes, ab = new ArrayBuffer(44), v = new DataView(ab); ascii(v, 0, 'RIFF'); v.setUint32(4, 36 + dataBytes, true); ascii(v, 8, 'WAVEfmt '); v.setUint32(16, 16, true); v.setUint16(20, bits === 'f32' ? 3 : 1, true); v.setUint16(22, 2, true); v.setUint32(24, sampleRate, true); v.setUint32(28, sampleRate * 2 * bytes, true); v.setUint16(32, 2 * bytes, true); v.setUint16(34, bps, true); ascii(v, 36, 'data'); v.setUint32(40, dataBytes, true); return new Uint8Array(ab); }
function wavPcm(b, bits) { const depth = bits === 'f32' ? 32 : bits, bytes = depth / 8, ab = new ArrayBuffer(b.left.length * 2 * bytes), v = new DataView(ab); let o = 0; for (let i = 0; i < b.left.length; i++)
    for (const x0 of [b.left[i], b.right[i]]) {
        const x = Math.max(-1, Math.min(1, x0));
        if (bits === 'f32') {
            v.setFloat32(o, x, true);
            o += 4;
        }
        else if (bits === 16) {
            v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), true);
            o += 2;
        }
        else if (bits === 24) {
            const q = Math.round(x < 0 ? x * 8388608 : x * 8388607);
            v.setUint8(o, q & 255);
            v.setUint8(o + 1, (q >> 8) & 255);
            v.setUint8(o + 2, (q >> 16) & 255);
            o += 3;
        }
        else {
            v.setInt32(o, Math.round(x < 0 ? x * 2147483648 : x * 2147483647), true);
            o += 4;
        }
    } return new Uint8Array(ab); }
function aiffHeader(frames, sampleRate, bits) { const bytes = bits / 8, dataBytes = frames * 2 * bytes, ab = new ArrayBuffer(54), v = new DataView(ab); ascii(v, 0, 'FORM'); v.setUint32(4, 46 + dataBytes, false); ascii(v, 8, 'AIFF'); ascii(v, 12, 'COMM'); v.setUint32(16, 18, false); v.setUint16(20, 2, false); v.setUint32(22, frames, false); v.setUint16(26, bits, false); const x = ext80(sampleRate); v.setUint16(28, x.e, false); v.setUint32(30, x.hi, false); v.setUint32(34, x.lo, false); ascii(v, 38, 'SSND'); v.setUint32(42, 8 + dataBytes, false); v.setUint32(46, 0, false); v.setUint32(50, 0, false); return new Uint8Array(ab); }
function aiffPcm(b, bits) { const bytes = bits / 8, ab = new ArrayBuffer(b.left.length * 2 * bytes), v = new DataView(ab); let o = 0; for (let i = 0; i < b.left.length; i++)
    for (const x0 of [b.left[i], b.right[i]]) {
        const x = Math.max(-1, Math.min(1, x0));
        if (bits === 16) {
            v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), false);
            o += 2;
        }
        else if (bits === 24) {
            const q = Math.round(x < 0 ? x * 8388608 : x * 8388607);
            v.setUint8(o, (q >> 16) & 255);
            v.setUint8(o + 1, (q >> 8) & 255);
            v.setUint8(o + 2, q & 255);
            o += 3;
        }
        else {
            v.setInt32(o, Math.round(x < 0 ? x * 2147483648 : x * 2147483647), false);
            o += 4;
        }
    } return new Uint8Array(ab); }
function parts(project, assets, chunkSeconds, onProgress, convert) { const out = [], frames = Math.round(project.duration * project.sampleRate); let done = 0; for (const b of renderProjectChunks(project, chunkSeconds, { assets })) {
    out.push(convert(b));
    done += b.left.length;
    onProgress?.(done / Math.max(1, frames));
} return out; }
export function renderWavBlob(project, bits = 24, assets = {}, chunkSeconds = 5, onProgress) { const frames = Math.round(project.duration * project.sampleRate); return new Blob([wavHeader(frames, project.sampleRate, bits), ...parts(project, assets, chunkSeconds, onProgress, b => wavPcm(b, bits))], { type: 'audio/wav' }); }
export function renderAiffBlob(project, bits = 24, assets = {}, chunkSeconds = 5, onProgress) { const frames = Math.round(project.duration * project.sampleRate); return new Blob([aiffHeader(frames, project.sampleRate, bits), ...parts(project, assets, chunkSeconds, onProgress, b => aiffPcm(b, bits))], { type: 'audio/aiff' }); }
//# sourceMappingURL=streamPcm.js.map