(() => {
  const $ = (s) => document.querySelector(s), stage = $('#logo-stage'), logo = $('#logo'), readout = $('#readout');
  const power = $('#power'), logoChoice = $('#logo-choice'), mode = $('#mode'), speed = $('#speed'), intensity = $('#intensity');
  const hueOffset = $('#hue-offset'), bgIntensity = $('#bg-intensity'), zoom = $('#zoom'), direction = $('#direction');
  const bg = $('#background'), transparent = $('#transparent'), dropZone = $('#drop-zone'), fileInput = $('#logo-file');
  const builtIn = { icon: './assets/logos/with_bg/Mindaural_logo_final_1x.svg', name: './assets/logos/name_logo/Mindaural_name_logo_final.svg' };
  let logoUrl = '', logoLabel = 'Built-in icon logo', detectedBackground = false, reverse = false, frame = 0;
  let running = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const start = performance.now();
  const say = () => { const backgroundMode = stage.classList.contains('rgb-background') ? 'Added RGB glow' : (detectedBackground ? 'Logo background preserved' : 'No external background'); readout.textContent = `RGB lighting ${running ? 'on' : 'off'} · ${backgroundMode} · ${mode.value[0].toUpperCase() + mode.value.slice(1)} · ${logoLabel}${detectedBackground ? ' · Background layer detected' : ''}`; };
  function cleanSvg(source) {
    const doc = new DOMParser().parseFromString(source, 'image/svg+xml');
    if (doc.querySelector('parsererror')) throw new Error('Invalid SVG');
    const layers = [...doc.querySelectorAll('path,rect,polygon,ellipse')];
    const background = layers.find((layer, index) => index === 0 && (layer.classList.contains('cls-1') || !layer.getAttribute('fill') || /^#?(000|000000)$/i.test(layer.getAttribute('fill') || '')));
    detectedBackground = Boolean(background);
    return new XMLSerializer().serializeToString(doc);
  }
  function setLogo(url, label) { if (logoUrl) URL.revokeObjectURL(logoUrl); logoUrl = url; logoLabel = label; logo.src = url; logo.alt = `${label} RGB preview`; say(); }
  async function loadBuiltIn(source, label) { try { const response = await fetch(source); if (!response.ok) throw new Error('asset unavailable'); setLogo(URL.createObjectURL(new Blob([cleanSvg(await response.text())], { type: 'image/svg+xml' })), label); } catch { readout.textContent = `Unable to load ${label}.`; } }
  async function loadFile(file) {
    if (!file || !/^(image\/(svg\+xml|png|jpeg)|\.svg$|\.png$|\.jpe?g$)/i.test(file.type || file.name)) return;
    detectedBackground = false;
    if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) { try { setLogo(URL.createObjectURL(new Blob([cleanSvg(await file.text())], { type: 'image/svg+xml' })), `Imported ${file.name}`); } catch { readout.textContent = 'Unable to read that SVG.'; } }
    else setLogo(URL.createObjectURL(file), `Imported ${file.name}`);
  }
  function tick(now) {
    if (running) { const elapsed = (now - start) / 1000, base = elapsed * (Number(speed.value) / 100 * 42) * (reverse ? -1 : 1) + Number(hueOffset.value), wave = mode.value === 'aurora' ? Math.sin(elapsed * 1.2) * 42 : 0; logo.style.setProperty('--logo-hue', `${base + wave}deg`); stage.style.setProperty('--bg-hue', `${(base + 210) % 360}`); stage.style.setProperty('--bg-angle', `${base}deg`); }
    frame = requestAnimationFrame(tick);
  }
  power.addEventListener('click', () => { running = !running; power.classList.toggle('active', running); power.setAttribute('aria-pressed', String(running)); power.textContent = running ? 'On' : 'Off'; stage.classList.toggle('paused', !running); say(); });
  logoChoice.addEventListener('change', () => void loadBuiltIn(builtIn[logoChoice.value], logoChoice.value === 'name' ? 'Built-in name logo' : 'Built-in icon logo'));
  mode.addEventListener('change', () => { stage.classList.toggle('pulse', mode.value === 'pulse'); say(); });
  speed.addEventListener('input', () => { $('#speed-value').textContent = `${speed.value}%`; });
  intensity.addEventListener('input', () => { logo.style.setProperty('--logo-saturation', Number(intensity.value) / 100); $('#intensity-value').textContent = `${intensity.value}%`; });
  hueOffset.addEventListener('input', () => { $('#hue-value').textContent = `${hueOffset.value}°`; });
  bgIntensity.addEventListener('input', () => { stage.style.setProperty('--bg-opacity', Number(bgIntensity.value) / 100); $('#bg-value').textContent = `${bgIntensity.value}%`; });
  zoom.addEventListener('input', () => { logo.style.setProperty('--logo-zoom', `${zoom.value}%`); $('#zoom-value').textContent = `${zoom.value}%`; });
  direction.addEventListener('click', () => { reverse = !reverse; direction.classList.toggle('active', reverse); direction.setAttribute('aria-pressed', String(reverse)); direction.textContent = reverse ? 'Forward direction' : 'Reverse direction'; });
  bg.addEventListener('click', () => { stage.classList.add('rgb-background'); stage.classList.remove('no-background'); bg.classList.add('active'); transparent.classList.remove('active'); bg.setAttribute('aria-pressed','true'); transparent.setAttribute('aria-pressed','false'); say(); });
  transparent.addEventListener('click', () => { stage.classList.add('no-background'); stage.classList.remove('rgb-background'); transparent.classList.add('active'); bg.classList.remove('active'); transparent.setAttribute('aria-pressed','true'); bg.setAttribute('aria-pressed','false'); say(); });
  fileInput.addEventListener('change', () => void loadFile(fileInput.files?.[0]));
  ['dragenter','dragover'].forEach(type => dropZone.addEventListener(type, e => { e.preventDefault(); dropZone.classList.add('dragging'); }));
  ['dragleave','drop'].forEach(type => dropZone.addEventListener(type, e => { e.preventDefault(); dropZone.classList.remove('dragging'); }));
  dropZone.addEventListener('drop', e => void loadFile(e.dataTransfer?.files?.[0]));
  stage.style.setProperty('--bg-opacity', Number(bgIntensity.value) / 100); stage.classList.toggle('pulse', mode.value === 'pulse'); say(); void loadBuiltIn(builtIn.icon, 'Built-in icon logo'); frame = requestAnimationFrame(tick);
})();
