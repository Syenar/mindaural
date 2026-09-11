export function download(name: string, data: Uint8Array | Blob, type = 'application/octet-stream') {
  const blob = data instanceof Blob ? data : new Blob([data as BlobPart], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function fmt(value: number, digits = 1) {
  return Number.isFinite(value) ? value.toFixed(digits) : '—';
}

export function evidenceClass(state: string) {
  return state.toLowerCase().replace(/\s+/g, '-');
}
