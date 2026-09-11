# Mindaural first-wave requirement matrix

This matrix is maintained against `docs/00_MASTER_PLAN.md`. `PASS` means a reproducible implementation and test exists; a passing smoke test does not promote an unverified feature.

| Plan item | Current evidence | Status |
|---|---|---|
| 1 Signal math and deterministic renderer | `scripts/test.mjs`: oscillator, phase, automation, noise, segments, analyzer, light-control tests | PASS |
| 2 Protected stereo and AudioWorklet | `src/audio/render.ts`, `src/audio/worklet.ts`, `src/audio/liveEngine.ts`, `public/worklet.js`; numerical stereo tests and `scripts/worklet-contract.mjs` verify shared DSP primitives, stateful phase, separate voice/background paths, discrete stereo output, and forbidden real-time operations | PARTIAL: live AudioWorklet-vs-CPU sample equivalence on capable physical browsers remains |
| 3 Licensing and provenance | `docs/legal/LICENSING_STRATEGY.md`, `assets/licenses/README.md`, `THIRD_PARTY_NOTICES.txt`, `scripts/license-audit.mjs` | PARTIAL: installed metadata and notice inventory audit pass; corresponding-source/SBOM completeness for codec WASM remains |
| 4 Schema, hashes, signing, local storage | `src/core/sessionSchema.ts`, `src/core/migrations.ts`, `src/formats/projectPackage.ts`, `src/storage/projects.ts`, `src/ui/StorageRecoveryControl.tsx`, `scripts/migration-test.mjs`, `scripts/package-recovery.mjs`, signing/package integrity tests | PARTIAL: package and explicit local-backup recovery pass; real quota/corrupt-IDB device evidence remains |
| 5 Studio editing and routing | `src/ui/StudioSurface.tsx`, history/segment tests | PARTIAL |
| 6 24+ soundscapes | `src/data/soundscapes.ts`; `scripts/soundscape-audit.mjs` renders all 24 deterministically, verifies category coverage/provenance, and records SHA-256 output hashes | PARTIAL: independent listening-quality review pending |
| 7 Guaranteed format import | `src/audio/import.ts` dispatches WAV/AIFF/FLAC/MP3/Ogg Vorbis/Ogg Opus/WebM Opus to bundled or project-owned decoders; AAC/M4A is explicitly rejected; WebM demux/decode is covered by `scripts/codec-regression.mjs` | PASS for codec paths; hostile corpus and device matrix remain integration work |
| 8 Complete export stack | `src/ui/StudioSurface.tsx` and `src/ui/App.tsx` expose and execute WAV/AIFF/FLAC/MP3/Ogg Vorbis/Ogg Opus/WebM Opus; direct production browser AX inspection found MP3/Ogg Vorbis/Ogg Opus/WebM Opus controls; `scripts/codec-regression.mjs` validates bundled encoded bytes and re-analysis | PASS for local codec/menu paths; hostile corpus and device matrix remain integration work |
| 9 Portable signed packages | `.bbeat`, recipe, manifests, Ed25519, encrypted local key lifecycle, ZIP safety, migration tests, explicit `valid-unbound`/`valid-account-bound` states, typed `ModifiedPackageError`, and `recoverModifiedProjectPackage` preserving only verified session/assets; `scripts/package-recovery.mjs` proves damaged-entry recovery | PARTIAL: browser-storage recovery evidence remains |
| 10 Supabase cloud/community | `src/cloud/supabase.ts` covers auth/session, immutable versions, publishing/rights, shares, reviews/favorites, moderation reports, private assets, export/deletion; `supabase/schema.sql` and `scripts/supabase-policy-audit.mjs` cover RLS, append-only versions, verified publishing, rate limits and storage isolation | FAIL: no configured live Supabase endpoint/account was available for authorization, RLS, moderation and deletion acceptance tests |
| 11 Create/Listen/headphone wizard | UI surfaces and channel-test flow exist; device-path evidence pending | PARTIAL |
| 12 Analyzer/Verify My File | CPU analyzer, spectrogram, manifest comparison, corruption checks | PARTIAL |
| 13 Libraries and 30+ presets | 30 presets in `src/data/presets.ts`; community/version/moderation runtime evidence absent | PARTIAL |
| 14 Responsive/offline/touch PWA | manifest, service worker, share target, browser smoke | PARTIAL: real device matrix pending |
| 15 BWGen importer/exporter | `src/legacy/bwg.ts` clean-room field mapping, explicit refusal reports, size/binary guards, compatible text export, companion-WAV ZIP package; `scripts/bwg-regression.mjs` representative fixtures, hostile input, no-silent-loss refusal and package-entry checks | PARTIAL: representative real-world corpus and full legacy semantic parity remain |
| 16 Labs visual/19.2 kHz | deterministic renderer/analyzer and safety interlock exist; hardware/browser matrix pending | PARTIAL |
| 17 Full cross-browser and release gauntlets | local gauntlet passes 28/28 plus shell smoke; required browser/device/codec/cloud corpus incomplete | FAIL |

## Reproducible baseline

`npm.cmd run typecheck`, `npm.cmd test`, `npm.cmd run build`, and `npm.cmd run gauntlet` pass in the current managed environment. The gauntlet includes FLAC/MP3 byte-level round-trip evidence and the planning baseline also passes after excluding generated/repository metadata from its file-set comparison.

This is not a release sign-off: the FAIL/PARTIAL rows are release-blocking under the master plan.

The application/runtime version is `1.0.2`; the independently versioned session schema remains `1.0.0` for package compatibility.
