// Dopasowanie kierunku: test zainteresowań (model Hollanda RIASEC), dziedziny, mocne i słabe przedmioty, styl pracy.
// Wynik to ranking kierunków z bazy (data.js) z wyjaśnieniem i przykładowymi zawodami.
/* global K, SUBJ */

const RIASEC = {
  R: {name: "praktyczne", desc: "praca rękami, technika, działanie w terenie"},
  I: {name: "badawcze", desc: "dociekanie, analiza, rozwiązywanie problemów"},
  A: {name: "artystyczne", desc: "tworzenie, projektowanie, wyrażanie siebie"},
  S: {name: "społeczne", desc: "pomaganie, uczenie, praca z ludźmi"},
  E: {name: "przedsiębiorcze", desc: "przekonywanie, organizowanie, prowadzenie innych"},
  C: {name: "organizacyjne", desc: "porządek, dane, zasady, dokładność"}
};

const QUIZ_ITEMS = [
  ["R", "Naprawiam, składam albo buduję rzeczy własnymi rękami."],
  ["I", "Lubię rozwiązywać trudne zadania i dociekać, jak coś działa."],
  ["A", "Rysuję, projektuję, piszę albo tworzę coś własnego."],
  ["S", "Lubię pomagać innym, tłumaczyć i wspierać ludzi."],
  ["E", "Lubię przekonywać innych, organizować i przewodzić grupie."],
  ["C", "Lubię porządek, plany, tabele i dokładne trzymanie się zasad."],
  ["R", "Wolę działać w warsztacie, laboratorium albo w terenie niż tylko siedzieć przy biurku."],
  ["I", "Ciekawią mnie eksperymenty, dane i odkrywanie nowych rzeczy."],
  ["A", "Zwracam uwagę na estetykę, kolory i formę rzeczy wokół mnie."],
  ["S", "Dobrze czuję się w pracy z ludźmi, także z dziećmi albo z chorymi."],
  ["E", "Myślę o własnym biznesie, sprzedaży albo zarządzaniu projektami."],
  ["C", "Praca z liczbami, dokumentami albo przepisami mnie nie nudzi."]
];
const LIKERT = ["Zupełnie nie", "Raczej nie", "Trudno powiedzieć", "Raczej tak", "Bardzo tak"];

const DOMAINS = {
  tech: "Technologia i komputery", zdr: "Zdrowie i medycyna", nat: "Przyroda, zwierzęta, środowisko",
  spo: "Ludzie i społeczeństwo", art: "Sztuka i projektowanie", biz: "Biznes i pieniądze",
  jez: "Języki i kultura", pra: "Prawo i bezpieczeństwo", nau: "Nauka i badania"
};

const STRENGTH_SUBJ = ["pol", "mat", "obc", "bio", "che", "fiz", "geo", "his", "wos", "inf", "hsz", "rys"];
const STRENGTH_LABEL = {rys: "Rysunek i plastyka"};
const STRENGTH_VAL = {mocna: 1, srednia: .55, slaba: .1};

