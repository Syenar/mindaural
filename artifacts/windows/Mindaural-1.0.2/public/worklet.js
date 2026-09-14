// src/audio/signalMath.ts
var TAU = Math.PI * 2;
var clamp = (v, min, max) => Math.max(min, Math.min(max, v));
function curveValue(a, b, t) {
  const span = Math.max(1e-12, b.time - a.time), x = clamp((t - a.time) / span, 0, 1);
  switch (a.curve) {
    case "hold":
      return a.value;
    case "smooth": {
      const s = x * x * (3 - 2 * x);
      return a.value + (b.value - a.value) * s;
    }
    case "exponential": {
      if (a.value === 0 || b.value === 0 || Math.sign(a.value) !== Math.sign(b.value)) return a.value + (b.value - a.value) * x;
      return a.value * Math.pow(b.value / a.value, x);
    }
    case "logarithmic": {
      const s = Math.log1p(9 * x) / Math.log(10);
      return a.value + (b.value - a.value) * s;
    }
    case "bezier": {
      const c1 = a.c1 ?? 0.33, c2 = a.c2 ?? 0.67;
      const u = 1 - x;
      const s = 3 * u * u * x * c1 + 3 * u * x * x * c2 + x * x * x;
      return a.value + (b.value - a.value) * s;
    }
    default:
      return a.value + (b.value - a.value) * x;
  }
}
function automationValue(lane, time, fallback) {
  if (!lane || lane.points.length === 0) return fallback;
  const pts = lane.points;
  if (time <= pts[0].time) return pts[0].value;
  if (time >= pts[pts.length - 1].time) return pts[pts.length - 1].value;
  for (let i = 0; i < pts.length - 1; i++) if (time >= pts[i].time && time <= pts[i + 1].time) return curveValue(pts[i], pts[i + 1], time);
  return fallback;
}
function trackParameterValue(lanes, parameter, time, fallback, mods) {
  let v = automationValue(lanes?.find((x) => x.parameter === parameter), time, fallback);
  for (const m of mods || []) if (m.target === parameter && Number.isFinite(m.rateHz) && Number.isFinite(m.depth)) v += (m.offset || 0) + Math.sin(TAU * m.rateHz * time + (m.phase || 0)) * m.depth;
  return v;
}
function waveformAt(v, time) {
  const pts = v.waveformAutomation;
  if (!pts?.length) return v.waveform;
  let out = v.waveform;
  for (const p of pts.slice().sort((a, b) => a.time - b.time)) {
    if (time + 1e-12 < p.time) break;
    out = p.waveform;
  }
  return out;
}
function createModulationRuntime() {
  return { values: /* @__PURE__ */ new Map() };
}
function baseVoiceParameter(v, key, time) {
  const lane = v.automation.find((x) => x.parameter === key);
  const carrier = (v.leftHz + v.rightHz) / 2, beat = Math.abs(v.rightHz - v.leftHz);
  const fallback = key === "leftHz" ? v.leftHz : key === "rightHz" ? v.rightHz : key === "beatHz" ? beat : key === "carrierHz" ? carrier : key === "amplitude" ? v.amplitude : key === "duty" ? v.duty : 0;
  return automationValue(lane, time, fallback);
}
function sourceValue(v, link, time) {
  const t = Math.max(0, time - Math.max(0, link.delayMs || 0) / 1e3);
  if (link.source === "time") return t;
  return baseVoiceParameter(v, link.source, t);
}
function mapLink(link, src) {
  let x = src;
  if (link.invert) {
    if (Number.isFinite(link.sourceMin) && Number.isFinite(link.sourceMax)) x = link.sourceMin + link.sourceMax - x;
    else x = -x;
  }
  let y;
  if (Number.isFinite(link.sourceMin) && Number.isFinite(link.sourceMax) && Number.isFinite(link.targetMin) && Number.isFinite(link.targetMax) && link.sourceMax !== link.sourceMin) {
    const n = (x - link.sourceMin) / (link.sourceMax - link.sourceMin);
    y = link.targetMin + n * (link.targetMax - link.targetMin);
    y = y * link.scale + link.offset;
  } else y = x * link.scale + link.offset;
  if (Number.isFinite(link.min)) y = Math.max(link.min, y);
  if (Number.isFinite(link.max)) y = Math.min(link.max, y);
  if ((link.quantize || 0) > 0) y = Math.round(y / link.quantize) * link.quantize;
  return y;
}
function voiceParameter(v, key, time, runtime, dt = 0) {
  let result = baseVoiceParameter(v, key, time);
  for (const link of v.links) {
    if (link.target !== key) continue;
    let target = mapLink(link, sourceValue(v, link, time));
    const ms = Math.max(0, link.smoothingMs || 0);
    if (ms > 0 && runtime && dt > 0) {
      const prior = runtime.values.get(link.id);
      if (prior === void 0) runtime.values.set(link.id, target);
      else {
        const alpha = 1 - Math.exp(-dt / (ms / 1e3));
        target = prior + alpha * (target - prior);
        runtime.values.set(link.id, target);
      }
    }
    result = target;
  }
  return result;
}
function resolveVoiceFrame(v, time, runtime, dt = 0) {
  const hasDirectLeft = v.automation.some((x) => x.parameter === "leftHz") || v.links.some((x) => x.target === "leftHz");
  const hasDirectRight = v.automation.some((x) => x.parameter === "rightHz") || v.links.some((x) => x.target === "rightHz");
  const carrierHz = voiceParameter(v, "carrierHz", time, runtime, dt), beatHz = Math.abs(voiceParameter(v, "beatHz", time, runtime, dt));
  const derivedLeft = carrierHz - beatHz / 2, derivedRight = carrierHz + beatHz / 2;
  const leftHz = hasDirectLeft ? voiceParameter(v, "leftHz", time, runtime, dt) : derivedLeft;
  const rightHz = hasDirectRight ? voiceParameter(v, "rightHz", time, runtime, dt) : derivedRight;
  return { leftHz, rightHz, carrierHz: (leftHz + rightHz) / 2, beatHz: Math.abs(rightHz - leftHz), amplitude: voiceParameter(v, "amplitude", time, runtime, dt), duty: voiceParameter(v, "duty", time, runtime, dt), pan: clamp(voiceParameter(v, "pan", time, runtime, dt), -1, 1) };
}
function waveformSample(kind, phase, duty = 0.5) {
  const p = (phase / TAU % 1 + 1) % 1;
  switch (kind) {
    case "sine2": {
      const s = Math.sin(phase);
      return Math.sign(s) * s * s;
    }
    case "triangle":
      return 1 - 4 * Math.abs(p - 0.5);
    case "square":
      return p < 0.5 ? 1 : -1;
    case "smooth-square":
      return Math.tanh(3 * Math.sin(phase)) / Math.tanh(3);
    case "saw":
      return 2 * p - 1;
    case "reverse-saw":
      return 1 - 2 * p;
    case "pulse":
      return p < clamp(duty, 0.01, 0.99) ? 1 : -1;
    default:
      return Math.sin(phase);
  }
}
function envelope(v, localTime) {
  if (localTime < 0 || localTime > v.duration) return 0;
  let g = 1;
  if (v.fadeIn > 0 && localTime < v.fadeIn) g *= clamp(localTime / v.fadeIn, 0, 1);
  const remain = v.duration - localTime;
  if (v.fadeOut > 0 && remain < v.fadeOut) g *= clamp(remain / v.fadeOut, 0, 1);
  return g;
}
function phaseStep(freq, sampleRate2) {
  return TAU * freq / sampleRate2;
}
function deterministicNoise(id, index) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  let x = h ^ Math.imul(index | 0, 2654435761) | 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return (x >>> 0) / 4294967295 * 2 - 1;
}
function advancedWaveformSample(kind, phase, duty, freq, sampleRate2, harmonics, cycle) {
  if (kind === "custom-harmonic") {
    const hs = harmonics?.length ? harmonics : [1, 0.5, 0.25];
    let sum = 0, norm = 0;
    for (let i = 0; i < hs.length; i++) {
      sum += hs[i] * Math.sin((i + 1) * phase);
      norm += Math.abs(hs[i]);
    }
    return norm ? sum / norm : 0;
  }
  if (kind === "imported-cycle") {
    if (!cycle?.length) return Math.sin(phase);
    const p = (phase / TAU % 1 + 1) % 1, pos = p * cycle.length, i = Math.floor(pos) % cycle.length, j = (i + 1) % cycle.length, f = pos - Math.floor(pos);
    return cycle[i] * (1 - f) + cycle[j] * f;
  }
  const maxH = Math.max(1, Math.min(127, Math.floor(sampleRate2 * 0.49 / Math.max(1e-9, Math.abs(freq)))));
  if (kind === "bandlimited-square") {
    let s = 0;
    for (let k = 1; k <= maxH; k += 2) s += Math.sin(k * phase) / k;
    return clamp(4 / Math.PI * s, -1.2, 1.2);
  }
  if (kind === "bandlimited-saw") {
    let s = 0;
    for (let k = 1; k <= maxH; k++) s += (k & 1 ? 1 : -1) * Math.sin(k * phase) / k;
    return clamp(2 / Math.PI * s, -1.2, 1.2);
  }
  return waveformSample(kind, phase, duty);
}
function segmentContext(project, trackId, time) {
  const segments = project.segments || [];
  if (!segments.length) return { time, gain: 1 };
  let applies = false;
  for (const s of segments) {
    if (Array.isArray(s.trackIds) && s.trackIds.length && !s.trackIds.includes(trackId)) continue;
    applies = true;
    const repeat = Math.max(1, Math.floor(s.repeat || 1)), dur = Math.max(1e-9, Number(s.duration) || 0), span = dur * repeat;
    if (time < s.start || time >= s.start + span) continue;
    const rel = time - s.start, it = Math.min(repeat - 1, Math.floor(rel / dur)), local = rel - it * dur, cf = Math.max(0, Math.min(Number(s.crossfade) || 0, dur * 0.49));
    let gain = 1;
    if (cf > 0 && repeat > 1) {
      if (it > 0 && local < cf) gain = Math.sin(local / cf * Math.PI / 2);
      if (it < repeat - 1 && dur - local < cf) gain = Math.min(gain, Math.cos((cf - (dur - local)) / cf * Math.PI / 2));
    }
    return { time: s.start + local, gain, segmentId: s.id, iteration: it, overrides: s.overrides || void 0 };
  }
  return applies ? null : { time, gain: 1 };
}

