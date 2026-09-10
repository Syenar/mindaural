# Project State

**Project:** Mindaural (working title)  
**State:** Build-ready first-wave specification — deep clean pass  
**Last research/licensing pass:** 2026-09-10  
**Reference application:** BrainWave Generator 3.x / BWGen.com

## Decisions locked for implementation

1. Browser-first installable Progressive Web App; core synthesis/editing/analysis/rendering works locally/offline and without an account.
2. TypeScript + React owns UI/application orchestration. A shared TypeScript signal-math specification drives AudioWorklet real-time synthesis and the CPU reference renderer; WebGPU is the primary accelerator for parallelizable offline DSP/analysis and must conform numerically to the CPU reference path.
3. Classical binaural tones remain discrete left/right signals; no hidden crossfeed, widening, spatialization, mono summing or per-channel normalization on the protected binaural bus.
4. Store actual left/right ear frequencies. Center-carrier + beat is a convenience transform; research protocols preserve exact published pairs.
5. 400 Hz is a perceptual/research reference, not a universal efficacy setting; ~1–30 Hz is conventional perceptual guidance rather than a hard validity boundary.
6. Research/psychological claims are evidence-graded; community claims never become validated effects from EEG-band labels alone.
7. Research exports default to lossless stereo WAV/FLAC plus machine-readable stimulus manifest.
8. Browsers cannot certify physical headphones, sound-pressure level or bit-perfect hardware output; the app uses channel tests, metadata and user confirmation.
9. **All planned features are first-wave release requirements. There is no Phase 2/deferred-feature list.**
10. Legacy `.bwg` import and compatible-subset export are mandatory using clean-room parsing/writing, representative corpus, fuzzing, field mapping, conversion/compatibility reports and lossless-or-refuse semantics.
11. Visual stimulation and Legacy 19.2 kHz Light Control are safety-isolated Labs features. Release validation covers deterministic software generation, spectral/envelope/duty-cycle/phase analysis, lossless export, and browser capability states; physical third-party decoder validation is outside this product requirement. Direct MIDI/Serial/Bluetooth control is capability-gated by browser support; lossless light-control export/validation is always available.
12. Distributed dependencies must be free/open-source and commercially usable. Permissive licenses are preferred; LGPL is allowed only for isolated LAME MP3. GPL/AGPL/NonCommercial/source-available/paid-patent bundled dependencies are prohibited.
13. Guaranteed packaged audio stack: WAV, AIFF, FLAC, MP3, Ogg Vorbis, Ogg Opus, WebM Opus. AAC/M4A import/export is excluded; no native-decoder fallback is intentionally used.
14. Codec lock: project-owned WAV/AIFF + WebM/EBML container code; libFLAC; dr_mp3 under MIT-0 for MP3 decode; isolated LAME for MP3 encode; libopus/libogg; libvorbis/libogg.
15. **FFmpeg is prohibited everywhere under project control**, including runtime, WebAssembly, build scripts/tooling, browser-test dependencies, CI/validation and conversion/export helpers; the project does not rely on or intentionally invoke it. Playwright is therefore excluded; browser E2E uses WebdriverIO/WebDriver BiDi without video/FFmpeg plugins.
16. C codec libraries may be compiled from pinned sources to WebAssembly with Emscripten/LLVM strictly for codec encode/decode modules; codec WebAssembly is isolated from the TypeScript/WebGPU DSP architecture. Hashes, patches, build recipes, license texts, SBOM and third-party notices are release artifacts.
17. WebGPU FFT/DFT kernels are the primary analyzer implementation with an independent TypeScript CPU reference/fallback. Lucide (ISC) supplies icons; UI uses system fonts and does not bundle Google Sans/proprietary Google assets.
18. Bundled soundscape library contains at least 24 production-ready project-created/procedural or CC0 sounds, each with provenance/hash records; BWGen audio is never copied. The first-party preset library contains at least 30 curated/research presets and covers the primary generator/automation patterns.
19. `.bbeat` package signing uses Ed25519 via Web Crypto Ed25519; private keys remain local/passphrase-encrypted, public keys may bind to verified accounts, and signature states distinguish unbound/account-bound validity from identity claims.
20. Supabase is the locked first-wave optional cloud/community backend: Auth, PostgreSQL, Storage, immutable shared versions, revocable/expiring share links, public publishing, ratings/reviews/favorites, moderation/reporting, and Row Level Security. Local-only use remains complete without it.
21. Public community assets require redistribution rights/provenance; arbitrary copyrighted imported music cannot silently become a public hosted asset. Untrusted files/packages have size/path/compression/parser hardening and fuzz tests.
22. Research-mode bundled self-report controls are project-authored/non-proprietary rather than licensed clinical scales. Participant/event data stays local/export-only by default.
23. Product positioning is general audio creation/listening/education/research support, not medical diagnosis/treatment.

## First-wave completion rule

Implementation can proceed in dependency order, but release requires every planned surface and acceptance gate: scientific DSP engine, full editor, complete guaranteed codec import/export, analyzer, science/research/curated/community libraries, cloud share/moderation/security, offline/mobile, 24+ provenance-clean soundscapes, 30+ first-party presets, `.bwg` import/export interoperability, visual/light-control Labs software validation, package signing, accessibility, security/fuzzing, licensing/SBOM checks, and the full numerical/browser/device gauntlet.

There are no unresolved planning gates from this baseline; platform-incapable optional hardware bridges must show a supported/unsupported capability state rather than being mislabeled as unfinished implementation.
