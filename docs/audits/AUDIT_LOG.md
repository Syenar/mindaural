# Audit Log

## Audit Pass 1 — Scientific accuracy

**Findings and fixes**

- First draft treated 400 Hz too much like a universal best carrier. Corrected to perceptual/research reference; study-specific parameters take precedence.
- First draft drew a too-clean 0.1–30 / 30–40 / >40 validity ladder. Corrected to approximate/interindividual perceptual guidance and experimental labels, not hard scientific validity thresholds.
- Separated established binaural percept from unsettled global EEG entrainment and still more heterogeneous behavioral/clinical effects.
- Added contradictory evidence, including large 2023 home-use negative findings, rather than selecting only positive studies.
- Added recent 2025 parametric and perioperative evidence with heterogeneity caveats.
- Clarified that symmetric center-carrier construction is a UI convention. Research reproduction preserves exact L/R frequencies from each source.
- Removed any implication that EEG-band membership itself proves a mental-state effect.

**Result:** no critical scientific overclaim remains in master plan.

## Audit Pass 2 — BWGen parity

**Findings and fixes**

- Added context-sensitive help as an explicit parity requirement.
- Added preset ratings/comments/sorting/community functions observed on official BWGen library/index.
- Added AudioStrobe waveform/duty-cycle settings from later 3.1.x history.
- Clarified background phase shift, background interval, background modulation phase, noise modulation, and simultaneous noise+background.
- Corrected attribution: arbitrary custom waveform import, dynamic high voice counts, modern direct codecs, and full modulation matrix are our upgrades, not confirmed BWGen features.
- Removed “left/right inversion” from confirmed parity because it was not established from the official pages reviewed; keep channel swap as our diagnostic feature.
- Added explicit modern equivalent for BWGen's external CD/MIDI coexistence rather than pretending a browser needs old CD-player integration.
- Added legacy `.bwg` conversion report and format-analysis gate so the roadmap does not promise an unverified binary parser.

**Result:** official documented reference concepts have a mapped target or explicit modern equivalent.

## Audit Pass 3 — Browser/audio engineering logic

**Findings and fixes**

- Corrected 192 kHz from a supposed general real-time capability to optional validated offline export; live rate follows `AudioContext.sampleRate` and cross-browser guarantees are lower.
- Reworked codec plan: WebCodecs is opportunistic; AAC support varies, MP3/FLAC native encoding cannot be assumed, and muxing is separate. Added WebAssembly/custom fallbacks.
- Corrected “OGG” terminology to container + Vorbis/Opus codec combinations.
- Replaced impossible “headphones detected” claim with headphone/channel test + user confirmation.
- Clarified browser cannot infer SPL or acoustic channel separation.
- Protected binaural bus from crossfeed/spatialization/per-channel normalization.
- Changed “automatic limiter as core solution” into headroom-first gain staging with safety fallback so research waveforms are not silently reshaped.
- Added bounded/chunked long rendering instead of whole-session memory assumptions.
- Added mobile file picker/share path because HTML drag/drop is desktop-centric.
- Added confidence language to arbitrary-file binaural detection; complex music/noise cannot always be classified exactly from dominant peaks.

**Result:** no known critical browser-feasibility contradiction remains.

## Audit Pass 4 — Product consistency / safety / reproducibility

**Findings and fixes**

- Research presets now store actual source parameters, exposure timing, masking, phase/amplitude when reported, source citation, and calibration metadata instead of adapting studies to app defaults.
- Research master defaults lossless; lossy codecs remain sharing outputs and can be post-encode validated.
- Self-contained project package gains asset hashes, schema/engine versions, provenance, and explicit lineage.
- Added no-silent-data-loss policy for legacy imports.
- Split visual stimulation/AudioStrobe into Labs due display/audio-path timing limitations.
- Added no-autoplay, seizure warning, hearing guidance, and “do not use while driving” safety requirements.
- Reframed “subliminal” support as ordinary spoken-message/audio scheduling without efficacy promises.

**Result:** final plan is internally consistent across science, UX, reference parity, and browser constraints.

## Audit Pass 5 — Licensing and no-deferred-work requirement

**Findings and fixes**