// src/audio/noise.ts
function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h | 0;
}
function channel(seed) {
  return { seed: seed || 1, pink0: 0, pink1: 0, pink2: 0, brown: 0, prev1: 0, prev2: 0, lpHigh: 0, lpLow: 0 };
}
function createNoiseState(trackId, seed = 1369948382) {
  const h = hash(trackId);
  return { left: channel(seed ^ h ^ 521288629), right: channel(seed ^ h ^ 1597334677), shared: channel(seed ^ h ^ 324508639) };
}
function rng(s) {
  let x = s.seed | 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  s.seed = x | 0;
  return (x >>> 0) / 4294967295 * 2 - 1;
}
function baseKinds(s) {
  const w = rng(s);
  s.pink0 = 0.99765 * s.pink0 + w * 0.099046;
  s.pink1 = 0.963 * s.pink1 + w * 0.2965164;
  s.pink2 = 0.57 * s.pink2 + w * 1.0526913;
  const pink = (s.pink0 + s.pink1 + s.pink2 + w * 0.1848) * 0.18;
  s.brown = clamp((s.brown + 0.02 * w) / 1.02, -1, 1);
  const brown = s.brown * 3.5, blue = clamp((w - s.prev1) * 0.7, -1, 1), violet = clamp((w - 2 * s.prev1 + s.prev2) * 0.35, -1, 1);
  s.prev2 = s.prev1;
  s.prev1 = w;
  const grey = 0.7 * w + 0.3 * Math.sign(w) * Math.sqrt(Math.abs(w));
  return { white: w, pink, brown, blue, violet, grey };
}
function color(track, s, slopeOverride) {
  const k = baseKinds(s);
  if (track.kind === "slope") {
    const x = clamp(slopeOverride ?? track.slopeDbOct, -6, 6);
    if (x <= -3) {
      const t2 = (x + 6) / 3;
      return k.brown * (1 - t2) + k.pink * t2;
    }
    if (x <= 0) {
      const t2 = (x + 3) / 3;
      return k.pink * (1 - t2) + k.white * t2;
    }
    if (x <= 3) {
      const t2 = x / 3;
      return k.white * (1 - t2) + k.blue * t2;
    }
    const t = (x - 3) / 3;
    return k.blue * (1 - t) + k.violet * t;
  }
  return k[track.kind] ?? k.white;
}
function filter(track, s, x, sr, highpass = track.highpass || 0, lowpass = track.lowpass || 0) {
  let y = x;
  if (highpass > 0) {
    const a = 1 - Math.exp(-2 * Math.PI * Math.min(highpass, sr * 0.45) / sr);
    s.lpHigh += a * (y - s.lpHigh);
    y -= s.lpHigh;
  }
  if (lowpass > 0) {
    const a = 1 - Math.exp(-2 * Math.PI * Math.min(lowpass, sr * 0.45) / sr);
    s.lpLow += a * (y - s.lpLow);
    y = s.lpLow;
  }
  return y;
}
function nextNoiseStereo(track, state, sampleRate2, out, time = 0) {
  const amp = trackParameterValue(track.automation, "amplitude", time, track.amplitude, track.modulation), slope = trackParameterValue(track.automation, "slopeDbOct", time, track.slopeDbOct, track.modulation), hp = trackParameterValue(track.automation, "highpass", time, track.highpass || 0, track.modulation), lp = trackParameterValue(track.automation, "lowpass", time, track.lowpass || 0, track.modulation), corr = trackParameterValue(track.automation, "stereoCorrelation", time, track.stereoCorrelation, track.modulation);
  const a = color(track, state.left, slope), b = color(track, state.right, slope), shared = color(track, state.shared, slope), c = clamp(corr, 0, 1), s = Math.sqrt(c), i = Math.sqrt(1 - c);
  out[0] = filter(track, state.left, a * i + shared * s, sampleRate2, hp, lp) * amp;
  out[1] = filter(track, state.right, b * i + shared * s, sampleRate2, hp, lp) * amp * (track.invertRight ? -1 : 1);
}

