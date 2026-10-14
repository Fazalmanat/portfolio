// Pure geometry for the snowflake: arms -> twigs -> forked sub-branches -> skill nodes.
export const ROOT = 32, R = 14, CAPW = 108, CAPH = 38, LH = 14;
const ARMS = [[282, 0], [262, 5], [290, -4], [268, 4], [284, -6]]; // [length, angle offset] (slightly uneven on purpose)
const rad = (d) => (d * Math.PI) / 180;
const O = { x: 0, y: 0 };
const pt = (p, r, a) => ({ x: p.x + r * Math.cos(a), y: p.y + r * Math.sin(a) });
const box = (cx, cy, w, h) => ({ x: cx - w / 2, y: cy - h / 2, w, h });
const hit = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

export function layoutSkills(cats) {
  const n = cats.length;
  const placed = [box(0, 0, 2 * ROOT, 2 * ROOT)];

  const arms = cats.map((cat, i) => {
    const [len, off] = ARMS[i % ARMS.length];
    const a = rad(-90 + (360 / n) * i + off);
    const start = pt(O, ROOT, a), end = pt(O, len, a);
    const cap = box(end.x, end.y, CAPW, CAPH);
    placed.push(cap);
    const nodes = [];
    const groups = Math.ceil(cat.skills.length / 2);
    const r0 = 120, r1 = len - 86, stepR = groups > 1 ? (r1 - r0) / (groups - 1) : 0;
    for (let g = 0; g < groups; g++) {
      const side = g % 2 ? -1 : 1; // pinwheel: twigs lean the same way on every arm
      const base = pt(O, r0 + g * stepR, a);
      const ta = a + side * rad(56 + ((g * 7 + i * 3) % 10));
      const joint = pt(base, 36 + ((g * 5 + i * 4) % 12), ta);
      cat.skills.slice(g * 2, g * 2 + 2).forEach((skill, j) => {
        const tb = ta + (j ? -1 : 1) * rad(34 + (((g + j) * 4) % 8));
        const p = pt(joint, 28 + (((g + i + j) * 3) % 8), tb);
        nodes.push({ skill, x: p.x, y: p.y, base, joint, ang: tb });
        placed.push(box(p.x, p.y, 2 * R + 4, 2 * R + 4));
      });
    }
    return { cat, start, end, cap, nodes };
  });

  // Labels: first free spot out of right/left/above/below, so nothing overlaps.
  arms.forEach((arm) => arm.nodes.forEach((nd) => {
    const w = nd.skill.length * 6 + 4;
    const spots = {
      r: { x: nd.x + R + 4, y: nd.y - LH / 2 }, l: { x: nd.x - R - 4 - w, y: nd.y - LH / 2 },
      t: { x: nd.x - w / 2, y: nd.y - R - 4 - LH }, b: { x: nd.x - w / 2, y: nd.y + R + 4 }
    };
    const order = Math.cos(nd.ang) >= 0 ? ['r', 'l', 't', 'b'] : ['l', 'r', 't', 'b'];
    nd.label = null;
    for (const s of order) {
      const rect = { ...spots[s], w, h: LH };
      const probe = { x: rect.x - 2, y: rect.y - 1, w: w + 4, h: LH + 2 };
      if (!placed.some((b) => hit(probe, b))) { nd.label = { side: s, ...rect }; placed.push(probe); break; }
    }
    nd.fallback = { side: 'b', ...spots.b, w, h: LH };
  }));

  const all = [...placed];
  const x0 = Math.min(...all.map((b) => b.x)) - 12, y0 = Math.min(...all.map((b) => b.y)) - 12;
  const x1 = Math.max(...all.map((b) => b.x + b.w)) + 12, y1 = Math.max(...all.map((b) => b.y + b.h)) + 12;
  return { arms, vb: [x0, y0, x1 - x0, y1 - y0] };
}