# Licensing Strategy — Locked for First-Wave Build

Date: 2026-09-10

## 1. Requirement

Every dependency bundled or distributed by Mindaural must be free/open-source software that permits commercial use. Preferred licenses are MIT, BSD-2-Clause, BSD-3-Clause, Apache-2.0, ISC, Zlib, and similarly permissive OSI-approved licenses. CC0 is preferred for third-party media assets.

The only copyleft component distributed with the application is **LAME under the GNU Lesser General Public License (LGPL)**, isolated as a replaceable MP3 encoder WebAssembly module with all notice/source/relinking obligations satisfied. Development-only browser drivers/tools may use other OSI-approved commercial-use licenses (for example Mozilla Public License 2.0) when they are not shipped in the product and their terms are satisfied. GPL, AGPL, NonCommercial, research-only, field-of-use-restricted, source-available/non-OSI, or unknown/custom licenses are prohibited unless the policy is explicitly revised before the dependency enters the build.

The application itself may remain proprietary/commercial while complying with these third-party licenses.

## 2. Locked application and toolchain stack

| Component | Choice | License | Commercial use | Decision |
|---|---|---|---|---|
| UI | React | MIT | Yes | Approved |
| UI/application language | TypeScript | Apache-2.0 | Yes | Approved |
| DSP/audio-core language | Project TypeScript + WGSL shaders | Project-owned | Yes | Approved |
| TypeScript/WebGPU bridge | WebGPU/Web Audio browser APIs | MIT OR Apache-2.0 | Yes | Approved |
| C/C++→WebAssembly toolchain | Emscripten/LLVM | MIT + NCSA / Apache-2.0 family | Yes | Approved |
| Build | Vite | MIT | Yes | Approved |
| Unit tests | Vitest | MIT | Yes | Approved |
| Browser tests | WebdriverIO using WebDriver/WebDriver BiDi | MIT | Yes | Approved; video-recording/FFmpeg plugins prohibited |
| FFT/analyzer | Project-owned WGSL kernels + TypeScript CPU reference | Project-owned | Yes | Approved |
| IndexedDB helper | Dexie | Apache-2.0 | Yes | Approved |
| ZIP/deflate package handling | fflate | MIT | Yes | Approved |
| Icons | Lucide | ISC | Yes | Approved |
| UI fonts | System font stack | Platform fonts; no redistribution | Yes | Approved |
| Cloud client | supabase-js | MIT | Yes | Approved |
| Cloud/backend platform | Supabase | Apache-2.0 core | Yes | Approved |
| Package signatures | Web Crypto Ed25519 | BSD-3-Clause | Yes | Approved |
| Core synthesis/render/analysis | Project-owned TypeScript/AudioWorklet/WebGPU | Project-owned | Yes | Build first wave |
| WAV/AIFF PCM containers | Project-owned | Project-owned | Yes | Build first wave |
| WebM/EBML audio mux/demux | Project-owned TypeScript implementation | Project-owned | Yes | Build first wave |

The project does **not** use Playwright because its browser tooling can obtain/use an FFmpeg artifact for video functionality. The project-wide FFmpeg prohibition is simpler if the test harness cannot introduce it at all.

## 3. Locked audio codec strategy

### WAV / AIFF
Project-owned PCM readers/writers.

### FLAC
Use `libFLAC` for encode/decode, compiled to WebAssembly. Xiph's BSD-style license permits incorporation into proprietary/commercial applications.

### MP3
- **Encode:** LAME as an isolated, replaceable WebAssembly module under LGPL. Ship notices, exact corresponding source, modifications, and reproducible build instructions. Do not incorporate GPL-only LAME utilities.
- **Decode:** `dr_mp3` from `dr_libs`, selecting its MIT-0 license option. This provides a guaranteed bundled decoder without relying on a browser's MP3 path.

Fraunhofer ended its core MP3 patent licensing program in 2017; this does not eliminate normal third-party patent due diligence in every jurisdiction, but it removes the active AAC-style pool issue from the project baseline.

### Ogg Vorbis
Use `libvorbis` + `libogg` under Xiph BSD-style licensing for encode/decode and Ogg framing.

### Ogg Opus
Use `libopus` + `libogg`; Opus reference code uses a 3-clause BSD license and published royalty-free patent terms.

### WebM Opus
Use `libopus` for the codec and a **project-owned TypeScript audio-only WebM/EBML muxer and demuxer**. Implement only the elements needed for standards-compliant Opus audio, metadata, duration, seek/cue support required by our exports/imports. Validate against the WebM/Matroska specification and round-trip in supported browsers. No generic media framework is bundled.

### AAC / M4A
AAC/M4A export is excluded. No AAC encoder/decoder is bundled. AAC/M4A import is also excluded; the product does not intentionally invoke browser/operating-system AAC decoding as a fallback. This avoids the currently active AAC patent-pool licensing problem.