// src/audio/audioTrackMath.ts
function createAudioTrackRuntime() {
  return { lpL: 0, lpR: 0, hpL: 0, hpR: 0 };
}
function sampleChannel(src, time, channel2) {
  const arr = src[channel2];
  if (time < 0 || time >= src.duration || !arr.length) return 0;
  const pos = time * src.sampleRate, j = Math.floor(pos), f = pos - j, k = Math.min(j + 1, arr.length - 1);
  return arr[j] * (1 - f) + arr[k] * f;
}
function filter2(x, side, track, rt, sr) {
  if (!rt) return x;
  let y = x;
  if (track.highpass && track.highpass > 0) {
    const a = 1 - Math.exp(-2 * Math.PI * Math.min(track.highpass, sr * 0.45) / sr), key = side === "L" ? "hpL" : "hpR";
    rt[key] += a * (y - rt[key]);
    y -= rt[key];
  }
  if (track.lowpass && track.lowpass > 0) {
    const a = 1 - Math.exp(-2 * Math.PI * Math.min(track.lowpass, sr * 0.45) / sr), key = side === "L" ? "lpL" : "lpR";
    rt[key] += a * (y - rt[key]);
    y = rt[key];
  }
  return y;
}
function audioTrackSample(track, src, projectTime, out, runtime, outputSampleRate = src.sampleRate) {
  out[0] = 0;
  out[1] = 0;
  if (track.mute || projectTime < track.start) return false;
  const clipT = projectTime - track.start;
  if (!track.loop && clipT >= track.duration) return false;
  if ((track.intervalSeconds || 0) > 0) {
    const cycle = clipT % track.intervalSeconds, on = Math.min(track.intervalSeconds, track.intervalOnSeconds ?? track.intervalSeconds);
    if (cycle >= on) return false;
  }
  let at = clipT + track.offset;
  if (track.loop && src.duration > 0) at = (at % src.duration + src.duration) % src.duration;
  if (at < 0 || at >= src.duration) return false;
  let env = 1;
  if (track.fadeIn > 0 && clipT < track.fadeIn) env *= clamp(clipT / track.fadeIn, 0, 1);
  const remain = track.duration - clipT;
  if (track.fadeOut > 0 && remain < track.fadeOut) env *= clamp(remain / track.fadeOut, 0, 1);
  const amp = trackParameterValue(track.automation, "amplitude", clipT, track.amplitude, track.modulation), pan = clamp(trackParameterValue(track.automation, "pan", clipT, track.pan, track.modulation), -1, 1), width = clamp(trackParameterValue(track.automation, "stereoWidth", clipT, track.stereoWidth ?? 1, track.modulation), 0, 2), dl = trackParameterValue(track.automation, "leftDelayMs", clipT, track.leftDelayMs || 0, track.modulation) / 1e3, dr = trackParameterValue(track.automation, "rightDelayMs", clipT, track.rightDelayMs || 0, track.modulation) / 1e3, hp = trackParameterValue(track.automation, "highpass", clipT, track.highpass || 0, track.modulation), lp = trackParameterValue(track.automation, "lowpass", clipT, track.lowpass || 0, track.modulation);
  let l = sampleChannel(src, at - dl, "left"), r = sampleChannel(src, at - dr, "right");
  const mid = (l + r) * 0.5, side = (l - r) * 0.5 * width;
  l = mid + side;
  r = mid - side;
  const dynamic = { ...track, highpass: hp, lowpass: lp };
  l = filter2(l, "L", dynamic, runtime, outputSampleRate);
  r = filter2(r, "R", dynamic, runtime, outputSampleRate);
  const gL = Math.cos((pan + 1) * Math.PI / 4) * Math.SQRT2, gR = Math.sin((pan + 1) * Math.PI / 4) * Math.SQRT2;
  out[0] = l * amp * env * gL;
  out[1] = r * amp * env * gR;
  return true;
}

