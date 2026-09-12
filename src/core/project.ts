import {APP_VERSION,ENGINE_VERSION,Project,Voice,uid,StimulusType,Waveform} from './types.js';
export function createVoice(name='Binaural voice',type:StimulusType='binaural',carrier=400,beat=10,waveform:Waveform='sine'):Voice{
 return {id:uid('voice'),name,type,leftHz:carrier-beat/2,rightHz:carrier+beat/2,amplitude:.18,leftLevel:1,rightLevel:1,phaseLeft:0,phaseRight:0,waveform,duty:.5,routingBus:'protected-stereo',fadeIn:.08,fadeOut:.12,start:0,duration:1200,loop:false,repetitions:1,mute:false,solo:false,automation:[],links:[]};
}
export function createDefaultProject(title='Untitled session'):Project{
 const now=new Date().toISOString(); const v=createVoice();
 return {schemaVersion:'1.0.0',id:uid('project'),title,description:'A custom binaural session.',duration:1200,sampleRate:48000,masterGain:.8,voices:[v],noiseTracks:[],audioTracks:[],assets:[],segments:[{id:uid('segment'),name:'Main',start:0,duration:1200,repeat:1,crossfade:.05}],markers:[],visual:{frequencyHz:10,duty:.5,waveform:'square',leftBrightness:.72,rightBrightness:.72,leftPhase:0,rightPhase:0},evidence:{state:'Experimental',claim:'Custom stimulus; no outcome is guaranteed.'},provenance:{author:'Local user',createdAt:now,updatedAt:now,appVersion:APP_VERSION,engineVersion:ENGINE_VERSION},tags:[],revision:1};
}
export function setCenterBeat(v:Voice,carrier:number,beat:number):Voice{return {...v,leftHz:carrier-beat/2,rightHz:carrier+beat/2};}
export function carrierOf(v:Voice){return (v.leftHz+v.rightHz)/2;}
export function beatOf(v:Voice){return Math.abs(v.rightHz-v.leftHz);}
export function touchProject(p:Project):Project{return {...p,revision:p.revision+1,provenance:{...p.provenance,updatedAt:new Date().toISOString()}};}
