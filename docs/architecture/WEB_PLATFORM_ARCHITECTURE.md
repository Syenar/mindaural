# Web Platform Architecture

## Browser-first constraints

The application works through capability detection rather than browser-name assumptions. The support matrix defines a required baseline for current Chrome/Edge, Firefox, and Safari on desktop plus current Chromium/Safari mobile platforms; unsupported optional hardware APIs degrade with a clear explanation rather than breaking core audio work.

### Web Audio and sample rate

Use `AudioContext.sampleRate` as the actual live rate. Do not assume 44.1/48 kHz and do not promise 192 kHz real-time output. The project-owned offline renderer may generate validated higher-rate files independently of the hardware output path. Rate-dependent DSP coefficients are rebuilt when needed.

### AudioWorklet real-time rules

AudioWorklet hosts real-time rendering away from the UI thread and executes the shared TypeScript signal specification directly; it never blocks on WebGPU. The callback must:

- accept the actual render quantum length rather than assume a permanently fixed block size;
- allocate no memory in the steady-state hot callback;
- perform no logging, network I/O, storage access, locks, codec encoding, ZIP work, or UI work;
- use preallocated ring/state buffers and bounded messages;
- recover cleanly from suspend/resume/device changes.

Core real-time operation does not require WebGPU, WebAssembly threads, or `SharedArrayBuffer`. Heavy CPU offline work runs in dedicated Web Workers; WebGPU acceleration is optional-at-runtime but primary when available and beneficial.

### Codec/container capability

WebCodecs/native decoders may accelerate optional paths but do not define guaranteed support. Guaranteed packaged formats use the directly audited stack in `../legal/LICENSING_STRATEGY.md`.

- WAV/AIFF: project-owned PCM readers/writers;
- FLAC: libFLAC;
- MP3: dr_mp3 decode + isolated LAME encode;
- Ogg Vorbis: libvorbis/libogg;
- Ogg Opus: libopus/libogg;
- WebM Opus: libopus + project-owned TypeScript WebM/EBML audio muxer/demuxer.

AAC/M4A is excluded from guaranteed/package support. FFmpeg is prohibited from runtime, toolchain, browser tests, and validation.

### Local storage/offline

Use IndexedDB for structured metadata and Origin Private File System where available for large editable media/cache. A storage abstraction supplies fallbacks and quota/error handling. Service Worker + Web App Manifest provide an installable Progressive Web App and offline app shell. Local projects remain usable with network/backend unavailable.

### Drag/drop and touch

Desktop uses `DataTransfer.files`; touch/mobile uses file picker and Share Target where supported. Core import is never mouse-only.

### Device uncertainty

Browser code cannot certify physical headphones, acoustic channel separation, or sound-pressure level at the ear. The app provides deterministic left/right tests plus user confirmation.

### Labs hardware APIs

Web MIDI, Web Serial, and Web Bluetooth are capability-gated because browser/platform availability differs. Their absence is a documented platform limitation, not missing first-wave implementation. Legacy 19.2 kHz Light Control always supports standards-based lossless file export and analyzer validation even where direct hardware APIs are unavailable.

## Cloud boundary

Supabase is used only for account-backed synchronization, immutable share links, community publishing, reviews/favorites, moderation, and public signing-key binding. Core creation/rendering is local-first. Full authorization/storage/security requirements are in `CLOUD_BACKEND_AND_SECURITY.md`.

## Locked technology baseline

- React + TypeScript
- TypeScript + AudioWorklet for authoritative real-time/reference DSP semantics; WebGPU for primary parallel acceleration with CPU fallback
- WebGPU/Web Audio browser APIs
- Web Audio API + AudioWorklet
- Web Workers for offline rendering, decoding/encoding, analysis and package processing
- WebGPU FFT/DFT/reduction kernels with independent TypeScript CPU reference/fallback
- libFLAC, dr_mp3, LAME, libopus/libogg, libvorbis/libogg
- project-owned TypeScript WAV/AIFF and WebM/EBML container code
- Emscripten/LLVM to compile pinned C codec libraries to WebAssembly
- IndexedDB + Origin Private File System abstraction
- Service Worker / Web App Manifest
- Supabase/supabase-js for optional cloud/community features
- Vitest for unit/component tests
- WebdriverIO via WebDriver/WebDriver BiDi for end-to-end browser gauntlets
- Lucide icons + system font stack

Playwright is intentionally excluded so the browser-test toolchain cannot pull/use its FFmpeg video artifact. WebdriverIO video-recording plugins are likewise prohibited.

## CI/browser matrix

Tests run against current stable Chrome/Chromium, Firefox, and Safari/WebKit-capable real environments where available, plus Android Chrome and iOS Safari device/service coverage before release. Test evidence records browser/OS/version. Browser automation is only one layer: actual device audio/hardware tests are retained for output behavior that emulation cannot prove.

## Platform-source notes

- Web Audio specification: https://www.w3.org/TR/webaudio/
- MDN AudioWorklet: https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet
- MDN Drag/Drop DataTransfer files: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/files
- MDN Origin Private File System: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system
- WebdriverIO: https://webdriver.io/
