import { createDefaultProject, setCenterBeat, beatOf, carrierOf, touchProject } from '../core/project.js';
import { storageFailureMessage } from '../storage/errors.js';
import { PRESETS } from '../data/presets.js';
import { SOUNDSCAPES } from '../data/soundscapes.js';
import { LiveEngine } from '../audio/liveEngine.js';
import { renderProject } from '../audio/render.js';
import { analyzeStereo, compareAgainstProject } from '../audio/analyze.js';
import { WebGpuAnalyzer } from '../gpu/webgpu.js';
import { exportProjectPackage, importProjectPackageDetailed, recoverModifiedProjectPackage, ModifiedPackageError, sha256 } from '../formats/projectPackage.js';
import { renderWavBlob, renderAiffBlob } from '../formats/streamPcm.js';
import { encodeFlac } from '../formats/flac.js';
import { createDiagnosticChannels, createStemBundle, recipeJson, renderScope, researchManifestJson } from '../formats/exportBundle.js';
import { encodeWav } from '../formats/wav.js';
import { encodeOggOpus, encodeWebmOpus } from '../formats/opus.js';
import { encodeMp3Bundled, encodeOggVorbisBundled } from '../formats/codecAdapters.js';
import { saveProject, loadProjects } from '../storage/projects.js';
import { saveAssetBytes, loadAssetBytes } from '../storage/assets.js';
import { decodeAudioBytes, allowedAudioName } from '../audio/import.js';
import { importBwg, exportBwg, exportBwgPackage } from '../legacy/bwg.js';
import { uid } from '../core/types.js';
import { History } from '../core/history.js';
import { createResearchRun, makeCondition, randomize, logEvent, exportResearchJson, exportResearchCsv } from '../research/session.js';
import { StudioTimelineShell as StudioSurface } from './StudioTimelineShell.js';
import { SettingsSurface, ImportScopeControl } from './SettingsSurface.js';
import { StorageRecoveryControl } from './StorageRecoveryControl.js';
import { LabsSurface } from './LabsSurface.js';
import { LibrarySurface } from './LibrarySurface.js';
import { AnalyzerSurface } from './AnalyzerSurface.js';
import { signer } from '../security/keyStore.js';
import { download, fmt, evidenceClass } from './appUtils.js';
import { NumberField, EvidenceCard, Metric, Spectrum } from './AppPrimitives.js';
const engine = new LiveEngine(), gpu = new WebGpuAnalyzer();
async function loadProjectAssets(p) { const pcm = {}, bytes = {}; for (const a of p.assets) {
    const b = await loadAssetBytes(a.id);
    if (!b)
        continue;
    bytes[a.id] = b;
    try {
        pcm[a.id] = await decodeAudioBytes(b, a.name, a.mime);
    }
    catch { }
} return { pcm, bytes }; }
async function consumeShareTarget(handle) { const q = new URLSearchParams(location.search), token = q.get('share_token'), count = Number(q.get('share_count') || 0); if (!token || !count)
    return; const files = []; for (let i = 0; i < count; i++) {
    const r = await fetch(`./__share_inbox__/${token}/${i}`);
    if (!r.ok)
        continue;
    const name = decodeURIComponent(r.headers.get('x-bbs-filename') || `shared-${i}`), blob = await r.blob();
    files.push(new File([blob], name, { type: blob.type }));
} if (files.length)
    await handle(files); history.replaceState(null, '', location.pathname); }
