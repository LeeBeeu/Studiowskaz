// Obliczenia: wskaźnik modelowy dla kierunków z bazy ogólnej i punkty wg wzorów uczelni dla architektury.
// Działa w przeglądarce (globalne stałe z data.js i architektura.js) i w testach (node).
/* global SUBJ, K, U, ARCH, AW, TYPES, DEGS, PPM */
const KMAP = {}; K.forEach(k => KMAP[k[0]] = {id: k[0], name: k[1], area: k[2], pop: k[3], v: k[4], celBase: k[5]});
const UMAP = {}; U.forEach(u => UMAP[u[0]] = {id: u[0], name: u[1], short: u[2], city: u[3], type: u[4], tier: u[5], dom: u[6]});
const parseF = s => s.split(";").map(p => {const [a, w] = p.split(":"); const pr = a.startsWith("!"); return {subs: (pr ? a.slice(1) : a).split("|"), w: +w, pr};});
const CEL = {1: 38, 2: 50, 3: 62, 4: 73, 5: 84};
function norm(s) {return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0142/g, "l");}
function num(x) {return (x === "" || x == null || isNaN(+x)) ? null : Math.max(0, Math.min(100, +x));}
const fmt = (x, d = 1) => x.toFixed(d).replace(".", ",");

const OFFERS = [];
U.forEach(u => {
  const uu = UMAP[u[0]];
  [...new Set(u[7].split(/\s+/).filter(Boolean))].forEach(kid => {
    const k = KMAP[kid]; if (!k || kid === "arc" || kid === "aw") return;
    const [deg, f] = k.v[uu.type] || k.v.d;
    let comp = Math.max(1, Math.min(5, Math.round(k.pop * .55 + uu.tier * .45)));
    let cel = k.celBase ? k.celBase - (5 - uu.tier) * 2 : CEL[comp];
    if (uu.type === "prv") {comp = Math.min(comp, 2); cel = 30;}
    OFFERS.push({id: uu.id + ":" + kid, u: uu, k, deg, comps: parseF(f), f, comp, cel,
      text: norm([k.name, k.area, uu.name, uu.short, uu.city, TYPES[uu.type], DEGS[deg]].join(" "))});
  });
});

/* ---------- architektura: punkty w skali uczelni ---------- */
function combos(t) {return t.k || [[t.pp, 0], [0, t.pr]];}
function termMax(t) {return t.max != null ? t.max : 100 * Math.max(...combos(t).map(([x, y]) => x + y));}
function archMax(c) {
  return c.matura.reduce((a, t) => a + t.w * termMax(t) * (t.n || 1), 0) + (c.egzamin ? c.egzamin.w * c.egzamin.max : 0);
}
function subjBest(prof, s, t) {
  const p = prof[s] || {}; const pr = num(p.pr), pp = num(p.pp);
  if (pr == null && pp == null) return null;
  let best = null;
  combos(t).forEach(([x, y]) => {
    if ((x && pp == null && !y) || (y && pr == null && !x)) return;
    const v = x * (pp ?? 0) + y * (pr ?? 0);
    const lvl = x && y ? (pr == null ? "PP" : pp == null ? "PR" : "PP+PR") : x ? "PP" : "PR";
    if (!best || v > best.val) best = {sub: s, lvl, pct: lvl === "PP" ? pp : lvl === "PR" ? pr : null, pp, pr, val: v};
  });
  return best;
}
function archCompute(a, prof) {
  const c = a.calc;
  if (!c) return {index: 0, points: 0, max: 0, parts: [], missing: [], noCalc: true, sw: 1};
  const parts = [], missing = []; let points = 0;
  c.matura.forEach(t => {
    const n = t.n || 1;
    const got = t.s.map(s => subjBest(prof, s, t)).filter(Boolean).sort((x, y) => y.val - x.val).slice(0, n);
    got.forEach(g => {points += t.w * g.val; parts.push({t, ...g, pts: t.w * g.val, max: t.w * termMax(t)});});
    for (let i = got.length; i < n; i++) {if (!t.opt) missing.push(t); parts.push({t, sub: null, lvl: null, pts: 0, max: t.w * termMax(t), opt: !!t.opt});}
  });
  let exam = null, examBelow = false;
  if (c.egzamin) {
    const e = c.egzamin, pct = num((prof.rys || {}).pr);
    const pts = pct == null ? 0 : pct / 100 * e.max;
    examBelow = pct == null || pts < e.min;
    exam = {e, pct, pts, w: e.w, total: e.w * pts};
    points += e.w * pts;
  }
  const max = archMax(c);
  return {index: points / max * 100, points, max, parts, missing, exam, examBelow, sw: 1};
}
// Kierunki z pełną bazą (wzory uczelni): architektura i architektura wnętrz.
const DETAIL = {
  arc: {list: ARCH, prefix: "arch:", pop: 4},
  aw: {list: AW, prefix: "aw:", pop: 3}
};
Object.entries(DETAIL).forEach(([kid, d]) => d.list.forEach(a => {
  const u = {id: a.id, name: a.name, short: a.short, city: a.city, type: a.type, tier: a.tier, dom: a.dom};
  let cel = CEL[Math.max(1, Math.min(5, Math.round(d.pop * .55 + a.tier * .45)))], celSrc = "szacunek";
  if (a.prog && a.calc) {cel = a.prog.v / archMax(a.calc) * 100; celSrc = "próg " + a.prog.rok;}
  if (a.type === "prv") cel = 0;
  const k = KMAP[kid];
  OFFERS.push({id: d.prefix + a.id, arch: a, u, k, deg: a.deg, cel, celSrc, comp: 4,
    text: norm([k.name, k.area, a.name, a.short, a.city, TYPES[a.type], DEGS[a.deg]].join(" "))});
}));
const OMAP = {}; OFFERS.forEach(o => OMAP[o.id] = o);

