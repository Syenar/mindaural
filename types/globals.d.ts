declare const React: {
  StrictMode: any;
  useState<T>(initial:T|(()=>T)):[T,(value:T|((prev:T)=>T))=>void];
  useEffect(effect:()=>void|(()=>void),deps?:any[]):void;
  useRef<T>(initial:T):{current:T};
};
declare const ReactDOM: { createRoot(el:Element|null):{render(node:any):void} };
declare const AudioWorkletProcessor: { new(): { port:{onmessage:((e:any)=>void)|null;postMessage(v:any):void} } };
declare const sampleRate: number;
declare function registerProcessor(name: string, processorCtor: any): void;
declare namespace JSX { interface IntrinsicElements { [elemName: string]: any; } }
interface Navigator { gpu?: any; serial?: any; bluetooth?: any; requestMIDIAccess?: any; }
declare module 'wasm-media-encoders' { export const createOggEncoder: () => Promise<any>; }
declare module 'opusscript' { const OpusScript: any; export default OpusScript; }
