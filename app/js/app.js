// Interfejs aplikacji Studiowskaz.
/* global createStore, SUBJ, MANDATORY, K, U, ARCH, AW, AW_FACTS, DETAIL, ARCH_PEWNOSC, TYPES, DEG, DEGS, KMAP, OFFERS, OMAP, compute, status, gains, num, fmt, norm, boosted, archMax */

/* ===================== STAN ===================== */
const SAMPLE = {profile: {pol: {pp: 70}, mat: {pp: 78, pr: 52}, obc: {pp: 88, pr: 70}, hsz: {pr: 55}, rys: {pr: 60}},
  targets: ["arch:pw", "arch:pg", "arch:pp", "arch:pk"], example: true, v: 2};
const KEY = "studiowskaz.v1";
let S = load();
function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    if (v && v.profile && Array.isArray(v.targets) && !(v.example && v.v !== 2)) {v.targets = v.targets.filter(id => OMAP[id]); return v;}
  } catch (e) { /* brak dostępu do pamięci */ }
  return JSON.parse(JSON.stringify(SAMPLE));
}
function saveLocal() {try {localStorage.setItem(KEY, JSON.stringify(S));} catch (e) { /* tryb prywatny */ }}
function save() {saveLocal(); if (typeof syncSoon === "function") syncSoon();}
const isTarget = id => S.targets.includes(id);
function toggleTarget(id) {S.targets = isTarget(id) ? S.targets.filter(x => x !== id) : [...S.targets, id]; save(); refresh();}

/* ===================== POMOCNICZE ===================== */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
function plural(n, a, b, c) {if (n === 1) return a; const d = n % 10, e = n % 100; return d >= 2 && d <= 4 && (e < 12 || e > 14) ? b : c;}
const subjLabel = (s, l) => SUBJ[s][0] + (s === "rys" ? "" : " " + l.toUpperCase());
const subjLow = (s, l) => SUBJ[s][0].toLowerCase() + (s === "rys" ? "" : " " + l.toUpperCase());
function officialLink(o) {
  const q = o.u.type === "prv" ? `${o.u.name} architektura rekrutacja` : `rekrutacja ${o.k.name} site:${o.u.dom}`;
  return "https://www.google.com/search?q=" + encodeURIComponent(q);
}

/* ===================== PEŁNE BAZY: ARCHITEKTURA I WNĘTRZA ===================== */
let curDetail = "arc";
const DETAIL_UI = {
  arc: {
    title: "Architektura w Polsce",
    lead: "Wszystkie uczelnie z kierunkiem architektura, ich wzory rekrutacyjne, egzaminy z rysunku, limity i progi. Punkty są liczone w skali każdej uczelni z Twoich wyników i przewidywanego wyniku z rysunku.",
    slider: "Przewidywany wynik egzaminu z rysunku (% maksimum)",
    factsTitle: "Co zdawać na architekturę",
    facts: () => {
      const pub = ARCH.filter(a => a.type !== "prv").length;
      return [
        `Architekturę prowadzi ${pub} uczelni publicznych w bazie i ${ARCH.length - pub} niepublicznych. Na każdej uczelni publicznej obowiązuje egzamin z rysunku. Bez jego zaliczenia nie ma przyjęcia, niezależnie od matury.`,
        examShareText(ARCH, "egzamin z rysunku"),
        "Z matury prawie wszędzie liczy się matematyka, a rozszerzenie z niej daje najwięcej (PWr ×2,5, PK ×2, PP suma podstawy i rozszerzenia). Przedmiot dodatkowy różni się między uczelniami: PWr tylko fizyka, PG historia sztuki albo informatyka, PK język polski, historia albo historia sztuki, PŁ żadnego.",
        "Egzaminy z rysunku odbywają się pod koniec czerwca i na początku lipca, a zapisy na nie kończą się wcześniej niż zwykła rekrutacja. W 2026 roku zapisy na PWr kończyły się 20 czerwca, a na PRz 19 czerwca.",
        "PW prowadzi architekturę po polsku jako studia jednolite magisterskie: rejestracja 26.04–25.05.2027, sprawdzian w pierwszej połowie czerwca. Pozostałe politechniki prowadzą studia I stopnia inżynierskie. PG, PP, PŁ, PK i PW mają też wersję anglojęzyczną."
      ];
    }
  },
  aw: {
    title: "Architektura wnętrz w Polsce",
    lead: "Uczelnie z kierunkiem architektura wnętrz: akademie sztuk pięknych, politechniki i uniwersytety. Przy każdej opis egzaminu (teczka, egzamin praktyczny, rozmowa), terminy, limity i źródła. Tam, gdzie wzór łączy maturę z egzaminem, punkty liczone są w skali uczelni.",
    slider: "Przewidywany wynik egzaminu praktycznego (% maksimum)",
    factsTitle: "Co zdawać na architekturę wnętrz",
    facts: () => {
      const pub = AW.filter(a => a.type !== "prv").length;
      return [`Architekturę wnętrz prowadzi ${pub} uczelni publicznych w bazie i ${AW.length - pub} niepublicznych. Wszędzie, poza częścią uczelni niepublicznych, obowiązuje egzamin praktyczny albo ocena prac.`]
        .concat(AW_FACTS, [examShareText(AW, "egzamin praktyczny")]);
    }
  }
};
function renderArch() {
  const ui = DETAIL_UI[curDetail], det = DETAIL[curDetail];
  $("#d-title").textContent = ui.title; $("#d-lead").textContent = ui.lead;
  $("#d-slider").textContent = ui.slider; $("#d-facts-title").textContent = ui.factsTitle;
  const rys = num((S.profile.rys || {}).pr);
  $("#rys-in").value = rys ?? 0;
  $("#rys-out").textContent = rys == null ? "—" : rys + "%";
  const ex = det.list.filter(a => a.calc && a.calc.egzamin).slice(0, 3).map(a => `${Math.round((rys ?? 60) / 100 * a.calc.egzamin.max)}/${a.calc.egzamin.max} pkt na ${a.short}`);
  $("#rys-hint").textContent = rys == null
    ? "Przesuń suwak. Bez wyniku z egzaminu nie da się policzyć punktów, bo egzamin decyduje o przyjęciu."
    : `Ten sam procent przeliczamy na skalę każdej uczelni, np. ${rys}% to ${ex.join(", ")}. Wynik zapisuje się w „Moje wyniki” i jest wspólny dla architektury i wnętrz.`;
  const type = $("#a-type").value, sort = $("#a-sort").value;
  let list = OFFERS.filter(o => o.arch && o.k.id === curDetail && (type === "all" || (type === "prv" ? o.u.type === "prv" : o.u.type !== "prv")))
    .map(o => ({o, r: compute(o, S.profile)}));
  list.sort((a, b) => sort === "name" ? a.o.u.name.localeCompare(b.o.u.name, "pl")
    : sort === "city" ? a.o.u.city.localeCompare(b.o.u.city, "pl")
    : (b.r.noCalc ? -1 : b.r.index) - (a.r.noCalc ? -1 : a.r.index));
  $("#arch-list").innerHTML = list.map(({o, r}) => archCard(o, r)).join("");
  $("#arch-facts").innerHTML = ui.facts().map(t => `<li>${esc(t)}</li>`).join("");
}
function examShareText(L, what) {
  const sh = L.filter(a => a.calc && a.calc.egzamin).map(a => ({a, p: a.calc.egzamin.w * a.calc.egzamin.max / archMax(a.calc) * 100})).sort((x, y) => x.p - y.p);
  if (!sh.length) return "";
  const lo = sh[0], hi = sh[sh.length - 1];
  return `Tam, gdzie znamy wzór, ${what} to od ${fmt(lo.p, 0)}% (${lo.a.short}) do ${fmt(hi.p, 0)}% (${hi.a.short}) maksymalnej liczby punktów: ` +
    sh.map(x => `${x.a.short} ${fmt(x.p, 0)}%`).join(", ") + ". Zwykle to przedmiot numer jeden do ćwiczenia.";
}
function archCard(o, r) {
  const a = o.arch, st = status(o, r), on = isTarget(o.id), pw = ARCH_PEWNOSC[a.pewnosc];
  const score = r.noCalc
    ? `<div class="score"><b style="font-size:.9rem">${a.czesne ? esc(a.czesne) : "wzór niepełny"}</b><small>${a.czesne ? "czesne" : "zobacz szczegóły"}</small></div>`
    : `<div class="score"><b>${fmt(r.points, r.max >= 1000 ? 0 : 1)}</b><small>z ${fmt(r.max, 0)} pkt · ${fmt(r.index, 0)}%</small></div>`;
  return `<article class="card acard" data-o="${o.id}" tabindex="0" role="button" aria-label="Szczegóły: ${esc(a.name)}">
    <div class="ahead"><div class="u"><b>${esc(a.name)}</b><small>${esc(a.city)} · ${esc(a.stopien)}</small></div>
      <button class="star ${on ? "on" : ""}" data-star="${o.id}" type="button" aria-pressed="${on}" title="${on ? "Usuń z planu" : "Dodaj do planu"}">${on ? "★" : "☆"}</button></div>
    <p class="formula">${esc(a.wzor)}</p>
    ${!r.noCalc ? `<div class="bar" aria-hidden="true"><i style="width:${Math.min(100, r.index)}%"></i>${o.celSrc !== "szacunek" ? `<em style="left:calc(${Math.min(99, o.cel)}% - 1px)"></em>` : ""}</div>` : ""}
    <div class="afoot"><span class="pill ${st.cls}">${st.txt}</span><span class="pill ${pw[0]}">${pw[1]}</span>${score}</div>
  </article>`;
}