- Locked permissive-first dependency policy; LGPL allowed only for an isolated replaceable codec module with compliance.
- Prohibited FFmpeg project-wide: no bundled binary, WebAssembly build, command-line tooling, export dependency, or validation dependency.
- Locked FLAC to libFLAC (BSD), Opus to libopus/libogg (BSD), Vorbis to libvorbis/libogg (BSD), WAV/AIFF to project-owned PCM writers, and MP3 to isolated LAME (LGPL).
- Removed AAC/M4A export entirely from the packaged product because current AAC patent licensing remains active even though open-source encoder implementations exist. Native browser decoding may be accepted opportunistically for import, but AAC/M4A is not guaranteed or advertised.
- Locked bundled third-party sound assets to CC0; original/procedural assets preferred.
- Converted `.bwg` reverse engineering/import, light-control hardware validation, full soundscape library, license automation, and share/signing features from “later gates” into mandatory first-wave acceptance criteria.
- Resolved the previous regulatory placeholder by defining the first-wave product as non-medical; medical indications are outside the product scope, not deferred functionality.
- Added first-wave package signing so package authenticity/trust is no longer left as a later enhancement.
- Renamed the shipping AudioStrobe-related feature to “Legacy 19.2 kHz Light Control” to avoid depending on proprietary branding/content while still targeting published per-channel compatibility.

**Result:** no known planning item from the previous “remaining gates” section is left deferred. All are either first-wave release requirements or resolved by an explicit scope/licensing decision.


## Audit Pass 6 — Language/codec lock consistency

**Findings and fixes**

- Locked TypeScript/React to UI, browser integration, application/project state, and timeline orchestration.
- Locked Rust compiled to WebAssembly as the authoritative DSP implementation for synthesis, automation, analysis, deterministic offline rendering, and numerical validation.
- Required AudioWorklet to delegate the real-time hot path to the shared Rust/WebAssembly core instead of maintaining a second TypeScript synthesis engine.
- Locked the packaged export stack to WAV, AIFF, FLAC, MP3, Ogg Vorbis, Ogg Opus, and WebM Opus.
- Removed stale generic AAC wording from the audio-engine specification. AAC/M4A remains outside the packaged codec stack; only opportunistic browser-native import decoding may occur.
- Strengthened the FFmpeg prohibition to include executables, libraries, WebAssembly, build scripts, conversion/export helpers, and validation/test dependencies.
- Changed remaining `.bwg` wording from “desirable” to explicit mandatory first-wave language.

**Result:** master plan, architecture documents, licensing policy, project state, and validation checks now describe the same language, codec, AAC/M4A, FFmpeg, and no-deferred-work decisions.


## Audit Pass 7 — deep build-readiness / hidden-dependency review

**Findings and fixes**

- Found cloud share/community features without an implementation architecture. Locked Supabase and added schema, Row Level Security, immutable-version sharing, moderation, asset-rights, deletion/export, rate-limit and security acceptance rules.
- Found guaranteed MP3 import without a bundled fallback decoder. Locked `dr_mp3` under MIT-0 for decoding while retaining isolated LAME for encoding.
- Found WebM/Opus muxing described only as “separately audited.” Replaced that placeholder with a project-owned Rust audio-only WebM/EBML muxer/demuxer and conformance/round-trip tests.
- Found Playwright in the test stack despite the absolute no-FFmpeg rule. Replaced Playwright with WebdriverIO/WebDriver BiDi and prohibited video/FFmpeg plugins.
- Removed duplicate JavaScript `fft.js` analyzer path; locked RustFFT so analysis remains in the Rust DSP core while release validation uses independent known-answer methods.
- Locked Emscripten/LLVM and full source/hash/build/SBOM provenance for C codec WebAssembly modules.
- Locked Lucide icons and system fonts, explicitly excluding proprietary Google Sans/assets while preserving the modern design direction.
- Replaced “subjective scales where licensing permits” with project-authored non-proprietary self-report controls.
- Fixed stale `.bwg` “feasibility gate” wording; importer is mandatory first wave.
- Made the bundled soundscape requirement measurable: at least 24 production-ready project-created/procedural or CC0 sounds with hashes/provenance.
- Fully specified Ed25519 signing key lifecycle and verification states instead of leaving signing as an underspecified checkbox.
- Added hostile-file/package security, community copyright/publication rules, and local-only research-data privacy.
- Expanded the session JSON Schema from a permissive planning stub into a versioned build-oriented model covering voices, automation, segments, assets, evidence and provenance.
- Updated local science cache with the 2026 theta-specific systematic review/meta-analysis (PMID 42349368), which reinforces low-certainty/protocol-specific outcome labeling.

