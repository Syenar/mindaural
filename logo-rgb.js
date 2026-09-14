(() => {
  const stage = document.querySelector('#logo-stage');
  const logo = document.querySelector('#logo');
  const readout = document.querySelector('#readout');
  const power = document.querySelector('#power');
  const mode = document.querySelector('#mode');
  const speed = document.querySelector('#speed');
  const intensity = document.querySelector('#intensity');
  const zoom = document.querySelector('#zoom');
  const bg = document.querySelector('#background');
  const transparent = document.querySelector('#transparent');
  const dropZone = document.querySelector('#drop-zone');
  const fileInput = document.querySelector('#logo-file');
  let customLogoUrl = '';
  let detectedBackground = false;
  const speedValue = document.querySelector('#speed-value');
  const intensityValue = document.querySelector('#intensity-value');
  const zoomValue = document.querySelector('#zoom-value');
  let running = true, frame = 0, start = performance.now();
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce) running = false;
  function text() { readout.textContent = `RGB lighting ${running ? 'on' : 'off'} · ${stage.classList.contains('rgb-background') ? 'RGB background' : 'Transparent background'} · ${mode.value[0].toUpperCase() + mode.value.slice(1)} · ${customLogoUrl ? 'Imported logo' : 'Built-in logo'}${detectedBackground ? ' · Background layer detected' : ''}`; }
  async function loadLogo(file) { if (!file || !/^(image\/(svg\+xml|png|jpeg)|\.svg$|\.png$|\.jpe?g$)/i.test(file.type || file.name)) return; if (customLogoUrl) URL.revokeObjectURL(customLogoUrl); detectedBackground = false; if ((file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg'))) { const source = await file.text(); const doc = new DOMParser().parseFromString(source, 'image/svg+xml'); const layers = [...doc.querySelectorAll('path,rect,polygon,ellipse')]; const bgLayer = layers.find((layer, index) => index === 0 && (!layer.getAttribute('fill') || /^#?(000|000000)$/i.test(layer.getAttribute('fill') || '') || layer.classList.contains('cls-1'))); if (bgLayer) { bgLayer.remove(); detectedBackground = true; } const cleaned = new XMLSerializer().serializeToString(doc); customLogoUrl = URL.createObjectURL(new Blob([cleaned], {type:'image/svg+xml'})); } else { customLogoUrl = URL.createObjectURL(file); } logo.src = customLogoUrl; logo.alt = `${file.name} RGB preview`; text(); }
  function tick(now) {
    if (running) {
      const elapsed = (now - start) / 1000;
      const rate = Number(speed.value) / 100 * 42;
      const hue = (elapsed * rate) % 360;
      const wave = mode.value === 'aurora' ? Math.sin(elapsed * 1.2) * 42 : mode.value === 'pulse' ? 0 : 0;
      logo.style.setProperty('--logo-hue', `${hue + wave}deg`);
      stage.style.setProperty('--bg-hue', `${(hue + 210) % 360}`);
      stage.style.setProperty('--bg-angle', `${hue}deg`);
    }
    frame = requestAnimationFrame(tick);
  }
  power.addEventListener('click', () => { running = !running; power.classList.toggle('active', running); power.textContent = running ? 'On' : 'Off'; stage.classList.toggle('paused', !running); text(); });
  mode.addEventListener('change', () => { stage.classList.toggle('pulse', mode.value === 'pulse'); text(); });
  speed.addEventListener('input', () => { speedValue.textContent = `${speed.value}%`; });
  intensity.addEventListener('input', () => { logo.style.setProperty('--logo-saturation', `${Number(intensity.value) / 100}`); intensityValue.textContent = `${intensity.value}%`; });
  zoom.addEventListener('input', () => { logo.style.setProperty('--logo-zoom', `${zoom.value}%`); zoomValue.textContent = `${zoom.value}%`; });
  bg.addEventListener('click', () => { stage.classList.add('rgb-background'); stage.classList.remove('no-background'); bg.classList.add('active'); transparent.classList.remove('active'); bg.setAttribute('aria-pressed','true'); transparent.setAttribute('aria-pressed','false'); text(); });
  transparent.addEventListener('click', () => { stage.classList.add('no-background'); stage.classList.remove('rgb-background'); transparent.classList.add('active'); bg.classList.remove('active'); transparent.setAttribute('aria-pressed','true'); bg.setAttribute('aria-pressed','false'); text(); });
  fileInput.addEventListener('change', () => loadLogo(fileInput.files?.[0]));
  ['dragenter','dragover'].forEach(type => dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.add('dragging'); }));
  ['dragleave','drop'].forEach(type => dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.remove('dragging'); }));
  dropZone.addEventListener('drop', event => { void loadLogo(event.dataTransfer?.files?.[0]); });
  stage.classList.toggle('pulse', mode.value === 'pulse');
  text();
  frame = requestAnimationFrame(tick);
})();
