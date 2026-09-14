import { goertzel } from '../audio/analyze.js';
const TAU = Math.PI * 2, CARRIER = 19200;
export const DEFAULT_LIGHT_CONTROL = { frequencyHz: 10, leftAmplitude: .25, rightAmplitude: .25, leftPhase: 0, rightPhase: 0, duty: .5, waveform: 'square' };
function env(spec, t, phase) { const p = ((t * spec.frequencyHz + phase / TAU) % 1 + 1) % 1; if (spec.waveform === 'sine')
    return .5 + .5 * Math.sin(TAU * p); return p < Math.max(.01, Math.min(.99, spec.duty)) ? 1 : 0; }
export function renderLightControl(duration, sampleRate, spec = DEFAULT_LIGHT_CONTROL) { if (sampleRate < 44100)
    throw new Error('19.2 kHz light-control export requires at least 44.1 kHz sample rate'); const n = Math.max(1, Math.round(duration * sampleRate)), left = new Float32Array(n), right = new Float32Array(n); for (let i = 0; i < n; i++) {
    const t = i / sampleRate, carrier = Math.sin(TAU * CARRIER * t);
    left[i] = carrier * spec.leftAmplitude * env(spec, t, spec.leftPhase);
    right[i] = carrier * spec.rightAmplitude * env(spec, t, spec.rightPhase);
} return { sampleRate, left, right, duration: n / sampleRate }; }
export function analyzeLightControl(buf) { const l = goertzel(buf.left, buf.sampleRate, CARRIER), r = goertzel(buf.right, buf.sampleRate, CARRIER), present = Math.max(l, r) > .002; return { carrierHz: CARRIER, leftCarrierMagnitude: l, rightCarrierMagnitude: r, present, confidence: Math.min(1, Math.max(l, r) * 8) }; }
//# sourceMappingURL=lightControl.js.map