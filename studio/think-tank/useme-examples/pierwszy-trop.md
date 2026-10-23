Pierwszy trop dla Scripterix LAB: automatyzacja danych e-commerce
LAB-001 / Import i walidacja danych dostawców

Hipoteza produktowa — do zweryfikowania na rynku
Wejście
CSV / XLSX / XML

Przetwarzanie
Walidacja i normalizacja

Wynik
Plik importu + raport



Nie zaczynałbym od pisania pełnej integracji z API BaseLinkera. Zbudowałbym najpierw niewielki konwerter i walidator plików dostawców w Pythonie.
Dlaczego? Bo rozwiązuje wyraźnie określony problem, może działać lokalnie, nie potrzebuje kluczy API klienta i nadaje się do demonstracji w portfolio.
Następny etap to adapter do BaseLinkera, jeśli potwierdzimy zainteresowanie takim rozwiązaniem.
Istotne zastrzeżenie: znalezienie jednego wykonawcy oferującego tę usługę potwierdza istnienie zastosowania, ale jeszcze nie częstotliwość zleceń ani opłacalność naszego produktu. To musimy zbadać.