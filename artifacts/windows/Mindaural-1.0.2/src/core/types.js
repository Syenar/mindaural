// App/engine versions advance independently from the stable session schema.
export const APP_VERSION = '1.0.2';
export const ENGINE_VERSION = '1.0.2-webgpu';
export const uid = (prefix = 'id') => `${prefix}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`;
//# sourceMappingURL=types.js.map