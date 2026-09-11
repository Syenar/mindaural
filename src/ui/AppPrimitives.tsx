import React from 'react';
import {fmt,evidenceClass} from './appUtils.js';

export function NumberField({label,value,suffix,onChange}:any){return <div className="number-field"><label>{label}</label><div><input type="number" min="0" step="0.01" value={Number(value.toFixed(3))} onChange={e=>onChange(Number(e.target.value))}/><span>{suffix}</span></div></div>}
export function EvidenceCard({state,claim}:any){return <div className="evidence"><span className={`badge ${evidenceClass(state)}`}>{state}</span><p>{claim}</p></div>}
export function Metric({k,v}:any){return <div className="metric"><span>{k}</span><strong>{v}</strong></div>}
export function Spectrum({spectrum}:any){if(!spectrum)return null;const m=Array.from(spectrum.magnitudes as Float32Array) as number[],max=Math.max(...m,1e-8),pts=m.map((v:number,i:number)=>`${i/(m.length-1)*700},${120-v/max*110}`).join(' ');return <div className="spectrum"><span>Spectrum · {spectrum.backend}</span><svg viewBox="0 0 700 130" preserveAspectRatio="none"><polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2"/></svg></div>}
