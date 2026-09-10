# File Formats and Project Package

## Import matrix — first-wave requirement

Guaranteed cross-browser targets, using native APIs or bundled commercial-use open-source fallbacks:

- WAV/PCM and WAV/float
- FLAC
- MP3
- AIFF/PCM
- Ogg/Vorbis
- Ogg/Opus
- WebM/Opus

AAC/M4A is excluded from the supported codec matrix. We do not bundle an AAC decoder or encoder and do not intentionally invoke a browser/operating-system AAC decoder as a fallback.

## Export matrix — first-wave requirement

Research masters: WAV PCM 24/32 or float32; FLAC.  
Consumer sharing: MP3, Ogg Vorbis, Ogg Opus, WebM Opus.  
Interchange: AIFF PCM.  
AAC/M4A export is intentionally excluded. There is no bundled or native AAC export path in the product UI.

Codec implementations are locked by `../legal/LICENSING_STRATEGY.md`: project-owned WAV/AIFF readers/writers, libFLAC, dr_mp3 (MIT-0) decode, isolated LGPL-compliant LAME MP3 encode, libopus/libogg, libvorbis/libogg, and the project-owned TypeScript WebM/EBML audio muxer/demuxer. FFmpeg is prohibited throughout the application, build, export, and validation paths.

Every enabled format gets round-trip tests for stereo ordering, duration, carrier estimates, clipping, metadata, and post-encode binaural integrity where technically meaningful.

## `.bbeat` package

ZIP-based open package. First-wave extension contract: `.bbeat`. Until a media type is formally registered, use the private file-handler hint `application/x-bbeat+zip` where a custom type is useful and `application/zip` where platforms reject unknown types. Import identification uses the `.bbeat` extension plus ZIP/package magic/manifest validation; the product does not claim an IANA-registered vendor media type.

Required:

- `manifest.json`: package/schema/engine versions and integrity hashes.
- `session.json`: complete deterministic project model.
- `provenance.json`: authorship, source citations, lineage, license metadata.
- `assets/*`: embedded imported sounds when redistribution rights permit.
- `signature.json`: optional Ed25519 signature record when a project is signed.

Optional content folders:

- `previews/*`
- `analysis/*`
- `waveforms/*`

## Integrity and authorship

Use SHA-256 for packaged-asset identity/integrity. First-wave signed packages use Ed25519 through the Web Crypto API over a canonical UTF-8 manifest/hash list. Local private seeds are never uploaded; when persisted they are encrypted locally using Web Crypto PBKDF2-SHA-256 + AES-GCM and a user passphrase. A public key may be bound to a verified cloud account. Import states are `unsigned`, `valid-unbound`, `valid-account-bound`, `invalid`, and `modified`; a signature proves control of a key, not legal identity by itself.


## Untrusted package/file security

Treat imported packages and media as hostile. Reject ZIP path traversal (`..`, absolute paths), symlinks, duplicate canonical paths, excessive entry counts, oversized manifests/assets, dangerous compression ratios, and expanded-size limits before extraction. Verify hashes while streaming. Decoder/package work runs in dedicated workers with bounded memory. Validate file signatures/structure rather than trusting extensions. Imported text is rendered as data and sanitized.

## Asset licensing in packages

Every embedded asset stores license/provenance metadata. Bundled application assets are original/procedural or CC0. User-imported assets can be packaged only after the UI tells the user they are responsible for redistribution rights; recipe-only export is always available when embedding is not appropriate.

## Legacy `.bwg` — first-wave requirement

`.bwg` conversion is a required parser deliverable before first public release:

1. Build a corpus of real presets covering known BWGen features.
2. Document field mapping and binary/text structure discovered through clean-room interoperability work.
3. Fuzz parser boundaries and malformed files.
4. Produce a conversion report for every import, including unknown/unmapped fields.
5. Compare mapped behavior and generated signal against the reference application where legally/practically possible.
6. Forbid silent data loss.
7. Mark only specific unsupported fields as unsupported; do not label the whole importer “experimental” once acceptance tests pass.

The first release cannot claim BWGen parity unless this importer passes the representative corpus and no-silent-data-loss tests.


## Legacy `.bwg` export — first-wave requirement

Implement an independently written legacy-compatible writer after the clean-room format map is validated. Export is **lossless-or-refuse** at the semantic level: if a project uses features BWGen cannot represent (multiple unsupported media layers, modern routing, unsupported waveforms/modulation, etc.), show a compatibility report and do not silently discard them. For representable presets, emit `.bwg`; when the preset references an external WAV background, optionally emit a ZIP containing the `.bwg`, compatible WAV companion asset(s), and a plain-text mapping/readme. Round-trip exported `.bwg` through the legacy reference application and re-import it into our parser as an acceptance test.
