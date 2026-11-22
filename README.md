# Studiowskaz

Aplikacja na telefon (PWA) i do przeglądarki dla maturzysty: wymagania rekrutacyjne polskich uczelni,
pełna baza kierunku **architektura** i ranking przedmiotów, które najbardziej podnoszą wynik.

- **Architektura**: 22 uczelnie (16 publicznych, 6 niepublicznych). Przy każdej: wzór rekrutacyjny, egzamin z rysunku
  (format, skala, minimum), terminy, limit miejsc, progi z lat ubiegłych, źródła i poziom pewności danych.
  Punkty liczone są w skali danej uczelni. Suwak „przewidywany wynik z rysunku” przelicza się na każdą skalę.
- **Wnętrza**: 17 uczelni z architekturą wnętrz (14 publicznych, w tym 7 akademii sztuk pięknych, oraz 3 niepubliczne):
  egzaminy (teczka, egzamin praktyczny, rozmowa), terminy, limity, progi i źródła. PP i PŚl liczą punkty wzorem uczelni.
- **Wszystkie kierunki**: ok. 70 kierunków na 61 uczelniach z filtrami (miasto, typ uczelni, stopień, dziedzina).
  Wagi przedmiotów to uproszczony model typowych zasad, nie wzory uczelni.
- **Moje wyniki**: przewidywane wyniki matury (PP i PR) i rysunku.
- **Konto** (po podłączeniu Firebase): logowanie przez Google albo e-mail i hasło. Wyniki i wybrane kierunki
  zapisują się w bazie i są takie same na każdym urządzeniu. Każdy widzi tylko swoje dane.
- **Plan nauki**: dla kierunków z gwiazdką ranking przedmiotów, braki wymagań (np. rysunek poniżej minimum)
  i najkrótsza droga do progu.
- Działa offline po pierwszym otwarciu. Przy nowej wersji pokazuje pasek „Jest nowa wersja”.

## Publikacja (GitHub Pages)

1. **Settings → Pages → Source: GitHub Actions**. Workflow `.github/workflows/pages.yml` po każdym pushu do `main` uruchamia testy i publikuje folder `app/`.
2. Adres: **https://leebeeu.github.io/Studiowskaz/**. Na telefonie: menu przeglądarki → „Dodaj do ekranu głównego” (iPhone: Udostępnij → „Do ekranu początkowego”).

Przy każdej publikacji podbij `VERSION` w `app/sw.js`, wtedy telefon pokaże pasek „Jest nowa wersja”.

## Tryby działania

| Tryb | Kiedy | Dane |
|------|-------|------|
| lokalny | `app/js/firebase-config.js` zawiera `null` | tylko w tej przeglądarce, bez logowania |
| z kontem | uzupełniony `app/js/firebase-config.js` (tak jest teraz, projekt `studiowskaz`) | w Firebase, logowanie Google albo e-mail i hasło |

## Logowanie i baza danych (Firebase, jednorazowo ok. 10 minut)

Firebase to usługa Google z bazą danych i logowaniem. Plan darmowy (Spark) wystarcza i nie wymaga karty.
To osobny projekt, niezależny od Rachunków.

1. Wejdź na https://console.firebase.google.com i kliknij **Utwórz projekt** (Create a project), nazwa np. `studiowskaz`.
   Google Analytics możesz wyłączyć.
2. **Logowanie**: menu **Build → Authentication → Get started → Sign-in method**:
   - **Google** → włącz, wybierz swój e-mail pomocy i zapisz,
   - **Email/Password** → włącz (tylko pierwszy przełącznik, „Email link” niepotrzebny) i zapisz.
3. **Dozwolona domena**: **Authentication → Settings → Authorized domains → Add domain** i wpisz
   `leebeeu.github.io`. (`localhost` jest już na liście, więc działa też podgląd na komputerze.)
4. **Baza danych**: **Build → Firestore Database → Create database**. Lokalizacja `europe-central2`
   (Warszawa), tryb **production**.
5. **Reguły dostępu**: w Firestore otwórz zakładkę **Rules**, zastąp całą treść zawartością pliku
   [`firestore.rules`](firestore.rules) i kliknij **Publish**. Bez tego nikt nie będzie miał dostępu.
6. **Klucze aplikacji**: ikona koła zębatego → **Project settings → Your apps → ikona `</>` (Web)**,
   nazwa np. `studiowskaz` (Firebase Hosting nie jest potrzebny). Skopiuj obiekt `firebaseConfig`
   i wklej go do [`app/js/firebase-config.js`](app/js/firebase-config.js) w miejsce `null`
   (wzór jest w komentarzu w tym pliku). Te wartości nie są tajne, dane chronią reguły z kroku 5.
7. Podbij `VERSION` w `app/sw.js` i wypchnij zmiany na `main`. GitHub Pages opublikuje aplikację.

Model danych: jeden dokument `users/{uid}` na osobę: `{profile, targets, email, name, updatedAt}`.
Przy pierwszym logowaniu na urządzeniu, na którym wpisano już wyniki, trafiają one do konta.
Wylogowanie usuwa wyniki z urządzenia (zostają w koncie). W oknie konta jest też „Usuń moje dane z chmury”.

## Praca lokalna

```
npm start        # podgląd: http://localhost:5175 (też z telefonu w tej samej sieci Wi-Fi)
npm test         # testy obliczeń
npm run artifact # składa app.html – wersję jednoplikową do publikacji jako Artifact
```

## Dane

- `app/js/architektura.js`: baza architektury. Stan: listopad 2026.
  Wzory sprawdzone w uchwałach i na stronach uczelni (rekrutacja 2027/28): PW, PWr, PK, PG, PP, PŁ, PŚl.
  PRz: wzór z zasad 2026/27, bez skali egzaminu. Pozostałe uczelnie: dane z serwisów zewnętrznych, niesprawdzone u źródła.
  Pole `pewnosc` mówi, skąd jest wzór. Pole `calc.zalozenia` opisuje, co przyjęto, gdy źródło czegoś nie podawało
  (najczęściej przelicznik wyniku z poziomu podstawowego).
- `app/js/wnetrza.js`: baza architektury wnętrz. Wzory PP i PŚl sprawdzone w dokumentach na 2027/28,
  pozostałe dane z wyszukiwarki (głównie rekrutacja 2026/27), oznaczone w aplikacji jako „do sprawdzenia”.
- `app/js/data.js`: baza ogólna kierunków i uczelni.

Przed złożeniem dokumentów zawsze sprawdź uchwałę rekrutacyjną uczelni. Linki są w szczegółach każdej uczelni.