export function App() {
    const [surface, setSurface] = React.useState('Create');
    const [project, setProjectRaw] = React.useState(() => createDefaultProject('My binaural session'));
    const historyRef = React.useRef(null);
    if (!historyRef.current)
        historyRef.current = new History(project, 120);
    const setProject = (value) => setProjectRaw((prev) => historyRef.current.push(typeof value === 'function' ? value(prev) : value));
    const replaceProject = (next) => { historyRef.current.replace(next); setProjectRaw(structuredClone(next)); };
    const undo = () => { const x = historyRef.current.undo(); if (x)
        setProjectRaw(x); };
    const redo = () => { const x = historyRef.current.redo(); if (x)
        setProjectRaw(x); };
    const [playing, setPlaying] = React.useState(false);
    const [paused, setPaused] = React.useState(false);
    const [analysis, setAnalysis] = React.useState(null);
    const [gpuStatus, setGpuStatus] = React.useState({ active: false, reason: 'Not checked' });
    const [saved, setSaved] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [dragging, setDragging] = React.useState(false);
    const [importScope, setImportScope] = React.useState(sessionStorage.getItem('mindaural.importScope') || 'all-tabs');
    const dragDepth = React.useRef(0);
    const syncChannel = React.useRef(null);
    const tabId = React.useRef(crypto.randomUUID());
    const fileRef = React.useRef(null);
    const playlistRunRef = React.useRef(0);
    React.useEffect(() => { loadProjects().then(setSaved).catch(() => { }); gpu.init().then(setGpuStatus); const theme = localStorage.getItem('bbs.theme') || 'system'; document.documentElement.dataset.theme = theme; if ('BroadcastChannel' in window)
        syncChannel.current = new BroadcastChannel('mindaural-project-sync'); const receive = (e) => { const data = e.data; if (data?.type === 'project-import' && data.sender !== tabId.current && sessionStorage.getItem('mindaural.importScope') !== 'this-tab')
        replaceProject(data.project); }; syncChannel.current?.addEventListener('message', receive); if ('serviceWorker' in navigator)
        navigator.serviceWorker.register('./public/service-worker.js').then(() => consumeShareTarget(handleFiles).catch(e => setMessage(`Shared-file import: ${e instanceof Error ? e.message : e}`))).catch(() => { }); return () => { syncChannel.current?.removeEventListener('message', receive); syncChannel.current?.close(); }; }, []);
    React.useEffect(() => { const key = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
    }
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
    } }; addEventListener('keydown', key); return () => removeEventListener('keydown', key); }, []);
    React.useEffect(() => { const refreshScope = () => setImportScope(sessionStorage.getItem('mindaural.importScope') || 'all-tabs'); addEventListener('mindaural-import-scope', refreshScope); return () => removeEventListener('mindaural-import-scope', refreshScope); }, []);
    const voice = project.voices[0];
    const updateVoice = (patch) => setProject((p) => touchProject({ ...p, voices: [{ ...p.voices[0], ...patch }, ...p.voices.slice(1)] }));
    const changeCenter = (c, b = beatOf(voice)) => setProject((p) => touchProject({ ...p, voices: [setCenterBeat(p.voices[0], c, b), ...p.voices.slice(1)] }));
    const changeBeat = (b, c = carrierOf(voice)) => changeCenter(c, b);
    async function toggle() { try {
        playlistRunRef.current++;
        if (playing) {
            engine.stop();
            setPlaying(false);
            setPaused(false);
        }
        else {
            const loaded = await loadProjectAssets(project);
            await engine.start(project, 0, () => setPlaying(false), loaded.pcm);
            setPlaying(true);
            setPaused(false);
            setMessage(`Live at ${engine.sampleRate || 'device'} Hz`);
        }
    }
    catch (e) {
        setMessage(`Audio: ${e instanceof Error ? e.message : e}`);
    } }
    async function pause() { try {
        await engine.pause();
        setPaused(true);
        setMessage('Playback paused.');
    }
    catch (e) {
        setMessage(`Audio: ${e instanceof Error ? e.message : e}`);
    } }
    async function resume() { try {
        await engine.resume();
        setPaused(false);
        setMessage('Playback resumed.');
    }
    catch (e) {
        setMessage(`Audio: ${e instanceof Error ? e.message : e}`);
    } }
    async function playPlaylist(projects) { if (!projects.length)
        return; engine.stop(); const run = ++playlistRunRef.current; setPlaying(true); const playAt = async (index) => { if (run !== playlistRunRef.current)
        return; if (index >= projects.length) {
        setPlaying(false);
        setMessage('Playlist complete.');
        return;
    } const p = projects[index], loaded = await loadProjectAssets(p); setMessage(`Playlist ${index + 1}/${projects.length} · ${p.title}`); await engine.start(p, 0, () => { void playAt(index + 1); }, loaded.pcm); }; try {
        await playAt(0);
    }
    catch (e) {
        if (run === playlistRunRef.current) {
            setPlaying(false);
            setMessage(e instanceof Error ? e.message : String(e));
        }
    } }
    async function save() { try {
        await saveProject(project);
        setSaved(await loadProjects());
        setMessage('Saved locally.');
    }
    catch (error) {
        setMessage(storageFailureMessage(error, 'save'));
    } }
    async function analyze() { setMessage('Rendering analysis window…'); await new Promise(r => setTimeout(r, 0)); const loaded = await loadProjectAssets(project), p = { ...project, duration: Math.min(project.duration, 4), voices: project.voices.map(v => ({ ...v, duration: Math.min(v.duration, 4) })), segments: project.segments.map(s => ({ ...s, duration: Math.min(s.duration, 4) })) }; const b = renderProject(p, { duration: Math.min(4, p.duration), assets: loaded.pcm }); const a = analyzeStereo(b); a.spectrum = await gpu.spectrum(b.left, b.sampleRate, 256); a.spectrogram = await gpu.spectrogram(b.left, b.sampleRate, 96, Math.min(2048, b.left.length), Math.max(128, Math.floor(Math.min(2048, b.left.length) / 4))); a.backend = a.spectrum.backend; a.integrity = compareAgainstProject(b, p); const dec = Math.max(1, Math.floor(b.left.length / 500)); a.waveformLeft = Array.from(b.left.filter((_, i) => i % dec === 0).slice(0, 500)); a.waveformRight = Array.from(b.right.filter((_, i) => i % dec === 0).slice(0, 500)); setGpuStatus(gpu.getStatus()); setAnalysis(a); setMessage(`Analysis complete using ${a.backend}.`); }
    async function exportAudio(kind, opts = {}) { setMessage('Preparing export…'); await new Promise(r => setTimeout(r, 0)); try {
        const loaded = await loadProjectAssets(project);
        if (kind === 'bbeat' || kind === 'bbeat-signed') {
            const s = kind === 'bbeat-signed' ? signer() : undefined;
            if (kind === 'bbeat-signed' && !s)
                throw new Error('Unlock or create a signing key in Settings first.');
            download(`${project.title}${kind === 'bbeat-signed' ? '-signed' : ''}.bbeat`, await exportProjectPackage(project, loaded.bytes, s), 'application/x-bbeat+zip');
            setMessage(kind === 'bbeat-signed' ? 'Signed self-contained project package exported.' : 'Self-contained project package exported.');
            return;
        }
        if (kind === 'bwg') {
            const x = exportBwg(project);
            if (!x.bytes)
                throw new Error(`BWG lossless export refused: ${x.report.unsupported.join(', ')}`);
            download(`${project.title}.bwg`, x.bytes);
            setMessage('BWG-compatible subset exported.');
            return;
        }
        if (kind === 'bwg-package') {
            const x = exportBwgPackage(project, loaded.pcm);
            if (!x.bytes)
                throw new Error(`BWG companion package refused: ${x.report.unsupported.join(', ')}`);
            download(`${project.title}-bwg-package.zip`, x.bytes, 'application/zip');
            setMessage('BWGen-compatible package with companion WAV assets exported.');
            return;
        }
        if (kind === 'recipe') {
            download(`${project.title}-recipe.json`, new TextEncoder().encode(recipeJson(project)), 'application/json');
            setMessage('Recipe JSON exported.');
            return;
        }
        if (kind === 'manifest') {
            download(`${project.title}-stimulus-manifest.json`, new TextEncoder().encode(researchManifestJson(project)), 'application/json');
            setMessage('Stimulus manifest exported.');
            return;
        }
        if (kind === 'stems') {
            download(`${project.title}-stems.zip`, createStemBundle(project, loaded.pcm), 'application/zip');
            setMessage('Per-track WAV stems exported.');
            return;
        }
        if (kind === 'diagnostic') {
            const d = createDiagnosticChannels(project, loaded.pcm);
            download(`${project.title}-left.wav`, d.left, 'audio/wav');
            download(`${project.title}-right.wav`, d.right, 'audio/wav');
            setMessage('Left/right diagnostic WAVs exported.');
            return;
        }
        if (kind === 'wav-stimulus' || kind === 'wav-background' || kind === 'wav-selection') {
            const scope = kind === 'wav-stimulus' ? 'stimulus' : kind === 'wav-background' ? 'background' : 'full', b = renderScope(project, loaded.pcm, scope, Number(opts.start) || 0, opts.duration == null ? undefined : Number(opts.duration));
            download(`${project.title}-${kind.replace('wav-', '')}.wav`, encodeWav(b, 24), 'audio/wav');
            setMessage(`${kind.replace('wav-', '')} WAV export complete.`);
            return;
        }
        const progress = (x) => setMessage(`Rendering ${kind.toUpperCase()} · ${Math.round(x * 100)}%`);
        if (kind === 'flac') {
            const b = renderProject(project, { assets: loaded.pcm });
            progress(1);
            download(`${project.title}.flac`, encodeFlac(b, 24), 'audio/flac');
            setMessage('FLAC export complete.');
            return;
        }
        if (kind === 'mp3' || kind === 'ogg-vorbis') {
            const b = renderProject(project, { assets: loaded.pcm });
            const bytes = kind === 'mp3' ? await encodeMp3Bundled(b) : await encodeOggVorbisBundled(b);
            download(`${project.title}.${kind === 'mp3' ? 'mp3' : 'ogg'}`, bytes, kind === 'mp3' ? 'audio/mpeg' : 'audio/ogg; codecs=vorbis');
            setMessage(`${kind === 'mp3' ? 'MP3' : 'Ogg Vorbis'} export complete.`);
            return;
        }
        if (kind === 'ogg-opus' || kind === 'webm-opus') {
            const b = renderProject(project, { assets: loaded.pcm });
            const bytes = kind === 'ogg-opus' ? await encodeOggOpus(b) : await encodeWebmOpus(b);
            download(`${project.title}.${kind === 'ogg-opus' ? 'opus' : 'webm'}`, bytes, kind === 'ogg-opus' ? 'audio/ogg; codecs=opus' : 'audio/webm; codecs=opus');
            setMessage(`${kind === 'ogg-opus' ? 'Ogg Opus' : 'WebM Opus'} export complete.`);
            return;
        }
        const blob = kind === 'wav' ? renderWavBlob(project, 24, loaded.pcm, 5, progress) : renderAiffBlob(project, 24, loaded.pcm, 5, progress);
        download(`${project.title}.${kind}`, blob);
        setMessage(`${kind.toUpperCase()} export complete.`);
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : String(e));
    } }
    async function importAudioFile(f, bytes) { if (!allowedAudioName(f.name))
        throw new Error('Unsupported audio type'); const decoded = await decodeAudioBytes(bytes, f.name, f.type), hash = await sha256(bytes), id = `asset-${hash.slice(0, 20)}`; await saveAssetBytes(id, bytes, f.type || 'application/octet-stream', f.name); const next = touchProject({ ...project, assets: project.assets.some(a => a.id === id) ? project.assets : [...project.assets, { id, name: f.name, mime: f.type || 'application/octet-stream', size: bytes.length, hash, license: 'user-owned', source: 'local import' }], audioTracks: [...project.audioTracks, { id: uid('audio'), name: f.name, assetId: id, start: 0, duration: decoded.duration, offset: 0, amplitude: .65, pan: 0, loop: false, fadeIn: .05, fadeOut: .05, mute: false, solo: false }] }); setProject(next); if (importScope === 'all-tabs')
        syncChannel.current?.postMessage({ type: 'project-import', sender: tabId.current, project: next }); setSurface('Studio'); setMessage(`Imported ${f.name} as a timeline audio track${importScope === 'all-tabs' ? ' across open tabs' : ''}.`); }
    async function handleFiles(files) { for (const f of Array.from(files)) {
        let bytes;
        try {
            bytes = new Uint8Array(await f.arrayBuffer());
            if (f.name.toLowerCase().endsWith('.bbeat')) {
                const x = await importProjectPackageDetailed(bytes);
                for (const a of x.project.assets)
                    if (x.assets[a.id])
                        await saveAssetBytes(a.id, x.assets[a.id], a.mime, a.name);
                replaceProject(x.project);
                setSurface('Studio');
                setMessage(`Project imported and ${Object.keys(x.assets).length} embedded assets verified.`);
            }
            else if (f.name.toLowerCase().endsWith('.bwg')) {
                const x = importBwg(bytes);
                replaceProject(x.project);
                setSurface('Studio');
                setMessage(x.report.unsupported.length ? `Imported with compatibility warnings: ${x.report.unsupported.join('; ')}` : 'BWG preset imported.');
            }
            else if (allowedAudioName(f.name)) {
                if (surface === 'Analyzer') {
                    const b = await decodeAudioBytes(bytes, f.name, f.type), a = analyzeStereo(b);
                    a.spectrum = await gpu.spectrum(b.left, b.sampleRate, 256);
                    a.spectrogram = await gpu.spectrogram(b.left, b.sampleRate, 96, Math.min(2048, b.left.length), Math.max(128, Math.floor(Math.min(2048, b.left.length) / 4)));
                    a.backend = a.spectrum.backend;
                    const dec = Math.max(1, Math.floor(b.left.length / 500));
                    a.waveformLeft = Array.from(b.left.filter((_, i) => i % dec === 0).slice(0, 500));
                    a.waveformRight = Array.from(b.right.filter((_, i) => i % dec === 0).slice(0, 500));
                    setAnalysis(a);
                    setMessage(`Analyzed ${f.name}.`);
                }
                else
                    await importAudioFile(f, bytes);
            }
            else
                throw new Error('Unsupported file. AAC/M4A is intentionally excluded.');
        }
        catch (e) {
            if (e instanceof ModifiedPackageError) {
                try {
                    if (!bytes)
                        throw new Error('No package bytes available for recovery');
                    const recovered = await recoverModifiedProjectPackage(bytes);
                    for (const a of recovered.project.assets)
                        if (recovered.assets[a.id])
                            await saveAssetBytes(a.id, recovered.assets[a.id], a.mime, a.name);
                    replaceProject(recovered.project);
                    setSurface('Studio');
                    setMessage(`Modified package recovered with verified session data; rejected entries: ${[e.path, ...recovered.rejected.filter(x => x !== e.path)].join(', ')}`);
                }
                catch (recoveryError) {
                    setMessage(`${f.name}: ${recoveryError instanceof Error ? recoveryError.message : e.message}`);
                }
            }
            else
                setMessage(`${f.name}: ${e instanceof Error ? e.message : e}`);
        }
    } }
    function addSoundscape(id) { const def = SOUNDSCAPES.find(x => x.id === id); if (!def)
        return; setProject((p) => touchProject({ ...p, noiseTracks: [...p.noiseTracks, ...def.layers.map((l, i) => ({ id: uid('noise'), name: `${def.title} ${i + 1}`, kind: l.kind, amplitude: l.amplitude, slopeDbOct: l.slopeDbOct, lowpass: l.lowpass, highpass: l.highpass, stereoCorrelation: l.stereoCorrelation, invertRight: false, start: 0, duration: p.duration, loop: true, mute: false, solo: false }))] })); setMessage(`${def.title} added as procedural background.`); }
    const nav = ['Listen', 'Create', 'Studio', 'Library', 'Analyzer', 'Research', 'Learn', 'Labs', 'Settings'];
    return React.createElement("div", { className: `app${dragging ? ' is-dragging' : ''}`, onDragEnter: (e) => { e.preventDefault(); dragDepth.current++; setDragging(true); }, onDragOver: (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }, onDragLeave: (e) => { e.preventDefault(); dragDepth.current--; if (dragDepth.current <= 0) {
            dragDepth.current = 0;
            setDragging(false);
        } }, onDrop: (e) => { e.preventDefault(); dragDepth.current = 0; setDragging(false); handleFiles(e.dataTransfer.files); } },
        React.createElement("a", { className: "skip-link", href: "#main-content" }, "Skip to editor"),
        dragging && React.createElement("div", { className: "drop-overlay", role: "status", "aria-live": "polite" },
            React.createElement("div", { className: "drop-overlay-card" },
                React.createElement("span", { className: "drop-icon", "aria-hidden": "true" }, "\u2193"),
                React.createElement("strong", null, "Drop to import"),
                React.createElement("span", null, "Audio files, .bbeat projects, and .bwg presets"))),
        React.createElement("header", null,
            React.createElement("div", { className: "global-transport", "aria-label": "Playback controls" },
                React.createElement("button", { onClick: toggle, "aria-label": playing ? "Stop playback" : "Play current project" }, playing ? "■ Stop" : "▶ Play"),
                React.createElement("button", { onClick: pause, disabled: !playing, "aria-label": "Pause playback" }, "\u2161 Pause"),
                React.createElement("button", { onClick: resume, disabled: !playing, "aria-label": "Resume playback" }, "\u25B6 Resume")),
            React.createElement("div", { className: "brand" },
                React.createElement("div", { className: "mark" }, "\u223F"),
                React.createElement("div", null,
                    React.createElement("strong", null, "Mindaural"),
                    React.createElement("span", null, "Scientific audio workstation"))),
            React.createElement("button", { className: "import", onClick: () => fileRef.current?.click() }, "Import"),
            React.createElement("input", { ref: fileRef, hidden: true, type: "file", multiple: true, accept: ".bbeat,.bwg,.wav,.flac,.mp3,.aiff,.ogg,.opus,.webm", onChange: e => e.target.files && handleFiles(e.target.files) })),
        React.createElement("aside", null,
            nav.map(n => React.createElement("button", { key: n, className: surface === n ? 'active' : '', onClick: () => setSurface(n) },
                React.createElement("span", null, icon(n)),
                n)),
            React.createElement("div", { className: "status" },
                React.createElement("i", { className: gpuStatus.active ? 'ok' : '' }),
                React.createElement("span", null, gpuStatus.active ? 'WebGPU active' : 'CPU fallback'))),
        React.createElement("main", { id: "main-content", tabIndex: -1 },
            surface === 'Create' && voice && React.createElement(Create, { project: project, voice: voice, setProject: setProject, changeCenter: changeCenter, changeBeat: changeBeat, updateVoice: updateVoice, onPlay: toggle, playing: playing, onSave: save, onStudio: () => setSurface('Studio'), onSoundscape: addSoundscape }),
            " ",
            surface === 'Create' && !voice && React.createElement(AudioOnlyProject, { project: project, onPlay: toggle, playing: playing, onStudio: () => setSurface('Studio') }),
            " ",
            surface === 'Studio' && React.createElement(Studio, { project: project, setProject: setProject, updateVoice: updateVoice, onPlay: toggle, playing: playing, paused: paused, onSave: save, onExport: exportAudio, onUndo: undo, onRedo: redo, canUndo: historyRef.current.canUndo(), canRedo: historyRef.current.canRedo() }),
            " ",
            surface === 'Listen' && React.createElement(Listen, { setProject: setProject, setSurface: setSurface }),
            " ",
            surface === 'Library' && React.createElement(LibrarySurface, { saved: saved, project: project, setProject: setProject, setSurface: setSurface, setMessage: setMessage, onPlayPlaylist: playPlaylist }),
            " ",
            surface === 'Analyzer' && React.createElement(AnalyzerSurface, { analysis: analysis, onAnalyze: analyze, gpuStatus: gpuStatus }),
            " ",
            surface === 'Research' && React.createElement(Research, { project: project, setMessage: setMessage }),
            " ",
            surface === 'Learn' && React.createElement(Learn, null),
            " ",
            surface === 'Labs' && React.createElement(LabsSurface, { setMessage: setMessage }),
            " ",
            surface === 'Settings' && React.createElement(React.Fragment, null,
                React.createElement(SettingsSurface, { setMessage: setMessage }),
                React.createElement(ImportScopeControl, { setMessage: setMessage }),
                React.createElement(StorageRecoveryControl, { setMessage: setMessage }))),
        React.createElement("footer", null,
            React.createElement("span", null, message || 'Drop .bbeat, .bwg, or audio files anywhere to import.'),
            React.createElement("span", null, voice ? `${fmt(voice.leftHz)} / ${fmt(voice.rightHz)} Hz · Δ ${fmt(beatOf(voice))} Hz` : `Audio-only project · ${project.audioTracks.length} track${project.audioTracks.length === 1 ? '' : 's'}`)));
}
function icon(n) { return { Listen: '▶', Create: '＋', Studio: '≋', Library: '▦', Analyzer: '⌁', Research: '⊙', Learn: '?', Labs: '◇', Settings: '⚙' }[n]; }
function AudioOnlyProject({ project, onPlay, playing, onStudio }) { return React.createElement("section", { className: "page" },
    React.createElement("div", { className: "eyebrow" }, "IMPORTED AUDIO"),
    React.createElement("h1", null, project.title),
    React.createElement("p", { className: "lede" }, "This project contains timeline audio without a generated voice. Open it in Studio to inspect the waveform, playback, and export options."),
    React.createElement("div", { className: "card" },
        React.createElement("b", null,
            project.audioTracks.length,
            " audio track",
            project.audioTracks.length === 1 ? '' : 's'),
        React.createElement("span", null,
            Math.round(project.duration),
            " seconds \u00B7 ",
            project.assets.length,
            " embedded asset",
            project.assets.length === 1 ? '' : 's')),
    React.createElement("div", { className: "actions" },
        React.createElement("button", { className: "primary", onClick: onPlay }, playing ? '■ Stop' : '▶ Play'),
        React.createElement("button", { onClick: onStudio }, "Open in Studio"))); }
