# Master Product Plan

## 1. Product definition

Mindaural is a browser-based audio-stimulation workstation for listening, creating, editing, analyzing, validating, importing, exporting, reproducing research protocols, and sharing binaural-beat and related auditory-stimulation sessions.

It takes the compositional depth of BrainWave Generator (BWGen)—multi-voice presets, programmable parameters, segments, backgrounds, noise, modulation, live preview, preset exchange, visual stimulation—and rebuilds that model as a modern local-first web application with a simple beginner layer and a full studio layer.

The product does **not** assume that selecting an electroencephalography (EEG) band causes the corresponding mental state. The perceptual phenomenon and stimulus generation are well enough characterized to engineer accurately; brain entrainment and behavioral/clinical outcomes remain heterogeneous and must be represented with evidence labels.

## 2. Primary product surfaces

### Listen
Fast playback of personal, curated, research, and community sessions. Shows duration, actual ear frequencies/beat profile, background layers, evidence label, headphone guidance, source/provenance, and one obvious Play/Pause control.

### Create
A guided creator for people who do not want a workstation. Users choose duration, stimulus type, beat profile, carrier/ear frequencies, soundscape/noise, fades, and save/export. Purpose labels such as Relaxation or Focus are treated as goals/design intents, not guaranteed physiological outcomes.

### Studio
Full timeline workstation with tracks, voices, clips, segments, automation lanes, modulation/parameter links, mixer routing, analyzer, undo/redo, copy/paste, reusable components, markers, looping, and exact numeric editing.

### Library
Four clearly separated collections: Research Protocols, Curated Sessions, Community Sessions, and My Library. Supports search, tags, ratings/reviews, forks/remixes, versions, favorites, downloads, reporting/moderation, and evidence/provenance filters.

### Analyzer
Inspects generated or imported stereo audio. Provides waveform, spectrum, spectrogram, left/right carrier candidates, channel-difference estimates, stereo correlation, peak/RMS statistics, clipping, phase/cross-channel diagnostics, and “is this consistent with a binaural-pair signal?” assistance. Analysis results are probabilistic for arbitrary mixed music/noise and must not overclaim certainty.

### Learn
Local science guide covering the binaural percept, auditory pathway, stimulus construction, carrier/difference constraints, EEG-band terminology, research uncertainty, outcome evidence, safety, and reproducibility. Links every research-based preset to its source protocol.

### Labs
Visual flicker, Legacy 19.2 kHz Light Control export/hardware compatibility, Web MIDI/Serial/Bluetooth integrations where supported, research utilities, and browser/hardware diagnostic tools. Labs is a first-wave product surface, not a post-release phase.

## 3. Simple mode

Goal: a first-time user can create a valid stereo binaural session without understanding a digital audio workstation.

Flow: choose stimulus → choose duration → choose exact beat/carrier or research/curated template → choose pure tone/noise/soundscape → headphone/channel check → Play/Create.

Advanced settings are never removed; they are progressively disclosed through “Advanced” and “Open in Studio.”

## 4. Studio data model and features

A project contains metadata, assets, stimulus tracks, audio tracks, noise tracks, automation, segments/scenes, markers, routing, export settings, evidence/provenance metadata, and revision history.

A stimulus voice supports binaural, monaural, isochronic, amplitude-modulated, pure stereo carrier, noise-modulated, and explicit sham/control modes. Each has duration, left/right frequency or center+beat convenience controls, amplitude, channel levels, starting phase, waveform, fade, loop/repetition, mute/solo, routing, automation, and modulation sources.

Automation supports numeric points, direct graph manipulation, exact table entry, linear/hold/smoothed/exponential/logarithmic/Bezier transitions where mathematically sensible, copy/paste, snapping, scaling, and reusable envelopes. Frequency automation integrates instantaneous frequency so phase remains continuous rather than restarting the oscillator at control points.

Segments/scenes can own parameters, contain multiple tracks, repeat, loop, reorder, duplicate, crossfade, and be saved as reusable templates. Playlists sequence complete sessions.

Parameter linking/modulation supports scale, offset, clamp, invert, range mapping, smoothing, delay, and quantization. This is an upgrade over BWGen's generic parameter-tracking behavior.

