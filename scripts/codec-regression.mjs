import assert from 'node:assert/strict';
import { encodeFlac, decodeFlacVerbatim } from '../dist/src/formats/flac.js';
import { decodeWav } from '../dist/src/formats/wav.js';
import { encodeOggOpusBundled, encodeWebmOpusBundled } from '../dist/src/formats/opusBundled.js';
import { decodeWebmOpusBundled, demuxWebmOpus } from '../dist/src/formats/webmOpus.js';
import { OggOpusDecoder } from 'ogg-opus-decoder';
import createMp3Encoder from '@audio/encode-mp3';
import decodeMp3 from '@audio/decode-mp3';
import { createOggEncoder } from 'wasm-media-encoders';
import { OggVorbisDecoder } from '@wasm-audio-decoders/ogg-vorbis';
const rate = 44_100, frames = 4_410, left = new Float32Array(frames), right = new Float32Array(frames);
for (let i = 0; i < frames; i++) { left[i] = Math.sin(i / rate * Math.PI * 2 * 440) * .25; right[i] = Math.sin(i / rate * Math.PI * 2 * 444) * .25; }
const source = { sampleRate: rate, left, right, duration: frames / rate };
const flac = encodeFlac(source, 24), flacRoundTrip = decodeFlacVerbatim(flac);
assert.equal(flacRoundTrip.left.length, frames); assert.ok(Math.abs(flacRoundTrip.left[100] - left[100]) < 2e-6);
const mp3Encoder = await createMp3Encoder({ sampleRate: rate, channels: 2, bitrate: 192 }), chunks = [mp3Encoder.encode([left, right]), mp3Encoder.flush()]; mp3Encoder.free();
const bytes = new Uint8Array(chunks.reduce((n, x) => n + x.length, 0)); let offset = 0;
for (const chunk of chunks) { bytes.set(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength), offset); offset += chunk.length; }
assert.ok(bytes.length > 256 && bytes[0] === 0xff, 'LAME emitted a portable MP3 frame stream');
const decoded = await decodeMp3(bytes);
assert.equal(decoded.channelData.length, 2); assert.equal(decoded.sampleRate, rate); assert.ok(decoded.channelData[0].length > rate / 20, 'bundled mpg123 decoded emitted MP3');
const vorbisEncoder = await createOggEncoder(); vorbisEncoder.configure({sampleRate:rate,channels:2,vbrQuality:4});
const vorbisFirst = new Uint8Array(vorbisEncoder.encode([left,right])), vorbisLast = new Uint8Array(vorbisEncoder.finalize()), vorbis = new Uint8Array(vorbisFirst.length+vorbisLast.length); vorbis.set(vorbisFirst); vorbis.set(vorbisLast,vorbisFirst.length);
assert.equal(new TextDecoder('latin1').decode(vorbis.slice(0,4)),'OggS','libvorbis emitted Ogg capture stream');
const vorbisDecoder = new OggVorbisDecoder(); await vorbisDecoder.ready; const vorbisDecoded = await vorbisDecoder.decodeFile(vorbis); vorbisDecoder.free();
assert.equal(vorbisDecoded.sampleRate,rate); assert.equal(vorbisDecoded.channelData.length,2); assert.ok(vorbisDecoded.samplesDecoded > rate/20,'bundled libvorbis decoder decoded emitted Ogg');
const opusFrames = 4_800, opusLeft = new Float32Array(opusFrames), opusRight = new Float32Array(opusFrames); for (let i=0;i<opusFrames;i++){opusLeft[i]=Math.sin(i/48000*Math.PI*2*440)*.2;opusRight[i]=Math.sin(i/48000*Math.PI*2*444)*.2;}
const opusSource={sampleRate:48000,left:opusLeft,right:opusRight,duration:opusFrames/48000}, oggOpus=encodeOggOpusBundled(opusSource), webmOpus=encodeWebmOpusBundled(opusSource);
assert.equal(new TextDecoder('latin1').decode(oggOpus.slice(0,4)),'OggS'); assert.equal(new TextDecoder('latin1').decode(webmOpus.slice(0,4)),String.fromCharCode(0x1a,0x45,0xdf,0xa3));
const opusDecoder=new OggOpusDecoder({forceStereo:true}); await opusDecoder.ready; const opusDecoded=await opusDecoder.decodeFile(oggOpus); opusDecoder.free(); assert.equal(opusDecoded.channelData.length,2); assert.ok(opusDecoded.samplesDecoded>480,'bundled libopus encoded Ogg Opus is decodable');
const webmDemuxed=demuxWebmOpus(webmOpus), webmDecoded=decodeWebmOpusBundled(webmOpus); assert.equal(webmDemuxed.packets.length,5); assert.equal(webmDecoded.left.length,opusFrames); assert.ok(webmDecoded.left.every(Number.isFinite),'bundled WebM demux/decode is finite');
assert.throws(() => decodeWav(bytes), /RIFF|WAV/, 'hostile codec data cannot become PCM through the WAV parser');
console.log(`PASS codec regression: FLAC ${flac.length} B, MP3 ${bytes.length} B, Vorbis ${vorbis.length} B, Opus ${oggOpus.length}/${webmOpus.length} B, decoded ${decoded.channelData[0].length}/${vorbisDecoded.samplesDecoded}/${opusDecoded.samplesDecoded}/${webmDecoded.left.length} frames`);