function Create({ project, voice, setProject, changeCenter, changeBeat, updateVoice, onPlay, playing, onSave, onStudio, onSoundscape }) { const [advanced, setAdvanced] = React.useState(false); const exact = (side, v) => updateVoice({ [side]: Math.max(.001, v) }); return React.createElement("section", { className: "page create" },
    React.createElement("div", { className: "eyebrow" }, "CREATE"),
    React.createElement("h1", null, "Build a precise stereo session"),
    React.createElement("p", { className: "lede" }, "Choose the acoustic stimulus you want. Goal labels describe intent, not guaranteed physiological outcomes."),
    React.createElement("div", { className: "creator-card" },
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Stimulus"),
            React.createElement("select", { value: voice.type, onChange: e => updateVoice({ type: e.target.value }) },
                React.createElement("option", { value: "binaural" }, "Binaural beat"),
                React.createElement("option", { value: "monaural" }, "Monaural beat"),
                React.createElement("option", { value: "isochronic" }, "Isochronic tone"),
                React.createElement("option", { value: "am" }, "Amplitude modulated"),
                React.createElement("option", { value: "stereo" }, "Independent stereo carriers"),
                React.createElement("option", { value: "noise-modulated" }, "Noise-modulated carrier"),
                React.createElement("option", { value: "sham" }, "Sham / control"))),
        React.createElement("div", { className: "field" },
            React.createElement("label", null,
                "Duration ",
                React.createElement("b", null,
                    Math.round(project.duration / 60),
                    " min")),
            React.createElement("input", { type: "range", min: "1", max: "120", value: project.duration / 60, onChange: e => { const d = Number(e.target.value) * 60; setProject((p) => touchProject({ ...p, duration: d, voices: p.voices.map((v, i) => i ? v : { ...v, duration: d }), noiseTracks: p.noiseTracks.map(n => ({ ...n, duration: Math.max(n.duration, d) })), segments: p.segments.map((s, i) => i ? s : { ...s, duration: d }) })); } })),
        React.createElement("div", { className: "two" },
            React.createElement(NumberField, { label: "Center carrier", value: carrierOf(voice), suffix: "Hz", onChange: changeCenter }),
            React.createElement(NumberField, { label: "Beat difference", value: beatOf(voice), suffix: "Hz", onChange: changeBeat })),
        React.createElement("div", { className: "ears" },
            React.createElement("div", null,
                React.createElement("span", null, "LEFT EAR"),
                React.createElement("strong", null,
                    fmt(voice.leftHz, 2),
                    " Hz")),
            React.createElement("div", { className: "delta" },
                "\u0394 ",
                fmt(beatOf(voice), 2),
                " Hz"),
            React.createElement("div", null,
                React.createElement("span", null, "RIGHT EAR"),
                React.createElement("strong", null,
                    fmt(voice.rightHz, 2),
                    " Hz"))),
        React.createElement("button", { className: "text-button", "aria-expanded": advanced, onClick: () => setAdvanced(!advanced) }, advanced ? 'Hide advanced' : 'Advanced exact controls'),
        advanced && React.createElement("div", { className: "advanced-create" },
            React.createElement("div", { className: "two" },
                React.createElement(NumberField, { label: "Exact left ear", value: voice.leftHz, suffix: "Hz", onChange: (v) => exact('leftHz', v) }),
                React.createElement(NumberField, { label: "Exact right ear", value: voice.rightHz, suffix: "Hz", onChange: (v) => exact('rightHz', v) })),
            React.createElement("div", { className: "two" },
                React.createElement(NumberField, { label: "Fade in", value: voice.fadeIn, suffix: "s", onChange: (v) => updateVoice({ fadeIn: Math.max(0, v) }) }),
                React.createElement(NumberField, { label: "Fade out", value: voice.fadeOut, suffix: "s", onChange: (v) => updateVoice({ fadeOut: Math.max(0, v) }) })),
            React.createElement("div", { className: "field" },
                React.createElement("label", null, "Waveform"),
                React.createElement("select", { value: voice.waveform, onChange: e => updateVoice({ waveform: e.target.value }) }, ['sine', 'sine2', 'triangle', 'square', 'smooth-square', 'saw', 'reverse-saw', 'pulse', 'bandlimited-square', 'bandlimited-saw', 'custom-harmonic'].map(x => React.createElement("option", { key: x, value: x }, x)))),
            React.createElement("div", { className: "field" },
                React.createElement("label", null,
                    "Duty / modulation depth ",
                    React.createElement("b", null,
                        Math.round(voice.duty * 100),
                        "%")),
                React.createElement("input", { type: "range", min: "0.01", max: "0.99", step: "0.01", value: voice.duty, onChange: e => updateVoice({ duty: Number(e.target.value) }) }))),
        React.createElement("div", { className: "field" },
            React.createElement("label", null, "Soundscape"),
            React.createElement("select", { defaultValue: "", onChange: e => { if (e.target.value)
                    onSoundscape(e.target.value); e.target.value = ""; } },
                React.createElement("option", { value: "" }, "Add optional background\u2026"),
                SOUNDSCAPES.map(s => React.createElement("option", { value: s.id, key: s.id }, s.title)))),
        React.createElement("div", { className: "field" },
            React.createElement("label", null,
                "Level ",
                React.createElement("b", null,
                    Math.round(voice.amplitude * 100),
                    "%")),
            React.createElement("input", { type: "range", min: "0", max: "0.4", step: "0.005", value: voice.amplitude, onChange: e => updateVoice({ amplitude: Number(e.target.value) }) })),
        React.createElement("div", { className: "actions" },
            React.createElement("button", { className: "primary", onClick: onPlay }, playing ? '■ Stop' : '▶ Play'),
            React.createElement("button", { onClick: onSave }, "Save"),
            React.createElement("button", { onClick: onStudio }, "Open in Studio"))),
    React.createElement(EvidenceCard, { state: project.evidence.state, claim: project.evidence.claim })); }
