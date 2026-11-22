// Baza kierunku ARCHITEKTURA (studia I stopnia / jednolite magisterskie), stan: listopad 2026.
// Zebrane z uchwał rekrutacyjnych i stron uczelni (rekrutacja 2027/28 tam, gdzie była już dostępna),
// a gdy ich brakowało, z serwisów zewnętrznych. Każdy wpis ma źródła i poziom pewności.
//
// pewnosc: "oficjalne" – wzór z uchwały/strony uczelni; "czesciowe" – wzór znany, ale część
//          przeliczników jest założeniem; "brak-wzoru" – znamy egzamin i przedmioty, wzoru nie;
//          "serwis" – dane tylko z serwisów zewnętrznych.
// calc: składniki wzoru do przeliczenia punktów.
//   matura: {l: etykieta, s: przedmioty (liczy się najlepszy), w: waga, pp/pr: mnożnik wyniku %,
//            n: ile najlepszych przedmiotów z listy (domyślnie 1)}
//   egzamin: {l, max, min, w}  – wynik egzaminu rysunkowego w punktach uczelni.
//   zalozenia: co przyjęliśmy, bo źródło tego nie podaje.
const ARCH = [
 {
  id: "pw", name: "Politechnika Warszawska", short: "PW", city: "Warszawa", type: "poli", tier: 5, dom: "pw.edu.pl",
  deg: "M", stopien: "jednolite magisterskie (po polsku); Architecture I stopnia po angielsku",
  rok: "2027/28 (uchwała Senatu PW nr 294/LI/2026); wzór z 2026/27 (uchwała 170/LI/2025)", pewnosc: "czesciowe",
  wzor: "PK = Psp + 0,75·Pmat + 0,25·Pjo + 0,5·Pwyb1 + 0,5·Pwyb2",
  calc: {
    matura: [
      {l: "Matematyka", s: ["mat"], w: .75, pp: .5, pr: 1},
      {l: "Język obcy", s: ["obc"], w: .25, pp: .5, pr: 1},
      {l: "Dwa przedmioty do wyboru", s: ["fiz","inf","hsz","geo","his","che","bio","wos","pol","fil"], w: .5, pp: .5, pr: 1, n: 2}
    ],
    egzamin: {l: "Sprawdzian uzdolnień i predyspozycji", max: 200, min: 60, w: 1},
    zalozenia: "Lista przedmiotów do wyboru jest założeniem. Sprawdź ją w uchwale."
  },
  egzamin: "Sprawdzian uzdolnień i predyspozycji, w 2026/27 dwa zadania oceniane po 0–100 pkt. Trzeba zdobyć co najmniej 30% punktów ze sprawdzianu. Część źródeł o uchwale na 2027/28 wspomina sprawdzian zdalny w skali 60 pkt, po którym 75 najlepszych przechodzi dalej. Ten szczegół trzeba potwierdzić.",
  terminy: "Rejestracja 26.04–25.05.2027, decyzje na początku lipca 2027.",
  limit: "100 miejsc (2025/26)",
  progi: [["2025","176 pkt w skali 0–225 (maturalnie.pl)"],["2026/27","„co najmniej 200 pkt” wg otouczelnie.pl, dane niespójne"]],
  zrodla: [
    ["Uchwała Senatu PW 294/LI/2026, zał. 2 (2027/28)","https://www.bip.pw.edu.pl/var/pw/storage/original/application/cb795d397e309dd949d450a52a690266.pdf"],
    ["Uchwała Senatu PW 170/LI/2025, zał. 2 (2026/27)","https://www.bip.pw.edu.pl/var/pw/storage/original/application/cbdbee40be4f644ec09bf02c3c26ef11.pdf"],
    ["Wydział Architektury PW – kandydaci","https://www.arch.pw.edu.pl/Kandydaci"]
  ]
 },
 {
  id: "pwr", name: "Politechnika Wrocławska", short: "PWr", city: "Wrocław", type: "poli", tier: 4, dom: "pwr.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie",
  rok: "2027/28 (uchwała Senatu PWr nr 384/26/2024-2028)", pewnosc: "czesciowe",
  wzor: "W = M + PD + 0,1·JO + 0,1·JP + RA",
  calc: {
    matura: [
      {l: "M – matematyka", s: ["mat"], w: 1, pp: .5, pr: 1},
      {l: "PD – przedmiot dodatkowy", s: ["fiz","inf","hsz","geo","che"], w: 1, pp: .5, pr: 1},
      {l: "JO – język obcy", s: ["obc"], w: .1, pp: .5, pr: 1},
      {l: "JP – język polski", s: ["pol"], w: .1, pp: .5, pr: 1}
    ],
    egzamin: {l: "RA – egzamin z rysunku", max: 660, min: 240, w: 1},
    zalozenia: "Przeliczenie M i PD (PR ×1, PP ×0,5) oraz lista przedmiotów dodatkowych to założenia. Dokładne tabele są w załączniku nr 1."
  },
  egzamin: "Obowiązkowy egzamin z rysunku: dwa zadania ołówkiem, łącznie 0–660 pkt. Do zaliczenia trzeba co najmniej 240 pkt. Niezdany egzamin oznacza niezakwalifikowanie.",
  terminy: "W 2026: zapisy do 20 czerwca, egzamin 30 czerwca i 1 lipca. Terminy na 2027 ogłasza terminarz rekrutacji.",
  limit: "180 miejsc (wg otouczelnie.pl, prawdopodobnie 2026/27)",
  progi: [],
  zrodla: [
    ["Warunki rekrutacji PWr 2027/28 – zał. 1","https://bip.pwr.edu.pl/d/uGBUKOTtQKxVvBFh6GDxYBxZIQnl9XkFABWdbExYbWGFBRAg9RgNtcXccVjU3ClVBDkNKeH5cWFEU/wir_2027_zal_1_dokument_glowny.pdf"],
    ["Warunki rekrutacji PWr 2027/28 – zał. 2","https://bip.pwr.edu.pl/d/LGBUKOTtQKxVvBFh6GDxYBxZIQnl9XkFABWdbExYbWGFBRAg9RgNtcXccVjU3ClVBDkNKeH5cWFQU/wir_2027_zal_2_inne_matury.pdf"]
  ]
 },
 {
  id: "pk", name: "Politechnika Krakowska", short: "PK", city: "Kraków", type: "poli", tier: 3, dom: "pk.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie (stacjonarne i niestacjonarne)",
  rok: "strona PK „Wskaźniki rekrutacyjne 2027/28”", pewnosc: "czesciowe",
  wzor: "W = 2·(M + R + E)   (inne źródła: W = M + 2R + 2E)",
  calc: {
    matura: [
      {l: "M – matematyka", s: ["mat"], w: 2, pp: .5, pr: 1},
      {l: "R – przedmiot charakterystyczny", s: ["fiz","inf","hsz","geo","che"], w: 2, pp: .5, pr: 1}
    ],
    egzamin: {l: "E – egzamin z rysunku", max: 100, min: 10, w: 2},
    zalozenia: "Źródła podają dwie wersje wzoru, przyjęto wersję ze strony PK. Przelicznik PP ×0,5 i lista przedmiotów R to założenia."
  },
  egzamin: "Egzamin z rysunku oceniany 0–100 pkt. Warunkiem przyjęcia jest co najmniej 10 pkt. W ostatnich latach była to jedna praca, rysunek z wyobraźni, w jednym dniu.",
  terminy: "Sprawdź na rekrutacja.pk.edu.pl.",
  limit: "240 stacjonarne + 30 niestacjonarne (2026/27, wg totu.net.pl, niepotwierdzone)",
  progi: [["2025/26","282 pkt stacjonarne, 173 pkt niestacjonarne"]],
  prog: {v: 282, rok: "2025/26"},
  zrodla: [
    ["PK – wskaźniki rekrutacyjne na studia I stopnia 2027/28","https://rekrutacja.pk.edu.pl/rekrutacja/i-stopien/wskazniki-rekrutacyjne-na-studia-i-stopnia-w-roku-akademickim-2026-27/"],
    ["Domin Kraków – jak dostać się na architekturę PK","https://domin-krakow.pl/jak-dostac-sie-architekture-pk/"]
  ]
 },
 {
  id: "pg", name: "Politechnika Gdańska", short: "PG", city: "Gdańsk", type: "poli", tier: 4, dom: "pg.edu.pl",
  deg: "I", stopien: "I stopnia, inżynierskie (po polsku i po angielsku)",
  rok: "zasady PG (wzór potwierdzony na stronie rekrutacji)", pewnosc: "oficjalne",
  wzor: "WA = S + W,  W = mat·p + dod·p + 0,1·pol·p + 0,1·obc·p",
  calc: {
    matura: [
      {l: "Matematyka", s: ["mat"], w: 1, pp: .4, pr: 1},
      {l: "Przedmiot dodatkowy: historia sztuki albo informatyka", s: ["hsz","inf"], w: 1, pp: .4, pr: 1},
      {l: "Język polski", s: ["pol"], w: .1, pp: .4, pr: 1},
      {l: "Język obcy", s: ["obc"], w: .1, pp: .4, pr: 1}
    ],
    egzamin: {l: "S – sprawdzian predyspozycji", max: 100, min: 35, w: 1},
    zalozenia: "Minimum ze sprawdzianu ustala co roku komisja: 40 pkt w 2023, 35 pkt w 2025 (30 pkt na studiach po angielsku). Matura dwujęzyczna z języka obcego: p = 1,3."
  },
  egzamin: "Sprawdzian predyspozycji do zawodu architekta, 0–100 pkt. Dwie części na arkuszach A3, ołówkiem. Pierwsza część (ok. 2,5 h) to cztery polecenia z projektowania i geometrii przestrzennej, np. obrót sześcianu z prętem o 180°. Wydział publikuje przykładowe testy z lat 2024 i 2025.",
  terminy: "W 2026 rejestracja trwała 26.05–12.07.",
  limit: "sprawdź na pg.edu.pl",
  progi: [["2025","matura (W) ok. 157 pkt, sprawdzian min. 35 pkt (edukreska.pl)"],["2025","148,1 pkt (maturalnie.pl)"]],
  zrodla: [
    ["PG – wzór na liczenie punktów rekrutacyjnych","https://pg.edu.pl/rekrutacja/rekrutacja-obywatele-polscy/studia-i-stopnia/jak-liczyc-punkty-rekrutacyjne/wzor-na-liczenie-punktow-rekrutacyjnych"],
    ["Wydział Architektury PG – nabór na I stopień","https://arch.pg.edu.pl/rekrutacja/jak-aplikowac/nabor-na-studia-i-stopnia"],
    ["PG – kierunek Architektura","https://pg.edu.pl/rekrutacja/rekrutacja-obywatele-polscy/studia-i-stopnia/wykaz-kierunkow/architektura"]
  ]
 },
 {
  id: "pp", name: "Politechnika Poznańska", short: "PP", city: "Poznań", type: "poli", tier: 4, dom: "put.poznan.pl",
  deg: "I", stopien: "I stopnia, inżynierskie (po polsku i po angielsku)",
  rok: "2027/28 (strona PP „Wzory rankingowe – rok akademicki 2027/2028”), nowy wzór", pewnosc: "czesciowe",
  wzor: "W = 0,5·Jp + 0,5·Jo + 2,5·M + R",
  calc: {
    matura: [
      {l: "Jp – język polski", s: ["pol"], w: .5, pp: .5, pr: 1},
      {l: "Jo – język obcy", s: ["obc"], w: .5, pp: .5, pr: 1},
      {l: "M – matematyka", s: ["mat"], w: 2.5, pp: .5, pr: 1}
    ],
    egzamin: {l: "R – sprawdzenie uzdolnień artystycznych", max: 400, min: 200, w: 1},
    zalozenia: "Przelicznik PP ×0,5 to założenie, sprawdź zasady PP. Progi z lat ubiegłych liczono starym wzorem: W = Jp + Jo + 1,5M + R, R 0–500."
  },
  egzamin: "Egzamin wstępny z rysunku (przeniesienie przestrzeni na płaszczyznę rysunku), 0–400 pkt, minimum 200 pkt. Do systemu wgrywa się też portfolio, a uczelnia może poprosić o oryginały prac.",
  terminy: "W 2026: rejestracja do 21.06, egzamin 24.06.",
  limit: "sprawdź na put.poznan.pl",
  progi: [["2025/26","591 pkt (stary wzór)"],["2024/25","658 pkt (stary wzór)"],["2022/23","594,5 pkt"]],
  zrodla: [
    ["PP – wzory rankingowe 2027/28","https://put.poznan.pl/rekrutacja/pierwszy-stopien/wzory-rankingowe"],
    ["RysunekArchitektura – progi punktowe PP 2021–2025","https://www.rysunekarchitektura.pl/progi-punktowe-architektura"]
  ]
 },
 {
  id: "pl", name: "Politechnika Łódzka", short: "PŁ", city: "Łódź", type: "poli", tier: 3, dom: "p.lodz.pl",
  deg: "I", stopien: "I stopnia, inżynierskie (po polsku i po angielsku)",
  rok: "zasady 2025/26–2026/27 (uchwała Senatu PŁ 69/2025); rekrutacja 2027/28 startuje 31.03.2027", pewnosc: "czesciowe",
  wzor: "LP = 6k·M + 2k·JO + 4k·D + U",
  calc: {
    matura: [
      {l: "M – matematyka", s: ["mat"], w: 6, pp: .5, pr: 1},
      {l: "JO – język obcy", s: ["obc"], w: 2, pp: .5, pr: 1},
      {l: "D – przedmiot dodatkowy", s: ["fiz","inf","hsz","geo","che","his"], w: 4, pp: .5, pr: 1}
    ],
    egzamin: {l: "U – sprawdzian uzdolnień plastycznych", max: 500, min: 250, w: 1},
    zalozenia: "Wartości k (PR ×1, PP ×0,5) i lista przedmiotów D to założenia. Nieobecność na sprawdzianie wyklucza z rekrutacji."
  },
  egzamin: "Sprawdzian uzdolnień plastycznych, 0–500 pkt, do zaliczenia co najmniej 250. Dwa odręczne rysunki ołówkiem z wyobraźni na zadane tematy, łącznie 5 godzin.",
  terminy: "W 2026: sprawdzian 25.06, wyniki 1.07, drugi termin 8.09.",
  limit: "90 miejsc bezpłatnych, stacjonarne (2026/27)",
  progi: [["2026/27","760 pkt"],["2025/26","761 pkt"]],
  prog: {v: 760, rok: "2026/27"},
  zrodla: [
    ["PŁ – kierunek Architektura","https://rekrutacja.p.lodz.pl/kierunek/i-stopien-architektura"],
    ["Uchwała Senatu PŁ 69/2025","https://rekrutacja.p.lodz.pl/sites/default/files/2025-07/us_69_2025_18_06_2025.pdf"],
    ["PŁ – sprawdziany","https://rekrutacja.p.lodz.pl/studia-i-i-ii-stopnia/rekrutuj/sprawdziany-i-rozmowy"]
  ]
 },
 {
  id: "psl", name: "Politechnika Śląska", short: "PŚl", city: "Gliwice", type: "poli", tier: 3, dom: "polsl.pl",
  deg: "I", stopien: "I stopnia, inżynierskie",
  rok: "uchwała rekrutacyjna 2025/26", pewnosc: "oficjalne",
  wzor: "P = Pspr + k·Wm",
  calc: {
    matura: [
      {l: "Wm – historia sztuki albo matematyka", s: ["hsz","mat"], w: 1, pp: .5, pr: 1}
    ],
    egzamin: {l: "Pspr – sprawdzian uzdolnień artystycznych", max: 200, min: 0, w: 1},
    zalozenia: "Minimum ze sprawdzianu nie jest podane w znalezionych źródłach. Uczelnia nie ustala progów z góry."
  },
  egzamin: "Sprawdzian uzdolnień artystycznych na miejscu, 0–200 pkt, dwa zadania rysunkowe jednego dnia (w 2025: 2 lipca). Opłata rekrutacyjna 150 zł.",
  terminy: "Sprawdź na rekrutacja.polsl.pl.",
  limit: "sprawdź na rekrutacja.polsl.pl",
  progi: [["2026/27","150 pkt (otouczelnie.pl, do potwierdzenia)"]],
  prog: {v: 150, rok: "2026/27"},
  zrodla: [
    ["Uchwała rekrutacyjna PŚl 2025/26","https://rekrutacja.polsl.pl/wp-content/uploads/2024/07/uchwala_rekrutacyjna_2025-2026.pdf"]
  ]
 },
 {
  id: "plu", name: "Politechnika Lubelska", short: "PL", city: "Lublin", type: "poli", tier: 2, dom: "pollub.pl",
  deg: "I", stopien: "I stopnia, inżynierskie (stacjonarne i niestacjonarne)",
  rok: "zasady rekrutacji 2026/27", pewnosc: "czesciowe",
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
  rok: "zarządzenie Rektora PŚk 33/26 (harmonogram 2026)", pewnosc: "czesciowe",
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
  rok: "zasady rekrutacji 2026/27 (uchwała Senatu PRz 63/2025)", pewnosc: "brak-wzoru",
  wzor: "egzamin z uzdolnień artystycznych ×5 + matematyka (PP ×1, PR ×2) + przedmiot do wyboru",
  calc: null,
  egzamin: "Egzamin wstępny z uzdolnień artystycznych w dwóch etapach (dwa dni), dwie prace rysunkowe na arkuszach 50×70 cm. Z każdego etapu trzeba dostać co najmniej ocenę 3,0. Opłata 150 zł.",
  terminy: "W 2026: rejestracja 1–19.06, egzamin 25–26.06, wyniki 2.07.",
  limit: "podany na stronie kierunku w systemie rekrutacji",
  przedmioty: "matematyka oraz jeden z: fizyka, geografia, historia, historia sztuki",
  progi: [],
  zrodla: [
    ["PRz – Architektura, stacjonarne I stopnia","https://rekrutacja.prz.edu.pl/kierunek/BAD/architektura-stacjonarne-i-stopnia"],
    ["PRz – zasady rekrutacji 2026/27","https://rekrutacja.prz.edu.pl/files/2026/zal_do_uch_63_2025_zasady_rekrutacji_2026_2027.pdf"],
    ["PRz – egzamin wstępny","https://rekrutacja.prz.edu.pl/rekrutacja/egzamin-wstepny"]
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
  "brak-wzoru": ["info", "bez pełnego wzoru"],
  "serwis": ["info", "dane z serwisów"]
};
if (typeof module !== "undefined") module.exports = { ARCH, ARCH_PEWNOSC };