/* Profil kierunku: [kod RIASEC (litery od najważniejszej, wagi 3-2-1), dziedziny, praca z ludźmi 0–2, teren/ruch 0–2, zawody] */
const TRAITS = {
  inf: ["IRC", "tech", 0, 0, "programista, inżynier oprogramowania, administrator systemów"],
  ds: ["ICR", "tech nau", 0, 0, "data scientist, analityk danych, specjalista uczenia maszynowego"],
  cyb: ["IRC", "tech pra", 0, 0, "pentester, analityk bezpieczeństwa (SOC), specjalista ds. bezpieczeństwa IT"],
  air: ["RIC", "tech", 0, 1, "inżynier automatyk, programista robotów, inżynier utrzymania ruchu"],
  mtr: ["RIC", "tech", 0, 1, "inżynier mechatronik, projektant systemów wbudowanych"],
  ele: ["RIC", "tech", 0, 1, "inżynier elektryk, projektant instalacji, energetyk sieci"],
  eit: ["IRC", "tech", 0, 0, "inżynier elektronik, projektant układów, specjalista telekomunikacji"],
  mbm: ["RIC", "tech", 0, 1, "konstruktor maszyn, inżynier produkcji, technolog"],
  bud: ["RIC", "tech", 1, 2, "inżynier budowy, kierownik budowy, projektant konstrukcji"],
  arc: ["ARI", "art tech", 1, 1, "architekt, urbanista, projektant BIM"],
  ibm: ["IRS", "tech zdr", 1, 0, "inżynier biomedyczny, specjalista aparatury medycznej"],
  tch: ["IRC", "nau tech", 0, 1, "technolog chemiczny, specjalista ds. jakości, inżynier procesu"],
  ene: ["RIC", "tech nat", 0, 1, "energetyk, specjalista odnawialnych źródeł energii"],
  lot: ["RIC", "tech", 0, 1, "inżynier lotniczy, konstruktor, specjalista obsługi statków powietrznych"],
  imt: ["IRC", "tech nau", 0, 1, "inżynier materiałowiec, technolog, badacz materiałów"],
  gig: ["RIC", "tech nat", 0, 2, "geolog, inżynier górnictwa, specjalista surowców"],
  tra: ["RCE", "tech biz", 1, 1, "inżynier transportu, planista ruchu, specjalista ds. infrastruktury"],
  isr: ["RIC", "tech nat", 0, 1, "inżynier instalacji, specjalista ochrony środowiska"],
  log: ["CEI", "biz", 1, 1, "logistyk, planista łańcucha dostaw, spedytor"],
  gp: ["ICA", "nat spo", 1, 1, "planista przestrzenny, urbanista, specjalista GIS"],
  mat: ["ICA", "nau", 0, 0, "analityk, aktuariusz, nauczyciel matematyki, badacz"],
  mst: ["ICR", "nau biz", 0, 0, "analityk ilościowy, aktuariusz, data scientist"],
  fiz: ["IRC", "nau tech", 0, 0, "fizyk, badacz, fizyk medyczny"],
  chm: ["IRC", "nau", 0, 1, "chemik analityk, badacz, technolog"],
  bio: ["IRC", "nau nat", 0, 1, "biolog, specjalista laboratoryjny, badacz"],
  bt: ["IRC", "nau zdr", 0, 1, "biotechnolog, specjalista badań i rozwoju, laborant"],
  geo: ["IRS", "nat nau", 1, 2, "geograf, specjalista GIS, nauczyciel geografii"],
  ost: ["IRS", "nat", 1, 2, "specjalista ochrony środowiska, audytor ekologiczny"],
  kog: ["IAS", "nau tech", 1, 0, "badacz UX, analityk, specjalista sztucznej inteligencji"],
  lek: ["ISR", "zdr nau", 2, 1, "lekarz, lekarz specjalista"],
  lds: ["IRS", "zdr", 2, 0, "lekarz dentysta, ortodonta"],
  far: ["ICS", "zdr nau", 1, 0, "farmaceuta, specjalista badań klinicznych"],
  alm: ["ICR", "zdr nau", 0, 0, "diagnosta laboratoryjny, specjalista laboratorium medycznego"],
  fzj: ["SRI", "zdr", 2, 1, "fizjoterapeuta, terapeuta sportowy"],
  pie: ["SRC", "zdr", 2, 1, "pielęgniarka/pielęgniarz, koordynator opieki"],
  pol: ["SRI", "zdr", 2, 1, "położna/położny"],
  rat: ["RSE", "zdr pra", 2, 2, "ratownik medyczny, dyspozytor medyczny"],
  die: ["SIC", "zdr", 2, 0, "dietetyk, doradca żywieniowy"],
  kos: ["SAR", "zdr art", 2, 0, "kosmetolog, specjalista branży beauty"],
  zp: ["SEC", "zdr spo", 1, 0, "specjalista zdrowia publicznego, epidemiolog, menedżer ochrony zdrowia"],
  psy: ["SIA", "spo zdr", 2, 0, "psycholog, psychoterapeuta, specjalista HR"],
  pra: ["ECI", "pra spo", 2, 0, "adwokat, radca prawny, sędzia, prokurator"],
  adm: ["CES", "pra spo", 1, 0, "urzędnik, specjalista administracji, referent"],
  sm: ["ESA", "spo jez biz", 2, 0, "dyplomata, specjalista ds. międzynarodowych, analityk"],
  plt: ["ESI", "spo", 2, 0, "analityk polityczny, doradca, specjalista komunikacji"],
  soc: ["ISA", "spo nau", 1, 0, "socjolog, badacz rynku, specjalista HR"],
  dzk: ["AES", "jez spo art", 2, 1, "dziennikarz, specjalista PR, twórca treści"],
  ped: ["SAE", "spo", 2, 0, "pedagog, wychowawca, pedagog szkolny"],
  pps: ["SAE", "spo", 2, 0, "nauczyciel przedszkola, nauczyciel edukacji wczesnoszkolnej"],
  kry: ["ISC", "pra spo", 1, 1, "kryminolog, analityk kryminalny, funkcjonariusz"],
  bw: ["RES", "pra", 1, 2, "policjant, specjalista bezpieczeństwa, funkcjonariusz służb"],
  eko: ["ICE", "biz", 1, 0, "ekonomista, analityk gospodarczy"],
  fir: ["CEI", "biz", 1, 0, "księgowy, analityk finansowy, audytor"],
  zar: ["ECS", "biz", 2, 0, "menedżer, specjalista HR, przedsiębiorca"],
  iie: ["ICE", "biz tech", 0, 0, "analityk danych, ekonometryk, analityk biznesowy"],
  mkt: ["EAS", "biz art", 2, 0, "marketer, specjalista social media, brand manager"],
  tur: ["ESR", "biz nat", 2, 2, "organizator turystyki, pilot wycieczek, hotelarz"],
  fan: ["ASC", "jez", 1, 0, "tłumacz, nauczyciel angielskiego, specjalista lokalizacji"],
  lin: ["ACI", "jez biz", 1, 0, "tłumacz, specjalista lokalizacji, lingwista"],
  fpl: ["AIS", "jez art", 1, 0, "redaktor, nauczyciel polskiego, copywriter"],
  his: ["IAS", "spo jez", 1, 0, "historyk, archiwista, nauczyciel historii"],
  fil: ["IAS", "nau jez", 1, 0, "filozof, etyk, analityk, nauczyciel"],
  hsz: ["AIC", "art", 1, 0, "historyk sztuki, kurator wystaw, specjalista muzealny"],
  arh: ["IRA", "nau nat", 0, 2, "archeolog, specjalista ochrony zabytków"],
  wet: ["IRS", "zdr nat", 1, 1, "lekarz weterynarii"],
  zoo: ["RIC", "nat", 0, 2, "zootechnik, specjalista hodowli zwierząt"],
  rol: ["RCE", "nat biz", 0, 2, "rolnik, doradca rolny, menedżer gospodarstwa"],
  les: ["RIC", "nat", 0, 2, "leśnik, specjalista ochrony przyrody"],
  tzz: ["IRC", "nau zdr", 0, 1, "technolog żywności, specjalista kontroli jakości"],
  ogr: ["RAI", "nat art", 0, 2, "ogrodnik, projektant zieleni, specjalista szkółkarstwa"],
  akr: ["ARI", "art nat", 1, 2, "architekt krajobrazu, projektant terenów zieleni"],
  aw: ["ARS", "art", 1, 0, "architekt wnętrz, projektant mebli, stylista wnętrz"]
};