function Studio(props) { return React.createElement(StudioSurface, { ...props }); }
function Listen({ setProject, setSurface }) { return React.createElement("section", { className: "page" },
    React.createElement("div", { className: "eyebrow" }, "LISTEN"),
    React.createElement("h1", null, "Start with a transparent preset"),
    React.createElement("div", { className: "card-grid" }, PRESETS.slice(0, 12).map(p => React.createElement("article", { className: "preset", key: p.id },
        React.createElement("div", null,
            React.createElement("span", { className: `badge ${evidenceClass(p.evidence.state)}` }, p.evidence.state),
            React.createElement("h3", null, p.title),
            React.createElement("p", null, p.description)),
        React.createElement("div", { className: "preset-foot" },
            React.createElement("span", null,
                Math.round(p.duration / 60),
                " min \u00B7 ",
                fmt(Math.abs(p.project.voices[0].rightHz - p.project.voices[0].leftHz)),
                " Hz"),
            React.createElement("button", { onClick: () => { setProject(structuredClone(p.project)); setSurface('Create'); } }, "Use")))))); }
function Library({ saved, setProject, setSurface }) { const [q, setQ] = React.useState(''); const all = PRESETS.filter(p => (p.title + ' ' + p.tags.join(' ')).toLowerCase().includes(q.toLowerCase())); return React.createElement("section", { className: "page" },
    React.createElement("div", { className: "eyebrow" }, "LIBRARY"),
    React.createElement("h1", null, "Research, curated, community, and yours"),
    React.createElement("input", { className: "search", placeholder: "Search presets", value: q, onChange: e => setQ(e.target.value) }),
    React.createElement("h2", null, "My Library"),
    React.createElement("div", { className: "mini-list" }, saved.length ? saved.map((p) => React.createElement("button", { key: p.id, onClick: () => { setProject(p); setSurface('Studio'); } },
        React.createElement("b", null, p.title),
        React.createElement("span", null,
            "rev ",
            p.revision))) : React.createElement("p", null, "No local saves yet.")),
    React.createElement("h2", null,
        "Built in \u00B7 ",
        all.length),
    React.createElement("div", { className: "card-grid compact" }, all.map(p => React.createElement("article", { className: "preset", key: p.id },
        React.createElement("div", null,
            React.createElement("span", { className: "collection" }, p.collection),
            React.createElement("h3", null, p.title),
            React.createElement("p", null, p.description)),
        React.createElement("button", { onClick: () => { setProject(structuredClone(p.project)); setSurface('Studio'); } }, "Open"))))); }
