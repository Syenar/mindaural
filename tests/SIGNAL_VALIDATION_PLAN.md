# Signal Validation Plan

## Deterministic unit cases

- 395/405 Hz => 10 Hz difference
- 400/410 Hz => 10 Hz difference with non-symmetric center convention preserved
- 332/348 Hz => 16 Hz difference / 340 center
- 380/420 Hz => 40 Hz difference / 400 center
- fractional differences such as 7.83 Hz
- beat ramps 12→8→4 Hz without phase reset
- carrier ramps independent from beat ramps
- channel swap diagnostic
- 2/10/50 simultaneous voices under gain-controlled conditions
- one-hour and eight-hour renders

## Failure-injection cases

- mono-summed render
- one channel duplicated
- channels swapped vs manifest
- 5%/20% artificial crossfeed
- clipped render
- phase resets at automation points
- per-channel independent normalization
- sample-rate conversion
- lossy round trip
- missing package asset
- corrupted asset hash

## Analysis assertions

- duration/sample count correct
- actual frequency estimate within method-specific tolerance
- displayed difference equals generated difference
- no unintended beat component introduced in isolated pure single-ear stem
- channel leakage below project/test threshold
- no clipped samples in reference renders
- segment/repetition timing exact to sample frame
- deterministic seeded noise hashes when deterministic mode enabled

## Browser gauntlet

Chrome, Edge, Firefox, Safari on representative desktop/mobile environments; verify AudioContext rate reporting, AudioWorklet start/stop, suspend/resume, hidden-tab behavior, offline PWA load, file picker, desktop drag-drop, long render memory, and codec fallback matrix.


## Codec/container matrix

Round-trip WAV, AIFF, FLAC, MP3, Ogg Vorbis, Ogg Opus, and WebM Opus using only the locked direct modules/project-owned containers. Decode MP3 fallback specifically through dr_mp3. Validate WebM/Opus files in major browser decoders and validate imported browser-generated reference files with our demuxer. No test may invoke FFmpeg.

## Legacy 19.2 kHz light-control validation

Generate lossless 48/96 kHz reference files and verify per-channel 19.2 kHz carrier spectrum, envelope, duty-cycle, phase, channel mapping, metadata and round-trip integrity entirely in software. Physical third-party decoder validation is outside the release gate. Lossy codecs and wireless playback are never the reference validation path.
