export function download(name, data, type = 'application/octet-stream') {
    const blob = data instanceof Blob ? data : new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function fmt(value, digits = 1) {
    return Number.isFinite(value) ? value.toFixed(digits) : '—';
}
export function evidenceClass(state) {
    return state.toLowerCase().replace(/\s+/g, '-');
}
//# sourceMappingURL=appUtils.js.map