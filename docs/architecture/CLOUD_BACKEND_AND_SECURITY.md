# Cloud Backend, Sharing, and Security Architecture

## Scope and principle

Core synthesis, editing, analysis, rendering, local projects, and file export remain fully usable without an account or network connection. Cloud services exist only for hosted share links, synchronization, community publishing, ratings/reviews, favorites, moderation, and account-bound signing identity.

The first-wave backend is **Supabase**: PostgreSQL, Auth, Storage, Realtime where useful, and narrowly scoped server/edge functions. Supabase is open source and commercially usable; the main repository is Apache-2.0 and `supabase-js` is MIT. A managed deployment may have ordinary hosting/usage charges, but no paid software license is required and self-hosting remains possible.

## Authentication

First-wave account methods:

- email/password;
- email magic-link/passwordless sign-in;
- verified email required before public community publishing, reviewing, or reporting.

Local-only use requires no account. Social-login providers are not required for first release.

## Data model

Authoritative cloud entities:

- `profiles`: public display name, avatar reference, moderation status, public signing key(s);
- `projects`: owner, visibility, title, current version pointer;
- `project_versions`: immutable session/package metadata snapshot, schema/engine version, SHA-256, parent version/fork lineage;
- `assets`: owner, storage object, SHA-256, size/type, visibility, license/provenance fields;
- `published_presets`: immutable published version reference, category, evidence state, citation references, moderation state;
- `share_links`: random high-entropy token/hash, target version, owner, permission, optional expiration/revocation;
- `reviews`: one current rating/review per user per published preset plus edit history;
- `favorites`;
- `reports`: reporting user, target, reason, status, moderation audit trail;
- `research_citations`: normalized DOI/PMID/source metadata used by research presets.

Research participant/event data is **local/export-only by default** and is not synchronized to the community backend in first release.

## Authorization and storage

PostgreSQL Row Level Security is mandatory on every user-owned table. Deny-by-default policies are tested in CI. Users can read/write their own private projects/assets; public content is readable only after publication; moderation privileges are server-side roles and never client claims.

Storage buckets are private by default. Private assets use short-lived signed URLs. Public community assets are copied/marked public only after rights/provenance validation. First-release public media is limited to uploader-owned material or CC0; other third-party licenses are not accepted for hosted public assets. Service-role credentials never ship to the browser.

## Sharing modes

1. **Portable file:** `.bbeat` shared outside the service; no account required.
2. **Private hosted link:** immutable project-version link with viewer/download permission, revocable and optionally expiring.
3. **Public community preset:** published immutable version with author, provenance, evidence label, compatibility status, ratings/reviews, and fork lineage.

A share link points to a specific version, not a mutable working project, so recipients get reproducible content. Republishing creates a new immutable version.

## Public-content rights policy

Public community publishing permits only:

- recipe-only sessions with no redistributable third-party media;
- project-owned audio;
- CC0 audio with stored provenance;
- audio/text/media created and owned by the publishing user, after an explicit rights declaration.

The bundled application library itself remains project-owned/procedural or CC0 only. Imported copyrighted commercial music cannot silently become a public hosted asset. Private package export warns that the user is responsible for redistribution rights.

First release includes Terms, Privacy Notice, Community Guidelines, copyright/takedown contact/process, report workflow, and account/data deletion/export controls.

## Package and upload security

Untrusted `.bbeat`, `.bwg`, and audio inputs are handled as hostile:

- validate magic bytes/structure rather than trusting filename or MIME type;
- reject absolute paths, `..`, symlinks, duplicate canonical paths, and path traversal in ZIP packages;
- cap entry count, manifest size, expanded size, compression ratio, asset size, project duration metadata, and decoder memory;
- stream/decode in dedicated workers;
- fuzz `.bwg`, package, PCM/container, and metadata parsers;
- never execute scripts/content from an imported project;
- sanitize user text before display;
- server stores uploaded media/package bytes as data and does not invoke FFmpeg or execute user-controlled media parsers;
- previews used for public pages are generated client-side from our own renderer/encoders and uploaded as ordinary validated assets.

Rate limits apply to authentication attempts, publishing, reviews, reports, share-link creation, downloads, and storage.

## Package signing identity

Signed `.bbeat` packages use Ed25519 via the browser Web Crypto API; signing keys remain client-side.

- a user may generate a local signing key from browser cryptographic randomness;
- the 32-byte private seed is never uploaded;
- if persistence is requested, the private seed is encrypted locally with Web Crypto PBKDF2-SHA-256 + AES-GCM using a user passphrase;
- the public key/fingerprint may be bound to a verified account;
- verification states are `unsigned`, `valid-unbound`, `valid-account-bound`, `invalid`, and `modified`;
- a signature proves control of the signing key, not legal identity by itself.

The signed payload is a canonical UTF-8 manifest containing schema version plus SHA-256 hashes/sizes of package entries. Verification occurs before an imported project is trusted.

## Privacy

No microphone, health record, biometric, or precise-location permission is needed for the product. Analytics, if enabled, must be privacy-minimized and cannot upload project audio or research responses without explicit opt-in. Account deletion removes or anonymizes data according to the published retention policy; public forks derived by other users remain as separate versions with lineage attribution where legally appropriate.

## Acceptance tests

First public release must pass:

- Row Level Security positive/negative authorization matrix;
- cross-account access-denial tests;
- private/public/share-link expiration and revocation tests;
- malicious ZIP/path traversal/zip-bomb corpus;
- XSS/sanitization tests for titles, descriptions, reviews, and legacy metadata;
- rate-limit tests;
- account export/delete tests;
- immutable version and fork-lineage tests;
- public-asset license/provenance enforcement;
- signature binding/verification states;
- offline/local operation with backend unavailable.
