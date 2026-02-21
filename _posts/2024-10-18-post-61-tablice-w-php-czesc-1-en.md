---
layout: post
lang: en
title: "Post #61 Arrays in PHP - Part 1"
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

# Arrays in PHP - Part 1 — Basics and Data Structure
Arrays are one of the most important data structures in PHP. Arrays allow you to store and organize multiple values in a single variable. In this article we'll cover the basics of working with arrays, their types, and the most common use cases.

In PHP an array lets you store many values at once, which makes it easier to manage data effectively. Arrays help group information logically and operate on it conveniently in your code. This is especially useful when building web applications or information systems.

## What are arrays in PHP?

An array in PHP is an ordered map that links values with keys. It is an extremely flexible data structure that can act as a traditional array, a list, an associative array (hash table), a dictionary, a collection, a stack, a queue, and many other structures.

<?php
// Basic array
$fruits = array("apple", "banana", "orange");

// Short syntax (since PHP 5.4)
$colors = ["red", "blue", "green"];
?>

## Indexed arrays vs associative arrays

### Indexed arrays

Indexed arrays use numeric indexes that start at 0 by default:

<?php
// Creating an indexed array
$numbers = [10, 20, 30, 40, 50];

// Accessing elements
echo $numbers[0]; // Outputs: 10
echo $numbers[2]; // Outputs: 30

// Adding elements
$numbers[] = 60; // Appends
$numbers[10] = 100; // Sets index 10

// Checking length
echo count($numbers); // Outputs number of elements
?>

### Associative arrays

Associative arrays use named keys instead of numeric indexes. PHP arrays (associative arrays) let you store multiple values under descriptive keys. In PHP, array indices can be not only numbers but also strings. This makes arrays very flexible and easy to adapt to different programming needs. Arrays in PHP can also hold different data types like numbers, strings, or even other arrays — enabling complex data structures and efficient management within applications.

<?php
// Creating an associative array
$person = [
    "name" => "Jan",
    "surname" => "Kowalski",
    "age" => 30,
    "city" => "Warsaw"
];

// Accessing elements
echo $person["name"]; // Outputs: Jan
echo $person["age"];  // Outputs: 30

// Adding new elements
$person["email"] = "jan@example.com";
$person["phone"] = "123-456-789";

// Modifying existing elements
$person["age"] = 31;
?>

## Identifying array elements

PHP offers several ways to check array contents, including `array_key_exists()`, `isset()`, and `empty()`. These functions let developers manage array data effectively and verify the presence of keys or values depending on the needs. They are essential for safe and robust data handling in PHP:

<?php
$data = [
    "user" => "admin",
    "password" => "secret",
    "role" => "administrator"
];

// Check if a key exists
if (array_key_exists("user", $data)) {
    echo "Key 'user' exists";
}

// Check if a value exists
if (in_array("admin", $data)) {
    echo "Value 'admin' exists in the array";
}

// Check if value is set
if (isset($data["password"])) {
    echo "Password is set";
}

// Check if not empty
if (!empty($data["role"])) {
    echo "User role: " . $data["role"];
}
?>

## Storing different data types

PHP arrays can store values of various types. An array can contain numbers, strings, or even other arrays. This capability makes PHP arrays a very flexible tool for storing and manipulating data in applications.

<?php
$mixed_data = [
    "string" => "This is text",
    "number" => 42,
    "float" => 3.14,
    "boolean" => true,
    "null_value" => null,
    "array" => [1, 2, 3],
    "object" => new stdClass()
];

// Iterate through the array
foreach ($mixed_data as $key => $value) {
    echo $key . ": " . gettype($value) . "\n";
}
?>

## Multidimensional arrays

Arrays can contain other arrays, creating multidimensional structures. With multidimensional arrays in PHP, you can build nested data where each element may be another array. For example, you can have an array of users where each user has its own data like name, surname, and age. Multidimensional arrays make it easy to manage more complex data structures useful in advanced PHP projects:

<?php
// Two-dimensional array
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Accessing elements
echo $matrix[1][2]; // Outputs: 6

// Multidimensional associative array
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

