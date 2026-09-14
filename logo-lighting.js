(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-rgb-logo], .brand-logo, .login-shell .logo').forEach((element) => {
    if (reduced) return;
    const start = performance.now();
    const tick = (now) => {
      const hue = ((now - start) / 1000 * 18) % 360;
      element.style.filter = `hue-rotate(${hue}deg) saturate(1.3) brightness(1.05)`;
      element._rgbFrame = requestAnimationFrame(tick);
    };
    element._rgbFrame = requestAnimationFrame(tick);
  });
})();