## 5. Waveforms

Reference-parity waveforms explicitly evidenced by BWGen documentation: sine, sine-squared, triangle, rectangular/square, and smoothed rectangular, plus waveform-as-a-programmable parameter in BWGen 3.1.

Our additions: saw/reverse saw, variable pulse, band-limited variants, custom harmonic recipe, and imported single-cycle waveform. Pure sine remains the default for research-oriented binaural stimuli because it minimizes unintended spectral components.

## 6. Noise and backgrounds

Built-in noise: white, pink, brown plus a continuously variable spectral-slope control and optional filtered variants. BWGen's programmable white-to-brown “smoothness” behavior must be reproducible in an equivalent modern control.

Background tracks support multiple simultaneous imported or bundled sounds, trim, loop, fade, level, pan, stereo width, equalization/filtering, automation, interval triggering, left/right phase/time offset where meaningful, and modulation. Unlike BWGen, the session is not restricted to one external WAV background.

Binaural stimulus routing and background spatial effects are separate. A background may be widened or spatialized; that must never silently crossfeed the discrete binaural carriers.

## 7. Import and drag-and-drop

Desktop: the application shell, library, and timeline are drop targets. Dropped audio becomes an asset or timeline clip according to drop location; multiple files are accepted. Project/preset packages can be dropped to open/import.

Mobile/touch: equivalent file picker, operating-system Share-to-app path where available, and explicit Import controls. Desktop HTML drag-and-drop is not treated as the sole import mechanism.

Guaranteed import targets include WAV, FLAC, MP3, AIFF, Ogg/Vorbis, Ogg/Opus, and WebM/Opus through native or bundled free/open-source decoders. AAC/M4A is excluded from the supported codec matrix. The application ships no AAC encoder or decoder and intentionally provides no browser-native AAC/M4A fallback.

## 8. Export

Lossless targets: WAV PCM 16/24/32, WAV float32, FLAC, AIFF PCM.  
Guaranteed lossy targets: MP3, Opus in Ogg/WebM, and Vorbis in Ogg. AAC/M4A export is not included in the product and no AAC encoder is packaged or invoked.

The UI distinguishes **container** from **codec**; “Ogg” is not itself treated as an audio codec.

Export scopes: full session, selection, stems, stimulus-only, background-only, each voice, diagnostic left/right files, and portable project package.

Research export defaults to lossless stereo plus a stimulus manifest. Lossy export remains convenient for casual listening/sharing but the app does not assert that every encoder/stereo mode is scientifically transparent. Optional post-encode validation can re-analyze the encoded file.

## 9. Portable project package

A versioned `.bbeat` package is ZIP-based and self-contained when licensing permits:

- `manifest.json`
- `session.json`
- `assets/`
- `waveforms/`
- `provenance.json`
- cryptographic hashes for packaged assets

The package records schema version, engine version, actual ear frequencies, carrier convention, amplitudes, phases, sample rate/render policy, automation, routing, source citations, derivative lineage, asset hashes, and per-asset license/provenance metadata.

A compact recipe-only JSON export is available when assets are not embedded. First-wave packages can be cryptographically signed with Ed25519 (`Web Crypto Ed25519`, BSD-3-Clause). Private signing seeds remain local and are passphrase-encrypted at rest; public keys may be bound to verified cloud accounts. The importer distinguishes unsigned, valid-unbound, valid-account-bound, invalid, and modified packages. A signature proves key control, not legal identity by itself.

## 10. Presets and research reproducibility

Research Protocol presets store the *actual parameters used by the study*, not normalized app defaults. If a paper used 380/420 Hz, the preset uses 380/420 Hz—not “center 400, beat 40” merely as a display transform. It also stores exposure timing, duration, masking/noise, amplitude information available from the paper, task relation, sample rate, calibration information, control condition, participant/protocol notes, and citation.

