---
layout: post
lang: pl
title: "Post #61 Tablice w PHP - Część 1"
date: 2024-10-18 16:31:49
author: Scripterix
translation_id: tablice-w-php-czesc-1
categories:
  - "Coding Corner"
  - "Wyzwanie"
tags:
  - "php"
  - "tablice"
writing_hours: 4
---

# Tablice w PHP - Część 1 - Podstawy i struktura danych
Tablice umożliwiają przechowywanie i organizowanie wielu wartości w jednej zmiennej.
Tablice to jedna z najważniejszych struktur danych w PHP

Tablice umożliwiają przechowywanie i organizowanie wielu wartości w jednej zmiennej. W tym artykule omówimy podstawy pracy z tablicami, ich typy oraz najczęstsze zastosowania. 

W tablicy w PHP możemy przechowywać wiele wartości jednocześnie, co pozwala nam na bardziej efektywne zarządzanie danymi. Dzięki tablicom możemy grupować informacje w logiczny sposób i łatwo nimi operować w naszym kodzie. Jest to bardzo przydatne narzędzie podczas tworzenia aplikacji webowych czy systemów informatycznych.

## Czym są tablice w PHP?

Tablica w PHP to uporządkowana mapa, która łączy wartości z kluczami. Jest to niezwykle elastyczna struktura danych, która może pełnić rolę tradycyjnej tablicy, listy, tablicy asocjacyjnej (hash table), słownika, kolekcji, stosu, kolejki i wielu innych struktur.

<?php
// Podstawowa tablica
$fruits = array("jabłko", "banan", "pomarańcza");

// Alternatywna składnia (od PHP 5.4)
$colors = ["czerwony", "niebieski", "zielony"];
?>

## Tablice indeksowane kontra tablice asocjacyjne

### Tablice indeksowane

Tablice indeksowane używają liczbowych indeksów, które automatycznie zaczynają się od 0:

<?php
// Tworzenie tablicy indeksowanej
$numbers = [10, 20, 30, 40, 50];

// Dostęp do elementów
echo $numbers[0]; // Wyświetli: 10
echo $numbers[2]; // Wyświetli: 30

// Dodawanie elementów
$numbers[] = 60; // Dodaje na końcu
$numbers[10] = 100; // Dodaje na pozycji 10

// Sprawdzanie długości
echo count($numbers); // Wyświetli liczbę elementów
?>

### Tablice asocjacyjne

Tablice asocjacyjne używają nazwanych kluczy zamiast indeksów numerycznych. Tablice w PHP, czyli tablice asocjacyjne, są strukturami danych umożliwiającymi przechowywanie wielu wartości pod jednym kluczem. W przypadku tablicy używanej w PHP, indeksami mogą być nie tylko liczby, ale także ciągi znaków. Dzięki temu, tablice w PHP są bardzo elastyczne i mogą być łatwo dostosowywane do różnych potrzeb programistycznych. Warto również zauważyć, że tablice w PHP mogą przechowywać różne typy danych, takie jak liczby, łańcuchy znaków, czy nawet inne tablice. Pozwala to na tworzenie złożonych struktur danych i efektywne zarządzanie nimi w trakcie tworzenia aplikacji. :

<?php
// Tworzenie tablicy asocjacyjnej
$person = [
    "name" => "Jan",
    "surname" => "Kowalski",
    "age" => 30,
    "city" => "Warszawa"
];

// Dostęp do elementów
echo $person["name"]; // Wyświetli: Jan
echo $person["age"];  // Wyświetli: 30

// Dodawanie nowych elementów
$person["email"] = "jan@example.com";
$person["phone"] = "123-456-789";

// Modyfikacja istniejących elementów
$person["age"] = 31;
?>

## Identyfikacja elementów tablicy

PHP oferuje kilka sposobów na sprawdzanie zawartości tablicy. PHP oferuje kilka sposobów na sprawdzanie zawartości tablicy, w tym funkcje array_key_exists(), isset() oraz empty(). Te funkcje pozwalają programiście efektywnie zarządzać danymi w tablicach i sprawdzać ich zawartość w zależności od konkretnych potrzeb. Dzięki nim, można sprawdzić czy dany klucz istnieje w tablicy, czy element tablicy jest zdefiniowany oraz czy tablica jest pusta. Korzystanie z tych funkcji jest kluczowe dla skutecznego i bezpiecznego zarządzania danymi w PHP:

