AGENTS.md — Scripterix Studio
1. Cel i zakres
To repozytorium rozwija Scripterix Studio: witrynę niezależnego developera, prezentującą usługi, projekty, eksperymenty LAB i możliwości współpracy.

Projekt powstał na bazie technicznej dawnego projektu #55 / Agentic Studio. Projekt #55 nie definiuje obecnej architektury informacji ani zasad komunikacji marki. Jego stare podstrony i mechanizmy mogą pozostać w źródłach jako materiał referencyjny do czasu osobnej decyzji o usunięciu.

Tryb domyślny: MANUAL-FIRST / MICRO. Użytkownik podejmuje decyzje, GPT może przygotowywać kod i dokumentację, a agent działający na repozytorium pracuje wyłącznie w uzgodnionych granicach.
2. Hierarchia źródeł prawdy
1. Bieżące, wyraźne polecenie użytkownika.
2. Ten AGENTS.md — zasady pracy, bezpieczeństwa zmian i zakresu autonomii.
3. Aktualny kod i konfiguracja repozytorium — faktyczny stan implementacji.
4. Dokumentacja marki w studio/gpt-promts/, w szczególności brand.md, audiences.md, visual-direction.md — tożsamość i język marki.
5. ROADMAP.md — przyjęty kierunek i kolejność etapów; README.md — instrukcja projektu; CHANGELOG.md — historia istotnych zmian.
6. studio/home-roadmap.md i studio/migration-audit.md — kontekst migracji (jeśli pliki istnieją).
7. docs/agentic-brief.md i pozostałe materiały #55 — archiwum, nie instrukcje dla aktualnego Studio.
Jeżeli dokumentacja jest sprzeczna z kodem, zgłoś rozbieżność. Nie zakładaj automatycznie, że dawny brief ma pierwszeństwo. Nie twórz brakujących dokumentów ani katalogów bez zlecenia.
3. Zasady komunikacji i decyzji
- Odpowiadaj rzeczowo, po polsku; techniczne terminy i nazwy kodu mogą być po angielsku.
- Oddzielaj stan potwierdzony od hipotezy, rekomendacji i zamiaru.
- Nie deklaruj sukcesu, przejścia testów ani publikacji bez wyników.
- Jeśli polecenie jest precyzyjne, wykonaj tylko jego zakres; nie rozszerzaj go o „przy okazji”.
- Przy niejasności mającej wpływ na bezpieczeństwo kodu lub danych przedstaw krótkie pytanie albo wariant minimalny, bez rozpoczynania szerokiego audytu.
- Nie przekształcaj planu, dyskusji ani wklejonego dialogu w automatyczne polecenie wykonania zmian.
4. Poziomy pracy i budżet narzędzi
MICRO — domyślny
Dotyczy drobnych zmian, np. jednej etykiety menu, linku, tekstu, selektora lub wpisu JSON.
- Ogranicz się do wskazanego pliku; jeśli to konieczne, maksymalnie do bezpośrednio zależnych plików.
- Nie skanuj całego repozytorium, jeśli ścieżka została podana.
- Nie uruchamiaj Playwright MCP, przeglądarki agentowej, screenshotów, pełnego E2E ani pipeline'u CI.
- Nie wykonuj operacji Git ani deployu.
- Nie refaktoruj sąsiedniego kodu, nie aktualizuj zależności ani dokumentacji bez potrzeby.
- Do weryfikacji wystarczy adekwatna kontrola lokalna, np. parsowanie JSON albo sprawdzenie składni.
STANDARD — na wyraźne polecenie
Dotyczy kilku powiązanych plików, np. dodania nowej strony Vite MPA.
- Przed zmianami wskaż krótko pliki i przewidywany zakres.
- Wykonaj wyłącznie uzgodnioną implementację.
- Przeprowadź minimalne uzasadnione testy lokalne (np. typecheck i build przy zmianie TypeScript/Vite).
- Bez Playwright MCP, Git, deployu i szerokiej modernizacji, o ile nie zostały wyraźnie zlecone.
CODEX / EXTENDED — tylko po osobnej zgodzie
Dotyczy większej migracji, trudnego debugowania, wielu modułów, testów przeglądarkowych lub publikacji.
- Najpierw przedstaw plan, listę plików, ryzyka i kosztowne czynności narzędziowe.
- Nie zaczynaj działania poza uzgodnionym zakresem.
- Każdą dodatkową, kosztowną rundę diagnostyki uzgadniaj zamiast wchodzić w nieograniczoną pętlę poprawiania.
Zasada nadrzędna: liczba kroków i narzędzi powinna być proporcjonalna do zakresu i ryzyka. Krótka odpowiedź nie jest dowodem małego zużycia zasobów; unikaj zbędnych operacji.
5. Uprawnienia do zmian
- Domyślnie samo omówienie problemu nie upoważnia do edycji. Rozróżniaj „oceń”, „zaproponuj”, „stwórz kod do wklejenia” od „zmodyfikuj pliki”.
- Edytuj tylko wtedy, gdy użytkownik wyraźnie prosi o implementację lub zmianę plików.
- Nie usuwaj plików, katalogów, historii ani funkcji bez jednoznacznej zgody.
- Nie podejmuj samodzielnie decyzji produktowych, UX, brandingowych i dotyczących kolejności roadmapy.
- Nie wykonuj samodzielnego commit, push, merge, rebase, zmiany gałęzi domyślnej ani publikacji.
- Nie dodawaj funkcji, pakietów, skryptów czy automatyzacji „na przyszłość”, jeśli nie są częścią zadania.
- Przed zmianą wykraczającą poza uzgodnione pliki — zgłoś zależność i poproś o rozszerzenie zakresu.
6. Architekturа techniczna
Aktualny kierunek: Vite Multi-Page Application (MPA), TypeScript, HTML, CSS i Bootstrap. Nie wprowadzaj Reacta, Angulara, Astro, backendu ani nowego generatora bez osobnej decyzji.

