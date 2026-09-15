(() => {
  const $ = (s) => document.querySelector(s), stage = $('#logo-stage'), logo = $('#logo'), readout = $('#readout');
  const power = $('#power'), logoChoice = $('#logo-choice'), mode = $('#mode'), speed = $('#speed'), intensity = $('#intensity');
  const hueOffset = $('#hue-offset'), bgIntensity = $('#bg-intensity'), zoom = $('#zoom'), direction = $('#direction'), contrast = $('#contrast');
  const customColors = $('#custom-colors'), customA = $('#custom-a'), customB = $('#custom-b');
  const dropZone = $('#drop-zone'), fileInput = $('#logo-file');
  const builtIn = { icon: './assets/logos/with_bg/Mindaural_logo_final_1x.svg', name: './assets/logos/name_logo/Mindaural_name_logo_final.svg' };
  let logoUrl = '', logoLabel = 'Built-in icon logo', backgroundLayer = null, detectedBackground = false, reverse = false, contrastProtected = true, frame = 0;
  let running = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const start = performance.now();
  const say = () => { readout.textContent = `RGB lighting ${running ? 'on' : 'off'} · ${detectedBackground ? 'SVG background RGB' : 'No detected SVG background'} · ${mode.value[0].toUpperCase() + mode.value.slice(1)} · ${logoLabel}${detectedBackground ? ' · Background layer detected' : ''} · Contrast ${contrastProtected ? 'protected' : 'unrestricted'}`; };
  async function removeConnectedBlack(dataUrl) {
    const image = new Image();
    image.src = dataUrl.replace(/^data:img\/png/i, 'data:image/png');
    await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; });
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = pixels;
    const visited = new Uint8Array(width * height);
    const isBlack = (offset) => data[offset + 3] > 0 && Math.max(data[offset], data[offset + 1], data[offset + 2]) < 64;
    const threshold = Math.max(200, Math.floor(width * height * 0.02));
    for (let seed = 0; seed < width * height; seed += 1) {
      if (visited[seed] || !isBlack(seed * 4)) continue;
      const component = [seed];
      const stack = [seed];
      visited[seed] = 1;
      while (stack.length) {
        const index = stack.pop();
        const x = index % width, y = Math.floor(index / width);
        const neighbors = [index - 1, index + 1, index - width, index + width];
        if (x === 0) neighbors[0] = -1;
        if (x === width - 1) neighbors[1] = -1;
        if (y === 0) neighbors[2] = -1;
        if (y === height - 1) neighbors[3] = -1;
        for (const next of neighbors) {
          if (next < 0 || next >= width * height || visited[next] || !isBlack(next * 4)) continue;
          visited[next] = 1;
          component.push(next);
          stack.push(next);
        }
      }
      if (component.length >= threshold) component.forEach(index => { data[index * 4 + 3] = 0; });
    }
    context.putImageData(pixels, 0, 0);
    return canvas.toDataURL('image/png');
  }
  async function cleanSvg(source) {
    const doc = new DOMParser().parseFromString(source, 'image/svg+xml');
    if (doc.querySelector('parsererror')) throw new Error('Invalid SVG');
    const layers = [...doc.querySelectorAll('path,rect,polygon,ellipse')];
    const background = layers.find((layer, index) => index === 0 && (layer.classList.contains('cls-1') || !layer.getAttribute('fill') || /^#?(000|000000)$/i.test(layer.getAttribute('fill') || '')));
    detectedBackground = Boolean(background); background?.setAttribute('data-rgb-background', 'true');
    for (const image of doc.querySelectorAll('image')) {
      image.setAttribute('data-rgb-art', 'true');
      image.setAttribute('style', 'mix-blend-mode:screen');
      const href = image.getAttribute('href') || image.getAttribute('xlink:href') || '';
      if (/^data:(?:image|img)\/png;base64,/i.test(href)) {
        try {
          const transparent = await removeConnectedBlack(href);
          image.setAttribute('href', transparent);
          image.setAttribute('xlink:href', transparent);
        } catch { /* Keep the original artwork if the browser cannot raster-process it. */ }
      }
    }
    return new XMLSerializer().serializeToString(doc);
  }
  function setSvg(markup, label) { if (logoUrl) URL.revokeObjectURL(logoUrl); logoUrl = ''; logo.innerHTML = markup; logoLabel = label; logo.setAttribute('aria-label', `${label} RGB preview`); backgroundLayer = logo.querySelector('[data-rgb-background]'); say(); }
  function setImage(url, label) { if (logoUrl) URL.revokeObjectURL(logoUrl); logoUrl = url; logo.innerHTML = ''; const image = document.createElement('img'); image.src = url; image.alt = `${label} RGB preview`; logo.append(image); logoLabel = label; backgroundLayer = null; detectedBackground = false; say(); }
  async function loadBuiltIn(source, label) { try { const response = await fetch(source); if (!response.ok) throw new Error('asset unavailable'); setSvg(await cleanSvg(await response.text()), label); } catch { readout.textContent = `Unable to load ${label}.`; } }
  async function loadFile(file) { if (!file || !/^(image\/(svg\+xml|png|jpeg)|\.svg$|\.png$|\.jpe?g$)/i.test(file.type || file.name)) return; if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) { try { setSvg(await cleanSvg(await file.text()), `Imported ${file.name}`); } catch { readout.textContent = 'Unable to read that SVG.'; } } else setImage(URL.createObjectURL(file), `Imported ${file.name}`); }
  function tick(now) {
    if (running) {
      const elapsed = (now - start) / 1000, base = elapsed * (Number(speed.value) / 100 * 42) * (reverse ? -1 : 1) + Number(hueOffset.value);
      const palettes = { ocean: [185, 205, 225], sunset: [8, 28, 318], fire: [4, 24, 45], ice: [190, 210, 235] };
      const palette = palettes[mode.value];
      const phase = elapsed * (Number(speed.value) / 100 * 1.2) * (reverse ? -1 : 1);
      const paletteHue = palette ? palette[Math.floor(Math.abs(phase) % palette.length)] + Math.sin(phase) * 10 : base;
      const wave = mode.value === 'aurora' ? Math.sin(elapsed * 1.2) * 42 : mode.value === 'wave' ? Math.sin(phase) * 120 : 0;
      const hue = mode.value === 'static' ? Number(hueOffset.value) + 210 : paletteHue + wave;
      const lightness = mode.value === 'fire' ? 20 + (Math.sin(elapsed * 4) + 1) * 5 : 18 + Number(bgIntensity.value) * .18;
      const custom = mode.value === 'custom' ? (Math.sin(phase) > 0 ? customA.value : customB.value) : `hsl(${hue} 68% ${lightness}%)`;
      backgroundLayer?.style.setProperty('fill', custom); backgroundLayer?.style.setProperty('stroke', custom); logo.style.setProperty('--logo-hue', `${hue}deg`);
    }
    frame = requestAnimationFrame(tick);
  }
  power.addEventListener('click', () => { running = !running; power.classList.toggle('active', running); power.setAttribute('aria-pressed', String(running)); power.textContent = running ? 'On' : 'Off'; stage.classList.toggle('paused', !running); say(); });
  logoChoice.addEventListener('change', () => void loadBuiltIn(builtIn[logoChoice.value], logoChoice.value === 'name' ? 'Built-in name logo' : 'Built-in icon logo'));
  mode.addEventListener('change', () => { stage.classList.toggle('pulse', mode.value === 'pulse'); customColors.hidden = mode.value !== 'custom'; say(); }); customA.addEventListener('input', () => {}); customB.addEventListener('input', () => {}); speed.addEventListener('input', () => { $('#speed-value').textContent = `${speed.value}%`; });
  intensity.addEventListener('input', () => { logo.style.setProperty('--logo-saturation', Number(intensity.value) / 100); $('#intensity-value').textContent = `${intensity.value}%`; });
  hueOffset.addEventListener('input', () => { $('#hue-value').textContent = `${hueOffset.value}°`; }); bgIntensity.addEventListener('input', () => { $('#bg-value').textContent = `${bgIntensity.value}%`; });
  zoom.addEventListener('input', () => { logo.style.setProperty('--logo-zoom', `${zoom.value}%`); $('#zoom-value').textContent = `${zoom.value}%`; }); direction.addEventListener('click', () => { reverse = !reverse; direction.classList.toggle('active', reverse); direction.setAttribute('aria-pressed', String(reverse)); direction.textContent = reverse ? 'Forward direction' : 'Reverse direction'; });
  contrast.addEventListener('change', () => { contrastProtected = contrast.checked; logo.classList.toggle('contrast-protected', contrastProtected); say(); });
  fileInput.addEventListener('change', () => void loadFile(fileInput.files?.[0])); ['dragenter','dragover'].forEach(type => dropZone.addEventListener(type, e => { e.preventDefault(); dropZone.classList.add('dragging'); })); ['dragleave','drop'].forEach(type => dropZone.addEventListener(type, e => { e.preventDefault(); dropZone.classList.remove('dragging'); })); dropZone.addEventListener('drop', e => void loadFile(e.dataTransfer?.files?.[0]));
  logo.classList.add('contrast-protected'); say(); void loadBuiltIn(builtIn.icon, 'Built-in icon logo'); frame = requestAnimationFrame(tick);
})();