<?php
$data = [
    "user" => "admin",
    "password" => "secret",
    "role" => "administrator"
];

// Sprawdzanie czy klucz istnieje
if (array_key_exists("user", $data)) {
    echo "Klucz 'user' istnieje";
}

// Sprawdzanie czy wartość istnieje
if (in_array("admin", $data)) {
    echo "Wartość 'admin' istnieje w tablicy";
}

// Sprawdzanie czy element jest ustawiony
if (isset($data["password"])) {
    echo "Hasło jest ustawione";
}

// Sprawdzanie czy element nie jest pusty
if (!empty($data["role"])) {
    echo "Rola użytkownika: " . $data["role"];
}
?>

## Przechowywanie różnych typów danych

Tablice PHP mogą przechowywać wartości różnych typów/ W tablicy mogą znaleźć się różne typy danych, takie jak liczby (1, 2, 3, etc), tekst czy nawet inne tablice. Dzięki tej możliwości, tablice w PHP stają się bardzo elastycznym narzędziem do przechowywania i manipulacji danymi w programowaniu.

:

<?php
$mixed_data = [
    "string" => "To jest tekst",
    "number" => 42,
    "float" => 3.14,
    "boolean" => true,
    "null_value" => null,
    "array" => [1, 2, 3],
    "object" => new stdClass()
];

// Iteracja przez tablicę
foreach ($mixed_data as $key => $value) {
    echo $key . ": " . gettype($value) . "\n";
}
?>

## Tablice wielowymiarowe

Tablice mogą zawierać inne tablice, tworząc struktury wielowymiarowe. W przypadku tablic wielowymiarowych w PHP, możemy tworzyć zagnieżdżone struktury danych, gdzie każdy element tablicy może być również tablicą. Na przykład, możemy stworzyć tablicę przechowującą informacje o różnych użytkownikach, gdzie każdy użytkownik będzie miał swoje własne dane, takie jak imię, nazwisko, wiek itp. Dzięki tablicom wielowymiarowym możemy łatwo zarządzać bardziej skomplikowanymi strukturami danych, co jest przydatne w bardziej zaawansowanych projektach PHP :

:

<?php
// Dwuwymiarowa tablica
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Dostęp do elementów
echo $matrix[1][2]; // Wyświetli: 6

// Tablica asocjacyjna wielowymiarowa
$users = [
    [
        "id" => 1,
        "name" => "Jan Kowalski",
        "email" => "jan@example.com",
        "skills" => ["PHP", "JavaScript", "MySQL"]
    ],
    [
        "id" => 2,
        "name" => "Anna Nowak",
        "email" => "anna@example.com",
        "skills" => ["Python", "Django", "PostgreSQL"]
    ]
];

// Dostęp do zagnieżdżonych elementów
echo $users[0]["name"]; // Jan Kowalski
echo $users[1]["skills"][0]; // Python
?>

## Podstawowe operacje na tablicach

### Jak dodawać elementy do tablicy? Polecenie .**array_push** dodaje na końcu nowy element a **.array_unshift** na początku. Element może być także wstawiany w określonym miejscu poleceniem .**array_splice**($fruits, 2, 0, ["kiwi", "mango"]);

<?php
$fruits = ["jabłko", "banan"];

// Dodawanie na końcu
$fruits[] = "pomarańcza";
array_push($fruits, "gruszka", "śliwka");

// Dodawanie na początku
array_unshift($fruits, "truskawka");

// Wstawianie w określonym miejscu
array_splice($fruits, 2, 0, ["kiwi", "mango"]);

print_r($fruits);
?>

### Usuwanie elementów analogicznie do dodawania zmienia się składnia na pop -ostatni i shift - pierwszy element.

<?php
$numbers = [1, 2, 3, 4, 5];

// Usuwanie ostatniego elementu
$last = array_pop($numbers);

// Usuwanie pierwszego elementu
$first = array_shift($numbers);

// Usuwanie konkretnego elementu
unset($numbers[1]);

// Usuwanie wielu elementów
array_splice($numbers, 1, 2);

print_r($numbers);
?>

## Praktyczne przykłady zastosowań

Poniższe najprostsze przykłady uwzględniają, przechowywanie konfiguracji, danych z formularza i menu nawigacyjne.

### 1. Przechowywanie konfiguracji

