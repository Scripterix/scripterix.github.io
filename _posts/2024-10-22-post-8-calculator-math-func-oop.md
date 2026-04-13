---
lang: pl
translation_id: post-8-calculator-math-func-oop
title: "Post #8 Calculator OOP — obiektowy kalkulator z funkcjami matematycznymi"
date: 2024-10-22 01:28:34 +0100
author: Scripterix
categories:
        - "Coding Corner"
        - "Wyzwanie"
writing_hours: 2
---

# Prosty Calculator — funkcjonalne i obiektowe podejście

 Poniżej znajduje się uporządkowana i czytelna wersja przykładu kalkulatora z dwiema realizacjami: podejściem funkcyjnym (prostym, manipulującym DOM) oraz obiektowym (klasy ES6). W kodzie znajdują się też krótkie przykłady konstruktorów `Person`.

 GitHub: sprawdź repozytorium projektu (jeśli jest dostępne).

## Przykład — podejście funkcyjne

 ```js
 // pobranie elementów
 const input1 = document.getElementById('input1');
 const input2 = document.getElementById('input2');
 const input3 = document.getElementById('input3');

 const input4 = document.getElementById('input4');
 const input5 = document.getElementById('input5');
 const input6 = document.getElementById('input6');

 // logi (debug)
 console.log(input4, input5, input6);

 // obsługa zdarzeń i funkcje
 input1.addEventListener('mouseout', sum);
 input2.addEventListener('mouseout', sum);

 function sum() {
         const result = parseInt(input1.value || 0, 10) + parseInt(input2.value || 0, 10);
         input3.value = result;
         console.log(result);
 }

 input4.addEventListener('mouseout', sub);
 input5.addEventListener('mouseout', sub);

 function sub() {
         const result = parseInt(input4.value || 0, 10) - parseInt(input5.value || 0, 10);
         input6.value = result;
         console.log(result);
 }
 ```

## Przykład — podejście obiektowe (OOP)

 ```js
 class Calculator {
         calculate(operand1, operator, operand2) {
                 switch (operator) {
                         case '+': return operand1 + operand2;
                         case '-': return operand1 - operand2;
                         default: return NaN; // invalid operator
                 }
         }
 }

 const calculator = new Calculator();

 document.getElementById('calculate').addEventListener('click', () => {
         const operand1 = parseFloat(document.getElementById('operand1').value) || 0;
         const operator = document.getElementById('operator').value.trim();
         const operand2 = parseFloat(document.getElementById('operand2').value) || 0;

         const result = calculator.calculate(operand1, operator, operand2);
         if (!Number.isNaN(result)) {
                 document.getElementById('result').value = result;
         } else {
                 alert('Invalid operator! Please enter "+" or "-".');
         }
 });

 class Calculator2 {
         constructor() {
                 this.result = 0;
         }

         add(a, b) {
                 this.result = a + b;
                 return this.result;
         }
 }
 ```

## Przykłady tworzenia obiektów Person

 ```js
 // konstruktor (stare podejście)
 function Person(name, age) {
         this.name = name;
         this.age = age;
 }

 const person1 = new Person('John', 30);
 console.log(person1);

 // klasa ES6
 class Person2 {
         constructor(name, age) {
                 this.name = name;
                 this.age = age;
         }
 }

 const person2 = new Person2('Alice', 25);
 console.log(person2);

 const sumOfAges = person1.age + person2.age;
 console.log('Suma wieku osób:', sumOfAges);
 ```

## Analiza — kiedy używać którego podejścia

- **Podejście funkcyjne:** proste implementacje, szybkie do napisania, dobre dla małych form i skryptów.
- **Podejście OOP:** lepsza organizacja, łatwiejsze rozszerzanie i testowanie, kiedy potrzebujesz wielu instancji i przechowywania stanu.