function Analyzer({ analysis, onAnalyze, gpuStatus }) { return React.createElement("section", { className: "page" },
    React.createElement("div", { className: "eyebrow" }, "ANALYZER"),
    React.createElement("h1", null, "Verify the signal, not the label"),
    React.createElement("p", { className: "lede" }, "Render the current project or drop a WAV file anywhere. Results for mixed audio are confidence-based rather than categorical."),
    React.createElement("button", { className: "primary", onClick: onAnalyze }, "Analyze current session"),
    analysis && React.createElement("div", { className: "analysis-grid" },
        React.createElement(Metric, { k: "Left carrier", v: `${fmt(analysis.dominantLeftHz, 2)} Hz` }),
        React.createElement(Metric, { k: "Right carrier", v: `${fmt(analysis.dominantRightHz, 2)} Hz` }),
        React.createElement(Metric, { k: "Difference", v: `${fmt(analysis.differenceHz, 2)} Hz` }),
        React.createElement(Metric, { k: "Stereo correlation", v: fmt(analysis.correlation, 3) }),
        React.createElement(Metric, { k: "Peak L/R", v: `${fmt(analysis.peakLeft, 3)} / ${fmt(analysis.peakRight, 3)}` }),
        React.createElement(Metric, { k: "Backend", v: analysis.backend }),
        React.createElement("div", { className: "analysis-summary" },
            React.createElement("b", null, analysis.classification),
            React.createElement("span", null,
                "Confidence ",
                Math.round(analysis.confidence * 100),
                "%")),
        React.createElement(Spectrum, { spectrum: analysis.spectrum })),
    React.createElement("div", { className: "technical" },
        React.createElement("b", null, "Compute status"),
        React.createElement("span", null,
            gpuStatus.active ? 'WebGPU active' : 'CPU reference fallback',
            gpuStatus.reason ? ` · ${gpuStatus.reason}` : ''))); }
