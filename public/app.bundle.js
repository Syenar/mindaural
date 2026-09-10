"use strict";
(() => {
  // src/core/types.ts
  var APP_VERSION = "1.0.0";
  var ENGINE_VERSION = "1.0.0-webgpu";
  var uid = (prefix = "id") => `${prefix}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`;

  // src/core/project.ts
  function createVoice(name = "Binaural voice", type = "binaural", carrier = 400, beat = 10, waveform = "sine") {
    return { id: uid("voice"), name, type, leftHz: carrier - beat / 2, rightHz: carrier + beat / 2, amplitude: 0.18, leftLevel: 1, rightLevel: 1, phaseLeft: 0, phaseRight: 0, waveform, duty: 0.5, routingBus: "protected-stereo", fadeIn: 0.08, fadeOut: 0.12, start: 0, duration: 1200, loop: false, repetitions: 1, mute: false, solo: false, automation: [], links: [] };
  }
  function createDefaultProject(title = "Untitled session") {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const v = createVoice();
    return { schemaVersion: "1.0.0", id: uid("project"), title, description: "A custom binaural session.", duration: 1200, sampleRate: 48e3, masterGain: 0.8, voices: [v], noiseTracks: [], audioTracks: [], assets: [], segments: [{ id: uid("segment"), name: "Main", start: 0, duration: 1200, repeat: 1, crossfade: 0.05 }], markers: [], evidence: { state: "Experimental", claim: "Custom stimulus; no outcome is guaranteed." }, provenance: { author: "Local user", createdAt: now, updatedAt: now, appVersion: APP_VERSION, engineVersion: ENGINE_VERSION }, tags: [], revision: 1 };
  }
  function setCenterBeat(v, carrier, beat) {
    return { ...v, leftHz: carrier - beat / 2, rightHz: carrier + beat / 2 };
  }
  function carrierOf(v) {
    return (v.leftHz + v.rightHz) / 2;
  }
  function beatOf(v) {
    return Math.abs(v.rightHz - v.leftHz);
  }
  function touchProject(p) {
    return { ...p, revision: p.revision + 1, provenance: { ...p.provenance, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } };
  }

  // src/data/soundscapes.ts
  var mk = (id2, title, description, layers) => ({ id: id2, title, description, layers, license: "project-owned", provenance: "Procedurally synthesized by Mindaural; no third-party recording." });
  var SOUNDSCAPES = [
    mk("soft-rain", "Soft rain", "Diffuse rain-like pink/brown texture", [{ kind: "pink", amplitude: 0.12, slopeDbOct: -3, lowpass: 9e3, stereoCorrelation: 0.35 }, { kind: "brown", amplitude: 0.05, slopeDbOct: -6, lowpass: 3500, stereoCorrelation: 0.1 }]),
    mk("heavy-rain", "Heavy rain", "Dense broadband rain texture", [{ kind: "pink", amplitude: 0.18, slopeDbOct: -3, lowpass: 12e3, stereoCorrelation: 0.2 }, { kind: "white", amplitude: 0.04, slopeDbOct: 0, highpass: 4500, stereoCorrelation: 0.05 }]),
    mk("distant-storm", "Distant storm", "Low rolling ambience with air", [{ kind: "brown", amplitude: 0.16, slopeDbOct: -6, lowpass: 1e3, stereoCorrelation: 0.75 }, { kind: "pink", amplitude: 0.05, slopeDbOct: -3, lowpass: 5e3, stereoCorrelation: 0.4 }]),
    mk("ocean-calm", "Calm ocean", "Slow, soft surf-like spectrum", [{ kind: "brown", amplitude: 0.13, slopeDbOct: -6, lowpass: 1800, stereoCorrelation: 0.55 }, { kind: "pink", amplitude: 0.05, slopeDbOct: -3, lowpass: 7e3, stereoCorrelation: 0.25 }]),
    mk("ocean-wide", "Wide ocean", "Brighter wide surf texture", [{ kind: "pink", amplitude: 0.15, slopeDbOct: -3, lowpass: 1e4, stereoCorrelation: 0.1 }, { kind: "brown", amplitude: 0.07, slopeDbOct: -6, lowpass: 2200, stereoCorrelation: 0.5 }]),
    mk("river", "River", "Continuous mid-band water-like noise", [{ kind: "pink", amplitude: 0.13, slopeDbOct: -3, highpass: 250, lowpass: 7e3, stereoCorrelation: 0.22 }]),
    mk("forest", "Forest air", "Soft filtered air with spacious variation", [{ kind: "pink", amplitude: 0.08, slopeDbOct: -3, lowpass: 6e3, stereoCorrelation: 0.3 }, { kind: "brown", amplitude: 0.05, slopeDbOct: -6, lowpass: 1400, stereoCorrelation: 0.65 }]),
    mk("wind-soft", "Soft wind", "Low-pass airy wind texture", [{ kind: "pink", amplitude: 0.1, slopeDbOct: -3, lowpass: 4200, stereoCorrelation: 0.42 }]),
    mk("wind-deep", "Deep wind", "Low spectral wind bed", [{ kind: "brown", amplitude: 0.14, slopeDbOct: -6, lowpass: 1800, stereoCorrelation: 0.48 }]),
    mk("fireplace", "Fireplace", "Warm low-mid crackle-like bed", [{ kind: "brown", amplitude: 0.09, slopeDbOct: -6, lowpass: 2500, stereoCorrelation: 0.55 }, { kind: "white", amplitude: 0.025, slopeDbOct: 0, highpass: 1800, lowpass: 9e3, stereoCorrelation: 0.05 }]),
    mk("fan-low", "Low fan", "Stable deep fan masking texture", [{ kind: "brown", amplitude: 0.13, slopeDbOct: -6, lowpass: 2600, stereoCorrelation: 0.9 }]),
    mk("fan-bright", "Bright fan", "Steady pink fan-like texture", [{ kind: "pink", amplitude: 0.11, slopeDbOct: -3, lowpass: 7e3, stereoCorrelation: 0.88 }]),
    mk("aircraft", "Aircraft cabin", "Low continuous cabin rumble", [{ kind: "brown", amplitude: 0.15, slopeDbOct: -6, lowpass: 1200, stereoCorrelation: 0.95 }, { kind: "pink", amplitude: 0.04, slopeDbOct: -3, lowpass: 4500, stereoCorrelation: 0.8 }]),
    mk("cafe", "Caf\xE9 room", "Diffuse room-like masking spectrum", [{ kind: "pink", amplitude: 0.1, slopeDbOct: -3, highpass: 180, lowpass: 5500, stereoCorrelation: 0.38 }, { kind: "brown", amplitude: 0.04, slopeDbOct: -6, lowpass: 1e3, stereoCorrelation: 0.6 }]),
    mk("room", "Quiet room", "Barely audible neutral room noise", [{ kind: "pink", amplitude: 0.045, slopeDbOct: -3, lowpass: 6e3, stereoCorrelation: 0.75 }]),
    mk("brown-deep", "Deep brown", "Very low-frequency masking", [{ kind: "brown", amplitude: 0.13, slopeDbOct: -6, lowpass: 2200, stereoCorrelation: 0.1 }]),
    mk("pink-balanced", "Balanced pink", "Classic pink masking", [{ kind: "pink", amplitude: 0.1, slopeDbOct: -3, stereoCorrelation: 0.08 }]),
    mk("white-clean", "Clean white", "Flat broadband noise", [{ kind: "white", amplitude: 0.075, slopeDbOct: 0, stereoCorrelation: 0.05 }]),
    mk("grey-soft", "Soft grey", "Perceptually softened broad noise", [{ kind: "grey", amplitude: 0.08, slopeDbOct: -1, lowpass: 12e3, stereoCorrelation: 0.2 }]),
    mk("blue-air", "Blue air", "High-frequency tilted airy noise", [{ kind: "blue", amplitude: 0.055, slopeDbOct: 3, highpass: 800, stereoCorrelation: 0.12 }]),
    mk("violet-air", "Violet air", "Very bright high-frequency texture", [{ kind: "violet", amplitude: 0.035, slopeDbOct: 6, highpass: 1800, stereoCorrelation: 0.08 }]),
    mk("night", "Night room", "Very dark low-level ambience", [{ kind: "brown", amplitude: 0.06, slopeDbOct: -6, lowpass: 1300, stereoCorrelation: 0.65 }]),
    mk("focus-mask", "Focus mask", "Controlled pink masking bed", [{ kind: "pink", amplitude: 0.07, slopeDbOct: -3, highpass: 120, lowpass: 8e3, stereoCorrelation: 0.15 }]),
    mk("sleep-mask", "Sleep mask", "Low, smooth brown-pink blend", [{ kind: "brown", amplitude: 0.09, slopeDbOct: -6, lowpass: 2400, stereoCorrelation: 0.4 }, { kind: "pink", amplitude: 0.035, slopeDbOct: -3, lowpass: 5500, stereoCorrelation: 0.25 }])
  ];

  // src/data/presets.ts
  function make(id2, title, purpose, beat, carrier, duration, collection, state, description, tags, citation) {
    let p = createDefaultProject(title);
    p.duration = duration * 60;
    p.voices[0] = { ...setCenterBeat(p.voices[0], carrier, beat), duration: p.duration };
    p.segments[0].duration = p.duration;
    p.tags = tags;
    p.evidence = { state, claim: collection === "research" ? "Reproduces a published stimulus configuration; observed outcomes are protocol-specific." : `Designed for ${purpose.toLowerCase()}; no outcome is guaranteed.`, citation };
    p.provenance.source = collection === "research" ? citation : "Mindaural curated design";
    return { id: id2, title, collection, description, duration: p.duration, purpose, evidence: p.evidence, tags, project: p, rating: collection === "community" ? 4.2 : void 0, reviews: collection === "community" ? 12 : void 0 };
  }
  var curated = [
    ["c01", "Clear Start", "Focus", 16, 400, 20, "A steady beta-range design with soft onset.", ["focus", "steady"]],
    ["c02", "Quiet Ten", "Relaxation", 10, 400, 30, "A simple 10 Hz listening design.", ["relax", "alpha"]],
    ["c03", "Slow Descent", "Meditation", 8, 360, 25, "Ramps gently from 12 Hz to 8 Hz.", ["meditation", "ramp"]],
    ["c04", "Deep Drift", "Rest", 6, 300, 35, "Low difference-frequency listening design.", ["rest", "theta"]],
    ["c05", "Sleep Entry", "Sleep", 4, 280, 45, "Slow low-frequency design for bedtime listening intent.", ["sleep"]],
    ["c06", "Study Block", "Focus", 18, 420, 50, "Longer steady study-session design.", ["focus", "study"]],
    ["c07", "Soft Alpha", "Relaxation", 9, 340, 20, "Lower-carrier alpha-range design.", ["relax"]],
    ["c08", "Evening Wind", "Unwind", 7, 380, 30, "Gentle evening transition.", ["unwind"]],
    ["c09", "Pulse Lab", "Experiment", 12, 400, 15, "Isochronic comparison design.", ["isochronic", "experiment"]],
    ["c10", "Monaural Compare", "Experiment", 10, 400, 15, "Monaural comparison design.", ["monaural", "experiment"]],
    ["c11", "AM Compare", "Experiment", 10, 400, 15, "Amplitude-modulation comparison design.", ["am", "experiment"]],
    ["c12", "Fractional 7.83", "Experiment", 7.83, 400, 20, "Fractional-frequency engineering example; no special biological claim.", ["fractional", "experiment"]],
    ["c13", "Twenty", "Focus", 20, 400, 20, "20 Hz beta-range design.", ["beta", "focus"]],
    ["c14", "Gamma Edge", "Experiment", 40, 340, 12, "40 Hz experimental comparison setting.", ["gamma", "experiment"]],
    ["c15", "Carrier 250", "Experiment", 10, 250, 15, "Carrier-frequency comparison.", ["carrier", "experiment"]],
    ["c16", "Carrier 500", "Experiment", 10, 500, 15, "Carrier-frequency comparison.", ["carrier", "experiment"]],
    ["c17", "Short Reset", "Unwind", 10, 400, 5, "Five-minute simple listening design.", ["short"]],
    ["c18", "Hour Bed", "Rest", 5, 320, 60, "Long low-difference session.", ["long", "rest"]],
    ["c19", "Bright Mask", "Focus", 14, 410, 30, "Focus-intent design with brighter masking recipe.", ["mask", "focus"]],
    ["c20", "Deep Mask", "Rest", 6, 330, 40, "Rest-intent design with dark masking recipe.", ["mask", "rest"]]
  ];
  var PRESETS = [];
  for (const x of curated) {
    const pr = make(x[0], x[1], x[2], x[3], x[4], x[5], "curated", "Experimental", x[6], Array.from(x[7]));
    if (x[0] === "c09") pr.project.voices[0].type = "isochronic";
    if (x[0] === "c10") pr.project.voices[0].type = "monaural";
    if (x[0] === "c11") pr.project.voices[0].type = "am";
    if (x[0] === "c03") pr.project.voices[0].automation = [{ parameter: "beatHz", points: [{ id: "a", time: 0, value: 12, curve: "linear" }, { id: "b", time: pr.duration, value: 8, curve: "linear" }] }];
    PRESETS.push(pr);
  }
  var research = [
    ["r01", "Research: 10 Hz / 400 Hz", "Attention protocol example", 10, 400, 20, "Mixed Evidence", "Published-study style reproduction template; verify source-specific parameters before use.", "PMID 30073406"],
    ["r02", "Research: 20 Hz beta", "Memory protocol example", 20, 400, 15, "Promising Outcome Evidence", "Protocol-oriented beta comparison template.", "PMID 29222722"],
    ["r03", "Research: 5 Hz theta", "Memory comparison", 5, 400, 15, "Mixed Evidence", "Theta comparison template from memory literature.", "PMID 29222722"],
    ["r04", "Research: 40 Hz / 340 Hz", "Attention parameter study", 40, 340, 20, "Promising Outcome Evidence", "Parameter-specific gamma/carrier research template.", "2025 parametric study"],
    ["r05", "Research: theta review anchor", "Theta evidence review", 6, 400, 20, "Limited Evidence", "Template anchored to 2026 theta systematic review; not a treatment claim.", "PMID 42349368"],
    ["r06", "Research: 10 Hz entrainment", "Neural response", 10, 400, 10, "Neural Response Observed", "Auditory steady-state response comparison template.", "eNeuro 2020"],
    ["r07", "Research: monaural control", "Control comparison", 10, 400, 10, "Neural Response Observed", "Monaural control condition.", "eNeuro 2020"],
    ["r08", "Research: sham matched carrier", "Sham/control", 0, 400, 10, "Experimental", "Matched-carrier sham condition.", "Internal research control"],
    ["r09", "Research: 16 Hz", "Beta protocol", 16, 400, 20, "Mixed Evidence", "Protocol comparison setting.", "Evidence matrix"],
    ["r10", "Research: 30 Hz", "Upper conventional range", 30, 400, 20, "Limited Evidence", "Upper conventional/experimental boundary test.", "Evidence matrix"]
  ];
  for (const x of research) {
    const pr = make(x[0], x[1], x[2], x[3], x[4], x[5], "research", x[6], x[7], ["research", "protocol"], x[8]);
    if (x[0] === "r07") pr.project.voices[0].type = "monaural";
    if (x[0] === "r08") pr.project.voices[0].type = "sham";
    PRESETS.push(pr);
  }

  // src/audio/liveEngine.ts
  var LiveEngine = class {
    ctx = null;
    node = null;
    ended = () => {
    };
    async init() {
      if (this.ctx) return;
      this.ctx = new AudioContext();
      await this.ctx.audioWorklet.addModule("./public/worklet.js");
      this.node = new AudioWorkletNode(this.ctx, "binaural-studio", { numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [2] });
      this.node.channelCount = 2;
      this.node.channelCountMode = "explicit";
      this.node.channelInterpretation = "discrete";
      this.node.port.onmessage = (e) => {
        if (e.data?.type === "ended") this.ended();
      };
      this.node.connect(this.ctx.destination);
    }
    async start(project, position = 0, onEnded, assets = {}) {
      if (position !== 0) throw new Error("Non-zero live seek is not enabled until exact phase/noise state transfer is available.");
      await this.init();
      if (onEnded) this.ended = onEnded;
      await this.ctx.resume();
      this.node.port.postMessage({ type: "project", project: structuredClone(project), assets });
      this.node.port.postMessage({ type: "start", position: 0 });
    }
    update(project, assets = {}) {
      this.node?.port.postMessage({ type: "project", project: structuredClone(project), assets });
    }
    stop() {
      this.node?.port.postMessage({ type: "stop" });
    }
    get sampleRate() {
      return this.ctx?.sampleRate ?? 0;
    }
  };

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
  function phaseStep(freq, sampleRate) {
    return TAU * freq / sampleRate;
  }
  function deterministicNoise(id2, index) {
    let h = 2166136261;
    for (let i = 0; i < id2.length; i++) h = Math.imul(h ^ id2.charCodeAt(i), 16777619);
    let x = h ^ Math.imul(index | 0, 2654435761) | 0;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967295 * 2 - 1;
  }
  function advancedWaveformSample(kind, phase, duty, freq, sampleRate, harmonics, cycle) {
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
    const maxH = Math.max(1, Math.min(127, Math.floor(sampleRate * 0.49 / Math.max(1e-9, Math.abs(freq)))));
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
  function nextNoiseStereo(track, state, sampleRate, out, time = 0) {
    const amp = trackParameterValue(track.automation, "amplitude", time, track.amplitude, track.modulation), slope = trackParameterValue(track.automation, "slopeDbOct", time, track.slopeDbOct, track.modulation), hp = trackParameterValue(track.automation, "highpass", time, track.highpass || 0, track.modulation), lp = trackParameterValue(track.automation, "lowpass", time, track.lowpass || 0, track.modulation), corr = trackParameterValue(track.automation, "stereoCorrelation", time, track.stereoCorrelation, track.modulation);
    const a = color(track, state.left, slope), b = color(track, state.right, slope), shared = color(track, state.shared, slope), c = clamp(corr, 0, 1), s = Math.sqrt(c), i = Math.sqrt(1 - c);
    out[0] = filter(track, state.left, a * i + shared * s, sampleRate, hp, lp) * amp;
    out[1] = filter(track, state.right, b * i + shared * s, sampleRate, hp, lp) * amp;
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
    let env2 = 1;
    if (track.fadeIn > 0 && clipT < track.fadeIn) env2 *= clamp(clipT / track.fadeIn, 0, 1);
    const remain = track.duration - clipT;
    if (track.fadeOut > 0 && remain < track.fadeOut) env2 *= clamp(remain / track.fadeOut, 0, 1);
    const amp = trackParameterValue(track.automation, "amplitude", clipT, track.amplitude, track.modulation), pan = clamp(trackParameterValue(track.automation, "pan", clipT, track.pan, track.modulation), -1, 1), width = clamp(trackParameterValue(track.automation, "stereoWidth", clipT, track.stereoWidth ?? 1, track.modulation), 0, 2), dl = trackParameterValue(track.automation, "leftDelayMs", clipT, track.leftDelayMs || 0, track.modulation) / 1e3, dr = trackParameterValue(track.automation, "rightDelayMs", clipT, track.rightDelayMs || 0, track.modulation) / 1e3, hp = trackParameterValue(track.automation, "highpass", clipT, track.highpass || 0, track.modulation), lp = trackParameterValue(track.automation, "lowpass", clipT, track.lowpass || 0, track.modulation);
    let l = sampleChannel(src, at - dl, "left"), r = sampleChannel(src, at - dr, "right");
    const mid = (l + r) * 0.5, side = (l - r) * 0.5 * width;
    l = mid + side;
    r = mid - side;
    const dynamic = { ...track, highpass: hp, lowpass: lp };
    l = filter2(l, "L", dynamic, runtime, outputSampleRate);
    r = filter2(r, "R", dynamic, runtime, outputSampleRate);
    const gL = Math.cos((pan + 1) * Math.PI / 4) * Math.SQRT2, gR = Math.sin((pan + 1) * Math.PI / 4) * Math.SQRT2;
    out[0] = l * amp * env2 * gL;
    out[1] = r * amp * env2 * gR;
    return true;
  }

  // src/audio/render.ts
  function activeVoice(v, t) {
    if (v.mute || t < v.start) return null;
    const span = Math.max(1e-9, v.duration), rel = t - v.start, total = v.loop ? Infinity : span * Math.max(1, v.repetitions);
    if (rel >= total) return null;
    return rel % span;
  }
  var ProjectRenderer = class {
    constructor(project, assets = {}, sampleRate = project.sampleRate, seed = 1369948382) {
      this.project = project;
      this.assets = assets;
      this.sampleRate = sampleRate;
      this.seed = seed;
      this.anySolo = project.voices.some((v) => v.solo) || project.noiseTracks.some((n) => n.solo) || project.audioTracks.some((a) => a.solo);
    }
    project;
    assets;
    sampleRate;
    state = { phaseL: /* @__PURE__ */ new Map(), phaseR: /* @__PURE__ */ new Map(), noise: /* @__PURE__ */ new Map(), links: /* @__PURE__ */ new Map(), audio: /* @__PURE__ */ new Map() };
    frame = 0;
    noiseTmp = new Float64Array(2);
    audioTmp = new Float64Array(2);
    seed;
    anySolo;
    get positionSeconds() {
      return this.frame / this.sampleRate;
    }
    reset() {
      this.frame = 0;
      this.state = { phaseL: /* @__PURE__ */ new Map(), phaseR: /* @__PURE__ */ new Map(), noise: /* @__PURE__ */ new Map(), links: /* @__PURE__ */ new Map(), audio: /* @__PURE__ */ new Map() };
    }
    advanceTo(seconds) {
      const target = Math.max(0, Math.round(seconds * this.sampleRate));
      if (target < this.frame) this.reset();
      const scratch = 4096;
      while (this.frame < target) this.renderFrames(Math.min(scratch, target - this.frame), false);
    }
    renderFrames(count, capture = true) {
      count = Math.max(0, Math.floor(count));
      const left = new Float32Array(capture ? count : 0), right = new Float32Array(capture ? count : 0);
      for (let oi = 0; oi < count; oi++) {
        const t = this.frame / this.sampleRate;
        let l = 0, r = 0;
        for (const v of this.project.voices) {
          if (this.anySolo && !v.solo) continue;
          const sc = segmentContext(this.project, v.id, t);
          if (!sc) continue;
          const local = activeVoice(v, sc.time);
          if (local === null) continue;
          let mr = this.state.links.get(v.id);
          if (!mr) {
            mr = createModulationRuntime();
            this.state.links.set(v.id, mr);
          }
          const fp = resolveVoiceFrame(v, local, mr, 1 / this.sampleRate);
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
          const amp = fp.amplitude * envelope(v, local) * sc.gain;
          let pl = this.state.phaseL.get(v.id) ?? v.phaseLeft, pr = this.state.phaseR.get(v.id) ?? v.phaseRight;
          const duty = fp.duty, pan = fp.pan, cycle = v.cycleAssetId ? this.assets[v.cycleAssetId]?.left : void 0, sampleL = () => advancedWaveformSample(waveformAt(v, local), pl, duty, fl, this.sampleRate, v.harmonics, cycle), sampleR = () => advancedWaveformSample(waveformAt(v, local), pr, duty, fr, this.sampleRate, v.harmonics, cycle), panL = Math.cos((pan + 1) * Math.PI / 4) * Math.SQRT2, panR = Math.sin((pan + 1) * Math.PI / 4) * Math.SQRT2;
          if (v.type === "monaural") {
            const a = sampleL(), b = sampleR(), m = (a + b) * 0.5 * amp;
            l += m * v.leftLevel * panL;
            r += m * v.rightLevel * panR;
          } else if (v.type === "isochronic") {
            const carrier = (fl + fr) / 2, mod = Math.abs(fr - fl), gate = t * mod % 1 < duty ? 1 : 0, s = sampleL() * amp * gate;
            l += s * v.leftLevel * panL;
            r += s * v.rightLevel * panR;
            fl = fr = carrier;
          } else if (v.type === "am") {
            const carrier = (fl + fr) / 2, mod = Math.abs(fr - fl), m = 0.5 + 0.5 * Math.sin(TAU * mod * t), s = sampleL() * amp * m;
            l += s * v.leftLevel * panL;
            r += s * v.rightLevel * panR;
            fl = fr = carrier;
          } else if (v.type === "sham") {
            const carrier = (fl + fr) / 2, s = sampleL() * amp;
            l += s * v.leftLevel * panL;
            r += s * v.rightLevel * panR;
            fl = fr = carrier;
          } else if (v.type === "noise-modulated") {
            const carrier = (fl + fr) / 2, depth = clamp(duty, 0, 1), nm = 1 - depth + depth * (deterministicNoise(v.id, this.frame) * 0.5 + 0.5), sl = sampleL() * amp * nm, sr = sampleR() * amp * nm;
            l += sl * v.leftLevel * panL;
            r += sr * v.rightLevel * panR;
            fl = fr = carrier;
          } else {
            l += sampleL() * amp * v.leftLevel * panL;
            r += sampleR() * amp * v.rightLevel * panR;
          }
          pl = (pl + phaseStep(fl, this.sampleRate)) % TAU;
          pr = (pr + phaseStep(fr, this.sampleRate)) % TAU;
          this.state.phaseL.set(v.id, pl);
          this.state.phaseR.set(v.id, pr);
        }
        for (const n of this.project.noiseTracks) {
          const sc = segmentContext(this.project, n.id, t);
          if (!sc || n.mute || this.anySolo && !n.solo || sc.time < n.start || !n.loop && sc.time >= n.start + n.duration) continue;
          let ns = this.state.noise.get(n.id);
          if (!ns) {
            ns = createNoiseState(n.id, this.seed);
            this.state.noise.set(n.id, ns);
          }
          nextNoiseStereo(n, ns, this.sampleRate, this.noiseTmp, sc.time - n.start);
          l += this.noiseTmp[0];
          r += this.noiseTmp[1];
        }
        for (const a of this.project.audioTracks) {
          const sc = segmentContext(this.project, a.id, t);
          if (!sc || a.mute || this.anySolo && !a.solo || sc.time < a.start) continue;
          const src = this.assets[a.assetId];
          if (!src) continue;
          let ar = this.state.audio.get(a.id);
          if (!ar) {
            ar = createAudioTrackRuntime();
            this.state.audio.set(a.id, ar);
          }
          if (audioTrackSample(a, src, sc.time, this.audioTmp, ar, this.sampleRate)) {
            l += this.audioTmp[0] * sc.gain;
            r += this.audioTmp[1] * sc.gain;
          }
        }
        if (capture) {
          left[oi] = l * this.project.masterGain;
          right[oi] = r * this.project.masterGain;
        }
        this.frame++;
      }
      return { sampleRate: this.sampleRate, left, right, duration: count / this.sampleRate };
    }
  };
  function renderProject(project, options = {}) {
    const sr = options.sampleRate ?? project.sampleRate, start = Math.max(0, options.start ?? 0), dur = Math.max(0, Math.min(options.duration ?? project.duration - start, project.duration - start)), frames = Math.max(0, Math.round(dur * sr)), renderer = new ProjectRenderer(project, options.assets || {}, sr, options.seed);
    renderer.advanceTo(start);
    const chunk = renderer.renderFrames(frames);
    options.onProgress?.(1);
    return chunk;
  }
  function* renderProjectChunks(project, chunkSeconds = 10, options = {}) {
    const sr = options.sampleRate ?? project.sampleRate, renderer = new ProjectRenderer(project, options.assets || {}, sr, options.seed), chunkFrames = Math.max(1, Math.round(chunkSeconds * sr)), total = Math.round(project.duration * sr);
    let done = 0;
    while (done < total) {
      const n = Math.min(chunkFrames, total - done);
      yield renderer.renderFrames(n);
      done += n;
      options.onProgress?.(done / total);
    }
  }

  // src/audio/analyze.ts
  var clamp2 = (v, a, b) => Math.max(a, Math.min(b, v));
  function stats(buf) {
    let pl = 0, pr = 0, sl = 0, sr = 0, xy = 0, x2 = 0, y2 = 0, dl = 0, dr = 0, diff2 = 0;
    for (let i = 0; i < buf.left.length; i++) {
      const l = buf.left[i], r = buf.right[i];
      pl = Math.max(pl, Math.abs(l));
      pr = Math.max(pr, Math.abs(r));
      sl += l * l;
      sr += r * r;
      xy += l * r;
      x2 += l * l;
      y2 += r * r;
      dl += l;
      dr += r;
      const d = l - r;
      diff2 += d * d;
    }
    const n = Math.max(1, buf.left.length), rmsL = Math.sqrt(sl / n), rmsR = Math.sqrt(sr / n), diffRms = Math.sqrt(diff2 / n);
    return { peakLeft: pl, peakRight: pr, rmsLeft: rmsL, rmsRight: rmsR, correlation: xy / Math.sqrt(Math.max(1e-20, x2 * y2)), clipping: pl >= 0.999999 || pr >= 0.999999, dcLeft: dl / n, dcRight: dr / n, mono: diffRms < Math.max(1e-7, (rmsL + rmsR) * 1e-4), channelUnique: diffRms >= Math.max(1e-7, (rmsL + rmsR) * 1e-4) };
  }
  function goertzel(samples, sampleRate, freq) {
    if (freq <= 0 || freq >= sampleRate / 2) return 0;
    const w = 2 * Math.PI * freq / sampleRate, c = 2 * Math.cos(w);
    let s0 = 0, s1 = 0, s2 = 0;
    for (let i = 0; i < samples.length; i++) {
      s0 = samples[i] + c * s1 - s2;
      s2 = s1;
      s1 = s0;
    }
    return Math.sqrt(Math.max(0, s1 * s1 + s2 * s2 - c * s1 * s2)) / Math.max(1, samples.length);
  }
  function dominantFrequency(samples, sampleRate, minHz = 20, maxHz = 1400) {
    const n = Math.min(samples.length, Math.max(4096, Math.floor(sampleRate * 2))), src = samples.subarray(0, n);
    let best = 0, bestMag = -1;
    const resolution = sampleRate / n, lo = Math.max(1, Math.floor(minHz / resolution)), hi = Math.min(Math.floor(maxHz / resolution), Math.floor(n / 2) - 1);
    for (let k = lo; k <= hi; k++) {
      const f = k * resolution, m = goertzel(src, sampleRate, f);
      if (m > bestMag) {
        bestMag = m;
        best = f;
      }
    }
    return best;
  }
  function cpuSpectrum(samples, sampleRate, bins = 512) {
    const n = Math.min(samples.length, 4096), src = samples.subarray(0, n), freqs = new Float32Array(bins), mags = new Float32Array(bins), max = sampleRate / 2;
    for (let i = 0; i < bins; i++) {
      const f = (i + 1) * max / (bins + 1);
      freqs[i] = f;
      mags[i] = goertzel(src, sampleRate, f);
    }
    return { frequencies: freqs, magnitudes: mags, backend: "cpu" };
  }
  function cpuSpectrogram(samples, sampleRate, bins = 96, windowSize = 2048, hop = 512) {
    windowSize = Math.max(128, Math.min(windowSize, samples.length || 128));
    hop = Math.max(1, hop);
    const frames = Math.max(1, 1 + Math.floor(Math.max(0, samples.length - windowSize) / hop)), times = new Float32Array(frames), freqs = new Float32Array(bins), out = new Float32Array(frames * bins);
    for (let b = 0; b < bins; b++) freqs[b] = (b + 1) * (sampleRate * 0.5) / (bins + 1);
    for (let f = 0; f < frames; f++) {
      const start = Math.min(f * hop, Math.max(0, samples.length - windowSize)), win = samples.subarray(start, start + windowSize);
      times[f] = (start + windowSize / 2) / sampleRate;
      for (let b = 0; b < bins; b++) out[f * bins + b] = goertzel(win, sampleRate, freqs[b]);
    }
    return { times, frequencies: freqs, magnitudes: out, frames, bins, backend: "cpu" };
  }
  function topPeaks(samples, sr, min = 40, max = 1200, count = 6) {
    const n = Math.min(samples.length, Math.max(4096, Math.floor(sr * 2))), res = sr / n, candidates = [];
    for (let k = Math.max(1, Math.floor(min / res)); k <= Math.min(Math.floor(max / res), Math.floor(n / 2) - 1); k++) {
      const f = k * res, m = goertzel(samples.subarray(0, n), sr, f);
      if (candidates.length < count || m > candidates[candidates.length - 1].m) {
        candidates.push({ f, m });
        candidates.sort((a, b) => b.m - a.m);
        candidates.length = Math.min(count, candidates.length);
      }
    }
    return candidates;
  }
  function analyzeStereo(buf) {
    const st = stats(buf), dl = dominantFrequency(buf.left, buf.sampleRate), dr = dominantFrequency(buf.right, buf.sampleRate), diff = Math.abs(dr - dl), ownL = goertzel(buf.left, buf.sampleRate, dl), ownR = goertzel(buf.right, buf.sampleRate, dr), crossL = goertzel(buf.left, buf.sampleRate, dr), crossR = goertzel(buf.right, buf.sampleRate, dl), leak = Math.max(crossL / Math.max(1e-12, ownL), crossR / Math.max(1e-12, ownR)), leakageDb = 20 * Math.log10(Math.max(1e-12, leak));
    const purity = Math.max(ownL, ownR), confidence = clamp2(purity * 8 * (1 - Math.abs(st.correlation) * 0.2) * (st.mono ? 0.2 : 1), 0, 1), lp = topPeaks(buf.left, buf.sampleRate), rp = topPeaks(buf.right, buf.sampleRate), candidates = [];
    for (const l of lp) for (const r of rp) {
      const d = Math.abs(r.f - l.f);
      if (d <= 100) candidates.push({ leftHz: l.f, rightHz: r.f, differenceHz: d, score: l.m * r.m });
    }
    candidates.sort((a, b) => b.score - a.score);
    candidates.length = Math.min(8, candidates.length);
    const issues = [];
    if (st.mono) issues.push("Channels are effectively mono/identical.");
    if (st.clipping) issues.push("Digital clipping detected.");
    if (Math.abs(st.dcLeft) > 0.01 || Math.abs(st.dcRight) > 0.01) issues.push("Material DC offset detected.");
    if (diff < 0.05 || diff > 100) issues.push("No conventional binaural carrier difference was identified.");
    return { ...st, duration: buf.duration, sampleRate: buf.sampleRate, dominantLeftHz: dl, dominantRightHz: dr, differenceHz: diff, leakageDb, confidence, classification: !st.mono && diff > 0.05 && diff < 100 ? "Consistent with a stereo carrier pair" : "No clear binaural carrier pair detected", candidates, integrityIssues: issues, backend: "cpu", spectrum: cpuSpectrum(buf.left, buf.sampleRate) };
  }
  function compareAgainstProject(buf, project, toleranceHz = 0.75) {
    const issues = [];
    const a = analyzeStereo(buf), v = project.voices.find((x) => x.type === "binaural" && !x.mute);
    if (a.clipping) issues.push("clipping");
    if (a.mono) issues.push("mono-summed");
    if (v) {
      const direct = v.automation.some((x) => ["leftHz", "rightHz", "beatHz", "carrierHz"].includes(x.parameter));
      if (!direct) {
        if (Math.abs(a.dominantLeftHz - v.leftHz) > toleranceHz) issues.push("left-carrier-mismatch");
        if (Math.abs(a.dominantRightHz - v.rightHz) > toleranceHz) issues.push("right-carrier-mismatch");
        if (Math.abs(a.dominantLeftHz - v.rightHz) <= toleranceHz && Math.abs(a.dominantRightHz - v.leftHz) <= toleranceHz) issues.push("channels-swapped");
      }
    }
    return { pass: issues.length === 0, issues, analysis: a };
  }

  // src/gpu/webgpu.ts
  var WebGpuAnalyzer = class {
    device = null;
    status = { available: false, active: false, reason: "Not initialized" };
    getStatus() {
      return { ...this.status };
    }
    async init(force = false) {
      if (this.device && !force) return this.status;
      try {
        const gpu2 = navigator.gpu;
        if (!gpu2) {
          this.status = { available: false, active: false, reason: "WebGPU unavailable" };
          return this.status;
        }
        const adapter = await gpu2.requestAdapter();
        if (!adapter) {
          this.status = { available: false, active: false, reason: "No WebGPU adapter" };
          return this.status;
        }
        this.device = await adapter.requestDevice();
        this.device.lost.then((info) => {
          this.device = null;
          this.status = { available: true, active: false, reason: `Device lost: ${info?.message || "unknown"}` };
        });
        const limits = {};
        for (const k of ["maxBufferSize", "maxStorageBufferBindingSize", "maxComputeWorkgroupSizeX", "maxComputeInvocationsPerWorkgroup"]) if (adapter.limits?.[k] != null) limits[k] = Number(adapter.limits[k]);
        this.status = { available: true, active: true, adapterName: adapter.info?.description || adapter.info?.vendor || "WebGPU adapter", limits };
        return this.status;
      } catch (e) {
        this.device = null;
        this.status = { available: false, active: false, reason: e instanceof Error ? e.message : String(e) };
        return this.status;
      }
    }
    async spectrum(samples, sampleRate, bins = 512) {
      if (!this.device) await this.init();
      if (!this.device) return cpuSpectrum(samples, sampleRate, bins);
      const n = Math.min(samples.length, 4096), src = samples.slice(0, n), device = this.device;
      const shader = `struct P{n:u32;bins:u32;sampleRate:f32;pad:f32};@group(0) @binding(0)var<storage,read>x:array<f32>;@group(0) @binding(1)var<storage,read_write>out:array<f32>;@group(0) @binding(2)var<uniform>p:P;@compute @workgroup_size(64) fn main(@builtin(global_invocation_id)id:vec3<u32>){let k=id.x;if(k>=p.bins){return;}let f=f32(k+1u)*(p.sampleRate*.5)/f32(p.bins+1u);var re:f32=0.0;var im:f32=0.0;for(var i:u32=0u;i<p.n;i=i+1u){let a=6.28318530718*f*f32(i)/p.sampleRate;re=re+x[i]*cos(a);im=im-x[i]*sin(a);}out[k]=sqrt(re*re+im*im)/f32(p.n);}`;
      try {
        const module = device.createShaderModule({ code: shader });
        const info = await module.getCompilationInfo?.();
        if (info?.messages?.some((m) => m.type === "error")) throw new Error(info.messages.map((m) => m.message).join("; "));
        const inBuf = device.createBuffer({ size: Math.max(4, src.byteLength), usage: 128 | 8, mappedAtCreation: true });
        new Float32Array(inBuf.getMappedRange()).set(src);
        inBuf.unmap();
        const outBuf = device.createBuffer({ size: bins * 4, usage: 128 | 4 }), readBuf = device.createBuffer({ size: bins * 4, usage: 1 | 8 }), uniform = device.createBuffer({ size: 16, usage: 64 | 8, mappedAtCreation: true });
        const dv = new DataView(uniform.getMappedRange());
        dv.setUint32(0, n, true);
        dv.setUint32(4, bins, true);
        dv.setFloat32(8, sampleRate, true);
        uniform.unmap();
        const layout = device.createBindGroupLayout({ entries: [{ binding: 0, visibility: 4, buffer: { type: "read-only-storage" } }, { binding: 1, visibility: 4, buffer: { type: "storage" } }, { binding: 2, visibility: 4, buffer: { type: "uniform" } }] }), pipeline = device.createComputePipeline({ layout: device.createPipelineLayout({ bindGroupLayouts: [layout] }), compute: { module, entryPoint: "main" } }), bind = device.createBindGroup({ layout, entries: [{ binding: 0, resource: { buffer: inBuf } }, { binding: 1, resource: { buffer: outBuf } }, { binding: 2, resource: { buffer: uniform } }] }), enc = device.createCommandEncoder(), pass = enc.beginComputePass();
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bind);
        pass.dispatchWorkgroups(Math.ceil(bins / 64));
        pass.end();
        enc.copyBufferToBuffer(outBuf, 0, readBuf, 0, bins * 4);
        device.queue.submit([enc.finish()]);
        await readBuf.mapAsync(1);
        const mags = new Float32Array(readBuf.getMappedRange().slice(0));
        readBuf.unmap();
        const freqs = new Float32Array(bins);
        for (let i = 0; i < bins; i++) freqs[i] = (i + 1) * (sampleRate * 0.5) / (bins + 1);
        inBuf.destroy();
        outBuf.destroy();
        readBuf.destroy();
        uniform.destroy();
        return { frequencies: freqs, magnitudes: mags, backend: "webgpu" };
      } catch (e) {
        this.status = { available: true, active: false, reason: `WebGPU analysis failed: ${e instanceof Error ? e.message : String(e)}; CPU fallback active` };
        return cpuSpectrum(samples, sampleRate, bins);
      }
    }
    async spectrogram(samples, sampleRate, bins = 96, windowSize = 2048, hop = 512) {
      if (!this.device) await this.init();
      if (!this.device) return cpuSpectrogram(samples, sampleRate, bins, windowSize, hop);
      const frames = Math.max(1, 1 + Math.floor(Math.max(0, samples.length - windowSize) / hop)), times = new Float32Array(frames), freqs = new Float32Array(bins), mags = new Float32Array(frames * bins);
      for (let f = 0; f < frames; f++) {
        const start = Math.min(f * hop, Math.max(0, samples.length - windowSize)), r = await this.spectrum(samples.subarray(start, start + windowSize), sampleRate, bins);
        times[f] = (start + windowSize / 2) / sampleRate;
        if (r.backend !== "webgpu") return cpuSpectrogram(samples, sampleRate, bins, windowSize, hop);
        if (f === 0) freqs.set(r.frequencies);
        mags.set(r.magnitudes, f * bins);
      }
      return { times, frequencies: freqs, magnitudes: mags, frames, bins, backend: "webgpu" };
    }
    async recover() {
      this.device = null;
      return this.init(true);
    }
  };

  // src/core/sessionSchema.ts
  var genOut = { binaural: "binaural", monaural: "monaural", isochronic: "isochronic", am: "am", stereo: "stereo-carrier", "noise-modulated": "noise-modulated", sham: "sham-control" };
  var genIn = { binaural: "binaural", monaural: "monaural", isochronic: "isochronic", am: "am", "stereo-carrier": "stereo", "noise-modulated": "noise-modulated", "sham-control": "sham" };
  var waveOut = { sine: "sine", sine2: "sine-squared", triangle: "triangle", square: "square", "smooth-square": "smoothed-square", saw: "saw", "reverse-saw": "reverse-saw", pulse: "pulse", "bandlimited-square": "square", "bandlimited-saw": "saw", "custom-harmonic": "custom-harmonic", "imported-cycle": "imported-cycle" };
  var waveIn = { sine: "sine", "sine-squared": "sine2", triangle: "triangle", square: "square", "smoothed-square": "smooth-square", saw: "saw", "reverse-saw": "reverse-saw", pulse: "pulse", "custom-harmonic": "custom-harmonic", "imported-cycle": "imported-cycle" };
  var evidenceOut = { "Established Percept": "established-percept", "Neural Response Observed": "neural-response-observed", "Promising Outcome Evidence": "promising-outcome", "Mixed Evidence": "mixed", "Limited Evidence": "limited", "Experimental": "experimental", "Community Claim": "community-claim" };
  var evidenceIn = { "established-percept": "Established Percept", "neural-response-observed": "Neural Response Observed", "promising-outcome": "Promising Outcome Evidence", mixed: "Mixed Evidence", limited: "Limited Evidence", experimental: "Experimental", "community-claim": "Community Claim" };
  var g2db = (g) => 20 * Math.log10(Math.max(1e-12, g));
  var db2g = (db) => Math.pow(10, db / 20);
  function laneOut(a, sr) {
    return { parameter: a.parameter, unit: a.parameter.endsWith("Hz") ? "Hz" : a.parameter === "amplitude" ? "linear" : "", points: a.points.map((p) => ({ frame: Math.max(0, Math.round(p.time * sr)), value: p.value, curve: p.curve, curveData: p.curve === "bezier" ? { c1: p.c1, c2: p.c2 } : void 0 })).map((x) => Object.fromEntries(Object.entries(x).filter(([, v]) => v !== void 0))) };
  }
  function laneIn(a, sr) {
    return { parameter: a.parameter, points: (a.points || []).map((p, i) => ({ id: `ap-${i}`, time: p.frame / sr, value: p.value, curve: p.curve, c1: p.curveData?.c1, c2: p.curveData?.c2 })) };
  }
  function voiceOut(v, sr) {
    return { id: v.id, generator: genOut[v.type], startFrame: Math.round(v.start * sr), durationFrames: Math.max(1, Math.round(v.duration * sr)), leftHz: v.leftHz, rightHz: v.rightHz, centerHz: (v.leftHz + v.rightHz) / 2, beatHz: Math.abs(v.rightHz - v.leftHz), waveform: waveOut[v.waveform], gainDb: g2db(v.amplitude), leftGainDb: g2db(v.leftLevel), rightGainDb: g2db(v.rightLevel), phaseLeftRad: v.phaseLeft, phaseRightRad: v.phaseRight, loop: v.loop, automation: v.automation.map((a) => laneOut(a, sr)), extensions: { name: v.name, duty: v.duty, fadeInFrames: Math.round(v.fadeIn * sr), fadeOutFrames: Math.round(v.fadeOut * sr), repetitions: v.repetitions, links: v.links, harmonics: v.harmonics, waveformAutomation: v.waveformAutomation, cycleAssetId: v.cycleAssetId, routingBus: v.routingBus, bandLimited: v.waveform.startsWith("bandlimited-") } };
  }
  function serializeSession(p) {
    const sr = p.sampleRate;
    return { schemaVersion: "1.0.0", id: p.id, metadata: { title: p.title, author: p.provenance.author, description: p.description, createdAt: p.provenance.createdAt, updatedAt: p.provenance.updatedAt, tags: p.tags }, sampleRatePolicy: { live: "device", offlineHz: sr }, tracks: [...p.voices.map((v) => ({ id: `track-${v.id}`, type: "stimulus", name: v.name, muted: v.mute, solo: v.solo, gainDb: 0, voices: [voiceOut(v, sr)], routingBus: "protected-stereo", extensions: {} })), ...p.noiseTracks.map((n) => ({ id: n.id, type: "noise", name: n.name, muted: n.mute, solo: n.solo, gainDb: g2db(n.amplitude), routingBus: "background", extensions: { noise: n } })), ...p.audioTracks.map((a) => ({ id: a.id, type: "audio", name: a.name, muted: a.mute, solo: a.solo, gainDb: g2db(a.amplitude), routingBus: "background", clips: [a], extensions: {} }))], assets: p.assets.map((a) => Object.fromEntries(Object.entries({ id: a.id, sha256: a.hash, mediaType: a.mime, sizeBytes: a.size, source: a.source || "local", license: a.license, embeddedPath: a.hash ? `assets/${a.id}` : void 0, extensions: { name: a.name } }).filter(([, v]) => v !== void 0))), segments: p.segments.map((s) => ({ id: s.id, name: s.name, startFrame: Math.round(s.start * sr), durationFrames: Math.max(1, Math.round(s.duration * sr)), repeatCount: s.repeat, crossfadeFrames: Math.round(s.crossfade * sr), extensions: { trackIds: s.trackIds, overrides: s.overrides, phaseContinuous: s.phaseContinuous } })), master: { monitorGainDb: g2db(p.masterGain), hardMonitorSafety: true, extensions: {} }, evidence: [{ level: evidenceOut[p.evidence.state], claim: p.evidence.claim, citations: [p.evidence.citation, p.evidence.doi ? `doi:${p.evidence.doi}` : void 0, p.evidence.pmid ? `pmid:${p.evidence.pmid}` : void 0].filter(Boolean), protocolNotes: p.evidence.notes }], provenance: { engineVersion: p.provenance.engineVersion, legacySource: p.provenance.source ? { source: p.provenance.source } : void 0, citations: p.evidence.citation ? [p.evidence.citation] : [], extensions: { appVersion: p.provenance.appVersion, lineage: p.provenance.lineage || [] } }, exportDefaults: { sampleRate: sr }, extensions: { durationSeconds: p.duration, revision: p.revision } };
  }
  function deserializeSession(s) {
    if (!s || s.schemaVersion !== "1.0.0") throw new Error("Unsupported session schema");
    const sr = Number(s.sampleRatePolicy?.offlineHz) || 48e3;
    const voices = [];
    const noiseTracks = [];
    const audioTracks = [];
    for (const t of s.tracks || []) {
      if (t.type === "stimulus") for (const x of t.voices || []) {
        const ex = x.extensions || {};
        voices.push({ id: x.id, name: ex.name || t.name || "Voice", type: genIn[x.generator] || "binaural", leftHz: Number(x.leftHz ?? x.centerHz - (x.beatHz || 0) / 2), rightHz: Number(x.rightHz ?? x.centerHz + (x.beatHz || 0) / 2), amplitude: db2g(Number(x.gainDb) || 0), leftLevel: db2g(Number(x.leftGainDb) || 0), rightLevel: db2g(Number(x.rightGainDb) || 0), phaseLeft: Number(x.phaseLeftRad) || 0, phaseRight: Number(x.phaseRightRad) || 0, waveform: ex.bandLimited && x.waveform === "square" ? "bandlimited-square" : ex.bandLimited && x.waveform === "saw" ? "bandlimited-saw" : waveIn[x.waveform] || "sine", duty: Number(ex.duty ?? 0.5), fadeIn: Number(ex.fadeInFrames || 0) / sr, fadeOut: Number(ex.fadeOutFrames || 0) / sr, start: Number(x.startFrame || 0) / sr, duration: Number(x.durationFrames || 1) / sr, loop: !!x.loop, repetitions: Number(ex.repetitions) || 1, mute: !!t.muted, solo: !!t.solo, automation: (x.automation || []).map((a) => laneIn(a, sr)), links: Array.isArray(ex.links) ? ex.links : [], harmonics: Array.isArray(ex.harmonics) ? ex.harmonics : void 0, waveformAutomation: Array.isArray(ex.waveformAutomation) ? ex.waveformAutomation : void 0, cycleAssetId: ex.cycleAssetId, routingBus: ex.routingBus || "protected-stereo" });
      }
      else if (t.type === "noise" && t.extensions?.noise) noiseTracks.push({ ...t.extensions.noise, mute: !!t.muted, solo: !!t.solo });
      else if (t.type === "audio") for (const c of t.clips || []) audioTracks.push({ ...c, mute: !!t.muted, solo: !!t.solo });
    }
    const ev = s.evidence?.[0] || { level: "experimental", claim: "Imported session" };
    const created = s.metadata?.createdAt || (/* @__PURE__ */ new Date()).toISOString(), updated = s.metadata?.updatedAt || created;
    const segs = (s.segments || []).map((x) => ({ id: x.id, name: x.name, start: Number(x.startFrame || 0) / sr, duration: Number(x.durationFrames || 1) / sr, repeat: Number(x.repeatCount) || 1, crossfade: Number(x.crossfadeFrames || 0) / sr, trackIds: Array.isArray(x.extensions?.trackIds) ? x.extensions.trackIds : void 0, overrides: x.extensions?.overrides, phaseContinuous: x.extensions?.phaseContinuous !== false }));
    const duration = Number(s.extensions?.durationSeconds) || Math.max(1, ...segs.map((x) => x.start + x.duration * x.repeat));
    return { schemaVersion: "1.0.0", id: s.id, title: s.metadata?.title || "Imported session", description: s.metadata?.description || "", duration, sampleRate: sr, masterGain: db2g(Number(s.master?.monitorGainDb) || 0), voices, noiseTracks, audioTracks, assets: (s.assets || []).map((a) => ({ id: a.id, name: a.extensions?.name || a.id, mime: a.mediaType, size: a.sizeBytes || 0, hash: a.sha256 || void 0, license: a.license || "unknown", source: a.source })), segments: segs, markers: [], evidence: { state: evidenceIn[ev.level] || "Experimental", claim: ev.claim || "", citation: ev.citations?.[0], notes: ev.protocolNotes }, provenance: { author: s.metadata?.author || "Unknown", createdAt: created, updatedAt: updated, appVersion: s.provenance?.extensions?.appVersion || "1.0.0", engineVersion: s.provenance?.engineVersion || "unknown", source: s.provenance?.legacySource?.source, lineage: s.provenance?.extensions?.lineage || [] }, tags: s.metadata?.tags || [], revision: Number(s.extensions?.revision) || 1 };
  }

  // src/security/signing.ts
  var te = new TextEncoder();
  function b64(b) {
    const u = b instanceof Uint8Array ? b : new Uint8Array(b);
    let s = "";
    for (const x of u) s += String.fromCharCode(x);
    return btoa(s);
  }
  function unb64(s) {
    const r = atob(s), b = new Uint8Array(r.length);
    for (let i = 0; i < r.length; i++) b[i] = r.charCodeAt(i);
    return b;
  }
  async function createSigningKey() {
    const pair = await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"]);
    return { publicKey: b64(await crypto.subtle.exportKey("spki", pair.publicKey)), privateKey: b64(await crypto.subtle.exportKey("pkcs8", pair.privateKey)), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
  async function signBytes(data, privateKey) {
    const key = await crypto.subtle.importKey("pkcs8", unb64(privateKey), { name: "Ed25519" }, false, ["sign"]);
    return b64(await crypto.subtle.sign("Ed25519", key, new Uint8Array(data)));
  }
  async function verifyBytes(data, signature, publicKey) {
    const key = await crypto.subtle.importKey("spki", unb64(publicKey), { name: "Ed25519" }, false, ["verify"]);
    return crypto.subtle.verify("Ed25519", key, unb64(signature), new Uint8Array(data));
  }
  async function deriveAesKey(passphrase, salt, iterations, usage) {
    const base = await crypto.subtle.importKey("raw", te.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: new Uint8Array(salt), iterations }, base, { name: "AES-GCM", length: 256 }, false, usage);
  }
  async function encryptSigningKey(bundle, passphrase, iterations = 31e4) {
    if (passphrase.length < 10) throw new Error("Signing-key passphrase must be at least 10 characters.");
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12)), key = await deriveAesKey(passphrase, salt, iterations, ["encrypt"]);
    const plaintext = te.encode(bundle.privateKey), ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv: new Uint8Array(iv) }, key, plaintext);
    plaintext.fill(0);
    return { version: 1, algorithm: "PBKDF2-SHA256/AES-256-GCM", publicKey: bundle.publicKey, createdAt: bundle.createdAt, salt: b64(salt), iv: b64(iv), iterations, ciphertext: b64(ciphertext) };
  }
  async function decryptSigningKey(box, passphrase) {
    if (box.version !== 1 || box.algorithm !== "PBKDF2-SHA256/AES-256-GCM") throw new Error("Unsupported encrypted signing-key format.");
    const key = await deriveAesKey(passphrase, unb64(box.salt), box.iterations, ["decrypt"]);
    let plain;
    try {
      plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(box.iv) }, key, unb64(box.ciphertext));
    } catch {
      throw new Error("Incorrect passphrase or damaged signing key.");
    }
    return { publicKey: box.publicKey, privateKey: new TextDecoder().decode(plain), createdAt: box.createdAt };
  }

  // src/formats/zip.ts
  var te2 = new TextEncoder();
  function crc32(data) {
    let c = 4294967295;
    for (const b of data) {
      c ^= b;
      for (let k = 0; k < 8; k++) c = c >>> 1 ^ (c & 1 ? 3988292384 : 0);
    }
    return (c ^ 4294967295) >>> 0;
  }
  function u16(a, v) {
    a.push(v & 255, v >>> 8 & 255);
  }
  function u32(a, v) {
    u16(a, v & 65535);
    u16(a, v >>> 16);
  }
  function createZip(entries) {
    const out = [], central = [];
    let offset = 0, count = 0;
    for (const [name, val] of Object.entries(entries)) {
      if (name.includes("..") || name.startsWith("/") || name.includes("\\")) throw new Error("Unsafe ZIP path");
      const n = te2.encode(name), d = typeof val === "string" ? te2.encode(val) : val, crc = crc32(d);
      const local = [];
      u32(local, 67324752);
      u16(local, 20);
      u16(local, 0);
      u16(local, 0);
      u16(local, 0);
      u16(local, 0);
      u32(local, crc);
      u32(local, d.length);
      u32(local, d.length);
      u16(local, n.length);
      u16(local, 0);
      local.push(...n, ...d);
      out.push(...local);
      const c = [];
      u32(c, 33639248);
      u16(c, 20);
      u16(c, 20);
      u16(c, 0);
      u16(c, 0);
      u16(c, 0);
      u16(c, 0);
      u32(c, crc);
      u32(c, d.length);
      u32(c, d.length);
      u16(c, n.length);
      u16(c, 0);
      u16(c, 0);
      u16(c, 0);
      u16(c, 0);
      u32(c, 0);
      u32(c, offset);
      c.push(...n);
      central.push(...c);
      offset += local.length;
      count++;
    }
    const start = out.length;
    out.push(...central);
    const end = [];
    u32(end, 101010256);
    u16(end, 0);
    u16(end, 0);
    u16(end, count);
    u16(end, count);
    u32(end, central.length);
    u32(end, start);
    u16(end, 0);
    out.push(...end);
    return new Uint8Array(out);
  }
  function readStoredZip(bytes, maxEntries = 256, maxTotal = 256 * 1024 * 1024) {
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), td3 = new TextDecoder(), res = {};
    let p = 0, total = 0, count = 0;
    while (p + 30 <= bytes.length && dv.getUint32(p, true) === 67324752) {
      const method = dv.getUint16(p + 8, true), size = dv.getUint32(p + 18, true), nameLen = dv.getUint16(p + 26, true), extra = dv.getUint16(p + 28, true);
      if (method !== 0) throw new Error("Compressed ZIP entries are not supported by the safe project reader");
      const name = td3.decode(bytes.slice(p + 30, p + 30 + nameLen));
      if (name.includes("..") || name.startsWith("/") || name.includes("\\") || res[name]) throw new Error("Unsafe or duplicate ZIP path");
      const start = p + 30 + nameLen + extra, end = start + size;
      if (end > bytes.length) throw new Error("Truncated ZIP");
      total += size;
      if (++count > maxEntries || total > maxTotal) throw new Error("ZIP safety limit exceeded");
      res[name] = bytes.slice(start, end);
      p = end;
    }
    return res;
  }

  // src/formats/projectPackage.ts
  var te3 = new TextEncoder();
  var td = new TextDecoder();
  async function sha256(b) {
    const copy = new Uint8Array(b);
    const h = await crypto.subtle.digest("SHA-256", copy.buffer);
    return [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  async function exportProjectPackage(project, assetBytes = {}, signer2) {
    const normalized = structuredClone(project);
    for (const a of normalized.assets) {
      const bytes = assetBytes[a.id];
      if (bytes) a.hash = await sha256(bytes);
    }
    const session = te3.encode(JSON.stringify(serializeSession(normalized), null, 2));
    const entries = { "session.json": session, "provenance.json": JSON.stringify(normalized.provenance, null, 2) };
    const manifestEntries = [{ path: "session.json", sha256: await sha256(session), size: session.length }];
    for (const a of normalized.assets) {
      const bytes = assetBytes[a.id];
      if (!bytes) continue;
      const path = `assets/${a.id}`;
      entries[path] = bytes;
      manifestEntries.push({ path, sha256: await sha256(bytes), size: bytes.length, mediaType: a.mime, license: a.license });
    }
    const manifest = { format: "bbeat", version: 1, schemaVersion: "1.0.0", createdAt: (/* @__PURE__ */ new Date()).toISOString(), entries: manifestEntries };
    const manifestBytes = te3.encode(JSON.stringify(manifest, null, 2));
    entries["manifest.json"] = manifestBytes;
    if (signer2) {
      const sig = { version: 1, algorithm: "Ed25519", signedPath: "manifest.json", publicKey: signer2.publicKey, signature: await signBytes(manifestBytes, signer2.privateKey) };
      entries["signature.json"] = JSON.stringify(sig, null, 2);
    }
    return createZip(entries);
  }
  async function importProjectPackageDetailed(bytes) {
    const e = readStoredZip(bytes);
    if (!e["manifest.json"] || !e["session.json"]) throw new Error("Invalid .bbeat package");
    const manifestBytes = e["manifest.json"], manifest = JSON.parse(td.decode(manifestBytes));
    if (manifest.format !== "bbeat" || manifest.version !== 1) throw new Error("Unsupported .bbeat version");
    for (const item of manifest.entries || []) {
      const data = e[item.path];
      if (!data) throw new Error(`Missing package entry: ${item.path}`);
      if (data.length !== item.size || await sha256(data) !== item.sha256) throw new Error(`Project integrity check failed: ${item.path}`);
    }
    let signature = { state: "unsigned" };
    if (e["signature.json"]) {
      try {
        const sig = JSON.parse(td.decode(e["signature.json"]));
        if (sig.version !== 1 || sig.algorithm !== "Ed25519" || sig.signedPath !== "manifest.json" || !sig.publicKey || !sig.signature) throw new Error("Unsupported signature metadata");
        const ok = await verifyBytes(manifestBytes, sig.signature, sig.publicKey);
        signature = ok ? { state: "valid", publicKey: sig.publicKey } : { state: "invalid", publicKey: sig.publicKey, reason: "Signature verification failed" };
      } catch (err) {
        signature = { state: "invalid", reason: err instanceof Error ? err.message : String(err) };
      }
    }
    const project = deserializeSession(JSON.parse(td.decode(e["session.json"]))), assets = {};
    for (const a of project.assets) {
      const path = `assets/${a.id}`;
      if (e[path]) assets[a.id] = e[path];
    }
    return { project, assets, signature };
  }

  // src/formats/streamPcm.ts
  function ascii(v, o, s) {
    for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
  }
  function ext80(rate) {
    let exp = Math.floor(Math.log2(rate)), frac = rate / Math.pow(2, exp), e = exp + 16383;
    return { e, hi: Math.floor(frac * Math.pow(2, 31)), lo: Math.floor(frac * Math.pow(2, 63) % Math.pow(2, 32)) };
  }
  function wavHeader(frames, sampleRate, bits) {
    const bps = bits === "f32" ? 32 : bits, bytes = bps / 8, dataBytes = frames * 2 * bytes, ab = new ArrayBuffer(44), v = new DataView(ab);
    ascii(v, 0, "RIFF");
    v.setUint32(4, 36 + dataBytes, true);
    ascii(v, 8, "WAVEfmt ");
    v.setUint32(16, 16, true);
    v.setUint16(20, bits === "f32" ? 3 : 1, true);
    v.setUint16(22, 2, true);
    v.setUint32(24, sampleRate, true);
    v.setUint32(28, sampleRate * 2 * bytes, true);
    v.setUint16(32, 2 * bytes, true);
    v.setUint16(34, bps, true);
    ascii(v, 36, "data");
    v.setUint32(40, dataBytes, true);
    return new Uint8Array(ab);
  }
  function wavPcm(b, bits) {
    const depth = bits === "f32" ? 32 : bits, bytes = depth / 8, ab = new ArrayBuffer(b.left.length * 2 * bytes), v = new DataView(ab);
    let o = 0;
    for (let i = 0; i < b.left.length; i++) for (const x0 of [b.left[i], b.right[i]]) {
      const x = Math.max(-1, Math.min(1, x0));
      if (bits === "f32") {
        v.setFloat32(o, x, true);
        o += 4;
      } else if (bits === 16) {
        v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), true);
        o += 2;
      } else if (bits === 24) {
        const q = Math.round(x < 0 ? x * 8388608 : x * 8388607);
        v.setUint8(o, q & 255);
        v.setUint8(o + 1, q >> 8 & 255);
        v.setUint8(o + 2, q >> 16 & 255);
        o += 3;
      } else {
        v.setInt32(o, Math.round(x < 0 ? x * 2147483648 : x * 2147483647), true);
        o += 4;
      }
    }
    return new Uint8Array(ab);
  }
  function aiffHeader(frames, sampleRate, bits) {
    const bytes = bits / 8, dataBytes = frames * 2 * bytes, ab = new ArrayBuffer(54), v = new DataView(ab);
    ascii(v, 0, "FORM");
    v.setUint32(4, 46 + dataBytes, false);
    ascii(v, 8, "AIFF");
    ascii(v, 12, "COMM");
    v.setUint32(16, 18, false);
    v.setUint16(20, 2, false);
    v.setUint32(22, frames, false);
    v.setUint16(26, bits, false);
    const x = ext80(sampleRate);
    v.setUint16(28, x.e, false);
    v.setUint32(30, x.hi, false);
    v.setUint32(34, x.lo, false);
    ascii(v, 38, "SSND");
    v.setUint32(42, 8 + dataBytes, false);
    v.setUint32(46, 0, false);
    v.setUint32(50, 0, false);
    return new Uint8Array(ab);
  }
  function aiffPcm(b, bits) {
    const bytes = bits / 8, ab = new ArrayBuffer(b.left.length * 2 * bytes), v = new DataView(ab);
    let o = 0;
    for (let i = 0; i < b.left.length; i++) for (const x0 of [b.left[i], b.right[i]]) {
      const x = Math.max(-1, Math.min(1, x0));
      if (bits === 16) {
        v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), false);
        o += 2;
      } else if (bits === 24) {
        const q = Math.round(x < 0 ? x * 8388608 : x * 8388607);
        v.setUint8(o, q >> 16 & 255);
        v.setUint8(o + 1, q >> 8 & 255);
        v.setUint8(o + 2, q & 255);
        o += 3;
      } else {
        v.setInt32(o, Math.round(x < 0 ? x * 2147483648 : x * 2147483647), false);
        o += 4;
      }
    }
    return new Uint8Array(ab);
  }
  function parts(project, assets, chunkSeconds, onProgress, convert) {
    const out = [], frames = Math.round(project.duration * project.sampleRate);
    let done = 0;
    for (const b of renderProjectChunks(project, chunkSeconds, { assets })) {
      out.push(convert(b));
      done += b.left.length;
      onProgress?.(done / Math.max(1, frames));
    }
    return out;
  }
  function renderWavBlob(project, bits = 24, assets = {}, chunkSeconds = 5, onProgress) {
    const frames = Math.round(project.duration * project.sampleRate);
    return new Blob([wavHeader(frames, project.sampleRate, bits), ...parts(project, assets, chunkSeconds, onProgress, (b) => wavPcm(b, bits))], { type: "audio/wav" });
  }
  function renderAiffBlob(project, bits = 24, assets = {}, chunkSeconds = 5, onProgress) {
    const frames = Math.round(project.duration * project.sampleRate);
    return new Blob([aiffHeader(frames, project.sampleRate, bits), ...parts(project, assets, chunkSeconds, onProgress, (b) => aiffPcm(b, bits))], { type: "audio/aiff" });
  }

  // src/formats/flac.ts
  function crc8(bytes) {
    let crc = 0;
    for (const b of bytes) {
      crc ^= b;
      for (let i = 0; i < 8; i++) crc = crc & 128 ? (crc << 1 ^ 7) & 255 : crc << 1 & 255;
    }
    return crc;
  }
  function crc16(bytes) {
    let crc = 0;
    for (const b of bytes) {
      crc ^= b << 8;
      for (let i = 0; i < 8; i++) crc = crc & 32768 ? (crc << 1 ^ 32773) & 65535 : crc << 1 & 65535;
    }
    return crc;
  }
  function utf8Uint(n) {
    n = Math.max(0, Math.floor(n));
    if (n < 128) return [n];
    if (n < 2048) return [192 | n >> 6, 128 | n & 63];
    if (n < 65536) return [224 | n >> 12, 128 | n >> 6 & 63, 128 | n & 63];
    if (n < 2097152) return [240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | n & 63];
    if (n < 67108864) return [248 | n >> 24, 128 | n >> 18 & 63, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | n & 63];
    return [252 | n / 1073741824 & 1, 128 | n >> 24 & 63, 128 | n >> 18 & 63, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | n & 63];
  }
  function put24(a, o, n) {
    a[o] = n >>> 16 & 255;
    a[o + 1] = n >>> 8 & 255;
    a[o + 2] = n & 255;
  }
  function pcmInt(x, bits) {
    x = Math.max(-1, Math.min(1, x));
    return Math.round(x < 0 ? x * Math.pow(2, bits - 1) : x * (Math.pow(2, bits - 1) - 1));
  }
  function writeSigned(out, n, bits) {
    if (bits === 16) {
      out.push(n >> 8 & 255, n & 255);
    } else out.push(n >> 16 & 255, n >> 8 & 255, n & 255);
  }
  function makeFrame(buf, start, count, bits, frameNo) {
    const header = [255, 248, 112, 16 | (bits === 16 ? 4 : 6) << 1, ...utf8Uint(frameNo), count - 1 >> 8, count - 1 & 255];
    header.push(crc8(Uint8Array.from(header)));
    const body = [];
    for (const channel2 of [buf.left, buf.right]) {
      body.push(2);
      for (let i = 0; i < count; i++) writeSigned(body, pcmInt(channel2[start + i], bits), bits);
    }
    const frame = Uint8Array.from([...header, ...body]);
    const c = crc16(frame);
    return Uint8Array.from([...frame, c >> 8 & 255, c & 255]);
  }
  function encodeFlac(buf, bits = 24, blockSize = 4096) {
    if (buf.left.length !== buf.right.length) throw new Error("FLAC requires equal channel lengths");
    if (!Number.isInteger(buf.sampleRate) || buf.sampleRate < 1 || buf.sampleRate > 1048575) throw new Error("FLAC sample rate is out of range");
    blockSize = Math.max(16, Math.min(65535, Math.floor(blockSize)));
    const frames = [];
    for (let p = 0, n = 0; p < buf.left.length; p += blockSize, n++) frames.push(makeFrame(buf, p, Math.min(blockSize, buf.left.length - p), bits, n));
    const minBlock = buf.left.length ? Math.min(blockSize, buf.left.length) : blockSize, maxBlock = buf.left.length ? Math.min(blockSize, buf.left.length) : blockSize, minFrame = frames.length ? Math.min(...frames.map((x) => x.length)) : 0, maxFrame = frames.length ? Math.max(...frames.map((x) => x.length)) : 0;
    const stream = new Uint8Array(4 + 4 + 34);
    stream.set([102, 76, 97, 67], 0);
    stream[4] = 128;
    put24(stream, 5, 34);
    const v = new DataView(stream.buffer);
    v.setUint16(8, minBlock, false);
    v.setUint16(10, maxBlock, false);
    put24(stream, 12, minFrame);
    put24(stream, 15, maxFrame);
    let packed = BigInt(buf.sampleRate) << 44n | 1n << 41n | BigInt(bits - 1) << 36n | BigInt(buf.left.length);
    for (let i = 0; i < 8; i++) stream[18 + 7 - i] = Number(packed >> BigInt(i * 8) & 255n);
    let size = stream.length;
    for (const f of frames) size += f.length;
    const out = new Uint8Array(size);
    out.set(stream);
    let o = stream.length;
    for (const f of frames) {
      out.set(f, o);
      o += f.length;
    }
    return out;
  }
  function readUtf8Uint(a, state) {
    const b = a[state.o++];
    if (b < 128) return b;
    let count = 0, mask = 128;
    while (b & mask) {
      count++;
      mask >>= 1;
    }
    if (count < 2 || count > 6) throw new Error("Invalid FLAC UTF-8 integer");
    let n = b & (1 << 7 - count) - 1;
    for (let i = 1; i < count; i++) {
      const c = a[state.o++];
      if ((c & 192) !== 128) throw new Error("Invalid FLAC UTF-8 continuation");
      n = n * 64 + (c & 63);
    }
    return n;
  }
  function readSigned(a, state, bits) {
    if (bits === 16) {
      let n = a[state.o] << 8 | a[state.o + 1];
      state.o += 2;
      if (n & 32768) n -= 65536;
      return n / 32768;
    }
    if (bits === 24) {
      let n = a[state.o] << 16 | a[state.o + 1] << 8 | a[state.o + 2];
      state.o += 3;
      if (n & 8388608) n -= 16777216;
      return n / 8388608;
    }
    throw new Error("Unsupported FLAC bit depth");
  }
  function decodeFlacVerbatim(bytes) {
    if (bytes.length < 42 || String.fromCharCode(...bytes.slice(0, 4)) !== "fLaC") throw new Error("Not a FLAC stream");
    let o = 4, sampleRate = 0, bits = 0, total = 0, last = false;
    while (!last) {
      if (o + 4 > bytes.length) throw new Error("Truncated FLAC metadata");
      const h = bytes[o++];
      last = !!(h & 128);
      const type = h & 127, len = bytes[o] << 16 | bytes[o + 1] << 8 | bytes[o + 2];
      o += 3;
      if (o + len > bytes.length) throw new Error("Truncated FLAC metadata block");
      if (type === 0) {
        if (len !== 34) throw new Error("Invalid STREAMINFO");
        let x = 0n;
        for (let i = 0; i < 8; i++) x = x << 8n | BigInt(bytes[o + 10 + i]);
        sampleRate = Number(x >> 44n & 0xfffffn);
        const channels = Number(x >> 41n & 7n) + 1;
        bits = Number(x >> 36n & 31n) + 1;
        total = Number(x & 0xfffffffffn);
        if (channels !== 2) throw new Error("Only stereo FLAC is supported by the deterministic decoder");
        if (bits !== 16 && bits !== 24) throw new Error("Only 16/24-bit verbatim FLAC is supported by the deterministic decoder");
      }
      o += len;
    }
    if (!sampleRate) throw new Error("Missing FLAC STREAMINFO");
    const left = new Float32Array(total), right = new Float32Array(total);
    let written = 0;
    while (o < bytes.length && written < total) {
      const frameStart = o;
      if (bytes[o] !== 255 || (bytes[o + 1] & 254) !== 248) throw new Error("Invalid FLAC frame sync");
      o += 2;
      const blockCode = bytes[o] >> 4, srCode = bytes[o] & 15;
      o++;
      const assignment = bytes[o] >> 4, sizeCode = bytes[o] >> 1 & 7;
      o++;
      if (blockCode !== 7 || srCode !== 0 || assignment !== 1 || !(bits === 16 && sizeCode === 4 || bits === 24 && sizeCode === 6)) throw new Error("FLAC frame uses features outside deterministic verbatim subset");
      const s = { o };
      readUtf8Uint(bytes, s);
      o = s.o;
      const count = (bytes[o] << 8 | bytes[o + 1]) + 1;
      o += 2;
      const headerNoCrc = bytes.slice(frameStart, o), headerCrc = bytes[o++];
      if (crc8(headerNoCrc) !== headerCrc) throw new Error("FLAC header CRC mismatch");
      for (let ch = 0; ch < 2; ch++) {
        if (bytes[o++] !== 2) throw new Error("Only FLAC verbatim subframes are supported");
        const st = { o };
        const dst = ch === 0 ? left : right;
        for (let i = 0; i < count && written + i < total; i++) dst[written + i] = readSigned(bytes, st, bits);
        o = st.o;
      }
      if (o + 2 > bytes.length) throw new Error("Truncated FLAC frame CRC");
      const expect = bytes[o] << 8 | bytes[o + 1], actual = crc16(bytes.slice(frameStart, o));
      o += 2;
      if (expect !== actual) throw new Error("FLAC frame CRC mismatch");
      written += count;
    }
    if (written !== total) throw new Error(`FLAC sample count mismatch: ${written}/${total}`);
    return { sampleRate, left, right, duration: total / sampleRate };
  }

  // src/formats/wav.ts
  function str(v, o, s) {
    for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
  }
  function encodeWav(buf, bits = 24) {
    const bps = bits === "f32" ? 32 : bits, bytes = bps / 8, frames = buf.left.length, dataBytes = frames * 2 * bytes, ab = new ArrayBuffer(44 + dataBytes), v = new DataView(ab);
    str(v, 0, "RIFF");
    v.setUint32(4, 36 + dataBytes, true);
    str(v, 8, "WAVEfmt ");
    v.setUint32(16, 16, true);
    v.setUint16(20, bits === "f32" ? 3 : 1, true);
    v.setUint16(22, 2, true);
    v.setUint32(24, buf.sampleRate, true);
    v.setUint32(28, buf.sampleRate * 2 * bytes, true);
    v.setUint16(32, 2 * bytes, true);
    v.setUint16(34, bps, true);
    str(v, 36, "data");
    v.setUint32(40, dataBytes, true);
    let o = 44;
    for (let i = 0; i < frames; i++) for (const x0 of [buf.left[i], buf.right[i]]) {
      const x = Math.max(-1, Math.min(1, x0));
      if (bits === "f32") {
        v.setFloat32(o, x, true);
        o += 4;
      } else if (bits === 16) {
        v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), true);
        o += 2;
      } else if (bits === 24) {
        let q = Math.round(x < 0 ? x * 8388608 : x * 8388607);
        v.setUint8(o, q & 255);
        v.setUint8(o + 1, q >> 8 & 255);
        v.setUint8(o + 2, q >> 16 & 255);
        o += 3;
      } else {
        v.setInt32(o, Math.round(x < 0 ? x * 2147483648 : x * 2147483647), true);
        o += 4;
      }
    }
    return new Uint8Array(ab);
  }
  function decodeWav(bytes) {
    const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    if (String.fromCharCode(...bytes.slice(0, 4)) !== "RIFF" || String.fromCharCode(...bytes.slice(8, 12)) !== "WAVE") throw new Error("Not a RIFF/WAVE file");
    let p = 12, fmt4 = 0, ch = 0, sr = 0, bits = 0, dataOff = 0, dataLen = 0;
    while (p + 8 <= bytes.length) {
      const id2 = String.fromCharCode(...bytes.slice(p, p + 4)), len = v.getUint32(p + 4, true);
      if (id2 === "fmt ") {
        fmt4 = v.getUint16(p + 8, true);
        ch = v.getUint16(p + 10, true);
        sr = v.getUint32(p + 12, true);
        bits = v.getUint16(p + 22, true);
      }
      if (id2 === "data") {
        dataOff = p + 8;
        dataLen = len;
        break;
      }
      p += 8 + len + (len & 1);
    }
    if (ch !== 2 || ![1, 3].includes(fmt4) || ![16, 24, 32].includes(bits)) throw new Error("Unsupported WAV encoding");
    const bps = bits / 8, frames = Math.floor(dataLen / (ch * bps)), l = new Float32Array(frames), r = new Float32Array(frames);
    let o = dataOff;
    const read = () => {
      if (fmt4 === 3) {
        const x2 = v.getFloat32(o, true);
        o += 4;
        return x2;
      }
      if (bits === 16) {
        const x2 = v.getInt16(o, true) / 32768;
        o += 2;
        return x2;
      }
      if (bits === 24) {
        let q = v.getUint8(o) | v.getUint8(o + 1) << 8 | v.getUint8(o + 2) << 16;
        if (q & 8388608) q |= 4278190080;
        o += 3;
        return q / 8388608;
      }
      const x = v.getInt32(o, true) / 2147483648;
      o += 4;
      return x;
    };
    for (let i = 0; i < frames; i++) {
      l[i] = read();
      r[i] = read();
    }
    return { sampleRate: sr, left: l, right: r, duration: frames / sr };
  }
  function encodeMonoWav(samples, sampleRate, bits = 24) {
    const bps = bits === "f32" ? 32 : bits, bytes = bps / 8, dataBytes = samples.length * bytes, ab = new ArrayBuffer(44 + dataBytes), v = new DataView(ab);
    str(v, 0, "RIFF");
    v.setUint32(4, 36 + dataBytes, true);
    str(v, 8, "WAVEfmt ");
    v.setUint32(16, 16, true);
    v.setUint16(20, bits === "f32" ? 3 : 1, true);
    v.setUint16(22, 1, true);
    v.setUint32(24, sampleRate, true);
    v.setUint32(28, sampleRate * bytes, true);
    v.setUint16(32, bytes, true);
    v.setUint16(34, bps, true);
    str(v, 36, "data");
    v.setUint32(40, dataBytes, true);
    let o = 44;
    for (const x0 of samples) {
      const x = Math.max(-1, Math.min(1, x0));
      if (bits === "f32") {
        v.setFloat32(o, x, true);
        o += 4;
      } else if (bits === 16) {
        v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), true);
        o += 2;
      } else if (bits === 24) {
        const q = Math.round(x < 0 ? x * 8388608 : x * 8388607);
        v.setUint8(o, q & 255);
        v.setUint8(o + 1, q >> 8 & 255);
        v.setUint8(o + 2, q >> 16 & 255);
        o += 3;
      } else {
        v.setInt32(o, Math.round(x < 0 ? x * 2147483648 : x * 2147483647), true);
        o += 4;
      }
    }
    return new Uint8Array(ab);
  }

  // src/formats/exportBundle.ts
  function safe(s) {
    return s.replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "") || "track";
  }
  function stimulusManifest(project) {
    return { format: "mindaural-stimulus-manifest", version: 1, generatedAt: (/* @__PURE__ */ new Date()).toISOString(), project: { id: project.id, title: project.title, revision: project.revision, schemaVersion: project.schemaVersion, engineVersion: project.provenance.engineVersion, sampleRate: project.sampleRate, duration: project.duration }, evidence: project.evidence, voices: project.voices.map((v) => ({ id: v.id, name: v.name, type: v.type, leftHz: v.leftHz, rightHz: v.rightHz, beatHz: Math.abs(v.rightHz - v.leftHz), centerHz: (v.leftHz + v.rightHz) / 2, amplitude: v.amplitude, leftLevel: v.leftLevel, rightLevel: v.rightLevel, phaseLeft: v.phaseLeft, phaseRight: v.phaseRight, waveform: v.waveform, duty: v.duty, start: v.start, duration: v.duration, automation: v.automation, links: v.links, routingBus: v.routingBus })), noiseTracks: project.noiseTracks, audioTracks: project.audioTracks.map((a) => ({ ...a, asset: project.assets.find((x) => x.id === a.assetId) })), segments: project.segments, provenance: project.provenance };
  }
  function recipeJson(project) {
    const s = serializeSession(project);
    s.assets = (s.assets || []).map((a) => ({ ...a, embeddedPath: void 0 }));
    return JSON.stringify({ format: "mindaural-recipe", version: 1, session: s }, null, 2);
  }
  function researchManifestJson(project) {
    return JSON.stringify(stimulusManifest(project), null, 2);
  }
  function scopeProject(project, scope) {
    const p = structuredClone(project);
    if (scope === "stimulus") {
      p.noiseTracks = [];
      p.audioTracks = [];
    } else if (scope === "background") {
      p.voices = [];
    }
    return p;
  }
  function renderScope(project, assets, scope, start = 0, duration) {
    return renderProject(scopeProject(project, scope), { start, duration: duration ?? Math.max(0, project.duration - start), assets });
  }
  function createStemBundle(project, assets) {
    const entries = { "manifest.json": JSON.stringify(stimulusManifest(project), null, 2) };
    for (const v of project.voices) {
      const p = structuredClone(project);
      p.voices = p.voices.filter((x) => x.id === v.id);
      p.noiseTracks = [];
      p.audioTracks = [];
      entries[`stems/voice-${safe(v.name)}.wav`] = encodeWav(renderProject(p, { assets }), 24);
    }
    for (const n of project.noiseTracks) {
      const p = structuredClone(project);
      p.voices = [];
      p.noiseTracks = p.noiseTracks.filter((x) => x.id === n.id);
      p.audioTracks = [];
      entries[`stems/noise-${safe(n.name)}.wav`] = encodeWav(renderProject(p, { assets }), 24);
    }
    for (const a of project.audioTracks) {
      const p = structuredClone(project);
      p.voices = [];
      p.noiseTracks = [];
      p.audioTracks = p.audioTracks.filter((x) => x.id === a.id);
      entries[`stems/audio-${safe(a.name)}.wav`] = encodeWav(renderProject(p, { assets }), 24);
    }
    return createZip(entries);
  }
  function createDiagnosticChannels(project, assets) {
    const b = renderProject(project, { assets });
    return { left: encodeMonoWav(b.left, b.sampleRate, 24), right: encodeMonoWav(b.right, b.sampleRate, 24) };
  }

  // src/formats/opus.ts
  var te4 = new TextEncoder();
  function concat(parts2) {
    const n = parts2.reduce((s, p) => s + p.length, 0), out = new Uint8Array(n);
    let o = 0;
    for (const p of parts2) {
      out.set(p, o);
      o += p.length;
    }
    return out;
  }
  function u16le(n) {
    return Uint8Array.of(n & 255, n >>> 8 & 255);
  }
  function u32le(n) {
    return Uint8Array.of(n & 255, n >>> 8 & 255, n >>> 16 & 255, n >>> 24 & 255);
  }
  function u64le(n) {
    let x = BigInt(Math.max(0, Math.floor(n))), a = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
      a[i] = Number(x & 255n);
      x >>= 8n;
    }
    return a;
  }
  function u16be(n) {
    return Uint8Array.of(n >>> 8 & 255, n & 255);
  }
  function makeOpusHead(channels = 2, preSkip = 0, inputRate = 48e3) {
    return concat([te4.encode("OpusHead"), Uint8Array.of(1, channels), u16le(preSkip), u32le(inputRate), u16le(0), Uint8Array.of(0)]);
  }
  function makeOpusTags(vendor = "Mindaural") {
    const v = te4.encode(vendor);
    return concat([te4.encode("OpusTags"), u32le(v.length), v, u32le(0)]);
  }
  var oggTable = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let r = i << 24;
      for (let j = 0; j < 8; j++) r = (r << 1 ^ (r & 2147483648 ? 79764919 : 0)) >>> 0;
      t[i] = r;
    }
    return t;
  })();
  function oggCrc(a) {
    let crc = 0;
    for (const b of a) crc = (crc << 8 ^ oggTable[(crc >>> 24 ^ b) & 255]) >>> 0;
    return crc >>> 0;
  }
  function oggPage(packet, serial, seq, granule, flags) {
    const segs = Math.ceil(packet.length / 255) + (packet.length % 255 === 0 ? 1 : 0);
    if (segs > 255) throw new Error("Opus packet too large for single Ogg page");
    const lace = new Uint8Array(segs);
    let left = packet.length;
    for (let i = 0; i < segs; i++) {
      lace[i] = Math.min(255, left);
      left -= lace[i];
    }
    const h = new Uint8Array(27 + segs);
    h.set(te4.encode("OggS"));
    h[4] = 0;
    h[5] = flags;
    h.set(u64le(granule), 6);
    h.set(u32le(serial), 14);
    h.set(u32le(seq), 18);
    h[26] = segs;
    h.set(lace, 27);
    const page = concat([h, packet]), crc = oggCrc(page);
    page[22] = crc & 255;
    page[23] = crc >>> 8 & 255;
    page[24] = crc >>> 16 & 255;
    page[25] = crc >>> 24 & 255;
    return page;
  }
  function muxOggOpus(packets, channels = 2, sampleRate = 48e3) {
    const serial = 1111642929;
    let seq = 0, granule = 0;
    const pages = [oggPage(makeOpusHead(channels, 0, sampleRate), serial, seq++, 0, 2), oggPage(makeOpusTags(), serial, seq++, 0, 0)];
    for (let i = 0; i < packets.length; i++) {
      granule += packets[i].samples;
      pages.push(oggPage(packets[i].data, serial, seq++, granule, i === packets.length - 1 ? 4 : 0));
    }
    return concat(pages);
  }
  function id(...n) {
    return Uint8Array.from(n);
  }
  function vintSize(n) {
    for (let len = 1; len <= 8; len++) {
      const max = Math.pow(2, 7 * len) - 2;
      if (n <= max) {
        const a = new Uint8Array(len);
        let x = BigInt(n);
        for (let i = len - 1; i >= 0; i--) {
          a[i] = Number(x & 255n);
          x >>= 8n;
        }
        a[0] |= 1 << 8 - len;
        return a;
      }
    }
    throw new Error("EBML element too large");
  }
  function elem(elementId, payload) {
    return concat([elementId, vintSize(payload.length), payload]);
  }
  function uint(n, bytes) {
    let len = bytes || 1;
    while (!bytes && n >= Math.pow(256, len) && len < 8) len++;
    const a = new Uint8Array(len);
    let x = BigInt(Math.floor(n));
    for (let i = len - 1; i >= 0; i--) {
      a[i] = Number(x & 255n);
      x >>= 8n;
    }
    return a;
  }
  function str2(s) {
    return te4.encode(s);
  }
  function float64(n) {
    const a = new Uint8Array(8);
    new DataView(a.buffer).setFloat64(0, n, false);
    return a;
  }
  function ebml(...parts2) {
    return concat(parts2);
  }
  function simpleBlock(packet, relativeMs) {
    const tc = Math.max(-32768, Math.min(32767, Math.round(relativeMs))), payload = concat([Uint8Array.of(129), u16be(tc & 65535), Uint8Array.of(128), packet]);
    return elem(id(163), payload);
  }
  function muxWebmOpus(packets, channels = 2, sampleRate = 48e3) {
    const ebmlHeader = elem(id(26, 69, 223, 163), ebml(
      elem(id(66, 134), uint(1)),
      elem(id(66, 247), uint(1)),
      elem(id(66, 242), uint(4)),
      elem(id(66, 243), uint(8)),
      elem(id(66, 130), str2("webm")),
      elem(id(66, 135), uint(4)),
      elem(id(66, 133), uint(2))
    ));
    const info = elem(id(21, 73, 169, 102), ebml(elem(id(42, 215, 177), uint(1e6, 4)), elem(id(77, 128), str2("Mindaural")), elem(id(87, 65), str2("Mindaural"))));
    const audio = elem(id(225), ebml(elem(id(181), float64(sampleRate)), elem(id(159), uint(channels)), elem(id(98, 100), uint(32))));
    const track = elem(id(174), ebml(elem(id(215), uint(1)), elem(id(115, 197), uint(1)), elem(id(131), uint(2)), elem(id(134), str2("A_OPUS")), elem(id(99, 162), makeOpusHead(channels, 0, sampleRate)), elem(id(86, 170), uint(0)), elem(id(86, 187), uint(8e7, 4)), audio));
    const tracks = elem(id(22, 84, 174, 107), track);
    const clusters = [];
    let i = 0;
    while (i < packets.length) {
      const baseMs = Math.floor(packets[i].timestampUs / 1e3), items = [elem(id(231), uint(baseMs))];
      while (i < packets.length) {
        const ms = packets[i].timestampUs / 1e3, rel = ms - baseMs;
        if (rel > 3e4) break;
        items.push(simpleBlock(packets[i].data, rel));
        i++;
      }
      clusters.push(elem(id(31, 67, 182, 117), ebml(...items)));
    }
    const segmentPayload = ebml(info, tracks, ...clusters);
    return concat([ebmlHeader, elem(id(24, 83, 128, 103), segmentPayload)]);
  }
  function linearResample(input, target = 48e3) {
    if (input.sampleRate === target) return input;
    const n = Math.max(1, Math.round(input.left.length * target / input.sampleRate)), l = new Float32Array(n), r = new Float32Array(n), ratio = input.sampleRate / target;
    for (let i = 0; i < n; i++) {
      const p = i * ratio, a = Math.floor(p), b = Math.min(input.left.length - 1, a + 1), f = p - a;
      l[i] = input.left[a] * (1 - f) + input.left[b] * f;
      r[i] = input.right[a] * (1 - f) + input.right[b] * f;
    }
    return { sampleRate: target, left: l, right: r, duration: n / target };
  }
  async function encodeOpusPackets(input, bitrate = 128e3) {
    const AE = globalThis.AudioEncoder, AD = globalThis.AudioData;
    if (!AE || !AD) throw new Error("This browser does not expose WebCodecs Opus encoding.");
    const b = linearResample(input, 48e3), config = { codec: "opus", sampleRate: 48e3, numberOfChannels: 2, bitrate };
    if (AE.isConfigSupported) {
      const s = await AE.isConfigSupported(config);
      if (!s.supported) throw new Error("This browser does not support WebCodecs Opus encoding.");
    }
    const out = [];
    let fatal = null;
    const encoder = new AE({ output: (chunk) => {
      const data = new Uint8Array(chunk.byteLength);
      chunk.copyTo(data);
      const dur = Number(chunk.duration || 2e4), samples = Math.max(1, Math.round(dur * 48e3 / 1e6));
      out.push({ data, samples, timestampUs: Number(chunk.timestamp || 0) });
    }, error: (e) => {
      fatal = e;
    } });
    encoder.configure(config);
    const frame = 960;
    for (let p = 0; p < b.left.length; p += frame) {
      const count = Math.min(frame, b.left.length - p), planes = new Float32Array(count * 2);
      planes.set(b.left.subarray(p, p + count), 0);
      planes.set(b.right.subarray(p, p + count), count);
      const audio = new AD({ format: "f32-planar", sampleRate: 48e3, numberOfFrames: count, numberOfChannels: 2, timestamp: Math.round(p / 48e3 * 1e6), data: planes });
      encoder.encode(audio);
      audio.close();
    }
    await encoder.flush();
    encoder.close();
    if (fatal) throw fatal;
    out.sort((a, b2) => a.timestampUs - b2.timestampUs);
    if (!out.length) throw new Error("Opus encoder returned no packets.");
    return out;
  }
  async function encodeOggOpus(input, bitrate = 128e3) {
    const packets = await encodeOpusPackets(input, bitrate);
    return muxOggOpus(packets, 2, 48e3);
  }
  async function encodeWebmOpus(input, bitrate = 128e3) {
    const packets = await encodeOpusPackets(input, bitrate);
    return muxWebmOpus(packets, 2, 48e3);
  }

  // src/storage/projects.ts
  var DB = "mindaural";
  var STORE = "projects";
  var VERSION = 3;
  function open() {
    return new Promise((resolve, reject) => {
      const r = indexedDB.open(DB, VERSION);
      r.onupgradeneeded = () => {
        if (!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE, { keyPath: "id" });
        if (!r.result.objectStoreNames.contains("assets")) r.result.createObjectStore("assets", { keyPath: "id" });
        if (!r.result.objectStoreNames.contains("playlists")) r.result.createObjectStore("playlists", { keyPath: "id" });
      };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  }
  async function saveProject(p) {
    const db = await open();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(p);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }
  async function loadProjects() {
    const db = await open();
    const rows = await new Promise((resolve, reject) => {
      const r = db.transaction(STORE).objectStore(STORE).getAll();
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    db.close();
    return rows.sort((a, b) => b.provenance.updatedAt.localeCompare(a.provenance.updatedAt));
  }

  // src/storage/assets.ts
  var DB2 = "mindaural";
  var STORE2 = "assets";
  var VERSION2 = 3;
  function open2() {
    return new Promise((resolve, reject) => {
      const r = indexedDB.open(DB2, VERSION2);
      r.onupgradeneeded = () => {
        if (!r.result.objectStoreNames.contains("projects")) r.result.createObjectStore("projects", { keyPath: "id" });
        if (!r.result.objectStoreNames.contains(STORE2)) r.result.createObjectStore(STORE2, { keyPath: "id" });
        if (!r.result.objectStoreNames.contains("playlists")) r.result.createObjectStore("playlists", { keyPath: "id" });
      };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  }
  async function saveAssetBytes(id2, bytes, mime, name) {
    const db = await open2();
    const stable = new Uint8Array(bytes);
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE2, "readwrite");
      tx.objectStore(STORE2).put({ id: id2, bytes: stable.buffer, mime, name, updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }
  async function loadAssetBytes(id2) {
    const db = await open2();
    const row2 = await new Promise((resolve, reject) => {
      const r = db.transaction(STORE2).objectStore(STORE2).get(id2);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    db.close();
    return row2?.bytes ? new Uint8Array(row2.bytes) : null;
  }

  // src/formats/aiff.ts
  function readExt80(v, o) {
    const e = v.getUint16(o, false);
    if (e === 0) return 0;
    const hi = v.getUint32(o + 2, false), lo = v.getUint32(o + 6, false), frac = hi / Math.pow(2, 31) + lo / Math.pow(2, 63);
    return frac * Math.pow(2, e - 16383);
  }
  function decodeAiff(bytes) {
    const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), tag = (o2) => String.fromCharCode(...bytes.slice(o2, o2 + 4));
    if (tag(0) !== "FORM" || !["AIFF", "AIFC"].includes(tag(8))) throw new Error("Not an AIFF file");
    if (tag(8) === "AIFC") throw new Error("Compressed AIFC is not supported by the project PCM reader");
    let p = 12, ch = 0, frames = 0, bits = 0, sr = 0, ssnd = -1, ssndLen = 0, offset = 0;
    while (p + 8 <= bytes.length) {
      const id2 = tag(p), len = v.getUint32(p + 4, false), body = p + 8;
      if (id2 === "COMM") {
        ch = v.getUint16(body, false);
        frames = v.getUint32(body + 2, false);
        bits = v.getUint16(body + 6, false);
        sr = Math.round(readExt80(v, body + 8));
      } else if (id2 === "SSND") {
        ssnd = body + 8;
        ssndLen = Math.max(0, len - 8);
        offset = v.getUint32(body, false);
        ssnd += offset;
      }
      p += 8 + len + (len & 1);
    }
    if (ch !== 1 && ch !== 2) throw new Error("AIFF must be mono or stereo");
    if (![16, 24, 32].includes(bits) || !sr || ssnd < 0) throw new Error("Unsupported AIFF PCM format");
    const bps = bits / 8, available = Math.floor((ssndLen - offset) / (ch * bps)), count = Math.min(frames || available, available), l = new Float32Array(count), r = new Float32Array(count);
    let o = ssnd;
    const read = () => {
      if (bits === 16) {
        const x2 = v.getInt16(o, false) / 32768;
        o += 2;
        return x2;
      }
      if (bits === 24) {
        let q = v.getUint8(o) << 16 | v.getUint8(o + 1) << 8 | v.getUint8(o + 2);
        if (q & 8388608) q |= 4278190080;
        o += 3;
        return q / 8388608;
      }
      const x = v.getInt32(o, false) / 2147483648;
      o += 4;
      return x;
    };
    for (let i = 0; i < count; i++) {
      l[i] = read();
      r[i] = ch === 2 ? read() : l[i];
    }
    return { sampleRate: sr, left: l, right: r, duration: count / sr };
  }

  // src/audio/import.ts
  var banned = /\.(m4a|aac|mp4)$/i;
  function allowedAudioName(name) {
    return /\.(wav|wave|aif|aiff|flac|mp3|ogg|oga|opus|webm)$/i.test(name) && !banned.test(name);
  }
  async function decodeAudioBytes(bytes, name, mime = "") {
    if (banned.test(name) || /aac|mp4/i.test(mime)) throw new Error("AAC/M4A is intentionally unsupported");
    if (/\.wav$|\.wave$/i.test(name) || /audio\/wav/i.test(mime)) return decodeWav(bytes);
    if (/\.aif$|\.aiff$/i.test(name) || /audio\/(aiff|x-aiff)/i.test(mime)) return decodeAiff(bytes);
    if (/\.flac$/i.test(name) || /audio\/flac/i.test(mime)) {
      try {
        return decodeFlacVerbatim(bytes);
      } catch {
      }
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) throw new Error("No browser audio decoder is available");
    const ctx = new AC();
    try {
      const copy = bytes.slice().buffer, ab = await ctx.decodeAudioData(copy), l = new Float32Array(ab.length), r = new Float32Array(ab.length);
      ab.copyFromChannel(l, 0);
      ab.copyFromChannel(r, Math.min(1, ab.numberOfChannels - 1));
      return { sampleRate: ab.sampleRate, left: l, right: r, duration: ab.duration };
    } finally {
      await ctx.close();
    }
  }

  // src/legacy/bwg.ts
  var td2 = new TextDecoder("latin1");
  function importBwg(bytes) {
    const text = td2.decode(bytes);
    if (/\0/.test(text.slice(0, 128))) throw new Error("Binary BWG variant is not recognized safely by this build");
    const p = createDefaultProject("Imported BWGen preset");
    const warnings = [], unsupported = [];
    const get = (...keys) => {
      for (const k of keys) {
        const m = text.match(new RegExp(`(?:^|\\n)\\s*${k}\\s*[=:]\\s*([-+0-9.]+)`, "i"));
        if (m) return Number(m[1]);
      }
      return void 0;
    };
    const carrier = get("carrier", "basefreq", "base frequency"), beat = get("beat", "beatfreq", "beat frequency"), duration = get("duration", "length");
    if (Number.isFinite(carrier) && Number.isFinite(beat)) p.voices[0] = setCenterBeat(p.voices[0], carrier, beat);
    else warnings.push("Carrier/beat fields were not found; defaults retained.");
    if (Number.isFinite(duration)) {
      p.duration = Math.max(1, duration);
      p.voices[0].duration = p.duration;
      p.segments[0].duration = p.duration;
    }
    for (const term of ["visual", "audiostrobe", "background", "noise", "modulation", "segment"]) if (new RegExp(term, "i").test(text)) unsupported.push(`${term} data requires exact field mapping before lossless import`);
    return { project: p, report: { supported: unsupported.length === 0, imported: 1, warnings, unsupported, sourceFormat: "BWGen text preset" } };
  }
  function exportBwg(project) {
    const unsupported = [];
    if (project.voices.length !== 1) unsupported.push("multiple voices");
    if (project.noiseTracks.length) unsupported.push("noise tracks");
    if (project.audioTracks.length) unsupported.push("audio tracks");
    if (project.voices[0]?.automation.length) unsupported.push("automation");
    if (project.segments.length !== 1) unsupported.push("multiple segments");
    if (unsupported.length) return { bytes: null, report: { supported: false, imported: 0, warnings: [], unsupported, sourceFormat: "BWGen text subset" } };
    const v = project.voices[0];
    const carrier = (v.leftHz + v.rightHz) / 2, beat = Math.abs(v.rightHz - v.leftHz);
    const text = `; Mindaural BWGen-compatible text subset
Carrier=${carrier}
Beat=${beat}
Duration=${project.duration}
Volume=${v.amplitude}
Waveform=${v.waveform}
`;
    return { bytes: new TextEncoder().encode(text), report: { supported: true, imported: 0, warnings: [], unsupported: [], sourceFormat: "BWGen text subset" } };
  }

  // src/core/history.ts
  var History = class {
    constructor(initial, limit = 100) {
      this.limit = limit;
      this.present = structuredClone(initial);
    }
    limit;
    past = [];
    present;
    future = [];
    push(next) {
      this.past.push(structuredClone(this.present));
      if (this.past.length > this.limit) this.past.shift();
      this.present = structuredClone(next);
      this.future = [];
      return structuredClone(this.present);
    }
    undo() {
      if (!this.past.length) return null;
      this.future.unshift(structuredClone(this.present));
      this.present = this.past.pop();
      return structuredClone(this.present);
    }
    redo() {
      if (!this.future.length) return null;
      this.past.push(structuredClone(this.present));
      this.present = this.future.shift();
      return structuredClone(this.present);
    }
    replace(next) {
      this.present = structuredClone(next);
      this.past = [];
      this.future = [];
    }
    canUndo() {
      return this.past.length > 0;
    }
    canRedo() {
      return this.future.length > 0;
    }
  };

  // src/research/session.ts
  function randomInt(max) {
    const x = new Uint32Array(1);
    crypto.getRandomValues(x);
    return x[0] % max;
  }
  function blindCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for (let i = 0; i < 6; i++) s += alphabet[randomInt(alphabet.length)];
    return s;
  }
  function makeCondition(role, project) {
    return { id: crypto.randomUUID(), role, blindLabel: blindCode(), project: structuredClone(project) };
  }
  function randomize(ids) {
    const a = ids.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function createResearchRun(project) {
    const a = makeCondition("A", project), control = makeCondition("control", { ...structuredClone(project), voices: project.voices.map((v) => ({ ...v, type: "sham" })) });
    const conditions = [a, control];
    return { id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString(), conditions, order: randomize(conditions.map((x) => x.id)), preRating: 50, postRating: 50, notes: "", events: [], reactionTimesMs: [] };
  }
  function logEvent(run, type, data) {
    const now = performance.now(), start = run.startedAt ?? now;
    return { ...run, startedAt: run.startedAt ?? now, events: [...run.events, { at: (/* @__PURE__ */ new Date()).toISOString(), elapsedMs: Math.round(now - start), type, data }] };
  }
  function exportResearchJson(run) {
    return JSON.stringify({ ...run, conditions: run.conditions.map((c) => ({ ...c, project: serializeSession(c.project) })) }, null, 2);
  }
  function cell(x) {
    const s = String(x ?? "");
    return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
  }
  function exportResearchCsv(run) {
    const rows = [["run_id", "condition_id", "role", "blind_label", "order", "pre_rating", "post_rating", "reaction_times_ms", "notes"], ...run.conditions.map((c) => [run.id, c.id, c.role, c.blindLabel, run.order.indexOf(c.id) + 1, run.preRating, run.postRating, run.reactionTimesMs.join("|"), run.notes])];
    return rows.map((r) => r.map(cell).join(",")).join("\n");
  }

  // src/ui/StudioSurface.tsx
  var fmt = (n, d = 2) => Number.isFinite(n) ? Number(n).toFixed(d) : "\u2014";
  var curves = ["hold", "linear", "smooth", "exponential", "logarithmic", "bezier"];
  var waveforms = ["sine", "sine2", "triangle", "square", "smooth-square", "saw", "reverse-saw", "pulse", "bandlimited-square", "bandlimited-saw", "custom-harmonic", "imported-cycle"];
  var generators = ["binaural", "monaural", "isochronic", "am", "stereo", "noise-modulated", "sham"];
  var laneParams = ["beatHz", "carrierHz", "leftHz", "rightHz", "amplitude", "pan", "duty"];
  function num(x, f = 0) {
    const n = Number(x);
    return Number.isFinite(n) ? n : f;
  }
  function NumberInput({ label, value, onChange, min, max, step = 0.01, suffix }) {
    return /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("div", { className: "input-suffix" }, /* @__PURE__ */ React.createElement("input", { type: "number", value: Number.isFinite(value) ? value : "", min, max, step, onChange: (e) => onChange(num(e.target.value, value)) }), suffix && /* @__PURE__ */ React.createElement("i", null, suffix)));
  }
  function TrackRows({ project, selection, setSelection, setProject }) {
    const toggle = (kind, id2, key) => setProject((p) => touchProject({ ...p, [kind]: p[kind] instanceof Array ? p[kind].map((x) => x.id === id2 ? { ...x, [key]: !x[key] } : x) : p[kind] }));
    return /* @__PURE__ */ React.createElement("div", { className: "studio-track-list", role: "listbox", "aria-label": "Tracks" }, /* @__PURE__ */ React.createElement("div", { className: "track-group-label" }, "STIMULUS"), project.voices.map((v) => /* @__PURE__ */ React.createElement("div", { className: "studio-track-row " + (selection.kind === "voice" && selection.id === v.id ? "selected" : ""), key: v.id, onClick: () => setSelection({ kind: "voice", id: v.id }) }, /* @__PURE__ */ React.createElement("button", { className: "track-main" }, /* @__PURE__ */ React.createElement("b", null, v.name), /* @__PURE__ */ React.createElement("small", null, v.type, " \xB7 \u0394 ", fmt(beatOf(v)), " Hz")), /* @__PURE__ */ React.createElement("button", { "aria-label": `Mute ${v.name}`, className: v.mute ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("voices", v.id, "mute");
    } }, "M"), /* @__PURE__ */ React.createElement("button", { "aria-label": `Solo ${v.name}`, className: v.solo ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("voices", v.id, "solo");
    } }, "S"))), /* @__PURE__ */ React.createElement("div", { className: "track-group-label" }, "NOISE / BACKGROUND"), project.noiseTracks.map((n) => /* @__PURE__ */ React.createElement("div", { className: "studio-track-row " + (selection.kind === "noise" && selection.id === n.id ? "selected" : ""), key: n.id, onClick: () => setSelection({ kind: "noise", id: n.id }) }, /* @__PURE__ */ React.createElement("button", { className: "track-main" }, /* @__PURE__ */ React.createElement("b", null, n.name), /* @__PURE__ */ React.createElement("small", null, n.kind, " noise")), /* @__PURE__ */ React.createElement("button", { className: n.mute ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("noiseTracks", n.id, "mute");
    } }, "M"), /* @__PURE__ */ React.createElement("button", { className: n.solo ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("noiseTracks", n.id, "solo");
    } }, "S"))), project.audioTracks.map((a) => /* @__PURE__ */ React.createElement("div", { className: "studio-track-row " + (selection.kind === "audio" && selection.id === a.id ? "selected" : ""), key: a.id, onClick: () => setSelection({ kind: "audio", id: a.id }) }, /* @__PURE__ */ React.createElement("button", { className: "track-main" }, /* @__PURE__ */ React.createElement("b", null, a.name), /* @__PURE__ */ React.createElement("small", null, "audio \xB7 ", fmt(a.duration, 1), " s")), /* @__PURE__ */ React.createElement("button", { className: a.mute ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("audioTracks", a.id, "mute");
    } }, "M"), /* @__PURE__ */ React.createElement("button", { className: a.solo ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("audioTracks", a.id, "solo");
    } }, "S"))));
  }
  function Clip({ start, duration, total, label, sub, onChange }) {
    const drag = React.useRef(null);
    const down = (e) => {
      if (e.button !== 0) return;
      drag.current = { x: e.clientX, start };
      const move = (m) => {
        if (!drag.current) return;
        const el = e.currentTarget.parentElement, w = Math.max(1, el.getBoundingClientRect().width), dt = (m.clientX - drag.current.x) / w * total;
        onChange(Math.max(0, Math.min(total - duration, drag.current.start + dt)));
      };
      const up = () => {
        removeEventListener("pointermove", move);
        removeEventListener("pointerup", up);
        drag.current = null;
      };
      addEventListener("pointermove", move);
      addEventListener("pointerup", up);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "timeline-clip", onPointerDown: down, style: { left: `${start / total * 100}%`, width: `${Math.max(0.5, duration / total * 100)}%` } }, /* @__PURE__ */ React.createElement("b", null, label), /* @__PURE__ */ React.createElement("small", null, sub));
  }
  function AutomationEditor({ voice, setProject, project }) {
    const [parameter, setParameter] = React.useState("beatHz");
    const [clipboard, setClipboard] = React.useState(null);
    const lane = voice.automation.find((x) => x.parameter === parameter);
    const fallback = parameter === "beatHz" ? beatOf(voice) : parameter === "carrierHz" ? carrierOf(voice) : parameter === "leftHz" ? voice.leftHz : parameter === "rightHz" ? voice.rightHz : parameter === "amplitude" ? voice.amplitude : parameter === "duty" ? voice.duty : 0;
    const points = lane?.points?.length ? lane.points : [{ id: "virtual-a", time: 0, value: fallback, curve: "linear" }, { id: "virtual-b", time: voice.duration, value: fallback, curve: "linear" }];
    const vals = points.map((p) => p.value), lo = Math.min(...vals, fallback), hi = Math.max(...vals, fallback), range = Math.max(1e-6, hi - lo), pad = range * 0.2;
    const yMin = lo - pad, yMax = hi + pad;
    const update = (next) => setProject((p) => touchProject({ ...p, voices: p.voices.map((v) => v.id === voice.id ? { ...v, automation: [...v.automation.filter((a) => a.parameter !== parameter), { parameter, points: next.sort((a, b) => a.time - b.time) }] } : v) }));
    const add = (e) => {
      const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height, time = Math.max(0, Math.min(voice.duration, x * voice.duration)), value = yMax - y * (yMax - yMin);
      update([...lane?.points || [], { id: uid("point"), time, value, curve: "linear" }]);
    };
    const drag = (e, p) => {
      e.stopPropagation();
      const svg = e.currentTarget.ownerSVGElement, r = svg.getBoundingClientRect();
      const move = (m) => {
        const x = Math.max(0, Math.min(1, (m.clientX - r.left) / r.width)), y = Math.max(0, Math.min(1, (m.clientY - r.top) / r.height));
        update(points.filter((x2) => !x2.id.startsWith("virtual")).map((q) => q.id === p.id ? { ...q, time: x * voice.duration, value: yMax - y * (yMax - yMin) } : q));
      };
      const up = () => {
        removeEventListener("pointermove", move);
        removeEventListener("pointerup", up);
      };
      addEventListener("pointermove", move);
      addEventListener("pointerup", up);
    };
    const real = lane?.points || [];
    const path = points.map((p, i) => `${i ? "L" : "M"} ${p.time / voice.duration * 800} ${100 - (p.value - yMin) / (yMax - yMin) * 100}`).join(" ");
    return /* @__PURE__ */ React.createElement("section", { className: "automation-editor" }, /* @__PURE__ */ React.createElement("div", { className: "automation-head" }, /* @__PURE__ */ React.createElement("b", null, "Automation"), /* @__PURE__ */ React.createElement("select", { value: parameter, onChange: (e) => setParameter(e.target.value) }, laneParams.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("button", { onClick: () => setClipboard(lane ? structuredClone(lane) : null), disabled: !lane }, "Copy"), /* @__PURE__ */ React.createElement("button", { onClick: () => clipboard && update(clipboard.points.map((p) => ({ ...p, id: uid("point") }))), disabled: !clipboard }, "Paste"), /* @__PURE__ */ React.createElement("button", { onClick: () => update([]), disabled: !lane }, "Clear")), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 800 100", preserveAspectRatio: "none", onDoubleClick: add, "aria-label": `${parameter} automation graph` }, /* @__PURE__ */ React.createElement("path", { d: path, fill: "none", stroke: "currentColor", strokeWidth: "2" }), points.map((p) => /* @__PURE__ */ React.createElement("circle", { key: p.id, cx: p.time / voice.duration * 800, cy: 100 - (p.value - yMin) / (yMax - yMin) * 100, r: "6", onPointerDown: (e) => !p.id.startsWith("virtual") && drag(e, p) }))), /* @__PURE__ */ React.createElement("small", null, "Double-click graph to add a point; drag points to edit."), real.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "automation-table" }, real.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id }, /* @__PURE__ */ React.createElement("input", { "aria-label": "Point time", type: "number", step: ".01", value: p.time, onChange: (e) => update(real.map((q) => q.id === p.id ? { ...q, time: Math.max(0, Math.min(voice.duration, num(e.target.value))) } : q)) }), /* @__PURE__ */ React.createElement("input", { "aria-label": "Point value", type: "number", step: ".01", value: p.value, onChange: (e) => update(real.map((q) => q.id === p.id ? { ...q, value: num(e.target.value) } : q)) }), /* @__PURE__ */ React.createElement("select", { value: p.curve, onChange: (e) => update(real.map((q) => q.id === p.id ? { ...q, curve: e.target.value } : q)) }, curves.map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c))), /* @__PURE__ */ React.createElement("button", { "aria-label": "Delete automation point", onClick: () => update(real.filter((q) => q.id !== p.id)) }, "\xD7")))));
  }
  function TrackAutomationControls({ track, patch, parameters }) {
    const [parameter, setParameter] = React.useState(parameters[0]);
    const lane = (track.automation || []).find((x) => x.parameter === parameter);
    const fallback = Number(track[parameter] ?? 0);
    const setLane = (points) => patch({ automation: [...(track.automation || []).filter((x) => x.parameter !== parameter), { parameter, points }] });
    const addRamp = () => setLane([{ id: uid("point"), time: 0, value: fallback, curve: "linear" }, { id: uid("point"), time: track.duration || 1, value: fallback, curve: "linear" }]);
    const addMod = () => patch({ modulation: [...track.modulation || [], { target: parameter, rateHz: 1, depth: 0.05, phase: 0, offset: 0 }] });
    return /* @__PURE__ */ React.createElement("div", { className: "track-automation" }, /* @__PURE__ */ React.createElement("h4", null, "Automation / modulation"), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Parameter"), /* @__PURE__ */ React.createElement("select", { value: parameter, onChange: (e) => setParameter(e.target.value) }, parameters.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x)))), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: addRamp }, lane ? "Reset ramp" : "+ Ramp"), /* @__PURE__ */ React.createElement("button", { onClick: addMod }, "+ LFO")), lane && /* @__PURE__ */ React.createElement("div", { className: "automation-table" }, lane.points.map((pt) => /* @__PURE__ */ React.createElement("div", { key: pt.id }, /* @__PURE__ */ React.createElement("input", { "aria-label": "Automation time", type: "number", min: "0", max: track.duration, step: ".01", value: pt.time, onChange: (e) => setLane(lane.points.map((q) => q.id === pt.id ? { ...q, time: num(e.target.value) } : q)) }), /* @__PURE__ */ React.createElement("input", { "aria-label": "Automation value", type: "number", step: ".01", value: pt.value, onChange: (e) => setLane(lane.points.map((q) => q.id === pt.id ? { ...q, value: num(e.target.value) } : q)) }), /* @__PURE__ */ React.createElement("select", { value: pt.curve, onChange: (e) => setLane(lane.points.map((q) => q.id === pt.id ? { ...q, curve: e.target.value } : q)) }, curves.map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c))), /* @__PURE__ */ React.createElement("button", { onClick: () => setLane(lane.points.filter((q) => q.id !== pt.id)) }, "\xD7")))), (track.modulation || []).map((m, i) => /* @__PURE__ */ React.createElement("div", { className: "link-row", key: `${m.target}-${i}` }, /* @__PURE__ */ React.createElement("select", { value: m.target, onChange: (e) => patch({ modulation: track.modulation.map((q, j) => j === i ? { ...q, target: e.target.value } : q) }) }, parameters.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("input", { "aria-label": "LFO rate Hz", type: "number", min: "0", step: ".01", value: m.rateHz, onChange: (e) => patch({ modulation: track.modulation.map((q, j) => j === i ? { ...q, rateHz: num(e.target.value) } : q) }) }), /* @__PURE__ */ React.createElement("input", { "aria-label": "LFO depth", type: "number", step: ".01", value: m.depth, onChange: (e) => patch({ modulation: track.modulation.map((q, j) => j === i ? { ...q, depth: num(e.target.value) } : q) }) }), /* @__PURE__ */ React.createElement("button", { onClick: () => patch({ modulation: track.modulation.filter((_, j) => j !== i) }) }, "\xD7"))));
  }
  function VoiceInspector({ project, voice, setProject }) {
    const patch = (x) => setProject((p) => touchProject({ ...p, voices: p.voices.map((v) => v.id === voice.id ? { ...v, ...x } : v) }));
    const addLink = () => patch({ links: [...voice.links, { id: uid("link"), source: "time", target: "beatHz", scale: 1, offset: 0 }] });
    return /* @__PURE__ */ React.createElement("div", { className: "studio-inspector" }, /* @__PURE__ */ React.createElement("h3", null, "Voice"), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Name"), /* @__PURE__ */ React.createElement("input", { value: voice.name, onChange: (e) => patch({ name: e.target.value }) })), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Generator"), /* @__PURE__ */ React.createElement("select", { value: voice.type, onChange: (e) => patch({ type: e.target.value }) }, generators.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x)))), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Waveform"), /* @__PURE__ */ React.createElement("select", { value: voice.waveform, onChange: (e) => patch({ waveform: e.target.value }) }, waveforms.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x)))), voice.waveform === "custom-harmonic" && /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Harmonics (comma amplitudes)"), /* @__PURE__ */ React.createElement("input", { value: (voice.harmonics || [1, 0.5, 0.25]).join(","), onChange: (e) => patch({ harmonics: e.target.value.split(",").map(Number).filter(Number.isFinite).slice(0, 64) }) })), voice.waveform === "imported-cycle" && /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Cycle source"), /* @__PURE__ */ React.createElement("select", { value: voice.cycleAssetId || "", onChange: (e) => patch({ cycleAssetId: e.target.value || void 0 }) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Choose imported audio\u2026"), project.assets.map((a) => /* @__PURE__ */ React.createElement("option", { key: a.id, value: a.id }, a.name))), /* @__PURE__ */ React.createElement("small", null, "The selected audio asset is treated as one periodic waveform cycle; use a clean single-cycle source for predictable spectra.")), /* @__PURE__ */ React.createElement("h4", null, "Waveform timeline"), (voice.waveformAutomation || []).map((wp) => /* @__PURE__ */ React.createElement("div", { className: "link-row", key: wp.id }, /* @__PURE__ */ React.createElement("input", { "aria-label": "Waveform change time", type: "number", min: "0", max: voice.duration, step: ".01", value: wp.time, onChange: (e) => patch({ waveformAutomation: (voice.waveformAutomation || []).map((x) => x.id === wp.id ? { ...x, time: num(e.target.value) } : x) }) }), /* @__PURE__ */ React.createElement("select", { value: wp.waveform, onChange: (e) => patch({ waveformAutomation: (voice.waveformAutomation || []).map((x) => x.id === wp.id ? { ...x, waveform: e.target.value } : x) }) }, waveforms.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("button", { onClick: () => patch({ waveformAutomation: (voice.waveformAutomation || []).filter((x) => x.id !== wp.id) }) }, "\xD7"))), /* @__PURE__ */ React.createElement("button", { onClick: () => patch({ waveformAutomation: [...voice.waveformAutomation || [], { id: uid("wavepoint"), time: voice.duration / 2, waveform: "triangle" }] }) }, "+ Waveform change"), /* @__PURE__ */ React.createElement(NumberInput, { label: "Left ear", value: voice.leftHz, suffix: "Hz", step: ".001", min: 1e-3, onChange: (x) => patch({ leftHz: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Right ear", value: voice.rightHz, suffix: "Hz", step: ".001", min: 1e-3, onChange: (x) => patch({ rightHz: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Amplitude", value: voice.amplitude, step: ".005", min: 0, max: 2, onChange: (x) => patch({ amplitude: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Left level", value: voice.leftLevel, step: ".01", min: 0, max: 2, onChange: (x) => patch({ leftLevel: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Right level", value: voice.rightLevel, step: ".01", min: 0, max: 2, onChange: (x) => patch({ rightLevel: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Start", value: voice.start, suffix: "s", min: 0, onChange: (x) => patch({ start: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Duration", value: voice.duration, suffix: "s", min: 0.01, onChange: (x) => patch({ duration: x }) }), /* @__PURE__ */ React.createElement("div", { className: "two-mini" }, /* @__PURE__ */ React.createElement(NumberInput, { label: "Fade in", value: voice.fadeIn, suffix: "s", min: 0, onChange: (x) => patch({ fadeIn: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Fade out", value: voice.fadeOut, suffix: "s", min: 0, onChange: (x) => patch({ fadeOut: x }) })), /* @__PURE__ */ React.createElement(NumberInput, { label: "Duty / modulation depth", value: voice.duty, min: 0.01, max: 0.99, step: ".01", onChange: (x) => patch({ duty: x }) }), /* @__PURE__ */ React.createElement("div", { className: "checks" }, /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: voice.loop, onChange: (e) => patch({ loop: e.target.checked }) }), " Loop"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: voice.mute, onChange: (e) => patch({ mute: e.target.checked }) }), " Mute"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: voice.solo, onChange: (e) => patch({ solo: e.target.checked }) }), " Solo")), /* @__PURE__ */ React.createElement("h4", null, "Parameter links"), voice.links.map((l) => /* @__PURE__ */ React.createElement("div", { className: "link-row", key: l.id }, /* @__PURE__ */ React.createElement("select", { value: l.source, onChange: (e) => patch({ links: voice.links.map((x) => x.id === l.id ? { ...x, source: e.target.value } : x) }) }, ["time", "beatHz", "carrierHz", "amplitude"].map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("span", null, "\u2192"), /* @__PURE__ */ React.createElement("select", { value: l.target, onChange: (e) => patch({ links: voice.links.map((x) => x.id === l.id ? { ...x, target: e.target.value } : x) }) }, laneParams.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("input", { title: "Scale", type: "number", step: ".1", value: l.scale, onChange: (e) => patch({ links: voice.links.map((x) => x.id === l.id ? { ...x, scale: num(e.target.value) } : x) }) }), /* @__PURE__ */ React.createElement("input", { title: "Offset", type: "number", step: ".1", value: l.offset, onChange: (e) => patch({ links: voice.links.map((x) => x.id === l.id ? { ...x, offset: num(e.target.value) } : x) }) }), /* @__PURE__ */ React.createElement("button", { onClick: () => patch({ links: voice.links.filter((x) => x.id !== l.id) }) }, "\xD7"))), /* @__PURE__ */ React.createElement("button", { onClick: addLink }, "+ Parameter link"), /* @__PURE__ */ React.createElement("details", { className: "context-help" }, /* @__PURE__ */ React.createElement("summary", null, "Signal help"), /* @__PURE__ */ React.createElement("p", null, "Left/right frequencies are stored explicitly. Center carrier is ", carrierOf(voice).toFixed(3), " Hz and the current difference is ", beatOf(voice).toFixed(3), " Hz. A frequency label does not guarantee a psychological outcome.")));
  }
  function NoiseInspector({ project, track, setProject }) {
    const patch = (x) => setProject((p) => touchProject({ ...p, noiseTracks: p.noiseTracks.map((n) => n.id === track.id ? { ...n, ...x } : n) }));
    return /* @__PURE__ */ React.createElement("div", { className: "studio-inspector" }, /* @__PURE__ */ React.createElement("h3", null, "Noise"), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Name"), /* @__PURE__ */ React.createElement("input", { value: track.name, onChange: (e) => patch({ name: e.target.value }) })), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Color"), /* @__PURE__ */ React.createElement("select", { value: track.kind, onChange: (e) => patch({ kind: e.target.value }) }, ["white", "pink", "brown", "blue", "violet", "grey", "slope"].map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x)))), /* @__PURE__ */ React.createElement(NumberInput, { label: "Amplitude", value: track.amplitude, step: ".005", min: 0, max: 1, onChange: (x) => patch({ amplitude: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Slope", value: track.slopeDbOct, suffix: "dB/oct", min: -6, max: 6, onChange: (x) => patch({ slopeDbOct: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "High-pass", value: track.highpass || 0, suffix: "Hz", onChange: (x) => patch({ highpass: x || void 0 }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Low-pass", value: track.lowpass || 0, suffix: "Hz", onChange: (x) => patch({ lowpass: x || void 0 }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Stereo correlation", value: track.stereoCorrelation, step: ".01", min: 0, max: 1, onChange: (x) => patch({ stereoCorrelation: x }) }), /* @__PURE__ */ React.createElement(TrackAutomationControls, { track, patch, parameters: ["amplitude", "slopeDbOct", "highpass", "lowpass", "stereoCorrelation"] }), /* @__PURE__ */ React.createElement("details", { className: "context-help" }, /* @__PURE__ */ React.createElement("summary", null, "Noise help"), /* @__PURE__ */ React.createElement("p", null, "Noise automation is evaluated in track-local time. Stereo correlation 0 uses independent channels; 1 shares the same stochastic component.")));
  }
  function AudioInspector({ project, track, setProject }) {
    const patch = (x) => setProject((p) => touchProject({ ...p, audioTracks: p.audioTracks.map((a) => a.id === track.id ? { ...a, ...x } : a) }));
    return /* @__PURE__ */ React.createElement("div", { className: "studio-inspector" }, /* @__PURE__ */ React.createElement("h3", null, "Audio clip"), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Name"), /* @__PURE__ */ React.createElement("input", { value: track.name, onChange: (e) => patch({ name: e.target.value }) })), /* @__PURE__ */ React.createElement(NumberInput, { label: "Start", value: track.start, suffix: "s", min: 0, onChange: (x) => patch({ start: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Duration", value: track.duration, suffix: "s", min: 0.01, onChange: (x) => patch({ duration: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Source offset", value: track.offset, suffix: "s", min: 0, onChange: (x) => patch({ offset: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Level", value: track.amplitude, min: 0, max: 2, step: ".01", onChange: (x) => patch({ amplitude: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Pan", value: track.pan, min: -1, max: 1, step: ".01", onChange: (x) => patch({ pan: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Stereo width", value: track.stereoWidth ?? 1, min: 0, max: 2, step: ".01", onChange: (x) => patch({ stereoWidth: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Left delay", value: track.leftDelayMs || 0, suffix: "ms", min: 0, onChange: (x) => patch({ leftDelayMs: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Right delay", value: track.rightDelayMs || 0, suffix: "ms", min: 0, onChange: (x) => patch({ rightDelayMs: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "High-pass", value: track.highpass || 0, suffix: "Hz", min: 0, onChange: (x) => patch({ highpass: x || void 0 }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Low-pass", value: track.lowpass || 0, suffix: "Hz", min: 0, onChange: (x) => patch({ lowpass: x || void 0 }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Interval", value: track.intervalSeconds || 0, suffix: "s", min: 0, onChange: (x) => patch({ intervalSeconds: x || void 0 }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Interval on", value: track.intervalOnSeconds || 0, suffix: "s", min: 0, onChange: (x) => patch({ intervalOnSeconds: x || void 0 }) }), /* @__PURE__ */ React.createElement(TrackAutomationControls, { track, patch, parameters: ["amplitude", "pan", "stereoWidth", "leftDelayMs", "rightDelayMs", "highpass", "lowpass"] }), /* @__PURE__ */ React.createElement("details", { className: "context-help" }, /* @__PURE__ */ React.createElement("summary", null, "Background help"), /* @__PURE__ */ React.createElement("p", null, "Automation and modulation are evaluated in clip-local time. Delay and width controls affect only background tracks, never the protected binaural signal bus.")));
  }
  function StudioSurface({ project, setProject, onPlay, playing, onSave, onExport, onUndo, onRedo, canUndo, canRedo }) {
    const [selection, setSelection] = React.useState({ kind: "voice", id: project.voices[0]?.id || "" });
    const [zoom, setZoom] = React.useState(1);
    const selectedVoice = selection.kind === "voice" ? project.voices.find((v) => v.id === selection.id) : void 0, selectedNoise = selection.kind === "noise" ? project.noiseTracks.find((v) => v.id === selection.id) : void 0, selectedAudio = selection.kind === "audio" ? project.audioTracks.find((v) => v.id === selection.id) : void 0;
    React.useEffect(() => {
      if (selection.kind === "voice" && !project.voices.some((v) => v.id === selection.id) && project.voices[0]) setSelection({ kind: "voice", id: project.voices[0].id });
    }, [project.voices.length]);
    const addVoice = () => setProject((p) => {
      const v = createVoice(`Voice ${p.voices.length + 1}`);
      v.duration = p.duration;
      return touchProject({ ...p, voices: [...p.voices, v] });
    });
    const addNoise = () => setProject((p) => touchProject({ ...p, noiseTracks: [...p.noiseTracks, { id: uid("noise"), name: `Noise ${p.noiseTracks.length + 1}`, kind: "pink", amplitude: 0.06, slopeDbOct: -3, stereoCorrelation: 0.2, start: 0, duration: p.duration, loop: true, mute: false, solo: false }] }));
    const duplicateSelected = () => {
      if (selectedVoice) setProject((p) => touchProject({ ...p, voices: [...p.voices, { ...structuredClone(selectedVoice), id: uid("voice"), name: selectedVoice.name + " copy" }] }));
      else if (selectedNoise) setProject((p) => touchProject({ ...p, noiseTracks: [...p.noiseTracks, { ...structuredClone(selectedNoise), id: uid("noise"), name: selectedNoise.name + " copy" }] }));
      else if (selectedAudio) setProject((p) => touchProject({ ...p, audioTracks: [...p.audioTracks, { ...structuredClone(selectedAudio), id: uid("audio"), name: selectedAudio.name + " copy" }] }));
    };
    const deleteSelected = () => setProject((p) => {
      if (selection.kind === "voice" && p.voices.length > 1) return touchProject({ ...p, voices: p.voices.filter((v) => v.id !== selection.id) });
      if (selection.kind === "noise") return touchProject({ ...p, noiseTracks: p.noiseTracks.filter((v) => v.id !== selection.id) });
      if (selection.kind === "audio") return touchProject({ ...p, audioTracks: p.audioTracks.filter((v) => v.id !== selection.id) });
      return p;
    });
    const addSegment = () => setProject((p) => {
      const start = p.segments.reduce((m, s) => Math.max(m, s.start + s.duration * s.repeat), 0), duration = Math.min(60, Math.max(1, p.duration)), end = start + duration, newDuration = Math.max(p.duration, end);
      return touchProject({ ...p, duration: newDuration, voices: p.voices.map((v) => v.start + v.duration >= p.duration - 1e-3 ? { ...v, duration: Math.max(v.duration, newDuration - v.start) } : v), noiseTracks: p.noiseTracks.map((n) => n.start + n.duration >= p.duration - 1e-3 ? { ...n, duration: Math.max(n.duration, newDuration - n.start) } : n), segments: [...p.segments, { id: uid("segment"), name: `Segment ${p.segments.length + 1}`, start, duration, repeat: 1, crossfade: 0.05, phaseContinuous: true }] });
    });
    const addMarker = () => setProject((p) => touchProject({ ...p, markers: [...p.markers, { id: uid("marker"), time: 0, label: `Marker ${p.markers.length + 1}` }] }));
    const total = Math.max(1, project.duration);
    return /* @__PURE__ */ React.createElement("section", { className: "page studio-v2" }, /* @__PURE__ */ React.createElement("div", { className: "studio-v2-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "STUDIO"), /* @__PURE__ */ React.createElement("input", { className: "title-edit", value: project.title, onChange: (e) => setProject((p) => touchProject({ ...p, title: e.target.value })) })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: onUndo, disabled: !canUndo, "aria-label": "Undo" }, "\u21B6"), /* @__PURE__ */ React.createElement("button", { onClick: onRedo, disabled: !canRedo, "aria-label": "Redo" }, "\u21B7"), /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: onPlay }, playing ? "\u25A0 Stop" : "\u25B6 Play"), /* @__PURE__ */ React.createElement("button", { onClick: onSave }, "Save"), /* @__PURE__ */ React.createElement("div", { className: "menu" }, /* @__PURE__ */ React.createElement("button", null, "Export \u25BE"), /* @__PURE__ */ React.createElement("div", { className: "menu-pop" }, /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("wav") }, "WAV 24-bit"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("aiff") }, "AIFF 24-bit"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("flac") }, "FLAC 24-bit"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("ogg-opus") }, "Ogg Opus"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("webm-opus") }, "WebM Opus"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("bbeat") }, ".bbeat project"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("bbeat-signed") }, "Signed .bbeat"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("bwg") }, "Legacy .bwg"), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("recipe") }, "Recipe JSON"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("manifest") }, "Stimulus manifest"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("stems") }, "WAV stems ZIP"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("diagnostic") }, "Diagnostic L/R WAVs"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("wav-stimulus") }, "Stimulus-only WAV"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("wav-background") }, "Background-only WAV"))))), /* @__PURE__ */ React.createElement("div", { className: "studio-toolbar" }, /* @__PURE__ */ React.createElement("button", { onClick: addVoice }, "+ Voice"), /* @__PURE__ */ React.createElement("button", { onClick: addNoise }, "+ Noise"), /* @__PURE__ */ React.createElement("button", { onClick: duplicateSelected }, "Duplicate"), /* @__PURE__ */ React.createElement("button", { onClick: deleteSelected }, "Delete"), /* @__PURE__ */ React.createElement("button", { onClick: addSegment }, "+ Segment"), /* @__PURE__ */ React.createElement("button", { onClick: addMarker }, "+ Marker"), /* @__PURE__ */ React.createElement("label", null, "Zoom ", /* @__PURE__ */ React.createElement("input", { type: "range", min: "1", max: "6", step: ".25", value: zoom, onChange: (e) => setZoom(Number(e.target.value)) })), /* @__PURE__ */ React.createElement("label", null, "Master ", /* @__PURE__ */ React.createElement("input", { type: "range", min: "0", max: "1.5", step: ".01", value: project.masterGain, onChange: (e) => setProject((p) => touchProject({ ...p, masterGain: Number(e.target.value) })) }))), /* @__PURE__ */ React.createElement("div", { className: "studio-grid" }, /* @__PURE__ */ React.createElement(TrackRows, { project, selection, setSelection, setProject }), /* @__PURE__ */ React.createElement("div", { className: "timeline-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "timeline-v2", style: { width: `${Math.max(100, zoom * 100)}%` } }, /* @__PURE__ */ React.createElement("div", { className: "timeline-ruler" }, Array.from({ length: 11 }, (_, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { left: `${i * 10}%` } }, Math.round(total * i / 10), "s"))), project.markers.map((m) => /* @__PURE__ */ React.createElement("div", { className: "marker-line", key: m.id, style: { left: `${m.time / total * 100}%` }, title: m.label })), project.voices.map((v) => /* @__PURE__ */ React.createElement("div", { className: "lane-row", key: v.id }, /* @__PURE__ */ React.createElement(Clip, { start: v.start, duration: v.duration, total, label: v.name, sub: `${v.type} \xB7 ${fmt(v.leftHz)}\u2194${fmt(v.rightHz)} Hz`, onChange: (x) => setProject((p) => touchProject({ ...p, voices: p.voices.map((q) => q.id === v.id ? { ...q, start: x } : q) })) }))), project.noiseTracks.map((n) => /* @__PURE__ */ React.createElement("div", { className: "lane-row", key: n.id }, /* @__PURE__ */ React.createElement(Clip, { start: n.start, duration: n.duration, total, label: n.name, sub: `${n.kind} noise`, onChange: (x) => setProject((p) => touchProject({ ...p, noiseTracks: p.noiseTracks.map((q) => q.id === n.id ? { ...q, start: x } : q) })) }))), project.audioTracks.map((a) => /* @__PURE__ */ React.createElement("div", { className: "lane-row", key: a.id }, /* @__PURE__ */ React.createElement(Clip, { start: a.start, duration: a.duration, total, label: a.name, sub: "imported audio", onChange: (x) => setProject((p) => touchProject({ ...p, audioTracks: p.audioTracks.map((q) => q.id === a.id ? { ...q, start: x } : q) })) }))), selectedVoice && /* @__PURE__ */ React.createElement(AutomationEditor, { voice: selectedVoice, project, setProject }), /* @__PURE__ */ React.createElement("section", { className: "segment-strip" }, /* @__PURE__ */ React.createElement("b", null, "Segments"), project.segments.map((s, i) => /* @__PURE__ */ React.createElement("div", { className: "segment-row", key: s.id }, /* @__PURE__ */ React.createElement("input", { value: s.name, onChange: (e) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, name: e.target.value } : x) })) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Start", value: s.start, min: 0, suffix: "s", onChange: (v) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, start: v } : x) })) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Duration", value: s.duration, min: 0.01, suffix: "s", onChange: (v) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, duration: v } : x) })) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Repeat", value: s.repeat, min: 1, step: 1, onChange: (v) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, repeat: Math.max(1, Math.round(v)) } : x) })) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Crossfade", value: s.crossfade, min: 0, suffix: "s", onChange: (v) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, crossfade: v } : x) })) }), /* @__PURE__ */ React.createElement("label", { className: "compact-field" }, "Scope", /* @__PURE__ */ React.createElement("select", { value: s.trackIds?.length === 1 ? s.trackIds[0] : "all", onChange: (e) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, trackIds: e.target.value === "all" ? void 0 : [e.target.value] } : x) })) }, /* @__PURE__ */ React.createElement("option", { value: "all" }, "All tracks"), project.voices.map((v) => /* @__PURE__ */ React.createElement("option", { value: v.id, key: v.id }, v.name)), project.noiseTracks.map((n) => /* @__PURE__ */ React.createElement("option", { value: n.id, key: n.id }, n.name)), project.audioTracks.map((a) => /* @__PURE__ */ React.createElement("option", { value: a.id, key: a.id }, a.name)))), /* @__PURE__ */ React.createElement("label", { className: "compact-field" }, "Beat override", /* @__PURE__ */ React.createElement("input", { type: "number", step: ".01", placeholder: "none", value: s.overrides?.beatHz ?? "", onChange: (e) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, overrides: e.target.value === "" ? { ...x.overrides || {}, beatHz: void 0 } : { ...x.overrides || {}, beatHz: Number(e.target.value) } } : x) })) })), /* @__PURE__ */ React.createElement("button", { disabled: i === 0, onClick: () => setProject((p) => {
      const a = p.segments.slice(), j = a.findIndex((x) => x.id === s.id);
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      return touchProject({ ...p, segments: a });
    }) }, "\u2191"), /* @__PURE__ */ React.createElement("button", { onClick: () => setProject((p) => touchProject({ ...p, segments: [...p.segments, { ...structuredClone(s), id: uid("segment"), name: s.name + " copy" }] })) }, "\u29C9")))), /* @__PURE__ */ React.createElement("section", { className: "marker-strip" }, /* @__PURE__ */ React.createElement("b", null, "Markers"), project.markers.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.id }, /* @__PURE__ */ React.createElement("input", { value: m.label, onChange: (e) => setProject((p) => touchProject({ ...p, markers: p.markers.map((x) => x.id === m.id ? { ...x, label: e.target.value } : x) })) }), /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", max: total, step: ".01", value: m.time, onChange: (e) => setProject((p) => touchProject({ ...p, markers: p.markers.map((x) => x.id === m.id ? { ...x, time: num(e.target.value) } : x) })) }), /* @__PURE__ */ React.createElement("button", { onClick: () => setProject((p) => touchProject({ ...p, markers: p.markers.filter((x) => x.id !== m.id) })) }, "\xD7")))))), selectedVoice ? /* @__PURE__ */ React.createElement(VoiceInspector, { project, voice: selectedVoice, setProject }) : selectedNoise ? /* @__PURE__ */ React.createElement(NoiseInspector, { project, track: selectedNoise, setProject }) : selectedAudio ? /* @__PURE__ */ React.createElement(AudioInspector, { project, track: selectedAudio, setProject }) : /* @__PURE__ */ React.createElement("div", { className: "studio-inspector" }, /* @__PURE__ */ React.createElement("p", null, "Select a track."))));
  }

  // src/audio/calibration.ts
  var KEY = "bbs.calibration.v1";
  function loadCalibration() {
    try {
      return { ...emptyCalibration(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
    } catch {
      return emptyCalibration();
    }
  }
  function emptyCalibration() {
    return { version: 1, leftConfirmed: false, rightConfirmed: false, alternatingConfirmed: false, centerConfirmed: false, headphonesConfirmed: false, spatialAudioWarningAcknowledged: false };
  }
  function saveCalibration(x) {
    const done = x.leftConfirmed && x.rightConfirmed && x.alternatingConfirmed && x.centerConfirmed && x.headphonesConfirmed && x.spatialAudioWarningAcknowledged;
    const y = { ...x, completedAt: done ? x.completedAt || (/* @__PURE__ */ new Date()).toISOString() : void 0 };
    localStorage.setItem(KEY, JSON.stringify(y));
    return y;
  }
  function calibrationComplete(x = loadCalibration()) {
    return !!x.completedAt;
  }
  async function playCalibrationCue(mode, frequency = 440) {
    const C = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!C) throw new Error("Web Audio is unavailable.");
    const c = new C();
    await c.resume();
    const master = c.createGain();
    master.gain.value = 0.035;
    master.connect(c.destination);
    const play = (panValue, at, duration = 0.28) => {
      const o = c.createOscillator(), p = c.createStereoPanner(), g = c.createGain();
      o.frequency.value = frequency;
      p.pan.value = panValue;
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(1, at + 0.02);
      g.gain.setValueAtTime(1, at + duration - 0.03);
      g.gain.linearRampToValueAtTime(0, at + duration);
      o.connect(g).connect(p).connect(master);
      o.start(at);
      o.stop(at + duration + 0.01);
    };
    const t = c.currentTime + 0.03;
    if (mode === "alternating") {
      play(-1, t);
      play(1, t + 0.38);
      play(-1, t + 0.76);
      play(1, t + 1.14);
      setTimeout(() => c.close(), 1700);
    } else {
      play(mode === "left" ? -1 : mode === "right" ? 1 : 0, t, 0.55);
      setTimeout(() => c.close(), 800);
    }
  }

  // src/cloud/supabase.ts
  var SupabaseRest = class {
    constructor(config) {
      this.config = config;
    }
    config;
    base() {
      return this.config.url.replace(/\/$/, "");
    }
    headers(extra = {}) {
      return { "apikey": this.config.anonKey, "Authorization": `Bearer ${this.config.accessToken || this.config.anonKey}`, ...extra };
    }
    async request(path, init = {}) {
      const r = await fetch(`${this.base()}${path}`, { ...init, headers: { ...this.headers(), ...init.headers || {} } });
      if (r.status === 204) return null;
      const ct = r.headers.get("content-type") || "", raw = await r.text();
      let data = raw;
      try {
        if (raw && ct.includes("json")) data = JSON.parse(raw);
      } catch {
      }
      if (!r.ok) throw new Error(data?.msg || data?.message || data?.error_description || data?.error || `Cloud request failed: ${r.status}`);
      return data;
    }
    json(path, init = {}) {
      return this.request(path, { ...init, headers: { "Content-Type": "application/json", ...init.headers || {} } });
    }
    async signUp(email, password) {
      return this.json("/auth/v1/signup", { method: "POST", body: JSON.stringify({ email, password }) });
    }
    async signIn(email, password) {
      const s = await this.json("/auth/v1/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) });
      this.config.accessToken = s.access_token;
      this.config.refreshToken = s.refresh_token;
      return s;
    }
    async refresh() {
      if (!this.config.refreshToken) throw new Error("No refresh token");
      const s = await this.json("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: this.config.refreshToken }) });
      this.config.accessToken = s.access_token;
      this.config.refreshToken = s.refresh_token;
      return s;
    }
    async me() {
      return this.json("/auth/v1/user");
    }
    async signOut() {
      await this.json("/auth/v1/logout", { method: "POST" });
      this.config.accessToken = void 0;
      this.config.refreshToken = void 0;
    }
    async listPublicPresets(limit = 50) {
      return this.json(`/rest/v1/presets?visibility=eq.public&select=*&order=created_at.desc&limit=${Math.max(1, Math.min(100, limit))}`);
    }
    async listMine() {
      return this.json("/rest/v1/presets?select=*&order=updated_at.desc");
    }
    async saveProjectVersion(project) {
      const body = { project_id: project.id, version: project.revision, session: serializeSession(project) };
      return this.json("/rest/v1/project_versions", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(body) });
    }
    async listProjectVersions(projectId) {
      return this.json(`/rest/v1/project_versions?project_id=eq.${encodeURIComponent(projectId)}&select=*&order=version.desc`);
    }
    async publishPreset(project, metadata) {
      if (!metadata.rightsDeclared) throw new Error("Publishing requires a rights declaration");
      return this.json("/rest/v1/presets", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ title: metadata.title, description: metadata.description, visibility: "public", evidence_level: metadata.evidenceLevel, session: serializeSession(project), rights_declared: true }) });
    }
    async updatePreset(id2, patch) {
      return this.json(`/rest/v1/presets?id=eq.${encodeURIComponent(id2)}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(patch) });
    }
    async deletePreset(id2) {
      return this.json(`/rest/v1/presets?id=eq.${encodeURIComponent(id2)}`, { method: "DELETE" });
    }
    async createShare(projectVersionId, expiresAt) {
      return this.json("/rest/v1/rpc/create_share_link", { method: "POST", body: JSON.stringify({ p_project_version_id: projectVersionId, p_expires_at: expiresAt || null }) });
    }
    async resolveShare(token) {
      return this.json("/rest/v1/rpc/resolve_share_link", { method: "POST", body: JSON.stringify({ p_token: token }) });
    }
    async revokeShare(id2) {
      return this.json("/rest/v1/share_links?id=eq." + encodeURIComponent(id2), { method: "PATCH", body: JSON.stringify({ revoked_at: (/* @__PURE__ */ new Date()).toISOString() }) });
    }
    async listShares() {
      return this.json("/rest/v1/share_links?select=id,project_version_id,expires_at,revoked_at,created_at&order=created_at.desc");
    }
    async favorite(presetId, userId) {
      const body = { preset_id: presetId };
      if (userId) body.user_id = userId;
      return this.json("/rest/v1/favorites", { method: "POST", headers: { Prefer: "resolution=merge-duplicates" }, body: JSON.stringify(body) });
    }
    async unfavorite(presetId) {
      return this.json(`/rest/v1/favorites?preset_id=eq.${encodeURIComponent(presetId)}`, { method: "DELETE" });
    }
    async listFavorites() {
      return this.json("/rest/v1/favorites?select=preset_id,created_at,presets(*)&order=created_at.desc");
    }
    async review(presetId, rating, body) {
      return this.json("/rest/v1/reviews", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify({ preset_id: presetId, rating: Math.max(1, Math.min(5, Math.round(rating))), body: body.slice(0, 4e3) }) });
    }
    async reviews(presetId) {
      return this.json(`/rest/v1/reviews?preset_id=eq.${encodeURIComponent(presetId)}&select=id,user_id,rating,body,created_at,updated_at&order=created_at.desc`);
    }
    async report(targetType, targetId, reason) {
      if (reason.trim().length < 3) throw new Error("Please provide a report reason.");
      return this.json("/rest/v1/reports", { method: "POST", body: JSON.stringify({ target_type: targetType, target_id: targetId, reason: reason.trim().slice(0, 2e3) }) });
    }
    async uploadPrivateAsset(userId, name, bytes, contentType = "application/octet-stream") {
      const clean = name.replace(/[^a-zA-Z0-9._-]/g, "_"), path = `${userId}/${crypto.randomUUID()}-${clean}`;
      return this.request(`/storage/v1/object/project-assets/${encodeURIComponent(path).replace(/%2F/g, "/")}`, { method: "POST", headers: { "Content-Type": contentType, "x-upsert": "false" }, body: new Blob([bytes], { type: contentType }) });
    }
    async removePrivateAsset(path) {
      return this.request(`/storage/v1/object/project-assets/${path.split("/").map(encodeURIComponent).join("/")}`, { method: "DELETE" });
    }
    async setPublicSigningKey(publicKey) {
      return this.json("/rest/v1/profiles?on_conflict=id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify({ public_signing_key: publicKey }) });
    }
    async exportMyData() {
      return this.json("/rest/v1/rpc/export_my_data", { method: "POST", body: "{}" });
    }
    async deleteMyAccount() {
      return this.json("/rest/v1/rpc/delete_my_account", { method: "POST", body: "{}" });
    }
  };
  function cloudConfigured() {
    return !!(localStorage.getItem("bbs.supabase.url") && localStorage.getItem("bbs.supabase.key"));
  }
  function cloudFromStorage() {
    const url = localStorage.getItem("bbs.supabase.url") || "", anonKey = localStorage.getItem("bbs.supabase.key") || "", accessToken = sessionStorage.getItem("bbs.supabase.token") || void 0, refreshToken = sessionStorage.getItem("bbs.supabase.refresh") || void 0;
    if (!url || !anonKey) throw new Error("Configure the Supabase URL and anonymous public key in Settings.");
    return new SupabaseRest({ url, anonKey, accessToken, refreshToken });
  }
  function storeCloudSession(s) {
    sessionStorage.setItem("bbs.supabase.token", s.access_token);
    sessionStorage.setItem("bbs.supabase.refresh", s.refresh_token);
  }
  function clearCloudSession() {
    sessionStorage.removeItem("bbs.supabase.token");
    sessionStorage.removeItem("bbs.supabase.refresh");
  }

  // src/security/keyStore.ts
  var STORAGE = "bbs.signing.encrypted.v1";
  var unlocked = null;
  function encryptedKey() {
    try {
      const s = localStorage.getItem(STORAGE);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }
  function signer() {
    return unlocked ? { publicKey: unlocked.publicKey, privateKey: unlocked.privateKey } : void 0;
  }
  function signingStatus() {
    const box = encryptedKey();
    return { exists: !!box, unlocked: !!unlocked, publicKey: unlocked?.publicKey || box?.publicKey, createdAt: unlocked?.createdAt || box?.createdAt };
  }
  async function createAndStoreSigningKey(passphrase) {
    const bundle = await createSigningKey(), box = await encryptSigningKey(bundle, passphrase);
    localStorage.setItem(STORAGE, JSON.stringify(box));
    unlocked = bundle;
    return signingStatus();
  }
  async function unlockSigningKey(passphrase) {
    const box = encryptedKey();
    if (!box) throw new Error("No local signing key exists.");
    unlocked = await decryptSigningKey(box, passphrase);
    return signingStatus();
  }
  function lockSigningKey() {
    unlocked = null;
    return signingStatus();
  }
  function removeSigningKey() {
    unlocked = null;
    localStorage.removeItem(STORAGE);
  }
  function exportEncryptedSigningKey() {
    const box = encryptedKey();
    if (!box) throw new Error("No signing key to export.");
    return JSON.stringify(box, null, 2);
  }
  function importEncryptedSigningKey(text) {
    const x = JSON.parse(text);
    if (x.version !== 1 || x.algorithm !== "PBKDF2-SHA256/AES-256-GCM" || !x.publicKey || !x.ciphertext) throw new Error("Unsupported signing-key file.");
    localStorage.setItem(STORAGE, JSON.stringify(x));
    unlocked = null;
    return signingStatus();
  }

  // src/ui/SettingsSurface.tsx
  function saveText(name, text) {
    const u = URL.createObjectURL(new Blob([text], { type: "application/json" })), a = document.createElement("a");
    a.href = u;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1e3);
  }
  function SettingsSurface({ setMessage }) {
    const [theme, setTheme] = React.useState(localStorage.getItem("bbs.theme") || "system");
    const [cal, setCal] = React.useState(() => loadCalibration());
    const [url, setUrl] = React.useState(localStorage.getItem("bbs.supabase.url") || "");
    const [key, setKey] = React.useState(localStorage.getItem("bbs.supabase.key") || "");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, setUser] = React.useState(null);
    const [passphrase, setPassphrase] = React.useState("");
    const [signState, setSignState] = React.useState(() => signingStatus());
    const keyFile = React.useRef(null);
    const mark = (k, v) => setCal(saveCalibration({ ...cal, [k]: v }));
    const cue = async (mode) => {
      try {
        await playCalibrationCue(mode);
        setMessage?.(`Played ${mode} channel cue.`);
      } catch (e) {
        setMessage?.(String(e));
      }
    };
    const saveCloud = () => {
      localStorage.setItem("bbs.supabase.url", url.trim().replace(/\/$/, ""));
      localStorage.setItem("bbs.supabase.key", key.trim());
      setMessage?.("Cloud configuration saved locally.");
    };
    const signin = async (kind) => {
      try {
        saveCloud();
        const api = cloudFromStorage(), s = kind === "in" ? await api.signIn(email, password) : await api.signUp(email, password);
        if (s?.access_token) storeCloudSession(s);
        setUser(s?.user || await api.me().catch(() => null));
        setMessage?.(kind === "in" ? "Signed in." : "Account created; verify email if required by your Supabase project.");
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      }
    };
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "SETTINGS"), /* @__PURE__ */ React.createElement("h1", null, "Device, identity & cloud"), /* @__PURE__ */ React.createElement("div", { className: "settings-grid" }, /* @__PURE__ */ React.createElement("div", { className: "settings-card" }, /* @__PURE__ */ React.createElement("h3", null, "Headphone & channel calibration"), /* @__PURE__ */ React.createElement("p", null, "The browser cannot detect headphones or physical sound pressure. Complete these listening checks yourself."), /* @__PURE__ */ React.createElement("div", { className: "cal-steps" }, /* @__PURE__ */ React.createElement("button", { onClick: () => cue("left") }, "\u25B6 Left-only cue"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.leftConfirmed, onChange: (e) => mark("leftConfirmed", e.target.checked) }), " I heard it only on the left"), /* @__PURE__ */ React.createElement("button", { onClick: () => cue("right") }, "\u25B6 Right-only cue"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.rightConfirmed, onChange: (e) => mark("rightConfirmed", e.target.checked) }), " I heard it only on the right"), /* @__PURE__ */ React.createElement("button", { onClick: () => cue("alternating") }, "\u25B6 Alternating L/R cue"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.alternatingConfirmed, onChange: (e) => mark("alternatingConfirmed", e.target.checked) }), " Alternation was correct"), /* @__PURE__ */ React.createElement("button", { onClick: () => cue("center") }, "\u25B6 Center cue"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.centerConfirmed, onChange: (e) => mark("centerConfirmed", e.target.checked) }), " Center appeared centered"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.headphonesConfirmed, onChange: (e) => mark("headphonesConfirmed", e.target.checked) }), " I confirm I am using stereo headphones/earbuds"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.spatialAudioWarningAcknowledged, onChange: (e) => mark("spatialAudioWarningAcknowledged", e.target.checked) }), " I checked that mono/spatial/crossfeed processing is disabled when reproducibility matters")), /* @__PURE__ */ React.createElement("b", { className: calibrationComplete(cal) ? "pass" : "warn" }, calibrationComplete(cal) ? `Calibration completed ${new Date(cal.completedAt).toLocaleString()}` : "Calibration incomplete")), /* @__PURE__ */ React.createElement("div", { className: "settings-card" }, /* @__PURE__ */ React.createElement("h3", null, "Project signing key"), /* @__PURE__ */ React.createElement("p", null, "Ed25519 signatures authenticate package integrity/key control. The private key is stored only as PBKDF2 + AES-256-GCM encrypted data."), /* @__PURE__ */ React.createElement("label", null, "Key passphrase", /* @__PURE__ */ React.createElement("input", { type: "password", value: passphrase, onChange: (e) => setPassphrase(e.target.value), minLength: 10 })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      try {
        setSignState(await createAndStoreSigningKey(passphrase));
        setMessage?.("New encrypted signing key created and unlocked.");
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "Create/replace key"), /* @__PURE__ */ React.createElement("button", { disabled: !signState.exists, onClick: async () => {
      try {
        setSignState(await unlockSigningKey(passphrase));
        setMessage?.("Signing key unlocked for this app session.");
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      }
    } }, "Unlock"), /* @__PURE__ */ React.createElement("button", { disabled: !signState.unlocked, onClick: () => setSignState(lockSigningKey()) }, "Lock")), /* @__PURE__ */ React.createElement("small", null, signState.exists ? `${signState.unlocked ? "Unlocked" : "Locked"} \xB7 public key ${signState.publicKey?.slice(0, 24)}\u2026` : "No local signing key"), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { disabled: !signState.exists, onClick: () => saveText("mindaural-signing-key.json", exportEncryptedSigningKey()) }, "Back up encrypted key"), /* @__PURE__ */ React.createElement("button", { onClick: () => keyFile.current?.click() }, "Import encrypted key"), /* @__PURE__ */ React.createElement("input", { hidden: true, ref: keyFile, type: "file", accept: ".json,application/json", onChange: async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      try {
        setSignState(importEncryptedSigningKey(await f.text()));
        setMessage?.("Encrypted signing key imported; unlock it with its passphrase.");
      } catch (err) {
        setMessage?.(String(err));
      }
    } }), /* @__PURE__ */ React.createElement("button", { className: "danger", disabled: !signState.exists, onClick: () => {
      if (confirm("Remove the encrypted signing key from this browser?")) {
        removeSigningKey();
        setSignState(signingStatus());
      }
    } }, "Remove key"))), /* @__PURE__ */ React.createElement("div", { className: "settings-card" }, /* @__PURE__ */ React.createElement("h3", null, "Supabase community backend"), /* @__PURE__ */ React.createElement("label", null, "Project URL", /* @__PURE__ */ React.createElement("input", { value: url, onChange: (e) => setUrl(e.target.value), placeholder: "https://\u2026supabase.co" })), /* @__PURE__ */ React.createElement("label", null, "Anonymous public key", /* @__PURE__ */ React.createElement("input", { type: "password", value: key, onChange: (e) => setKey(e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: saveCloud }, "Save endpoint"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      try {
        saveCloud();
        const u = await cloudFromStorage().me();
        setUser(u);
        setMessage?.("Cloud connection authenticated.");
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      }
    } }, "Test session")), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("label", null, "Email", /* @__PURE__ */ React.createElement("input", { type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value) })), /* @__PURE__ */ React.createElement("label", null, "Password", /* @__PURE__ */ React.createElement("input", { type: "password", autoComplete: "current-password", value: password, onChange: (e) => setPassword(e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => signin("in") }, "Sign in"), /* @__PURE__ */ React.createElement("button", { onClick: () => signin("up") }, "Create account"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      try {
        await cloudFromStorage().signOut();
      } catch {
      }
      clearCloudSession();
      setUser(null);
      setMessage?.("Signed out locally.");
    } }, "Sign out")), user && /* @__PURE__ */ React.createElement("small", null, "Signed in: ", user.email || user.id)), /* @__PURE__ */ React.createElement("div", { className: "settings-card" }, /* @__PURE__ */ React.createElement("h3", null, "Appearance & accessibility"), /* @__PURE__ */ React.createElement("label", null, "Theme", /* @__PURE__ */ React.createElement("select", { value: theme, onChange: (e) => {
      const v = e.target.value;
      setTheme(v);
      localStorage.setItem("bbs.theme", v);
      document.documentElement.dataset.theme = v;
    } }, /* @__PURE__ */ React.createElement("option", { value: "system" }, "System"), /* @__PURE__ */ React.createElement("option", { value: "light" }, "Light"), /* @__PURE__ */ React.createElement("option", { value: "dark" }, "Dark"))), /* @__PURE__ */ React.createElement("p", null, "Keyboard focus is always visible; reduced-motion preferences disable nonessential animation.")), /* @__PURE__ */ React.createElement("div", { className: "settings-card" }, /* @__PURE__ */ React.createElement("h3", null, "Format policy"), /* @__PURE__ */ React.createElement("p", null, "Bundled targets: WAV \xB7 AIFF \xB7 FLAC \xB7 MP3 \xB7 Ogg Vorbis \xB7 Ogg Opus \xB7 WebM Opus."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, "AAC/M4A:"), " intentionally unsupported. ", /* @__PURE__ */ React.createElement("b", null, "FFmpeg:"), " prohibited throughout the project."))));
  }

  // src/labs/lightControl.ts
  var TAU2 = Math.PI * 2;
  var CARRIER = 19200;
  var DEFAULT_LIGHT_CONTROL = { frequencyHz: 10, leftAmplitude: 0.25, rightAmplitude: 0.25, leftPhase: 0, rightPhase: 0, duty: 0.5, waveform: "square" };
  function env(spec, t, phase) {
    const p = ((t * spec.frequencyHz + phase / TAU2) % 1 + 1) % 1;
    if (spec.waveform === "sine") return 0.5 + 0.5 * Math.sin(TAU2 * p);
    return p < Math.max(0.01, Math.min(0.99, spec.duty)) ? 1 : 0;
  }
  function renderLightControl(duration, sampleRate, spec = DEFAULT_LIGHT_CONTROL) {
    if (sampleRate < 44100) throw new Error("19.2 kHz light-control export requires at least 44.1 kHz sample rate");
    const n = Math.max(1, Math.round(duration * sampleRate)), left = new Float32Array(n), right = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / sampleRate, carrier = Math.sin(TAU2 * CARRIER * t);
      left[i] = carrier * spec.leftAmplitude * env(spec, t, spec.leftPhase);
      right[i] = carrier * spec.rightAmplitude * env(spec, t, spec.rightPhase);
    }
    return { sampleRate, left, right, duration: n / sampleRate };
  }
  function analyzeLightControl(buf) {
    const l = goertzel(buf.left, buf.sampleRate, CARRIER), r = goertzel(buf.right, buf.sampleRate, CARRIER), present = Math.max(l, r) > 2e-3;
    return { carrierHz: CARRIER, leftCarrierMagnitude: l, rightCarrierMagnitude: r, present, confidence: Math.min(1, Math.max(l, r) * 8) };
  }

  // src/ui/LabsSurface.tsx
  function download(name, bytes, type = "audio/wav") {
    const u = URL.createObjectURL(new Blob([bytes], { type })), a = document.createElement("a");
    a.href = u;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1e3);
  }
  function N({ label, value, onChange, min = 0, max = 100, step = 0.01, suffix = "" }) {
    return /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("input", { type: "number", min, max, step, value, onChange: (e) => onChange(Number(e.target.value)) }), /* @__PURE__ */ React.createElement("small", null, suffix));
  }
  async function estimateRefresh(samples = 45) {
    return new Promise((resolve) => {
      let last = 0, vals = [];
      const tick = (t) => {
        if (last) vals.push(t - last);
        last = t;
        if (vals.length >= samples) {
          const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
          resolve(1e3 / avg);
        } else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  function LabsSurface({ setMessage }) {
    const [armed, setArmed] = React.useState(false), [visualHz, setVisualHz] = React.useState(10), [visualDuty, setVisualDuty] = React.useState(0.5), [visualWave, setVisualWave] = React.useState("square"), [brightness, setBrightness] = React.useState(0.72), [refresh, setRefresh] = React.useState(null), [spec, setSpec] = React.useState({ ...DEFAULT_LIGHT_CONTROL }), [duration, setDuration] = React.useState(60), [rate, setRate] = React.useState(48e3), [diag, setDiag] = React.useState(null);
    const patch = (p) => setSpec((s) => ({ ...s, ...p }));
    const effectiveHz = refresh && visualWave === "square" ? Math.max(0.5, Math.min(visualHz, refresh / 2)) : visualHz;
    React.useEffect(() => {
      estimateRefresh().then(setRefresh).catch(() => {
      });
    }, []);
    const render = () => {
      try {
        const b = renderLightControl(duration, rate, spec);
        setDiag(analyzeLightControl(b));
        return b;
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
        return null;
      }
    };
    const exportWav = () => {
      const b = render();
      if (!b) return;
      download(`light-control-${spec.frequencyHz}hz.wav`, encodeWav(b, 24));
      setMessage?.("Lossless 24-bit legacy light-control WAV exported. Do not use lossy encoding on the 19.2 kHz carrier.");
    };
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "LABS"), /* @__PURE__ */ React.createElement("h1", null, "Visual & legacy light-control laboratory"), /* @__PURE__ */ React.createElement("div", { className: "warning" }, /* @__PURE__ */ React.createElement("b", null, "Photosensitive seizure warning"), /* @__PURE__ */ React.createElement("p", null, "Flashing light can trigger seizures in susceptible people. Enable it only after acknowledging this warning; stop immediately if you feel unwell. Display timing is not laboratory calibrated."), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: armed, onChange: (e) => setArmed(e.target.checked) }), " I understand and want to enable visual flicker controls")), /* @__PURE__ */ React.createElement("div", { className: "labs-grid" }, /* @__PURE__ */ React.createElement("div", { className: "lab-card" }, /* @__PURE__ */ React.createElement("h3", null, "Visual stimulation"), /* @__PURE__ */ React.createElement("p", null, "Measured display refresh: ", /* @__PURE__ */ React.createElement("b", null, refresh ? `${refresh.toFixed(1)} Hz` : "measuring\u2026"), ". Requested patterns are bounded by observable refresh timing."), /* @__PURE__ */ React.createElement(N, { label: "Frequency", value: visualHz, min: 0.5, max: Math.max(1, (refresh || 60) / 2), step: 0.1, suffix: "Hz", onChange: setVisualHz }), /* @__PURE__ */ React.createElement(N, { label: "Duty cycle", value: visualDuty, min: 0.05, max: 0.95, step: 0.01, onChange: setVisualDuty }), /* @__PURE__ */ React.createElement(N, { label: "Brightness", value: brightness, min: 0.05, max: 1, step: 0.01, onChange: setBrightness }), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Waveform"), /* @__PURE__ */ React.createElement("select", { value: visualWave, onChange: (e) => setVisualWave(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "square" }, "Square"), /* @__PURE__ */ React.createElement("option", { value: "sine" }, "Sine"))), /* @__PURE__ */ React.createElement("div", { className: `visual-preview ${armed ? "armed" : ""}`, style: armed ? { ["--visual-period"]: `${1 / effectiveHz}s`, ["--visual-duty"]: `${visualDuty * 100}%`, opacity: brightness } : void 0 }, /* @__PURE__ */ React.createElement("span", null, armed ? `${effectiveHz.toFixed(2)} Hz preview` : "Safety interlock off")), /* @__PURE__ */ React.createElement("small", null, "Browser scheduling, display response, compositing and refresh rate prevent a laboratory-precision timing claim.")), /* @__PURE__ */ React.createElement("div", { className: "lab-card" }, /* @__PURE__ */ React.createElement("h3", null, "Legacy 19.2 kHz Light Control"), /* @__PURE__ */ React.createElement("p", null, "Creates one amplitude-gated 19.2 kHz control carrier per stereo channel for compatible legacy decoders. Keep this path lossless."), /* @__PURE__ */ React.createElement(N, { label: "Light modulation", value: spec.frequencyHz, min: 0.1, max: 40, step: 0.1, suffix: "Hz", onChange: (x) => patch({ frequencyHz: x }) }), /* @__PURE__ */ React.createElement(N, { label: "Left amplitude", value: spec.leftAmplitude, min: 0, max: 0.8, step: 0.01, onChange: (x) => patch({ leftAmplitude: x }) }), /* @__PURE__ */ React.createElement(N, { label: "Right amplitude", value: spec.rightAmplitude, min: 0, max: 0.8, step: 0.01, onChange: (x) => patch({ rightAmplitude: x }) }), /* @__PURE__ */ React.createElement(N, { label: "Left phase", value: spec.leftPhase, min: -6.283, max: 6.283, step: 0.01, suffix: "rad", onChange: (x) => patch({ leftPhase: x }) }), /* @__PURE__ */ React.createElement(N, { label: "Right phase", value: spec.rightPhase, min: -6.283, max: 6.283, step: 0.01, suffix: "rad", onChange: (x) => patch({ rightPhase: x }) }), /* @__PURE__ */ React.createElement(N, { label: "Duty cycle", value: spec.duty, min: 0.01, max: 0.99, step: 0.01, onChange: (x) => patch({ duty: x }) }), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Waveform"), /* @__PURE__ */ React.createElement("select", { value: spec.waveform, onChange: (e) => patch({ waveform: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "square" }, "Square gate"), /* @__PURE__ */ React.createElement("option", { value: "sine" }, "Sine gate"))), /* @__PURE__ */ React.createElement(N, { label: "Duration", value: duration, min: 0.1, max: 3600, step: 1, suffix: "s", onChange: setDuration }), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Sample rate"), /* @__PURE__ */ React.createElement("select", { value: rate, onChange: (e) => setRate(Number(e.target.value)) }, /* @__PURE__ */ React.createElement("option", { value: "44100" }, "44.1 kHz"), /* @__PURE__ */ React.createElement("option", { value: "48000" }, "48 kHz"), /* @__PURE__ */ React.createElement("option", { value: "96000" }, "96 kHz"), /* @__PURE__ */ React.createElement("option", { value: "192000" }, "192 kHz"))), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => render() }, "Validate signal"), /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: exportWav }, "Export lossless WAV")), diag && /* @__PURE__ */ React.createElement("div", { className: "technical" }, /* @__PURE__ */ React.createElement("b", null, diag.present ? "19.2 kHz carrier detected" : "Carrier validation failed"), /* @__PURE__ */ React.createElement("span", null, "L ", diag.leftCarrierMagnitude.toFixed(4), " \xB7 R ", diag.rightCarrierMagnitude.toFixed(4), " \xB7 confidence ", Math.round(diag.confidence * 100), "%"))), /* @__PURE__ */ React.createElement("div", { className: "lab-card" }, /* @__PURE__ */ React.createElement("h3", null, "Hardware bridges"), /* @__PURE__ */ React.createElement("p", null, "These capabilities are optional transport bridges; the 19.2 kHz audio file remains the compatibility artifact."), /* @__PURE__ */ React.createElement("div", { className: "chips" }, /* @__PURE__ */ React.createElement("span", null, "Web MIDI: ", navigator.requestMIDIAccess ? "available" : "unavailable"), /* @__PURE__ */ React.createElement("span", null, "Web Serial: ", navigator.serial ? "available" : "unavailable"), /* @__PURE__ */ React.createElement("span", null, "Web Bluetooth: ", navigator.bluetooth ? "available" : "unavailable")), /* @__PURE__ */ React.createElement("button", { disabled: !navigator.requestMIDIAccess, onClick: async () => {
      try {
        const access = await navigator.requestMIDIAccess();
        setMessage?.(`MIDI access granted \xB7 ${access.outputs.size} outputs.`);
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "Request MIDI access"), /* @__PURE__ */ React.createElement("button", { disabled: !navigator.serial, onClick: async () => {
      try {
        const port = await navigator.serial.requestPort();
        setMessage?.(`Serial device selected: ${port.getInfo ? JSON.stringify(port.getInfo()) : "ready"}`);
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "Choose serial device"), /* @__PURE__ */ React.createElement("button", { disabled: !navigator.bluetooth, onClick: async () => {
      try {
        const d = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
        setMessage?.(`Bluetooth device selected: ${d.name || d.id}`);
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "Choose Bluetooth device")), /* @__PURE__ */ React.createElement("div", { className: "lab-card" }, /* @__PURE__ */ React.createElement("h3", null, "Compatibility validation"), /* @__PURE__ */ React.createElement("p", null, "Legacy 19.2 kHz Light Control is validated in software for carrier frequency, envelope, duty cycle, phase, channel mapping and lossless export. Physical third-party decoder testing is not required for release."), /* @__PURE__ */ React.createElement("div", { className: "chips" }, /* @__PURE__ */ React.createElement("span", null, "Software signal validation"), /* @__PURE__ */ React.createElement("span", null, "Lossless reference export")))));
  }

  // src/storage/playlists.ts
  var DB3 = "mindaural";
  var STORE3 = "playlists";
  var VERSION3 = 3;
  function open3() {
    return new Promise((resolve, reject) => {
      const r = indexedDB.open(DB3, VERSION3);
      r.onupgradeneeded = () => {
        if (!r.result.objectStoreNames.contains("projects")) r.result.createObjectStore("projects", { keyPath: "id" });
        if (!r.result.objectStoreNames.contains("assets")) r.result.createObjectStore("assets", { keyPath: "id" });
        if (!r.result.objectStoreNames.contains(STORE3)) r.result.createObjectStore(STORE3, { keyPath: "id" });
      };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  }
  function createPlaylist(title = "New playlist") {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    return { id: crypto.randomUUID(), title, items: [], createdAt: now, updatedAt: now };
  }
  async function savePlaylist(p) {
    const db = await open3(), row2 = { ...structuredClone(p), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE3, "readwrite");
      tx.objectStore(STORE3).put(row2);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    return row2;
  }
  async function loadPlaylists() {
    const db = await open3(), rows = await new Promise((resolve, reject) => {
      const r = db.transaction(STORE3).objectStore(STORE3).getAll();
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    db.close();
    return rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
  async function deletePlaylist(id2) {
    const db = await open3();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE3, "readwrite");
      tx.objectStore(STORE3).delete(id2);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }
  async function addProjectToPlaylist(playlist, project) {
    const item = { id: crypto.randomUUID(), title: project.title, project: structuredClone(project) };
    return savePlaylist({ ...playlist, items: [...playlist.items, item] });
  }

  // src/ui/PlaylistPanel.tsx
  function PlaylistPanel({ current, onPlay, setMessage }) {
    const [lists, setLists] = React.useState([]), [title, setTitle] = React.useState("");
    const refresh = () => loadPlaylists().then(setLists);
    React.useEffect(() => {
      refresh();
    }, []);
    const create = async () => {
      const p = await savePlaylist(createPlaylist(title.trim() || "New playlist"));
      setTitle("");
      await refresh();
      setMessage?.(`Created playlist ${p.title}.`);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "playlist-panel" }, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Playlists"), /* @__PURE__ */ React.createElement("small", null, "Sequence complete session snapshots.")), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("input", { placeholder: "Playlist name", value: title, onChange: (e) => setTitle(e.target.value) }), /* @__PURE__ */ React.createElement("button", { onClick: create }, "Create"))), lists.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "empty-state" }, /* @__PURE__ */ React.createElement("p", null, "No playlists yet.")) : lists.map((list) => /* @__PURE__ */ React.createElement("div", { className: "playlist-row", key: list.id }, /* @__PURE__ */ React.createElement("div", { className: "playlist-head" }, /* @__PURE__ */ React.createElement("input", { value: list.title, onChange: async (e) => {
      await savePlaylist({ ...list, title: e.target.value });
      await refresh();
    } }), /* @__PURE__ */ React.createElement("span", null, list.items.length, " sessions \xB7 ", Math.round(list.items.reduce((n, x) => n + x.project.duration, 0) / 60), " min"), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { disabled: !list.items.length, onClick: () => onPlay(list.items.map((x) => x.project)) }, "\u25B6 Play"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      await addProjectToPlaylist(list, current);
      await refresh();
      setMessage?.(`Added ${current.title} to ${list.title}.`);
    } }, "+ Current"), /* @__PURE__ */ React.createElement("button", { className: "danger", onClick: async () => {
      if (confirm(`Delete playlist ${list.title}?`)) {
        await deletePlaylist(list.id);
        await refresh();
      }
    } }, "Delete"))), /* @__PURE__ */ React.createElement("div", { className: "playlist-items" }, list.items.map((item, i) => /* @__PURE__ */ React.createElement("div", { key: item.id }, /* @__PURE__ */ React.createElement("span", null, i + 1, ". ", item.title), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { disabled: i === 0, onClick: async () => {
      const items = list.items.slice();
      [items[i - 1], items[i]] = [items[i], items[i - 1]];
      await savePlaylist({ ...list, items });
      await refresh();
    } }, "\u2191"), /* @__PURE__ */ React.createElement("button", { disabled: i === list.items.length - 1, onClick: async () => {
      const items = list.items.slice();
      [items[i + 1], items[i]] = [items[i], items[i + 1]];
      await savePlaylist({ ...list, items });
      await refresh();
    } }, "\u2193"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      await savePlaylist({ ...list, items: list.items.filter((x) => x.id !== item.id) });
      await refresh();
    } }, "\xD7"))))))));
  }

  // src/ui/LibrarySurface.tsx
  var collections = ["all", "research", "curated", "community", "personal"];
  function row(p) {
    const v = p.project.voices[0];
    return { type: v?.type || "\u2014", ears: v ? `${v.leftHz.toFixed(2)} / ${v.rightHz.toFixed(2)} Hz` : "\u2014", beat: v ? Math.abs(v.rightHz - v.leftHz).toFixed(2) + " Hz" : "\u2014", duration: Math.round(p.duration / 60) + " min", voices: p.project.voices.length, automation: p.project.voices.reduce((n, v2) => n + v2.automation.length, 0), evidence: p.evidence.state, source: p.project.provenance.source || p.project.provenance.author };
  }
  function LibrarySurface({ saved, project, setProject, setSurface, setMessage, onPlayPlaylist }) {
    const [q, setQ] = React.useState(""), [collection, setCollection] = React.useState("all"), [evidence, setEvidence] = React.useState("all"), [compare, setCompare] = React.useState([]), [cloud, setCloud] = React.useState([]), [loading, setLoading] = React.useState(false), [selectedCloud, setSelectedCloud] = React.useState(null), [rating, setRating] = React.useState(5), [review, setReview] = React.useState(""), [rights, setRights] = React.useState(false), [publishDesc, setPublishDesc] = React.useState(project.description || "");
    const refreshCloud = async () => {
      if (!cloudConfigured()) {
        setMessage?.("Configure Supabase in Settings to load community sessions.");
        return;
      }
      setLoading(true);
      try {
        setCloud(await cloudFromStorage().listPublicPresets(100));
        setMessage?.("Community library refreshed.");
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    React.useEffect(() => {
      if (cloudConfigured()) refreshCloud();
    }, []);
    const built = PRESETS.filter((p) => (collection === "all" || p.collection === collection) && (evidence === "all" || p.evidence.state === evidence) && `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()));
    const local = saved.map((p) => ({ id: `local-${p.id}`, title: p.title, collection: "personal", description: p.description, duration: p.duration, purpose: "Personal", evidence: p.evidence, tags: p.tags, project: p }));
    const visibleLocal = collection === "all" || collection === "personal" ? local.filter((p) => `${p.title} ${p.description}`.toLowerCase().includes(q.toLowerCase())) : [];
    const allMap = new Map([...PRESETS, ...local].map((p) => [p.id, p]));
    const comparePresets = compare.map((id2) => allMap.get(id2)).filter(Boolean);
    const toggleCompare = (id2) => setCompare((x) => x.includes(id2) ? x.filter((i) => i !== id2) : x.length < 2 ? [...x, id2] : [x[1], id2]);
    const open4 = (p, source) => {
      const next = structuredClone(p);
      if (source) {
        next.id = crypto.randomUUID();
        next.provenance = { ...next.provenance, source, lineage: [...next.provenance.lineage || [], source], createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        next.revision = 1;
      }
      setProject(next);
      setSurface("Studio");
    };
    const publish = async () => {
      try {
        const res = await cloudFromStorage().publishPreset(project, { title: project.title, description: publishDesc, evidenceLevel: project.evidence.state, rightsDeclared: rights });
        setMessage?.(`Published ${Array.isArray(res) ? res[0]?.title || project.title : project.title}.`);
        setRights(false);
        await refreshCloud();
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      }
    };
    const submitReview = async () => {
      if (!selectedCloud) return;
      try {
        await cloudFromStorage().review(selectedCloud.id, rating, review);
        setMessage?.("Review saved.");
        setReview("");
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      }
    };
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "LIBRARY"), /* @__PURE__ */ React.createElement("h1", null, "Research, curated, community, and yours"), /* @__PURE__ */ React.createElement("div", { className: "library-toolbar" }, /* @__PURE__ */ React.createElement("input", { className: "search", placeholder: "Search title, tags, description", value: q, onChange: (e) => setQ(e.target.value) }), /* @__PURE__ */ React.createElement("select", { value: evidence, onChange: (e) => setEvidence(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "all" }, "All evidence"), Array.from(new Set(PRESETS.map((p) => p.evidence.state))).map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("button", { onClick: refreshCloud, disabled: loading }, loading ? "Loading\u2026" : "Refresh community")), /* @__PURE__ */ React.createElement("div", { className: "tabs" }, collections.map((c) => /* @__PURE__ */ React.createElement("button", { key: c, className: collection === c ? "active" : "", onClick: () => setCollection(c) }, c[0].toUpperCase() + c.slice(1)))), comparePresets.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "compare-panel" }, /* @__PURE__ */ React.createElement("div", { className: "compare-head" }, /* @__PURE__ */ React.createElement("h3", null, "Preset comparison"), /* @__PURE__ */ React.createElement("button", { onClick: () => setCompare([]) }, "Clear")), /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Attribute"), comparePresets.map((p) => /* @__PURE__ */ React.createElement("th", { key: p.id }, p.title)))), /* @__PURE__ */ React.createElement("tbody", null, ["type", "ears", "beat", "duration", "voices", "automation", "evidence", "source"].map((k) => /* @__PURE__ */ React.createElement("tr", { key: k }, /* @__PURE__ */ React.createElement("th", null, k), comparePresets.map((p) => /* @__PURE__ */ React.createElement("td", { key: p.id }, String(row(p)[k]))))))), /* @__PURE__ */ React.createElement("small", null, "Select a preset and open it to copy individual tracks/envelopes in Studio. Opening a built-in/community item creates an editable local fork.")), visibleLocal.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "My Library"), /* @__PURE__ */ React.createElement("div", { className: "card-grid compact" }, visibleLocal.map((p) => /* @__PURE__ */ React.createElement("article", { className: "preset", key: p.id }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "collection" }, "personal"), /* @__PURE__ */ React.createElement("h3", null, p.title), /* @__PURE__ */ React.createElement("p", null, p.description), /* @__PURE__ */ React.createElement("small", null, "Revision ", p.project.revision)), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleCompare(p.id) }, compare.includes(p.id) ? "Compared \u2713" : "Compare"), /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: () => open4(p.project) }, "Open")))))), (collection === "all" || collection === "research" || collection === "curated") && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Built in \xB7 ", built.length), /* @__PURE__ */ React.createElement("div", { className: "card-grid compact" }, built.map((p) => /* @__PURE__ */ React.createElement("article", { className: "preset", key: p.id }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "preset-meta" }, /* @__PURE__ */ React.createElement("span", { className: "collection" }, p.collection), /* @__PURE__ */ React.createElement("span", { className: "evidence-tag" }, p.evidence.state)), /* @__PURE__ */ React.createElement("h3", null, p.title), /* @__PURE__ */ React.createElement("p", null, p.description), /* @__PURE__ */ React.createElement("small", null, row(p).ears, " \xB7 \u0394 ", row(p).beat, " \xB7 ", row(p).duration)), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleCompare(p.id) }, compare.includes(p.id) ? "Compared \u2713" : "Compare"), /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: () => open4(p.project, `builtin:${p.id}`) }, "Open fork")))))), (collection === "all" || collection === "community") && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("h2", null, "Community \xB7 ", cloud.length), /* @__PURE__ */ React.createElement("small", null, "Community claims are user-submitted and are not scientific validation.")), cloud.length ? /* @__PURE__ */ React.createElement("div", { className: "card-grid compact" }, cloud.filter((p) => `${p.title} ${p.description}`.toLowerCase().includes(q.toLowerCase())).map((p) => /* @__PURE__ */ React.createElement("article", { className: "preset", key: p.id }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "preset-meta" }, /* @__PURE__ */ React.createElement("span", { className: "collection" }, "community"), /* @__PURE__ */ React.createElement("span", { className: "evidence-tag" }, p.evidence_level || "community-claim")), /* @__PURE__ */ React.createElement("h3", null, p.title), /* @__PURE__ */ React.createElement("p", null, p.description)), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedCloud(p) }, "Review"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      try {
        await cloudFromStorage().favorite(p.id);
        setMessage?.("Added to favorites.");
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "\u2661 Favorite"), /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: () => open4(deserializeSession(p.session), `community:${p.id}`) }, "Open fork"))))) : /* @__PURE__ */ React.createElement("div", { className: "empty-state" }, /* @__PURE__ */ React.createElement("b", null, cloudConfigured() ? "No community sessions returned." : "Cloud not configured."), /* @__PURE__ */ React.createElement("p", null, cloudConfigured() ? "Publish a session or refresh the library." : "Local and built-in libraries remain fully functional without an account."))), /* @__PURE__ */ React.createElement("div", { className: "publish-card" }, /* @__PURE__ */ React.createElement("h2", null, "Publish current session"), /* @__PURE__ */ React.createElement("p", null, "Publishing requires a verified account and a rights declaration. Imported commercial audio cannot be redistributed without permission."), /* @__PURE__ */ React.createElement("label", null, "Description", /* @__PURE__ */ React.createElement("textarea", { value: publishDesc, onChange: (e) => setPublishDesc(e.target.value) })), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: rights, onChange: (e) => setRights(e.target.checked) }), " I have redistribution rights for every embedded/public asset in this session."), /* @__PURE__ */ React.createElement("button", { className: "primary", disabled: !rights, onClick: publish }, "Publish to community")), /* @__PURE__ */ React.createElement(PlaylistPanel, { current: project, onPlay: onPlayPlaylist, setMessage }), selectedCloud && /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: () => setSelectedCloud(null) }, /* @__PURE__ */ React.createElement("div", { className: "modal-card", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("h3", null, "Review ", selectedCloud.title), /* @__PURE__ */ React.createElement("label", null, "Rating", /* @__PURE__ */ React.createElement("select", { value: rating, onChange: (e) => setRating(Number(e.target.value)) }, [5, 4, 3, 2, 1].map((x) => /* @__PURE__ */ React.createElement("option", { key: x, value: x }, x, " / 5")))), /* @__PURE__ */ React.createElement("label", null, "Review", /* @__PURE__ */ React.createElement("textarea", { value: review, onChange: (e) => setReview(e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: submitReview }, "Save review"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      const why = prompt("Why are you reporting this preset?");
      if (!why) return;
      try {
        await cloudFromStorage().report("preset", selectedCloud.id, why);
        setMessage?.("Report submitted.");
        setSelectedCloud(null);
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedCloud(null) }, "Close")))));
  }

  // src/ui/AnalyzerSurface.tsx
  function fmt2(n, d = 2) {
    return Number.isFinite(n) ? n.toFixed(d) : "\u2014";
  }
  function Metric({ label, value, detail }) {
    return /* @__PURE__ */ React.createElement("div", { className: "metric" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("strong", null, value), detail && /* @__PURE__ */ React.createElement("small", null, detail));
  }
  function Spectrum({ spectrum }) {
    if (!spectrum) return null;
    const m = Array.from(spectrum.magnitudes), max = Math.max(...m, 1e-9), pts = m.map((v, i) => `${i / Math.max(1, m.length - 1) * 800},${145 - v / max * 135}`).join(" ");
    return /* @__PURE__ */ React.createElement("div", { className: "viz-card" }, /* @__PURE__ */ React.createElement("div", { className: "viz-head" }, /* @__PURE__ */ React.createElement("b", null, "Spectrum"), /* @__PURE__ */ React.createElement("span", null, spectrum.backend)), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 800 150", preserveAspectRatio: "none", "aria-label": "Frequency spectrum" }, /* @__PURE__ */ React.createElement("polyline", { points: pts, fill: "none", stroke: "currentColor", strokeWidth: "2" })), /* @__PURE__ */ React.createElement("div", { className: "axis" }, /* @__PURE__ */ React.createElement("span", null, "0 Hz"), /* @__PURE__ */ React.createElement("span", null, Math.round(spectrum.frequencies.at(-1) || 0), " Hz")));
  }
  function Waveform2({ left, right }) {
    if (!left || !right) return null;
    const path = (a, offset) => a.map((v, i) => `${i ? "L" : "M"} ${i / Math.max(1, a.length - 1) * 800} ${offset - v * 50}`).join(" ");
    return /* @__PURE__ */ React.createElement("div", { className: "viz-card" }, /* @__PURE__ */ React.createElement("div", { className: "viz-head" }, /* @__PURE__ */ React.createElement("b", null, "Waveform preview"), /* @__PURE__ */ React.createElement("span", null, "Left / Right")), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 800 160", preserveAspectRatio: "none", "aria-label": "Stereo waveform" }, /* @__PURE__ */ React.createElement("line", { x1: "0", x2: "800", y1: "50", y2: "50", stroke: "currentColor", opacity: ".15" }), /* @__PURE__ */ React.createElement("line", { x1: "0", x2: "800", y1: "115", y2: "115", stroke: "currentColor", opacity: ".15" }), /* @__PURE__ */ React.createElement("path", { d: path(left, 50), fill: "none", stroke: "currentColor", strokeWidth: "1.5" }), /* @__PURE__ */ React.createElement("path", { d: path(right, 115), fill: "none", stroke: "currentColor", strokeWidth: "1.5", opacity: ".65" })));
  }
  function Spectrogram({ data }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const c = ref.current;
      if (!c || !data) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const w = data.frames, h = data.bins, img = ctx.createImageData(w, h), m = data.magnitudes;
      let max = 1e-12;
      for (const x of m) max = Math.max(max, x);
      for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
        const v = Math.max(0, Math.min(1, Math.log1p(m[x * h + y] / max * 80) / Math.log(81))), i = ((h - 1 - y) * w + x) * 4;
        img.data[i] = Math.round(40 + 210 * v);
        img.data[i + 1] = Math.round(60 + 120 * v);
        img.data[i + 2] = Math.round(120 + 90 * (1 - v));
        img.data[i + 3] = 255;
      }
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      off.getContext("2d").putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(off, 0, 0, c.width, c.height);
    }, [data]);
    return /* @__PURE__ */ React.createElement("div", { className: "viz-card" }, /* @__PURE__ */ React.createElement("div", { className: "viz-head" }, /* @__PURE__ */ React.createElement("b", null, "Spectrogram"), /* @__PURE__ */ React.createElement("span", null, data.backend, " \xB7 ", data.frames, " frames")), /* @__PURE__ */ React.createElement("canvas", { ref, width: "800", height: "240", "aria-label": "Spectrogram heatmap" }), /* @__PURE__ */ React.createElement("div", { className: "axis" }, /* @__PURE__ */ React.createElement("span", null, "0 s"), /* @__PURE__ */ React.createElement("span", null, fmt2(data.times?.at(-1) || 0, 2), " s")));
  }
  function AnalyzerSurface({ analysis, onAnalyze, gpuStatus }) {
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "ANALYZER"), /* @__PURE__ */ React.createElement("h1", null, "Verify the signal, not the label"), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Analyze the current project or drop a supported audio file anywhere while this page is open. Clean carrier pairs can be measured precisely; complex mixes are reported with candidates and confidence rather than false certainty."), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { className: "primary", onClick: onAnalyze }, "Analyze current session")), analysis && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "analysis-grid" }, /* @__PURE__ */ React.createElement(Metric, { label: "Left carrier", value: `${fmt2(analysis.dominantLeftHz)} Hz` }), /* @__PURE__ */ React.createElement(Metric, { label: "Right carrier", value: `${fmt2(analysis.dominantRightHz)} Hz` }), /* @__PURE__ */ React.createElement(Metric, { label: "Difference", value: `${fmt2(analysis.differenceHz)} Hz` }), /* @__PURE__ */ React.createElement(Metric, { label: "Stereo correlation", value: fmt2(analysis.correlation, 4) }), /* @__PURE__ */ React.createElement(Metric, { label: "Peak L / R", value: `${fmt2(analysis.peakLeft, 4)} / ${fmt2(analysis.peakRight, 4)}` }), /* @__PURE__ */ React.createElement(Metric, { label: "RMS L / R", value: `${fmt2(analysis.rmsLeft, 4)} / ${fmt2(analysis.rmsRight, 4)}` }), /* @__PURE__ */ React.createElement(Metric, { label: "DC L / R", value: `${fmt2(analysis.dcLeft, 5)} / ${fmt2(analysis.dcRight, 5)}` }), /* @__PURE__ */ React.createElement(Metric, { label: "Cross-channel leakage", value: `${fmt2(analysis.leakageDb, 1)} dB` }), /* @__PURE__ */ React.createElement(Metric, { label: "Sample rate", value: `${analysis.sampleRate} Hz` }), /* @__PURE__ */ React.createElement(Metric, { label: "Duration", value: `${fmt2(analysis.duration, 3)} s` }), /* @__PURE__ */ React.createElement(Metric, { label: "Compute", value: analysis.backend }), /* @__PURE__ */ React.createElement(Metric, { label: "Confidence", value: `${Math.round(analysis.confidence * 100)}%` })), /* @__PURE__ */ React.createElement("div", { className: `integrity-card ${analysis.integrity?.pass ? "pass-card" : analysis.integrity ? "fail-card" : ""}` }, /* @__PURE__ */ React.createElement("h3", null, analysis.classification), /* @__PURE__ */ React.createElement("p", null, analysis.integrity ? analysis.integrity.pass ? "Scientific integrity comparison passed for the current manifest." : "Manifest comparison found discrepancies." : "No source manifest comparison was available for this imported file."), analysis.integrity?.issues?.length > 0 && /* @__PURE__ */ React.createElement("ul", null, analysis.integrity.issues.map((x) => /* @__PURE__ */ React.createElement("li", { key: x }, x))), analysis.integrityIssues?.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("b", null, "Signal diagnostics"), /* @__PURE__ */ React.createElement("ul", null, analysis.integrityIssues.map((x) => /* @__PURE__ */ React.createElement("li", { key: x }, x))))), /* @__PURE__ */ React.createElement(Waveform2, { left: analysis.waveformLeft, right: analysis.waveformRight }), /* @__PURE__ */ React.createElement(Spectrum, { spectrum: analysis.spectrum }), /* @__PURE__ */ React.createElement(Spectrogram, { data: analysis.spectrogram }), analysis.candidates?.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "candidate-card" }, /* @__PURE__ */ React.createElement("h3", null, "Carrier-pair candidates"), /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Left"), /* @__PURE__ */ React.createElement("th", null, "Right"), /* @__PURE__ */ React.createElement("th", null, "Difference"), /* @__PURE__ */ React.createElement("th", null, "Relative score"))), /* @__PURE__ */ React.createElement("tbody", null, analysis.candidates.map((c, i) => /* @__PURE__ */ React.createElement("tr", { key: i }, /* @__PURE__ */ React.createElement("td", null, fmt2(c.leftHz), " Hz"), /* @__PURE__ */ React.createElement("td", null, fmt2(c.rightHz), " Hz"), /* @__PURE__ */ React.createElement("td", null, fmt2(c.differenceHz), " Hz"), /* @__PURE__ */ React.createElement("td", null, fmt2(c.score, 5)))))))), /* @__PURE__ */ React.createElement("div", { className: "technical" }, /* @__PURE__ */ React.createElement("b", null, "Compute status"), /* @__PURE__ */ React.createElement("span", null, gpuStatus.active ? "WebGPU active" : "CPU reference fallback", gpuStatus.adapterName ? ` \xB7 ${gpuStatus.adapterName}` : "", gpuStatus.reason ? ` \xB7 ${gpuStatus.reason}` : ""), gpuStatus.limits && /* @__PURE__ */ React.createElement("small", null, Object.entries(gpuStatus.limits).map(([k, v]) => `${k}=${v}`).join(" \xB7 "))));
  }

  // src/ui/App.tsx
  var engine = new LiveEngine();
  var gpu = new WebGpuAnalyzer();
  function download2(name, data, type = "application/octet-stream") {
    const blob = data instanceof Blob ? data : new Blob([data], { type }), url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  function fmt3(n, d = 1) {
    return Number.isFinite(n) ? n.toFixed(d) : "\u2014";
  }
  function evidenceClass(s) {
    return s.toLowerCase().replace(/\s+/g, "-");
  }
  async function loadProjectAssets(p) {
    const pcm = {}, bytes = {};
    for (const a of p.assets) {
      const b = await loadAssetBytes(a.id);
      if (!b) continue;
      bytes[a.id] = b;
      try {
        pcm[a.id] = await decodeAudioBytes(b, a.name, a.mime);
      } catch {
      }
    }
    return { pcm, bytes };
  }
  async function consumeShareTarget(handle) {
    const q = new URLSearchParams(location.search), token = q.get("share_token"), count = Number(q.get("share_count") || 0);
    if (!token || !count) return;
    const files = [];
    for (let i = 0; i < count; i++) {
      const r = await fetch(`./__share_inbox__/${token}/${i}`);
      if (!r.ok) continue;
      const name = decodeURIComponent(r.headers.get("x-bbs-filename") || `shared-${i}`), blob = await r.blob();
      files.push(new File([blob], name, { type: blob.type }));
    }
    if (files.length) await handle(files);
    history.replaceState(null, "", location.pathname);
  }
  function App() {
    const [surface, setSurface] = React.useState("Create");
    const [project, setProjectRaw] = React.useState(() => createDefaultProject("My binaural session"));
    const historyRef = React.useRef(null);
    if (!historyRef.current) historyRef.current = new History(project, 120);
    const setProject = (value) => setProjectRaw((prev) => historyRef.current.push(typeof value === "function" ? value(prev) : value));
    const undo = () => {
      const x = historyRef.current.undo();
      if (x) setProjectRaw(x);
    };
    const redo = () => {
      const x = historyRef.current.redo();
      if (x) setProjectRaw(x);
    };
    const [playing, setPlaying] = React.useState(false);
    const [analysis, setAnalysis] = React.useState(null);
    const [gpuStatus, setGpuStatus] = React.useState({ active: false, reason: "Not checked" });
    const [saved, setSaved] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const fileRef = React.useRef(null);
    const playlistRunRef = React.useRef(0);
    React.useEffect(() => {
      loadProjects().then(setSaved).catch(() => {
      });
      gpu.init().then(setGpuStatus);
      const theme = localStorage.getItem("bbs.theme") || "system";
      document.documentElement.dataset.theme = theme;
      if ("serviceWorker" in navigator) navigator.serviceWorker.register("./public/service-worker.js").then(() => consumeShareTarget(handleFiles).catch((e) => setMessage(`Shared-file import: ${e instanceof Error ? e.message : e}`))).catch(() => {
      });
    }, []);
    React.useEffect(() => {
      const key = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
          e.preventDefault();
          e.shiftKey ? redo() : undo();
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
          e.preventDefault();
          redo();
        }
      };
      addEventListener("keydown", key);
      return () => removeEventListener("keydown", key);
    }, []);
    const voice = project.voices[0];
    const updateVoice = (patch) => setProject((p) => touchProject({ ...p, voices: [{ ...p.voices[0], ...patch }, ...p.voices.slice(1)] }));
    const changeCenter = (c, b = beatOf(voice)) => setProject((p) => touchProject({ ...p, voices: [setCenterBeat(p.voices[0], c, b), ...p.voices.slice(1)] }));
    const changeBeat = (b, c = carrierOf(voice)) => changeCenter(c, b);
    async function toggle() {
      try {
        playlistRunRef.current++;
        if (playing) {
          engine.stop();
          setPlaying(false);
        } else {
          const loaded = await loadProjectAssets(project);
          await engine.start(project, 0, () => setPlaying(false), loaded.pcm);
          setPlaying(true);
          setMessage(`Live at ${engine.sampleRate || "device"} Hz`);
        }
      } catch (e) {
        setMessage(`Audio: ${e instanceof Error ? e.message : e}`);
      }
    }
    async function playPlaylist(projects) {
      if (!projects.length) return;
      engine.stop();
      const run = ++playlistRunRef.current;
      setPlaying(true);
      const playAt = async (index) => {
        if (run !== playlistRunRef.current) return;
        if (index >= projects.length) {
          setPlaying(false);
          setMessage("Playlist complete.");
          return;
        }
        const p = projects[index], loaded = await loadProjectAssets(p);
        setMessage(`Playlist ${index + 1}/${projects.length} \xB7 ${p.title}`);
        await engine.start(p, 0, () => {
          void playAt(index + 1);
        }, loaded.pcm);
      };
      try {
        await playAt(0);
      } catch (e) {
        if (run === playlistRunRef.current) {
          setPlaying(false);
          setMessage(e instanceof Error ? e.message : String(e));
        }
      }
    }
    async function save() {
      await saveProject(project);
      setSaved(await loadProjects());
      setMessage("Saved locally.");
    }
    async function analyze() {
      setMessage("Rendering analysis window\u2026");
      await new Promise((r) => setTimeout(r, 0));
      const loaded = await loadProjectAssets(project), p = { ...project, duration: Math.min(project.duration, 4), voices: project.voices.map((v) => ({ ...v, duration: Math.min(v.duration, 4) })), segments: project.segments.map((s) => ({ ...s, duration: Math.min(s.duration, 4) })) };
      const b = renderProject(p, { duration: Math.min(4, p.duration), assets: loaded.pcm });
      const a = analyzeStereo(b);
      a.spectrum = await gpu.spectrum(b.left, b.sampleRate, 256);
      a.spectrogram = await gpu.spectrogram(b.left, b.sampleRate, 96, Math.min(2048, b.left.length), Math.max(128, Math.floor(Math.min(2048, b.left.length) / 4)));
      a.backend = a.spectrum.backend;
      a.integrity = compareAgainstProject(b, p);
      const dec = Math.max(1, Math.floor(b.left.length / 500));
      a.waveformLeft = Array.from(b.left.filter((_, i) => i % dec === 0).slice(0, 500));
      a.waveformRight = Array.from(b.right.filter((_, i) => i % dec === 0).slice(0, 500));
      setGpuStatus(gpu.getStatus());
      setAnalysis(a);
      setMessage(`Analysis complete using ${a.backend}.`);
    }
    async function exportAudio(kind, opts = {}) {
      setMessage("Preparing export\u2026");
      await new Promise((r) => setTimeout(r, 0));
      try {
        const loaded = await loadProjectAssets(project);
        if (kind === "bbeat" || kind === "bbeat-signed") {
          const s = kind === "bbeat-signed" ? signer() : void 0;
          if (kind === "bbeat-signed" && !s) throw new Error("Unlock or create a signing key in Settings first.");
          download2(`${project.title}${kind === "bbeat-signed" ? "-signed" : ""}.bbeat`, await exportProjectPackage(project, loaded.bytes, s), "application/x-bbeat+zip");
          setMessage(kind === "bbeat-signed" ? "Signed self-contained project package exported." : "Self-contained project package exported.");
          return;
        }
        if (kind === "bwg") {
          const x = exportBwg(project);
          if (!x.bytes) throw new Error(`BWG lossless export refused: ${x.report.unsupported.join(", ")}`);
          download2(`${project.title}.bwg`, x.bytes);
          setMessage("BWG-compatible subset exported.");
          return;
        }
        if (kind === "recipe") {
          download2(`${project.title}-recipe.json`, new TextEncoder().encode(recipeJson(project)), "application/json");
          setMessage("Recipe JSON exported.");
          return;
        }
        if (kind === "manifest") {
          download2(`${project.title}-stimulus-manifest.json`, new TextEncoder().encode(researchManifestJson(project)), "application/json");
          setMessage("Stimulus manifest exported.");
          return;
        }
        if (kind === "stems") {
          download2(`${project.title}-stems.zip`, createStemBundle(project, loaded.pcm), "application/zip");
          setMessage("Per-track WAV stems exported.");
          return;
        }
        if (kind === "diagnostic") {
          const d = createDiagnosticChannels(project, loaded.pcm);
          download2(`${project.title}-left.wav`, d.left, "audio/wav");
          download2(`${project.title}-right.wav`, d.right, "audio/wav");
          setMessage("Left/right diagnostic WAVs exported.");
          return;
        }
        if (kind === "wav-stimulus" || kind === "wav-background" || kind === "wav-selection") {
          const scope = kind === "wav-stimulus" ? "stimulus" : kind === "wav-background" ? "background" : "full", b = renderScope(project, loaded.pcm, scope, Number(opts.start) || 0, opts.duration == null ? void 0 : Number(opts.duration));
          download2(`${project.title}-${kind.replace("wav-", "")}.wav`, encodeWav(b, 24), "audio/wav");
          setMessage(`${kind.replace("wav-", "")} WAV export complete.`);
          return;
        }
        const progress = (x) => setMessage(`Rendering ${kind.toUpperCase()} \xB7 ${Math.round(x * 100)}%`);
        if (kind === "flac") {
          const b = renderProject(project, { assets: loaded.pcm });
          progress(1);
          download2(`${project.title}.flac`, encodeFlac(b, 24), "audio/flac");
          setMessage("FLAC export complete.");
          return;
        }
        if (kind === "ogg-opus" || kind === "webm-opus") {
          const b = renderProject(project, { assets: loaded.pcm });
          const bytes = kind === "ogg-opus" ? await encodeOggOpus(b) : await encodeWebmOpus(b);
          download2(`${project.title}.${kind === "ogg-opus" ? "opus" : "webm"}`, bytes, kind === "ogg-opus" ? "audio/ogg; codecs=opus" : "audio/webm; codecs=opus");
          setMessage(`${kind === "ogg-opus" ? "Ogg Opus" : "WebM Opus"} export complete.`);
          return;
        }
        const blob = kind === "wav" ? renderWavBlob(project, 24, loaded.pcm, 5, progress) : renderAiffBlob(project, 24, loaded.pcm, 5, progress);
        download2(`${project.title}.${kind}`, blob);
        setMessage(`${kind.toUpperCase()} export complete.`);
      } catch (e) {
        setMessage(e instanceof Error ? e.message : String(e));
      }
    }
    async function importAudioFile(f, bytes) {
      if (!allowedAudioName(f.name)) throw new Error("Unsupported audio type");
      const decoded = await decodeAudioBytes(bytes, f.name, f.type), hash2 = await sha256(bytes), id2 = `asset-${hash2.slice(0, 20)}`;
      await saveAssetBytes(id2, bytes, f.type || "application/octet-stream", f.name);
      setProject((p) => {
        const asset = p.assets.some((a) => a.id === id2) ? p.assets : [...p.assets, { id: id2, name: f.name, mime: f.type || "application/octet-stream", size: bytes.length, hash: hash2, license: "user-owned", source: "local import" }];
        const track = { id: uid("audio"), name: f.name, assetId: id2, start: 0, duration: decoded.duration, offset: 0, amplitude: 0.65, pan: 0, loop: false, fadeIn: 0.05, fadeOut: 0.05, mute: false, solo: false };
        return touchProject({ ...p, assets: asset, audioTracks: [...p.audioTracks, track] });
      });
      setSurface("Studio");
      setMessage(`Imported ${f.name} as a timeline audio track.`);
    }
    async function handleFiles(files) {
      for (const f of Array.from(files)) {
        try {
          const bytes = new Uint8Array(await f.arrayBuffer());
          if (f.name.toLowerCase().endsWith(".bbeat")) {
            const x = await importProjectPackageDetailed(bytes);
            for (const a of x.project.assets) if (x.assets[a.id]) await saveAssetBytes(a.id, x.assets[a.id], a.mime, a.name);
            setProject(x.project);
            setSurface("Studio");
            setMessage(`Project imported and ${Object.keys(x.assets).length} embedded assets verified.`);
          } else if (f.name.toLowerCase().endsWith(".bwg")) {
            const x = importBwg(bytes);
            setProject(x.project);
            setSurface("Studio");
            setMessage(x.report.unsupported.length ? `Imported with compatibility warnings: ${x.report.unsupported.join("; ")}` : "BWG preset imported.");
          } else if (allowedAudioName(f.name)) {
            if (surface === "Analyzer") {
              const b = await decodeAudioBytes(bytes, f.name, f.type), a = analyzeStereo(b);
              a.spectrum = await gpu.spectrum(b.left, b.sampleRate, 256);
              a.spectrogram = await gpu.spectrogram(b.left, b.sampleRate, 96, Math.min(2048, b.left.length), Math.max(128, Math.floor(Math.min(2048, b.left.length) / 4)));
              a.backend = a.spectrum.backend;
              const dec = Math.max(1, Math.floor(b.left.length / 500));
              a.waveformLeft = Array.from(b.left.filter((_, i) => i % dec === 0).slice(0, 500));
              a.waveformRight = Array.from(b.right.filter((_, i) => i % dec === 0).slice(0, 500));
              setAnalysis(a);
              setMessage(`Analyzed ${f.name}.`);
            } else await importAudioFile(f, bytes);
          } else throw new Error("Unsupported file. AAC/M4A is intentionally excluded.");
        } catch (e) {
          setMessage(`${f.name}: ${e instanceof Error ? e.message : e}`);
        }
      }
    }
    function addSoundscape(id2) {
      const def = SOUNDSCAPES.find((x) => x.id === id2);
      if (!def) return;
      setProject((p) => touchProject({ ...p, noiseTracks: [...p.noiseTracks, ...def.layers.map((l, i) => ({ id: uid("noise"), name: `${def.title} ${i + 1}`, kind: l.kind, amplitude: l.amplitude, slopeDbOct: l.slopeDbOct, lowpass: l.lowpass, highpass: l.highpass, stereoCorrelation: l.stereoCorrelation, start: 0, duration: p.duration, loop: true, mute: false, solo: false }))] }));
      setMessage(`${def.title} added as procedural background.`);
    }
    const nav = ["Listen", "Create", "Studio", "Library", "Analyzer", "Research", "Learn", "Labs", "Settings"];
    return /* @__PURE__ */ React.createElement("div", { className: "app", onDragOver: (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    }, onDrop: (e) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    } }, /* @__PURE__ */ React.createElement("a", { className: "skip-link", href: "#main-content" }, "Skip to editor"), /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("div", { className: "brand" }, /* @__PURE__ */ React.createElement("div", { className: "mark" }, "\u223F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Mindaural"), /* @__PURE__ */ React.createElement("span", null, "Scientific audio workstation"))), /* @__PURE__ */ React.createElement("button", { className: "import", onClick: () => fileRef.current?.click() }, "Import"), /* @__PURE__ */ React.createElement("input", { ref: fileRef, hidden: true, type: "file", multiple: true, accept: ".bbeat,.bwg,.wav,.flac,.mp3,.aiff,.ogg,.opus,.webm", onChange: (e) => e.target.files && handleFiles(e.target.files) })), /* @__PURE__ */ React.createElement("aside", null, nav.map((n) => /* @__PURE__ */ React.createElement("button", { key: n, className: surface === n ? "active" : "", onClick: () => setSurface(n) }, /* @__PURE__ */ React.createElement("span", null, icon(n)), n)), /* @__PURE__ */ React.createElement("div", { className: "status" }, /* @__PURE__ */ React.createElement("i", { className: gpuStatus.active ? "ok" : "" }), /* @__PURE__ */ React.createElement("span", null, gpuStatus.active ? "WebGPU active" : "CPU fallback"))), /* @__PURE__ */ React.createElement("main", { id: "main-content", tabIndex: -1 }, surface === "Create" && /* @__PURE__ */ React.createElement(Create, { project, voice, setProject, changeCenter, changeBeat, updateVoice, onPlay: toggle, playing, onSave: save, onStudio: () => setSurface("Studio"), onSoundscape: addSoundscape }), " ", surface === "Studio" && /* @__PURE__ */ React.createElement(Studio, { project, setProject, updateVoice, onPlay: toggle, playing, onSave: save, onExport: exportAudio, onUndo: undo, onRedo: redo, canUndo: historyRef.current.canUndo(), canRedo: historyRef.current.canRedo() }), " ", surface === "Listen" && /* @__PURE__ */ React.createElement(Listen, { setProject, setSurface }), " ", surface === "Library" && /* @__PURE__ */ React.createElement(LibrarySurface, { saved, project, setProject, setSurface, setMessage, onPlayPlaylist: playPlaylist }), " ", surface === "Analyzer" && /* @__PURE__ */ React.createElement(AnalyzerSurface, { analysis, onAnalyze: analyze, gpuStatus }), " ", surface === "Research" && /* @__PURE__ */ React.createElement(Research, { project, setMessage }), " ", surface === "Learn" && /* @__PURE__ */ React.createElement(Learn, null), " ", surface === "Labs" && /* @__PURE__ */ React.createElement(LabsSurface, { setMessage }), " ", surface === "Settings" && /* @__PURE__ */ React.createElement(SettingsSurface, { setMessage })), /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("span", null, message || "Drop .bbeat, .bwg, or audio files anywhere to import."), /* @__PURE__ */ React.createElement("span", null, fmt3(voice.leftHz), " / ", fmt3(voice.rightHz), " Hz \xB7 \u0394 ", fmt3(beatOf(voice)), " Hz")));
  }
  function icon(n) {
    return { Listen: "\u25B6", Create: "\uFF0B", Studio: "\u224B", Library: "\u25A6", Analyzer: "\u2301", Research: "\u2299", Learn: "?", Labs: "\u25C7", Settings: "\u2699" }[n];
  }
  function Create({ project, voice, setProject, changeCenter, changeBeat, updateVoice, onPlay, playing, onSave, onStudio, onSoundscape }) {
    const [advanced, setAdvanced] = React.useState(false);
    const exact = (side, v) => updateVoice({ [side]: Math.max(1e-3, v) });
    return /* @__PURE__ */ React.createElement("section", { className: "page create" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "CREATE"), /* @__PURE__ */ React.createElement("h1", null, "Build a precise stereo session"), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Choose the acoustic stimulus you want. Goal labels describe intent, not guaranteed physiological outcomes."), /* @__PURE__ */ React.createElement("div", { className: "creator-card" }, /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Stimulus"), /* @__PURE__ */ React.createElement("select", { value: voice.type, onChange: (e) => updateVoice({ type: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "binaural" }, "Binaural beat"), /* @__PURE__ */ React.createElement("option", { value: "monaural" }, "Monaural beat"), /* @__PURE__ */ React.createElement("option", { value: "isochronic" }, "Isochronic tone"), /* @__PURE__ */ React.createElement("option", { value: "am" }, "Amplitude modulated"), /* @__PURE__ */ React.createElement("option", { value: "stereo" }, "Independent stereo carriers"), /* @__PURE__ */ React.createElement("option", { value: "noise-modulated" }, "Noise-modulated carrier"), /* @__PURE__ */ React.createElement("option", { value: "sham" }, "Sham / control"))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Duration ", /* @__PURE__ */ React.createElement("b", null, Math.round(project.duration / 60), " min")), /* @__PURE__ */ React.createElement("input", { type: "range", min: "1", max: "120", value: project.duration / 60, onChange: (e) => {
      const d = Number(e.target.value) * 60;
      setProject((p) => touchProject({ ...p, duration: d, voices: p.voices.map((v, i) => i ? v : { ...v, duration: d }), noiseTracks: p.noiseTracks.map((n) => ({ ...n, duration: Math.max(n.duration, d) })), segments: p.segments.map((s, i) => i ? s : { ...s, duration: d }) }));
    } })), /* @__PURE__ */ React.createElement("div", { className: "two" }, /* @__PURE__ */ React.createElement(NumberField, { label: "Center carrier", value: carrierOf(voice), suffix: "Hz", onChange: changeCenter }), /* @__PURE__ */ React.createElement(NumberField, { label: "Beat difference", value: beatOf(voice), suffix: "Hz", onChange: changeBeat })), /* @__PURE__ */ React.createElement("div", { className: "ears" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "LEFT EAR"), /* @__PURE__ */ React.createElement("strong", null, fmt3(voice.leftHz, 2), " Hz")), /* @__PURE__ */ React.createElement("div", { className: "delta" }, "\u0394 ", fmt3(beatOf(voice), 2), " Hz"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "RIGHT EAR"), /* @__PURE__ */ React.createElement("strong", null, fmt3(voice.rightHz, 2), " Hz"))), /* @__PURE__ */ React.createElement("button", { className: "text-button", "aria-expanded": advanced, onClick: () => setAdvanced(!advanced) }, advanced ? "Hide advanced" : "Advanced exact controls"), advanced && /* @__PURE__ */ React.createElement("div", { className: "advanced-create" }, /* @__PURE__ */ React.createElement("div", { className: "two" }, /* @__PURE__ */ React.createElement(NumberField, { label: "Exact left ear", value: voice.leftHz, suffix: "Hz", onChange: (v) => exact("leftHz", v) }), /* @__PURE__ */ React.createElement(NumberField, { label: "Exact right ear", value: voice.rightHz, suffix: "Hz", onChange: (v) => exact("rightHz", v) })), /* @__PURE__ */ React.createElement("div", { className: "two" }, /* @__PURE__ */ React.createElement(NumberField, { label: "Fade in", value: voice.fadeIn, suffix: "s", onChange: (v) => updateVoice({ fadeIn: Math.max(0, v) }) }), /* @__PURE__ */ React.createElement(NumberField, { label: "Fade out", value: voice.fadeOut, suffix: "s", onChange: (v) => updateVoice({ fadeOut: Math.max(0, v) }) })), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Waveform"), /* @__PURE__ */ React.createElement("select", { value: voice.waveform, onChange: (e) => updateVoice({ waveform: e.target.value }) }, ["sine", "sine2", "triangle", "square", "smooth-square", "saw", "reverse-saw", "pulse", "bandlimited-square", "bandlimited-saw", "custom-harmonic"].map((x) => /* @__PURE__ */ React.createElement("option", { key: x, value: x }, x)))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Duty / modulation depth ", /* @__PURE__ */ React.createElement("b", null, Math.round(voice.duty * 100), "%")), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0.01", max: "0.99", step: "0.01", value: voice.duty, onChange: (e) => updateVoice({ duty: Number(e.target.value) }) }))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Soundscape"), /* @__PURE__ */ React.createElement("select", { defaultValue: "", onChange: (e) => {
      if (e.target.value) onSoundscape(e.target.value);
      e.target.value = "";
    } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Add optional background\u2026"), SOUNDSCAPES.map((s) => /* @__PURE__ */ React.createElement("option", { value: s.id, key: s.id }, s.title)))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Level ", /* @__PURE__ */ React.createElement("b", null, Math.round(voice.amplitude * 100), "%")), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0", max: "0.4", step: "0.005", value: voice.amplitude, onChange: (e) => updateVoice({ amplitude: Number(e.target.value) }) })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { className: "primary", onClick: onPlay }, playing ? "\u25A0 Stop" : "\u25B6 Play"), /* @__PURE__ */ React.createElement("button", { onClick: onSave }, "Save"), /* @__PURE__ */ React.createElement("button", { onClick: onStudio }, "Open in Studio"))), /* @__PURE__ */ React.createElement(EvidenceCard, { state: project.evidence.state, claim: project.evidence.claim }));
  }
  function NumberField({ label, value, suffix, onChange }) {
    return /* @__PURE__ */ React.createElement("div", { className: "number-field" }, /* @__PURE__ */ React.createElement("label", null, label), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", step: "0.01", value: Number(value.toFixed(3)), onChange: (e) => onChange(Number(e.target.value)) }), /* @__PURE__ */ React.createElement("span", null, suffix)));
  }
  function EvidenceCard({ state, claim }) {
    return /* @__PURE__ */ React.createElement("div", { className: "evidence" }, /* @__PURE__ */ React.createElement("span", { className: `badge ${evidenceClass(state)}` }, state), /* @__PURE__ */ React.createElement("p", null, claim));
  }
  function Studio(props) {
    return /* @__PURE__ */ React.createElement(StudioSurface, { ...props });
  }
  function Listen({ setProject, setSurface }) {
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "LISTEN"), /* @__PURE__ */ React.createElement("h1", null, "Start with a transparent preset"), /* @__PURE__ */ React.createElement("div", { className: "card-grid" }, PRESETS.slice(0, 12).map((p) => /* @__PURE__ */ React.createElement("article", { className: "preset", key: p.id }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: `badge ${evidenceClass(p.evidence.state)}` }, p.evidence.state), /* @__PURE__ */ React.createElement("h3", null, p.title), /* @__PURE__ */ React.createElement("p", null, p.description)), /* @__PURE__ */ React.createElement("div", { className: "preset-foot" }, /* @__PURE__ */ React.createElement("span", null, Math.round(p.duration / 60), " min \xB7 ", fmt3(Math.abs(p.project.voices[0].rightHz - p.project.voices[0].leftHz)), " Hz"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setProject(structuredClone(p.project));
      setSurface("Create");
    } }, "Use"))))));
  }
  function Research({ project, setMessage }) {
    const [run, setRun] = React.useState(() => createResearchRun(project));
    const [reveal, setReveal] = React.useState(false);
    const [rt, setRt] = React.useState("idle");
    const goAt = React.useRef(0);
    const startReaction = () => {
      if (rt !== "idle") return;
      setRt("waiting");
      setRun((r) => logEvent(r, "reaction-wait"));
      setTimeout(() => {
        goAt.current = performance.now();
        setRt("go");
      }, 800 + Math.random() * 1700);
    };
    const hit = () => {
      if (rt === "waiting") {
        setRun((r) => logEvent(r, "reaction-early"));
        setRt("idle");
        return;
      }
      if (rt === "go") {
        const ms = Math.round(performance.now() - goAt.current);
        setRun((r) => logEvent({ ...r, reactionTimesMs: [...r.reactionTimesMs, ms] }, "reaction", { ms }));
        setRt("idle");
      }
    };
    const addB = () => setRun((r) => {
      const c = makeCondition("B", project), conditions = [...r.conditions.filter((x) => x.role !== "B"), c];
      return { ...r, conditions, order: randomize(conditions.map((x) => x.id)) };
    });
    const dl = (name, text, type) => download2(name, new Blob([text], { type }));
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "RESEARCH"), /* @__PURE__ */ React.createElement("h1", null, "Build blinded A/B/control sessions"), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Exploratory protocol tooling. Participant responses remain local/export-only by default; this is not a clinical measurement system."), /* @__PURE__ */ React.createElement("div", { className: "research-toolbar" }, /* @__PURE__ */ React.createElement("button", { onClick: addB }, "Use current project as B"), /* @__PURE__ */ React.createElement("button", { onClick: () => setRun((r) => ({ ...r, order: randomize(r.conditions.map((x) => x.id)) })) }, "Randomize order"), /* @__PURE__ */ React.createElement("button", { onClick: () => setReveal(!reveal) }, reveal ? "Hide roles" : "Reveal roles")), /* @__PURE__ */ React.createElement("div", { className: "condition-grid" }, run.order.map((id2, index) => {
      const c = run.conditions.find((x) => x.id === id2);
      return /* @__PURE__ */ React.createElement("article", { className: "condition", key: id2 }, /* @__PURE__ */ React.createElement("span", null, "Condition ", index + 1), /* @__PURE__ */ React.createElement("strong", null, c.blindLabel), /* @__PURE__ */ React.createElement("p", null, reveal ? `${c.role.toUpperCase()} \xB7 ${c.project.title}` : "Blinded condition"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
        const loaded = await loadProjectAssets(c.project);
        await engine.start(c.project, 0, void 0, loaded.pcm);
        setRun((r) => logEvent(r, "condition-play", { conditionId: id2, blindLabel: c.blindLabel }));
        setMessage(`Playing blinded condition ${c.blindLabel}`);
      } }, "\u25B6 Play"));
    })), /* @__PURE__ */ React.createElement("div", { className: "research-form" }, /* @__PURE__ */ React.createElement("label", null, "Pre-session neutral rating ", /* @__PURE__ */ React.createElement("b", null, run.preRating), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0", max: "100", value: run.preRating, onChange: (e) => setRun((r) => ({ ...r, preRating: Number(e.target.value) })) })), /* @__PURE__ */ React.createElement("label", null, "Post-session neutral rating ", /* @__PURE__ */ React.createElement("b", null, run.postRating), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0", max: "100", value: run.postRating, onChange: (e) => setRun((r) => ({ ...r, postRating: Number(e.target.value) })) })), /* @__PURE__ */ React.createElement("label", null, "Notes", /* @__PURE__ */ React.createElement("textarea", { value: run.notes, onChange: (e) => setRun((r) => ({ ...r, notes: e.target.value })) }))), /* @__PURE__ */ React.createElement("div", { className: "reaction-card" }, /* @__PURE__ */ React.createElement("h3", null, "Reaction-time task"), /* @__PURE__ */ React.createElement("p", null, "Optional simple behavioral hook. Run several trials under the same protocol."), /* @__PURE__ */ React.createElement("button", { className: rt === "go" ? "primary reaction-go" : "", onClick: rt === "idle" ? startReaction : hit }, rt === "idle" ? "Start trial" : rt === "waiting" ? "Wait\u2026" : "CLICK"), /* @__PURE__ */ React.createElement("span", null, run.reactionTimesMs.length ? `Last: ${run.reactionTimesMs.at(-1)} ms \xB7 n=${run.reactionTimesMs.length}` : "No trials yet")), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => dl(`research-${run.id}.json`, exportResearchJson(run), "application/json") }, "Export JSON + stimulus manifests"), /* @__PURE__ */ React.createElement("button", { onClick: () => dl(`research-${run.id}.csv`, exportResearchCsv(run), "text/csv") }, "Export CSV")));
  }
  function Learn() {
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "LEARN"), /* @__PURE__ */ React.createElement("h1", null, "What binaural beats actually are"), /* @__PURE__ */ React.createElement("div", { className: "learn-grid" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "1. Acoustic setup"), /* @__PURE__ */ React.createElement("p", null, "Two separate tones are delivered to the ears. A 395 Hz left tone and 405 Hz right tone have a 10 Hz frequency difference. The application does not inject a 10 Hz audible tone into either channel.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "2. Perception"), /* @__PURE__ */ React.createElement("p", null, "The binaural beat is an auditory percept arising from binaural processing. Separate channels are therefore part of the stimulus definition.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "3. Neural response"), /* @__PURE__ */ React.createElement("p", null, "Frequency-following neural responses have been observed under some protocols, but results vary with stimulus parameters and methodology.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "4. Outcomes"), /* @__PURE__ */ React.createElement("p", null, "Relaxation, attention, sleep, pain, anxiety, and memory findings are heterogeneous. The app labels evidence rather than promising a mental state from a frequency."))), /* @__PURE__ */ React.createElement("div", { className: "citation-box" }, /* @__PURE__ */ React.createElement("b", null, "Research rule"), /* @__PURE__ */ React.createElement("p", null, "Research presets preserve the actual published left/right frequencies, timing, masking, and control conditions when those details are available.")));
  }

  // src/main.tsx
  var element = /* @__PURE__ */ React.createElement(App, null);
  if (typeof ReactDOM.createRoot === "function") {
    ReactDOM.createRoot(document.getElementById("root")).render(element);
  } else {
    ReactDOM.render(element, document.getElementById("root"));
  }
})();
