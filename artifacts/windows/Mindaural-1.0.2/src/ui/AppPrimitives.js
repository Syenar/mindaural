import React from 'react';
import { evidenceClass } from './appUtils.js';
export function NumberField({ label, value, suffix, onChange }) { return React.createElement("div", { className: "number-field" },
    React.createElement("label", null, label),
    React.createElement("div", null,
        React.createElement("input", { type: "number", min: "0", step: "0.01", value: Number(value.toFixed(3)), onChange: e => onChange(Number(e.target.value)) }),
        React.createElement("span", null, suffix))); }
export function EvidenceCard({ state, claim }) { return React.createElement("div", { className: "evidence" },
    React.createElement("span", { className: `badge ${evidenceClass(state)}` }, state),
    React.createElement("p", null, claim)); }
export function Metric({ k, v }) { return React.createElement("div", { className: "metric" },
    React.createElement("span", null, k),
    React.createElement("strong", null, v)); }
export function Spectrum({ spectrum }) { if (!spectrum)
    return null; const m = Array.from(spectrum.magnitudes), max = Math.max(...m, 1e-8), pts = m.map((v, i) => `${i / (m.length - 1) * 700},${120 - v / max * 110}`).join(' '); return React.createElement("div", { className: "spectrum" },
    React.createElement("span", null,
        "Spectrum \u00B7 ",
        spectrum.backend),
    React.createElement("svg", { viewBox: "0 0 700 130", preserveAspectRatio: "none" },
        React.createElement("polyline", { points: pts, fill: "none", stroke: "currentColor", strokeWidth: "2" }))); }
//# sourceMappingURL=AppPrimitives.js.map