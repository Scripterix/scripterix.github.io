---
lang: pl
title: "Dzień 15 – Prace nad Jekyll, Codespaces i GH Pages"
date: 2024-10-07
hours_spent: 3
cumulative_hours: 3
phase: foundation
focus_area: "Jekyll, Codespaces, GitHub Pages, build, nowy post"
mood: "Zaangażowanie"
tags:
    - jekyll
    - codespaces
    - github-pages
    - devops
resources:
    - name: "Jekyll Docs"
      url: "https://jekyllrb.com/docs/"
    - name: "GitHub Pages Guide"
      url: "https://docs.github.com/en/pages"
    - name: "Codespaces Docs"
      url: "https://docs.github.com/en/codespaces"
summary: "Prace nad konfiguracją Jekyll w Codespaces, wypchnięciem na GitHub Pages, budowaniem projektu oraz dodaniem nowego posta."
---
## Zadania wykonane

1. **Konfiguracja Codespaces**  
    Utworzyłem nowy Codespace dla repozytorium, sprawdziłem dostępność narzędzi (`jekyll`, `ruby`, `node`, `npm`). Przetestowałem lokalne uruchomienie Jekyll (`bundle exec jekyll serve`) i potwierdziłem poprawność działania środowiska.

2. **Testowanie integracji z GitHub**  
    Wykonałem testowy commit oraz push zmian z Codespaces do repozytorium na GitHub. Sprawdziłem, czy workflow GitHub Pages poprawnie buduje stronę po wypchnięciu zmian.

3. **Dodanie nowego posta**  
    Utworzyłem nowy plik postu w katalogu `_posts`, uzupełniłem metadane i treść. Przetestowałem lokalnie, czy post pojawia się na stronie. Po potwierdzeniu działania, wypchnąłem zmiany na GitHub.

4. **Weryfikacja działania na GitHub Pages**  
    Po wypchnięciu zmian, sprawdziłem status builda na GitHub Pages. Zweryfikowałem, że nowy post jest widoczny na stronie produkcyjnej.

## Wnioski

- Codespaces znacząco ułatwia pracę z Jekyll i automatyzuje proces wdrożenia.
- Integracja z GitHub Pages działa bezproblemowo, a workflow jest szybki i przewidywalny.
- Dodawanie nowych postów oraz testowanie zmian lokalnie przed wypchnięciem na produkcję pozwala uniknąć błędów.