Znane punkty architektury (przed pracą potwierdź ich istnienie w bieżącym katalogu):
- index.html — Home w katalogu głównym.
- pages/ — samodzielne podstrony, stopniowo migrowane z One Page.
- src/components/navigation.ts — wspólna nawigacja.
- data/site.json — definicja menu i danych nawigacyjnych.
- assets/css/site.css — współdzielone style i tokeny.
- assets/css/home.css — układ i elementy Home, również używane tam, gdzie to uzasadnione.
- vite.config.ts — konfiguracja wejść MPA i buildu.
- tests/ — testy aplikacji.
- assets/js/sites.js — według ostatniego raportu lokalnego Codexa zachowany skrypt historycznych funkcji; sprawdź nazwę przed użyciem, ponieważ wcześniejsze materiały podawały site.js.
Nie zakładaj, że wszystkie stare strony #55 są aktywne. Nie podłączaj ponownie historycznego Warsztatu, wyszukiwarki, tagów ani stron pokazowych bez decyzji użytkownika. Wyszukiwarkę przewidujemy do przyszłego ponownego wykorzystania — nie usuwać jej kodu pochopnie.
7. Migracja One Page → Multi Page
Przenoś strony stopniowo, jedną na iterację. Docelowo Home pozostaje przeglądem usług, projektów i LAB, a rozwinięcia mają osobne adresy.

Dla każdej wydzielanej podstrony:
1. Zachowaj index.html w katalogu głównym.
2. Utwórz wskazany plik w pages/ (np. pages/kontakt.html).
3. W razie potrzeby usuń z Home tylko przenoszoną sekcję; nie przebudowuj pozostałych.
4. Popraw ścieżki względne do CSS, obrazów i skryptów.
5. Zaktualizuj odpowiedni wpis w data/site.json.
6. Dodaj nową stronę do wejść MPA w vite.config.ts.
7. Upewnij się, że odnośniki w obu kierunkach oraz stan aktywnej nawigacji działają.
8. Wykonaj tylko adekwatną weryfikację.
Nie duplikuj logiki biznesowej. Przy rosnącej liczbie stron zaproponuj wspólne komponenty nagłówka i stopki, ale nie wdrażaj ich bez uzgodnienia.
8. Testowanie i kontrola kosztów
Preferowana sekwencja, zależnie od rodzaju zmiany:
- Zmiana tekstu lub JSON: kontrola treści i poprawności formatu.
- Zmiana HTML/CSS: ręczny podgląd przeglądarkowy użytkownika i kontrola linków.
- Zmiana TypeScript lub Vite: npm run typecheck, npm run build.
- Zmiana routingu, nawigacji lub funkcji UI: odpowiednie lokalnie uruchomione testy Playwright, gdy są uzasadnione.
- Przed wydaniem większej wersji: pełniejsza weryfikacja zgodna z decyzją użytkownika.
Playwright CLI/test runner to nie Playwright MCP. Testy wykonywane ręcznie w lokalnym terminalu nie wymagają angażowania Codexa. Nigdy nie uruchamiaj Playwright MCP ani automatycznego oglądania screenshotów bez wyraźnego zlecenia.

