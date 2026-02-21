---
title: "Post #60 Instrukcje sterujące PHP"
date: 2025-07-02 21:10:16
author: Scripterix
slug: post-60-instrukcje-sterujace-php
post_id: 1308
categories:
  - "Coding Corner"
  - "Wyzwanie"
tags:
  - "php"
  - "POST"
  - "programming"
  - "python"
original_url: "https://opengateweb.com/posts/post-60-instrukcje-sterujace-php/"
---

# Instrukcje sterujące w PHP – Instrukcje sterujące PHP To właśnie one sterują przepływem programu, decydując, co, kiedy i ile razy się wykona.

## Wstęp

### **🕹️** **Instrukcje sterujące są jednymi z najbardziej podstawowych i pierwotnych funkcji w programowaniu.**

 Są używane **praktycznie w każdym kodzie PHP**, dlatego zawsze warto mieć je dobrze opanowane.

W PHP najważniejsze instrukcje sterujące to:

- if i else

- switch

- pętle while, do...while, for, foreach

- oraz dodatkowe instrukcje takie jak break, continue, exit, return, include, require.

W tym artykule poznasz podstawowe instrukcje sterujące w PHP, które pozwalają decydować, jakie fragmenty kodu mają być wykonywane w określonych warunkach. Nauczysz się ich składni i zobaczysz proste przykłady.

### **1. Instrukcja if**

Instrukcja if sprawdza warunek i wykonuje kod, jeśli jest on prawdziwy.

if ($user_validated)
    echo "Witamy!";
else
    echo "Dostęp zabroniony!";

Jeśli chcesz wykonać więcej niż jedną instrukcję w bloku, użyj nawiasów klamrowych:

Możesz także użyć alternatywnej składni przy dużych blokach HTML:

<?php if ($user_validated): ?>
    <p>Witaj, użytkowniku!</p>
<?php else: ?>
    <p>Proszę się zalogować</p>
<?php endif; ?>

### **2. Operator warunkowy (trójargumentowy)**

Operator ten skraca zapis if/else:

echo ($active) ? 'Tak' : 'Nie';

Warto pamiętać, że **instrukcje sterujące** są bardzo podobne we wszystkich językach programowania. Na przykład instrukcja **if** czy pętle takie jak **for i do while** mają prawie taką samą konstrukcję w PHP, JavaScript, Pythonie czy C++. Nawet jeśli w danym języku nie ma wszystkich odmian pętli, to znajomość tych podstaw z PHP pozwoli Ci łatwiej uczyć się kolejnych języków programowania.

### **3. Instrukcja switch**

Przykład użycia:

switch ($name) {
    case 'Sylwia':
    case 'Bruno':
        print 'Tak';
        break;
    default:
        print 'Nie';
        break;
}

### **4. Pętla while**

Pętla while wykonuje kod tak długo, jak warunek jest prawdziwy.

$i = 1;
$total = 0;
while ($i <= 10) {
    $total += $i;
    $i++;
}
echo "Suma wynosi $total";

**PHP i Python to języki, które działają po stronie serwera (server-side).** Oznacza to, że wykonują kod na serwerze, a do przeglądarki wysyłają już gotowy wynik, na przykład stronę internetową. Jeśli nauczysz się jednego z nich, dużo łatwiej będzie Ci zrozumieć podstawy drugiego, ponieważ ich logika i sposób działania w aplikacjach webowych są bardzo podobne.

### **5. Pętla do...while**

Wykonuje kod przynajmniej raz, nawet jeśli warunek jest fałszywy:

do {
    echo "Wykonuję się co najmniej raz";
} while (false);

### **6. Pętla for**

Najczęściej używana pętla w PHP:

for ($i = 0; $i < 10; $i++) {
    echo $i;
}

### **7. Pętla foreach**

Służy do iteracji po tablicach:

$users = ['Anna', 'Tomek', 'Kasia'];
foreach ($users as $user) {
    echo $user . "\n";
}

### **8. Instrukcja declare**

Pozwala ustawić dyrektywy działania bloku kodu, np. dla funkcji zegarowych:

declare(ticks=3);
register_tick_function('some_function');
for ($i=0; $i<10; $i++) {
    // co 3 instrukcje wywoła some_function()
}

### **9. exit i return**

- exit kończy działanie skryptu.

- return zwraca wartość z funkcji i kończy jej wykonywanie.

### **10. Dołączanie kodu: include i require**

Umożliwia wstawianie kodu z innych plików:

include 'footer.inc';
require 'design.inc';

- **include** – w przypadku błędu wyświetla ostrzeżenie i kontynuuje.

- **require** – w przypadku błędu przerywa wykonywanie skryptu.

## ✨ **Podsumowanie**

Opanowanie instrukcji sterujących to fundament w nauce PHP. Dzięki nim tworzysz dynamiczne i inteligentne aplikacje webowe. Zachęcam do ćwiczeń – przepisz każdy przykład do swojego edytora, zmodyfikuj wartości i sprawdź, jak działa.

## 🚀 **CTA: Ćwicz codziennie!**

💡 *Chcesz kolejnych takich artykułów w formie PDF lub planów nauki PHP?*  Daj znać w komentarzu lub napisz **„PHP PROSZE”**, a przygotuję je dla Ciebie.