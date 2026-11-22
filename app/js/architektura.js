// Baza kierunku ARCHITEKTURA (studia I stopnia / jednolite magisterskie), stan: listopad 2026.
// Zebrane z uchwał rekrutacyjnych i stron uczelni (rekrutacja 2027/28 tam, gdzie była już dostępna),
// a gdy ich brakowało, z serwisów zewnętrznych. Każdy wpis ma źródła i poziom pewności.
//
// pewnosc: "oficjalne" – wzór sprawdzony w uchwale/na stronie uczelni (XI 2026);
//          "czesciowe" – wzór znany, ale część przeliczników jest założeniem;
//          "bez-skali" – wzór z uczelni, ale bez skali egzaminu, więc bez liczenia punktów;
//          "brak-wzoru" – znamy egzamin i przedmioty, wzoru nie;
//          "serwis" – dane tylko z serwisów zewnętrznych, niesprawdzone u źródła.
// calc: składniki wzoru do przeliczenia punktów.
//   matura: {l: etykieta, s: przedmioty (liczy się najlepszy), w: waga,
//            pp/pr: mnożnik wyniku % (liczy się lepszy z poziomów),
//            k: zamiast pp/pr lista kombinacji [a, b] → max(a·PP + b·PR) (np. PWr: P, P+1,5R, 2,5R),
//            max: maksymalna wartość składnika przed wagą (domyślnie 100 × największy mnożnik),
//            opt: brak przedmiotu daje 0 pkt, ale nie wyklucza z rekrutacji}
//   egzamin: {l, max, min, w}  – wynik egzaminu rysunkowego w punktach uczelni.
//   zalozenia: co przyjęliśmy, bo źródło tego nie podaje.
const ARCH = [
 {
  id: "pw", name: "Politechnika Warszawska", short: "PW", city: "Warszawa", type: "poli", tier: 5, dom: "pw.edu.pl",
  deg: "M", stopien: "jednolite magisterskie (po polsku); Architecture I stopnia po angielsku",
  rok: "2027/28 – uchwała Senatu PW nr 294/LI/2026 z 24.06.2026, zał. 2, § 1", pewnosc: "oficjalne",
  wzor: "PK = Psp + Pmat × 0,75 + Pjo × 0,25 + Pwyb1 × 0,5 + Pwyb2 × 0,5",
  calc: {
    matura: [
      {l: "Pmat – matematyka", s: ["mat"], w: .75, pp: .5, pr: 1},
      {l: "Pjo – język obcy", s: ["obc"], w: .25, pp: .5, pr: 1},
      {l: "Pwyb1 – grupa 1: fizyka, informatyka, chemia, biologia, geografia", s: ["fiz","inf","che","bio","geo"], w: .5, pp: .5, pr: 1, opt: true},
      {l: "Pwyb2 – grupa 2: historia, historia sztuki, język polski, filozofia", s: ["his","hsz","pol","fil"], w: .5, pp: .5, pr: 1, opt: true}
    ],
    egzamin: {l: "Psp – sprawdzian uzdolnień i predyspozycji", max: 200, min: 60, w: 1},
    zalozenia: "Brak przedmiotu z grupy daje 0 pkt, ale nie wyklucza z rekrutacji. Wynik PP liczy się ×0,5 (§ 2 ust. 5)."
  },
  egzamin: "Sprawdzian uzdolnień i predyspozycji, 0–200 pkt. Kwalifikuje się tylko ten, kto zdobędzie co najmniej 30% punktów ze sprawdzianu (60 pkt). Na studia po angielsku obowiązuje osobny tryb: zadanie zdalne w skali 60 pkt, potem rozmowa z 75 najlepszymi (40 pkt).",
  terminy: "Rejestracja 26.04–25.05.2027. Sprawdzian w pierwszej połowie czerwca 2027, wyniki w połowie czerwca. Wyniki kwalifikacji w połowie lipca 2027, dokumenty w drugiej połowie lipca.",
  limit: "100 miejsc (2025/26, serwisy zewnętrzne)",
  progi: [["2025","176 pkt w skali 0–225 (maturalnie.pl, inna skala niż obecny wzór)"]],
  zrodla: [
    ["Uchwała Senatu PW 294/LI/2026, zał. 2 (2027/28)","https://www.bip.pw.edu.pl/var/pw/storage/original/application/cb795d397e309dd949d450a52a690266.pdf"],
    ["Wydział Architektury PW – kandydaci","https://www.arch.pw.edu.pl/Kandydaci"]
  ]
 },
 {
  id: "pwr", name: "Politechnika Wrocławska", short: "PWr", city: "Wrocław", type: "poli", tier: 4, dom: "pwr.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie",
  rok: "2027/28 – Warunki i tryb rekrutacji (uchwała Senatu PWr nr 384/26/2024-2028), zał. 1, § 9 i § 12", pewnosc: "oficjalne",
  wzor: "WI = M + PD + 0,1·JO + 0,1·JP + RA,  M/PD/JO = max(P; P + 1,5R; 2,5R),  JP = max(P; R)",
  calc: {
    matura: [
      {l: "M – matematyka", s: ["mat"], w: 1, k: [[1,0],[1,1.5],[0,2.5]]},
      {l: "PD – fizyka (jedyny przedmiot dodatkowy na architekturze)", s: ["fiz"], w: 1, k: [[1,0],[1,1.5],[0,2.5]], opt: true},
      {l: "JO – język obcy", s: ["obc"], w: .1, k: [[1,0],[1,1.5],[0,2.5]]},
      {l: "JP – język polski", s: ["pol"], w: .1, k: [[1,0],[0,1]]}
    ],
    egzamin: {l: "RA – egzamin z rysunku", max: 660, min: 240, w: 1},
    zalozenia: "Maksimum WI bez rysunku to 535 pkt, z rysunkiem 1195 pkt. Bez fizyki PD = 0. Wskaźnik wynosi 0 tylko wtedy, gdy kandydat nie zdawał ani matematyki, ani przedmiotu dodatkowego."
  },
  egzamin: "Obowiązkowy egzamin z rysunku na miejscu: dwa zadania ołówkiem, rysunek z natury i rysunek z wyobraźni na temat podany przez komisję. Sprawdza kreowanie przestrzeni trójwymiarowej oraz wiedzę o sztuce i architekturze. Łącznie 0–660 pkt, zdany od 240 pkt. Niezdany egzamin oznacza niezakwalifikowanie. Liczy się tylko egzamin z rekrutacji 2027/28.",
  terminy: "Terminy podaje terminarz rekrutacji. W 2026 zapisy kończyły się 20.06, a egzamin był 30.06–1.07.",
  limit: "sprawdź: rekrutacja.pwr.edu.pl → Liczba miejsc",
  progi: [],
  zrodla: [
    ["Warunki rekrutacji PWr 2027/28 – zał. 1","https://rekrutacja.pwr.edu.pl/wp-content/uploads/2026/06/WIR-2027_2028-Zalacznik-nr-1-dokument-glowny.pdf"],
    ["PWr – kryteria przyjęć na studia I stopnia (przedmioty dodatkowe)","https://rekrutacja.pwr.edu.pl/rekrutacja/kryteria-przyjec/kryteria-przyjec-na-studia-i-stopnia/"],
    ["PWr – egzamin z rysunku","https://rekrutacja.pwr.edu.pl/rekrutacja/egzaminy/egzamin-z-rysunku/"]
  ]
 },
 {
  id: "pk", name: "Politechnika Krakowska", short: "PK", city: "Kraków", type: "poli", tier: 3, dom: "pk.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie (po polsku i po angielsku)",
  rok: "2027/28 – PK „Wskaźniki rekrutacyjne na studia I stopnia 2027/28” i zasady egzaminu wstępnego WA", pewnosc: "oficjalne",
  wzor: "W = M + 2R + 2E   (M: wynik PR liczony podwójnie; 2R = P dla poziomu podstawowego)",
  calc: {
    matura: [
      {l: "M – matematyka (PP ×1, PR ×2)", s: ["mat"], w: 1, pp: 1, pr: 2},
      {l: "2R – język polski, historia albo historia sztuki (nieobowiązkowy)", s: ["pol","his","hsz"], w: 2, pp: .5, pr: 1, opt: true}
    ],
    egzamin: {l: "E – egzamin z predyspozycji architektonicznych", max: 100, min: 10, w: 2},
    zalozenia: "Maksimum 600 pkt. Brak przedmiotu charakterystycznego daje R = 0, ale nie wyklucza z rekrutacji."
  },
  egzamin: "Egzamin wstępny z predyspozycji architektonicznych i uzdolnień artystycznych: jedna praca, rysunek z wyobraźni (kompozycja), w jednym dniu, na brystolu 50×70 cm. Ocena 0–100 pkt według kryteriów: zgodność z tematem, kompozycja, perspektywa i inne. Warunek przyjęcia: co najmniej 10 pkt. Na studia po angielsku trzeba też mieć co najmniej 60% z angielskiego PR albo certyfikat.",
  terminy: "Egzamin w czerwcu 2027. Dokładny termin ogłoszą najpóźniej miesiąc przed rozpoczęciem.",
  limit: "240 stacjonarne + 30 niestacjonarne (2026/27, wg totu.net.pl, niepotwierdzone)",
  progi: [["2025/26","282 pkt stacjonarne, 173 pkt niestacjonarne (otouczelnie.pl)"]],
  prog: {v: 282, rok: "2025/26"},
  zrodla: [
    ["PK – wskaźniki rekrutacyjne na studia I stopnia 2027/28","https://rekrutacja.pk.edu.pl/rekrutacja/i-stopien/wskazniki-rekrutacyjne-na-studia-i-stopnia-w-roku-akademickim-2026-27/"],
    ["PK – zasady egzaminu wstępnego na architekturę","https://rekrutacja.pk.edu.pl/wp-content/uploads/2026/10/Architektura_egzamin-wstepny_zasady.pdf"]
  ]
 },
 {
  id: "pg", name: "Politechnika Gdańska", short: "PG", city: "Gdańsk", type: "poli", tier: 4, dom: "pg.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie (po polsku i po angielsku)",
  rok: "PG – „Wzór na liczenie punktów rekrutacyjnych” (strona rekrutacji, stan XI 2026)", pewnosc: "oficjalne",
  wzor: "WA = W + S,  W = mat·p + dod·p + 0,1·j.polski + 0,1·j.obcy·p   (p: 0,4 PP; 1 PR; 1,3 dwujęzyczny)",
  calc: {
    matura: [
      {l: "Matematyka", s: ["mat"], w: 1, pp: .4, pr: 1},
      {l: "Przedmiot dodatkowy: historia sztuki albo informatyka", s: ["hsz","inf"], w: 1, pp: .4, pr: 1, opt: true},
      {l: "Język polski (bez współczynnika p)", s: ["pol"], w: .1, pp: 1, pr: 1},
      {l: "Język obcy", s: ["obc"], w: .1, pp: .4, pr: 1}
    ],
    egzamin: {l: "S – sprawdzian predyspozycji do zawodu architekta", max: 100, min: 40, w: 1},
    zalozenia: "Skala sprawdzianu 0–100 pochodzi z wcześniejszych materiałów PG. Minimum ustala co roku komisja: w 2026 było to 40 pkt (po polsku i po angielsku). Brak przedmiotu dodatkowego daje 0 pkt."
  },
  egzamin: "Sprawdzian predyspozycji do zawodu architekta na arkuszach A3, ołówkiem. Pierwsza część to cztery polecenia z projektowania i geometrii przestrzennej. Wydział publikuje przykładowe testy z lat poprzednich. Wynik poniżej minimum wyklucza z dalszej rekrutacji.",
  terminy: "W 2026 rejestracja trwała 26.05–12.07, a minimum ze sprawdzianu ogłoszono 17.06.",
  limit: "sprawdź: pg.edu.pl → Limity i progi",
  progi: [["2026","minimum ze sprawdzianu 40 pkt (komunikat WKR)"]],
  zrodla: [
    ["PG – wzór na liczenie punktów rekrutacyjnych","https://pg.edu.pl/rekrutacja/rekrutacja-obywatele-polscy/studia-i-stopnia/jak-liczyc-punkty-rekrutacyjne/wzor-na-liczenie-punktow-rekrutacyjnych"],
    ["PG – informacje dla kandydatów na architekturę","https://pg.edu.pl/rekrutacja/rekrutacja-obywatele-polscy/informacje-dla-kandydatow-na-kierunek-architektura"],
    ["PG – kierunek Architektura","https://pg.edu.pl/rekrutacja/rekrutacja-obywatele-polscy/studia-i-stopnia/wykaz-kierunkow/architektura"]
  ]
 },
 {
  id: "pp", name: "Politechnika Poznańska", short: "PP", city: "Poznań", type: "poli", tier: 4, dom: "put.poznan.pl",
  deg: "I", stopien: "I stopnia, inżynierskie (po polsku i po angielsku)",
  rok: "2027/28 – PP „Wzory rankingowe – rok akademicki 2027/2028”", pewnosc: "oficjalne",
  wzor: "W = 0,5·Jp + 0,5·Jo + 2,5·M + R,  M = M podst. + M rozsz.",
  calc: {
    matura: [
      {l: "Jp – język polski (poziom podstawowy)", s: ["pol"], w: .5, k: [[1,0]]},
      {l: "Jo – język obcy (poziom podstawowy)", s: ["obc"], w: .5, k: [[1,0]]},
      {l: "M – matematyka: suma wyników PP i PR", s: ["mat"], w: 2.5, k: [[1,1]], max: 200}
    ],
    egzamin: {l: "R – sprawdzenie uzdolnień artystycznych", max: 400, min: 200, w: 1},
    zalozenia: "Maksimum 1000 pkt. Minimum 200/400 z egzaminu pochodzi z serwisu rysunekarchitektura.pl, oficjalna strona go nie podaje. Progi z lat ubiegłych liczono starym wzorem (R 0–500), więc nie da się ich porównać."
  },
  egzamin: "Sprawdzenie uzdolnień artystycznych, 0–400 pkt: rysunek sprawdzający przeniesienie przestrzeni na płaszczyznę. Do systemu wgrywa się też portfolio.",
  terminy: "W 2026: rejestracja do 21.06, egzamin 24.06.",
  limit: "sprawdź na put.poznan.pl",
  progi: [["2025/26","591 pkt (stary wzór)"],["2024/25","658 pkt (stary wzór)"]],
  zrodla: [
    ["PP – wzory rankingowe 2027/28","https://put.poznan.pl/rekrutacja/pierwszy-stopien/wzory-rankingowe"],
    ["RysunekArchitektura – progi i minimum z egzaminu","https://www.rysunekarchitektura.pl/progi-punktowe-architektura"]
  ]
 },
 {
  id: "pl", name: "Politechnika Łódzka", short: "PŁ", city: "Łódź", type: "poli", tier: 3, dom: "p.lodz.pl",
  deg: "I", stopien: "I stopnia, inżynierskie (po polsku i po angielsku)",
  rok: "2027/28 – uchwała Senatu PŁ nr 101/2026 z 24.06.2026, § 6 wzór (2), zał. 1 i 3", pewnosc: "oficjalne",
  wzor: "LP = 6·k·LPmatematyka + 2·k·LPjęzyk obcy + 4·k·LPdodatkowy + LPuzdolnień plastycznych   (k: 0,5 PP; 1 PR; język obcy dwujęzyczny 1,5)",
  calc: {
    matura: [
      {l: "Matematyka ×6k", s: ["mat"], w: 6, pp: .5, pr: 1},
      {l: "Język obcy ×2k", s: ["obc"], w: 2, pp: .5, pr: 1}
    ],
    egzamin: {l: "Sprawdzian uzdolnień plastycznych", max: 500, min: 250, w: 1},
    zalozenia: "Na architekturze nie ma maturalnego przedmiotu dodatkowego (zał. 1), a składnik 4·k·LPdodatkowy dotyczy tylko dyplomu technika (np. technik renowacji elementów architektury). Maksimum z matury i sprawdzianu: 1300 pkt. Na studiach po angielsku trzeba mieć co najmniej 60% z angielskiego PR albo 30% z dwujęzycznego."
  },
  egzamin: "Sprawdzian uzdolnień plastycznych: dwa odręczne rysunki ołówkiem z wyobraźni na zadane tematy, jeden 50×70 cm, drugi 35×50 cm, łącznie 5 godzin. Kategorie: zgodność z tematem (0–150), kompozycja (0–100), umiejętności rysunkowe (0–100), wrażliwość plastyczna (0–150). Duży format waży 65%, mały 35%. Maksimum 500 pkt, warunek kwalifikacji 250 pkt.",
  terminy: "Rekrutacja na 2027/28 startuje 31.03.2027. Termin sprawdzianu podaje Portal Kandydata. W 2026 sprawdzian był 25.06.",
  limit: "90 miejsc bezpłatnych, stacjonarne (2026/27, otouczelnie.pl)",
  progi: [["2026/27","760 pkt (otouczelnie.pl)"],["2025/26","761 pkt"]],
  prog: {v: 760, rok: "2026/27"},
  zrodla: [
    ["Uchwała Senatu PŁ 101/2026 (2027/28)","https://rekrutacja.p.lodz.pl/sites/default/files/2026-06/us_101_2026_24_06_2026.pdf"],
    ["PŁ – kierunek Architektura","https://rekrutacja.p.lodz.pl/kierunek/i-stopien-architektura"]
  ]
 },
 {
  id: "psl", name: "Politechnika Śląska", short: "PŚl", city: "Gliwice", type: "poli", tier: 3, dom: "polsl.pl",
  deg: "I", stopien: "I stopnia, inżynierskie",
  rok: "2027/28 – uchwała Senatu PŚl nr 34/2026 z 29.06.2026, § 8 ust. 1 pkt 1 i zał. 2", pewnosc: "oficjalne",
  wzor: "P = Pspr + k·Wm   (Wm: historia sztuki, informatyka albo matematyka; k: 0,5 PP, 1 PR)",
  calc: {
    matura: [
      {l: "Wm – historia sztuki, informatyka albo matematyka", s: ["hsz","inf","mat"], w: 1, pp: .5, pr: 1}
    ],
    egzamin: {l: "Pspr – sprawdzian uzdolnień artystycznych", max: 200, min: 0, w: 1},
    zalozenia: "Minimum ze sprawdzianu może ustalić Centralna Komisja Rekrutacyjna. Uchwała go nie podaje. Maksimum 300 pkt."
  },
  egzamin: "Sprawdzian uzdolnień artystycznych: dwie prace w różnych technikach, 0–200 pkt. Tematy: odwzorowanie z pamięci (znana przestrzeń miejska, obiekty, detal), rysunek z wyobraźni (place, ulice, wnętrza, krajobraz, formy geometryczne) oraz podstawy geometrii wykreślnej (aksonometria, cienie, odbicia). Opłata rekrutacyjna 150 zł.",
  terminy: "Sprawdź na rekrutacja.polsl.pl. W 2025 sprawdzian był 2 lipca.",
  limit: "sprawdź na rekrutacja.polsl.pl",
  progi: [["2026/27","150 pkt (otouczelnie.pl, do potwierdzenia)"]],
  prog: {v: 150, rok: "2026/27"},
  zrodla: [
    ["Uchwała Senatu PŚl 34/2026 (2027/28)","https://rekrutacja.polsl.pl/wp-content/uploads/2026/06/uchwala_rekrutacyjna_2027-2028.pdf"]
  ]
 },
 {
  id: "plu", name: "Politechnika Lubelska", short: "PL", city: "Lublin", type: "poli", tier: 2, dom: "pollub.pl",
  deg: "I", stopien: "I stopnia, inżynierskie (stacjonarne i niestacjonarne)",
  rok: "2026/27 wg otouczelnie.pl (uchwały nie udało się pobrać)", pewnosc: "serwis",
  wzor: "LPR = 1,0·M + 0,1·Jp + 0,3·Jo + ER",
  calc: {
    matura: [
      {l: "M – matematyka", s: ["mat"], w: 1, pp: .5, pr: 1},
      {l: "Jp – język polski", s: ["pol"], w: .1, pp: .5, pr: 1},
      {l: "Jo – język obcy", s: ["obc"], w: .3, pp: .5, pr: 1}
    ],
    egzamin: {l: "ER – egzamin z uzdolnień artystycznych", max: 500, min: 150, w: 1},
    zalozenia: "Przelicznik PP ×0,5 to założenie."
  },
  egzamin: "Anonimowy egzamin wstępny, 0–500 pkt: rysunek z natury i rysunek z wyobraźni, po 0–250 pkt i 180 minut każdy. Do zaliczenia co najmniej 150 pkt.",
  terminy: "W 2026 egzamin dla cudzoziemców odbył się 1–2 lipca. Pozostałe terminy ogłasza Wydział Budownictwa i Architektury.",
  limit: "sprawdź na pollub.pl",
  progi: [],
  zrodla: [
    ["PL – informacja o egzaminie z rysunku na I stopień","https://bkm.pollub.pl/rekrutacja/studia-po-polsku/inf-o-egzaminie-z-rysunku-na-i-stopien"],
    ["otouczelnie.pl – zasady rekrutacji PL 2026/27","https://www.otouczelnie.pl/uczelnia_dzial/11429/Ogolne-zasady-rekrutacji-na-rok-akademicki-20262027"]
  ]
 },
 {
  id: "psk", name: "Politechnika Świętokrzyska", short: "PŚk", city: "Kielce", type: "poli", tier: 1, dom: "tu.kielce.pl",
  deg: "I", stopien: "I stopnia, inżynierskie",
  rok: "2026 wg serwisów zewnętrznych (strony uczelni nie udało się pobrać)", pewnosc: "serwis",
  wzor: "S = M + n·W + 0,1·JP + 0,1·JO + E",
  calc: {
    matura: [
      {l: "M – matematyka", s: ["mat"], w: 1, pp: .5, pr: 1},
      {l: "W – fizyka, chemia, informatyka albo historia sztuki (n = 1)", s: ["fiz","che","inf","hsz"], w: 1, pp: .5, pr: 1},
      {l: "JP – język polski", s: ["pol"], w: .1, pp: .5, pr: 1},
      {l: "JO – język obcy", s: ["obc"], w: .1, pp: .5, pr: 1}
    ],
    egzamin: {l: "E – egzamin z rysunku", max: 50, min: 0, w: 1},
    zalozenia: "Przelicznik PP ×0,5 i brak minimum z egzaminu to założenia."
  },
  egzamin: "Rysunek odręczny ołówkiem na zadany temat, 0–50 pkt.",
  terminy: "W 2026: egzamin 9.07 o 10:00, wyniki 10.07, listy rankingowe 14.07. Rekrutacja dodatkowa: egzamin 9.09.",
  limit: "sprawdź na rekrutacja.tu.kielce.pl",
  progi: [],
  zrodla: [
    ["PŚk – kierunek Architektura","https://rekrutacja.tu.kielce.pl/architektura/"],
    ["PŚk – harmonogram rekrutacji 2026","https://rekrutacja.tu.kielce.pl/wp-content/uploads/2026/05/Harmonogram_rekrutacji.pdf"]
  ]
 },
 {
  id: "prz", name: "Politechnika Rzeszowska", short: "PRz", city: "Rzeszów", type: "poli", tier: 2, dom: "prz.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie",
  rok: "2026/27 – uchwała Senatu PRz nr 63/2025 (zm. 37/2026) i zarządzenie Rektora 27/2026; zasad na 2027/28 jeszcze nie ma na stronie", pewnosc: "bez-skali",
  wzor: "R = P1·W + P2·W + 5E   (W: 1 dla PP, 2 dla PR)",
  calc: null,
  przedmioty: "P1: matematyka. P2: matematyka, historia, historia sztuki, fizyka albo geografia. Brak przedmiotu daje 0 pkt.",
  egzamin: "Egzamin wstępny z uzdolnień artystycznych w dwóch etapach, każdy 3×60 min, ołówkiem na arkuszu 50×70 cm. Etap 1 to rysunek z natury, etap 2 komponowanie przestrzeni z wyobraźni. Oceniane są: kompozycja, perspektywa, konstrukcja, światłocień, faktura. Trzeba dostać co najmniej 3,0 z każdej pracy. Prace podpisane dostają ocenę niedostateczną. „Wynik końcowy” E liczy się ×5, ale dokumenty nie podają jego skali, więc aplikacja nie liczy punktów.",
  terminy: "W 2026: rejestracja 1–19.06, egzamin 25–26.06, wyniki 2.07, kwalifikacja 16.07.",
  limit: "90 miejsc (2026/27)",
  progi: [],
  zrodla: [
    ["PRz – Architektura, stacjonarne I stopnia","https://rekrutacja.prz.edu.pl/kierunek/BAD/architektura-stacjonarne-i-stopnia"],
    ["PRz – zarządzenie 27/2026 o egzaminie wstępnym","https://rekrutacja.prz.edu.pl/files/2026/zarz_27_2026_z_29_04_2026_w_spr_proced_egz_wstepn_kier_architektura_2026_2027.pdf"],
    ["PRz – zasady rekrutacji 2026/27","https://rekrutacja.prz.edu.pl/files/2026/zal_do_uch_63_2025_zasady_rekrutacji_2026_2027.pdf"]
  ]
 },
 {
  id: "pb", name: "Politechnika Białostocka", short: "PB", city: "Białystok", type: "poli", tier: 2, dom: "pb.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie",
  rok: "rekrutacja 2026/27", pewnosc: "brak-wzoru",
  wzor: "matematyka + język obcy + egzamin z rysunku + przedmiot do wyboru (wagi w załącznikach wydziałowych)",
  calc: null,
  egzamin: "Egzamin z rysunku w dwóch częściach: rysunek z natury i rysunek z wyobraźni. Uczelnia zapewnia deskę i brystol. W 2026 do egzaminu na trzy kierunki artystyczne przystąpiło 355 osób.",
  terminy: "W 2026: zapisy do 3.07, egzamin w czerwcu i lipcu.",
  limit: "w 2026 przyjęto 172 osoby",
  przedmioty: "matematyka, język obcy oraz jeden z: fizyka, historia, historia sztuki, geografia",
  progi: [["2026","240,25 pkt"]],
  zrodla: [
    ["PB – punktowane przedmioty","https://kandydacipb.edu.pl/studia-i-stopnia/punktowane-przedmioty/"],
    ["PB – jak zdać egzamin z rysunku","https://pb.edu.pl/2025/06/03/architektura-jak-zdac-egzamin-z-rysunku/"],
    ["maturalnie.pl – progi PB 2026","https://www.maturalnie.pl/wiadomosci/politechnika-bialostocka-rekrutacja-2026-progi-punktowe/"]
  ]
 },
 {
  id: "po", name: "Politechnika Opolska", short: "PO", city: "Opole", type: "poli", tier: 1, dom: "po.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie",
  rok: "rekrutacja 2026/27", pewnosc: "brak-wzoru",
  wzor: "wskaźnik R (wzór niepodany w znalezionych źródłach)",
  calc: null,
  egzamin: "Egzamin dodatkowy w dwóch częściach: rysunek z natury i rysunek z wyobraźni z elementami geometrii, po 3 godziny lekcyjne. Każda część 0–150 pkt, do zaliczenia co najmniej 100 pkt łącznie. Ołówek, deska 50×70 cm.",
  terminy: "W 2026 egzamin odbył się w połowie lipca.",
  limit: "30 miejsc, w 2026 blisko 150 kandydatów",
  progi: [],
  zrodla: [
    ["PO – Architektura, egzamin dodatkowy","https://rekrutacja.po.edu.pl/architektura-egzamin-dodatkowy-2/"],
    ["PO – częste pytania","https://rekrutacja.po.edu.pl/czeste-pytania-faq/"]
  ]
 },
 {
  id: "zut", name: "Zachodniopomorski Uniwersytet Technologiczny", short: "ZUT", city: "Szczecin", type: "poli", tier: 2, dom: "zut.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie",
  rok: "rekrutacja 2026/27", pewnosc: "brak-wzoru",
  wzor: "egzamin zaliczony/niezaliczony, ranking z wyników matury (wzór w zarządzeniu rekrutacyjnym)",
  calc: null,
  egzamin: "Egzamin sprawdzający umiejętności plastyczne i wyobraźnię przestrzenną, na miejscu (Żołnierska 50). Wynik 1 oznacza zaliczenie, 0 niezaliczenie. Są zadania z rysunku aksonometrycznego, np. przekrój wielościanu. Przybory: ołówki HB–6B, czarna kredka, ekierka, linijka, cyrkiel.",
  terminy: "W 2026: rejestracja do 15.06, egzamin 23.06, wyniki 26.06, drugi termin 2.09.",
  limit: "sprawdź w IRK ZUT",
  progi: [],
  zrodla: [
    ["ZUT – egzamin na architekturę 23 czerwca","https://www.zut.edu.pl/wszystkie-newsy/strony-systemowe/kierunki-stacjonarne-i-stopnia-aktualnosci-lista/kierunki-si-aktualnosci/article/23-czewrca-wtorek-egzamin-na-kierunkach-architektura-oraz-projektowanie-architektury-wnwtrz-i-o.html"],
    ["IRK ZUT – aktualności","https://irk.zut.edu.pl/pl/news/S1/"]
  ]
 },
 {
  id: "pbs", name: "Politechnika Bydgoska im. J. i J. Śniadeckich", short: "PBŚ", city: "Bydgoszcz", type: "poli", tier: 1, dom: "pbs.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie, 4 lata",
  rok: "dane z lat 2024–2025 (serwisy zewnętrzne)", pewnosc: "serwis",
  wzor: "suma punktów z egzaminu praktycznego i z matury (polski, język obcy, matematyka)",
  calc: null,
  egzamin: "Dwuetapowy egzamin praktyczny, 0–300 pkt, do zaliczenia co najmniej 150 pkt. Opłata 150 zł.",
  terminy: "Rejestracja zwykle od początku czerwca do połowy lipca.",
  limit: "sprawdź na pbs.edu.pl",
  progi: [],
  zrodla: [
    ["kresl.pl – architektura Bydgoszcz","https://kresl.pl/studia-architektura-bydgoszcz/"],
    ["otouczelnie.pl – Architektura PBŚ","https://www.otouczelnie.pl/uczelnia_dzial/890/Architektura-Politechnika-Bydgoska-im-Jana-i-Jedrzeja-Sniadeckich"]
  ]
 },
 {
  id: "uz", name: "Uniwersytet Zielonogórski", short: "UZ", city: "Zielona Góra", type: "uni", tier: 1, dom: "uz.zgora.pl",
  deg: "M", stopien: "jednolite magisterskie",
  rok: "rekrutacja 2026/27 (otouczelnie.pl)", pewnosc: "serwis",
  wzor: "konkurs świadectw po zdaniu egzaminów praktycznych",
  calc: null,
  egzamin: "Rysunek z natury i rysunek z wyobraźni. Ich zdanie (minimum 20 pkt) jest warunkiem udziału w konkursie świadectw.",
  terminy: "W 2026 rekrutacja trwała 1.06–11.07 (dane niespójne, sprawdź kalendarz).",
  limit: "90 miejsc bezpłatnych, stacjonarne (2026/27)",
  progi: [],
  zrodla: [
    ["otouczelnie.pl – Architektura UZ","https://www.otouczelnie.pl/uczelnia_dzial/1097/Architektura-Uniwersytet-Zielonogorski"]
  ]
 },
 {
  id: "uap", name: "Uniwersytet Artystyczny w Poznaniu", short: "UAP", city: "Poznań", type: "art", tier: 3, dom: "uap.edu.pl",
  deg: "M", stopien: "jednolite magisterskie",
  rok: "2027/28 (wg kalkulatora rysunekarchitektura.pl, nieoficjalne)", pewnosc: "serwis",
  wzor: "W = P + R + E   (P matura podst. maks. 160, R matura rozsz. maks. 600, E egzamin maks. 800)",
  calc: null,
  egzamin: "Rysunek z natury (0–250), zadanie kierunkowe z makietą lub rysunkiem (0–400) i rozmowa kwalifikacyjna (0–150). Minimum z części praktycznej to 195 z 650 pkt. Maksymalnie 1560 pkt.",
  terminy: "Sprawdź w regulaminie naboru UAP.",
  limit: "sprawdź na uap.edu.pl",
  progi: [],
  zrodla: [
    ["RysunekArchitektura – kalkulator punktów UAP 2027/28","https://www.rysunekarchitektura.pl/kalkulator-punktow-architektura-uap"],
    ["RysunekArchitektura – rekrutacja UAP 2027/28","https://www.rysunekarchitektura.pl/rekrutacja-uap-zasady-kierunki"]
  ]
 },
 // Uczelnie niepubliczne: studia płatne, zwykle bez egzaminu z rysunku, przyjęcie wg kolejności zgłoszeń.
 {id: "vizja", name: "Uniwersytet VIZJA", short: "VIZJA", city: "Warszawa", type: "prv", tier: 2, dom: "vizja.pl", deg: "I",
  stopien: "I stopnia (stacjonarne, niestacjonarne, online)", rok: "2026/27", pewnosc: "serwis",
  wzor: "brak egzaminu z rysunku i portfolio", calc: null, egzamin: "Brak egzaminu z rysunku.", terminy: "rekrutacja ciągła",
  limit: "—", czesne: "ok. 12 000 zł/rok", progi: [],
  zrodla: [["VIZJA – architektura bez egzaminu z rysunku","https://vizja.pl/architektura-bez-egzaminu-z-rysunku-jak-wyglada-rekrutacja-i-jak-przygotowac-sie-do-studiow/"]]},
 {id: "atans", name: "Akademia Techniczno-Artystyczna Nauk Stosowanych", short: "ATA NS", city: "Warszawa", type: "prv", tier: 1, dom: "ata.edu.pl", deg: "I",
  stopien: "I stopnia (stacjonarne i niestacjonarne)", rok: "2026/27", pewnosc: "serwis",
  wzor: "zasady na stronie uczelni", calc: null, egzamin: "sprawdź na stronie uczelni", terminy: "—",
  limit: "—", czesne: "5 450 zł/semestr albo 15 600 zł/rok (źródła się różnią)", progi: [],
  zrodla: [["uczelnie.pl – kierunek architektura","https://www.uczelnie.pl/kierunek/architektura/"]]},
 {id: "vistula", name: "Akademia Finansów i Biznesu Vistula", short: "Vistula", city: "Warszawa", type: "prv", tier: 1, dom: "vistula.edu.pl", deg: "I",
  stopien: "I stopnia", rok: "2026/27", pewnosc: "serwis",
  wzor: "zasady na stronie uczelni", calc: null, egzamin: "sprawdź na stronie uczelni", terminy: "—",
  limit: "—", czesne: "2 900 zł/semestr albo 12 800 zł/rok (źródła się różnią)", progi: [],
  zrodla: [["uczelnie.pl – architektura Warszawa","https://www.uczelnie.pl/miasto/warszawa/kierunek/architektura/"]]},
 {id: "afm", name: "Uniwersytet Andrzeja Frycza Modrzewskiego", short: "AFM", city: "Kraków", type: "prv", tier: 2, dom: "uafm.edu.pl", deg: "I",
  stopien: "I stopnia", rok: "2026/27", pewnosc: "serwis",
  wzor: "zasady na stronie uczelni", calc: null, egzamin: "sprawdź na stronie uczelni", terminy: "—",
  limit: "—", czesne: "6 500 zł/semestr albo 12 000 zł/rok (źródła się różnią)", progi: [],
  zrodla: [["uczelnie.pl – kierunek architektura","https://www.uczelnie.pl/kierunek/architektura/"]]},
 {id: "sans", name: "Sopocka Akademia Nauk Stosowanych", short: "SANS", city: "Sopot", type: "prv", tier: 1, dom: "ssw-sopot.pl", deg: "I",
  stopien: "I stopnia", rok: "2026/27", pewnosc: "serwis",
  wzor: "zasady na stronie uczelni", calc: null, egzamin: "sprawdź na stronie uczelni", terminy: "—",
  limit: "—", czesne: "ok. 12 000 zł/rok", progi: [],
  zrodla: [["uczelnie.pl – architektura Gdańsk","https://www.uczelnie.pl/miasto/gdansk/kierunek/architektura/"]]},
 {id: "wspia", name: "Wyższa Szkoła Prawa i Administracji Rzeszów–Lublin (WSPiA)", short: "WSPiA", city: "Lublin", type: "prv", tier: 1, dom: "wspia.eu", deg: "I",
  stopien: "I stopnia, niestacjonarne", rok: "2026/27", pewnosc: "serwis",
  wzor: "zasady na stronie uczelni", calc: null, egzamin: "sprawdź na stronie uczelni", terminy: "—",
  limit: "—", czesne: "ok. 6 676 zł/rok (zaoczne)", progi: [],
  zrodla: [["architektbudowlany.pl – ceny studiów zaocznych","https://architektbudowlany.pl/architektura-studia-zaoczne-cena"]]}
];
const ARCH_PEWNOSC = {
  "oficjalne": ["ok", "wzór z uczelni"],
  "czesciowe": ["warn", "wzór z uczelni, część założeń"],
  "bez-skali": ["warn", "wzór z uczelni, bez skali egzaminu"],
  "brak-wzoru": ["info", "bez pełnego wzoru"],
  "serwis": ["info", "dane z serwisów"]
};
if (typeof module !== "undefined") module.exports = { ARCH, ARCH_PEWNOSC };
