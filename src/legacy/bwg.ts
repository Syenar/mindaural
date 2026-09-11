import { Project, BwgReport, StereoBuffer } from '../core/types.js';
import { createDefaultProject, setCenterBeat } from '../core/project.js';
import { createZip } from '../formats/zip.js';
import { encodeWav } from '../formats/wav.js';

const td = new TextDecoder('latin1');
const te = new TextEncoder();

function safeName(value:string){return value.replace(/[^a-z0-9._-]+/gi,'_').replace(/^\.+/,'').slice(0,80)||'background';}
function report(sourceFormat:string, supported:boolean, imported:number, warnings:string[], unsupported:string[]):BwgReport{return {sourceFormat,supported,imported,warnings,unsupported};}

// Clean-room compatibility layer for the documented text/exportable BWGen representation.
// Binary variants are rejected rather than guessed, because guessing would silently lose semantics.
export function importBwg(bytes:Uint8Array):{project:Project;report:BwgReport}{
  if(bytes.byteLength>16*1024*1024) throw new Error('BWG preset exceeds the 16 MiB safety limit');
  const text=td.decode(bytes);
  if(/\0/.test(text.slice(0,128))) throw new Error('Binary BWG variant is not recognized safely by this build');
  const p=createDefaultProject('Imported BWGen preset');
  const warnings:string[]=[],unsupported:string[]=[];
  const get=(...keys:string[])=>{for(const k of keys){const m=text.match(new RegExp(`(?:^|\\n)\\s*${k}\\s*[=:]\\s*([-+0-9.]+)`,'i'));if(m)return Number(m[1]);}return undefined;};
  const getText=(...keys:string[])=>{for(const k of keys){const m=text.match(new RegExp(`(?:^|\\n)\\s*${k}\\s*[=:]\\s*([^\\r\\n;]+)`,'i'));if(m)return m[1].trim();}return undefined;};
  const carrier=get('carrier','basefreq','base frequency'),beat=get('beat','beatfreq','beat frequency'),duration=get('duration','length');
  if(Number.isFinite(carrier)&&Number.isFinite(beat)) p.voices[0]=setCenterBeat(p.voices[0],carrier!,beat!); else warnings.push('Carrier/beat fields were not found; defaults retained.');
  if(Number.isFinite(duration)){p.duration=Math.max(1,duration!);p.voices[0].duration=p.duration;p.segments[0].duration=p.duration;}
  const volume=get('volume','amplitude'); if(Number.isFinite(volume)) p.voices[0].amplitude=Math.max(0,Math.min(1,volume!));
  const waveform=getText('waveform','wave'); if(waveform&&['sine','sine2','triangle','square','smooth-square','saw','reverse-saw','pulse'].includes(waveform.toLowerCase())) p.voices[0].waveform=waveform.toLowerCase() as any; else if(waveform) warnings.push(`Waveform '${waveform}' was not mapped; sine retained.`);
  const background=getText('background','backgroundfile','wav'); if(background) warnings.push(`External background '${background}' is reported but requires companion asset packaging.`);
  for(const term of ['visual','audiostrobe','modulation','segment','phase shift','interval','rating','comment']) if(new RegExp(term,'i').test(text)) unsupported.push(`${term} data requires exact field mapping before lossless import`);
  return {project:p,report:report('BWGen text preset',unsupported.length===0,1,warnings,unsupported)};
}

function legacyChecks(project:Project, allowBackground:boolean){
  const unsupported:string[]=[];
  if(project.voices.length!==1) unsupported.push('multiple voices');
  if(project.noiseTracks.length) unsupported.push('noise tracks');
  if(!allowBackground&&project.audioTracks.length) unsupported.push('external background tracks require companion-WAV package export');
  if(project.voices[0]?.automation.length) unsupported.push('voice automation');
  if(project.voices[0]?.links.length) unsupported.push('parameter links/modulation');
  if(project.segments.length!==1) unsupported.push('multiple segments');
  if(project.segments[0]?.overrides) unsupported.push('segment overrides');
  return unsupported;
}

function bwgText(project:Project, backgroundNames:string[]=[]){
  const v=project.voices[0],carrier=(v.leftHz+v.rightHz)/2,beat=Math.abs(v.rightHz-v.leftHz);
  const lines=[`; Mindaural BWGen-compatible clean-room text export`,`Carrier=${carrier}`,`Beat=${beat}`,`Duration=${project.duration}`,`Volume=${v.amplitude}`,`Waveform=${v.waveform}`];
  backgroundNames.forEach((name,i)=>lines.push(`Background${i+1}=${name}`));
  return `${lines.join('\n')}\n`;
}

export function exportBwg(project:Project){
  const unsupported=legacyChecks(project,false);
  if(unsupported.length) return {bytes:null,report:report('BWGen text subset',false,0,[],unsupported)};
  return {bytes:te.encode(bwgText(project)),report:report('BWGen text subset',true,0,[],[])};
}

export function exportBwgPackage(project:Project, assets:Record<string,StereoBuffer>){
  const unsupported=legacyChecks(project,true),warnings:string[]=[];
  for(const track of project.audioTracks){const pcm=assets[track.assetId];if(!pcm) unsupported.push(`missing companion audio asset ${track.assetId}`);}
  if(unsupported.length) return {bytes:null,report:report('BWGen text plus companion WAV package',false,0,warnings,unsupported)};
  const entries:Record<string,Uint8Array|string>={}; const backgroundNames:string[]=[];
  for(const track of project.audioTracks){const pcm=assets[track.assetId],name=`backgrounds/${safeName(track.name)}.wav`;backgroundNames.push(name);entries[name]=encodeWav(pcm,16);}
  entries['preset.bwg']=bwgText(project,backgroundNames);
  entries['README.txt']='Mindaural clean-room BWGen-compatible export. Extract preset.bwg and the listed WAV backgrounds.\nThe manifest records that the package contains companion audio assets.\n';
  entries['manifest.json']=JSON.stringify({format:'mindaural-bwg-package',version:1,preset:'preset.bwg',backgrounds:backgroundNames},null,2);
  return {bytes:createZip(entries),report:report('BWGen text plus companion WAV package',true,0,warnings,[])};
}