/* ---------- model ogólny ---------- */
function subjVal(prof, s, prOnly) {
  const p = prof[s] || {};
  if (s === "rys") return {val: num(p.pr) ?? 0, lvl: num(p.pr) != null ? "wynik" : null};
  const pr = num(p.pr), pp = num(p.pp);
  const a = pr != null ? pr : -1, b = (!prOnly && pp != null) ? pp * PPM : -1;
  if (a < 0 && b < 0) return {val: 0, lvl: null};
  return a >= b ? {val: a, lvl: "PR"} : {val: b, lvl: "PP"};
}
function compute(o, prof) {
  if (o.arch) return archCompute(o.arch, prof);
  let sw = 0, sum = 0; const parts = [], missing = [];
  o.comps.forEach(c => {
    let best = {val: 0, lvl: null, sub: null};
    c.subs.forEach(s => {const v = subjVal(prof, s, c.pr); if (v.lvl && (!best.lvl || v.val > best.val)) best = {...v, sub: s};});
    sw += c.w; sum += c.w * best.val; parts.push({c, ...best, contrib: c.w * best.val});
    if (!best.lvl) missing.push(c);
  });
  return {index: sum / sw, parts, missing, sw};
}
function status(o, r) {
  if (r.noCalc) return {cls: "info", txt: o.u.type === "prv" ? "płatne, bez rysunku" : "zobacz zasady", rank: 1.5};
  if (r.missing.length) return {cls: "bad", txt: "brak wymaganego przedmiotu", rank: 0};
  if (r.examBelow) return {cls: "bad", txt: r.exam && r.exam.pct != null ? "rysunek poniżej minimum" : "wpisz wynik z rysunku", rank: 0};
  const d = r.index - o.cel;
  if (d >= 3) return {cls: "ok", txt: "w zasięgu", rank: 3};
  if (d >= -6) return {cls: "warn", txt: "blisko", rank: 2};
  return {cls: "bad", txt: "ambitny cel", rank: 1};
}
const compName = c => (c.subs.length > 1 ? "max(" : "") + c.subs.map(s => SUBJ[s][1]).join(", ") + (c.subs.length > 1 ? ")" : "") + (c.pr ? " PR" : "");
const formulaText = o => o.arch ? o.arch.wzor : "W = " + o.comps.map(c => fmt(c.w, 2).replace(/0$/, "") + "·" + compName(c)).join(" + ");
function reqText(c) {
  if (c.t) c = {subs: c.t.s, pr: false};
  if (c.s) c = {subs: c.s, pr: false};
  const names = c.subs.map(s => SUBJ[s][0]);
  return (names.length > 1 ? "jeden z: " + names.join(", ") : names[0]) + (c.pr ? " (tylko poziom rozszerzony)" : "");
}
function boosted(prof, s, l, v) {const p = JSON.parse(JSON.stringify(prof)); p[s] = p[s] || {}; p[s][l] = v; return p;}

/* Zysk z +10 pkt proc. w każdym przedmiocie (i rysunku) dla jednej oferty, w punktach uczelni lub wskaźnika. */
function gains(o, prof) {
  const base = compute(o, prof); const out = [];
  if (base.noCalc) return out;
  Object.keys(SUBJ).forEach(s => ["pr", "pp"].forEach(l => {
    if (s === "rys" && l === "pp") return;
    const cur = num((prof[s] || {})[l]); if (cur == null || cur >= 100) return;
    const r = compute(o, boosted(prof, s, l, Math.min(100, cur + 10)));
    const d = o.arch ? r.points - base.points : r.index - base.index;
    if (d > 1e-6) out.push({s, l, cur, d});
  }));
  return out.sort((a, b) => b.d - a.d);
}

if (typeof module !== "undefined") module.exports = {DETAIL, KMAP, UMAP, OFFERS, OMAP, compute, archCompute, archMax, termMax, status, gains, num, fmt, norm, boosted, CEL};
