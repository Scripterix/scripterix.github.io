# Scripterix Studio — CLI, testy i kontrola publikacji

**Środowisko:** Windows 10 / PowerShell, Vite MPA + TypeScript, Playwright, GitHub Pages.  
**Zasada:** uruchamiaj komendy samodzielnie w terminalu; lokalny Playwright CLI to nie Playwright MCP.  
**Uwaga:** komendy `npm run ...` są poprawne wyłącznie wtedy, gdy odpowiedni skrypt istnieje w `package.json`. Dokument powstał na podstawie dokumentacji Studio z ostatniej sesji, nie z aktualnego `package.json`.

## 0. Gdzie uruchamiać

```powershell
cd 'C:\Users\mujlo\Projekty\024 OGW GH Pages'
Get-Location
Test-Path .\package.json
```

Ścieżka odpowiada katalogowi roboczemu Studio z naszych sesji. Sprawdź, czy zawiera aktualną wersję projektu.

## 1. Sprawdź dostępne polecenia

```powershell
node --version
npm --version
npm run
Get-Content .\package.json
```

`npm run` bez nazwy wyświetla rzeczywiste skrypty. **To źródło prawdy** dla komend poniżej.

## 2. Lokalny serwer i podgląd

```powershell
npm run dev
```

Otwórz adres wypisany przez Vite (historycznie `http://127.0.0.1:4173/`, ale port może być inny). Przerwanie serwera: **Ctrl+C**.

Jeżeli w `package.json` istnieje skrypt `preview`:

```powershell
npm run build
npm run preview
```

## 3. TypeScript i build — szybka kontrola

```powershell
npm run typecheck
npm run build
```

- `typecheck` — błędy typów TypeScript (o ile skrypt jest obecny).
- `build` — budowa produkcyjna Vite do `dist/` (zgodnie z obecną konfiguracją).

**Kiedy:** po zmianach TS, HTML, Vite, nawigacji, linków lub konfiguracji podstron MPA.

## 4. Wyszukiwarka — sprawdzanie indeksu

W poprzednich iteracjach Studio powstał generator indeksu. Zweryfikuj nazwy poleceń w `npm run` i sprawdź, czy plik `scripts/generate-search-index.mjs` nadal istnieje.

```powershell
Test-Path .\scripts\generate-search-index.mjs
npm run
```

Jeżeli skrypty są obecne:

```powershell
npm run search:index
npm run search:index:check
npm run search:index:watch
```

- `search:index` — generowanie indeksu.
- `search:index:check` — kontrola aktualności indeksu bez zamierzonej zmiany plików.
- `search:index:watch` — obserwacja zmian w trybie developerskim; zatrzymaj przez Ctrl+C.

Jeśli generator nie uwzględnia nowych głęboko zagnieżdżonych stron Portfolio, popraw generator osobno — nie dopisuj ręcznie nieistniejących stron.

## 5. Playwright CLI — bez agenta i bez MCP

Potwierdzone wcześniej polecenie projektu:

```powershell
npm run test:visual
```

Jeżeli zainstalowano Playwright i testy mają standardową konfigurację, można używać również:

```powershell
npx playwright test --list
npx playwright test
npx playwright test --headed
npx playwright test --ui
npx playwright show-report
```

**Selektywne uruchomienie** — zmniejsza czas i ilość wyników:

```powershell
npx playwright test -g 'navigation'
npx playwright test -g 'search'
npx playwright test --project=chromium
```

Wyrażenia `navigation` i `search` są przykładowymi filtrami nazw testów: sprawdź faktyczne nazwy przez `--list`. `--project=chromium` zadziała tylko wtedy, gdy taki projekt jest zadeklarowany w konfiguracji.

Jeżeli brakuje przeglądarek testowych:

```powershell
npx playwright install chromium
```

Nie uruchamiaj `npx playwright install --with-deps` bez potrzeby — to bardziej rozbudowana instalacja, szczególnie do CI/Linux.

**Uwagi:** `--update-snapshots` zmienia wzorcowe screenshoty; nie używaj bez świadomego zatwierdzenia nowych wzorców. Nie uruchamiaj Playwright MCP ani automatycznej analizy obrazów przez Codex bez oddzielnej decyzji.

## 6. Kontrola struktury stron i obrazów

```powershell
Test-Path .\pages\portfolio.html
Test-Path .\pages\portfolio\projekty\index.html
Test-Path .\pages\portfolio\projekty\shelfstack.html
Get-ChildItem .\assets\img\projects\shelfstack\ -File
Get-ChildItem .\dist\ -Recurse -Filter '*.html' | Select-Object FullName
```

Ścieżki powyżej odpowiadają ostatniemu planowi; jeżeli Codex utworzył inną strukturę, potraktuj rozbieżność jako rzecz do sprawdzenia, nie jako automatyczny błąd.

## 7. Bezpieczna kontrola Git — tylko ręcznie

**Ważne:** katalog `024 OGW GH Pages` mógł nie być repozytorium Git; w poprzednim raporcie właściwy klon znajdował się w osobnym katalogu `scripterix-remote`. Najpierw ustal, gdzie naprawdę jest `.git`.

```powershell
git rev-parse --show-toplevel
git status --short
git branch --show-current
git diff --stat
git diff
```

Jeśli polecenie `git rev-parse` zgłosi błąd, przejdź do katalogu rzeczywistego klonu przed użyciem dalszych komend. Nie inicjuj drugiego repozytorium bez planu.

Komendy do **świadomego, ręcznego** wykonania dopiero po weryfikacji:

```powershell
git add -A
git diff --cached --stat
git diff --cached
git commit -m "feat: add ShelfStack portfolio project"
git push origin main
```

`git add -A` uwzględnia wszystkie zmiany w repozytorium; przed commitem koniecznie przejrzyj indeks. `git push` publikuje zmiany zdalnie i może uruchomić GitHub Actions — nigdy nie jest częścią zwykłego testowania.

## 8. Proponowany rytm kontroli

| Zmiana | Minimum |
|---|---|
| Tekst lub pojedynczy obraz | Podgląd w przeglądarce, sprawdzenie linków |
| CSS i responsywność | Podgląd desktop/mobile, w razie potrzeby test selektywny |
| TypeScript, wspólny komponent | `npm run typecheck`, `npm run build` |
| Nowa strona MPA / routing | Typecheck, build, ręczny test głębokiego adresu, test nawigacji |
| Wyszukiwarka | `search:index:check` (jeśli obecny), selektywne testy search |
| Przed publikacją | Build, adekwatne testy Playwright, przegląd zmian Git |

## 9. Szybka lista kontrolna przed publikacją

- [ ] Każda strona dostępna po bezpośrednim wklejeniu URL.
- [ ] Menu, breadcrumb i powroty działają również na stronach zagnieżdżonych.
- [ ] Obrazy mają poprawne ścieżki i proporcje (bez ucinania screenshotów).
- [ ] Mobile: brak poziomego overflow, dropdown działa dotykiem i klawiaturą.
- [ ] `npm run typecheck` i `npm run build` zakończone bez błędów.
- [ ] Testy Playwright uruchomione lokalnie adekwatnie do zakresu.
- [ ] Przejrzano diff i nie dodano niechcianych plików (`dist`, `test-results`, itp.).
- [ ] Commit i publikacja dopiero po Twojej decyzji.
