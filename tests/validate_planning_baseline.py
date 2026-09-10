from pathlib import Path
import hashlib, json, re, sys
ROOT=Path(__file__).resolve().parents[1]
errors=[]

required=[
 'README.md','PROJECT_STATE.md','PROJECT_MANIFEST.json','docs/00_MASTER_PLAN.md',
 'docs/science/SCIENCE_FOUNDATION.md','docs/science/SYNTHESIS_PROTOCOL.md','docs/science/EVIDENCE_MATRIX.md','docs/science/RESEARCH_BIBLIOGRAPHY.md',
 'docs/reference/BWGEN_FEATURE_AUDIT.md','docs/reference/BWGEN_PRESET_LIBRARY_AUDIT.md',
 'docs/architecture/AUDIO_ENGINE_SPEC.md','docs/architecture/WEB_PLATFORM_ARCHITECTURE.md','docs/architecture/FILE_FORMATS_AND_PROJECT_PACKAGE.md',
 'docs/architecture/CLOUD_BACKEND_AND_SECURITY.md','docs/legal/LICENSING_STRATEGY.md',
 'docs/safety/SAFETY_CLAIMS_AND_EVIDENCE_POLICY.md','docs/ux/UX_AND_INFORMATION_ARCHITECTURE.md',
 'docs/audits/AUDIT_LOG.md','docs/audits/CLEAN_PASS_CHECKLIST.md',
 'tests/SIGNAL_VALIDATION_PLAN.md','tests/FEATURE_PARITY_CHECKLIST.md','research/source_index.json','schemas/session.schema.json']
for rel in required:
    if not (ROOT/rel).is_file(): errors.append(f'missing required file: {rel}')

# JSON/schema validity.
json_docs={}
for rel in ['research/source_index.json','schemas/session.schema.json','PROJECT_MANIFEST.json']:
    try: json_docs[rel]=json.loads((ROOT/rel).read_text(encoding='utf-8'))
    except Exception as exc: errors.append(f'invalid JSON {rel}: {exc}')
try:
    from jsonschema import Draft202012Validator
    Draft202012Validator.check_schema(json_docs.get('schemas/session.schema.json',{}))
except ImportError:
    errors.append('jsonschema package unavailable; cannot validate Draft 2020-12 session schema')
except Exception as exc:
    errors.append(f'invalid Draft 2020-12 session schema: {exc}')

# Relative markdown links.
for p in ROOT.rglob('*.md'):
    txt=p.read_text(encoding='utf-8')
    for target in re.findall(r'\[[^\]]+\]\(([^)]+\.md(?:#[^)]+)?)\)',txt):
        target=target.split('#',1)[0]
        if '://' in target: continue
        q=(p.parent/target).resolve()
        if not q.exists(): errors.append(f'broken local link {p.relative_to(ROOT)} -> {target}')

master=(ROOT/'docs/00_MASTER_PLAN.md').read_text(encoding='utf-8')
science=(ROOT/'docs/science/SCIENCE_FOUNDATION.md').read_text(encoding='utf-8')
engine=(ROOT/'docs/architecture/AUDIO_ENGINE_SPEC.md').read_text(encoding='utf-8')
webarch=(ROOT/'docs/architecture/WEB_PLATFORM_ARCHITECTURE.md').read_text(encoding='utf-8')
fileformats=(ROOT/'docs/architecture/FILE_FORMATS_AND_PROJECT_PACKAGE.md').read_text(encoding='utf-8')
lic=(ROOT/'docs/legal/LICENSING_STRATEGY.md').read_text(encoding='utf-8')
state=(ROOT/'PROJECT_STATE.md').read_text(encoding='utf-8')
backend=(ROOT/'docs/architecture/CLOUD_BACKEND_AND_SECURITY.md').read_text(encoding='utf-8')
parity=(ROOT/'docs/reference/BWGEN_FEATURE_AUDIT.md').read_text(encoding='utf-8')
assets=(ROOT/'assets/reference/README.md').read_text(encoding='utf-8')
combined='\n'.join([master,engine,webarch,fileformats,lic,state,backend])

