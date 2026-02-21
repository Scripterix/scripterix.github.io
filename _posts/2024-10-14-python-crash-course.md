---
layout: post
lang: pl
title: "Post #10 Python Crash Course"
date: 2024-10-14 14:33:36
author: Scripterix
translation_id: python-crash-course
categories:
    - "Coding Corner"
tags:
    - "crash-course"
    - "python"
writing_hours: 3
---
Dodatkowy język czemu nie. Python przydaje się do AI i ma dużo ciekawych zastosowań. Zatem zaczynam kurs podstaw "co gdzie jak". Zwarzywszy na popularność tego języka oraz szerokie zastosowania do Maszynowego Uczenia postanawiam się go nauczyć.

## **Python - Crash Course Python Post #10**

## **Opis języka**

Python to potężny, wysokopoziomowy język programowania znany ze swojej prostoty i czytelności. Został stworzony przez Guido van Rossuma i po raz pierwszy wydany w 1991 roku. Filozofia projektowa Pythona kładzie nacisk na czytelność kodu, co wyróżnia go znaczące wykorzystanie białych znaków.

Jedną z kluczowych cech Pythona jest jego wszechstronność; może być używany do szerokiego zakresu zastosowań, od tworzenia stron internetowych przez analizę danych, sztuczną inteligencję, obliczenia naukowe, po wiele innych. Obsługuje wiele paradygmatów programowania, w tym programowanie proceduralne, obiektowe i funkcyjne.

## **Biblioteki Python**

Python posiada dużą i aktywną społeczność, która przyczynia się do jego obszernej biblioteki standardowej oraz licznych pakietów i frameworków innych firm, takich jak Django do tworzenia stron internetowych, NumPy i Pandas do analizy danych, TensorFlow i PyTorch do uczenia maszynowego, oraz wiele innych.

Jego łatwość nauki i solidność sprawiają, że Python jest popularnym wyborem zarówno dla początkujących, jak i doświadczonych programistów. Dodatkowo, interpreter Pythona oraz obszerna dokumentacja sprawiają, że jest on dostępny i łatwy w użyciu na różnych systemach operacyjnych.

