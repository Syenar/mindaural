# Clean Pass Checklist

Date: 2026-09-10 — Deep build-readiness pass

| Area | Result | Notes |
|---|---|---|
| Binaural mechanism | PASS | Dichotic difference-frequency percept described without saying the beat physically exists in either source channel |
| EEG entrainment evidence | PASS | Mixed/unsettled; no global entrainment promise |
| Behavioral/clinical evidence | PASS | Positive, null/negative and 2026 low-certainty/heterogeneous evidence represented |
| Carrier/beat guidance | PASS | Approximate guidance, no universal 400 Hz or magical EEG-band rule |
| Research reproducibility | PASS | Exact published ear frequencies/protocol metadata preserved |
| BWGen core/library parity | PASS | Official documented concepts mapped; `.bwg` import + compatible-subset export mandatory |
| Visual/light-control parity | PASS | First-wave visual + 19.2 kHz authoring/export with deterministic software spectral/timing validation |
| Runtime architecture | PASS | TypeScript/React UI + authoritative TypeScript signal semantics + AudioWorklet real-time + WebGPU acceleration + CPU reference |
| Real-time safety | PASS | No allocation/I/O/encoding in hot callback; no fixed render-quantum assumption |
| Codec import/export | PASS | WAV, AIFF, FLAC, MP3, Ogg Vorbis, Ogg Opus, WebM Opus implementation choices locked |
| MP3 fallback | PASS | dr_mp3 MIT-0 decode + isolated LGPL LAME encode |
| WebM container | PASS | Project-owned TypeScript audio-only EBML mux/demux; no unspecified muxer |
| AAC/M4A | PASS | Import/export excluded; no packaged or intentionally invoked native AAC path |
| FFmpeg prohibition | PASS | Runtime, build, browser tests and validation covered; Playwright removed |
| Analysis implementation | PASS | Project-owned WebGPU FFT/DFT kernels with independent TypeScript CPU reference/fallback |
| Build toolchain/provenance | PASS | Emscripten/LLVM, pinned sources/hashes/build recipes/SBOM |
| Cloud/share/community | PASS | Supabase architecture, immutable versions, RLS, Storage, moderation and deletion/export specified |
| Public asset rights | PASS | Public publishing rights/provenance rules; imported copyrighted media not silently hosted |
| Package security | PASS | Path traversal/zip bomb/size/parser hardening and fuzzing specified |
| Package signing | PASS | Ed25519 implementation, local encrypted private-key lifecycle and verification states specified |
| Soundscape/preset library | PASS | At least 24 provenance-clean soundscapes and 30 first-party curated/research presets required |
| UI asset licensing | PASS | Lucide ISC + system fonts; proprietary Google assets excluded |
| Research instrument licensing | PASS | Project-authored non-clinical self-report controls; no unresolved licensed-scale placeholder |
| Privacy | PASS | Local-only core; research participant/event data local/export-only by default |
| Browser/platform logic | PASS | Capability-gated hardware APIs; no false universal hardware support |
| Headphone/output logic | PASS | No automatic headphone/SPL certification claim |
| Long renders | PASS | Chunked/bounded rendering/encoding required |
| Accessibility/safety | PASS | Keyboard/screen reader/reduced motion + visual emergency stop/no autoplay |
| Session schema | PASS | Versioned Draft 2020-12 build-oriented schema replaces permissive placeholder |
| Automated validation | PASS | Planning validator checks hidden dependency/placeholder regressions and manifest consistency |
| No deferred features | PASS | Every feature in the master plan is first-wave or a documented platform capability state |

**Clean-pass conclusion:** no unresolved critical/high-severity science, reference-parity, architecture, codec, licensing, backend, security, data-model, safety, or first-wave scope placeholder remains in the planning baseline.

**Final machine check:** `tests/validate_planning_baseline.py` = **0 failures**; representative Draft 2020-12 session instance = **PASS**; manifest file set/hashes = **PASS**.
