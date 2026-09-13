import type {Project} from '../core/types.js';
import {createVoice, touchProject} from '../core/project.js';
import {uid} from '../core/types.js';
import {StudioTimelineSurface} from './StudioTimelineSurface.js';

const beatPresets = [1, 2, 4, 6, 8, 10, 12, 20, 30];

function EarLinkControl({project, setProject}: any) {
  const [voiceId, setVoiceId] = React.useState(project.voices[0]?.id || '');
  const [linked, setLinked] = React.useState(false);
  const [mode, setMode] = React.useState('custom');
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  const voice = project.voices.find((v: any) => v.id === voiceId) || project.voices[0];
  React.useEffect(() => {
    const main = document.querySelector('main') || document.body;
    const sync = () => {
      const inspector = Array.from(document.querySelectorAll<HTMLElement>('.studio-inspector')).find(x => x.querySelector('h3'));
      if (!inspector) { setTarget(null); return; }
      const heading = inspector.querySelector('h3')?.textContent || '';
      const selected = project.voices.find((v: any) => v.name === heading);
      if (!selected) { setTarget(null); return; }
      setVoiceId(selected.id);
      let slot = inspector.querySelector<HTMLElement>('.ear-link-inline-slot');
      if (!slot) {
        slot = document.createElement('div');
        slot.className = 'ear-link-inline-slot';
        const fields = Array.from(inspector.querySelectorAll<HTMLLabelElement>('.studio-field'));
        const rightField = fields.find(x => x.textContent?.trim().startsWith('Right ear'));
        rightField?.after(slot);
      }
      setTarget(slot);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(main, {childList: true, subtree: true, characterData: true});
    return () => observer.disconnect();
  }, [project.voices]);
  React.useEffect(() => {
    if (!target || !voice || !linked) return;
    const inspector = target.closest('.studio-inspector');
    const fields = Array.from(inspector?.querySelectorAll<HTMLLabelElement>('.studio-field') || []);
    const left = fields.find(x => x.textContent?.trim().startsWith('Left ear'))?.querySelector('input');
    const right = fields.find(x => x.textContent?.trim().startsWith('Right ear'))?.querySelector('input');
    const signedBeat = voice.rightHz - voice.leftHz;
    const changeLeft = (event: Event) => { const value = Number((event.target as HTMLInputElement).value); if (Number.isFinite(value)) patchVoice({leftHz: value, rightHz: value + signedBeat}); };
    const changeRight = (event: Event) => { const value = Number((event.target as HTMLInputElement).value); if (Number.isFinite(value)) patchVoice({rightHz: value, leftHz: value - signedBeat}); };
    left?.addEventListener('input', changeLeft, true);
    right?.addEventListener('input', changeRight, true);
    return () => { left?.removeEventListener('input', changeLeft, true); right?.removeEventListener('input', changeRight, true); };
  }, [target, voice?.id, voice?.leftHz, voice?.rightHz, linked]);
  if (!voice || !target) return null;
  const signedBeat = voice.rightHz - voice.leftHz;
  const beat = Math.abs(signedBeat);
  const patchVoice = (next: any) => setProject((p: Project) => touchProject({...p, voices: p.voices.map(v => v.id === voice.id ? {...v, ...next} : v)}));
  const setBeat = (value: number) => patchVoice({rightHz: voice.leftHz + (signedBeat < 0 ? -value : value)});
  const choose = (value: string) => { setMode(value); if (value !== 'custom') setBeat(Number(value)); };
  const toggle = (checked: boolean) => { setLinked(checked); if (checked) setMode(beatPresets.includes(Number(beat.toFixed(2))) ? String(Number(beat.toFixed(2))) : 'custom'); };
  return (ReactDOM as any).createPortal(<section className={`ear-link-inline ${linked ? 'linked' : ''}`} aria-label="Preserve binaural beat difference">
    <div className="ear-link-inline-head"><div><b>Preserve beat difference</b><small>{beat.toFixed(2)} Hz between ears</small></div><label className="switch-label"><input type="checkbox" checked={linked} onChange={e => toggle(e.target.checked)}/><span>{linked ? 'On' : 'Off'}</span></label></div>
    {linked && <><label className="ear-preset"><span>Beat difference</span><select aria-label="Beat difference preset" value={mode} onChange={e => choose(e.target.value)}>{beatPresets.map(x => <option key={x} value={x}>{x} Hz</option>)}<option value="custom">Custom…</option></select></label>{mode === 'custom' && <label className="ear-custom"><span>Custom difference <b>{beat.toFixed(2)} Hz</b></span><input aria-label="Custom beat difference" type="range" min="0" max="40" step=".01" value={beat} onChange={e => setBeat(Number(e.target.value))}/></label>}</>}
  </section>, target);
}

function LegacyStructure({project, setProject}: any) {
  const addVoice = () => setProject((p: Project) => {
    const voice = createVoice(`Voice ${p.voices.length + 1}`);
    voice.duration = p.duration;
    return touchProject({...p, voices: [...p.voices, voice]});
  });

  const addNoise = () => setProject((p: Project) => touchProject({
    ...p,
    noiseTracks: [...p.noiseTracks, {
      id: uid('noise'), name: `Noise ${p.noiseTracks.length + 1}`, kind: 'pink',
      amplitude: .06, slopeDbOct: -3, stereoCorrelation: .2, start: 0,
      duration: p.duration, loop: true, mute: false, solo: false,
    }],
  }));

  const addSegment = () => setProject((p: Project) => {
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

  const addMarker = () => setProject((p: Project) => touchProject({
    ...p,
    markers: [...p.markers, {id: uid('marker'), time: 0, label: `Marker ${p.markers.length + 1}`}],
  }));

  return <div className="studio-structure">
    <div className="actions">
      <button onClick={addVoice} title="Add a tone track">+ Voice</button>
      <button onClick={addNoise} title="Add procedural background noise">+ Noise</button>
      <button onClick={addSegment} title="Add a timed section after the existing sections">+ Segment</button>
      <button onClick={addMarker} title="Add a timeline marker">+ Marker</button>
    </div>
    <div className="studio-structure-rows">
      {project.segments.map((segment: any) => <div className="segment-row" key={segment.id}>
        <input aria-label="Segment name" value={segment.name} onChange={e => setProject((p: Project) => touchProject({
          ...p, segments: p.segments.map(x => x.id === segment.id ? {...x, name: e.target.value} : x),
        }))}/>
        <span>{segment.start.toFixed(1)}s · {segment.duration.toFixed(1)}s</span>
      </div>)}
      {project.markers.map((marker: any) => <div className="marker-strip" key={marker.id}>
        <input aria-label="Marker label" value={marker.label} onChange={e => setProject((p: Project) => touchProject({
          ...p, markers: p.markers.map(x => x.id === marker.id ? {...x, label: e.target.value} : x),
        }))}/>
        <span>{marker.time.toFixed(1)}s</span>
      </div>)}
    </div>
  </div>;
}

export function StudioTimelineShell(props: any) {
  return <>
    <LegacyStructure project={props.project} setProject={props.setProject}/>
    <StudioTimelineSurface {...props}/>
    <EarLinkControl project={props.project} setProject={props.setProject}/>
  </>;
}