/* ===================== SZUKAJ ===================== */
function initFilters() {
  const cities = [...new Set(OFFERS.map(o => o.u.city))].sort((a, b) => a.localeCompare(b, "pl"));
  $("#f-city").innerHTML = '<option value="">Wszystkie</option>' + cities.map(c => `<option>${esc(c)}</option>`).join("");
  $("#f-type").innerHTML = '<option value="">Wszystkie</option>' + Object.entries(TYPES).map(([k, v]) => `<option value="${k}">${v}</option>`).join("");
  $("#f-deg").innerHTML = '<option value="">Wszystkie</option><option value="L">Licencjackie</option><option value="I">Inżynierskie</option><option value="M">Jednolite magisterskie</option>';
  const areas = [...new Set(K.map(k => k[2]))].sort((a, b) => a.localeCompare(b, "pl"));
  $("#f-area").innerHTML = '<option value="">Wszystkie</option>' + areas.map(a => `<option>${esc(a)}</option>`).join("");
  try {
    const f = JSON.parse(sessionStorage.getItem(KEY + ".f") || "{}");
    ["q", "f-city", "f-type", "f-deg", "f-area", "a-type", "a-sort"].forEach(id => {if (f[id] != null) $("#" + id).value = f[id];});
    $("#f-ok").checked = !!f.ok;
  } catch (e) { /* brak pamięci sesji */ }
  ["q", "f-city", "f-type", "f-deg", "f-area", "f-ok"].forEach(id => $("#" + id).addEventListener("input", () => {storeF(); renderSearch();}));
  ["a-type", "a-sort"].forEach(id => $("#" + id).addEventListener("input", () => {storeF(); renderArch();}));
  $("#reset-f").onclick = () => {["q", "f-city", "f-type", "f-deg", "f-area"].forEach(id => $("#" + id).value = ""); $("#f-ok").checked = false; storeF(); renderSearch();};
  $("#rys-in").addEventListener("input", e => {
    S.profile.rys = {pr: +e.target.value}; S.example = false; save();
    $("#rys-out").textContent = e.target.value + "%"; renderArchSoon();
  });
}
let archT = null;
function renderArchSoon() {clearTimeout(archT); archT = setTimeout(renderArch, 60);}
function storeF() {
  try {
    const f = {ok: $("#f-ok").checked};
    ["q", "f-city", "f-type", "f-deg", "f-area", "a-type", "a-sort"].forEach(id => f[id] = $("#" + id).value);
    sessionStorage.setItem(KEY + ".f", JSON.stringify(f));
  } catch (e) { /* brak pamięci sesji */ }
}
const openGroups = new Set(), showAll = new Set();
function renderSearch() {
  const q = norm($("#q").value.trim()).split(/\s+/).filter(Boolean);
  const city = $("#f-city").value, type = $("#f-type").value, deg = $("#f-deg").value, area = $("#f-area").value, okOnly = $("#f-ok").checked;
  const groups = new Map(); let n = 0;
  OFFERS.forEach(o => {
    if (city && o.u.city !== city) return; if (type && o.u.type !== type) return;
    if (deg && !(o.deg === deg || (deg === "M" && o.deg === "M6"))) return; if (area && o.k.area !== area) return;
    if (q.length && !q.every(t => o.text.includes(t))) return;
    const r = compute(o, S.profile); if (okOnly && (r.missing.length || r.examBelow)) return;
    n++; if (!groups.has(o.k.id)) groups.set(o.k.id, []);
    groups.get(o.k.id).push({o, r, st: status(o, r)});
  });
  const narrowed = q.length || city || type || deg || area;
  const keys = [...groups.keys()].sort((a, b) => KMAP[a].name.localeCompare(KMAP[b].name, "pl"));
  $("#sum").textContent = `${keys.length} ${plural(keys.length, "kierunek", "kierunki", "kierunków")} · ${n} ${plural(n, "oferta", "oferty", "ofert")}`;
  if (!keys.length) {$("#results").innerHTML = '<div class="card empty">Nic nie pasuje do tych filtrów. Spróbuj krótszej nazwy, np. „inform” albo „prawo”.</div>'; return;}
  $("#results").innerHTML = keys.map(kid => {
    const k = KMAP[kid], list = groups.get(kid).sort((a, b) => (b.st.rank - a.st.rank) || ((b.r.index - b.o.cel) - (a.r.index - a.o.cel)));
    const open = openGroups.has(kid) || (narrowed && keys.length <= 3);
    const reach = list.filter(x => x.st.rank === 3).length;
    const sample = list[0].o;
    const keySubs = sample.arch ? ["Egzamin z rysunku", "Matematyka", "Język obcy"]
      : [...new Set(sample.comps.filter(c => c.subs[0] !== "obc" || c.pr).flatMap(c => c.subs))].filter(s => s !== "pol" || sample.comps.length < 4).slice(0, 4).map(s => SUBJ[s][0]);
    const lim = showAll.has(kid) ? list.length : 8;
    return `<details class="card group" data-k="${kid}" ${open ? "open" : ""}>
      <summary><div class="t"><h3>${esc(k.name)}${sample.arch ? ' <span class="pill ok">pełna baza</span>' : ""}</h3>
        <div class="meta"><span class="tag">${esc(k.area)}</span><span>${list.length} ${plural(list.length, "uczelnia", "uczelnie", "uczelni")}</span>
        ${reach ? `<span class="pill ok">${reach} w zasięgu</span>` : ""}<span>· kluczowe: ${esc(keySubs.join(", "))}</span></div></div>
        <span class="chev" aria-hidden="true">›</span></summary>
      ${open ? `<div class="rows">${list.slice(0, lim).map(rowHTML).join("")}</div>${list.length > lim ? `<div class="more"><button class="ghost" data-more="${kid}" type="button">Pokaż wszystkie (${list.length})</button></div>` : ""}` : ""}
    </details>`;
  }).join("");
}
function rowHTML({o, r, st}) {
  const on = isTarget(o.id);
  const sc = r.noCalc ? `<b style="font-size:.85rem">—</b><small>zobacz zasady</small>`
    : o.arch ? `<b>${fmt(r.points, 0)}</b><small>z ${fmt(r.max, 0)} pkt</small>`
    : `<b>${fmt(r.index)}</b><small>szansa od ~${o.cel}</small>`;
  return `<div class="row" data-o="${o.id}" tabindex="0" role="button" aria-label="Szczegóły: ${esc(o.k.name)}, ${esc(o.u.name)}">
    <div class="u"><b>${esc(o.u.name)}</b><small>${esc(o.u.city)} · ${DEGS[o.deg]} · <span class="formula">${esc(formulaText(o))}</span></small></div>
    <span class="pill ${st.cls} st">${st.txt}</span>
    <div class="score">${sc}</div>
    <button class="star ${on ? "on" : ""}" data-star="${o.id}" type="button" aria-pressed="${on}" title="${on ? "Usuń z planu" : "Dodaj do planu"}">${on ? "★" : "☆"}</button>
  </div>`;
}

