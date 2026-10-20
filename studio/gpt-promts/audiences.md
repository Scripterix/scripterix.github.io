# Scripterix Studio — Audience & Customer Context

**Document:** `studio/audience.md`
**Status:** Working strategy / hypotheses to validate
**Language:** Polish
**Purpose:** Audience research, positioning, content design and product discovery.

---

## 1. Cel dokumentu

Scripterix Studio to niezależne studio programistyczne rozwijające aplikacje webowe, automatyzacje, integracje i narzędzia AI.

Celem strony jest przyciąganie klientów z konkretnymi problemami technicznymi, prezentowanie kompetencji poprzez działające projekty oraz odkrywanie powtarzalnych potrzeb, z których mogą powstawać nowe produkty.

Portfolio nie jest kroniką nauki programowania ani tradycyjnym CV.

**Główna zasada: klient przychodzi z problemem, a nie z listą technologii.**

## 2. Główne grupy odbiorców

### A. Małe firmy i przedsiębiorcy

**Priorytet: wysoki**

Firmy potrzebujące niewielkich narzędzi, automatyzacji lub poprawek istniejących aplikacji, ale bez potrzeby zatrudniania całego zespołu developerskiego.

Typowe problemy:

- Ręczne kopiowanie i aktualizowanie danych.
- Powtarzalne tworzenie raportów.
- Brak prostego panelu do zarządzania informacjami.
- Formularze i aplikacje, które nie działają prawidłowo.
- Konieczność połączenia dwóch systemów.
- Pomysł na narzędzie, którego nie opłaca się zamawiać jako dużego projektu.

Potencjalne rozwiązania:

- Skrypty Python i JavaScript.
- Import, eksport i walidacja danych.
- Małe panele webowe.
- Integracje REST API.
- Automatyczne raporty.
- Prototypy MVP.

**Komunikat:** „Nie każde usprawnienie wymaga dużego systemu. Czasem wystarczy dobrze zaprojektowane narzędzie”.

### B. Właściciele sklepów internetowych

**Priorytet: wysoki jako obszar badawczy, nie jako deklarowana specjalizacja**

Interesują nas problemy wokół przepływu danych, katalogów produktów, zamówień oraz integracji.

Przykładowe potrzeby:

- Łączenie cenników od wielu dostawców.
- Walidacja danych CSV, XLSX, XML i JSON.
- Aktualizowanie stanów magazynowych.
- Wykrywanie duplikatów produktów.
- Przygotowywanie danych do importu.
- Synchronizacja informacji przez API.

Platformy do obserwacji rynku:

- BaseLinker / Base.com.
- WooCommerce.
- PrestaShop.
- Systemy ERP i katalogi hurtowni.

Nie pozycjonuj Scripterix jako specjalisty od wdrożeń tych platform, dopóki nie istnieją potwierdzone realizacje.

**Kierunek:** narzędzia pracujące z danymi i integracjami, a nie rutynowe administrowanie sklepami.

### C. Developerzy i małe zespoły IT

**Priorytet: wysoki**

Odbiorcy potrzebujący pomocy przy konkretnym zadaniu programistycznym.

Problemy:

- Błąd w JavaScript lub TypeScript.
- Niedokończony komponent React.
- Brak testów automatycznych.
- Problemy z frontendem lub API.
- Potrzeba refaktoryzacji niewielkiego modułu.
- Konfiguracja builda i wdrożenia.
- Szybkie przygotowanie prototypu.

Rozwiązania:

- Debugging.
- Rozbudowa funkcjonalności.
- Refaktoryzacja.
- Testy Playwright.
- Integracja API.
- Konfiguracja Vite i GitHub Actions.

**Komunikat:** „Pomogę dokończyć, naprawić lub przetestować konkretny fragment aplikacji”.

### D. Twórcy produktów i startupy

**Priorytet: średni**

Osoby z pomysłem na aplikację, które potrzebują pierwszej działającej wersji.

Potencjalne usługi:

