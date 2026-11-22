// Baza kierunku ARCHITEKTURA WNĘTRZ, stan: listopad 2026. Ten sam układ pól co architektura.js.
// Wzory PP i PŚl sprawdzone w dokumentach uczelni na 2027/28. Pozostałe dane zebrane z wyszukiwarki
// (strony uczelni i serwisy o studiach), zwykle dla rekrutacji 2026/27 – do sprawdzenia u źródła.
const AW = [
 {
  id: "pp", name: "Politechnika Poznańska", short: "PP", city: "Poznań", type: "poli", tier: 4, dom: "put.poznan.pl",
  deg: "I", stopien: "I stopnia (Wydział Architektury)",
  rok: "2027/28 – PP „Wzory rankingowe – rok akademicki 2027/2028”", pewnosc: "oficjalne",
  wzor: "W = 0,5·Jp + 0,5·Jo + 2,5·M + R,  M = M podst. + M rozsz.",
  calc: {
    matura: [
      {l: "Jp – język polski (poziom podstawowy)", s: ["pol"], w: .5, k: [[1,0]]},
      {l: "Jo – język obcy (poziom podstawowy)", s: ["obc"], w: .5, k: [[1,0]]},
      {l: "M – matematyka: suma wyników PP i PR", s: ["mat"], w: 2.5, k: [[1,1]], max: 200}
    ],
    egzamin: {l: "R – sprawdzenie uzdolnień artystycznych", max: 400, min: 0, w: 1},
    zalozenia: "Ten sam wzór co na architekturze. Maksimum 1000 pkt. Minimum z egzaminu nie jest podane na stronie z wzorami."
  },
  egzamin: "Sprawdzenie uzdolnień artystycznych, 0–400 pkt. Matematyka waży tu najwięcej spośród przedmiotów maturalnych.",
  terminy: "Terminy ogłasza PP w harmonogramie rekrutacji (w 2026 egzamin dla kierunków architektonicznych był pod koniec czerwca).",
  limit: "30 miejsc (otouczelnie.pl)",
  progi: [],
  zrodla: [["PP – wzory rankingowe 2027/28","https://put.poznan.pl/rekrutacja/pierwszy-stopien/wzory-rankingowe"]]
 },
 {
  id: "psl", name: "Politechnika Śląska", short: "PŚl", city: "Gliwice", type: "poli", tier: 3, dom: "polsl.pl",
  deg: "I", stopien: "I stopnia",
  rok: "2027/28 – uchwała Senatu PŚl nr 34/2026, § 8 ust. 1 pkt 1 i zał. 2", pewnosc: "oficjalne",
  wzor: "P = Pspr + k·Wm   (Wm: historia sztuki, informatyka albo matematyka; k: 0,5 PP, 1 PR)",
  calc: {
    matura: [{l: "Wm – historia sztuki, informatyka albo matematyka", s: ["hsz","inf","mat"], w: 1, pp: .5, pr: 1}],
    egzamin: {l: "Pspr – sprawdzian uzdolnień artystycznych", max: 200, min: 0, w: 1},
    zalozenia: "Minimum ze sprawdzianu może ustalić Centralna Komisja Rekrutacyjna. Maksimum 300 pkt."
  },
  egzamin: "Sprawdzian uzdolnień artystycznych, 0–200 pkt: zadanie kierunkowe graficzno-przestrzenne i zadanie artystyczne. Bada tworzenie form przestrzennych, przekazywanie treści za pomocą form wizualnych, operowanie skalą i proporcjami oraz interpretację form, faktur i kolorów. Zadania mogą dotyczyć kompozycji przestrzennej, koloru, faktury i materiałów oraz modelu przestrzennego. Opłata 150 zł.",
  terminy: "Sprawdź na rekrutacja.polsl.pl.",
  limit: "40 miejsc (otouczelnie.pl)",
  progi: [],
  zrodla: [["Uchwała Senatu PŚl 34/2026 (2027/28)","https://rekrutacja.polsl.pl/wp-content/uploads/2026/06/uchwala_rekrutacyjna_2027-2028.pdf"]]
 },
 {
  id: "pb", name: "Politechnika Białostocka", short: "PB", city: "Białystok", type: "poli", tier: 2, dom: "pb.edu.pl",
  deg: "I", stopien: "I stopnia (Wydział Architektury)",
  rok: "rekrutacja 2026/27", pewnosc: "wyszukiwarka",
  wzor: "egzamin z rysunku + matematyka + język obcy + przedmiot do wyboru (wagi w załącznikach wydziałowych)",
  calc: null,
  egzamin: "Egzamin z rysunku: dwa zadania po 150 minut, każde 0–100 pkt (opis z lat poprzednich). Uczelnia zapewnia deskę i brystol. Do rekrutacji uzupełniającej mogą przystąpić tylko osoby, które zdały lipcowy egzamin.",
  terminy: "W 2026 egzamin na architekturę wnętrz był 8 lipca, a rekrutacja uzupełniająca od 17 sierpnia.",
  limit: "36 miejsc (otouczelnie.pl); w 2026 przyjęto 95 osób na I stopień",
  progi: [["2026/27","155,25 pkt (zestawienie uczelni)"]],
  zrodla: [
    ["PB – hity rekrutacji 2026/2027","https://pb.edu.pl/2026/07/17/politechnika-bialostocka-oglosila-listy-kandydatow-zakwalifikowanych-na-studia-hity-rekrutacji-2026-2027/"],
    ["maturalnie.pl – progi PB 2026","https://www.maturalnie.pl/wiadomosci/politechnika-bialostocka-rekrutacja-2026-progi-punktowe/"]
  ]
 },
 {
  id: "aspwaw", name: "Akademia Sztuk Pięknych w Warszawie", short: "ASP Warszawa", city: "Warszawa", type: "art", tier: 5, dom: "asp.waw.pl",
  deg: "M", stopien: "jednolite magisterskie, stacjonarne",
  rok: "rekrutacja 2026/27 (strona rekrutacji ASP)", pewnosc: "wyszukiwarka",
  wzor: "ranking = egzamin praktyczny + autoprezentacja (matura nie wchodzi do punktów)",
  calc: null,
  egzamin: "Trzy etapy. Etap 1: teczka prac rysunkowych i malarskich oraz portfolio cyfrowe, ocena 0–10 pkt, do etapu 2 przechodzi się od 6 pkt (te punkty nie wchodzą do sumy). Etap 2: egzamin praktyczny przez 3 dni, w tym zadanie kompozycyjne trwające 2–4 godziny; do autoprezentacji przechodzi się od 61 pkt. Etap 3: autoprezentacja 0–30 pkt (zainteresowania, także literatura, muzyka, teatr, film).",
  terminy: "W 2026: teczki 15–16.06, egzamin praktyczny 29.06–1.07, autoprezentacja 10.07, wyniki 16.07.",
  limit: "36 miejsc (2026/27)",
  progi: [],
  zrodla: [["ASP Warszawa – Architektura Wnętrz, jednolite magisterskie 2026/27","https://rekrutacja.asp.waw.pl/architektura-wnetrz-stacjonarne-jednolite-studia-magisterskie/"]]
 },
 {
  id: "aspkrk", name: "Akademia Sztuk Pięknych im. Jana Matejki w Krakowie", short: "ASP Kraków", city: "Kraków", type: "art", tier: 5, dom: "asp.krakow.pl",
  deg: "M", stopien: "jednolite magisterskie, stacjonarne",
  rok: "rekrutacja 2026/27 (strony ASP Kraków)", pewnosc: "wyszukiwarka",
  wzor: "egzamin wstępny: przegląd prac + egzamin praktyczny + rozmowa kwalifikacyjna",
  calc: null,
  egzamin: "Obowiązkowy egzamin wstępny z trzech części: przegląd prac (teczka), egzamin praktyczny (dwa dni) i rozmowa kwalifikacyjna. Na kierunek zgłasza się ok. 3,3 osoby na miejsce (2024/25, otouczelnie.pl).",
  terminy: "W 2026: rejestracja 18.05–9.06, przegląd prac 19.06, egzamin praktyczny 25–26.06, rozmowa 6–7.07, wyniki 10.07. Rekrutacja dodatkowa: rejestracja 28.08–11.09, egzaminy 22–23.09.",
  limit: "24 miejsca (2026/27)",
  progi: [],
  zrodla: [
    ["ASP Kraków – architektura wnętrz, egzaminy wstępne","https://www.asp.krakow.pl/architektura-wnetrz-stacjonarna-egzaminy-wstepne/"],
    ["Wydział Architektury Wnętrz ASP Kraków – rekrutacja","https://waw.asp.krakow.pl/REKRUTACJA"]
  ]
 },
 {
  id: "aspgda", name: "Akademia Sztuk Pięknych w Gdańsku", short: "ASP Gdańsk", city: "Gdańsk", type: "art", tier: 4, dom: "asp.gda.pl",
  deg: "L", stopien: "I stopnia, stacjonarne (są też niestacjonarne)",
  rok: "rekrutacja 2026/27 (strona Wydziału Architektury ASP)", pewnosc: "wyszukiwarka",
  wzor: "egzamin dwuetapowy: egzamin praktyczny i przegląd prac + rozmowa kwalifikacyjna",
  calc: null,
  egzamin: "Etap 1: egzamin praktyczny i przegląd autorskich prac (przesyła się dokumentację prac, tematy zadań publikowane są w dniu egzaminu). Etap 2: rozmowa kwalifikacyjna. Wszystkie elementy są punktowane, a z każdego etapu trzeba osiągnąć wymagane minimum. Wydział publikuje zadania egzaminacyjne z lat poprzednich. Ok. 5 osób na miejsce (otouczelnie.pl).",
  terminy: "W 2026: etap 1 22–23.06, etap 2 29–30.06, wyniki 3.07.",
  limit: "sprawdź na asp.gda.pl",
  progi: [],
  zrodla: [
    ["ASP Gdańsk – architektura wnętrz I stopnia, harmonogram i wymagania","https://asp.gda.pl/rekrutacja/wydzial-architektury/kierunki/architektura-wnetrz-i-stopnia/harmonogram-i-wymagania,1043"],
    ["ASP Gdańsk – zadania egzaminacyjne","https://asp.gda.pl/rekrutacja/zadania-egzaminacyjne,1036"]
  ]
 },
 {
  id: "aspwro", name: "Akademia Sztuk Pięknych im. Eugeniusza Gepperta we Wrocławiu", short: "ASP Wrocław", city: "Wrocław", type: "art", tier: 4, dom: "asp.wroc.pl",
  deg: "M", stopien: "stacjonarne (wg serwisów jednolite magisterskie); niestacjonarne I stopnia 3 lata",
  rok: "rekrutacja 2026 (strony ASP Wrocław)", pewnosc: "wyszukiwarka",
  wzor: "egzamin wstępny (zasady w zarządzeniu Rektora o rekrutacji)",
  calc: null,
  egzamin: "Na studiach niestacjonarnych I stopnia ocenia się portfolio w skali 0–10 pkt, minimum 5 pkt. Zasady egzaminu na studia stacjonarne podaje zarządzenie Rektora i harmonogram egzaminów Wydziału Architektury Wnętrz, Wzornictwa i Scenografii.",
  terminy: "Harmonogram 2026 jest na stronie „Rekrutacja 2026”. Studia niestacjonarne I stopnia: rekrutacja do 6.07 (przedłużana).",
  limit: "sprawdź na asp.wroc.pl",
  progi: [],
  zrodla: [
    ["ASP Wrocław – Rekrutacja 2026","https://www.asp.wroc.pl/pl/rekrutacja-2026"],
    ["ASP Wrocław – harmonogram egzaminów wydziału","https://www.asp.wroc.pl/sites/default/files/documents/wydz-architektury-wnetrz-wzornictwa-i-scenografii-harmonogram-egzaminow.pdf"]
  ]
 },
 {
  id: "asplodz", name: "Akademia Sztuk Pięknych im. Władysława Strzemińskiego w Łodzi", short: "ASP Łódź", city: "Łódź", type: "art", tier: 3, dom: "asp.lodz.pl",
  deg: "L", stopien: "I stopnia, stacjonarne",
  rok: "rekrutacja 2026/27 (harmonogram ASP Łódź)", pewnosc: "wyszukiwarka",
  wzor: "egzamin wstępny (o przyjęciu decyduje jego wynik)",
  calc: null,
  egzamin: "Egzamin wstępny na miejscu (ul. Wojska Polskiego 121), sprawdza wrażliwość i predyspozycje plastyczne. W 2025/26 egzamin był dwuetapowy, z egzaminem praktycznym za 50 pkt. Na studia II stopnia minimum to 40 pkt.",
  terminy: "W 2026: rekrutacja 9.06–10.07, egzamin 22–24.06, wyniki w systemie 7.07.",
  limit: "sprawdź na asp.lodz.pl",
  progi: [],
  zrodla: [
    ["ASP Łódź – harmonogram rekrutacji, architektura wnętrz I stopnia","https://www.asp.lodz.pl/images/rekrutacja/harmonogram-rekrutacji/harmonogram-architektura-wnetrz-s1_18e97.pdf"],
    ["ASP Łódź – kierunek architektura wnętrz","https://www.asp.lodz.pl/index.php/en/egzamin-wstepny/1283-architektura-wnetrz"]
  ]
 },
 {
  id: "uap", name: "Uniwersytet Artystyczny im. Magdaleny Abakanowicz w Poznaniu", short: "UAP", city: "Poznań", type: "art", tier: 4, dom: "uap.edu.pl",
  deg: "L", stopien: "I stopnia (stacjonarne i niestacjonarne)",
  rok: "rekrutacja 2026 (strony rekrutacji UAP)", pewnosc: "wyszukiwarka",
  wzor: "sprawdzian kierunkowy (na niestacjonarnych: portfolio 0–40 + list motywacyjny 0–20)",
  calc: null,
  egzamin: "Na studiach niestacjonarnych I stopnia sprawdzian daje 0–60 pkt: portfolio do 40 pkt i list motywacyjny do 20 pkt, pozytywny wynik od 30 pkt. Zasady studiów stacjonarnych są w załączniku do uchwały Senatu UAP.",
  terminy: "Sprawdź na rekrutacja.uap.edu.pl.",
  limit: "sprawdź na uap.edu.pl",
  progi: [["2025/26","38 pkt na I stopniu (otouczelnie.pl)"]],
  zrodla: [
    ["UAP – architektura wnętrz NST1 (2026)","https://rekrutacja.uap.edu.pl/2026/architektura-wnetrz-nst/architektura-wnetrz-nst1/"],
    ["otouczelnie.pl – progi UAP","https://www.otouczelnie.pl/uczelnia_dzial/4311/Uniwersytet-Artystyczny-im-Magdaleny-Abakanowicz-w-Poznaniu-rekrutacja-na-studia-20252026/progi"]
  ]
 },
 {
  id: "asz", name: "Akademia Sztuki w Szczecinie", short: "Akademia Sztuki", city: "Szczecin", type: "art", tier: 2, dom: "akademiasztuki.eu",
  deg: "L", stopien: "I stopnia, licencjackie, 3 lata",
  rok: "rekrutacja 2026/27 (serwisy o studiach)", pewnosc: "wyszukiwarka",
  wzor: "wynik dwuetapowego egzaminu wstępnego",
  calc: null,
  egzamin: "Dwuetapowy egzamin wstępny (Wydział Architektury Wnętrz i Scenografii). W starszych zasadach wymagane było też zaświadczenie lekarskie od lekarza medycyny pracy.",
  terminy: "W 2026 rekrutacja główna online trwała 8.05–5.06, potem była rekrutacja uzupełniająca.",
  limit: "sprawdź w e-rekrutacji Akademii Sztuki",
  progi: [],
  zrodla: [["otouczelnie.pl – Akademia Sztuki w Szczecinie 2026/27","https://www.otouczelnie.pl/uczelnia_dzial/4425/Akademia-Sztuki-w-Szczecinie-rekrutacja-na-studia-20262027"]]
 },
 {
  id: "zut", name: "Zachodniopomorski Uniwersytet Technologiczny", short: "ZUT", city: "Szczecin", type: "poli", tier: 2, dom: "zut.edu.pl",
  deg: "I", stopien: "I stopnia, kierunek „Projektowanie architektury wnętrz i otoczenia”",
  rok: "rekrutacja 2026/27", pewnosc: "wyszukiwarka",
  wzor: "sprawdzian umiejętności plastycznych + matura (matematyka, polski, język obcy, przedmiot dodatkowy – wg serwisów)",
  calc: null,
  egzamin: "Sprawdzian umiejętności plastycznych i wyobraźni przestrzennej na miejscu, na Wydziale Architektury (Żołnierska 50): trzy zadania rysunkowe. Opłata 150 zł.",
  terminy: "W 2026: sprawdzian 23.06 (wyniki 26.06) i drugi termin 2.09.",
  limit: "sprawdź w IRK ZUT",
  progi: [],
  zrodla: [["ZUT – Projektowanie architektury wnętrz i otoczenia (2026/27)","https://www.zut.edu.pl/wszystkie-newsy/strony-systemowe/strona-kandydata-2026-2027/kierunki-stacjonarne-i-stopnia/projektowanie-architektury-wnetrz-i-otoczenia.html"]]
 },
 {
  id: "pbs", name: "Politechnika Bydgoska im. J. i J. Śniadeckich", short: "PBŚ", city: "Bydgoszcz", type: "poli", tier: 1, dom: "pbs.edu.pl",
  deg: "L", stopien: "I stopnia, 3 lata (Wydział Sztuk Projektowych)",
  rok: "rekrutacja 2026/27 (serwisy o studiach)", pewnosc: "wyszukiwarka",
  wzor: "egzamin praktyczny + konkurs świadectw",
  calc: null,
  przedmioty: "język obcy, język polski, matematyka oraz historia, historia sztuki albo fizyka",
  egzamin: "Egzamin praktyczny, a po nim konkurs świadectw maturalnych.",
  terminy: "Sprawdź na pbs.edu.pl.",
  limit: "30 miejsc bezpłatnych, stacjonarne (2026/27)",
  progi: [],
  zrodla: [["otouczelnie.pl – architektura wnętrz Bydgoszcz","https://www.otouczelnie.pl/miasto_dzial/1367/Architektura-wnetrz-Bydgoszcz"]]
 },
 {
  id: "uz", name: "Uniwersytet Zielonogórski", short: "UZ", city: "Zielona Góra", type: "uni", tier: 1, dom: "uz.zgora.pl",
  deg: "L", stopien: "I stopnia, licencjackie, 3 lata (Wydział Artystyczny)",
  rok: "rekrutacja 2026/27 (portal rekrutacyjny UZ i serwisy)", pewnosc: "wyszukiwarka",
  wzor: "egzamin praktyczny, potem konkurs świadectw",
  calc: null,
  egzamin: "Najpierw egzamin praktyczny (minimum 30 pkt), potem konkurs świadectw. Sztywnych progów punktowych nie ma.",
  terminy: "W 2026 rekrutacja trwała do sierpnia (portal podawał 5.08.2026).",
  limit: "12 miejsc bezpłatnych, stacjonarne (2026/27)",
  progi: [],
  zrodla: [
    ["UZ – portal rekrutacyjny, architektura wnętrz","https://rekrutacja.uz.zgora.pl/oferta-studiow/studia-wyzsze/studia-i-stopnia---jednolite-magisterskie/architektura-wnetrz"],
    ["otouczelnie.pl – architektura wnętrz UZ","https://www.otouczelnie.pl/uczelnia_dzial/3379/Architektura-wnetrz-Uniwersytet-Zielonogorski"]
  ]
 },
 {
  id: "urad", name: "Uniwersytet Radomski im. Kazimierza Pułaskiego (dawniej UTH)", short: "U. Radomski", city: "Radom", type: "uni", tier: 1, dom: "uniwersytetradom.pl",
  deg: "L", stopien: "I stopnia, profil praktyczny (Wydział Sztuki)",
  rok: "zasady z uchwały Senatu z 2022 i progi 2026/27 (serwisy)", pewnosc: "wyszukiwarka",
  wzor: "W = Rk + Tw   (Rk: rozmowa o sztuce i kulturze 0–10; Tw: ocena prac własnych)",
  calc: null,
  egzamin: "Ocena portfolio (co najmniej 10 własnych prac: malarstwo, rysunek odręczny, rysunek perspektywiczny) oraz rozmowa kwalifikacyjna z wiedzy o sztuce i kulturze (0–10 pkt).",
  terminy: "Sprawdź na uniwersytetradom.pl.",
  limit: "sprawdź na uniwersytetradom.pl",
  progi: [["2026/27","minimalny wskaźnik 21 pkt"]],
  zrodla: [
    ["Załącznik do uchwały Senatu UTH 000-10/15/2022","https://bip.uniwersytetradom.pl/attachments/2492/download"],
    ["otouczelnie.pl – zasady rekrutacji 2026/27","https://www.otouczelnie.pl/uczelnia_dzial/11353/Ogolne-zasady-rekrutacji-na-rok-akademicki-20262027"]
  ]
 },
 {id: "atans", name: "Akademia Techniczno-Artystyczna Nauk Stosowanych", short: "ATA NS", city: "Warszawa", type: "prv", tier: 1, dom: "ata.edu.pl", deg: "L",
  stopien: "I stopnia", rok: "2026/27", pewnosc: "serwis", wzor: "zasady na stronie uczelni", calc: null,
  egzamin: "sprawdź na stronie uczelni", terminy: "—", limit: "—", czesne: "4 950 zł/semestr (uczelnie.pl)", progi: [],
  zrodla: [["uczelnie.pl – architektura wnętrz","https://www.uczelnie.pl/kierunek/architektura-wnetrz/"]]},
 {id: "uthc", name: "Uczelnia Techniczno-Handlowa im. Heleny Chodkowskiej", short: "UTH Chodkowskiej", city: "Warszawa", type: "prv", tier: 1, dom: "uth.edu.pl", deg: "L",
  stopien: "I stopnia", rok: "2026/27", pewnosc: "serwis", wzor: "zasady na stronie uczelni", calc: null,
  egzamin: "sprawdź na stronie uczelni", terminy: "—", limit: "—", czesne: "3 150 zł/semestr (uczelnie.pl)", progi: [],
  zrodla: [["uczelnie.pl – architektura wnętrz Warszawa","https://www.uczelnie.pl/miasto/warszawa/kierunek/architektura-wnetrz/"]]},
 {id: "afm", name: "Uniwersytet Andrzeja Frycza Modrzewskiego", short: "AFM", city: "Kraków", type: "prv", tier: 2, dom: "uafm.edu.pl", deg: "L",
  stopien: "I stopnia", rok: "2026/27", pewnosc: "serwis", wzor: "zasady na stronie uczelni", calc: null,
  egzamin: "sprawdź na stronie uczelni", terminy: "—", limit: "—", czesne: "6 500 zł/semestr (uczelnie.pl)", progi: [],
  zrodla: [["uczelnie.pl – architektura wnętrz Kraków","https://www.uczelnie.pl/miasto/krakow/kierunek/architektura-wnetrz/"]]}
];
const AW_FACTS = [
  "Na akademiach sztuk pięknych (Warszawa, Kraków, Gdańsk, Wrocław, Łódź, Poznań, Szczecin) o przyjęciu decyduje egzamin: teczka prac, egzamin praktyczny i rozmowa albo autoprezentacja. Matura jest potrzebna, ale zwykle nie daje punktów.",
  "Wynik z matury liczy się na politechnikach: na PP przede wszystkim matematyka (×2,5, suma podstawy i rozszerzenia), na PŚl jeden przedmiot (historia sztuki, informatyka albo matematyka).",
  "Do większości akademii trzeba przygotować teczkę albo portfolio z rysunkiem, malarstwem i pracami przestrzennymi. W Warszawie teczka jest progiem wejścia (min. 6 z 10 pkt), a w Radomiu wymagane jest co najmniej 10 prac.",
  "Egzaminy odbywają się od połowy czerwca do początku lipca. Zapisy na akademie kończą się wcześnie, np. ASP Kraków w 2026 do 9 czerwca, Akademia Sztuki w Szczecinie do 5 czerwca.",
  "Studia stacjonarne na ASP Warszawa i ASP Kraków to jednolite studia magisterskie. Na pozostałych uczelniach to zwykle studia I stopnia (licencjat albo inżynier)."
];
if (typeof module !== "undefined") module.exports = {AW, AW_FACTS};