### FFmpeg
**FFmpeg is prohibited everywhere in this project**: shipped application, transitive runtime dependencies, WebAssembly packages, build tooling, browser-test tooling, conversion helpers, development scripts, CI images under project control, export paths, and validation paths. CI scans dependency trees, lockfiles, downloaded browser/tool artifacts, PATH-resolved tools, and repository content for prohibited FFmpeg components. This prohibition covers software and invocation paths under project control; the project does not claim to control undisclosed internals of a user-installed third-party browser.

## 4. Build provenance / dependency supply chain

Codec modules are built from pinned upstream source archives/commits using the pinned Emscripten/LLVM toolchain. For every distributed third-party module store:

- upstream URL/version/commit;
- source SHA-256;
- license text;
- build command/toolchain version;
- patches and their license;
- resulting WebAssembly SHA-256;
- software bill of materials (SBOM) entry.

CI performs lockfile integrity checks, license allowlisting, dependency vulnerability scanning, and an explicit FFmpeg absence check.

## 5. Soundscape, font, icon, and reference assets

First-wave bundled soundscapes are either project-created/procedural or **CC0**. No attribution-required third-party audio is bundled in the default library. Every third-party CC0 asset stores source URL, creator/uploader, retrieval date, original hash, local transformed hash, and a captured license/provenance record.

Do not copy BWGen bundled audio/artwork, commercial AudioStrobe material, or unknown-license preset backgrounds.

UI typography uses the operating system's system font stack; do not bundle Google Sans or imitate/copy proprietary Google assets. Lucide supplies general-purpose icons under ISC.

## 6. Legacy BWGen interoperability

The `.bwg` importer is clean-room interoperability work based on public documentation, user-owned sample files, observable behavior, and independently written parser/test code. Do not copy/decompile BWGen source, artwork, or audio. Unknown fields are surfaced; silent loss is forbidden.

## 7. Legacy 19.2 kHz light-control interoperability

Implement compatible 19.2 kHz control-signal generation independently from published/observable behavior and validate it in software through spectral, timing, phase, duty-cycle, channel, export and round-trip tests. Physical third-party decoder validation is not a release requirement. Do not copy third-party encoded content or imply endorsement. The shipping name is **Legacy 19.2 kHz Light Control**.

## 8. Cloud/backend

Supabase is the locked first-wave cloud backend for share links/community/sync. Its open-source core is Apache-2.0 and the JavaScript client is MIT. Managed hosting charges, if chosen, are infrastructure/usage costs rather than software license fees; self-hosting remains technically possible. See `../architecture/CLOUD_BACKEND_AND_SECURITY.md`.

## 9. Product claims / regulatory boundary

First release is a general audio-creation, listening, education, and research-support product. It makes no diagnosis, treatment, cure, mitigation, or prevention claim. Research summaries may accurately describe published results and limitations.

## 10. Automated license enforcement

CI fails when a distributed dependency or asset has GPL/AGPL, NonCommercial, field-of-use/source-available restrictions, unknown/unapproved licensing, or a bundled codec requiring a paid patent license contrary to this policy. It also verifies `THIRD_PARTY_NOTICES`, LAME corresponding source/build material, SBOM, source hashes, asset provenance, and absence of FFmpeg.

## 11. Primary license references

- React — MIT: https://github.com/facebook/react
- TypeScript — Apache-2.0: https://github.com/microsoft/TypeScript
- Rust — MIT OR Apache-2.0: https://www.rust-lang.org/policies/licenses
- wasm-bindgen — MIT OR Apache-2.0: https://github.com/rustwasm/wasm-bindgen
- Emscripten — MIT + University of Illinois/NCSA: https://github.com/emscripten-core/emscripten/blob/main/LICENSE
- Vite — MIT: https://github.com/vitejs/vite
- Vitest — MIT: https://github.com/vitest-dev/vitest
- WebdriverIO — MIT: https://github.com/webdriverio/webdriverio/blob/main/LICENSE
- WebGPU FFT/DFT kernels with an independent TypeScript CPU fallback — MIT OR Apache-2.0: https://github.com/ejmahler/WebGPU FFT/DFT kernels with an independent TypeScript CPU fallback
- Dexie — Apache-2.0: https://github.com/dexie/Dexie.js
- fflate — MIT: https://github.com/101arrowz/fflate
- Lucide — ISC: https://github.com/lucide-icons/lucide
- Supabase — Apache-2.0: https://github.com/supabase/supabase
- supabase-js — MIT: https://github.com/supabase/supabase-js
- dr_libs/dr_mp3 — Public Domain or MIT-0; choose MIT-0: https://github.com/mackron/dr_libs
- FLAC: https://xiph.org/flac/license.html
- Opus: https://opus-codec.org/license/
- Vorbis: https://xiph.org/vorbis/faq/
- LAME: https://lame.sourceforge.io/
- Fraunhofer MP3 status: https://www.iis.fraunhofer.de/en/ff/amm/consumer-electronics/mp3.html
- Via Licensing Alliance AAC pool: https://www.via-la.com/aac/
