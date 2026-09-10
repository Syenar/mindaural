# Source implementation

Production implementation lives under this directory.

Locked architecture:
- React + TypeScript application UI.
- Shared TypeScript signal math is authoritative.
- AudioWorklet executes deterministic real-time synthesis without GPU synchronization.
- WebGPU is the primary accelerator for parallel analysis/offline DSP with a CPU reference/fallback.
- Codec WebAssembly modules are isolated encode/decode dependencies only and are not the DSP architecture.
- Project-owned TypeScript WAV/AIFF and WebM/EBML container code.
- AAC/M4A is excluded.
- FFmpeg is prohibited in application code, build tooling, conversion/export paths, and validation tests.
