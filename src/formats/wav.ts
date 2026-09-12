import {StereoBuffer} from '../core/types.js';

const MAX_WAV_FRAMES=96_000_000;
function str(v:DataView,o:number,s:string){for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));}
function tag(bytes:Uint8Array,o:number){return String.fromCharCode(...bytes.slice(o,o+4));}
function checkBuffer(buf:StereoBuffer){if(buf.left.length!==buf.right.length)throw new Error('WAV requires equal stereo channel lengths');if(!Number.isSafeInteger(buf.sampleRate)||buf.sampleRate<1||buf.sampleRate>768000)throw new Error('Invalid WAV sample rate');}

export function encodeWav(buf:StereoBuffer,bits:16|24|32|'f32'=24){
 checkBuffer(buf); const bps=bits==='f32'?32:bits,bytes=bps/8,frames=buf.left.length,dataBytes=frames*2*bytes;
 if(dataBytes>0xffffffff-36)throw new Error('WAV exceeds RIFF size limit');
 const ab=new ArrayBuffer(44+dataBytes),v=new DataView(ab);str(v,0,'RIFF');v.setUint32(4,36+dataBytes,true);str(v,8,'WAVEfmt ');v.setUint32(16,16,true);v.setUint16(20,bits==='f32'?3:1,true);v.setUint16(22,2,true);v.setUint32(24,buf.sampleRate,true);v.setUint32(28,buf.sampleRate*2*bytes,true);v.setUint16(32,2*bytes,true);v.setUint16(34,bps,true);str(v,36,'data');v.setUint32(40,dataBytes,true);
 let o=44;for(let i=0;i<frames;i++)for(const x0 of [buf.left[i],buf.right[i]]){const x=Math.max(-1,Math.min(1,x0));if(bits==='f32'){v.setFloat32(o,x,true);o+=4;}else if(bits===16){v.setInt16(o,Math.round(x<0?x*32768:x*32767),true);o+=2;}else if(bits===24){const q=Math.round(x<0?x*8388608:x*8388607);v.setUint8(o,q&255);v.setUint8(o+1,(q>>8)&255);v.setUint8(o+2,(q>>16)&255);o+=3;}else{v.setInt32(o,Math.round(x<0?x*2147483648:x*2147483647),true);o+=4;}}
 return new Uint8Array(ab);
}

export function decodeWav(bytes:Uint8Array):StereoBuffer{
 if(bytes.length<44||tag(bytes,0)!=='RIFF'||tag(bytes,8)!=='WAVE')throw new Error('Not a RIFF/WAVE file');
 const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),riffSize=v.getUint32(4,true);
 if(riffSize+8>bytes.length)throw new Error('Truncated RIFF container');
 let p=12,fmt=0,ch=0,sr=0,bits=0,blockAlign=0,dataOff=-1,dataLen=0,haveFmt=false;
 const limit=Math.min(bytes.length,riffSize+8);
 while(p+8<=limit){const id=tag(bytes,p),len=v.getUint32(p+4,true),body=p+8,end=body+len;if(end>limit)throw new Error(`Truncated WAV ${id} chunk`);if(id==='fmt '){if(len<16)throw new Error('Invalid WAV fmt chunk');fmt=v.getUint16(body,true);ch=v.getUint16(body+2,true);sr=v.getUint32(body+4,true);blockAlign=v.getUint16(body+12,true);bits=v.getUint16(body+14,true);haveFmt=true;}else if(id==='data'&&dataOff<0){dataOff=body;dataLen=len;}p=end+(len&1);}
 if(!haveFmt||dataOff<0)throw new Error('WAV requires fmt and data chunks');
 if(![1,2].includes(ch)||![1,3].includes(fmt)||![8,16,24,32].includes(bits)||!sr||(fmt===3&&bits!==32))throw new Error('Unsupported WAV encoding');
 const bytesPerSample=bits/8,expectedAlign=ch*bytesPerSample;if(blockAlign!==expectedAlign||dataLen%blockAlign)throw new Error('Invalid WAV frame alignment');
 const frames=dataLen/blockAlign;if(frames>MAX_WAV_FRAMES)throw new Error('WAV exceeds safe frame limit');
 const l=new Float32Array(frames),r=new Float32Array(frames);let o=dataOff;
 const read=()=>{if(fmt===3){const x=v.getFloat32(o,true);o+=4;return Number.isFinite(x)?x:0;}if(bits===16){const x=v.getInt16(o,true)/32768;o+=2;return x;}if(bits===24){let q=v.getUint8(o)|(v.getUint8(o+1)<<8)|(v.getUint8(o+2)<<16);if(q&0x800000)q|=0xff000000;o+=3;return q/8388608;}const x=v.getInt32(o,true)/2147483648;o+=4;return x;};
 for(let i=0;i<frames;i++){l[i]=read();r[i]=ch===1?l[i]:read();}return {sampleRate:sr,left:l,right:r,duration:frames/sr};
}

export function encodeMonoWav(samples:Float32Array,sampleRate:number,bits:16|24|32|'f32'=24){
 if(!Number.isSafeInteger(sampleRate)||sampleRate<1||sampleRate>768000)throw new Error('Invalid WAV sample rate');const bps=bits==='f32'?32:bits,bytes=bps/8,dataBytes=samples.length*bytes;if(dataBytes>0xffffffff-36)throw new Error('WAV exceeds RIFF size limit');const ab=new ArrayBuffer(44+dataBytes),v=new DataView(ab);str(v,0,'RIFF');v.setUint32(4,36+dataBytes,true);str(v,8,'WAVEfmt ');v.setUint32(16,16,true);v.setUint16(20,bits==='f32'?3:1,true);v.setUint16(22,1,true);v.setUint32(24,sampleRate,true);v.setUint32(28,sampleRate*bytes,true);v.setUint16(32,bytes,true);v.setUint16(34,bps,true);str(v,36,'data');v.setUint32(40,dataBytes,true);let o=44;for(const x0 of samples){const x=Math.max(-1,Math.min(1,x0));if(bits==='f32'){v.setFloat32(o,x,true);o+=4;}else if(bits===16){v.setInt16(o,Math.round(x<0?x*32768:x*32767),true);o+=2;}else if(bits===24){const q=Math.round(x<0?x*8388608:x*8388607);v.setUint8(o,q&255);v.setUint8(o+1,(q>>8)&255);v.setUint8(o+2,(q>>16)&255);o+=3;}else{v.setInt32(o,Math.round(x<0?x*2147483648:x*2147483647),true);o+=4;}}return new Uint8Array(ab);
}