function Research({ project, setMessage }) { const [run, setRun] = React.useState(() => createResearchRun(project)); const [reveal, setReveal] = React.useState(false); const [rt, setRt] = React.useState('idle'); const goAt = React.useRef(0); const startReaction = () => { if (rt !== 'idle')
    return; setRt('waiting'); setRun((r) => logEvent(r, 'reaction-wait')); setTimeout(() => { goAt.current = performance.now(); setRt('go'); }, 800 + Math.random() * 1700); }; const hit = () => { if (rt === 'waiting') {
    setRun((r) => logEvent(r, 'reaction-early'));
    setRt('idle');
    return;
} if (rt === 'go') {
    const ms = Math.round(performance.now() - goAt.current);
    setRun((r) => logEvent({ ...r, reactionTimesMs: [...r.reactionTimesMs, ms] }, 'reaction', { ms }));
    setRt('idle');
} }; const addB = () => setRun((r) => { const c = makeCondition('B', project), conditions = [...r.conditions.filter((x) => x.role !== 'B'), c]; return { ...r, conditions, order: randomize(conditions.map((x) => x.id)) }; }); const dl = (name, text, type) => download(name, new Blob([text], { type })); return React.createElement("section", { className: "page" },
    React.createElement("div", { className: "eyebrow" }, "RESEARCH"),
    React.createElement("h1", null, "Build blinded A/B/control sessions"),
    React.createElement("p", { className: "lede" }, "Exploratory protocol tooling. Participant responses remain local/export-only by default; this is not a clinical measurement system."),
    React.createElement("div", { className: "research-toolbar" },
        React.createElement("button", { onClick: addB }, "Use current project as B"),
        React.createElement("button", { onClick: () => setRun((r) => ({ ...r, order: randomize(r.conditions.map((x) => x.id)) })) }, "Randomize order"),
        React.createElement("button", { onClick: () => setReveal(!reveal) }, reveal ? 'Hide roles' : 'Reveal roles')),
    React.createElement("div", { className: "condition-grid" }, run.order.map((id, index) => { const c = run.conditions.find((x) => x.id === id); return React.createElement("article", { className: "condition", key: id },
        React.createElement("span", null,
            "Condition ",
            index + 1),
        React.createElement("strong", null, c.blindLabel),
        React.createElement("p", null, reveal ? `${c.role.toUpperCase()} · ${c.project.title}` : 'Blinded condition'),
        React.createElement("button", { onClick: async () => { const loaded = await loadProjectAssets(c.project); await engine.start(c.project, 0, undefined, loaded.pcm); setRun((r) => logEvent(r, 'condition-play', { conditionId: id, blindLabel: c.blindLabel })); setMessage(`Playing blinded condition ${c.blindLabel}`); } }, "\u25B6 Play")); })),
    React.createElement("div", { className: "research-form" },
        React.createElement("label", null,
            "Pre-session neutral rating ",
            React.createElement("b", null, run.preRating),
            React.createElement("input", { type: "range", min: "0", max: "100", value: run.preRating, onChange: e => setRun((r) => ({ ...r, preRating: Number(e.target.value) })) })),
        React.createElement("label", null,
            "Post-session neutral rating ",
            React.createElement("b", null, run.postRating),
            React.createElement("input", { type: "range", min: "0", max: "100", value: run.postRating, onChange: e => setRun((r) => ({ ...r, postRating: Number(e.target.value) })) })),
        React.createElement("label", null,
            "Notes",
            React.createElement("textarea", { value: run.notes, onChange: e => setRun((r) => ({ ...r, notes: e.target.value })) }))),
    React.createElement("div", { className: "reaction-card" },
        React.createElement("h3", null, "Reaction-time task"),
        React.createElement("p", null, "Optional simple behavioral hook. Run several trials under the same protocol."),
        React.createElement("button", { className: rt === 'go' ? 'primary reaction-go' : '', onClick: rt === 'idle' ? startReaction : hit }, rt === 'idle' ? 'Start trial' : rt === 'waiting' ? 'Wait…' : 'CLICK'),
        React.createElement("span", null, run.reactionTimesMs.length ? `Last: ${run.reactionTimesMs.at(-1)} ms · n=${run.reactionTimesMs.length}` : 'No trials yet')),
    React.createElement("div", { className: "actions" },
        React.createElement("button", { onClick: () => dl(`research-${run.id}.json`, exportResearchJson(run), 'application/json') }, "Export JSON + stimulus manifests"),
        React.createElement("button", { onClick: () => dl(`research-${run.id}.csv`, exportResearchCsv(run), 'text/csv') }, "Export CSV"))); }
