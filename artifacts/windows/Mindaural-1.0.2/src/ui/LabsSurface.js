import { touchProject } from '../core/project.js';
import { analyzeLightControl, DEFAULT_LIGHT_CONTROL, renderLightControl } from '../labs/lightControl.js';
import { encodeWav } from '../formats/wav.js';
function download(name, bytes, type = 'audio/wav') { const u = URL.createObjectURL(new Blob([bytes], { type })); const a = document.createElement('a'); a.href = u; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(u), 1000); }
function N({ label, value, onChange, min = 0, max = 100, step = .01, suffix = '' }) { return React.createElement("label", { className: "studio-field" },
    React.createElement("span", null, label),
    React.createElement("input", { type: "number", min: min, max: max, step: step, value: value, onChange: e => onChange(Number(e.target.value)) }),
    React.createElement("small", null, suffix)); }
function Curve({ left, right, onChange }) {
    const pointY = (value) => 72 - value * 48;
    return React.createElement("div", { className: "visual-curve", "aria-label": "Visual brightness curve" },
        React.createElement("div", { className: "curve-heading" },
            React.createElement("div", null,
                React.createElement("b", null, "Channel balance"),
                React.createElement("span", null, "Independent left and right brightness")),
            React.createElement("span", { className: "curve-unit" }, "0\u2013100%")),
        React.createElement("div", { className: "curve-chart-wrap" },
            React.createElement("div", { className: "curve-y-labels" },
                React.createElement("span", null, "100"),
                React.createElement("span", null, "50"),
                React.createElement("span", null, "0")),
            React.createElement("svg", { viewBox: "0 0 600 96", role: "img", "aria-label": "Brightness preview" },
                React.createElement("line", { className: "curve-grid", x1: "0", y1: "24", x2: "600", y2: "24" }),
                React.createElement("line", { className: "curve-grid", x1: "0", y1: "72", x2: "600", y2: "72" }),
                React.createElement("line", { className: "curve-grid", x1: "150", y1: "0", x2: "150", y2: "96" }),
                React.createElement("line", { className: "curve-grid", x1: "300", y1: "0", x2: "300", y2: "96" }),
                React.createElement("line", { className: "curve-grid", x1: "450", y1: "0", x2: "450", y2: "96" }),
                React.createElement("path", { className: "curve-left", d: `M0 ${pointY(left)} C150 ${pointY(left)} 270 ${pointY(right)} 600 ${pointY(right)}` }),
                React.createElement("path", { className: "curve-right", d: `M0 ${pointY(right)} C150 ${pointY(right)} 270 ${pointY(left)} 600 ${pointY(left)}` }),
                React.createElement("circle", { className: "curve-point left", cx: "0", cy: pointY(left), r: "7" }),
                React.createElement("circle", { className: "curve-point right", cx: "600", cy: pointY(right), r: "7" }))),
        React.createElement("div", { className: "curve-x-labels" },
            React.createElement("span", null, "Left channel"),
            React.createElement("span", null, "Balanced"),
            React.createElement("span", null, "Right channel")),
        React.createElement("div", { className: "curve-controls" },
            React.createElement("label", null,
                React.createElement("span", null,
                    React.createElement("i", { className: "curve-swatch left" }),
                    "Left brightness ",
                    React.createElement("b", null,
                        Math.round(left * 100),
                        "%")),
                React.createElement("input", { "aria-label": "Left brightness", type: "range", min: "0", max: "1", step: ".01", value: left, onChange: e => onChange({ left: Number(e.target.value) }) })),
            React.createElement("label", null,
                React.createElement("span", null,
                    React.createElement("i", { className: "curve-swatch right" }),
                    "Right brightness ",
                    React.createElement("b", null,
                        Math.round(right * 100),
                        "%")),
                React.createElement("input", { "aria-label": "Right brightness", type: "range", min: "0", max: "1", step: ".01", value: right, onChange: e => onChange({ right: Number(e.target.value) }) }))));
}
async function estimateRefresh() { return new Promise(resolve => { let last = 0; const xs = []; const f = (t) => { if (last)
    xs.push(t - last); last = t; if (xs.length === 30)
    resolve(1000 / (xs.reduce((a, b) => a + b, 0) / xs.length));
else
    requestAnimationFrame(f); }; requestAnimationFrame(f); }); }