The first release bundles **at least 30 first-party presets** across curated listening designs and exact research-protocol reproductions where the source reports enough parameters for reproducibility. The set must exercise all primary generator types and major automation/segment patterns rather than inflate the count with trivial duplicates. Curated presets are authored by the product team and use goal-oriented language. Community presets may contain subjective claims but are clearly labeled as unverified and cannot display an “evidence-backed” badge without matching a cited protocol/review.

Preset comparison can compare signal type, beat/ear frequencies, carrier convention, duration, voices, soundscape, automation, evidence level, and provenance. Components can be copied directly between sessions.

## 11. Evidence labels

Recommended states: Established Percept, Neural Response Observed, Promising Outcome Evidence, Mixed Evidence, Limited Evidence, Experimental, Community Claim. Labels apply to **a claim/protocol**, not globally to a frequency. A 10 Hz tone does not receive a universal “relaxation proven” tag.

## 12. Research mode

Supports A/B/control condition construction, randomized condition order, blind labels, project-authored neutral pre/post self-report sliders, simple behavioral-task hooks, notes, session event logs, exact stimulus manifests, and CSV/JSON export. The bundled self-report questions are deliberately non-proprietary and are not presented as validated clinical scales; users may import their own research instruments when they have rights/approval to use them.

Research mode is for protocol construction and exploratory data collection; it is not marketed as a regulated diagnostic/medical device. Serious human-subject research still requires appropriate institutional/ethical procedures.

## 13. Analyzer / Verify My File

For clean tone stimuli, the analyzer should accurately estimate dominant left/right carriers and differences. For complex music/noise mixes, it reports confidence and candidates rather than a binary guarantee.

It checks stereo/mono status, channel uniqueness, dominant spectral peaks, beat-pair candidates, interchannel leakage/correlation, clipping, DC offset, sample rate, duration, and optionally compares an export against its source stimulus manifest.

A “scientific integrity check” fails if a purported binaural research render has been mono-summed, channels swapped unexpectedly relative to the manifest, clipped, or had carrier/beat errors beyond configured tolerances.

## 14. Headphone and output setup

First-run test: left-only cue, right-only cue, alternating channel identification, center cue, optional carrier audibility sweep, comfortable-level guidance, and user confirmation that headphones/earbuds are being used.

The browser cannot reliably detect that the user is wearing headphones, measure acoustic channel separation at the eardrum, or infer physical sound-pressure level from digital volume. Therefore the UI says “Headphone/channel test completed” rather than “Headphones detected.”

Warn that operating-system/device spatial audio, “3D” enhancement, mono accessibility mode, crossfeed, certain hearing-processing features, and other processing can alter left/right isolation. Provide a diagnostic stem test and explain how to disable processing when reproducibility matters.

## 15. Safety

Keep default digital output conservative with headroom and fades. Never translate a software slider directly into dB SPL without calibrated hardware. Include hearing-safety guidance, “do not use while driving/operating hazardous equipment” for sleep/relaxation sessions, photosensitive-seizure warning before visual flicker, and claim moderation for health-related community content.

A limiter may exist as a last-resort anti-overload protection, but the engine should first prevent clipping through gain staging. Research renders can bypass creative/master processing while retaining a hard safety ceiling in live monitoring. Stereo-linked processing must not alter relative left/right stimulus parameters unpredictably.

## 16. Visual stimulation and AudioStrobe

BWGen parity requires full-screen/window color flashing and legacy 19.2 kHz per-channel light-control compatibility, including waveform/duty-cycle controls documented in the BWGen 3.1-era feature set. This compatibility engine and deterministic software validation are first-wave release requirements; physical third-party decoder validation is not a release requirement.

Our implementation places these under Labs. Browser display refresh rates, background throttling, display response, and operating-system compositing prevent a claim of laboratory-timing precision. The visual module measures/observes refresh timing where possible and limits/quantizes requested flicker to realizable patterns, with explicit warnings.

Legacy AudioStrobe uses a high-frequency control carrier around 19.2 kHz in compatible systems. Because resampling, lossy encoding, wireless paths, hardware filters, and DAC behavior can alter such a signal, AudioStrobe is an export/compatibility workflow with spectrum validation rather than a guaranteed browser-playback feature.

## 17. BWGen compatibility

