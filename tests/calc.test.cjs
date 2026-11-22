const test = require('node:test');
const assert = require('node:assert/strict');
const A = require('./load.cjs')();
const arch = id => A.ARCH.find(a => a.id === id);

test('maksimum punktów zgadza się ze skalami uczelni', () => {
  assert.equal(A.archMax(arch('pw').calc), 400);      // PW: 200 + 75 + 25 + 2×50
  assert.equal(A.archMax(arch('pg').calc), 320);      // PG: 100 + 100 + 100 + 10 + 10
  assert.equal(A.archMax(arch('pp').calc), 1000);     // PP 2027/28: 50 + 50 + 2,5·200 + 400
  assert.equal(A.archMax(arch('pwr').calc), 1195);    // PWr: 535 bez rysunku + 660 (§ 9 ust. 7)
  assert.equal(A.archMax(arch('pk').calc), 600);      // PK: 200 + 200 + 2·100
  assert.equal(A.archMax(arch('pl').calc), 1300);     // PŁ: 600 + 200 + 500 (bez przedmiotu dodatkowego)
  assert.equal(A.archMax(arch('psl').calc), 300);     // PŚl: 200 + 100
  assert.equal(A.archMax(arch('plu').calc), 640);     // PL: 100 + 10 + 30 + 500
});

test('PG: wzór WA = S + W z p = 0,4 (PP) i 1 (PR), polski bez p', () => {
  const prof = {mat: {pp: 80, pr: 50}, hsz: {pr: 60}, pol: {pp: 70}, obc: {pp: 90}, rys: {pr: 50}};
  const r = A.archCompute(arch('pg'), prof);
  // mat: max(50·1, 80·0,4=32)=50; hsz 60; pol 0,1·70; obc 0,1·36; S = 50
  assert.equal(Math.round(r.points * 10) / 10, 170.6);
  assert.equal(r.examBelow, false);
});

test('PW: po jednym przedmiocie z grupy 1 i grupy 2, sprawdzian w skali 200', () => {
  const prof = {mat: {pr: 60}, obc: {pr: 80}, hsz: {pr: 70}, fiz: {pr: 40}, inf: {pp: 90}, rys: {pr: 50}};
  const r = A.archCompute(arch('pw'), prof);
  // 100 + 0,75·60 + 0,25·80 + 0,5·70 + 0,5·45 (inf PP 90·0,5)
  assert.equal(r.points, 100 + 45 + 20 + 35 + 22.5);
});

test('rysunek poniżej minimum blokuje przyjęcie', () => {
  const prof = {mat: {pr: 90}, obc: {pr: 90}, pol: {pp: 90}, rys: {pr: 30}};
  const o = A.OMAP['arch:pp'];
  const r = A.compute(o, prof);
  assert.equal(r.examBelow, true);                  // 30% z 400 = 120 < 200
  assert.equal(A.status(o, r).cls, 'bad');
});

test('brak wyniku z rysunku jest zgłaszany', () => {
  const r = A.archCompute(arch('pk'), {mat: {pr: 70}, fiz: {pr: 50}});
  assert.equal(r.examBelow, true);
  assert.equal(r.exam.pct, null);
});