export function LabsSurface({ setMessage, project, setProject }) {
    const fallback = { frequencyHz: 10, duty: .5, waveform: 'square', leftBrightness: .72, rightBrightness: .72, leftPhase: 0, rightPhase: 0 };
    const [localVisual, setLocalVisual] = React.useState(() => ({ ...fallback, ...(project?.visual || {}) }));
    const visual = { ...fallback, ...(project?.visual || localVisual) };
    const [armed, setArmed] = React.useState(false), [on, setOn] = React.useState(false), [refresh, setRefresh] = React.useState(null), [spec, setSpec] = React.useState({ ...DEFAULT_LIGHT_CONTROL }), [duration, setDuration] = React.useState(60), [rate, setRate] = React.useState(48000), [diag, setDiag] = React.useState(null);
    const patchVisual = (x) => { const next = { ...visual, ...x }; if (setProject)
        setProject((p) => touchProject({ ...p, visual: next }));
    else
        setLocalVisual(next); };
    const patch = (x) => setSpec(s => ({ ...s, ...x }));
    const hz = Math.min(visual.frequencyHz, refresh ? refresh / 2 : visual.frequencyHz);
    React.useEffect(() => { estimateRefresh().then(setRefresh).catch(() => { }); }, []);
    React.useEffect(() => { if (!armed || visual.waveform !== 'square') {
        setOn(false);
        return;
    } let stop = false, t; const loop = () => { if (stop)
        return; setOn(true); t = setTimeout(() => { setOn(false); t = setTimeout(loop, 1000 / hz * (1 - visual.duty)); }, 1000 / hz * visual.duty); }; loop(); return () => { stop = true; clearTimeout(t); }; }, [armed, visual.waveform, hz, visual.duty]);
    const render = () => { try {
        const b = renderLightControl(duration, rate, spec);
        setDiag(analyzeLightControl(b));
        return b;
    }
    catch (e) {
        setMessage?.(String(e));
        return null;
    } };
    const exportWav = () => { const b = render(); if (b) {
        download(`light-control-${spec.frequencyHz}hz.wav`, encodeWav(b, 24));
        setMessage?.('Lossless legacy light-control WAV exported.');
    } };
    return React.createElement("section", { className: "page" },
        React.createElement("div", { className: "eyebrow" }, "LABS"),
        React.createElement("h1", null, "Visual & legacy light-control laboratory"),
        React.createElement("div", { className: "warning" },
            React.createElement("b", null, "Photosensitive seizure warning"),
            React.createElement("p", null, "Flashing light can trigger seizures. Enable it only after acknowledging this warning; browser timing is not laboratory calibrated."),
            React.createElement("label", null,
                React.createElement("input", { type: "checkbox", checked: armed, onChange: e => setArmed(e.target.checked) }),
                " I understand and want to enable visual flicker controls")),
        React.createElement("div", { className: "labs-grid" },
            React.createElement("div", { className: "lab-card" },
                React.createElement("h3", null, "Visual stimulation"),
                React.createElement("p", null,
                    "Refresh: ",
                    React.createElement("b", null, refresh ? `${refresh.toFixed(1)} Hz` : 'measuring…'),
                    ". Separate brightness and phase controls follow the reference workflow."),
                React.createElement(N, { label: "Frequency", value: visual.frequencyHz, min: .5, max: Math.max(1, (refresh || 60) / 2), step: .1, suffix: "Hz", onChange: (x) => patchVisual({ frequencyHz: x }) }),
                React.createElement(N, { label: "Duty cycle", value: visual.duty, min: .05, max: .95, onChange: (x) => patchVisual({ duty: x }) }),
                React.createElement("label", { className: "studio-field" },
                    React.createElement("span", null, "Waveform"),
                    React.createElement("select", { value: visual.waveform, onChange: e => patchVisual({ waveform: e.target.value }) },
                        React.createElement("option", { value: "square" }, "Square"),
                        React.createElement("option", { value: "sine" }, "Sine"))),
                React.createElement("h4", null, "Brightness curve"),
                React.createElement(Curve, { left: visual.leftBrightness, right: visual.rightBrightness, onChange: (x) => patchVisual({ leftBrightness: x.left ?? visual.leftBrightness, rightBrightness: x.right ?? visual.rightBrightness }) }),
                React.createElement("div", { className: "two-mini" },
                    React.createElement(N, { label: "Left brightness", value: visual.leftBrightness, max: 1, onChange: (x) => patchVisual({ leftBrightness: x }) }),
                    React.createElement(N, { label: "Right brightness", value: visual.rightBrightness, max: 1, onChange: (x) => patchVisual({ rightBrightness: x }) })),
                React.createElement(N, { label: "Phase difference", value: visual.rightPhase - visual.leftPhase, min: -6.283, max: 6.283, suffix: "rad", onChange: (x) => patchVisual({ rightPhase: visual.leftPhase + x }) }),
                React.createElement("label", { className: "studio-field" },
                    React.createElement("span", null, "Phase mode"),
                    React.createElement("select", { value: visual.rightPhase === visual.leftPhase ? 'in' : 'custom', onChange: e => e.target.value === 'in' && patchVisual({ rightPhase: visual.leftPhase }) },
                        React.createElement("option", { value: "in" }, "In phase"),
                        React.createElement("option", { value: "custom" }, "Custom phase difference"))),
                React.createElement("div", { className: "visual-preview", style: armed ? { opacity: Math.max(visual.leftBrightness, visual.rightBrightness), ['--visual-on-opacity']: on ? '1' : '0' } : undefined },
                    React.createElement("span", null, armed ? `${hz.toFixed(2)} Hz · ${Math.round(visual.duty * 100)}% ${visual.waveform}` : 'Safety interlock off')),
                React.createElement("small", null, "Project visual settings persist in the current session; timing remains provisional.")),
            React.createElement("div", { className: "lab-card" },
                React.createElement("h3", null, "Legacy 19.2 kHz Light Control"),
                React.createElement("p", null, "Creates one amplitude-gated 19.2 kHz carrier per stereo channel. Keep it lossless."),
                React.createElement(N, { label: "Light modulation", value: spec.frequencyHz, min: .1, max: 40, suffix: "Hz", onChange: (x) => patch({ frequencyHz: x }) }),
                React.createElement(N, { label: "Left amplitude", value: spec.leftAmplitude, max: .8, onChange: (x) => patch({ leftAmplitude: x }) }),
                React.createElement(N, { label: "Right amplitude", value: spec.rightAmplitude, max: .8, onChange: (x) => patch({ rightAmplitude: x }) }),
                React.createElement(N, { label: "Left phase", value: spec.leftPhase, min: -6.283, max: 6.283, suffix: "rad", onChange: (x) => patch({ leftPhase: x }) }),
                React.createElement(N, { label: "Right phase", value: spec.rightPhase, min: -6.283, max: 6.283, suffix: "rad", onChange: (x) => patch({ rightPhase: x }) }),
                React.createElement(N, { label: "Duty cycle", value: spec.duty, min: .01, max: .99, onChange: (x) => patch({ duty: x }) }),
                React.createElement("label", { className: "studio-field" },
                    React.createElement("span", null, "Waveform"),
                    React.createElement("select", { value: spec.waveform, onChange: e => patch({ waveform: e.target.value }) },
                        React.createElement("option", { value: "square" }, "Square gate"),
                        React.createElement("option", { value: "sine" }, "Sine gate"))),
                React.createElement(N, { label: "Duration", value: duration, min: .1, max: 3600, step: 1, suffix: "s", onChange: setDuration }),
                React.createElement("label", { className: "studio-field" },
                    React.createElement("span", null, "Sample rate"),
                    React.createElement("select", { value: rate, onChange: e => setRate(Number(e.target.value)) },
                        React.createElement("option", { value: "44100" }, "44.1 kHz"),
                        React.createElement("option", { value: "48000" }, "48 kHz"),
                        React.createElement("option", { value: "96000" }, "96 kHz"),
                        React.createElement("option", { value: "192000" }, "192 kHz"))),
                React.createElement("div", { className: "actions" },
                    React.createElement("button", { onClick: render }, "Validate signal"),
                    React.createElement("button", { className: "primary small", onClick: exportWav }, "Export lossless WAV")),
                diag && React.createElement("div", { className: "technical" },
                    React.createElement("b", null, diag.present ? '19.2 kHz carrier detected' : 'Carrier validation failed'))),
            React.createElement("div", { className: "lab-card" },
                React.createElement("h3", null, "Compatibility validation"),
                React.createElement("p", null, "Software validation covers carrier, envelope, duty, phase, channel mapping and lossless export. Physical decoder validation remains external."),
                React.createElement("div", { className: "chips" },
                    React.createElement("span", null, "Software signal validation"),
                    React.createElement("span", null, "Lossless reference export")))));
}
//# sourceMappingURL=LabsSurface.js.map