---
layout: post
lang: pl
title: "Post #57 Vibe Coding Tworzenie formularza CRUD."
date: 2024-10-16 21:55:56
author: Scripterix
translation_id: vibe-coding-formularze-crud
categories:
        - "AI"
        - "Coding Corner"
        - "Wyzwanie"
writing_hours: 3
---

W dzisiejszym świecie programowania wydajność i szybkość pracy stają się kluczowymi czynnikami sukcesu. Jednym z najnowszych trendów jest **Vibe Coding** 

Jest to podejście, które minimalizuje ręczne pisanie kodu na rzecz wykorzystania zaawansowanych narzędzi AI, takich jak GitHub Copilot w trybie Agentic Mode. W tym artykule przedstawimy praktyczny przykład zastosowania tej metody przy tworzeniu interaktywnego formularza CRUD (Create, Read, Update, Delete) z zapisem danych w localStorage.

## Czym jest Vibe Coding?

Vibe Coding to nowoczesne podejście do programowania, które polega na minimalizacji ręcznego pisania kodu poprzez wykorzystanie promtów i narzędzi AI. Zamiast samodzielnego implementowania wszystkich funkcjonalności, programista skupia się na formułowaniu odpowiednich instrukcji dla asystenta AI, który generuje kod. W przypadku naszego eksperymentu, będziemy opierać się na GitHub Copilot w trybie Agentic Mode.

## Agentic Mode w GitHub Copilot – rewolucja w programowaniu.

Agentic Mode to przełomowa funkcja wprowadzona niedawno do GitHub Copilota, która zmienia sposób, w jaki pracujemy z kodem. W przeciwieństwie do standardowego trybu, w którym narzędzie jedynie reaguje na nasze działania, w trybie Agentic Copilot staje się aktywnym współpracownikiem, który:

- Samodzielnie inicjuje działania i sugeruje rozwiązania

- Proaktywnie identyfikuje i naprawia błędy

- Generuje całe funkcje na podstawie opisowych komentarzy

- Sugeruje optymalizacje i usprawnienia istniejącego kodu

- Automatycznie tworzy dokumentację i testy jednostkowe

## Nasz projekt: Formularz CRUD z localStorage

Aby przetestować możliwości Vibe Coding z wykorzystaniem Agentic Mode, stworzymy kompletny formularz umożliwiający zarządzanie danymi użytkowników. Formularz będzie posiadał następujące funkcjonalności:

- Dodawanie nowych wpisów (imię, nazwisko, email)

- Zaznaczanie wierszy do edycji lub usunięcia

- Edytowanie wybranych wpisów

- Usuwanie wpisów

- Automatyczne zapisywanie danych w localStorage przeglądarki

![Formularz i LocalStorage](https://opengateweb.com/wp-content/uploads/2025/05/SimpleForms-1340x685.png)

## Implementacja z wykorzystaniem Agentic Mode

Aby stworzyć nasz formularz, wystarczy przekazać do GitHub Copilot w trybie Agentic odpowiedni opis funkcjonalności. Przyjrzyjmy się, jak wygląda ten proces krok po kroku.

### Krok 1: Przygotowanie struktury HTML

Zaczynamy od opisania struktury naszego formularza w komentarzu:

// Prompt Command

Stwórz strukturę HTML formularza CRUD z polami: imię, nazwisko, email
oraz tabelą do wyświetlania danych

Copilot w trybie Agentic automatycznie generuje kompletną strukturę HTML:

html<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formularz CRUD</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Formularz CRUD z localStorage</h1>
        
        <form id="userForm">
            <input type="hidden" id="userId">
            <div class="form-group">
                <label for="firstName">Imię:</label>
                <input type="text" id="firstName" required>
            </div>
            <div class="form-group">
                <label for="lastName">Nazwisko:</label>
                <input type="text" id="lastName" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-buttons">
                <button type="submit" id="submitBtn">Dodaj</button>
                <button type="button" id="updateBtn" disabled>Aktualizuj</button>
                <button type="button" id="cancelBtn" disabled>Anuluj</button>
            </div>
        </form>
        
        <div class="table-container">
            <table id="userTable">
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Email</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody id="userData">
                    <!-- Dane będą dodawane dynamicznie przez JavaScript -->
                </tbody>
            </table>
        </div>
    </div>
    
    <script src="main.js"></script>
</body>
</html>

### Krok 2: Stylizacja CSS

Następnie dodajemy stylizację:

// Prompt Commandt 

Stwórz style CSS dla formularza i tabeli, aby były estetyczne i responsywne

W odpowiedzi Copilot generuje kompletny arkusz stylów:

css* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"],
input[type="email"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.form-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 30px;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

#submitBtn {
    background-color: #4CAF50;
    color: white;
}

#updateBtn {
    background-color: #2196F3;
    color: white;
}

