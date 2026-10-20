Aha wiesz co stwórzmy folder na projkecie dla Codexa on orojektuje i tworzy dobre teksty jesli dostanie contekst wizualny i tekstowy .....
Tak. Stwórzmy w projekcie osobny katalog kontekstowy dla Codexa. To lepsze rozwiązanie niż przekazywanie mu za każdym razem długiego promptu z opisem marki, celów i stylu.

Proponuję nazwać go studio/. Nie będzie zawierał kodu aplikacji, tylko wiedzę projektową, na podstawie której Codex może samodzielnie projektować treści, layouty i kolejne funkcjonalności.

Proponowana struktura
024 OGW GH Pages/
├── studio/
│   ├── README.md
│   ├── brand.md
│   ├── audience.md
│   ├── services.md
│   ├── visual-direction.md
│   ├── portfolio.md
│   ├── product-lab.md
│   └── roadmap.md
├── src/
├── pages/
├── assets/
├── data/
├── tests/
├── index.html
└── vite.config.ts
Co znajdzie się w poszczególnych dokumentach?
Plik

Zadanie

brand.md

Tożsamość Scripterix Studio, język komunikacji, pierwsza osoba

audience.md

Potencjalni klienci, ich potrzeby i problemy

services.md

Aplikacje, automatyzacje, integracje, AI

visual-direction.md

Zachowanie estetyki Agentic Studio 5.5

portfolio.md

Wybrane projekty i potwierdzone możliwości

product-lab.md

Problemy z rynku, hipotezy produktów, wtyczki i Skills

roadmap.md

Kolejność rozwoju witryny

README.md

Instrukcja korzystania z kontekstu

Najważniejszy będzie brand.md, bo to on powinien pilnować, żeby Codex nie pisał kolejnych ogólników o „innowacyjnych rozwiązaniach cyfrowych”.