| Cecha | Funkcyjne | OOP |
|---|---:|---:|
| Organizacja kodu | funkcje i procedury | klasy i obiekty |
| Przechowywanie stanu | brak/tymczasowe | stan w obiektach (this) |
| Reużywalność | ograniczona | łatwa (instancje) |
| Skalowalność | trudniejsza | łatwiejsza |

## Wskazówki i dalsze kroki

- Poprawić walidację wejścia (np. obsługa liczb zmiennoprzecinkowych, walidacja operatora).
- Wydzielić logikę kalkulatora do modułu, żeby ułatwić testy jednostkowe.
- Ujednolicić UI i dodać czytelne komunikaty błędów.

**Kalkulator ma solidną bazę** — kolejne kroki to rozbudowa operatorów i dopracowanie UX.
GitHub Calculator Repo

```js
let input1 = document.getElementById('input1'); let input2 = document.getElementById('input2'); let input3 = document.getElementById('input3');

let input4 = document.getElementById('input4'); let input5 = document.getElementById('input5'); let input6 = document.getElementById('input6');

console.log(input4); console.log(input5); console.log(input6);

// Function

input1.addEventListener('mouseout', sum); input2.addEventListener('mouseout', sum);

function sum() { let result = parseInt(input1.value || 0) + parseInt(input2.value || 0); input3.value = result; console.log(input3.value); }

input4.addEventListener('mouseout', sub); input5.addEventListener('mouseout', sub);

function sub() { let result = parseInt(input4.value || 0) - parseInt(input5.value || 0); input6.value = result; console.log(input6.value); }

// OOP version

class Calculator { calculate(operand1, operator, operand2) { switch (operator) { case '+': return operand1 + operand2; case '-': return operand1 - operand2; default: return NaN; // Invalid operator } } }

const calculator = new Calculator();

document.getElementById('calculate').addEventListener('click', function () { const operand1 = parseFloat(document.getElementById('operand1').value) || 0; const operator = document.getElementById('operator').value.trim(); const operand2 = parseFloat(document.getElementById('operand2').value) || 0;

const result = calculator.calculate(operand1, operator, operand2); if (!isNaN(result)) { document.getElementById('result').value = result; } else { alert('Invalid operator! Please enter "+" or "-".'); } });

class Calculator2 { constructor() { this.result = 0; }

add(a, b) { this.result = a + b; } }

// Extra OOP example Person

function Person(name, age) { this.name = name; this.age = age; }

let person1 = new Person("John", 30);

console.log(person1);

class Person2 { constructor(name, age) { this.name = name; this.age = age; } }

let person2 = new Person("Alice", 25);

console.log(person2);

let sumOfAges = person1.age + person2.age;

console.log('Suma wieku osób: ', sumOfAges);
```

## Kalkulator jest do rozwinięcia i poprawy UI. Poniżej omówienie kodu i podejścia.

Analiza kodu — podejście funkcyjne vs. OOP
Twój kod przedstawia dwa podejścia do realizacji obliczeń: funkcyjne (proceduralne) oraz obiektowe (OOP). Omówię je krok po kroku.

### Podejście funkcyjne
Kod obsługuje proste operacje dodawania i odejmowania, wykorzystując manipulację DOM oraz zdarzenia.

```js
// Pobranie elementów HTML
let input1 = document.getElementById('input1');let input2 = document.getElementById('input2');let input3 = document.getElementById('input3');let input4 = document.getElementById('input4');let input5 = document.getElementById('input5');let input6 = document.getElementById('input6');

// Kod pobiera referencje do pól formularza (input) na stronie.

// Logowanie wartości pól input
console.log(input4);console.log(input5);console.log(input6);

// Wypisuje w konsoli referencje do trzech pól input, ale same wartości nie są jeszcze dostępne.

// Obsługa zdarzeń "mouseout"
input1.addEventListener('mouseout', sum);input2.addEventListener('mouseout', sum);

// Gdy użytkownik opuści pole input1 lub input2, wywołana zostanie funkcja sum().
input4.addEventListener('mouseout', sub);input5.addEventListener('mouseout', sub);

// Gdy użytkownik opuści pole input4 lub input5, wywołana zostanie funkcja sub().
// Funkcja sum() — dodawanie liczb
function sum() { let result = parseInt(input1.value || 0) + parseInt(input2.value || 0); input3.value = result; console.log(input3.value);}

// Pobiera wartości z input1 i input2, konwertuje je na liczby (parseInt).

// Jeśli pole jest puste, przyjmuje 0.

// Oblicza sumę i wpisuje wynik do input3.
// Funkcja sub() — odejmowanie liczb
function sub() { let result = parseInt(input4.value || 0) - parseInt(input5.value || 0); input6.value = result; console.log(input6.value);}

//Pobiera wartości z input4 i input5, konwertuje je na liczby. Wykonuje odejmowanie.Wstawia wynik do input6.
```


