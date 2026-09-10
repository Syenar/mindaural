import {Project,StereoBuffer} from '../core/types.js';
export class LiveEngine{
 private ctx:AudioContext|null=null;private node:AudioWorkletNode|null=null;private ended:()=>void=()=>{};
 async init(){if(this.ctx)return;this.ctx=new AudioContext();await this.ctx.audioWorklet.addModule('./public/worklet.js');this.node=new AudioWorkletNode(this.ctx,'binaural-studio',{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]});this.node.channelCount=2;this.node.channelCountMode='explicit';this.node.channelInterpretation='discrete';this.node.port.onmessage=(e)=>{if(e.data?.type==='ended')this.ended();};this.node.connect(this.ctx.destination);}
 async start(project:Project,position=0,onEnded?:()=>void,assets:Record<string,StereoBuffer>={}){if(position!==0)throw new Error('Non-zero live seek is not enabled until exact phase/noise state transfer is available.');await this.init();if(onEnded)this.ended=onEnded;await this.ctx!.resume();this.node!.port.postMessage({type:'project',project:structuredClone(project),assets});this.node!.port.postMessage({type:'start',position:0});}
 update(project:Project,assets:Record<string,StereoBuffer>={}){this.node?.port.postMessage({type:'project',project:structuredClone(project),assets});}
 stop(){this.node?.port.postMessage({type:'stop'});}get sampleRate(){return this.ctx?.sampleRate??0;}
}