/** Przedmioty kluczowe kierunku z jego wzoru: [{subs, w}] (wagi sumują się do 1). */
function keySubjects(k) {
  const f = (k[4].d || Object.values(k[4])[0])[1];
  const parts = f.split(";").map(p => {const [a, w] = p.split(":"); return {subs: a.replace("!", "").split("|"), w: +w, pr: a.startsWith("!")};});
  const sw = parts.reduce((x, p) => x + p.w, 0);
  return parts.map(p => ({...p, w: p.w / sw}));
}
function riasecVec(code) {
  const v = {R: 0, I: 0, A: 0, S: 0, E: 0, C: 0};
  [...code].forEach((c, i) => {v[c] = 3 - i;});
  return v;
}

/** Ranking kierunków dla odpowiedzi. answers: {items: [1..5|null x12], domains: [klucze], str: {przedmiot: "mocna"|"srednia"|"slaba"}, people, field: 0..2|null, long: true|false|null} */
function matchCourses(answers) {
  const items = answers.items || [];
  const sums = {R: [], I: [], A: [], S: [], E: [], C: []};
  QUIZ_ITEMS.forEach(([t], i) => {if (items[i] != null) sums[t].push((items[i] - 1) / 4);});
  const u = {}; Object.keys(sums).forEach(t => {u[t] = sums[t].length ? sums[t].reduce((a, b) => a + b, 0) / sums[t].length : .5;});
  const dom = new Set(answers.domains || []);
  const str = answers.str || {};
  const sv = s => STRENGTH_VAL[str[s]] ?? .5;

  return K.filter(k => TRAITS[k[0]]).map(k => {
    const [code, doms, people, field, jobs] = TRAITS[k[0]];
    const kv = riasecVec(code);
    const interest = Object.keys(kv).reduce((a, t) => a + kv[t] * u[t], 0) / 6;
    const kd = doms.split(" ");
    const domain = dom.size ? (kd.some(d => dom.has(d)) ? 1 : 0) : .5;
    const subjParts = keySubjects(k).map(p => {
      const best = p.subs.reduce((b, s) => sv(s) > sv(b) ? s : b, p.subs[0]);
      return {...p, best, val: sv(best)};
    });
    const subjects = subjParts.reduce((a, p) => a + p.w * p.val, 0);
    let style = 1;
    if (answers.people != null) style -= Math.abs(answers.people - people) / 4;
    if (answers.field != null) style -= Math.abs(answers.field - field) / 4;
    let total = .45 * interest + .15 * domain + .30 * subjects + .10 * style;
    const deg = (k[4].d || Object.values(k[4])[0])[0];
    const longStudy = deg === "M" || deg === "M6";
    if (longStudy && answers.long === false) total *= .7;

    const why = [];
    const topU = Object.keys(kv).filter(t => kv[t] >= 2 && u[t] >= .6).map(t => RIASEC[t].name);
    if (topU.length) why.push("pasują Ci zainteresowania " + topU.join(" i "));
    const dHit = kd.filter(d => dom.has(d)).map(d => DOMAINS[d].toLowerCase());
    if (dHit.length) why.push("ciekawi Cię: " + dHit.join(", "));
    const strong = subjParts.filter(p => p.val >= 1 && p.w >= .2).map(p => (STRENGTH_LABEL[p.best] || SUBJ[p.best][0]).toLowerCase());
    if (strong.length) why.push("Twoje mocne strony: " + [...new Set(strong)].join(", "));
    const warn = subjParts.filter(p => p.val <= .1 && p.w >= .25).map(p => (STRENGTH_LABEL[p.best] || SUBJ[p.best][0]).toLowerCase() + (p.pr ? " (rozszerzenie)" : ""));
    const warns = [];
    if (warn.length) warns.push("kluczowy przedmiot oznaczony jako słaby: " + [...new Set(warn)].join(", "));
    if (longStudy && answers.long === false) warns.push("to studia jednolite (5–6 lat)");
    return {id: k[0], name: k[1], area: k[2], score: Math.round(total * 100), jobs, why, warns, keys: subjParts, longStudy,
      group: code.slice(0, 2) + "|" + kd[0]};
  }).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "pl"));
}

/** Najlepsze dopasowania z różnych grup (kierunki o tym samym profilu trafiają do „podobnych”). */
function topDistinct(results, n) {
  const out = [], seen = new Map();
  results.forEach(r => {
    if (seen.has(r.group)) {const g = seen.get(r.group); if (g.similar.length < 4 && r.score >= g.score - 8) g.similar.push(r); return;}
    if (out.length < n) {const g = {...r, similar: []}; out.push(g); seen.set(r.group, g);}
  });
  return out;
}

/** Ile odpowiedzi brakuje do sensownego wyniku (min. 8 z 12 stwierdzeń). */
function quizProgress(answers) {
  const n = (answers.items || []).filter(x => x != null).length;
  return {answered: n, total: QUIZ_ITEMS.length, ready: n >= 8};
}

if (typeof module !== "undefined") module.exports = {LIKERT, STRENGTH_LABEL, RIASEC, QUIZ_ITEMS, DOMAINS, TRAITS, matchCourses, topDistinct, quizProgress, keySubjects, STRENGTH_SUBJ};
