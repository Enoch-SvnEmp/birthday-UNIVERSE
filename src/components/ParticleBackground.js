export function createParticleBackground(root) {
  const canvas = document.createElement("canvas");
  canvas.className = "particle-canvas";
  canvas.setAttribute("aria-hidden", "true");
  root.appendChild(canvas);

  const context = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let particles = [];
  let animationFrame = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const mobile = width < 760;
    const count = reduceMotion ? 24 : mobile ? 58 : 110;
    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.35,
      speed: reduceMotion ? 0 : Math.random() * 0.22 + 0.04,
      phase: Math.random() * Math.PI * 2,
      hue: index % 5 === 0 ? "36, 100%, 69%" : index % 3 === 0 ? "206, 100%, 72%" : "0, 0%, 96%",
    }));
  }

  function draw(time = 0) {
    context.clearRect(0, 0, width, height);
    const drift = time * 0.00035;

    particles.forEach((particle) => {
      if (!reduceMotion) {
        particle.y += particle.speed;
        particle.x += Math.sin(drift + particle.phase) * 0.08;
        if (particle.y > height + 8) particle.y = -8;
      }

      const pulse = reduceMotion ? 0.68 : 0.45 + Math.sin(time * 0.0012 + particle.phase) * 0.22;
      context.beginPath();
      context.fillStyle = `hsla(${particle.hue}, ${Math.max(0.22, pulse)})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    if (!reduceMotion) {
      animationFrame = window.requestAnimationFrame(draw);
    }
  }

  resize();
  draw();
  window.addEventListener("resize", resize, { passive: true });

  return {
    destroy() {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
      canvas.remove();
    },
  };
}
