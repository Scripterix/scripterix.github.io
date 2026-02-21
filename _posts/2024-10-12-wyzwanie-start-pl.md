---
layout: post
lang: pl
title: "Wyzwanie: Start"
description: "Rozpoczynam wyzwanie 10 000 h programowania."
date: 2024-10-12
categories:
  - "coding corner"
translation_id: post-6-start-wyzwanie
writing_hours: 2
---
## Zdecydowałem się na ambitne wyzwanie: przeznaczyć **10 000 godzin** na naukę i praktykę programowania

Zaczynam wyzwanie z nauką oraz przypominaniem sobie całej wiedzy, która jakby trochę się "zakurzyła". Ubieram działanie w bardziej ustrukturyzowany system pracy.

Zaczynając od ogółu do szczegółu ... Word Press i projekt Telomers.pl - zmęczony z zawiłościami CMS WP, zdecydowałem się że, będzie przeróbka na to co potrzebuje i potrafię szybko dopisać np opcje, funkcjonalność lub sposób rozwijania projektu. WordPress zjada tak wiele niepotrzebnego czasu na odgawywanie jak się robi coś na okrętkę. Szablony CSS w bazie i w notacji JSON. Dodatkowo używanie hooks aby dodać swoje. Można dodać stylesheet jedną linijką w kodzie.  Jest trochę pracy z przepisaniem na proste PHP HTML ale potem będzie znacznie łatwiej rozbudować treść.

Przypominam sobie PHP i będę testował modrewrite do celów zbudowania linków bez tyldy nazwa-pliku.html. Do projektu oraz na bazie fuse.js testowałem kilka możliwośći wyszukiwraki. Ciekawe jest w fuse wiele możliwość i podejść do wyszukiwania.

## Fuse.js doskonała biblioteka do wyszukiwania z rozmyciem

### Kawał dobrego kodu Fuse.js

Fuse.js Jest to potężna ale lekka biblioteka do przeszukiwania z rozmyciem, która nie wymaga żadnych zależności. Jest często wykorzystywana do implementowania funkcji wyszukiwania z możliwością pomyłek w aplikacjach internetowych.

Biblioteka ta umożliwia przeprowadzanie przeszukiwań z rozmyciem, co oznacza, że można znaleźć ciągi znaków, które są zbliżone do danego wzorca, a nie dokładnie takie same. Jest to przydatne, gdy użytkownik może popełnić literówki lub gdy chcemy zapewnić bardziej elastyczne wyszukiwanie.

Przykład użycia, pokazuje, jak łatwo można skonfigurować i użyć Fuse.js do przeszukiwania listy elementów (na przykład książek) w zadanym zakresie kluczy (tutaj tytuł i imię autora). W ten sposób można szybko uzyskać listę wyników pasujących do podanego wzorca. Fuse jest proste i szybkie jak 1 2 3 poniżej.

```js
// 1. List of items to search in
const books = [
  { title: "Old Man's War", author: { firstName: 'John', lastName: 'Scalzi' } },
  { title: 'The Lock Artist', author: { firstName: 'Steve', lastName: 'Hamilton' } }
]

// 2. Set up the Fuse instance
const fuse = new Fuse(books, { keys: ['title', 'author.firstName'] })

// 3. Now search!
const results = fuse.search('jon')

// Output:
// [
//   {
//     item: {
//       title: "Old Man's War",
//       author: { firstName: 'John', lastName: 'Scalzi' }
//     },
//     refIndex: 0
//   }
// ]
```

Przykłady użycia fizzy search**

Na GitHub znalazłem repo wyszukujące z przygotowanych odpowiedzi - bardzo łatwe do implementacji FAQ oraz dodałem swoje repo. W moim przykładzie zastosowałem ścisłe dopasowanie zatem wyszukując Jagody i jagody robi różnicę. Dodatkowo jest tworzony link ale będę to dopracowywał gdyż chciałbym aby przechodził ( skrolował ) do odpowiedniego fragmentu. Dodatkowo wyszukiwanie jest w Modalu Ui jest Bootstrapowy.

My Repo GH search - [Scripterix - fuse search](https://github.com/Scripterix/fuse-search)

Repo GH FAQ type MehediHasan06 - [fuse search](https://github.com/MehediHasan06/fuse-search)
