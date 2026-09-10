# Audio Engine Specification — WebGPU Architecture

## Authority and render paths

The authoritative signal definition is project-owned **TypeScript mathematics**, not a browser oscillator node, not a GPU-only implementation, and not a Rust/WebAssembly DSP core. The same phase-accumulation, automation, waveform, modulation, noise, and routing semantics are consumed by two independently testable execution paths:

1. **Real-time:** `AudioWorkletProcessor` performs deterministic low-latency synthesis on the browser audio render thread. It never waits on WebGPU dispatch/readback.
2. **Offline/reference:** a chunked TypeScript CPU renderer provides the known-correct reference implementation. WebGPU compute kernels accelerate parallelizable rendering/analysis when available and must match this reference within documented numeric tolerances.

WebGPU is primary acceleration for FFT/DFT analysis, spectrograms, batch transforms, signal verification, waveform reduction, and eligible offline rendering. Adapter/device loss, missing WebGPU, shader failure, unsupported limits, or poor benchmark performance must fall back to the CPU path without changing project semantics.

## Signal invariants

- Store actual left/right frequencies; center+beat is a convenience transform only.
- Binaural mode produces independent ear signals; never inject the difference frequency directly into either pure-tone channel.
- Instantaneous frequency is integrated into phase so automated frequency changes remain phase-continuous unless an explicit reset is authored.
- Starts/stops and discontinuous amplitude edits use short ramps/crossfades.
- Protected binaural routing forbids crossfeed, stereo widening, mono sum, spatialization, or independent automatic normalization.
- Internal sample values use 64-bit JavaScript number math for phase/control/reference rendering; AudioWorklet output is Float32 as required by Web Audio. WebGPU kernels use the best portable precision supported by WGSL (normally f32) and are validated against CPU reference tolerances.
- Headroom-first mixing is authoritative; a safety limiter may protect casual playback but research exports must disclose/avoid nonlinear processing unless explicitly authored.

## Supported generator semantics

Binaural, monaural, isochronic, amplitude-modulated, pure stereo carrier, noise-modulated, and sham/control voices; sine, sine-squared, triangle, square/rectangular, smoothed square, saw, reverse saw, variable pulse, band-limited approximations where selected, custom harmonic recipes, and imported single-cycle waveforms. Parameters include ear/carrier/beat frequency, level, channel trims, phase, duty cycle, fades, loops, repetitions, routing, automation, and modulation links.

## Automation

Automation points support hold, linear, smoothstep, exponential, logarithmic, and cubic Bezier interpolation when valid for the parameter domain. The renderer evaluates automation at sample time for correctness-critical frequency/phase paths. Parameter links apply scale, offset, clamp, invert, range map, smoothing, delay, and quantization deterministically.

## Real-time callback rules

The AudioWorklet callback preallocates steady-state state, performs no network/storage I/O, packaging, codec encoding, DOM access, or GPU synchronization. Commands arrive through the message port as compact immutable snapshots/deltas. The processor handles the host-supplied render quantum length rather than assuming 128 forever.

## WebGPU compute rules

- Feature-detect `navigator.gpu`; request adapters/devices lazily.
- Validate shader compilation through error scopes and compilation info.
- Bound every storage/uniform buffer and dispatch size against adapter limits.
- Handle `device.lost` and recreate/fallback cleanly.
- Never use WebGPU merely for branding; dispatch only when benchmark/cost model says it is beneficial.
- Maintain independent CPU known-answer tests so GPU code never certifies itself.
- Record analysis window, sample rate, transform size, frequency resolution, and tolerance with exported diagnostics.

## Offline rendering

Render in bounded chunks so multi-hour sessions do not require a whole-session Float32 allocation. The reference renderer maintains phase/noise/filter/link state across chunks. WebGPU may generate/transform blocks in parallel but final ordering and state transitions follow the same session clock. One-hour and eight-hour deterministic fixtures verify timing/drift.

## Codec boundary

Codec modules are not the DSP engine. Guaranteed stack: project-owned WAV/AIFF, libFLAC, dr_mp3 decode, isolated LAME MP3 encode, libvorbis/libogg, libopus/libogg, and project-owned TypeScript WebM/EBML. Pinned C codec libraries may be compiled to WebAssembly with Emscripten/LLVM. AAC/M4A is unsupported. **FFmpeg is prohibited everywhere under project control.**

## Analysis

WebGPU FFT/DFT kernels and reduction kernels are the primary interactive analysis path. CPU reference methods include phase regression, Goertzel, autocorrelation/correlation, zero-crossing sanity checks, RMS/peak, stereo correlation, and manifest arithmetic. Arbitrary-file classification returns confidence rather than categorical certainty when music/noise/multiple tones make inference ambiguous.

## Acceptance

Every release must compare AudioWorklet/CPU/WebGPU paths on known signals, automation curves, simultaneous voices, noise spectra, corrupted/crossfed fixtures, sample-rate variants, long renders, and codec round trips. A GPU-specific result that disagrees with the CPU reference beyond tolerance is a release failure.
