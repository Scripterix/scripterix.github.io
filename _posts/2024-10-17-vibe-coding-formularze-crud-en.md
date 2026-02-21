---
layout: post
lang: en
title: "Post #57 Vibe Coding Creating a CRUD Form."
date: 2024-10-16 21:55:56
author: Scripterix
translation_id: vibe-coding-formularze-crud
categories:
    - "AI"
    - "Coding Corner"
    - "Challenge"
tags: []
writing_hours: 3
---

In today's programming world, speed and productivity are key to success. One of the newest trends is **Vibe Coding** — an approach that reduces manual coding by leveraging advanced AI tools such as GitHub Copilot in Agentic Mode. This article shows a practical example: building an interactive CRUD form that stores data in localStorage.

## What is Vibe Coding?

Vibe Coding minimises manual coding by using prompts and AI assistants. Instead of implementing every detail, the developer focuses on describing desired behavior and lets the assistant generate the code. For our experiment we rely on GitHub Copilot in Agentic Mode.

## Agentic Mode in GitHub Copilot — a programming revolution

Agentic Mode changes how we work with code. Rather than passively responding, the agent can:

- initiate actions and suggest solutions
- proactively find and fix bugs
- generate full functions from descriptive comments
- suggest optimizations to existing code
- automatically create documentation and unit tests

## Project: CRUD form with localStorage

We will build a form that supports:

- Adding new entries (first name, last name, email)
- Selecting rows for edit or deletion
- Editing entries
- Deleting entries
- Automatic saving to browser localStorage

![Form and LocalStorage](https://opengateweb.com/wp-content/uploads/2025/05/SimpleForms-1340x685.png)

## Implementation using Agentic Mode

Describe the required form structure to the agent and it will generate HTML, CSS and JS. Below is the generated structure and code summarized.

### HTML structure

A simple page includes the form with fields for first name, last name and email, action buttons and a table to display stored users. The page links to a stylesheet and a `main.js` script.

### CSS styles

Responsive, clean styles for the form and table to ensure good UX on desktop and mobile.

### JavaScript logic

Key implementation points:

- Read and write `users` array to `localStorage`.
- `displayUsers()` renders the table from the `users` array.
- Event listeners for Add, Edit, Update, Cancel and Delete actions.
- Form validation before adding or updating entries.
- Save changes back to `localStorage` after each modification.

Example behavior and considerations:

- On page load, hide update/cancel buttons and render existing users.
- Clicking Edit fills the form with user data and toggles buttons.
- Delete asks for confirmation before removing the entry.

If you want to see the full code, check the GitHub repository: Scripterix - Forms Vibe Coding.

## Benefits of Agentic Mode for Vibe Coding

### 1. Time savings

Agentic Mode greatly reduces development time — a task that traditionally takes 30–60 minutes can be completed in under 10 minutes.

### 2. Complete solutions

The agent can generate HTML, CSS and JS together with validation and edge-case handling.

### 3. Error reduction

Agentic Mode helps detect and fix errors, including syntax and edge-case issues.

### 4. Increased productivity

Developers can focus on design and business logic instead of repetitive code.

## Experiment conclusions

The Vibe Coding experiment confirms:

- Significant time savings (80–90% reduction).
- High-quality generated code when guided by clear prompts.
- Great value for prototyping and MVPs.

## Pros and Cons for Junior Developers

**Pros**: fast prototyping, good learning reference, reduces repetitive work.
**Cons**: over-reliance may hinder mastering fundamentals; generated code may need review for security and optimization.

For more on agents and Vibe Coding, visit our knowledge base and the Agent tag.

## Summary

Vibe Coding with GitHub Copilot in Agentic Mode enables rapid creation of functional UI and logic. It’s a promising approach for prototyping, increasing productivity and shifting focus from repetitive tasks to creative problem solving.
