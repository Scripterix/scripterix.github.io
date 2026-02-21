---
layout: post
title: "Post #2 – Język Markdown"
date: 2024-10-02
categories:
  - "coding corner"
lang: pl
translation_id: markdown-basics
writing_hours: 2
---

## Czym jest Markdown?

Markdown to lekki język znaczników, który pozwala formatować tekst przy pomocy prostych znaków. Zamiast klikać w przyciski edytora, używasz gwiazdek, krzyżyków i backticków, dzięki czemu treść pozostaje czytelna nawet w zwykłym pliku `.md`.

## Gdzie znajdziesz Markdown

- Dokumentacja techniczna i README na GitHubie, GitLabie czy Bitbuckecie
- Notatniki i aplikacje typu second brain (Obsidian, Notion, Joplin)
- Blogi budowane w generatorach statycznych, np. Jekyll lub Hugo
- Komunikatory i narzędzia zespołowe, takie jak Slack czy Discord

## Najważniejsze zalety

- **Łatwość użycia** — składnia jest intuicyjna i łatwa do zapamiętania
- **Lekkość** — zwykły plik tekstowy, który otworzysz na każdym urządzeniu
- **Uniwersalność** — łatwo konwertujesz do HTML, PDF, prezentacji czy wpisów na blogu
- **Wsparcie narzędzi** — szerokie wsparcie w IDE, CMS-ach i platformach programistycznych

## Podstawy składni

### Nagłówki

- `#` – Nagłówek 1 (najważniejszy tytuł)
- `##` – Nagłówek 2
- `###` – Nagłówek 3 i kolejne poziomy

### Wyróżnienia

- `*Tekst kursywą*`
- `**Tekst pogrubiony**`
- `~~Tekst przekreślony~~`

Efekt końcowy: *kursywa*, **pogrubienie**, ~~przekreślenie~~.

### Listy

```markdown
- Element 1
- Element 2
  - Zagnieżdżony element 2a
  - Zagnieżdżony element 2b
```

### Linki

```markdown
[Link do strony](https://www.example.com)
[Link z tytułem](https://www.example.com "Opis linku")
```

### Cytaty i kod

> To jest cytat w stylu notatki.

`polecenie --help`

```markdown
function dodaj(a, b) {
  return a + b;
}
```

## Co dalej?

Markdown to świetny punkt startowy dla tworzenia blogów, notatek i dokumentacji. Wybierz ulubione narzędzie, zacznij od prostych nagłówków i list, a potem stopniowo dodawaj kolejne elementy. Regularna praktyka sprawi, że składnia stanie się automatyczna.