- Prototyp interfejsu.
- MVP aplikacji.
- Walidacja pomysłu technicznego.
- Integracja z zewnętrznym API.
- Panel administracyjny.
- Proof of Concept.

Nie obiecuj pełnego produktu w kilka godzin ani ceny bez poznania wymagań.

**Komunikat:** „Sprawdzę, jak zamienić pomysł w działający prototyp, zanim powstanie kosztowny projekt”.

### E. Użytkownicy narzędzi AI i automatyzacji

**Priorytet: rozwojowy**

Developerzy i firmy zainteresowane powtarzalnymi workflow AI.

Przykładowe zastosowania:

- Agenci wykonujący kontrolowane zadania.
- Automatyzacja testów i przeglądu interfejsów.
- Integracje modeli AI z narzędziami.
- Skills automatyzujące wieloetapowe procedury.
- Wtyczki i małe narzędzia wspierające pracę.

W tym obszarze wyróżnikiem ma być praktyczna implementacja oraz kontrola wyników, nie ogólne obietnice dotyczące AI.

---

## 3. Segmentacja według problemu

W komunikacji ofertowej pierwszeństwo mają problemy, nie branże.

| Problem | Usługa | Potencjał ponownego wykorzystania |
|---|---|---|
| Ręczne przetwarzanie plików | Walidator i konwerter danych | Wysoki — hipoteza |
| Powtarzalne raportowanie | Generator raportów | Wysoki — hipoteza |
| Błąd w aplikacji | Debugging i poprawka | Zależny od przypadku |
| Brak integracji | Adapter REST API | Średni lub wysoki |
| Potrzeba prostego panelu | Mała aplikacja webowa | Średni |
| Powtarzalny proces AI | Skill lub workflow agentowy | Do zbadania |

Wartość produktu zależy od rzeczywistego popytu, kosztu obsługi, bezpieczeństwa i możliwości ponownego wykorzystania rozwiązania.

## 4. Pierwsze obserwacje rynku

### Źródło inspiracji: analiza profili Useme

Wstępnie przeanalizowano trzy modele działalności:

**Mateusz Dombrowski**

- Konkretne pozycjonowanie wokół stron, aplikacji i automatyzacji e-commerce.
- Prezentacja własnych narzędzi do przetwarzania danych dostawców.
- Komunikacja zorientowana na mierzalny problem klienta.

**Dragon EX**

- Szersza oferta tworzenia stron i aplikacji.
- Historia zakończonych umów oraz opinii na Useme.
- Ogólne pozycjonowanie usług.

**Przemysław Soliński**

- Duża liczba zakończonych umów na Useme.
- Oferta obejmująca WordPress, WooCommerce, poprawki, optymalizację i utrzymanie stron.
- Przykład działalności opierającej się również na mniejszych zadaniach.

**Wniosek roboczy:** warto testować zarówno niewielkie usługi o jasno określonym zakresie, jak i bardziej wyspecjalizowane automatyzacje.

Same profile konkurentów nie dowodzą jednak wielkości popytu ani rentowności poszczególnych usług.

## 5. Model pozyskiwania klientów

### Etap pierwszy — pierwsze płatne realizacje

Główne źródło pozyskania klientów: Useme i inne platformy zleceń.

Roboczy segment do zbadania: małe zadania o budżecie około 300–600 zł.

Nie jest to publiczny cennik Scripterix.

Każde zlecenie powinno mieć:

- Jasny zakres.
- Określony rezultat.
- Kryteria odbioru.
- Oszacowany czas wykonania.
- Ustalone warunki poprawek.

### Etap drugi — budowanie portfolio

Po ukończeniu zlecenia należy rozważyć przygotowanie krótkiego case study, jeśli pozwalają na to ustalenia z klientem.

Schemat:

**Problem → Rozwiązanie → Technologie → Rezultat**

Nie publikuj prywatnych danych, kodu klienta ani niezatwierdzonych informacji o współpracy.

### Etap trzeci — Product LAB

Powtarzające się problemy trafiają do rejestru hipotez produktowych.