### Podejście obiektowe (OOP)
Podejście obiektowe wykorzystuje klasy, które umożliwiają lepszą organizację kodu i jego ponowne użycie.

1. Klasa Calculator
```js
class Calculator { calculate(operand1, operator, operand2) { switch (operator) { case '+': return operand1 + operand2; case '-': return operand1 - operand2; default: return NaN; // Invalid operator } }}
```

Klasa zawiera metodę calculate(), która obsługuje różne operatory.

W zależności od przekazanego operatora (+ lub -), zwraca odpowiedni wynik.

2. Tworzenie instancji klasy i obsługa kliknięcia

```js
const calculator = new Calculator();

// Tworzymy obiekt klasy Calculator.
document.getElementById('calculate').addEventListener('click', function () { const operand1 = parseFloat(document.getElementById('operand1').value) || 0; const operator = document.getElementById('operator').value.trim(); const operand2 = parseFloat(document.getElementById('operand2').value) || 0; const result = calculator.calculate(operand1, operator, operand2); if (!isNaN(result)) { document.getElementById('result').value = result; } else { alert('Invalid operator! Please enter "+" or "-".'); } });
```

Po kliknięciu przycisku calculate:

Pobiera wartości operand1, operator, operand2.

Wywołuje metodę calculate() obiektu calculator.

Wstawia wynik do pola result lub pokazuje alert o błędzie.

3. Klasa Calculator2
```js 
class Calculator2 { constructor() { this.result = 0; } add(a, b) { this.result = a + b; }}
```

Calculator2 zawiera właściwość result i metodę add(), ale jej instancja nie jest używana w kodzie.

4. Tworzenie obiektów Person
Funkcja konstrukcyjna (stare podejście)

```js
function Person(name, age) { this.name = name; this.age = age;}let person1 = new Person("John", 30);console.log(person1);

// Tworzy obiekt person1 z właściwościami name i age.
Klasa Person2 (nowoczesne podejście)
class Person2 { constructor(name, age) { this.name = name; this.age = age; } }let person2 = new Person("Alice", 25);console.log(person2);
```

Tworzy obiekt person2 używając nowoczesnej składni ES6 (class).

5. Obliczanie sumy wieku
```js
let sumOfAges = person1.age + person2.age;console.log('Suma wieku osób: ', sumOfAges);
```

Dodaje age obiektów person1 i person2 i wyświetla wynik.

### Podsumowanie — różnice między podejściem funkcyjnym a OOP

Cecha | Podejście funkcyjne | Podejście OOP
---|---|---
Organizacja kodu | Funkcje niezależne | Klasy i obiekty
Przechowywanie stanu | Brak (wszystko lokalnie w funkcjach) | Obiekty przechowują stan (this.result)
Reużywalność | Funkcje działają niezależnie | Można tworzyć wiele instancji klasy
Czytelność | Prosty kod, ale trudny do rozbudowy | Bardziej rozbudowany, ale łatwiejszy w utrzymaniu

Kiedy używać którego podejścia?

Jeśli kod jest prosty i nie wymaga wielu operacji → podejście funkcjonalne.

Jeśli kod ma być rozszerzalny i wielokrotnego użytku → podejście OOP.
