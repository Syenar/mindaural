export const TAU = Math.PI * 2;
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
export const dbToGain = (db) => Math.pow(10, db / 20);
export const gainToDb = (g) => 20 * Math.log10(Math.max(1e-12, g));
function curveValue(a, b, t) {
    const span = Math.max(1e-12, b.time - a.time), x = clamp((t - a.time) / span, 0, 1);
    switch (a.curve) {
        case 'hold': return a.value;
        case 'smooth': {
            const s = x * x * (3 - 2 * x);
            return a.value + (b.value - a.value) * s;
        }
        case 'exponential': {
            if (a.value === 0 || b.value === 0 || Math.sign(a.value) !== Math.sign(b.value))
                return a.value + (b.value - a.value) * x;
            return a.value * Math.pow(b.value / a.value, x);
        }
        case 'logarithmic': {
            const s = Math.log1p(9 * x) / Math.log(10);
            return a.value + (b.value - a.value) * s;
        }
        case 'bezier': {
            const c1 = a.c1 ?? .33, c2 = a.c2 ?? .67;
            const u = 1 - x;
            const s = 3 * u * u * x * c1 + 3 * u * x * x * c2 + x * x * x;
            return a.value + (b.value - a.value) * s;
        }
        default: return a.value + (b.value - a.value) * x;
    }
}
export function automationValue(lane, time, fallback) {
    if (!lane || lane.points.length === 0)
        return fallback;
    const pts = lane.points;
    if (time <= pts[0].time)
        return pts[0].value;
    if (time >= pts[pts.length - 1].time)
        return pts[pts.length - 1].value;
    for (let i = 0; i < pts.length - 1; i++)
        if (time >= pts[i].time && time <= pts[i + 1].time)
            return curveValue(pts[i], pts[i + 1], time);
    return fallback;
}
export function trackParameterValue(lanes, parameter, time, fallback, mods) {
    let v = automationValue(lanes?.find(x => x.parameter === parameter), time, fallback);
    for (const m of mods || [])
        if (m.target === parameter && Number.isFinite(m.rateHz) && Number.isFinite(m.depth))
            v += (m.offset || 0) + Math.sin(TAU * m.rateHz * time + (m.phase || 0)) * m.depth;
    return v;
}
export function waveformAt(v, time) {
    const pts = v.waveformAutomation;
    if (!pts?.length)
        return v.waveform;
    let out = v.waveform;
    for (const p of pts.slice().sort((a, b) => a.time - b.time)) {
        if (time + 1e-12 < p.time)
            break;
        out = p.waveform;
    }
    return out;
}
export function createModulationRuntime() { return { values: new Map() }; }
function baseVoiceParameter(v, key, time) {
    const lane = v.automation.find(x => x.parameter === key);
    const carrier = (v.leftHz + v.rightHz) / 2, beat = Math.abs(v.rightHz - v.leftHz);
    const fallback = key === 'leftHz' ? v.leftHz : key === 'rightHz' ? v.rightHz : key === 'beatHz' ? beat : key === 'carrierHz' ? carrier : key === 'amplitude' ? v.amplitude : key === 'duty' ? v.duty : 0;
    return automationValue(lane, time, fallback);
}
function sourceValue(v, link, time) {
    const t = Math.max(0, time - Math.max(0, link.delayMs || 0) / 1000);
    if (link.source === 'time')
        return t;
    return baseVoiceParameter(v, link.source, t);
}
function mapLink(link, src) {
    let x = src;
    if (link.invert) {
        if (Number.isFinite(link.sourceMin) && Number.isFinite(link.sourceMax))
            x = link.sourceMin + link.sourceMax - x;
        else
            x = -x;
    }
    let y;
    if (Number.isFinite(link.sourceMin) && Number.isFinite(link.sourceMax) && Number.isFinite(link.targetMin) && Number.isFinite(link.targetMax) && link.sourceMax !== link.sourceMin) {
        const n = (x - link.sourceMin) / (link.sourceMax - link.sourceMin);
        y = link.targetMin + n * (link.targetMax - link.targetMin);
        y = y * link.scale + link.offset;
    }
    else
        y = x * link.scale + link.offset;
    if (Number.isFinite(link.min))
        y = Math.max(link.min, y);
    if (Number.isFinite(link.max))
        y = Math.min(link.max, y);
    if ((link.quantize || 0) > 0)
        y = Math.round(y / link.quantize) * link.quantize;
    return y;
}
export function voiceParameter(v, key, time, runtime, dt = 0) {
    let result = baseVoiceParameter(v, key, time);
    for (const link of v.links) {
        if (link.target !== key)
            continue;
        let target = mapLink(link, sourceValue(v, link, time));
        const ms = Math.max(0, link.smoothingMs || 0);
        if (ms > 0 && runtime && dt > 0) {
            const prior = runtime.values.get(link.id);
            if (prior === undefined)
                runtime.values.set(link.id, target);
            else {
                const alpha = 1 - Math.exp(-dt / (ms / 1000));
                target = prior + alpha * (target - prior);
                runtime.values.set(link.id, target);
            }
        }
        result = target;
    }
    return result;
}
export function resolveVoiceFrame(v, time, runtime, dt = 0) {
    const hasDirectLeft = v.automation.some(x => x.parameter === 'leftHz') || v.links.some(x => x.target === 'leftHz');
    const hasDirectRight = v.automation.some(x => x.parameter === 'rightHz') || v.links.some(x => x.target === 'rightHz');
    const carrierHz = voiceParameter(v, 'carrierHz', time, runtime, dt), beatHz = Math.abs(voiceParameter(v, 'beatHz', time, runtime, dt));
    const derivedLeft = carrierHz - beatHz / 2, derivedRight = carrierHz + beatHz / 2;
    const leftHz = hasDirectLeft ? voiceParameter(v, 'leftHz', time, runtime, dt) : derivedLeft;
    const rightHz = hasDirectRight ? voiceParameter(v, 'rightHz', time, runtime, dt) : derivedRight;
    return { leftHz, rightHz, carrierHz: (leftHz + rightHz) / 2, beatHz: Math.abs(rightHz - leftHz), amplitude: voiceParameter(v, 'amplitude', time, runtime, dt), duty: voiceParameter(v, 'duty', time, runtime, dt), pan: clamp(voiceParameter(v, 'pan', time, runtime, dt), -1, 1) };
}
export function earFrequencies(v, time, runtime, dt = 0) { const f = resolveVoiceFrame(v, time, runtime, dt); return [f.leftHz, f.rightHz]; }
export function waveformSample(kind, phase, duty = .5) {
    const p = ((phase / TAU) % 1 + 1) % 1;
    switch (kind) {
        case 'sine2': {
            const s = Math.sin(phase);
            return Math.sign(s) * s * s;
        }
        case 'triangle': return 1 - 4 * Math.abs(p - .5);
        case 'square': return p < .5 ? 1 : -1;
        case 'smooth-square': return Math.tanh(3 * Math.sin(phase)) / Math.tanh(3);
        case 'saw': return 2 * p - 1;
        case 'reverse-saw': return 1 - 2 * p;
        case 'pulse': return p < clamp(duty, .01, .99) ? 1 : -1;
        default: return Math.sin(phase);
    }
}
export function envelope(v, localTime) {
    if (localTime < 0 || localTime > v.duration)
        return 0;
    let g = 1;
    if (v.fadeIn > 0 && localTime < v.fadeIn)
        g *= clamp(localTime / v.fadeIn, 0, 1);
    const remain = v.duration - localTime;
    if (v.fadeOut > 0 && remain < v.fadeOut)
        g *= clamp(remain / v.fadeOut, 0, 1);
    return g;
}
export function phaseStep(freq, sampleRate) { return TAU * freq / sampleRate; }
export function deterministicNoise(id, index) { let h = 2166136261; for (let i = 0; i < id.length; i++)
    h = Math.imul(h ^ id.charCodeAt(i), 16777619); let x = (h ^ Math.imul(index | 0, 0x9e3779b1)) | 0; x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) / 4294967295) * 2 - 1; }
