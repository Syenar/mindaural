import React from 'react';
import type {Project} from '../core/types.js';
import {createVoice, touchProject} from '../core/project.js';
import {uid} from '../core/types.js';
import {StudioTimelineSurface} from './StudioTimelineSurface.js';

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
  </>;
}