test('każda uczelnia z architekturą ma źródło i opis egzaminu', () => {
  for (const a of A.ARCH) {
    assert.ok(a.zrodla.length > 0, a.id + ' bez źródeł');
    assert.ok(a.egzamin, a.id + ' bez opisu egzaminu');
    for (const [, url] of a.zrodla) assert.match(url, /^https:\/\//);
  }
});

test('zysk z rysunku jest największy na PWr przy słabym rysunku', () => {
  const prof = {mat: {pr: 60}, fiz: {pr: 50}, obc: {pr: 70}, pol: {pp: 60}, rys: {pr: 40}};
  const g = A.gains(A.OMAP['arch:pwr'], prof);
  assert.equal(g[0].s, 'rys');
});

test('PWr: M = max(P; P + 1,5R; 2,5R), JP = max(P; R)', () => {
  const prof = {mat: {pp: 80, pr: 50}, fiz: {pr: 40}, obc: {pp: 90}, pol: {pp: 60, pr: 70}, rys: {pr: 50}};
  const r = A.archCompute(arch('pwr'), prof);
  // M = max(80; 155; 125) = 155; PD = max(0; 0+60; 100) = 100; JO = 0,1·90; JP = 0,1·70; RA = 330
  assert.equal(Math.round(r.points * 10) / 10, 155 + 100 + 9 + 7 + 330);
});

test('PK: matematyka PR liczona podwójnie, 2R = P dla podstawy', () => {
  const r = A.archCompute(arch('pk'), {mat: {pp: 90, pr: 40}, hsz: {pp: 80}, rys: {pr: 50}});
  // M = max(90, 80) = 90; 2R = 80 (PP); 2E = 100
  assert.equal(r.points, 90 + 80 + 100);
});

test('PP: M to suma podstawy i rozszerzenia', () => {
  const r = A.archCompute(arch('pp'), {pol: {pp: 60}, obc: {pp: 80}, mat: {pp: 70, pr: 40}, rys: {pr: 60}});
  assert.equal(r.points, 30 + 40 + 2.5 * 110 + 240);
});

test('przedmiot nieobowiązkowy daje 0 pkt, ale nie blokuje', () => {
  const r = A.archCompute(arch('pwr'), {mat: {pr: 60}, obc: {pp: 80}, pol: {pp: 70}, rys: {pr: 50}});
  assert.equal(r.missing.length, 0);
  const pd = r.parts.find(p => p.t.l.startsWith('PD'));
  assert.equal(pd.pts, 0);
});

test('architektura wnętrz: PP i PŚl liczą punkty wzorem uczelni', () => {
  const aw = id => A.AW.find(a => a.id === id);
  assert.equal(A.archMax(aw('pp').calc), 1000);
  assert.equal(A.archMax(aw('psl').calc), 300);
  const r = A.compute(A.OMAP['aw:psl'], {hsz: {pr: 70}, mat: {pp: 80}, rys: {pr: 50}});
  assert.equal(r.points, 100 + 70);   // Pspr 50% z 200 + hsz PR 70
});

test('każda uczelnia z architekturą wnętrz ma źródło, opis egzaminu i ofertę w wyszukiwarce', () => {
  for (const a of A.AW) {
    assert.ok(a.zrodla.length > 0 && a.egzamin, a.id);
    assert.ok(A.OMAP['aw:' + a.id], 'brak oferty ' + a.id);
  }
});

test('dopasowanie: każdy kierunek ma profil, a wynik jest w zakresie 0–100', () => {
  for (const k of A.K) assert.ok(A.TRAITS[k[0]], 'brak profilu ' + k[0]);
  const r = A.matchCourses({items: Array(12).fill(3)});
  for (const x of r) assert.ok(x.score >= 0 && x.score <= 100, x.id);
});

test('dopasowanie: profil artystyczny z mocnym rysunkiem wskazuje architekturę wnętrz lub architekturę', () => {
  const top = A.topDistinct(A.matchCourses({items: [2, 3, 5, 3, 2, 2, 3, 3, 5, 2, 2, 2], domains: ['art'],
    str: {rys: 'mocna', hsz: 'mocna', mat: 'srednia'}, people: 1, field: 0, long: true}), 3);
  assert.ok(['aw', 'arc'].includes(top[0].id), top[0].id);
});

test('dopasowanie: profil społeczny i medyczny wskazuje kierunek o zdrowiu albo psychologię', () => {
  const top = A.topDistinct(A.matchCourses({items: [1, 2, 2, 5, 3, 2, 2, 3, 2, 5, 2, 3], domains: ['zdr', 'spo'],
    str: {bio: 'mocna', pol: 'mocna', mat: 'slaba'}, people: 2, field: 1, long: true}), 3);
  assert.ok(['pie', 'psy', 'fzj', 'pol', 'lek', 'ped'].includes(top[0].id), top[0].id);
  assert.equal(new Set(top.map(t => t.group)).size, 3);   // trzy różne grupy
});
