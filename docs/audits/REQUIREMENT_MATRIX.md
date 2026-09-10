# Mindaural first-wave requirement matrix

This matrix is maintained against `docs/00_MASTER_PLAN.md`. `PASS` means a reproducible implementation and test exists; a passing smoke test does not promote an unverified feature.

| Plan item | Current evidence | Status |
|---|---|---|
| 1 Signal math and deterministic renderer | `scripts/test.mjs`: oscillator, phase, automation, noise, segments, analyzer, light-control tests | PASS |
| 2 Protected stereo and AudioWorklet | `src/audio/render.ts`, `src/audio/worklet.ts`, `public/worklet.js`; numerical stereo tests | PARTIAL |
| 3 Licensing and provenance | `docs/legal/LICENSING_STRATEGY.md`, `assets/licenses/README.md` | PARTIAL |
| 4 Schema, hashes, signing, local storage | `src/core/sessionSchema.ts`, `src/core/migrations.ts`, `src/formats/projectPackage.ts`, `scripts/migration-test.mjs`, signing/package integrity tests | PARTIAL: 0.9 package migration is production-wired and tested; browser-storage recovery evidence remains |
| 5 Studio editing and routing | `src/ui/StudioSurface.tsx`, history/segment tests | PARTIAL |
| 6 24+ soundscapes | `src/data/soundscapes.ts` (24 procedural definitions) | PARTIAL: runtime asset hash/provenance audit pending |
| 7 Guaranteed format import | WAV/AIFF/FLAC readers exist; MP3/Vorbis/Opus guaranteed decoders absent | FAIL |
| 8 Complete export stack | WAV/AIFF/FLAC and Opus containers exist; MP3/Vorbis encoders absent | FAIL |
| 9 Portable signed packages | `.bbeat`, recipe, manifests, Ed25519 and ZIP safety tests | PARTIAL |
| 10 Supabase cloud/community | REST client and schema exist; live RLS/share/moderation test evidence absent | FAIL |
| 11 Create/Listen/headphone wizard | UI surfaces and channel-test flow exist; device-path evidence pending | PARTIAL |
| 12 Analyzer/Verify My File | CPU analyzer, spectrogram, manifest comparison, corruption checks | PARTIAL |
| 13 Libraries and 30+ presets | 30 presets in `src/data/presets.ts`; community/version/moderation runtime evidence absent | PARTIAL |
| 14 Responsive/offline/touch PWA | manifest, service worker, share target, browser smoke | PARTIAL: real device matrix pending |
| 15 BWGen importer/exporter | Text subset only; binary corpus, mapping, fuzz, companion-WAV support absent | FAIL |
| 16 Labs visual/19.2 kHz | deterministic renderer/analyzer and safety interlock exist; hardware/browser matrix pending | PARTIAL |
| 17 Full cross-browser and release gauntlets | local gauntlet passes 28/28 plus shell smoke; required browser/device/codec/cloud corpus incomplete | FAIL |

## Reproducible baseline

`npm.cmd run typecheck`, `npm.cmd test`, `npm.cmd run build`, and `npm.cmd run gauntlet` pass in the current managed environment. The gauntlet's planning baseline also passes after excluding generated/repository metadata from its file-set comparison.

This is not a release sign-off: the FAIL/PARTIAL rows are release-blocking under the master plan.