# Science overclaim guards.
affirmative_banned=[
 (master, r'Headphones detected\s*[✓✔]', 'automatic headphone detection claim'),
 (master, r'live[^\n]{0,50}(?:supports|guarantees)[^\n]{0,20}192\s*kHz', 'portable 192 kHz live claim'),
 (master+science, r'400 Hz (?:is|as) the universal (?:best|optimal)', 'universal 400 Hz optimum claim'),
 (master+science, r'(?:alpha|theta|beta|gamma)[^\n]{0,30}(?:causes|guarantees|forces)[^\n]{0,40}(?:relaxation|meditation|focus|sleep)', 'EEG band outcome guarantee'),
]
for txt,pat,label in affirmative_banned:
    if re.search(pat,txt,re.I): errors.append(label)
if '42349368' not in science or 'fatima-2026' not in json.dumps(json_docs.get('research/source_index.json',{})):
    errors.append('2026 theta systematic review missing from local science cache')

# BWGen reference parity concepts and no current importer placeholder.
for term in ['context-sensitive','background phase shift','background interval','noise modulation','audiostrobe signal waveform/duty-cycle','ratings/comments','10 simultaneous voices','mandatory first-wave','compatible-subset exporter']:
    if term not in parity.lower(): errors.append(f'parity concept missing: {term}')
if re.search(r'feasibility gate|desirable|later gate', parity, re.I): errors.append('BWGen importer still contains a current planning gate/soft commitment')

# Locked architecture choices.
for term in ['TypeScript','React','WebGPU','AudioWorklet','WebdriverIO','Emscripten','Supabase','Lucide','dr_mp3']:
    if term not in combined: errors.append(f'locked architecture concept missing: {term}')
for codec in ['WAV','AIFF','FLAC','MP3','Ogg Vorbis','Ogg Opus','WebM Opus']:
    if codec not in master or codec not in state: errors.append(f'locked codec missing from plan/state: {codec}')
for term,label in [
 ('project-owned TypeScript audio-only WebM/EBML','project-owned WebM/EBML muxer/demuxer'),
 ('Row Level Security','cloud authorization model'),
 ('at least 24','measurable soundscape count'),
 ('30+ first-party','measurable first-party preset count'),
 ('Web Crypto','package signing implementation'),
 ('PBKDF2','local signing-key encryption KDF'),
 ('AES-GCM','local signing-key encryption cipher')]:
    if term.lower() not in combined.lower(): errors.append(f'missing locked detail: {label}')

# Stale/contradictory implementation placeholders in current authoritative docs (audit log may quote old findings).
current_docs='\n'.join([master,engine,webarch,fileformats,lic,state,backend,parity,assets])
stale_rust = [line for line in current_docs.splitlines() if re.search(r'authoritative[^\n]{0,80}Rust|Rust/WebAssembly[^\n]{0,80}(?:DSP|synthesis|analysis)', line, re.I) and not re.search(r'not a Rust|No Rust|no Rust|not .*Rust/WebAssembly', line, re.I)]
if stale_rust:
    errors.append('stale Rust/WebAssembly DSP architecture remains in current authoritative docs')
if 'WebGPU' not in engine or 'AudioWorklet' not in engine or 'CPU reference' not in engine:
    errors.append('WebGPU/AudioWorklet/CPU-reference architecture incomplete')
for pat,label in [
 (r'Browser tests\s*\|\s*Playwright', 'Playwright still selected as browser test dependency'),
 (r'fft\.js', 'fft.js still selected in current plan'),
 (r'separately audited WebM', 'WebM implementation still unspecified'),
 (r'subjective scales where licensing permits', 'research scale licensing still unresolved'),
 (r'example\.invalid', 'placeholder schema URL remains'),
 (r'application/vnd\.binauralbeatstudio', 'unregistered vendor MIME claim remains'),
]:
    if re.search(pat,current_docs,re.I): errors.append(label)

# AAC/M4A is wholly excluded, not merely no bundled encoder.
if not re.search(r'AAC/M4A[^\n]{0,80}(?:import/export|import and export)[^\n]{0,40}(?:excluded|unsupported|omitted)', combined, re.I):
    errors.append('AAC/M4A full import/export exclusion missing')
for pat in [r'natively decode an AAC', r'native AAC/M4A decoder may', r'opportunistic[^\n]{0,30}AAC']:
    if re.search(pat,current_docs,re.I): errors.append('opportunistic AAC/M4A import remains in current plan')

