import type {Project} from '../core/types.js';
import {createVoice, touchProject} from '../core/project.js';
import {uid} from '../core/types.js';
import {StudioTimelineSurface} from './StudioTimelineSurface.js';

const beatPresets = [1, 2, 4, 6, 8, 10, 12, 20, 30];

function EarLinkControl({project, setProject}: any) {
  const [voiceId, setVoiceId] = React.useState(project.voices[0]?.id || '');
  const [linked, setLinked] = React.useState(false);
  const voice = project.voices.find((v: any) => v.id === voiceId) || project.voices[0];
  React.useEffect(() => { if (!project.voices.some((v: any) => v.id === voiceId)) setVoiceId(project.voices[0]?.id || ''); }, [project.voices, voiceId]);
  if (!voice) return null;
  const signedBeat = voice.rightHz - voice.leftHz;
  const beat = Math.abs(signedBeat);
  const patchVoice = (next: any) => setProject((p: Project) => touchProject({...p, voices: p.voices.map(v => v.id === voice.id ? {...v, ...next} : v)}));
  const setLeft = (left: number) => patchVoice(linked ? {leftHz: left, rightHz: left + signedBeat} : {leftHz: left});
  const setRight = (right: number) => patchVoice(linked ? {rightHz: right, leftHz: right - signedBeat} : {rightHz: right});
  const setBeat = (value: number) => patchVoice({rightHz: voice.leftHz + (signedBeat < 0 ? -value : value)});
  return <section className={`ear-link-control ${linked ? 'linked' : ''}`} aria-label="Binaural ear linking">
    <div className="ear-link-head"><div><b>Ear relationship</b><small>Keep the binaural beat difference stable while editing either ear.</small></div><label className="switch-label"><input type="checkbox" checked={linked} onChange={e => setLinked(e.target.checked)}/><span>{linked ? 'Linked' : 'Independent'}</span></label></div>
    <div className="ear-link-row"><label>Track<select value={voice.id} onChange={e => setVoiceId(e.target.value)}>{project.voices.map((v: any) => <option key={v.id} value={v.id}>{v.name}</option>)}</select></label><div className="ear-readout"><span>Beat difference</span><strong>{beat.toFixed(2)} Hz</strong></div></div>
    <div className="ear-link-row"><label>Left ear<input type="number" min=".001" step=".01" value={voice.leftHz} onChange={e => setLeft(Number(e.target.value))}/></label><label>Right ear<input type="number" min=".001" step=".01" value={voice.rightHz} onChange={e => setRight(Number(e.target.value))}/></label></div>
    <div className="beat-control"><label><span>Preserved difference <b>{beat.toFixed(2)} Hz</b></span><input aria-label="Preserved beat difference" type="range" min="0" max="40" step=".01" value={beat} disabled={!linked} onChange={e => setBeat(Number(e.target.value))}/></label><label><span>Common values</span><select aria-label="Common beat difference" value={beatPresets.includes(Number(beat.toFixed(2))) ? Number(beat.toFixed(2)) : ''} disabled={!linked} onChange={e => setBeat(Number(e.target.value))}><option value="">Choose a value…</option>{beatPresets.map(x => <option key={x} value={x}>{x} Hz</option>)}</select></label></div>
  </section>;
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
    <EarLinkControl project={props.project} setProject={props.setProject}/>
    <StudioTimelineSurface {...props}/>
  </>;
}