/* ===================== PROFIL ===================== */
function renderProfile() {
  const order = ["pol", "mat", "obc", "bio", "che", "fiz", "geo", "his", "wos", "inf", "hsz", "fil", "lac", "rys"];
  $("#ptable tbody").innerHTML = order.map(s => {
    const p = S.profile[s] || {}, mand = MANDATORY.includes(s);
    const sub = s === "rys" ? "przewidywany wynik w % maksimum; architektura i architektura krajobrazu" : mand ? "obowiązkowy na poziomie podstawowym" : "";
    const ppCell = s === "rys" ? '<td class="num" style="color:var(--muted)">—</td>' : `<td><input id="pp-${s}" class="num" type="number" min="0" max="100" inputmode="numeric" data-s="${s}" data-l="pp" value="${p.pp ?? ""}" aria-label="${SUBJ[s][0]} podstawa"></td>`;
    return `<tr><td class="sub">${esc(SUBJ[s][0])}${sub ? `<small>${sub}</small>` : ""}</td>${ppCell}
      <td><input id="pr-${s}" class="num" type="number" min="0" max="100" inputmode="numeric" data-s="${s}" data-l="pr" value="${p.pr ?? ""}" aria-label="${SUBJ[s][0]} ${s === "rys" ? "wynik" : "rozszerzenie"}"></td></tr>`;
  }).join("");
  $("#example-note").hidden = !S.example;
  const hasPR = Object.entries(S.profile).some(([s, p]) => s !== "rys" && num(p.pr) != null);
  const missingM = MANDATORY.filter(s => num((S.profile[s] || {}).pp) == null);
  const msgs = [];
  if (missingM.length) msgs.push(`Uzupełnij wynik z poziomu podstawowego: ${missingM.map(s => SUBJ[s][0].toLowerCase()).join(", ")}. Te trzy egzaminy zdaje każdy maturzysta.`);
  if (!hasPR) msgs.push("Do matury trzeba przystąpić do co najmniej jednego przedmiotu na poziomie rozszerzonym. Dodaj go w kolumnie PR.");
  msgs.push("Architektura liczy punkty według wzoru każdej uczelni. Pozostałe kierunki używają modelu: wynik PR w całości, PP razy 0,5. Gdy zdajesz przedmiot na obu poziomach, liczy się korzystniejszy wynik.");
  $("#rules-note").innerHTML = msgs.map(esc).join("<br>");
}
function onProfileInput(e) {
  const t = e.target; if (!t.dataset.s) return;
  const s = t.dataset.s, l = t.dataset.l, v = num(t.value);
  S.profile[s] = S.profile[s] || {};
  if (v == null) delete S.profile[s][l]; else S.profile[s][l] = v;
  if (!Object.keys(S.profile[s]).length) delete S.profile[s];
  S.example = false; save(); $("#example-note").hidden = true;
}

