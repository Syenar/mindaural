# BrainWave Generator (BWGen) Feature Audit

Reference source: official BWGen website. This file separates confirmed parity targets, historic behavior/limitations, and our upgrades.

## Confirmed official BWGen feature concepts

| Reference feature | Evidence from official site | Our implementation target | Status in plan |
|---|---|---|---|
| Create/save custom presets | Features page | Projects + presets + templates | Covered |
| Context-sensitive online help | Features page | Inline help + Learn links + parameter explanations | **Added in audit** |
| 20+ built-in presets | Features page | Curated + research + community libraries | Covered/expanded |
| Export/import `.bwg` presets | Features/how-to | Portable `.bbeat` + legacy `.bwg` import/export interoperability | Mandatory first-wave clean-room importer + compatible-subset exporter; representative corpus + no-silent-data-loss acceptance |
| Render output to WAV | Features page | WAV + FLAC + AIFF + lossy sharing formats | Covered/expanded |
| 18 built-in backgrounds | Features page | Bundled soundscapes | Covered/expanded |
| External WAV background | Features page/FAQ | Multiple imported audio tracks, many formats | Covered/expanded |
| White-to-brown programmable noise | Features page | White/pink/brown + continuous spectral slope + automation | Covered/expanded |
| Programmable beat frequency | Features page | Sample-accurate automation | Covered |
| Programmable volume | Features page | Automation | Covered |
| Programmable audible pitch/carrier | Features page | Exact L/R + center/beat convenience + automation | Covered/improved |
| Programmable modulation | Features page | Explicit modulation matrix | Covered/expanded |
| Programmable waveform | Features page | Waveform automation/morph where valid | Covered/expanded |
| Programmable background | Features page | Timeline/background tracks | Covered |
| Parameters track one another | Features page | Parameter linking/modulation matrix | Covered/expanded |
| Up to 10 simultaneous voices | Features + v3.1 | Practical dynamic voice count, performance-metered | Covered/expanded |
| Per-voice parameters | Features page | Per-voice full inspector | Covered |
| Multiple segments with own lengths/parameters | Features page | Scenes/segments, repeats/loops/templates | Covered/expanded |
| Silent first segment for delayed start | Features page/FAQ | Explicit scheduler/timeline silence | Covered modern equivalent |
| Play CD/MIDI simultaneously via external apps | Features page | Imported audio track + optional Web MIDI Labs; no obsolete CD-emulation requirement | Modern equivalent |
| Background phase shift L/R | v3.1 page | Explicit background channel phase/time-offset control; preserve exact semantics in legacy importer | **Clarified in audit** |
| Background interval | v3.1 page | Interval triggers / clip repetition | Covered |
| Noise + another background simultaneously | v3.1 page | Unlimited/multiple tracks | Covered |
| Background modulation + phase (-180..+180) | v3.1 page | Background modulation controls | **Clarified in audit** |
| Noise modulation | v3.1 page | Noise modulation/envelopes | Covered |
| Waveform specified as parameter / smooth waveform changes | v3.1 page | Morphable/automated waveform where mathematically defined | Covered |
| Play while Preset Options open / hear edits immediately | v3.1 page | True live preview | Covered |
| Window/full-screen color visual stimulation | v3.1 page | Labs visual stimulation | Covered with safety/timing caveats |
| AudioStrobe-compatible hardware stimulation | v3.1 page | Legacy 19.2 kHz Light Control export/compatibility | Covered with hardware-path caveats |
| Configuration Wizard | v3.1 page | Headphone/channel/output wizard | Covered/improved |
| AudioStrobe signal waveform/duty-cycle settings (3.1.5) | Official version history/news | Labs AudioStrobe waveform/duty-cycle controls | **Added in audit** |
| Preset ratings/comments/sorting in website library | Official library/index/version history | Ratings/reviews, filters, moderation, versions | **Added in audit** |

## Historic limitations we should not copy

- Windows-only application; our target is modern browsers/PWA.
- Direct MP3 export absent; users rendered WAV then converted externally.
- External background workflow expected a separately downloaded WAV file and installation-directory placement.
- Historic FAQ describes one external background per preset and old memory/file-size constraints.
- Old preset sharing can break when referenced background assets are missing.
- Old UI is dialog/graph oriented rather than direct modern timeline editing.
- Some FAQ and preset claims about effects reflect the scientific state/marketing culture of the era and are not adopted as current evidence.

## Features incorrectly or too strongly attributed in the first draft

- **Arbitrary custom waveform import:** not established as a BWGen parity feature by the official pages reviewed. It is an upgrade in our app.
- **Unlimited voices:** BWGen explicitly documented 10; our practical dynamic count is an upgrade.
- **Direct MP3/AAC/Opus/FLAC export:** upgrade, not parity.
- **General advanced AM/FM/pan matrix:** BWGen documents modulation, but not every modern routing/modulation subtype we propose. Mark as expansion.
- **Automatic headphone detection:** not a BWGen feature and not reliably achievable cross-browser. Replace with test + confirmation.
- **Left/right inversion:** useful modern diagnostic feature, but not counted as confirmed parity unless separately evidenced from original software/docs.

## Preset-library structure observed

Official library categories include Meditation/Relaxation, Sleep/Dreams, Treatment/Healing, Hypnosis/Subliminal, Focus/Alertness, Stimulation/Chakras, Out-of-body experiences, Mastering Astral Projection, Special effects, Experimental/Weird, Miscellaneous, Built-in, and All presets.

The historical library also exposes ratings and comments. These pages are valuable to study composition patterns and UX/community needs, but category names and user descriptions are not scientific validation.

## Official source URLs

- Features: https://www.bwgen.com/features.html
- Version 3.1 features: https://www.bwgen.com/ver31new.html
- FAQ: https://www.bwgen.com/faq.html
- Preset library: https://www.bwgen.com/presets.html
- All presets/index: https://www.bwgen.com/inx_all_dat.html
- How to use `.bwg`: https://www.bwgen.com/preset_using.html
- Download/current legacy version page: https://www.bwgen.com/download.html