function Learn() { return React.createElement("section", { className: "page" },
    React.createElement("div", { className: "eyebrow" }, "LEARN"),
    React.createElement("h1", null, "What binaural beats actually are"),
    React.createElement("div", { className: "learn-grid" },
        React.createElement("article", null,
            React.createElement("h3", null, "1. Acoustic setup"),
            React.createElement("p", null, "Two separate tones are delivered to the ears. A 395 Hz left tone and 405 Hz right tone have a 10 Hz frequency difference. The application does not inject a 10 Hz audible tone into either channel.")),
        React.createElement("article", null,
            React.createElement("h3", null, "2. Perception"),
            React.createElement("p", null, "The binaural beat is an auditory percept arising from binaural processing. Separate channels are therefore part of the stimulus definition.")),
        React.createElement("article", null,
            React.createElement("h3", null, "3. Neural response"),
            React.createElement("p", null, "Frequency-following neural responses have been observed under some protocols, but results vary with stimulus parameters and methodology.")),
        React.createElement("article", null,
            React.createElement("h3", null, "4. Outcomes"),
            React.createElement("p", null, "Relaxation, attention, sleep, pain, anxiety, and memory findings are heterogeneous. The app labels evidence rather than promising a mental state from a frequency."))),
    React.createElement("div", { className: "citation-box" },
        React.createElement("b", null, "Research rule"),
        React.createElement("p", null, "Research presets preserve the actual published left/right frequencies, timing, masking, and control conditions when those details are available."))); }
//# sourceMappingURL=App.js.map