The product must reach functional parity with all documented reference-app concepts in `docs/reference/BWGEN_FEATURE_AUDIT.md`, except obsolete transport mechanisms where a modern equivalent is explicitly documented.

`.bwg` import **and legacy-compatible export** are mandatory first-wave requirements. Import is not production-complete until the format and mapped parameters are validated against representative real files/reference behavior. Export writes `.bwg` only when the selected project can be represented without silent semantic loss; otherwise it refuses the legacy export and shows the exact incompatible features. Where BWGen requires external WAV backgrounds, a Legacy BWGen export package can include the `.bwg` plus compatible companion WAV assets and an extraction/readme manifest.

## 18. User experience

Design target: a restrained, highly legible modern productivity interface influenced by Google's strongest editing products rather than an imitation of old audio software.

Principles: one obvious primary action; progressive disclosure; direct manipulation; side inspector rather than modal-dialog chains; meaningful empty states; touch-sized controls; keyboard access; strong focus states; no decorative knobs when a slider/field/graph communicates better; responsive desktop/tablet/phone layouts; dark and light themes; accessibility including reduced-motion behavior and screen-reader labels.

Desktop: Library | Timeline/Canvas | Inspector.  
Phone: Listen | Create | Library | Files, with Studio as a focused full-screen editor.

## 19. Local-first/offline/privacy

Core synthesis, playback, editing, analysis, project storage, and rendering work client-side. IndexedDB and/or Origin Private File System store large local project data; a service worker provides offline application assets. First-wave sharing includes portable files plus an account-backed **Supabase** cloud/community layer. Supabase stores immutable shared versions, account/public metadata, reviews/favorites/moderation, and private/public assets under Row Level Security; local-only use remains fully functional without an account. Research participant/event data stays local/export-only by default. See `docs/architecture/CLOUD_BACKEND_AND_SECURITY.md`.

No microphone permission is needed for normal creation. First-wave calibration includes deterministic digital channel tests and user confirmation; it does not pretend to measure physical sound-pressure level or headphone acoustics without external calibrated hardware.

## 20. Technical architecture

- TypeScript + React for UI, timeline orchestration, project/state management, browser integration, and accessibility.
- One shared TypeScript signal-math specification defines oscillator phase accumulation, automation interpolation, modulation, routing, noise generation, and deterministic reference rendering.
- Web Audio API for device graph/output.
- AudioWorklet owns the deterministic low-latency real-time synthesis path off the UI thread and implements the shared signal specification without GPU round trips in the audio callback.
- WebGPU is the primary accelerator for parallelizable DSP: spectral analysis, spectrogram generation, FFT/DFT-style transforms, large offline calculations, signal verification, visualization buffers, and batch rendering workloads that benchmark faster on the active adapter.
- A TypeScript CPU reference/fallback implements every correctness-critical WebGPU operation. WebGPU is feature-detected; core playback, editing, analysis, and export remain functional when WebGPU is unavailable or a device is lost. Cross-path known-answer tests enforce numerical equivalence within documented tolerances.
- Codec modules are isolated from DSP architecture. Pinned libFLAC, dr_mp3, libopus/libogg, libvorbis/libogg, and LAME may be compiled to WebAssembly with Emscripten/LLVM solely for codec encode/decode where a browser-native equivalent cannot provide the guaranteed format. No Rust runtime or Rust/WebAssembly DSP core is used.
- Project-owned TypeScript implements WAV/AIFF readers/writers and audio-only WebM/EBML mux/demux.
- Custom chunked offline renderer for long renders and deterministic test output; WebGPU acceleration is used when beneficial and validated, with CPU fallback. `OfflineAudioContext` may be used only where its behavior meets validation requirements.
- WebCodecs may accelerate supported non-AAC paths, especially Opus, but guaranteed format support does not depend solely on browser codec availability. AAC/M4A import/export remains omitted.
- Canvas plus WebGPU render waveform/spectrogram views, with Canvas/CPU fallback.
- IndexedDB/Origin Private File System for local projects/assets.
- Service worker/PWA install/offline shell.
- Supabase/supabase-js for account-backed sync/share/community functionality; private-by-default Row Level Security and Storage policies are release-gated.
- WebdriverIO/WebDriver BiDi for browser end-to-end tests; Playwright and video-recording plugins are excluded to preserve the project-wide no-FFmpeg rule.
- Lucide icons (ISC) and system UI fonts; no bundled Google Sans/proprietary Google visual assets.
- Capability matrix at runtime; graceful fallbacks rather than browser-name assumptions.