// src/audio/worklet.ts
var clamp2 = (v, a, b) => Math.max(a, Math.min(b, v));
function active(v, t) {
  if (v.mute || t < v.start) return -1;
  const span = Math.max(1e-9, v.duration), rel = t - v.start, total = v.loop ? Infinity : span * Math.max(1, v.repetitions);
  return rel >= total ? -1 : rel % span;
}
var BinauralProcessor = class extends AudioWorkletProcessor {
  project = null;
  voices = [];
  noises = [];
  assets = {};
  noiseTmp = new Float64Array(2);
  audioTmp = new Float64Array(2);
  active = false;
  position = 0;
  audioRuntime = /* @__PURE__ */ new Map();
  constructor() {
    super();
    this.port.onmessage = (e) => {
      const d = e.data || {};
      if (d.type === "project") {
        const old = this.voices;
        this.project = d.project;
        this.assets = d.assets || {};
        this.voices = this.project.voices.map((v) => {
          const x = old.find((s) => s.id === v.id);
          return x || { id: v.id, phaseL: v.phaseLeft, phaseR: v.phaseRight, mod: createModulationRuntime() };
        });
        this.noises = this.project.noiseTracks.map((n) => createNoiseState(n.id));
        this.audioRuntime.clear();
      }
      if (d.type === "start") {
        if (Number.isFinite(d.position)) this.position = Math.max(0, d.position);
        this.active = true;
      }
      if (d.type === "stop") this.active = false;
      if (d.type === "reset") {
        this.position = 0;
        this.active = false;
        this.resetPhases();
      }
    };
  }
  resetPhases() {
    const p = this.project;
    if (!p) return;
    for (let i = 0; i < this.voices.length; i++) {
      this.voices[i].phaseL = p.voices[i]?.phaseLeft || 0;
      this.voices[i].phaseR = p.voices[i]?.phaseRight || 0;
      this.voices[i].mod = createModulationRuntime();
    }
    this.noises = p.noiseTracks.map((n) => createNoiseState(n.id));
    this.audioRuntime.clear();
  }
  process(_inputs, outputs) {
    const out = outputs[0];
    if (!out?.[0]) return true;
    const l = out[0], r = out[1] || out[0], p = this.project;
    if (!p || !this.active) {
      l.fill(0);
      if (r !== l) r.fill(0);
      return true;
    }
    const anySolo = p.voices.some((v) => v.solo) || p.noiseTracks.some((n) => n.solo) || p.audioTracks.some((a) => a.solo);
    for (let i = 0; i < l.length; i++) {
      const t = this.position;
      let lv = 0, rv = 0;
      for (let vi = 0; vi < p.voices.length; vi++) {
        const v = p.voices[vi];
        if (anySolo && !v.solo) continue;
        const sc = segmentContext(p, v.id, t);
        if (!sc) continue;
        const local = active(v, sc.time);
        if (local < 0) continue;
        const st = this.voices[vi], fp = resolveVoiceFrame(v, local, st.mod, 1 / sampleRate);
        if (sc.overrides) {
          if (Number.isFinite(sc.overrides.carrierHz)) {
            const b = fp.beatHz;
            fp.leftHz = Number(sc.overrides.carrierHz) - b / 2;
            fp.rightHz = Number(sc.overrides.carrierHz) + b / 2;
          }
          if (Number.isFinite(sc.overrides.beatHz)) {
            const c = (fp.leftHz + fp.rightHz) / 2, b = Math.abs(Number(sc.overrides.beatHz));
            fp.leftHz = c - b / 2;
            fp.rightHz = c + b / 2;
          }
          if (Number.isFinite(sc.overrides.amplitude)) fp.amplitude = Number(sc.overrides.amplitude);
          if (Number.isFinite(sc.overrides.pan)) fp.pan = Number(sc.overrides.pan);
          if (Number.isFinite(sc.overrides.duty)) fp.duty = Number(sc.overrides.duty);
        }
        let fl = fp.leftHz, fr = fp.rightHz;
        const amp = fp.amplitude * envelope(v, local) * sc.gain, duty = fp.duty, pan = fp.pan, cycle = v.cycleAssetId ? this.assets[v.cycleAssetId]?.left : void 0, sampleL = () => advancedWaveformSample(waveformAt(v, local), st.phaseL, duty, fl, sampleRate, v.harmonics, cycle), sampleR = () => advancedWaveformSample(waveformAt(v, local), st.phaseR, duty, fr, sampleRate, v.harmonics, cycle), panL = Math.cos((pan + 1) * Math.PI / 4) * Math.SQRT2, panR = Math.sin((pan + 1) * Math.PI / 4) * Math.SQRT2;
        if (v.type === "monaural") {
          const a = sampleL(), b = sampleR(), m = (a + b) * 0.5 * amp;
          lv += m * v.leftLevel * panL;
          rv += m * v.rightLevel * panR;
        } else if (v.type === "isochronic") {
          const carrier = (fl + fr) / 2, mod = Math.abs(fr - fl), gate = t * mod % 1 < duty ? 1 : 0, s = sampleL() * amp * gate;
          lv += s * v.leftLevel * panL;
          rv += s * v.rightLevel * panR;
          fl = fr = carrier;
        } else if (v.type === "am") {
          const carrier = (fl + fr) / 2, mod = Math.abs(fr - fl), m = 0.5 + 0.5 * Math.sin(TAU * mod * t), s = sampleL() * amp * m;
          lv += s * v.leftLevel * panL;
          rv += s * v.rightLevel * panR;
          fl = fr = carrier;
        } else if (v.type === "sham") {
          const carrier = (fl + fr) / 2, s = sampleL() * amp;
          lv += s * v.leftLevel * panL;
          rv += s * v.rightLevel * panR;
          fl = fr = carrier;
        } else if (v.type === "noise-modulated") {
          const carrier = (fl + fr) / 2, depth = clamp2(duty, 0, 1), frame = Math.floor(t * sampleRate), nm = 1 - depth + depth * (deterministicNoise(v.id, frame) * 0.5 + 0.5);
          lv += sampleL() * amp * nm * v.leftLevel * panL;
          rv += sampleR() * amp * nm * v.rightLevel * panR;
          fl = fr = carrier;
        } else {
          lv += sampleL() * amp * v.leftLevel * panL;
          rv += sampleR() * amp * v.rightLevel * panR;
        }
        st.phaseL = (st.phaseL + phaseStep(fl, sampleRate)) % TAU;
        st.phaseR = (st.phaseR + phaseStep(fr, sampleRate)) % TAU;
      }
      for (let ni = 0; ni < p.noiseTracks.length; ni++) {
        const n = p.noiseTracks[ni];
        const sc = segmentContext(p, n.id, t);
        if (!sc || n.mute || anySolo && !n.solo || sc.time < n.start || !n.loop && sc.time >= n.start + n.duration) continue;
        nextNoiseStereo(n, this.noises[ni], sampleRate, this.noiseTmp, sc.time - n.start);
        lv += this.noiseTmp[0];
        rv += this.noiseTmp[1];
      }
      for (const a of p.audioTracks) {
        const sc = segmentContext(p, a.id, t);
        if (!sc || a.mute || anySolo && !a.solo) continue;
        const src = this.assets[a.assetId];
        if (src) {
          let ar = this.audioRuntime.get(a.id);
          if (!ar) {
            ar = createAudioTrackRuntime();
            this.audioRuntime.set(a.id, ar);
          }
          if (audioTrackSample(a, src, sc.time, this.audioTmp, ar, sampleRate)) {
            lv += this.audioTmp[0] * sc.gain;
            rv += this.audioTmp[1] * sc.gain;
          }
        }
      }
      l[i] = clamp2(lv * p.masterGain, -1, 1);
      r[i] = clamp2(rv * p.masterGain, -1, 1);
      this.position += 1 / sampleRate;
      if (this.position >= p.duration) {
        this.active = false;
        this.port.postMessage({ type: "ended" });
      }
    }
    return true;
  }
};
registerProcessor("binaural-studio", BinauralProcessor);
