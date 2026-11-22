# Studiowskaz

Aplikacja na telefon (PWA) i do przeglądarki dla maturzysty: wymagania rekrutacyjne polskich uczelni,
pełna baza kierunku **architektura** i ranking przedmiotów, które najbardziej podnoszą wynik.

- **Architektura**: 22 uczelnie (16 publicznych, 6 niepublicznych). Przy każdej: wzór rekrutacyjny, egzamin z rysunku
  (format, skala, minimum), terminy, limit miejsc, progi z lat ubiegłych, źródła i poziom pewności danych.
  Punkty liczone są w skali danej uczelni. Suwak „przewidywany wynik z rysunku” przelicza się na każdą skalę.
- **Wszystkie kierunki**: ok. 70 kierunków na 61 uczelniach z filtrami (miasto, typ uczelni, stopień, dziedzina).
  Wagi przedmiotów to uproszczony model typowych zasad, nie wzory uczelni.
- **Moje wyniki**: przewidywane wyniki matury (PP i PR) i rysunku. Zapisują się tylko na urządzeniu.
  Kod profilu przenosi je na inny telefon.
- **Plan nauki**: dla kierunków z gwiazdką ranking przedmiotów, braki wymagań (np. rysunek poniżej minimum)
  i najkrótsza droga do progu.
- Działa offline po pierwszym otwarciu. Przy nowej wersji pokazuje pasek „Jest nowa wersja”.

## Publikacja (GitHub Pages)

1. **Settings → Pages → Source: GitHub Actions**. Workflow `.github/workflows/pages.yml` po każdym pushu do `main` uruchamia testy i publikuje folder `app/`.
2. Adres: **https://leebeeu.github.io/Studiowskaz/**. Na telefonie: menu przeglądarki → „Dodaj do ekranu głównego” (iPhone: Udostępnij → „Do ekranu początkowego”).

Przy każdej publikacji podbij `VERSION` w `app/sw.js`, wtedy telefon pokaże pasek „Jest nowa wersja”.

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
- `app/js/data.js`: baza ogólna kierunków i uczelni.

Przed złożeniem dokumentów zawsze sprawdź uchwałę rekrutacyjną uczelni. Linki są w szczegółach każdej uczelni.
