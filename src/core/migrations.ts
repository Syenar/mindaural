import {Project} from './types.js';

/** Upgrade older package documents before the canonical schema reader runs. */
export function migrateSessionDocument(input:any):any {
  if (!input || typeof input !== 'object') throw new Error('Session must be an object');
  if (input.schemaVersion === '1.0.0') return structuredClone(input);
  if (input.schemaVersion !== '0.9.0') throw new Error(`Unsupported session schema ${String(input.schemaVersion || 'missing')}`);
  const p:Project = input.project || input, sr = Number(p.sampleRate) || 48000, db = (x:number) => 20 * Math.log10(Math.max(1e-12, Number(x ?? 1)));
  const tracks = (p.voices || []).map((v:any, i:number) => ({id:`track-${v.id || i}`,type:'stimulus',name:v.name||`Voice ${i+1}`,muted:!!v.mute,solo:!!v.solo,gainDb:0,routingBus:'protected-stereo',extensions:{},voices:[{id:v.id||`voice-${i}`,generator:v.type||'binaural',startFrame:Math.round(Number(v.start||0)*sr),durationFrames:Math.max(1,Math.round(Number(v.duration||p.duration||1)*sr)),leftHz:Number(v.leftHz),rightHz:Number(v.rightHz),gainDb:db(v.amplitude),leftGainDb:db(v.leftLevel),rightGainDb:db(v.rightLevel),phaseLeftRad:Number(v.phaseLeft||0),phaseRightRad:Number(v.phaseRight||0),waveform:v.waveform||'sine',loop:!!v.loop,automation:v.automation||[],extensions:{name:v.name,duty:v.duty,fadeInFrames:Math.round(Number(v.fadeIn||0)*sr),fadeOutFrames:Math.round(Number(v.fadeOut||0)*sr),repetitions:v.repetitions,links:v.links,routingBus:v.routingBus}}]}));
  return {schemaVersion:'1.0.0',id:p.id,metadata:{title:p.title,author:p.provenance?.author,description:p.description,createdAt:p.provenance?.createdAt,updatedAt:p.provenance?.updatedAt,tags:p.tags||[]},sampleRatePolicy:{live:'device',offlineHz:sr},tracks,assets:p.assets||[],segments:p.segments||[],master:{monitorGainDb:db(p.masterGain),hardMonitorSafety:true,extensions:{}},evidence:[{level:'experimental',claim:p.evidence?.claim||'Migrated session',citations:p.evidence?.citation?[p.evidence.citation]:[]}],provenance:p.provenance||{},exportDefaults:{sampleRate:sr},extensions:{durationSeconds:Number(p.duration)||1,revision:Number(p.revision)||1},migration:{from:'0.9.0'}};
}
