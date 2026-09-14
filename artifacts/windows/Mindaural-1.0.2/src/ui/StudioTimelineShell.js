import { createVoice, touchProject } from '../core/project.js';
import { uid } from '../core/types.js';
import { StudioTimelineSurface } from './StudioTimelineSurface.js';
const beatPresets = [1, 2, 4, 6, 8, 10, 12, 20, 30];
function EarLinkControl({ project, setProject }) {
    const [voiceId, setVoiceId] = React.useState(project.voices[0]?.id || '');
    const [linked, setLinked] = React.useState(false);
    const [mode, setMode] = React.useState('custom');
    const [target, setTarget] = React.useState(null);
    const voice = project.voices.find((v) => v.id === voiceId) || project.voices[0];
    React.useEffect(() => {
        const main = document.querySelector('main') || document.body;
        const sync = () => {
            const inspector = Array.from(document.querySelectorAll('.studio-inspector')).find(x => x.querySelector('h3'));
            if (!inspector) {
                setTarget(null);
                return;
            }
            const heading = inspector.querySelector('h3')?.textContent || '';
            const selected = project.voices.find((v) => v.name === heading);
            if (!selected) {
                setTarget(null);
                return;
            }
            setVoiceId(selected.id);
            let slot = inspector.querySelector('.ear-link-inline-slot');
            if (!slot) {
                slot = document.createElement('div');
                slot.className = 'ear-link-inline-slot';
                const fields = Array.from(inspector.querySelectorAll('.studio-field'));
                const rightField = fields.find(x => x.textContent?.trim().startsWith('Right ear'));
                rightField?.after(slot);
            }
            setTarget(slot);
        };
        sync();
        const observer = new MutationObserver(sync);
        observer.observe(main, { childList: true, subtree: true, characterData: true });
        return () => observer.disconnect();
    }, [project.voices]);
    React.useEffect(() => {
        if (!target || !voice || !linked)
            return;
        const inspector = target.closest('.studio-inspector');
        const fields = Array.from(inspector?.querySelectorAll('.studio-field') || []);
        const left = fields.find(x => x.textContent?.trim().startsWith('Left ear'))?.querySelector('input');
        const right = fields.find(x => x.textContent?.trim().startsWith('Right ear'))?.querySelector('input');
        const signedBeat = voice.rightHz - voice.leftHz;
        const changeLeft = (event) => { const value = Number(event.target.value); if (Number.isFinite(value))
            patchVoice({ leftHz: value, rightHz: value + signedBeat }); };
        const changeRight = (event) => { const value = Number(event.target.value); if (Number.isFinite(value))
            patchVoice({ rightHz: value, leftHz: value - signedBeat }); };
        left?.addEventListener('input', changeLeft, true);
        right?.addEventListener('input', changeRight, true);
        return () => { left?.removeEventListener('input', changeLeft, true); right?.removeEventListener('input', changeRight, true); };
    }, [target, voice?.id, voice?.leftHz, voice?.rightHz, linked]);
    if (!voice || !target)
        return null;
    const signedBeat = voice.rightHz - voice.leftHz;
    const beat = Math.abs(signedBeat);
    const patchVoice = (next) => setProject((p) => touchProject({ ...p, voices: p.voices.map(v => v.id === voice.id ? { ...v, ...next } : v) }));
    const setBeat = (value) => patchVoice({ rightHz: voice.leftHz + (signedBeat < 0 ? -value : value) });
    const choose = (value) => { setMode(value); if (value !== 'custom')
        setBeat(Number(value)); };
    const toggle = (checked) => { setLinked(checked); if (checked)
        setMode(beatPresets.includes(Number(beat.toFixed(2))) ? String(Number(beat.toFixed(2))) : 'custom'); };
    return ReactDOM.createPortal(React.createElement("section", { className: `ear-link-inline ${linked ? 'linked' : ''}`, "aria-label": "Preserve binaural beat difference" },
        React.createElement("div", { className: "ear-link-inline-head" },
            React.createElement("div", null,
                React.createElement("b", null, "Preserve beat difference"),
                React.createElement("small", null,
                    beat.toFixed(2),
                    " Hz between ears")),
            React.createElement("label", { className: "switch-label" },
                React.createElement("input", { type: "checkbox", checked: linked, onChange: e => toggle(e.target.checked) }),
                React.createElement("span", null, linked ? 'On' : 'Off'))),
        linked && React.createElement(React.Fragment, null,
            React.createElement("label", { className: "ear-preset" },
                React.createElement("span", null, "Beat difference"),
                React.createElement("select", { "aria-label": "Beat difference preset", value: mode, onChange: e => choose(e.target.value) },
                    beatPresets.map(x => React.createElement("option", { key: x, value: x },
                        x,
                        " Hz")),
                    React.createElement("option", { value: "custom" }, "Custom\u2026"))),
            mode === 'custom' && React.createElement("label", { className: "ear-custom" },
                React.createElement("span", null,
                    "Custom difference ",
                    React.createElement("b", null,
                        beat.toFixed(2),
                        " Hz")),
                React.createElement("input", { "aria-label": "Custom beat difference", type: "range", min: "0", max: "40", step: ".01", value: beat, onChange: e => setBeat(Number(e.target.value)) })))), target);
}
function LegacyStructure({ project, setProject }) {
    const addVoice = () => setProject((p) => {
        const voice = createVoice(`Voice ${p.voices.length + 1}`);
        voice.duration = p.duration;
        return touchProject({ ...p, voices: [...p.voices, voice] });
    });
    const addNoise = () => setProject((p) => touchProject({
        ...p,
        noiseTracks: [...p.noiseTracks, {
                id: uid('noise'), name: `Noise ${p.noiseTracks.length + 1}`, kind: 'pink',
                amplitude: .06, slopeDbOct: -3, stereoCorrelation: .2, start: 0,
                duration: p.duration, loop: true, mute: false, solo: false,
            }],
    }));
    const addSegment = () => setProject((p) => {
        const start = p.segments.reduce((end, segment) => Math.max(end, segment.start + segment.duration * segment.repeat), 0);
        const duration = Math.min(60, Math.max(1, p.duration));
        return touchProject({
            ...p,
            duration: Math.max(p.duration, start + duration),
            segments: [...p.segments, {
                    id: uid('segment'), name: `Segment ${p.segments.length + 1}`, start,
                    duration, repeat: 1, crossfade: .05, phaseContinuous: true,
                }],
        });
    });
    const addMarker = () => setProject((p) => touchProject({
        ...p,
        markers: [...p.markers, { id: uid('marker'), time: 0, label: `Marker ${p.markers.length + 1}` }],
    }));
    return React.createElement("div", { className: "studio-structure" },
        React.createElement("div", { className: "actions" },
            React.createElement("button", { onClick: addVoice, title: "Add a tone track" }, "+ Voice"),
            React.createElement("button", { onClick: addNoise, title: "Add procedural background noise" }, "+ Noise"),
            React.createElement("button", { onClick: addSegment, title: "Add a timed section after the existing sections" }, "+ Segment"),
            React.createElement("button", { onClick: addMarker, title: "Add a timeline marker" }, "+ Marker")),
        React.createElement("div", { className: "studio-structure-rows" },
            project.segments.map((segment) => React.createElement("div", { className: "segment-row", key: segment.id },
                React.createElement("input", { "aria-label": "Segment name", value: segment.name, onChange: e => setProject((p) => touchProject({
                        ...p, segments: p.segments.map(x => x.id === segment.id ? { ...x, name: e.target.value } : x),
                    })) }),
                React.createElement("span", null,
                    segment.start.toFixed(1),
                    "s \u00B7 ",
                    segment.duration.toFixed(1),
                    "s"))),
            project.markers.map((marker) => React.createElement("div", { className: "marker-strip", key: marker.id },
                React.createElement("input", { "aria-label": "Marker label", value: marker.label, onChange: e => setProject((p) => touchProject({
                        ...p, markers: p.markers.map(x => x.id === marker.id ? { ...x, label: e.target.value } : x),
                    })) }),
                React.createElement("span", null,
                    marker.time.toFixed(1),
                    "s")))));
}
export function StudioTimelineShell(props) {
    return React.createElement(React.Fragment, null,
        React.createElement(LegacyStructure, { project: props.project, setProject: props.setProject }),
        React.createElement(StudioTimelineSurface, { ...props }),
        React.createElement(EarLinkControl, { project: props.project, setProject: props.setProject }));
}
//# sourceMappingURL=StudioTimelineShell.js.map