The engine follows the actual `AudioContext.sampleRate`; 192 kHz real-time playback is not a portable browser guarantee. Project-owned offline rendering may produce higher-rate files only when independently validated. WebGPU precision, workgroup size, buffer limits, adapter availability, and device-loss behavior are treated as runtime capabilities rather than assumptions.

## 20A. Cloud/community and untrusted-file security

Hosted sharing/community is not an unspecified future service. First wave uses Supabase with immutable project-version publication, high-entropy share tokens, revocation/expiration, private-by-default Storage, Row Level Security, verified-email publishing, moderation/reporting, and account export/deletion. Public community media must have redistributable rights/provenance; commercial copyrighted imports cannot silently be published.

All `.bbeat`, `.bwg`, and audio imports are hostile input: verify magic/structure; cap sizes/counts/compression ratios; block path traversal/symlinks; sanitize text; run complex parsing/decoding in bounded workers; fuzz parsers. The server does not execute or transcode uploaded media. Full requirements are in `docs/architecture/CLOUD_BACKEND_AND_SECURITY.md`.

## 21. Audio correctness invariants

1. Binaural mode produces separate ear signals; there is no beat-frequency component intentionally inserted into either pure-tone channel.
2. The displayed beat is `abs(fR - fL)` and the UI always exposes/stores `fL` and `fR`.
3. “Center carrier” is explicitly defined as `(fL + fR)/2` in our convenience mode; imported/research protocols are not forced to use this convention.
4. Frequency automation is phase-continuous unless the user deliberately inserts a phase reset.
5. Starts/stops/discontinuous amplitude edits use short ramps/crossfades to avoid clicks.
6. Stereo channels are never independently normalized by default.
7. Any effect capable of cross-channel mixing is forbidden on the protected binaural bus unless the user deliberately enters an experimental routing mode.
8. Live output may be resampled by the browser/device; exact reproducibility is judged from deterministic exported audio plus manifest, not assumed from unknown hardware.
9. Scientific presets never fabricate physical SPL from digital amplitude.
10. Export validation compares generated channel spectra/frequencies/timing against the project manifest.

## 22. Validation gauntlet

Unit and numerical tests cover oscillator accuracy, long-run phase drift, automation interpolation, amplitude ramps, channel isolation, segment repetition, loops, modulation, noise spectral shape, background timing, channel swap, sample-rate handling, codec round trips, package hashes, and parser/schema migrations.

Reference signals include low-frequency and high-frequency carriers; differences across conventional and experimental ranges; 7.83-like fractional differences without implying special biological efficacy; 10, 16, 20, 30, 40 Hz examples; slowly varying beat curves; simultaneous voices; one-hour/eight-hour deterministic renders; and intentionally corrupted mono/clipped/crossfed files that the analyzer must flag.

Browser/device tests cover Chrome/Edge/Firefox/Safari, desktop/mobile where feasible, touch import, file picker, drag/drop desktop, offline startup, background/suspension behavior, memory limits, and interrupted rendering.

## 22A. Licensing and dependency policy

The first-wave build follows `docs/legal/LICENSING_STRATEGY.md` and `docs/architecture/CLOUD_BACKEND_AND_SECURITY.md`. Production dependencies must permit commercial use. MIT/BSD/Apache/ISC/Zlib/CC0 are preferred; LGPL is allowed only for an isolated replaceable codec module with full compliance. GPL/AGPL, non-commercial, field-of-use/source-available, and patent-license-required bundled components are prohibited. FFmpeg is prohibited throughout the shipped application, build tooling, export pipeline, and validation path. The locked packaged codec stack is project-owned PCM readers/writers + libFLAC + dr_mp3 decode + isolated LAME MP3 encode + libopus/libogg + libvorbis/libogg + a project-owned TypeScript WebM/EBML audio muxer/demuxer. AAC/M4A import/export is excluded. Third-party bundled audio is CC0 only.

