import { clamp, trackParameterValue } from './signalMath.js';
export function createAudioTrackRuntime() { return { lpL: 0, lpR: 0, hpL: 0, hpR: 0 }; }
export function sampleChannel(src, time, channel) {
    const arr = src[channel];
    if (time < 0 || time >= src.duration || !arr.length)
        return 0;
    const pos = time * src.sampleRate, j = Math.floor(pos), f = pos - j, k = Math.min(j + 1, arr.length - 1);
    return arr[j] * (1 - f) + arr[k] * f;
}
function filter(x, side, track, rt, sr) { if (!rt)
    return x; let y = x; if (track.highpass && track.highpass > 0) {
    const a = 1 - Math.exp(-2 * Math.PI * Math.min(track.highpass, sr * .45) / sr), key = side === 'L' ? 'hpL' : 'hpR';
    rt[key] += a * (y - rt[key]);
    y -= rt[key];
} if (track.lowpass && track.lowpass > 0) {
    const a = 1 - Math.exp(-2 * Math.PI * Math.min(track.lowpass, sr * .45) / sr), key = side === 'L' ? 'lpL' : 'lpR';
    rt[key] += a * (y - rt[key]);
    y = rt[key];
} return y; }
export function audioTrackSample(track, src, projectTime, out, runtime, outputSampleRate = src.sampleRate) {
    out[0] = 0;
    out[1] = 0;
    if (track.mute || projectTime < track.start)
        return false;
    const clipT = projectTime - track.start;
    if (!track.loop && clipT >= track.duration)
        return false;
    if ((track.intervalSeconds || 0) > 0) {
        const cycle = clipT % track.intervalSeconds, on = Math.min(track.intervalSeconds, track.intervalOnSeconds ?? track.intervalSeconds);
        if (cycle >= on)
            return false;
    }
    let at = clipT + track.offset;
    if (track.loop && src.duration > 0)
        at = ((at % src.duration) + src.duration) % src.duration;
    if (at < 0 || at >= src.duration)
        return false;
    let env = 1;
    if (track.fadeIn > 0 && clipT < track.fadeIn)
        env *= clamp(clipT / track.fadeIn, 0, 1);
    const remain = track.duration - clipT;
    if (track.fadeOut > 0 && remain < track.fadeOut)
        env *= clamp(remain / track.fadeOut, 0, 1);
    const amp = trackParameterValue(track.automation, 'amplitude', clipT, track.amplitude, track.modulation), pan = clamp(trackParameterValue(track.automation, 'pan', clipT, track.pan, track.modulation), -1, 1), width = clamp(trackParameterValue(track.automation, 'stereoWidth', clipT, track.stereoWidth ?? 1, track.modulation), 0, 2), dl = trackParameterValue(track.automation, 'leftDelayMs', clipT, track.leftDelayMs || 0, track.modulation) / 1000, dr = trackParameterValue(track.automation, 'rightDelayMs', clipT, track.rightDelayMs || 0, track.modulation) / 1000, hp = trackParameterValue(track.automation, 'highpass', clipT, track.highpass || 0, track.modulation), lp = trackParameterValue(track.automation, 'lowpass', clipT, track.lowpass || 0, track.modulation);
    let l = sampleChannel(src, at - dl, 'left'), r = sampleChannel(src, at - dr, 'right');
    const mid = (l + r) * .5, side = (l - r) * .5 * width;
    l = mid + side;
    r = mid - side;
    const dynamic = { ...track, highpass: hp, lowpass: lp };
    l = filter(l, 'L', dynamic, runtime, outputSampleRate);
    r = filter(r, 'R', dynamic, runtime, outputSampleRate);
    const gL = Math.cos((pan + 1) * Math.PI / 4) * Math.SQRT2, gR = Math.sin((pan + 1) * Math.PI / 4) * Math.SQRT2;
    out[0] = l * amp * env * gL;
    out[1] = r * amp * env * gR;
    return true;
}
//# sourceMappingURL=audioTrackMath.js.map