# Mindaural — Project Workspace

Working title for a browser-based binaural/audio-stimulation creation and analysis application inspired by BrainWave Generator (BWGen), but redesigned around modern web audio, scientific reproducibility, clear evidence labeling, local-first privacy, and a substantially easier interface.

## Current status

Planning/research/licensing baseline complete and build-ready. The product plan has been audited against the official BWGen feature pages, FAQ, version 3.1 feature list, preset library structure, peer-reviewed binaural-beat literature through September 2026, browser codec constraints, and commercial-use open-source licensing.

Production implementation is active under `src/`, with the browser application, signal engine, analysis, formats, persistence, cloud schema, security, research tools, and release gauntlets built in-place. All product features in the master plan are part of one first-wave build; there is no deferred feature phase.


## Locked implementation stack

- **TypeScript + React:** browser user interface, timeline/project orchestration, accessibility, browser APIs, and application state.
- **TypeScript + AudioWorklet:** authoritative real-time synthesis, modulation/automation evaluation, protected stereo routing, and CPU fallback.
- **WebGPU:** primary acceleration for parallelizable offline rendering, spectral analysis, spectrograms, verification, and batch DSP; WebGPU is never required for basic playback.
- **Packaged exports:** WAV, AIFF, FLAC, MP3, Ogg Vorbis, Ogg Opus, and WebM Opus.
- **Packaged decode/encode details:** project PCM + WebM/EBML code, libFLAC, dr_mp3 decode, LAME encode, libvorbis/libogg, libopus/libogg.
- **Cloud/community:** Supabase, optional for local use but complete in first wave for hosted sharing/community.
- **Tests:** Vitest + WebdriverIO/WebDriver BiDi; Playwright is excluded.
- **Excluded:** no AAC/M4A import/export support and **no FFmpeg anywhere** in runtime, build/browser-test tooling, or validation.

## Start here

- `docs/00_MASTER_PLAN.md` — authoritative product plan.
- `docs/science/SCIENCE_FOUNDATION.md` — what binaural beats are, what is established, and what remains uncertain.
- `docs/science/SYNTHESIS_PROTOCOL.md` — exact audio-generation rules the engine must follow.
- `docs/science/EVIDENCE_MATRIX.md` — evidence-strength and product-claim rules.
- `docs/reference/BWGEN_FEATURE_AUDIT.md` — reference-app feature parity audit.
- `docs/architecture/AUDIO_ENGINE_SPEC.md` — real-time/offline audio architecture and invariants.
- `docs/architecture/WEB_PLATFORM_ARCHITECTURE.md` — browser/PWA architecture and platform constraints.
- `docs/architecture/CLOUD_BACKEND_AND_SECURITY.md` — Supabase share/community model, authorization, upload/package security, moderation, and signing identity.
- `docs/audits/AUDIT_LOG.md` — corrections made over repeated review passes.
- `docs/audits/CLEAN_PASS_CHECKLIST.md` — final clean-pass result.
- `docs/legal/LICENSING_STRATEGY.md` — locked commercial-use open-source dependency/codec/asset policy.

## Product principle

The application must be able to generate the requested acoustic stimulus exactly, preserve separate left/right channels, document every parameter needed for reproducibility, and distinguish the established binaural percept from the much less settled claims about cognitive, emotional, sleep, therapeutic, or altered-state outcomes.

## Source policy

The repository contains original summaries, extracted facts, study metadata, and links/DOIs—not copied journal articles. This gives future development work a local scientific reference without repeatedly researching basic facts online, while preserving the ability to verify against primary sources when necessary.