**Result:** all discovered first-wave architecture/licensing/security/science placeholders were converted into locked implementations or measurable acceptance criteria.


## Audit Pass 8 — parity and standards edge-case review

**Findings and fixes**

- Closed the remaining legacy exchange asymmetry: first wave now includes `.bwg` compatible-subset **export** as well as import. Export is lossless-or-refuse and can package required legacy WAV companions; round-trip through the reference app is an acceptance test.
- Replaced the unregistered `application/vnd...` `.bbeat` MIME claim with a private `application/x-bbeat+zip` hint plus `application/zip` fallback until formal registration exists.
- Made BWGen built-in preset superiority measurable: at least 30 first-party curated/research presets, covering primary generator and automation patterns, versus the reference app's documented 20+ built-ins.
- Locked physical 19.2 kHz compatibility hardware: MindPlace Kasina primary; MindPlace Limina secondary mandatory. Manufacturer documentation currently lists both as AudioStrobe decoders and describes AudioStrobe as one 19.2 kHz signal per audio channel.
- Tightened public community media rules to uploader-owned or CC0 only in first release, removing an open-ended third-party-license approval path.
- Clarified that development-only WebDriver/browser drivers may use other OSI-approved commercial-use licenses without becoming distributed application dependencies.

**Result:** no remaining reference-parity exchange gap, custom-media-type standards overclaim, preset-count ambiguity, hardware-target ambiguity, or public-media-license placeholder remains.


## Audit Pass 9 — final cross-document and machine validation

**Checks performed**

- Re-ran the strengthened planning baseline validator across required files, relative links, science overclaim guards, BWGen parity concepts, dependency locks, AAC/M4A exclusion, FFmpeg prohibition, backend/security requirements, asset/preset counts, first-wave numbering, session-schema completeness, and exact manifest hashes.
- Validated `schemas/session.schema.json` as JSON Schema Draft 2020-12.
- Validated a representative minimum binaural-session instance against that schema.
- Re-scanned authoritative documents for stale Playwright/fft.js selections, unspecified WebM muxing, `.bwg` feasibility language, research-scale licensing placeholders, unregistered vendor MIME claims, and conditional physical-device validation.

**Result:** 0 planning-validator failures; representative schema instance passes; no unresolved critical/high-severity planning contradiction remains.


## Audit Pass 10 — WebGPU architecture reconciliation

**Findings and fixes**

- User replaced the Rust/WebAssembly DSP architecture with WebGPU acceleration.
- Locked shared project-owned TypeScript signal mathematics as the semantic authority.
- Locked AudioWorklet as the real-time execution path; GPU dispatch/readback is forbidden in the audio callback.
- Locked WebGPU as primary acceleration for parallelizable analysis, spectrogram/FFT/DFT work, verification, waveform reduction, and eligible offline rendering.
- Added a complete TypeScript CPU reference/fallback and mandatory cross-path conformance tests so WebGPU absence/device loss cannot break core playback or change signal semantics.
- Retained WebAssembly only as an isolated implementation mechanism for approved third-party codec libraries where required; it is no longer the DSP architecture.
- Replaced RustFFT with project-owned WGSL transform/reduction kernels plus independent CPU known-answer methods.
- Replaced Rust WebM/EBML code with project-owned TypeScript.
- Replaced Rust `ed25519-dalek` package signing dependency with browser Web Crypto Ed25519.

**Result:** authoritative documentation now reflects React/TypeScript + AudioWorklet + WebGPU with CPU fallback; no Rust/WebAssembly DSP requirement remains.


## Audit Pass — 2026-09-10 hardware-scope correction

- Removed MindPlace Kasina and Limina physical decoder testing from the release gate by explicit product-owner instruction.
- Legacy 19.2 kHz Light Control remains a first-release feature and must pass deterministic software validation for carrier frequency, envelope, duty cycle, phase, channel mapping, lossless export and round-trip integrity.
- Browser hardware bridges remain capability-gated, but no named third-party physical decoder is required for release.