Nie stosuj automatycznych pętli test → fix → test → fix bez limitu. Jeżeli test nie przechodzi, przedstaw błąd i minimalną poprawkę. Nie zmieniaj testów tylko po to, by uzyskać zielony wynik.
9. Git i publikacja
Repozytorium docelowe: Scripterix/scripterix.github.io.
- main — aktywna gałąź domyślna Scripterix Studio.
- old — archiwum wcześniejszej witryny Jekyll.
- Publikacja: GitHub Actions budujące Vite i publikujące dist/ na GitHub Pages.
- dist/, node_modules/ oraz typowe raporty testowe są artefaktami odtwarzalnymi, nie edytuj ich jako źródeł.
- Nigdy nie stosuj force push, nie kasuj historii ani nie zmieniaj źródła publikacji bez odrębnej, jednoznacznej zgody.
- Domyślnie Git obsługuje użytkownik ręcznie. Przy zadaniu wymagającym publikacji najpierw pokaż skutki i plan wycofania.
10. Marka, treści i portfolio
- Komunikacja w pierwszej osobie liczby pojedynczej: „tworzę”, „naprawiam”, „automatyzuję”.
- Nie przedstawiaj hipotez i prototypów jako gotowych produktów.
- Nie wymyślaj klientów, realizacji, wyników biznesowych, opinii ani metryk.
- Projekt #55 / Agentic Studio może być opisany jako własny projekt lub demonstrator, ale nie jako aktualna architektura Scripterix Studio.
- Zachowuj przyjęty kierunek wizualny: jasne papierowe tło, siatka, typografia i akcenty mint / coral / amber; bez niezamówionego redesignu.
- Przed zmianą oferty lub twierdzeń marketingowych sprawdź właściwe materiały marki.
11. Dokumentacja
- README.md — czym jest projekt, jak go uruchomić i testować.
- ROADMAP.md — etapy, priorytety, statusy i kryteria zakończenia.
- CHANGELOG.md — znaczące zmiany już wykonane, z wyraźnym rozróżnieniem zmian lokalnych i opublikowanych.
- AGENTS.md — stabilne zasady pracy; aktualizuj tylko, gdy zmieniają się same reguły.
- studio/migration-audit.md — szczegółowa klasyfikacja zachowanych, dostosowanych, odłączonych i archiwalnych zasobów.
Nie aktualizuj czterech dokumentów po każdej kosmetycznej poprawce. Aktualizuj tylko dokumenty, na które rzeczywiście wpływa zadanie, i wyłącznie w granicach udzielonej zgody.
12. Format raportu po zadaniu
Przy małej zmianie maksymalnie kilka zdań:
- Zmieniono: konkretne pliki i zakres.
- Sprawdzono: rzeczywiście uruchomione kontrole; gdy nic nie uruchomiono, napisz to wprost.
- Pozostaje: tylko istotne niedokończone kwestie.
Nie podawaj obszernych raportów, propozycji nowych funkcji ani kolejnych zadań, jeśli użytkownik nie prosi o plan.
13. Reguła zatrzymania
Przerwij rozszerzanie pracy i poproś o decyzję, gdy:
- zmiana wymaga modyfikacji innych niż uzgodnione plików;
- potrzebna jest kosztowna sesja MCP, E2E, screenshotów lub szeroki audyt;
- konieczny byłby push, deploy, usunięcie danych albo ingerencja w historię Git;
- istnieje ryzyko utraty działania Home lub niespójności architektury;
- nie można potwierdzić wyniku bez dodatkowych narzędzi.
Priorytet: poprawny, czytelny i odwracalny kod — przy kontrolowanym zakresie i koszcie pracy.