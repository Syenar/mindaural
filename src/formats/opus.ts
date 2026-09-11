import {StereoBuffer} from '../core/types.js';

export interface OpusPacket { data:Uint8Array; samples:number; timestampUs:number; }

const te=new TextEncoder();
function concat(parts:Uint8Array[]){const n=parts.reduce((s,p)=>s+p.length,0),out=new Uint8Array(n);let o=0;for(const p of parts){out.set(p,o);o+=p.length;}return out;}
function u16le(n:number){return Uint8Array.of(n&255,(n>>>8)&255)}
function u32le(n:number){return Uint8Array.of(n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255)}
function u64le(n:number){let x=BigInt(Math.max(0,Math.floor(n))),a=new Uint8Array(8);for(let i=0;i<8;i++){a[i]=Number(x&255n);x>>=8n;}return a;}
function u16be(n:number){return Uint8Array.of((n>>>8)&255,n&255)}
function u32be(n:number){return Uint8Array.of((n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255)}

export function makeOpusHead(channels=2,preSkip=0,inputRate=48000){return concat([te.encode('OpusHead'),Uint8Array.of(1,channels),u16le(preSkip),u32le(inputRate),u16le(0),Uint8Array.of(0)]);}
export function makeOpusTags(vendor='Mindaural'){const v=te.encode(vendor);return concat([te.encode('OpusTags'),u32le(v.length),v,u32le(0)]);}

const oggTable=(()=>{const t=new Uint32Array(256);for(let i=0;i<256;i++){let r=i<<24;for(let j=0;j<8;j++)r=((r<<1)^((r&0x80000000)?0x04c11db7:0))>>>0;t[i]=r;}return t;})();
function oggCrc(a:Uint8Array){let crc=0;for(const b of a)crc=((crc<<8)^oggTable[((crc>>>24)^b)&255])>>>0;return crc>>>0;}
function oggPage(packet:Uint8Array,serial:number,seq:number,granule:number,flags:number){const segs=Math.ceil(packet.length/255)+(packet.length%255===0?1:0);if(segs>255)throw new Error('Opus packet too large for single Ogg page');const lace=new Uint8Array(segs);let left=packet.length;for(let i=0;i<segs;i++){lace[i]=Math.min(255,left);left-=lace[i];}const h=new Uint8Array(27+segs);h.set(te.encode('OggS'));h[4]=0;h[5]=flags;h.set(u64le(granule),6);h.set(u32le(serial),14);h.set(u32le(seq),18);h[26]=segs;h.set(lace,27);const page=concat([h,packet]),crc=oggCrc(page);page[22]=crc&255;page[23]=(crc>>>8)&255;page[24]=(crc>>>16)&255;page[25]=(crc>>>24)&255;return page;}
export function muxOggOpus(packets:OpusPacket[],channels=2,sampleRate=48000){const serial=0x42425331;let seq=0,granule=0;const pages=[oggPage(makeOpusHead(channels,0,sampleRate),serial,seq++,0,2),oggPage(makeOpusTags(),serial,seq++,0,0)];for(let i=0;i<packets.length;i++){granule+=packets[i].samples;pages.push(oggPage(packets[i].data,serial,seq++,granule,i===packets.length-1?4:0));}return concat(pages);}

function id(...n:number[]){return Uint8Array.from(n)}
function vintSize(n:number){for(let len=1;len<=8;len++){const max=Math.pow(2,7*len)-2;if(n<=max){const a=new Uint8Array(len);let x=BigInt(n);for(let i=len-1;i>=0;i--){a[i]=Number(x&255n);x>>=8n;}a[0]|=1<<(8-len);return a;}}throw new Error('EBML element too large');}
function elem(elementId:Uint8Array,payload:Uint8Array){return concat([elementId,vintSize(payload.length),payload]);}
function uint(n:number,bytes?:number){let len=bytes||1;while(!bytes&&n>=Math.pow(256,len)&&len<8)len++;const a=new Uint8Array(len);let x=BigInt(Math.floor(n));for(let i=len-1;i>=0;i--){a[i]=Number(x&255n);x>>=8n;}return a;}
function str(s:string){return te.encode(s)}
function float64(n:number){const a=new Uint8Array(8);new DataView(a.buffer).setFloat64(0,n,false);return a;}
function ebml(...parts:Uint8Array[]){return concat(parts)}
function simpleBlock(packet:Uint8Array,relativeMs:number){const tc=Math.max(-32768,Math.min(32767,Math.round(relativeMs))),payload=concat([Uint8Array.of(0x81),u16be(tc&0xffff),Uint8Array.of(0x80),packet]);return elem(id(0xA3),payload);}
export function muxWebmOpus(packets:OpusPacket[],channels=2,sampleRate=48000){
 const ebmlHeader=elem(id(0x1A,0x45,0xDF,0xA3),ebml(
  elem(id(0x42,0x86),uint(1)),elem(id(0x42,0xF7),uint(1)),elem(id(0x42,0xF2),uint(4)),elem(id(0x42,0xF3),uint(8)),elem(id(0x42,0x82),str('webm')),elem(id(0x42,0x87),uint(4)),elem(id(0x42,0x85),uint(2))));
 const info=elem(id(0x15,0x49,0xA9,0x66),ebml(elem(id(0x2A,0xD7,0xB1),uint(1_000_000,4)),elem(id(0x4D,0x80),str('Mindaural')),elem(id(0x57,0x41),str('Mindaural'))));
 const audio=elem(id(0xE1),ebml(elem(id(0xB5),float64(sampleRate)),elem(id(0x9F),uint(channels)),elem(id(0x62,0x64),uint(32))));
 const track=elem(id(0xAE),ebml(elem(id(0xD7),uint(1)),elem(id(0x73,0xC5),uint(1)),elem(id(0x83),uint(2)),elem(id(0x86),str('A_OPUS')),elem(id(0x63,0xA2),makeOpusHead(channels,0,sampleRate)),elem(id(0x56,0xAA),uint(0)),elem(id(0x56,0xBB),uint(80_000_000,4)),audio));
 const tracks=elem(id(0x16,0x54,0xAE,0x6B),track);
 const clusters:Uint8Array[]=[];let i=0;while(i<packets.length){const baseMs=Math.floor(packets[i].timestampUs/1000),items=[elem(id(0xE7),uint(baseMs))];while(i<packets.length){const ms=packets[i].timestampUs/1000,rel=ms-baseMs;if(rel>30_000)break;items.push(simpleBlock(packets[i].data,rel));i++;}clusters.push(elem(id(0x1F,0x43,0xB6,0x75),ebml(...items)));}
 const segmentPayload=ebml(info,tracks,...clusters);return concat([ebmlHeader,elem(id(0x18,0x53,0x80,0x67),segmentPayload)]);
}

export async function encodeOggOpus(input:StereoBuffer,bitrate=128000){const {encodeOpusPacketsBundled}=await import('./opusBundled.js');return muxOggOpus(encodeOpusPacketsBundled(input,bitrate),2,48000);}
export async function encodeWebmOpus(input:StereoBuffer,bitrate=128000){const {encodeOpusPacketsBundled}=await import('./opusBundled.js');return muxWebmOpus(encodeOpusPacketsBundled(input,bitrate),2,48000);}