export function advancedWaveformSample(kind, phase, duty, freq, sampleRate, harmonics, cycle) {
    if (kind === 'custom-harmonic') {
        const hs = harmonics?.length ? harmonics : [1, .5, .25];
        let sum = 0, norm = 0;
        for (let i = 0; i < hs.length; i++) {
            sum += hs[i] * Math.sin((i + 1) * phase);
            norm += Math.abs(hs[i]);
        }
        return norm ? sum / norm : 0;
    }
    if (kind === 'imported-cycle') {
        if (!cycle?.length)
            return Math.sin(phase);
        const p = ((phase / TAU) % 1 + 1) % 1, pos = p * cycle.length, i = Math.floor(pos) % cycle.length, j = (i + 1) % cycle.length, f = pos - Math.floor(pos);
        return cycle[i] * (1 - f) + cycle[j] * f;
    }
    const maxH = Math.max(1, Math.min(127, Math.floor((sampleRate * .49) / Math.max(1e-9, Math.abs(freq)))));
    if (kind === 'bandlimited-square') {
        let s = 0;
        for (let k = 1; k <= maxH; k += 2)
            s += Math.sin(k * phase) / k;
        return clamp((4 / Math.PI) * s, -1.2, 1.2);
    }
    if (kind === 'bandlimited-saw') {
        let s = 0;
        for (let k = 1; k <= maxH; k++)
            s += ((k & 1) ? 1 : -1) * Math.sin(k * phase) / k;
        return clamp((2 / Math.PI) * s, -1.2, 1.2);
    }
    return waveformSample(kind, phase, duty);
}
export function segmentContext(project, trackId, time) { const segments = (project.segments || []); if (!segments.length)
    return { time, gain: 1 }; let applies = false; for (const s of segments) {
    if (Array.isArray(s.trackIds) && s.trackIds.length && !s.trackIds.includes(trackId))
        continue;
    applies = true;
    const repeat = Math.max(1, Math.floor(s.repeat || 1)), dur = Math.max(1e-9, Number(s.duration) || 0), span = dur * repeat;
    if (time < s.start || time >= s.start + span)
        continue;
    const rel = time - s.start, it = Math.min(repeat - 1, Math.floor(rel / dur)), local = rel - it * dur, cf = Math.max(0, Math.min(Number(s.crossfade) || 0, dur * .49));
    let gain = 1;
    if (cf > 0 && repeat > 1) {
        if (it > 0 && local < cf)
            gain = Math.sin((local / cf) * Math.PI / 2);
        if (it < repeat - 1 && dur - local < cf)
            gain = Math.min(gain, Math.cos(((cf - (dur - local)) / cf) * Math.PI / 2));
    }
    return { time: s.start + local, gain, segmentId: s.id, iteration: it, overrides: s.overrides || undefined };
} return applies ? null : { time, gain: 1 }; }
//# sourceMappingURL=signalMath.js.map