Dla każdego problemu zapisuj:

- Źródło obserwacji.
- Opis potrzeby.
- Częstotliwość występowania.
- Istniejące alternatywy.
- Koszt prototypu.
- Możliwy sposób monetyzacji.
- Koszt utrzymania.
- Stopień potwierdzenia popytu.

Nie utożsamiaj pojedynczej obserwacji z potwierdzoną okazją biznesową.

---

## 6. Zasady komunikacji na stronie

Scripterix komunikuje się w pierwszej osobie liczby pojedynczej.

Preferowane sformułowania:

- „Tworzę aplikacje i narzędzia webowe”.
- „Automatyzuję powtarzalne zadania”.
- „Naprawiam i rozwijam istniejący kod”.
- „Sprawdzam rozwiązanie testami”.
- „Pomogę określić zakres prac”.

Unikaj:

- „Jesteśmy liderem innowacji”.
- „Nasz doświadczony zespół ekspertów”.
- „Rewolucjonizujemy Twój biznes”.
- „Gwarantuję wzrost sprzedaży”.
- „Kompleksowo obsługuję każdy system”.
- Niepotwierdzonych wskaźników oszczędności i efektywności.

Ton: konkretny, profesjonalny, techniczny, ale zrozumiały dla osoby nietechnicznej.

## 7. Oczekiwana ścieżka odwiedzającego

**Home → Konkretna usługa → Dowód kompetencji → Kontakt**

Użytkownik powinien szybko zrozumieć:

1. Jakie problemy rozwiązuję.
2. Co mogę dla niego wykonać.
3. Jakie mam potwierdzone umiejętności.
4. Jak rozpocząć współpracę.

Nie wymagaj od klienta znajomości frameworków lub terminologii AI.

Strona ma jednocześnie umożliwiać odbiorcy technicznemu przejście do repozytorium i oceny kodu.

## 8. Priorytety odbiorców

| Segment | Priorytet | Rola |
|---|---|---|
| Małe firmy z konkretną potrzebą | P1 | Krótkoterminowe zlecenia |
| Developerzy i zespoły IT | P1 | Zadania techniczne |
| E-commerce i przepływ danych | P1 Research | Testowanie specjalizacji |
| Twórcy MVP | P2 | Projekty rozwojowe |
| Użytkownicy AI i Skills | P2 | Długoterminowy rozwój produktów |

Priorytety są decyzją strategiczną Scripterix, a nie wynikiem ilościowego badania rynku.

## 9. Instrukcje dla Codexa

Podczas projektowania treści lub interfejsu:

1. Projektuj z perspektywy problemu odwiedzającego.
2. Pokazuj rezultat przed listą technologii.
3. Rozróżniaj zrealizowane projekty, demonstracje i pomysły.
4. Nie wymyślaj klientów, referencji, osiągnięć ani statystyk.
5. Utrzymuj spójność z `brand.md` i `visual-direction.md`.
6. Preferuj krótkie, precyzyjne komunikaty i widoczne CTA.
7. Przy ofertach rozważ, czy zadanie ma dobrze określony zakres.
8. Nie przedstawiaj LAB jako katalogu gotowych produktów.
9. Zachowaj techniczny charakter marki bez tworzenia zbędnego żargonu.
10. Jeśli danych o odbiorcach brakuje, oznacz założenia jako hipotezy zamiast przedstawiać je jako fakty.

## 10. Główne kryterium sukcesu

Celem Scripterix Studio nie jest wyłącznie zwiększanie liczby odwiedzających.

Najważniejsze rezultaty to:

- Zapytania dotyczące konkretnych problemów.
- Płatne realizacje.
- Rosnąca baza zweryfikowanych projektów.
- Rozpoznawanie powtarzalnych potrzeb.
- Rozwijanie narzędzi, które mogą być sprzedawane wielokrotnie.

**Portfolio jest narzędziem pozyskiwania pracy i wiedzy o rynku — nie celem samym w sobie.**
