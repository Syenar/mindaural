import { renderProject } from './render.js';
export class LiveEngine {
    ctx = null;
    node = null;
    fallback = false;
    fallbackSource = null;
    fallbackProject = null;
    fallbackAssets = {};
    fallbackOffset = 0;
    ended = () => { };
    async init() { if (this.ctx)
        return; this.ctx = new AudioContext(); try {
        await this.ctx.audioWorklet.addModule('./public/worklet.js');
        this.node = new AudioWorkletNode(this.ctx, 'binaural-studio', { numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [2] });
        this.node.channelCount = 2;
        this.node.channelCountMode = 'explicit';
        this.node.channelInterpretation = 'discrete';
        this.node.port.onmessage = (e) => { if (e.data?.type === 'ended')
            this.ended(); };
        this.node.connect(this.ctx.destination);
    }
    catch {
        this.fallback = true;
    } }
    async playFallbackChunk() { if (!this.ctx || !this.fallbackProject)
        return; const p = this.fallbackProject, remaining = Math.max(0, p.duration - this.fallbackOffset); if (remaining <= 0) {
        this.ended();
        return;
    } const duration = Math.min(30, remaining), rendered = renderProject(p, { start: this.fallbackOffset, duration, assets: this.fallbackAssets }); const buffer = this.ctx.createBuffer(2, rendered.left.length, rendered.sampleRate); buffer.copyToChannel(rendered.left, 0); buffer.copyToChannel(rendered.right, 1); const source = this.ctx.createBufferSource(); source.buffer = buffer; source.connect(this.ctx.destination); this.fallbackSource = source; this.fallbackOffset += duration; source.onended = () => { if (this.fallbackSource === source) {
        this.fallbackSource = null;
        void this.playFallbackChunk();
    } }; source.start(); }
    async start(project, position = 0, onEnded, assets = {}) { if (position !== 0)
        throw new Error('Non-zero live seek is not enabled until exact phase/noise state transfer is available.'); await this.init(); if (onEnded)
        this.ended = onEnded; await this.ctx.resume(); if (this.fallback) {
        this.fallbackProject = structuredClone(project);
        this.fallbackAssets = assets;
        this.fallbackOffset = 0;
        await this.playFallbackChunk();
        return;
    } this.node.port.postMessage({ type: 'project', project: structuredClone(project), assets }); this.node.port.postMessage({ type: 'start', position: 0 }); }
    update(project, assets = {}) { if (this.fallback) {
        this.fallbackProject = structuredClone(project);
        this.fallbackAssets = assets;
        return;
    } this.node?.port.postMessage({ type: 'project', project: structuredClone(project), assets }); }
    async pause() { await this.ctx?.suspend(); }
    async resume() { await this.ctx?.resume(); }
    stop() { if (this.fallback) {
        try {
            this.fallbackSource?.stop();
        }
        catch { }
        this.fallbackSource?.disconnect();
        this.fallbackSource = null;
        this.fallbackProject = null;
        return;
    } this.node?.port.postMessage({ type: 'stop' }); }
    get sampleRate() { return this.ctx?.sampleRate ?? 0; }
}
//# sourceMappingURL=liveEngine.js.map