<?php
$config = [
    "database" => [
        "host" => "localhost",
        "port" => 3306,
        "name" => "myapp",
        "charset" => "utf8"
    ],
    "cache" => [
        "enabled" => true,
        "ttl" => 3600
    ],
    "debug" => false
];

// Dostęp do konfiguracji
$db_host = $config["database"]["host"];
?>

### 2. Przechowywanie danych z formularza

<?php
if ($_POST) {
    $form_data = [
        "name" => $_POST["name"] ?? "",
        "email" => $_POST["email"] ?? "",
        "message" => $_POST["message"] ?? "",
        "timestamp" => date("Y-m-d H:i:s")
    ];
    
    // Walidacja danych
    $errors = [];
    
    if (empty($form_data["name"])) {
        $errors[] = "Imię jest wymagane";
    }
    
    if (!filter_var($form_data["email"], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Nieprawidłowy adres email";
    }
    
    if (empty($errors)) {
        // Przetwarzanie danych
        processFormData($form_data);
    }
}
?>

### 3. Tworzenie menu nawigacyjnego

<?php
$navigation = [
    [
        "title" => "Strona główna",
        "url" => "/",
        "active" => true
    ],
    [
        "title" => "O nas",
        "url" => "/about",
        "active" => false
    ],
    [
        "title" => "Usługi",
        "url" => "/services",
        "active" => false,
        "submenu" => [
            ["title" => "Tworzenie stron", "url" => "/services/web-design"],
            ["title" => "SEO", "url" => "/services/seo"],
            ["title" => "Marketing", "url" => "/services/marketing"]
        ]
    ],
    [
        "title" => "Kontakt",
        "url" => "/contact",
        "active" => false
    ]
];

// Generowanie menu HTML
function generateMenu($items) {
    echo "<ul>";
    foreach ($items as $item) {
        $class = $item["active"] ? "active" : "";
        echo "<li class='{$class}'>";
        echo "<a href='{$item["url"]}'>{$item["title"]}</a>";
        
        if (isset($item["submenu"])) {
            generateMenu($item["submenu"]);
        }
        
        echo "</li>";
    }
    echo "</ul>";
}
?>

## Najczęstsze błędy i jak ich unikać

### 1. Sprawdzanie istnienia kluczy

<?php
// BŁĄD - może generować Notice
echo $array["key"];

// POPRAWNIE
echo $array["key"] ?? "domyślna wartość";

// lub
if (isset($array["key"])) {
    echo $array["key"];
}
?>

### 2. Iteracja przez tablice

<?php
$data = ["a" => 1, "b" => 2, "c" => 3];

// POPRAWNIE - z kluczami
foreach ($data as $key => $value) {
    echo "{$key}: {$value}\n";
}

// POPRAWNIE - tylko wartości
foreach ($data as $value) {
    echo $value . "\n";
}
?>

## QA Tablice

**Q:** Jeśli chcę zapisać w tablicy różne typy danych w PHP, czy to możliwe?**A:** Tak, tablice w PHP mogą przechowywać różne typy danych jednocześnie, np. liczby, łańcuchy znaków, wartości logiczne, a nawet inne tablice czy obiekty. Dzięki temu możesz tworzyć złożone struktury danych w prosty sposób.

**Q:** Jeśli próbuję odwołać się do nieistniejącego klucza w tablicy, co się stanie?**A:** PHP wygeneruje ostrzeżenie typu **Notice: Undefined index**, dlatego warto zawsze sprawdzać istnienie klucza funkcją isset() lub zastosować operator łączenia z wartością domyślną ??.

**Q:** Jeśli chcę dodać nowy element do tablicy asocjacyjnej w PHP, jak to zrobić?**A:** Wystarczy przypisać wartość do nowego klucza, np. $person["email"] = "test@example.com";.

## Podsumowanie

Tablice w PHP to potężne narzędzie, które umożliwia efektywne zarządzanie danymi. W pierwszej części artykułu omówiliśmy:

- Różnice między tablicami indeksowanymi a asocjacyjnymi

- Sposoby identyfikacji elementów

- Podstawowe operacje dodawania i usuwania

- Praktyczne przykłady zastosowań

W drugiej części artykułu[ **Post #62 Tablice część II**](https://opengateweb.com/posts/post-62-php-tablice-czesc-ii/) poznamy zaawansowane techniki pracy z tablicami, w tym funkcje do manipulacji, sortowania, filtrowania oraz konwersji między różnymi formatami danych.

*OpenGate Web - Twój partner w rozwoju aplikacji PHP*