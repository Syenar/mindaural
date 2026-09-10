# Binaural Signal Synthesis Protocol

This document is the engineering authority for generating binaural stimuli.

## 1. Fundamental representation

Store the actual left-ear and right-ear instantaneous frequencies:

- `f_left(t)`
- `f_right(t)`

Define displayed beat difference:

`beat_hz(t) = abs(f_right(t) - f_left(t))`

The app may offer a convenience control called **center carrier**, explicitly defined as:

`center_hz(t) = (f_left(t) + f_right(t)) / 2`

When the user edits center `C` and beat `B` in symmetric mode:

`f_left = C - B/2`  
`f_right = C + B/2`

This symmetric representation is an interface convention, not a requirement of binaural-beat science. If a paper or imported preset used 400 Hz left + 410 Hz right, the research/import model preserves 400/410 exactly rather than silently converting to a different pair.

## 2. Pure-tone oscillator

For each channel, render a continuous phase accumulator:

`phase[n+1] = phase[n] + 2*pi*f[n]/sample_rate`

`sample[n] = amplitude[n] * sin(phase[n])`

Wrap phase numerically as needed without resetting audible phase. Use high-precision phase accumulation internally. Exact implementation can use Float64 state even when the audio stream is Float32.

## 3. Frequency automation

Frequency changes must integrate instantaneous frequency continuously. Do **not** calculate each block from absolute time using a control-point-local phase reset. That creates discontinuities/clicks and changes the intended stimulus.

Automation semantics must be deterministic and identical between real-time and offline engines within documented tolerance.

## 4. Starts, stops, discontinuities

Apply short amplitude ramps/crossfades at starts/stops and at user-created hard level cuts unless “hard edge” is explicitly selected for experimental purposes. Ramp duration is configurable; default should be short enough to avoid clicks without materially changing long protocol timing. The exact applied ramp is recorded in the manifest.

## 5. Channel isolation

A classical binaural voice routes left oscillator only to left output and right oscillator only to right output. The protected binaural bus forbids automatic:

- mono downmix
- crossfeed
- stereo widening that mixes channels
- reverb/delay that crosses channels
- per-channel auto normalization
- linked effects that create unintended sum/difference components

Background/music buses may use spatial processing, but their routing remains separate.

## 6. Amplitude

Internally process in floating point with conservative headroom. Store digital amplitude in linear gain and/or dBFS. Do not label a digital value as acoustic dB SPL unless a calibrated playback chain provides the conversion.

Normalize stereo-linked if the user explicitly requests normalization; never normalize L and R independently for a research stimulus because that can alter intended interaural level relationships.

## 7. Waveforms

Research mode defaults to sine. Non-sinusoidal waveforms add harmonics and may produce multiple binaural relationships; the app must display this clearly. If square/triangle/etc. are used, analyzer and manifest record waveform/harmonic behavior.

Band-limit discontinuous waveforms where appropriate to prevent avoidable aliasing, while providing a documented “legacy/exact recipe” mode if compatibility demands a historical implementation.

## 8. Multi-voice sessions

Each voice is generated independently, then summed with explicit gain staging. The engine should estimate worst-case/observed peak and warn before clipping. Do not silently compress a research stimulus to make the mix fit.

## 9. Noise and masking

Noise is an independent signal source. Research presets reproduce whether masking noise was present, its level when reported, spectral type, channel correlation/independence if reported, onset timing, and duration. Do not assume that noise improves efficacy; research findings differ and parameter interactions exist.

## 10. Monaural comparison

Monaural beat mode physically sums both component tones into each output channel. Its acoustic waveform therefore contains amplitude modulation at the difference relationship in a way a pure binaural single-ear channel does not. Keep this signal type distinct in UI, manifests, and analyzer labels.

## 11. Isochronic / amplitude-modulated comparison

These are separate auditory stimulation methods, not synonyms for binaural beats. Store modulation frequency, carrier, waveform/duty cycle, depth, phase, and channel routing explicitly.

## 12. Sample rate

Live engine uses the browser/device AudioContext sample rate and reports it. The application must not claim a portable 192 kHz live mode. Offline custom rendering may create higher sample-rate files only if the renderer/encoder and validation tests support them.

Common exported rates: 44.1 kHz, 48 kHz, 88.2 kHz, 96 kHz. Higher rates are optional advanced export, not core scientific necessity for normal audible binaural carriers.

## 13. File export

Research master: lossless stereo WAV/FLAC plus manifest. Preserve channel ordering and validate after encoding. Lossy codecs are allowed for consumer sharing but are not the reference artifact for reproducibility.

For every render the validator can compare:

- expected vs measured dominant carrier(s)
- expected beat difference
- sample count/duration
- channel order
- peak/clipping
- cross-channel leakage introduced by renderer
- required marker/segment timing

## 14. Research stimulus manifest

At minimum record:

- engine/schema version
- sample rate / bit format
- actual L/R frequency functions or automation points
- displayed center/beat convention
- waveform
- starting phase(s)
- amplitude/envelopes/fades
- voices and routing
- noise/background settings
- segment timing/repetition
- real-time vs offline render path
- encoder/container
- source protocol citation
- hash of rendered master when available

## 15. Verification tolerances

Tolerance values must be chosen by test duration/sample rate and documented in the test suite; avoid a single arbitrary “0.001 Hz accuracy” marketing claim. Long-window FFT estimates, zero-crossing estimates, and phase-regression methods have different resolution. Ground truth is the renderer's deterministic parameter stream plus independent numerical verification.
