---
lang: en
translation_id: post-8-calculator-math-func-oop-en
title: "Post #8 Calculator OOP — object-oriented calculator with math functions"
date: 2024-10-22 01:28:34 +0100
author: Scripterix
categories:
  - "Coding Corner"
  - "Challenge"
writing_hours: 2
---

# Simple Calculator — functional and object-oriented approaches

This post presents two implementations of a simple calculator: a functional (DOM-based) approach and an object-oriented implementation using ES6 classes. Short examples of `Person` constructors are also included.

GitHub: check the project repository if available.

## Example — functional approach

```js
// get elements
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');

const input4 = document.getElementById('input4');
const input5 = document.getElementById('input5');
const input6 = document.getElementById('input6');

console.log(input4, input5, input6);

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

## Example — object-oriented approach (OOP)

```js
class Calculator {
  calculate(operand1, operator, operand2) {
    switch (operator) {
      case '+': return operand1 + operand2;
      case '-': return operand1 - operand2;
      default: return NaN;
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

## Person examples

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person('John', 30);
console.log(person1);

class Person2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const person2 = new Person2('Alice', 25);
console.log(person2);

const sumOfAges = person1.age + person2.age;
console.log('Sum of ages:', sumOfAges);
```

## Analysis — when to use which approach

- Functional: quick to write, good for small UI scripts.
- OOP: better organization, easier to extend and test when you need instances and state.

| Feature | Functional | OOP |
|---|---:|---:|
| Code organization | functions/procedures | classes/objects |
| State | none/ephemeral | stored in objects |
| Reusability | limited | high (instances) |
| Scalability | harder | easier |

## Next steps

- Add input validation and float support.
- Extract calculator logic into a module for unit tests.
- Improve UI/UX and error messages.

This provides a ready base to extend the calculator with more operators and a friendlier interface.

**The calculator already has a solid foundation** — the next steps include expanding operators and refining the UI.
GitHub Calculator Repo

```js
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let input3 = document.getElementById('input3');

let input4 = document.getElementById('input4');
let input5 = document.getElementById('input5');
let input6 = document.getElementById('input6');

console.log(input4);
console.log(input5);
console.log(input6);

// Function

input1.addEventListener('mouseout', sum);
input2.addEventListener('mouseout', sum);

function sum() {
  let result = parseInt(input1.value || 0) + parseInt(input2.value || 0);
  input3.value = result;
  console.log(input3.value);
}

input4.addEventListener('mouseout', sub);
input5.addEventListener('mouseout', sub);

function sub() {
  let result = parseInt(input4.value || 0) - parseInt(input5.value || 0);
  input6.value = result;
  console.log(input6.value);
}

// OOP version

class Calculator {
  calculate(operand1, operator, operand2) {
    switch (operator) {
      case '+': return operand1 + operand2;
      case '-': return operand1 - operand2;
      default: return NaN; // Invalid operator
    }
  }
}

const calculator = new Calculator();

document.getElementById('calculate').addEventListener('click', function () {
  const operand1 = parseFloat(document.getElementById('operand1').value) || 0;
  const operator = document.getElementById('operator').value.trim();
  const operand2 = parseFloat(document.getElementById('operand2').value) || 0;

  const result = calculator.calculate(operand1, operator, operand2);
  if (!isNaN(result)) {
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
  }
}
```

## The calculator is ready to grow, and the UI could use polish. Below is a breakdown of the code and the approaches.

## Code analysis — functional approach vs. OOP
Your code presents two paths for performing calculations: a functional (procedural) implementation and an object-oriented one. I'll walk through each step.

### Functional approach
The functional code handles simple addition and subtraction by manipulating the DOM and reacting to events.

```js
// Fetch the HTML elements
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let input3 = document.getElementById('input3');
let input4 = document.getElementById('input4');
let input5 = document.getElementById('input5');
let input6 = document.getElementById('input6');

// Log references to the inputs (values are not yet available)
console.log(input4);
console.log(input5);
console.log(input6);

// Handle mouseout events
input1.addEventListener('mouseout', sum);
input2.addEventListener('mouseout', sum);
input4.addEventListener('mouseout', sub);
input5.addEventListener('mouseout', sub);

// Addition
function sum() {
  let result = parseInt(input1.value || 0) + parseInt(input2.value || 0);
  input3.value = result;
  console.log(input3.value);
}

// Subtraction
function sub() {
  let result = parseInt(input4.value || 0) - parseInt(input5.value || 0);
  input6.value = result;
  console.log(input6.value);
}
```

1. The code grabs references to all the input fields from the form.

2. Logging statements print references to the three output inputs in the console, even though the values are not set yet.

3. Mouseout listeners on the input fields call `sum()` or `sub()` whenever the user leaves them.

4. The `sum()` function turns the entered values into integers, adds them, and writes the total into `input3`.

5. The `sub()` function subtracts the second pair of fields and places the result into `input6`.

### Object-oriented approach (OOP)
The object-oriented approach relies on classes to organize the logic and make it reusable.

1. `Calculator`
```js
class Calculator {
  calculate(operand1, operator, operand2) {
    switch (operator) {
      case '+': return operand1 + operand2;
      case '-': return operand1 - operand2;
      default: return NaN; // Invalid operator
    }
  }
}
```
The class exposes a `calculate()` method that supports multiple operators.

2. Instantiating the class and handling the button click
```js
const calculator = new Calculator();

document.getElementById('calculate').addEventListener('click', function () {
  const operand1 = parseFloat(document.getElementById('operand1').value) || 0;
  const operator = document.getElementById('operator').value.trim();
  const operand2 = parseFloat(document.getElementById('operand2').value) || 0;
  const result = calculator.calculate(operand1, operator, operand2);
  if (!isNaN(result)) {
    document.getElementById('result').value = result;
  } else {
    alert('Invalid operator! Please enter "+" or "-".');
  }
});
```
Clicking `calculate` pulls the operands and operator from the UI, sends them to `calculate()`, and either writes the result or reports an invalid operator.

3. `Calculator2`
```js
class Calculator2 {
  constructor() {
    this.result = 0;
  }

  add(a, b) {
    this.result = a + b;
  }
}
```
`Calculator2` stores a `result` property and an `add()` method, but that instance is never used in the current flow.

4. Creating `Person` objects
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person1 = new Person('John', 30);
console.log(person1);

class Person2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

let person2 = new Person2('Alice', 25);
console.log(person2);
```
The constructor-based `Person` and the ES6 `Person2` both capture `name` and `age`, and their ages are summed for debugging.

5. Age sum
```js
let sumOfAges = person1.age + person2.age;
console.log('Sum of ages:', sumOfAges);
```
This adds `person1.age` and `person2.age`, then logs the result.

### Summary — functional vs. OOP differences
Feature | Functional | OOP
---|---|---
Code organization | Independent functions | Classes and objects
State | Local to the functions | Objects own the state (`this.result`)
Reusability | Functions act independently | You can make multiple class instances
Readability | Simple but hard to expand | More complex but easier to maintain

### When to pick which approach?
- If the code stays simple and involves only a couple of operations → go functional.
- If the feature should be extensible and reusable → go OOP.