/* ===================== PLAN ===================== */
function analyse() {
  const T = S.targets.map(id => OMAP[id]).filter(o => o && !(o.arch && !o.arch.calc));
  const base = T.map(o => compute(o, S.profile));
  const rel = new Set(["rys"]);
  T.forEach(o => (o.arch ? o.arch.calc.matura.flatMap(t => t.s) : o.comps.flatMap(c => c.subs)).forEach(s => rel.add(s)));
  const improve = [], add = [];
  rel.forEach(s => {
    ["pr", "pp"].forEach(l => {
      if (s === "rys" && l === "pp") return;
      const cur = num((S.profile[s] || {})[l]);
      if (cur == null) {
        if (l !== "pr") return;
        const prof = boosted(S.profile, s, "pr", 60);
        const rs = T.map(o => compute(o, prof));
        const d = rs.map((r, i) => r.index - base[i].index);
        const fixes = rs.filter((r, i) => (base[i].missing.length + (base[i].examBelow ? 1 : 0)) > (r.missing.length + (r.examBelow ? 1 : 0))).length;
        const avg = d.reduce((a, b) => a + b, 0) / (T.length || 1);
        if (avg > 0.05 || fixes) add.push({s, l, avg, n: d.filter(x => x > 0.05).length, fixes});
        return;
      }
      if (cur >= 100) return;
      const prof = boosted(S.profile, s, l, Math.min(100, cur + 10));
      const d = T.map((o, i) => compute(o, prof).index - base[i].index);
      const avg = d.reduce((a, b) => a + b, 0) / (T.length || 1);
      if (avg > 0.01) improve.push({s, l, cur, avg, n: d.filter(x => x > 0.01).length});
    });
  });
  improve.sort((a, b) => b.avg - a.avg || b.n - a.n); add.sort((a, b) => b.fixes - a.fixes || b.avg - a.avg);
  return {T, base, improve, add};
}
function gapAdvice(o, r) {
  if (r.noCalc) return "Ta uczelnia nie publikuje pełnego wzoru w znalezionych źródłach. Szczegóły egzaminu są w karcie uczelni.";
  if (r.missing.length) return "Brakuje: " + [...new Set(r.missing.map(c => reqText(c)))].join("; ") + ".";
  if (r.examBelow) {
    const e = r.exam.e;
    return r.exam.pct == null ? "Wpisz przewidywany wynik z rysunku, bo bez zaliczenia egzaminu nie ma przyjęcia."
      : `Rysunek: ${fmt(r.exam.pts, 0)} pkt, a minimum to ${e.min} z ${e.max} pkt (${Math.ceil(e.min / e.max * 100)}%). To pierwsza rzecz do poprawy.`;
  }
  const cel = o.cel, unit = o.arch ? "% maks." : "pkt";
  const gap = cel - r.index;
  const label = o.arch ? (o.celSrc === "szacunek" ? "szacowanego poziomu (uczelnia nie podaje progu)" : o.celSrc) : "szacowanego poziomu";
  if (gap <= 0) return o.arch && o.celSrc !== "szacunek"
    ? `Masz ${fmt(r.points, 0)} pkt, ${fmt(-gap / 100 * r.max, 0)} pkt powyżej progu z ${o.arch.prog.rok}.`
    : `Masz ${fmt(-gap)} ${unit} zapasu ponad poziom ${label}.`;
  let prof = JSON.parse(JSON.stringify(S.profile)), idx = r.index; const add = {};
  for (let step = 0; step < 400 && idx < cel; step++) {
    let pick = null;
    Object.keys(prof).forEach(s => ["pr", "pp"].forEach(l => {
      const cur = num(prof[s][l]); if (cur == null || cur >= 100) return;
      const v = compute(o, boosted(prof, s, l, cur + 1)).index; if (!pick || v > pick.v) pick = {s, l, v};
    }));
    if (!pick || pick.v <= idx + 1e-9) break;
    prof = boosted(prof, pick.s, pick.l, num(prof[pick.s][pick.l]) + 1); idx = pick.v; const key = pick.s + "|" + pick.l; add[key] = (add[key] || 0) + 1;
  }
  const list = Object.entries(add).sort((a, b) => b[1] - a[1]).map(([k, x]) => {const [s, l] = k.split("|"); return `${subjLow(s, l)} +${x}%`;}).join(", ");
  const head = o.arch && o.celSrc !== "szacunek" ? `Do progu z ${o.arch.prog.rok} brakuje ${fmt(gap / 100 * r.max, 0)} pkt.` : `Brakuje ${fmt(gap)} ${unit} do ${label}.`;
  return idx >= cel ? `${head} Najkrótsza droga: <span class="hl">${list}</span>.` : `${head} Nawet maksimum z obecnych przedmiotów nie wystarcza, dodaj rozszerzenie.`;
}
function renderPlan() {
  const el = $("#plan-body");
  if (!S.targets.length) {el.innerHTML = `<div class="card empty"><p>Nie masz jeszcze wybranych kierunków.</p><p><a class="btn" href="#architektura">Wybierz uczelnie z architekturą</a></p></div>`; return;}
  const {T, base, improve, add} = analyse();
  const all = S.targets.map(id => OMAP[id]).filter(Boolean);
  const miss = new Map();
  T.forEach((o, i) => base[i].missing.forEach(c => {const key = reqText(c); if (!miss.has(key)) miss.set(key, new Set()); miss.get(key).add(o);}));
  const below = T.filter((o, i) => base[i].examBelow);
  const maxG = Math.max(...improve.map(x => x.avg), 0.01);
  el.innerHTML = `
  ${below.length ? `<div class="alert"><b>Rysunek</b><span>Wynik z rysunku jest poniżej minimum na: ${esc(below.map(o => o.u.short).join(", "))}. Bez zaliczonego egzaminu nie ma przyjęcia, więc to priorytet przed maturą.</span></div>` : ""}
  ${[...miss].map(([req, os]) => `<div class="alert"><b>Wymóg</b><span>${esc(req)}: potrzebne na ${os.size} z ${T.length} wybranych kierunków (${esc([...os].map(o => o.k.name + " " + o.u.short).join(", "))}).</span></div>`).join("")}
  <div class="grid2">
    <div class="card sec">
      <h2>Priorytety nauki</h2>
      <p class="lead">O ile średnio rośnie Twój wynik (w % maksymalnej liczby punktów), gdy podniesiesz przedmiot o 10 punktów procentowych.</p>
      ${improve.length ? improve.slice(0, 8).map((x, i) => `<div class="prio ${i < 2 ? "top" : ""}">
        <div class="rk">${i + 1}</div>
        <div class="nm"><b>${esc(subjLabel(x.s, x.l))}</b><small>teraz ${x.cur}% · liczy się na ${x.n} z ${T.length} ${plural(T.length, "kierunku", "kierunkach", "kierunkach")}</small></div>
        <div class="gain"><b class="num">+${fmt(x.avg, 2)}</b><small>pkt proc.</small></div>
        <div class="mini"><i style="width:${Math.round(x.avg / maxG * 100)}%"></i></div>
      </div>`).join("") : '<p class="empty">Uzupełnij wyniki w zakładce „Moje wyniki”, żeby zobaczyć ranking.</p>'}
      ${add.length ? `<h3 style="margin-top:16px">Warto rozważyć dodatkowe rozszerzenie</h3>
      <p class="lead" style="font-size:.84rem;margin:2px 0 6px">Zakładamy wynik 60% z nowego przedmiotu.</p>
      ${add.slice(0, 4).map(x => `<div class="prio"><div class="rk">+</div><div class="nm"><b>${esc(subjLabel(x.s, "pr"))}</b><small>${x.fixes ? `uzupełnia wymóg na ${x.fixes} ${plural(x.fixes, "kierunku", "kierunkach", "kierunkach")}` : `podnosi wynik na ${x.n} z ${T.length}`}</small></div><div class="gain"><b class="num">+${fmt(x.avg, 1)}</b><small>pkt proc.</small></div></div>`).join("")}` : ""}
    </div>
    <div class="card sec">
      <h2>Wybrane kierunki</h2>
      <p class="lead">Pasek to Twój wynik jako % maksimum. Kreska to próg z ubiegłego roku albo szacowany poziom realnej szansy.</p>
      ${all.map(o => {const r = compute(o, S.profile), st = status(o, r); return `<div class="target">
        <div class="nm" data-o="${o.id}" role="button" tabindex="0"><b>${esc(o.k.name)}</b><small>${esc(o.u.name)}, ${esc(o.u.city)}</small></div>
        <div style="text-align:right"><span class="pill ${st.cls}">${st.txt}</span><div class="num" style="font-weight:700">${r.noCalc ? "—" : o.arch ? `${fmt(r.points, 0)} <span style="color:var(--muted);font-weight:500">/ ${fmt(r.max, 0)}</span>` : `${fmt(r.index)} <span style="color:var(--muted);font-weight:500">/ ${o.cel}</span>`}</div></div>
        ${r.noCalc ? "" : `<div class="bar" aria-hidden="true"><i style="width:${Math.min(100, r.index)}%"></i><em style="left:calc(${Math.min(99, o.cel)}% - 1px)"></em></div>`}
        <div class="advice">${gapAdvice(o, r)}</div>
      </div>`;}).join("")}
    </div>
  </div>`;
}

