---
layout: post
lang: en
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
Why not an extra language. Python is useful for AI and has many interesting applications. So I start a basic course: "what, where, how". With the popularity of this language and its wide applications in Machine Learning, I decided to learn it.

## **Python - Crash Course Post #10**

## **Language Overview**

Python is a powerful, high-level programming language known for its simplicity and readability. It was created by Guido van Rossum and first released in 1991. Python's design philosophy emphasizes code readability, which is reflected in its significant use of whitespace.

One key feature of Python is its versatility; it can be used for a wide range of applications, from web development to data analysis, artificial intelligence, scientific computing, and more. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming.

## **Python Libraries**

Python has a large and active community that contributes to its extensive standard library and many third-party packages and frameworks such as Django for web development, NumPy and Pandas for data analysis, TensorFlow and PyTorch for machine learning, and many others.

Its ease of learning and robustness make Python a popular choice for both beginners and experienced developers. Additionally, the Python interpreter and comprehensive documentation make it accessible and easy to use on various operating systems.

[Python Org](https://www.python.org/) — link to official resources.

## **The course I'm following**

The basic course by [Traversy Media Python CC](https://youtu.be/JJmcL1N2KQs?si=z3Ep76w1zHUxHud_) is sufficient to master the basics. Below are files and examples covering various language features and syntax.

[Python_sandbox/python_sandbox_starter](https://github.com/bradtraversy/python_sandbox/tree/master/python_sandbox_starter)

**Already done** — variables, if, loops and other simple syntax examples. If you get stuck setting up an environment for Python, follow this quick guide: [How to start learning Python on Windows and Visual Studio Code](https://opengateweb.com/posts/jak-zaczac-nauke-pythona-w-windows-i-visual-studio-code-post-70/)

Comments

Variable Rules

```
x = 1            # int

y = 2.5          # float

name = 'John'    # str

is_cool = True   # bool

a = x + y

print(type(x))

print(a)
```

## Conditional Statements (if)

```
if is_cool:
    print("John is cool!")  # Prints message if is_cool is True
```

## Loop (for)

```
for i in range(5):
    print(i)  # Prints numbers 0 to 4
```

## Functions

```
def greet(name):
    print("Hello, " + name)

greet("Alice")  # Calls greet with "Alice"
```

## Methods

```
sentence = "Python is awesome!"
print(sentence.upper())  # Prints the sentence in uppercase
```

### Converting numbers to binary in `python.py`

```
print(bin(5))
print(bin(1))
all_bins = "".join(bin(i)[2:] for i in range(1, 22))
print(all_bins)
```

### The `guess.py` file contains a simple guessing-game script

```
import random

def guess_number():
    secret = random.randint(1, 100)  # picks a number between 1 and 100
    print("Guess a number between 1 and 100!")

    while True:
        try:
            shot = int(input("Enter a number: "))
        except ValueError:
            print("That's not a number! Try again.")
            continue

        if shot < secret:
            print("Too low!")
        elif shot > secret:
            print("Too high!")
        else:
            print(f"Congrats 🎉! You guessed the number {secret}")
            break

guess_number()
```

## How to run Python code in the terminal

If you have `guess.py` in VS Code, run it in the terminal with:

```bash
python <filename>
```

### `python guess.py`

![Python crash course ](https://opengateweb.com/wp-content/uploads/2025/02/python-crash-course-1340x726.png)

## Comparing Python and C syntax

One feature that sets Python apart is its focus on readability and simple syntax. Python aims to be "understandable" by programmers by promoting clear and elegant code. Its readable syntax makes it particularly attractive for beginners as well as experienced developers.

For example, compare Python with C for printing numbers from 1 to 10:

### Python

```
for i in range(1, 11):
    print(i)
```

### C

```
#include <iostream>

int main() {
    for (int i = 1; i <= 10; ++i) {
        std::cout << i << std::endl;
    }
    return 0;
}

#include <stdio.h>
```

Although both examples do the same thing—print numbers from 1 to 10—the difference in syntax is significant. Python removes the need to declare variable types and makes code more concise and readable. Also, Python does not require curly braces or semicolons to mark code blocks, which contributes to readability.

## Web scraping with BeautifulSoup

We can use Python together with a scraping library like BeautifulSoup to extract data from HTML pages. Here's a simple example showing how to fetch article titles from a web page:

```
import requests
from bs4 import BeautifulSoup

url = 'https://example.com'
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    article_titles = soup.find_all('h2')
    for title in article_titles:
        print(title.text)
else:
    print('Failed to fetch page content.')
```

In this code we send a GET request using `requests`. If the response is successful (status 200), we parse the HTML with BeautifulSoup and find all `<h2>` elements, then print their text.

More on server-side and backend uses of Python: [Post #52 What are Python and PHP](https://opengateweb.com/posts/52-php-python/)

### **Python CDN**