## 23. First-wave build — no deferred feature phases

There is one implementation wave. The numbered order below is dependency order only; **every item must be complete before the first public release**. Nothing listed in this master plan is intentionally postponed to a later feature wave.

1. Signal mathematics + deterministic offline renderer + validation harness.
2. Protected stereo routing + AudioWorklet real-time engine.
3. Locked license inventory, third-party notices, automated license allowlist, codec-source provenance, and asset-license records.
4. Project schema, versioning, SHA-256 asset hashing, Ed25519 package signing/verification, local storage, migrations, and recovery.
5. Core Studio: timeline, voices/tracks, automation, segments, mixer, undo/redo, copy/paste, playlists, parameter links, context-sensitive help.
6. Background/noise system plus **at least 24** production-ready bundled soundscapes made only from original/procedural or CC0 assets (rain, storm, ocean, river, forest, wind, fireplace, fan, aircraft cabin, café/room ambience, and complementary variants); every asset gets provenance metadata and hashes.
7. Import/drag-drop for the guaranteed format set; AAC/M4A is unsupported and receives no codec implementation or native-decoder fallback.
8. Full packaged export stack: WAV, AIFF, FLAC, MP3, Ogg Vorbis, Ogg Opus, and WebM Opus; round-trip signal verification for every enabled encoder. AAC/M4A import/export is intentionally absent.
9. Portable `.bbeat` packages, recipe JSON, stems, research manifests, local Ed25519 key/signature lifecycle, and package verification states.
10. Supabase cloud/community backend completed: accounts, Row Level Security, private storage, immutable shared versions, expiring/revocable share links, public publishing, ratings/reviews/favorites, moderation/reporting, asset-rights enforcement, data export/deletion, and security/rate-limit tests.
11. Simple Create/Listen experience and headphone/channel wizard.
12. Analyzer, “Verify My File,” confidence scoring, manifest comparison, and corrupted/crossfed test corpus.
13. Research, curated, community, and personal libraries; **30+ first-party curated/research presets**; ratings/reviews, remix/version lineage, evidence/provenance model, moderation/reporting.
14. Responsive desktop/tablet/mobile UI, accessibility, installable Progressive Web App, offline storage/rendering, and touch/share-target import.
15. Clean-room BWGen `.bwg` importer **and compatible-subset exporter** completed against a representative corpus with field mapping, fuzzing, conversion reports, no-silent-data-loss tests, and companion-WAV packaging where legacy sessions require external backgrounds.
16. Labs completed: visual stimulation with safety interlock; Legacy 19.2 kHz Light Control authoring/export; waveform, duty-cycle, phase and amplitude controls; Web MIDI/Serial/Bluetooth bridges where supported; deterministic software validation of the 19.2 kHz carrier, envelope, duty cycle, phase, channel mapping, lossless export and browser capability states; physical third-party decoder validation is not a release requirement.
17. Full cross-browser, long-render, signal-integrity, codec, legacy-import, light-control software compatibility, offline, security, license, and accessibility gauntlets.

No medical-treatment claims are part of this release. That boundary is a locked product decision, so a future medical-device review is not an unfinished first-wave task.

## 24. Release definition

Version 1 is finished only when **all first-wave items above pass**. A user must be able to create a custom binaural stimulus on desktop or mobile; enter exact L/R frequencies or center+beat; automate frequency/level; add multiple voices/noise/imported audio; use segments/repetition; drag/drop on desktop and import on touch; save/reopen non-destructively; export the complete guaranteed commercially approved format set; package/sign/share a self-contained project; analyze another stereo file; import representative legacy BWGen `.bwg` sessions with an explicit conversion report and export legacy-compatible sessions without silent semantic loss; use the visual/19.2 kHz light-control tools under the required safety interlock; understand the evidence label for any stated outcome; run locally/offline; use the bundled provenance-clean soundscape library; and pass the documented numerical, cross-browser, licensing, accessibility, codec, and light-control software compatibility gauntlets.