[Python Org](https://www.python.org/) to link do zasobów języka.

## **Kurs który przerabiam**

Kurs podstaw stworzony przez [Traversy Media Python CC](https://youtu.be/JJmcL1N2KQs?si=z3Ep76w1zHUxHud_) jest wystarczający do opanowania podstaw. Poniżej są pliki do podzielonych różnych właściwości i metod zapisu języka.

[Python_sandbox/python_sandbox_starter](https://github.com/bradtraversy/python_sandbox/tree/master/python_sandbox_starter)

**Już zrobione** - variables if loop i inne przykłady prostej składni. Jeśli utkniesz i nie wiesz jak przygotować środowisko do pracy z Python możesz zrobić to według szybkiego przepisu - [Jak zacząć naukę Pythona w Windows i Visual Studio Code](https://opengateweb.com/posts/jak-zaczac-nauke-pythona-w-windows-i-visual-studio-code-post-70/)

Comments

Variable Rules

"""

x = 1            # int

y = 2.5          # float

name = 'John'    # str

is_cool = True   # bool

a = x + y

print(type(x))

print(a)

## Instrukcje warunkowe (if)

if is_cool:

    print("John is cool!")  # Wyświetla komunikat, jeśli is_cool jest prawdą

## Pętla (for)

for i in range(5):

    print(i)  # Wyświetla liczby od 0 do 4

## Funkcje

def greet(name):

    print("Hello, " + name)

greet("Alice")  # Wywołuje funkcję greet z argumentem "Alice" i wyświetla powitanie

## Metody

sentence = "Python is awesome!"

print(sentence.upper())  # Wyświetla zdanie w dużych literach

### W pliku python.py zamieniamy liczby na binarne

print(bin(5))
print(bin(1))
wszystkie = "".join(bin[i](2:) for i in range(1, 22))
print(wszystkie)

### Plik zgadnij,py zawiera namiastkę logiki i polega na zgadnięciu liczby w mini skrypcie Python

import random

def zgadnij_liczbe():
    sekretny = random.randint(1, 100)  # losuje od 1 do 100
    print("Zgadnij liczbę od 1 do 100!")

    while True:
        try:
            strzal = int(input("Podaj liczbę: "))
        except ValueError:
            print("To nie jest liczba! Spróbuj jeszcze raz.")
            continue

        if strzal < sekretny:
            print("Za mało!")
        elif strzal > sekretny:
            print("Za dużo!")
        else:
            print(f"Brawo 🎉! Zgadłeś liczbę {sekretny}")
            break

zgadnij_liczbe()

## Jak wywołać kod  Python w terminalu - można to  zrobić w terminalu i VSC

Jeśli masz plik zgadnij.py w VSC to w terminalu wpisujesz polecenie python <nazwa pliku>

### python zgdanij.py

![Python crash course ](https://opengateweb.com/wp-content/uploads/2025/02/python-crash-course-1340x726.png)

## **Porównanie składni Python i C**

Jedną z cech, która wyróżnia Python spośród innych języków programowania, jest jego skupienie na czytelności i prostocie składni. Python stara się być "zrozumiały" dla programistów poprzez promowanie czytelnego i eleganckiego kodu. Przejrzysta składnia Pythona sprawia, że jest on szczególnie atrakcyjny dla początkujących programistów, ale również dla doświadczonych deweloperów.

Przykładowo, porównajmy Python z językiem C w kontekście prostego programu wypisującego liczby od 1 do 10:

### **Python**

for i in range(1, 11):

    print(i)

### **Język C**

    #include <iostream>

    int main() {
        for (int i = 1; i <= 10; ++i) {
            std::cout << i << std::endl;
        }
        return 0;
    }

    #include <stdio.h>
Choć oba przykłady robią to samo - wypisują liczby od 1 do 10 - różnica w składni jest dość znacząca. Python eliminuje konieczność deklaracji zmiennych i określania typów danych, co sprawia, że kod jest bardziej zwięzły i czytelny. Ponadto, w Pythonie nie ma potrzeby używania nawiasów klamrowych ani średników do oznaczania bloków kodu, co również przyczynia się do jego czytelności.

## **Scrapowanie stron z lib Beatyful Soup**

Możemy użyć Pythona w połączeniu z biblioteką do scrapowania stron internetowych, na przykład BeautifulSoup, aby pobrać dane ze strony HTML. Poniżej znajduje się prosty przykład pokazujący, jak użyć Pythona do pobrania tytułów artykułów z strony internetowej i wyświetlenia ich:

import requests

from bs4 import BeautifulSoup

## Adres URL strony do scrapowania

url = '<https://example.com>'

## Wyślij zapytanie GET do strony i pobierz jej zawartość

response = requests.get(url)

## Sprawdź, czy zapytanie zakończyło się sukcesem (status kod 200)

if response.status_code == 200:

    # Parsuj zawartość strony HTML za pomocą BeautifulSoup

    soup = BeautifulSoup(response.text, 'html.parser')

    # Znajdź wszystkie tytuły artykułów (załóżmy, że są one w tagach <h2>)

    article_titles = soup.find_all('h2')

    # Wyświetl znalezione tytuły artykułów

    for title in article_titles:

        print(title.text)

else:

    print('Nie udało się pobrać zawartości strony.')

W tym **kodzie** najpierw wysyłamy zapytanie GET do wskazanej strony internetowej za pomocą modułu requests. Jeśli zapytanie zostanie pomyślnie zakończone (status kod 200), używamy biblioteki BeautifulSoup, aby sparsować zawartość strony HTML i znaleźć wszystkie tytuły artykułów (przyjmując, że są one w tagach <h2>). Następnie wyświetlamy znalezione tytuły artykułów.

Trochę więcej w perspektywie Server Side i backend, informacji o Python znajdzie tutaj [Post #52 Jakie są Python i PHP](https://opengateweb.com/posts/52-php-python/)

### **Python CDN**