#cancelBtn {
    background-color: #f44336;
    color: white;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.table-container {
    overflow-x: auto;
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

tr:hover {
    background-color: #f5f5f5;
}

.action-btn {
    padding: 6px 10px;
    margin-right: 5px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.edit-btn {
    background-color: #FFC107;
    color: #000;
}

.delete-btn {
    background-color: #f44336;
    color: white;
}

@media screen and (max-width: 600px) {
    .form-buttons {
        flex-direction: column;
    }
    
    button {
        width: 100%;
    }
    
    th, td {
        padding: 8px;
    }
}

### Krok 3: Implementacja logiki JavaScript

Teraz przyszedł czas na najważniejszą część – implementację funkcjonalności CRUD z zapisem w localStorage:

// Prompt Command 

Stwórz funkcje JavaScript do obsługi formularza CRUD z zapisem w localStorage
Funkcje powinny umożliwiać: dodawanie, edytowanie, usuwanie i wyświetlanie danych

Copilot w trybie Agentic generuje pełną implementację JavaScript:

Implementacja logiki JavaScript dla formularza CRUD

**Code **

// Pobieranie elementów DOM
const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const updateBtn = document.getElementById('updateBtn');
const cancelBtn = document.getElementById('cancelBtn');
const userData = document.getElementById('userData');

// Inicjalizacja tablicy użytkowników z localStorage lub utworzenie pustej tablicy
let users = JSON.parse(localStorage.getItem('users')) || [];

// Funkcja do wyświetlania użytkowników w tabeli
function displayUsers() {
    // Czyszczenie zawartości tabeli
    userData.innerHTML = '';
    
    // Iteracja przez listę użytkowników i dodawanie ich do tabeli
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${index}">Edytuj</button>
                <button class="action-btn delete-btn" data-id="${index}">Usuń</button>
            </td>
        `;
        userData.appendChild(row);
    });
    
    // Dodanie obsługi zdarzeń dla przycisków edycji i usuwania
    addEventListeners();
    
    // Aktualizacja localStorage
    saveToLocalStorage();
}

// Funkcja do zapisywania danych w localStorage
function saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Funkcja do dodawania obsługi zdarzeń dla przycisków edycji i usuwania
function addEventListeners() {
    // Dodawanie obsługi zdarzenia dla przycisków edycji
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const userId = e.target.getAttribute('data-id');
            editUser(userId);
        });
    });
    
    // Dodawanie obsługi zdarzenia dla przycisków usuwania
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const userId = e.target.getAttribute('data-id');
            deleteUser(userId);
        });
    });
}

// Funkcja do edycji użytkownika
function editUser(userId) {
    // Pobranie użytkownika o podanym ID
    const user = users[userId];
    
    // Wypełnienie formularza danymi użytkownika
    userIdInput.value = userId;
    firstNameInput.value = user.firstName;
    lastNameInput.value = user.lastName;
    emailInput.value = user.email;
    
    // Zmiana przycisków
    submitBtn.style.display = 'none';
    updateBtn.style.display = 'inline-block';
    updateBtn.disabled = false;
    cancelBtn.style.display = 'inline-block';
    cancelBtn.disabled = false;
}

// Funkcja do usuwania użytkownika
function deleteUser(userId) {
    // Potwierdzenie usunięcia użytkownika
    if (confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
        // Usunięcie użytkownika z tablicy
        users.splice(userId, 1);
        
        // Aktualizacja wyświetlania i localStorage
        displayUsers();
    }
}

// Funkcja do resetowania formularza
function resetForm() {
    userForm.reset();
    userIdInput.value = '';
    submitBtn.style.display = 'inline-block';
    updateBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

// Obsługa zdarzenia submit dla formularza - dodawanie nowego użytkownika
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Pobranie wartości z formularza
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    
    // Walidacja danych
    if (!firstName || !lastName || !email) {
        alert('Proszę wypełnić wszystkie pola!');
        return;
    }
    
    // Dodanie nowego użytkownika do tablicy
    users.push({
        firstName,
        lastName,
        email
    });
    
    // Resetowanie formularza
    resetForm();
    
    // Aktualizacja wyświetlania i localStorage
    displayUsers();
});

// Obsługa zdarzenia click dla przycisku Aktualizuj - aktualizacja istniejącego użytkownika
updateBtn.addEventListener('click', () => {
    // Pobranie wartości z formularza
    const userId = userIdInput.value;
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    
    // Walidacja danych
    if (!firstName || !lastName || !email) {
        alert('Proszę wypełnić wszystkie pola!');
        return;
    }
    
    // Aktualizacja użytkownika w tablicy
    users[userId] = {
        firstName,
        lastName,
        email
    };
    
    // Resetowanie formularza
    resetForm();
    
    // Aktualizacja wyświetlania i localStorage
    displayUsers();
});

// Obsługa zdarzenia click dla przycisku Anuluj
cancelBtn.addEventListener('click', resetForm);

// Inicjalizacja wyświetlania użytkowników przy załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    // Ukrycie przycisków aktualizacji i anulowania na początek
    updateBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    
    // Wyświetlenie użytkowników
    displayUsers();
});

Jeśli chcesz zobaczyć kod na naszym GitHub to odwiedź profil **[Scriperix - Forms Vibe Coding](https://github.com/Scripterix/Forms-Vibe-Coding)**. Możesz eksperymentować dodając nowe opcje lub się dowiedzieć jak się zapisuje do Local Storge.

## Zalety stosowania Agentic Mode w GitHub Copilot

Po przetestowaniu formularza możemy wyciągnąć wnioski dotyczące skuteczności Vibe Coding z wykorzystaniem trybu Agentic:

### 1. Oszczędność czasu

Największą zaletą stosowania Agentic Mode jest dramatyczna oszczędność czasu. Podczas gdy tradycyjne kodowanie formularza CRUD z obsługą localStorage zajęłoby:

- 20-30 minut dla doświadczonego programisty

- 30-60 minut dla średnio zaawansowanego programisty

- 1,5-2 godziny dla początkującego

Z wykorzystaniem Agentic Mode cały proces zajmuje zaledwie 5-10 minut! To ponad 80% oszczędności czasu w porównaniu do tradycyjnego kodowania.

### 2. Kompleksowe rozwiązania

Copilot w trybie Agentic nie tylko generuje fragmenty kodu, ale tworzy kompleksowe rozwiązania, obejmujące:

- Strukturę HTML z przemyślanym układem elementów

- Estetyczne i responsywne style CSS

- Pełną implementację logiki JavaScript z obsługą zdarzeń

- Mechanizmy walidacji danych

- Obsługę localStorage z automatycznym zapisem i odczytem

### 3. Eliminacja błędów

Agentic Mode automatycznie wykrywa i naprawia potencjalne błędy, co eliminuje potrzebę debugowania i testowania kodu. Copilot:

- Zapewnia poprawną strukturę kodu

- Dba o poprawne zamykanie nawiasów i znaczników

- Uwzględnia obsługę błędów i przypadków brzegowych

- Generuje kod zgodny z najlepszymi praktykami

### 4. Zwiększona produktywność

Programista może skupić się na koncepcji i funkcjonalnościach zamiast na technicznej implementacji. Zamiast myśleć "jak to zakodować", zastanawiamy się "co chcemy osiągnąć".

## Wnioski z eksperymentu Vibe Coding

Nasz eksperyment z tworzeniem formularza CRUD za pomocą Vibe Coding i GitHub Copilot w trybie Agentic potwierdza, że jest to niezwykle efektywna metoda programowania:

- **Efektywność czasowa**: Skrócenie czasu tworzenia z 30-60 minut do zaledwie 5-10 minut (redukcja o 80-90%)

- **Jakość kodu**: Wygenerowany kod jest czysty, dobrze zorganizowany i zgodny z najlepszymi praktykami

- **Kompleksowość**: Otrzymujemy pełne rozwiązanie bez konieczności ręcznego uzupełniania brakujących elementów

- **Wygoda**: Możemy skupić się na funkcjonalnościach i logice biznesowej zamiast na technicznej implementacji

## Zalety i wady Vibe Coding dla Junior programistów

Analizując nasze doświadczenia z tworzeniem formularza CRUD przy pomocy Vibe Coding ale także sposób w jaki się tworzy Vibe Coding warto uczciwie przedstawić zarówno mocne, jak i słabsze strony tego podejścia:

### Zalety (Pros)

- **Znaczący wzrost produktywności** – możliwość zrealizowania w 5-10 minut zadania, które tradycyjnie zajęłoby 30-60 minut, daje programistom szansę na wykonanie znacznie większej liczby zadań w tym samym czasie

- **Doskonałe narzędzie do nauki** – początkujący programiści mogą analizować generowany kod, aby lepiej zrozumieć najlepsze praktyki i struktury programistyczne

- **Niezastąpiony przy prototypowaniu** – błyskawiczne tworzenie MVP (Minimum Viable Products) i prototypów pozwala szybciej weryfikować pomysły biznesowe bez konieczności inwestowania znacznych zasobów

- **Redukcja powtarzalnych zadań** – eliminacja konieczności pisania standardowego, powtarzalnego kodu pozwala programistom skupić się na bardziej kreatywnych i strategicznych aspektach projektu

### Wady (Cons)

- **Potencjalna przeszkoda w nauce podstaw** – dla początkujących programistów nadmierne poleganie na AI może utrudnić zrozumienie fundamentalnych zasad programowania, które są niezbędne do długoterminowego rozwoju zawodowego

- **Zmienna jakość generowanego kodu** – niektóre fragmenty kodu mogą być nieoptymalne, przestarzałe lub zawierać błędy, szczególnie w przypadku nowszych technologii, których modele AI jeszcze w pełni nie opanowały

- **Kwestie bezpieczeństwa** – bezkrytyczne wdrażanie wygenerowanego kodu bez dokładnego zrozumienia jego działania może prowadzić do wprowadzenia luk w zabezpieczeniach aplikacji

- **Ryzyko ujednolicenia rozwiązań** – powszechne wykorzystanie tych samych modeli AI może prowadzić do standaryzacji kodu i zmniejszenia różnorodności podejść do rozwiązywania problemów programistycznych

Czym jest agent ? sprawdź [Baze Wiedzy](https://opengateweb.com/baza-wiedzy/#agent) i opis czym jest [Agent](https://opengateweb.com/posts/tags/agent/). Dodatkowe informacje możesz znaleźć w sekcji AI news, omawiającej szeroko aspekt Agentowości oraz wprowadzenia w lipcu 2025 przez OpenAI zadań wykonywanych przez Agentów.

## Podsumowanie

Vibe Coding z wykorzystaniem GitHub Copilot w trybie Agentic to przełomowe podejście do programowania, które może zrewolucjonizować sposób, w jaki tworzymy oprogramowanie. W naszym eksperymencie udało się stworzyć w pełni funkcjonalny formularz CRUD z obsługą localStorage w czasie krótszym niż 10 minut, co stanowi drastyczną redukcję czasu w porównaniu do tradycyjnych metod. Jak to będzie się rozwijało sprawdź co mówi **twórca Software OpenAI A Karpathy**

Dla programistów oznacza to możliwość realizacji większej liczby projektów, szybszego tworzenia prototypów i koncentracji na innowacjach zamiast na rutynowym kodowaniu. Dla firm przekłada się to na niższe koszty, szybszy czas realizacji projektów i wyższą jakość oprogramowania.

Vibe Coding to nie tylko zmiana narzędzi, ale przede wszystkim zmiana paradygmatu programowania – od ręcznego pisania kodu do współpracy z inteligentnym asystentem AI, który rozumie nasze intencje i pomaga je realizować w najbardziej efektywny sposób.