---
layout: post
lang: en
title: "Challenge: Start"
description: "Kicking off the 10,000-hour programming challenge."
date: 2024-10-12
categories:
  - "coding corner"
translation_id: post-6-start-wyzwanie
writing_hours: 2
---
## I decided to tackle an ambitious challenge: dedicate **10,000 hours** to learning and practicing programming

I'm restarting my studies and brushing up on knowledge that has gathered a bit of dust. I'm wrapping the effort in a more structured workflow.

Starting from the big picture and drilling into specifics... WordPress and the Telomers.pl project. Tired of the CMS tangles, I've decided to rebuild it in a stack I understand and can extend quickly—one where adding features or changing the workflow takes minutes. WordPress eats a huge amount of time when you need to solve something the roundabout way. Stylesheets stuffed inside the database and JSON notation, hooks everywhere just to insert your own code. You can add a stylesheet with a single line in raw code. There's work involved in rewriting it to simple PHP and HTML, but afterward evolving the content will be much easier.

I'm refreshing my PHP and testing mod_rewrite to craft clean links without the tilde and filename.html. Alongside the project, I've been experimenting with several search options based on Fuse.js. It's fascinating how many approaches and knobs this library offers.

## Fuse.js — a stellar fuzzy-search library

**A solid piece of engineering: Fuse.js.**

Fuse.js is a powerful yet lightweight fuzzy-search library that comes with zero dependencies. It's often used to implement forgiving search functions in web applications.

The library supports fuzzy matching, meaning it finds strings similar to the search pattern rather than demanding exact matches. That’s perfect when users mistype or when you want more flexible discovery.

The example below shows how easily you can configure Fuse.js to search through a list of items (say, books) across multiple keys (here: title and the author's first name). You immediately get a list of results that match the pattern. Fuse is as simple and fast as 1-2-3:

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

### Sample fuzzy-search use cases

I found a GitHub repository that searches through canned answers—it's perfect for building an FAQ. I forked it and added my own repo. In my implementation parity matters: searching for "Jagody" and "jagody" yields different results. There's also a generated link, and I'm planning to refine it so the page scrolls directly to the relevant section. The UI sits inside a Bootstrap modal.

My GitHub repo — [Scripterix · fuse-search](https://github.com/Scripterix/fuse-search)

Another GitHub repo (FAQ-style) by MehediHasan06 — [fuse-search](https://github.com/MehediHasan06/fuse-search)