// Access nested elements
echo $users[0]["name"]; // Jan Kowalski
echo $users[1]["skills"][0]; // Python
?>

## Basic array operations

### How to add elements to an array?
The `array_push` function adds elements at the end, while `array_unshift` adds them at the beginning. You can also insert elements at a specific position with `array_splice`.

<?php
$fruits = ["apple", "banana"];

// Add at the end
$fruits[] = "orange";
array_push($fruits, "pear", "plum");

// Add at the beginning
array_unshift($fruits, "strawberry");

// Insert at specific position
array_splice($fruits, 2, 0, ["kiwi", "mango"]);

print_r($fruits);
?>

### Removing elements is analogous to adding — use `array_pop` for the last element and `array_shift` for the first.

<?php
$numbers = [1, 2, 3, 4, 5];

// Remove last element
$last = array_pop($numbers);

// Remove first element
$first = array_shift($numbers);

// Remove a specific element
unset($numbers[1]);

// Remove multiple elements
array_splice($numbers, 1, 2);

print_r($numbers);
?>

## Practical usage examples

Simple examples include storing configuration, form data, and navigation menus.

### 1. Storing configuration

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

// Access config
$db_host = $config["database"]["host"];
?>

### 2. Storing form data

<?php
if ($_POST) {
    $form_data = [
        "name" => $_POST["name"] ?? "",
        "email" => $_POST["email"] ?? "",
        "message" => $_POST["message"] ?? "",
        "timestamp" => date("Y-m-d H:i:s")
    ];
    
    // Validate
    $errors = [];
    
    if (empty($form_data["name"])) {
        $errors[] = "Name is required";
    }
    
    if (!filter_var($form_data["email"], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email address";
    }
    
    if (empty($errors)) {
        // Process data
        processFormData($form_data);
    }
}
?>

### 3. Building a navigation menu

<?php
$navigation = [
    [
        "title" => "Home",
        "url" => "/",
        "active" => true
    ],
    [
        "title" => "About",
        "url" => "/about",
        "active" => false
    ],
    [
        "title" => "Services",
        "url" => "/services",
        "active" => false,
        "submenu" => [
            ["title" => "Web Development", "url" => "/services/web-design"],
            ["title" => "SEO", "url" => "/services/seo"],
            ["title" => "Marketing", "url" => "/services/marketing"]
        ]
    ],
    [
        "title" => "Contact",
        "url" => "/contact",
        "active" => false
    ]
];

// Generate HTML menu
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

## Common mistakes and how to avoid them

### 1. Checking for key existence

<?php
// WRONG - may generate a Notice
echo $array["key"];

// CORRECT
echo $array["key"] ?? "default value";

// or
if (isset($array["key"])) {
    echo $array["key"];
}
?>

### 2. Iterating through arrays

<?php
$data = ["a" => 1, "b" => 2, "c" => 3];

// CORRECT - with keys
foreach ($data as $key => $value) {
    echo "{$key}: {$value}\n";
}

// CORRECT - values only
foreach ($data as $value) {
    echo $value . "\n";
}
?>

## QA — Arrays

**Q:** Can I store different data types in a PHP array? **A:** Yes, PHP arrays can hold multiple data types simultaneously, such as numbers, strings, booleans, other arrays, or objects — allowing you to create complex data structures easily.

**Q:** What happens if I access a non-existent key in an array? **A:** PHP will emit a **Notice: Undefined index**, so it's good practice to check with `isset()` or use the null coalescing operator `??`.

**Q:** How do I add a new element to an associative array? **A:** Assign a value to a new key, e.g. `$person["email"] = "test@example.com";`.

## Summary

Arrays in PHP are a powerful tool for effective data management. In this first part we covered:

- Differences between indexed and associative arrays

- Methods to identify elements

- Basic operations for adding and removing elements

- Practical example usages

In the second part of this article [**Post #62 Arrays Part II**](https://opengateweb.com/posts/post-62-php-tablice-czesc-ii/) we'll explore advanced techniques for working with arrays, including manipulation functions, sorting, filtering, and conversions between different data formats.

*OpenGate Web — Your partner in PHP application development*
