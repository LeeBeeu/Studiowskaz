const test = require('node:test');
const assert = require('node:assert/strict');
const A = require('./load.cjs')();
const arch = id => A.ARCH.find(a => a.id === id);

test('maksimum punktów zgadza się ze skalami uczelni', () => {
  assert.equal(A.archMax(arch('pw').calc), 400);      // PW: 200 + 75 + 25 + 2×50
  assert.equal(A.archMax(arch('pg').calc), 320);      // PG: 100 + 100 + 100 + 10 + 10
  assert.equal(A.archMax(arch('pp').calc), 750);      // PP 2027/28: 50 + 50 + 250 + 400
  assert.equal(A.archMax(arch('psl').calc), 300);     // PŚl: 200 + 100
  assert.equal(A.archMax(arch('plu').calc), 640);     // PL: 100 + 10 + 30 + 500
});

test('PG: wzór WA = S + W z p = 0,4 (PP) i 1 (PR)', () => {
  const prof = {mat: {pp: 80, pr: 50}, hsz: {pr: 60}, pol: {pp: 70}, obc: {pp: 90}, rys: {pr: 50}};
  const r = A.archCompute(arch('pg'), prof);
  // mat: max(50·1, 80·0,4=32)=50; hsz 60; pol 0,1·28; obc 0,1·36; S = 50
  assert.equal(Math.round(r.points * 10) / 10, 166.4); // 50 + 60 + 2,8 + 3,6 + 50
  assert.equal(r.examBelow, false);
});

test('PW: dwa najlepsze przedmioty do wyboru, sprawdzian w skali 200', () => {
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