# FFmpeg policy + no active project dependency/tool path.
if 'FFmpeg is prohibited' not in lic or 'FFmpeg is prohibited' not in engine:
    errors.append('FFmpeg prohibition missing from licensing/engine docs')
for p in ROOT.rglob('*'):
    if p.is_file() and 'ffmpeg' in p.name.lower(): errors.append(f'FFmpeg-named project artifact present: {p.relative_to(ROOT)}')
# We allow explanatory mentions of Playwright only when explicitly excluded; no package lock/manifests may select it.
for p in [ROOT/'package.json',ROOT/'package-lock.json',ROOT/'pnpm-lock.yaml',ROOT/'yarn.lock',ROOT/'Cargo.toml']:
    if p.exists():
        txt=p.read_text(encoding='utf-8',errors='ignore')
        if re.search(r'playwright|ffmpeg',txt,re.I): errors.append(f'prohibited dependency reference in {p.name}')

# Backend/security completeness.
for term in ['share_links','immutable','private by default','Row Level Security','signed URLs','path traversal','compression ratio','rate limit','account/data deletion','research participant']:
    if term.lower() not in backend.lower(): errors.append(f'backend/security concept missing: {term}')

# Asset + research tool licensing completeness.
if not re.search(r'at least 24',assets,re.I): errors.append('24+ bundled soundscape commitment missing from asset policy')
if not re.search(r'30\+ first-party|at least 30 first-party', master, re.I): errors.append('30+ first-party preset commitment missing')
if 'CC0' not in assets: errors.append('CC0 asset rule missing')
if 'project-authored neutral pre/post self-report sliders' not in master: errors.append('research self-report instrument decision missing')
if not re.search(r'\.bwg[^\n]{0,100}(?:export|exporter)', master, re.I): errors.append('legacy .bwg exporter missing from master plan')
if 'application/x-bbeat+zip' not in fileformats: errors.append('private .bbeat MIME hint missing')

# First-wave/no deferred scope.
if 'There is no Phase 2/deferred-feature list' not in state: errors.append('no-deferred feature rule missing from project state')
for n in range(1,18):
    if not re.search(rf'^\s*{n}\.\s', master, re.M): errors.append(f'first-wave dependency-order item {n} missing')

# Session schema must be build-oriented rather than permissive stub.
schema_txt=(ROOT/'schemas/session.schema.json').read_text(encoding='utf-8')
for term in ['urn:mindaural','automationPoint','provenance','evidence','segments','assets']:
    if term not in schema_txt: errors.append(f'session schema concept missing: {term}')
if 'planning draft' in schema_txt.lower() or 'example.invalid' in schema_txt.lower(): errors.append('session schema still marked as placeholder')

# Clean checklist consistency.
clean=(ROOT/'docs/audits/CLEAN_PASS_CHECKLIST.md').read_text(encoding='utf-8')
if re.search(r'\|\s*FAIL\s*\|',clean): errors.append('clean checklist contains FAIL row')
for term in ['Cloud/share/community','MP3 fallback','WebM container','FFmpeg prohibition','Session schema']:
    if term not in clean: errors.append(f'clean checklist missing deep-pass area: {term}')

# Manifest exactness. Manifest intentionally excludes itself.
manifest=json_docs.get('PROJECT_MANIFEST.json',{})
listed={x.get('path'):(x.get('bytes'),x.get('sha256')) for x in manifest.get('files',[]) if isinstance(x,dict)}
actual={}
for p in ROOT.rglob('*'):
    if p.is_file() and p.name!='PROJECT_MANIFEST.json' and '__pycache__' not in p.parts and 'dist' not in p.parts:
        b=p.read_bytes(); actual[p.relative_to(ROOT).as_posix()]=(len(b),hashlib.sha256(b).hexdigest())
if set(listed)!=set(actual):
    errors.append(f'manifest file-set mismatch: missing={sorted(set(actual)-set(listed))}, extra={sorted(set(listed)-set(actual))}')
else:
    for rel,v in actual.items():
        if listed.get(rel)!=v: errors.append(f'manifest hash/size mismatch: {rel}')

print(f'Planning baseline files: {sum(1 for p in ROOT.rglob("*") if p.is_file() and "__pycache__" not in p.parts)}')
print(f'Checks failed: {len(errors)}')
for e in errors: print('FAIL:',e)
sys.exit(1 if errors else 0)
