// Bird flocks for the living hero: 2–5 birds cross the sky from either side every 7–16 s,
// flapping and bobbing, and are dropped once off-screen (no growth over time).
export function createBirds(canvas) {
  const ctx = canvas.getContext("2d");
  let flocks = [];
  let nextFlock = 6;
  let w = 0;
  let h = 0;

  function resize() {
    const d = Math.min(2, window.devicePixelRatio || 1);
    const r = canvas.getBoundingClientRect();
    w = r.width;
    h = r.height;
    canvas.width = Math.max(1, Math.round(w * d));
    canvas.height = Math.max(1, Math.round(h * d));
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }

  function spawn() {
    const dir = Math.random() < 0.5 ? 1 : -1;
    const n = 2 + Math.floor(Math.random() * 4);
    const size = 5 + Math.random() * 5;
    const y0 = h * (0.12 + Math.random() * 0.2);
    const speed = (22 + Math.random() * 22) * (size / 8);
    const birds = [];
    for (let i = 0; i < n; i++)
      birds.push({
        dx: -i * (14 + Math.random() * 8) * dir,
        dy: (i % 2 ? 1 : -1) * Math.ceil(i / 2) * (8 + Math.random() * 4),
        ph: Math.random() * 6.28,
        fr: 7 + Math.random() * 3,
        s: size * (0.8 + Math.random() * 0.4),
      });
    flocks.push({ x: dir > 0 ? -60 : w + 60, y: y0, dir, speed, birds, bob: Math.random() * 6.28 });
  }

  function drawBird(x, y, s, flap) {
    const k = Math.sin(flap);
    ctx.beginPath();
    ctx.moveTo(x - s, y - k * s * 0.55);
    ctx.quadraticCurveTo(x - s * 0.45, y - s * 0.15 - k * s * 0.25, x, y);
    ctx.quadraticCurveTo(x + s * 0.45, y - s * 0.15 - k * s * 0.25, x + s, y - k * s * 0.55);
    ctx.strokeStyle = "rgba(30,45,40,.7)";
    ctx.lineWidth = Math.max(1.2, s * 0.22);
    ctx.lineCap = "round";
    ctx.stroke();
  }

  function step(dt) {
    ctx.clearRect(0, 0, w, h);
    nextFlock -= dt;
    if (nextFlock <= 0) {
      spawn();
      nextFlock = 7 + Math.random() * 9;
    }
    flocks = flocks.filter((f) => {
      f.x += f.dir * f.speed * dt;
      f.bob += dt * 0.8;
      const yy = f.y + Math.sin(f.bob) * 6;
      f.birds.forEach((b) => {
        b.ph += dt * b.fr;
        drawBird(f.x + b.dx, yy + b.dy + Math.sin(b.ph * 0.3) * 2, b.s, b.ph);
      });
      return f.dir > 0 ? f.x < w + 200 : f.x > -200;
    });
  }

  resize();
  return { resize, step, clear: () => ctx.clearRect(0, 0, w, h) };
}