/* ===================== SZCZEGÓŁY ===================== */
function archSheetBody(o, r) {
  const a = o.arch, pw = ARCH_PEWNOSC[a.pewnosc];
  const info = [["Studia", a.stopien], ["Zasady", a.rok], ["Egzamin", a.egzamin], ["Terminy", a.terminy], ["Limit miejsc", a.limit]]
    .concat(a.przedmioty ? [["Przedmioty", a.przedmioty]] : []).concat(a.czesne ? [["Czesne", a.czesne]] : [])
    .concat(a.progi.length ? [["Progi", a.progi.map(p => p[0] + ": " + p[1]).join("; ")]] : []);
  let calcHTML = "";
  if (!r.noCalc) {
    const g = gains(o, S.profile).slice(0, 4);
    calcHTML = `<div class="big"><div><div class="l">Twoje punkty</div><div class="v">${fmt(r.points, 0)}</div></div>
      <div><div class="l">Maksimum</div><div class="v" style="color:var(--muted)">${fmt(r.max, 0)}</div></div>
      ${a.prog ? `<div><div class="l">Próg ${esc(a.prog.rok)}</div><div class="v" style="color:var(--muted)">${a.prog.v}</div></div>` : ""}</div>
    <div class="tw"><table class="parts"><thead><tr><th>Składnik</th><th>Liczony wynik</th><th class="r">Punkty</th></tr></thead><tbody>
      ${r.parts.map(p => `<tr><td>${esc(p.t.l)}${p.t.w !== 1 ? ` <span class="formula">×${fmt(p.t.w, 2).replace(/,?0+$/, "")}</span>` : ""}</td>
        <td>${p.sub ? `${esc(SUBJ[p.sub][0])} ${p.lvl === "PP+PR" ? `PP ${p.pp}% + PR ${p.pr}%` : `${p.lvl} ${p.pct}%`}${!p.t.k && p.lvl === "PP" && p.t.pp !== 1 ? ` <span class="formula">×${fmt(p.t.pp, 2).replace(/,?0+$/, "")}</span>` : ""}${!p.t.k && p.lvl === "PR" && p.t.pr !== 1 ? ` <span class="formula">×${fmt(p.t.pr, 2).replace(/,?0+$/, "")}</span>` : ""}` : p.opt ? '<span class="pill info">nie zdajesz · 0 pkt</span>' : '<span class="pill bad">brak</span>'}</td>
        <td class="r num">${fmt(p.pts)} / ${fmt(p.max, 0)}</td></tr>`).join("")}
      ${r.exam ? `<tr><td>${esc(r.exam.e.l)}${r.exam.w !== 1 ? ` <span class="formula">×${r.exam.w}</span>` : ""}</td>
        <td>${r.exam.pct == null ? '<span class="pill bad">brak wyniku</span>' : `${r.exam.pct}% → ${fmt(r.exam.pts, 0)} pkt${r.exam.e.min ? ` (min. ${r.exam.e.min})` : ""}`}</td>
        <td class="r num">${fmt(r.exam.total)} / ${fmt(r.exam.w * r.exam.e.max, 0)}</td></tr>` : ""}
    </tbody></table></div>
    <p class="advice" style="font-size:.88rem;margin-top:10px">${gapAdvice(o, r)}</p>
    ${g.length ? `<p class="sub" style="margin:8px 0 0">Najwięcej daje +10 pkt proc. z: ${g.map(x => `<b>${esc(subjLow(x.s, x.l))}</b> (+${fmt(x.d)} pkt)`).join(", ")}.</p>` : ""}
    ${a.calc.zalozenia ? `<p class="note" style="margin-top:12px">Założenia w obliczeniach: ${esc(a.calc.zalozenia)}</p>` : ""}`;
  }
  return `<div class="afoot" style="margin:10px 0"><span class="pill ${pw[0]}">${pw[1]}</span></div>
    <p class="formula" style="margin:0 0 10px;font-size:.88rem">${esc(a.wzor)}</p>
    ${calcHTML}
    <dl class="facts-dl">${info.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
    <h3 style="margin-top:14px">Źródła</h3>
    <ul class="src">${a.zrodla.map(([t, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a></li>`).join("")}</ul>`;
}
function genericSheetBody(o, r) {
  const st = status(o, r);
  return `<div class="big"><div><div class="l">Twój wskaźnik</div><div class="v">${fmt(r.index)}</div></div>
      <div><div class="l">Realna szansa od ok.</div><div class="v" style="color:var(--muted)">${o.cel}</div></div>
      <span class="pill ${st.cls}" style="margin-bottom:6px">${st.txt}</span></div>
    <p class="formula" style="margin:0 0 10px">${esc(formulaText(o))}</p>
    <div class="tw"><table class="parts"><thead><tr><th>Wymaganie</th><th class="r">Waga</th><th>Liczony wynik</th><th class="r">Punkty</th></tr></thead><tbody>
    ${r.parts.map(p => `<tr><td>${esc(reqText(p.c))}</td><td class="r num">${Math.round(p.c.w / r.sw * 100)}%</td>
      <td>${p.lvl ? `${esc(SUBJ[p.sub][0])} ${p.lvl === "wynik" ? "" : p.lvl} <span class="num">${fmt(p.val)}</span>` : '<span class="pill bad">brak</span>'}</td>
      <td class="r num">${fmt(p.contrib / r.sw)}</td></tr>`).join("")}
    </tbody></table></div>
    <p class="advice" style="font-size:.88rem;margin-top:12px">${gapAdvice(o, r)}</p>
    <p class="note">Wagi to model typowych zasad, nie wzór uczelni. Przed decyzją sprawdź uchwałę rekrutacyjną.</p>
    ${o.u.type === "prv" ? '<p class="note">Uczelnia niepubliczna: studia są płatne, a o przyjęciu często decyduje kolejność zgłoszeń lub rozmowa.</p>' : ""}`;
}
function openSheet(id) {
  const o = OMAP[id]; if (!o) return;
  const r = compute(o, S.profile), on = isTarget(id);
  $("#sheet-root").innerHTML = `<div class="sheet-bg" id="sbg"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh-t">
    <header><div><h2 id="sh-t">${esc(o.k.name)}</h2><div class="sub">${esc(o.u.name)} · ${esc(o.u.city)} · ${TYPES[o.u.type]}<br>Studia ${DEG[o.deg]}</div></div>
    <button class="ghost" id="sh-x" type="button" aria-label="Zamknij">✕</button></header>
    ${o.arch ? archSheetBody(o, r) : genericSheetBody(o, r)}
    <div class="acts"><button class="primary" id="sh-star" type="button">${on ? "★ Usuń z planu" : "☆ Dodaj do planu nauki"}</button>
    <a class="btn" href="${officialLink(o)}" target="_blank" rel="noopener">Szukaj zasad na stronie uczelni ↗</a></div>
  </div></div>`;
  const close = () => {$("#sheet-root").innerHTML = ""; document.removeEventListener("keydown", esck);};
  const esck = e => {if (e.key === "Escape") close();};
  document.addEventListener("keydown", esck);
  $("#sbg").onclick = e => {if (e.target.id === "sbg") close();};
  $("#sh-x").onclick = close; $("#sh-x").focus();
  $("#sh-star").onclick = () => {toggleTarget(id); openSheet(id);};
}

/* ===================== ROUTING I ZDARZENIA ===================== */
const VIEWS = ["architektura", "wnetrza", "szukaj", "profil", "plan"];
const curView = () => VIEWS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "architektura";
function route() {
  const v = curView();
  $("#sheet-root").innerHTML = "";
  const sec = v === "wnetrza" ? "architektura" : v;
  if (v === "wnetrza") curDetail = "aw"; else if (v === "architektura") curDetail = "arc";
  ["architektura", "szukaj", "profil", "plan"].forEach(x => {$("#v-" + x).hidden = x !== sec;});
  document.querySelectorAll("nav.tabs a").forEach(a => {if (a.dataset.tab === v) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");});
  render(v);
}
function render(v) {
  $("#tcount").textContent = S.targets.length;
  if (v === "architektura" || v === "wnetrza") renderArch(); else if (v === "szukaj") renderSearch(); else if (v === "profil") renderProfile(); else renderPlan();
}
function refresh() {render(curView());}

document.addEventListener("click", e => {
  const star = e.target.closest("[data-star]"); if (star) {e.preventDefault(); e.stopPropagation(); toggleTarget(star.dataset.star); return;}
  const more = e.target.closest("[data-more]"); if (more) {showAll.add(more.dataset.more); renderSearch(); return;}
  const o = e.target.closest("[data-o]"); if (o && !e.target.closest(".sheet")) {openSheet(o.dataset.o);}
});
document.addEventListener("keydown", e => {if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-o]")) {e.preventDefault(); openSheet(e.target.dataset.o);}});
document.addEventListener("toggle", e => {
  const d = e.target; if (!d.matches || !d.matches("details.group")) return;
  const k = d.dataset.k;
  if (d.open && !openGroups.has(k)) {openGroups.add(k); renderSearch();} else if (!d.open && openGroups.has(k)) openGroups.delete(k);
}, true);
$("#ptable").addEventListener("input", onProfileInput);
$("#ptable").addEventListener("change", renderProfile);
$("#clear-p").onclick = () => {S.profile = {}; S.example = false; save(); renderProfile();};
$("#sample-p").onclick = () => {S.profile = JSON.parse(JSON.stringify(SAMPLE.profile)); S.example = true; S.v = 2; save(); renderProfile();};
$("#export-p").onclick = () => {
  const code = btoa(unescape(encodeURIComponent(JSON.stringify({p: S.profile, t: S.targets}))));
  $("#import-box").value = code;
  const manual = () => {$("#import-box").select(); $("#io-msg").textContent = "Zaznaczono kod, skopiuj go ręcznie.";};
  if (navigator.clipboard) navigator.clipboard.writeText(code).then(() => {$("#io-msg").textContent = "Skopiowano kod do schowka.";}, manual); else manual();
};
$("#import-p").onclick = () => {
  try {
    const d = JSON.parse(decodeURIComponent(escape(atob($("#import-box").value.trim()))));
    if (!d.p || !Array.isArray(d.t)) throw new Error("zły kod");
    S.profile = d.p; S.targets = d.t.filter(id => OMAP[id]); S.example = false; save(); renderProfile();
    $("#tcount").textContent = S.targets.length; $("#io-msg").textContent = "Wczytano profil i plan.";
  } catch (e) {$("#io-msg").textContent = "Ten kod jest niepoprawny. Skopiuj go jeszcze raz w całości.";}
};
$("#db-note").innerHTML = `Baza: <b>${ARCH.length}</b> uczelni z architekturą i <b>${AW.length}</b> z architekturą wnętrz (wzory, egzaminy, progi i źródła) oraz <b>${K.length - 2}</b> innych kierunków w <b>${OFFERS.length - ARCH.length - AW.length}</b> ofertach na <b>${U.length}</b> uczelniach. Dla architektury i wnętrz punkty liczone są wzorami uczelni tam, gdzie je znamy, a przy każdej uczelni opisano poziom pewności danych. Pozostałe kierunki używają uproszczonego modelu wag, a „realna szansa” to szacunek, nie oficjalny próg. Przed złożeniem dokumentów sprawdź zasady rekrutacji uczelni.`;
initFilters();
window.addEventListener("hashchange", route);
route();

/* ===================== KONTO I SYNCHRONIZACJA ===================== */
// Tryb lokalny: przycisk konta jest ukryty. Tryb chmury: po zalogowaniu wyniki i plan
// zapisują się w Firestore (users/{uid}) i są takie same na każdym urządzeniu.
let cloud = null, user = null, unwatch = null, syncT = null, syncState = "";
const canSync = () => cloud && cloud.mode === "cloud" && user && user.emailVerified;
function syncSoon() {
  if (!canSync()) return;
  clearTimeout(syncT); setSync("zapisywanie…");
  syncT = setTimeout(async () => {
    try {await cloud.save(user, S); setSync("zapisano");} catch (e) {setSync("błąd zapisu");}
  }, 800);
}
function setSync(t) {syncState = t; const el = $("#sync-state"); if (el) el.textContent = t;}
function updateAcct() {
  const b = $("#acct"); if (!cloud || cloud.mode !== "cloud") {b.hidden = true; return;}
  b.hidden = false;
  b.classList.toggle("on", !!(user && user.emailVerified));
  b.classList.toggle("warn", !!(user && !user.emailVerified));
  $("#acct-txt").textContent = !user ? "Zaloguj się" : !user.emailVerified ? "Potwierdź e-mail" : (user.name || user.email).split(" ")[0];
}
function applyRemote(d) {
  if (!d || !d.profile) return;
  S.profile = d.profile; S.targets = (d.targets || []).filter(id => OMAP[id]); S.example = false;
  saveLocal(); refresh();
}
async function onUser(u) {
  if (unwatch) {unwatch(); unwatch = null;}
  user = u; updateAcct();
  if (!canSync()) return;
  try {
    setSync("wczytywanie…");
    const d = await cloud.load(user.uid);
    if (d) applyRemote(d);
    else if (!S.example) await cloud.save(user, S); // pierwsze logowanie: wyślij to, co już wpisano na tym urządzeniu
    setSync("zapisano");
    unwatch = cloud.watch(user.uid, d2 => {
      if (JSON.stringify([d2.profile, d2.targets]) !== JSON.stringify([S.profile, S.targets])) applyRemote(d2);
    });
  } catch (e) {setSync("brak połączenia, zapis lokalny");}
}
const AUTH_ERR = {
  "auth/invalid-credential": "Nieprawidłowy e-mail albo hasło.",
  "auth/wrong-password": "Nieprawidłowe hasło.",
  "auth/user-not-found": "Nie ma konta z tym adresem. Załóż je w zakładce „Załóż konto”.",
  "auth/email-already-in-use": "To konto już istnieje. Zaloguj się albo zresetuj hasło.",
  "auth/weak-password": "Hasło musi mieć co najmniej 6 znaków.",
  "auth/invalid-email": "To nie wygląda na poprawny adres e-mail.",
  "auth/too-many-requests": "Za dużo prób. Spróbuj ponownie za kilka minut.",
  "auth/network-request-failed": "Brak połączenia z internetem.",
  "auth/unauthorized-domain": "Ta domena nie jest dodana w Firebase (Authentication → Settings → Authorized domains)."
};
const authErr = e => AUTH_ERR[e && e.code] || "Coś poszło nie tak. Spróbuj ponownie.";
function openAccount(tab) {
  tab = tab || "in";
  const body = !user ? `
    <p class="sub">Zaloguj się, żeby Twoje wyniki i wybrane kierunki były na każdym urządzeniu. Bez logowania zapisują się tylko na tym telefonie.</p>
    <button class="google-btn" id="g-in" type="button"><svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>Zaloguj przez Google</button>
    <div class="or">albo e-mailem</div>
    <div class="auth-tabs" role="tablist">
      <button type="button" role="tab" data-tab-auth="in" aria-selected="${tab === "in"}">Logowanie</button>
      <button type="button" role="tab" data-tab-auth="up" aria-selected="${tab === "up"}">Załóż konto</button>
    </div>
    <form class="auth-form" id="auth-form" novalidate>
      ${tab === "up" ? '<label class="lbl" for="a-name">Imię<input id="a-name" autocomplete="given-name"></label>' : ""}
      <label class="lbl" for="a-mail">E-mail<input id="a-mail" type="email" autocomplete="email" required></label>
      <label class="lbl" for="a-pass">Hasło<input id="a-pass" type="password" autocomplete="${tab === "up" ? "new-password" : "current-password"}" minlength="6" required></label>
      <button class="primary" type="submit">${tab === "up" ? "Załóż konto" : "Zaloguj się"}</button>
      ${tab === "in" ? '<button class="ghost" type="button" id="a-reset">Nie pamiętam hasła</button>' : '<p class="sub" style="margin:0">Na podany adres wyślemy link potwierdzający. Po kliknięciu go wróć tutaj.</p>'}
    </form>`
  : !user.emailVerified ? `
    <p>Konto <b>${esc(user.email)}</b> czeka na potwierdzenie.</p>
    <p class="sub">Kliknij link w mailu od Firebase (sprawdź też folder spam), a potem wróć tutaj i naciśnij „Już potwierdziłem”.</p>
    <div class="confirm-row"><button class="primary" id="a-check" type="button">Już potwierdziłem</button>
      <button id="a-resend" type="button">Wyślij link jeszcze raz</button><button class="ghost" id="a-out" type="button">Wyloguj</button></div>`
  : `
    <p><b>${esc(user.name || "")}</b><br><span class="sub">${esc(user.email)}</span></p>
    <p class="sub">Synchronizacja: <span id="sync-state">${esc(syncState || "zapisano")}</span>. Wyniki i plan są takie same na każdym urządzeniu, na którym się zalogujesz.</p>
    <div class="confirm-row"><button id="a-out" type="button">Wyloguj</button><button class="ghost" id="a-del" type="button">Usuń moje dane z chmury</button></div>
    <div id="del-confirm" hidden class="confirm-row"><span class="sub">Na pewno? Wyniki i plan znikną z chmury i z tego urządzenia.</span>
      <button class="primary" id="a-del-yes" type="button">Usuń</button><button id="a-del-no" type="button">Anuluj</button></div>`;
  $("#sheet-root").innerHTML = `<div class="sheet-bg" id="sbg"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="ac-t">
    <header><div><h2 id="ac-t">Twoje konto</h2></div><button class="ghost" id="sh-x" type="button" aria-label="Zamknij">✕</button></header>
    ${body}<p class="auth-msg" id="a-msg" role="status"></p></div></div>`;
  const msg = (t, ok) => {const m = $("#a-msg"); m.textContent = t; m.className = "auth-msg " + (ok ? "ok" : "err");};
  const close = () => {$("#sheet-root").innerHTML = "";};
  $("#sbg").onclick = e => {if (e.target.id === "sbg") close();};
  $("#sh-x").onclick = close;
  const on = (id, fn) => {const el = $(id); if (el) el.onclick = async () => {try {await fn();} catch (e) {msg(authErr(e));}};};
  on("#g-in", async () => {await cloud.signIn();});
  document.querySelectorAll("[data-tab-auth]").forEach(b => b.onclick = () => openAccount(b.dataset.tabAuth));
  const f = $("#auth-form");
  if (f) f.onsubmit = async e => {
    e.preventDefault();
    const mail = $("#a-mail").value, pass = $("#a-pass").value;
    if (!mail || pass.length < 6) {msg("Podaj e-mail i hasło (co najmniej 6 znaków)."); return;}
    try {
      if (tab === "up") {await cloud.signUpEmail(mail, pass, ($("#a-name") || {}).value || ""); msg("Wysłaliśmy link potwierdzający na " + mail + ".", true);}
      else await cloud.signInEmail(mail, pass);
    } catch (err) {msg(authErr(err));}
  };
  on("#a-reset", async () => {
    const mail = $("#a-mail").value; if (!mail) {msg("Wpisz najpierw swój e-mail."); return;}
    await cloud.resetPassword(mail); msg("Wysłaliśmy link do zmiany hasła na " + mail + ".", true);
  });
  on("#a-check", async () => {
    const u = await cloud.refreshUser();
    if (u && u.emailVerified) {await onUser(u); openAccount();} else msg("Adres nie jest jeszcze potwierdzony. Kliknij link w mailu.");
  });
  on("#a-resend", async () => {await cloud.resendVerification(); msg("Wysłaliśmy nowy link.", true);});
  on("#a-out", async () => {
    await cloud.signOut();
    S = JSON.parse(JSON.stringify(SAMPLE)); saveLocal(); refresh(); close(); // dane zostają w chmurze, nie na tym urządzeniu
  });
  on("#a-del", async () => {$("#del-confirm").hidden = false;});
  on("#a-del-no", async () => {$("#del-confirm").hidden = true;});
  on("#a-del-yes", async () => {
    if (unwatch) {unwatch(); unwatch = null;}
    await cloud.deleteData(user.uid); await cloud.signOut();
    S = JSON.parse(JSON.stringify(SAMPLE)); saveLocal(); refresh(); close();
  });
}
$("#acct").onclick = () => openAccount();
createStore().then(st => {
  cloud = st; updateAcct();
  if (st.mode === "cloud") st.onAuth(u => {onUser(u); if ($("#ac-t")) openAccount();});
});

/* ===================== PWA ===================== */
let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", e => {e.preventDefault(); deferredPrompt = e; $("#install").hidden = false;});
$("#install").onclick = async () => {if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; $("#install").hidden = true;};
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").then(reg => {
    const ask = w => {$("#update-bar").hidden = false; $("#update-btn").onclick = () => w.postMessage("skipWaiting");};
    if (reg.waiting && navigator.serviceWorker.controller) ask(reg.waiting);
    reg.addEventListener("updatefound", () => {
      const w = reg.installing;
      w && w.addEventListener("statechange", () => {if (w.state === "installed" && navigator.serviceWorker.controller) ask(w);});
    });
  }).catch(() => { /* bez trybu offline */ });
  let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {if (!reloaded) {reloaded = true; location.reload();}});
}
