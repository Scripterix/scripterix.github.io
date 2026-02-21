#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readArg(args, key, fallback = "") {
  const idx = args.indexOf(`--${key}`);
  if (idx === -1 || idx + 1 >= args.length) {
    return fallback;
  }
  return args[idx + 1];
}

function hasFlag(args, key) {
  return args.includes(`--${key}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFileSafe(filePath, content, force) {
  if (fs.existsSync(filePath) && !force) {
    throw new Error(`File already exists: ${filePath}. Use --force to overwrite.`);
  }
  fs.writeFileSync(filePath, content, "utf8");
}

function buildPostTemplate({ title, date, lang, translationId }) {
  return `---
layout: post
title: "${title}"
date: ${date} 09:00:00 +0100
categories:
  - learning
lang: ${lang}
translation_id: ${translationId}
writing_hours: 1
---
Short summary of the post.
`;
}

function buildLogTemplate({ title, date, lang, translationId }) {
  return `---
lang: ${lang}
title: "${title} - logbook"
date: ${date}
translation_id: ${translationId}
hours_spent: 1
cumulative_hours:
phase: learning
focus_area: ""
mood: ""
tags:
  - learning
summary: ""
---
Daily progress notes.
`;
}

function buildWorkTemplate({ title, date, lang, translationId, slug }) {
  const year = date.slice(0, 4);
  return `---
layout: work
title: "${title}"
slug: "${slug}-${year}-${lang}"
date: ${date}
year: ${year}
lang: "${lang}"
translation_id: ${translationId}
tech: ["HTML", "CSS", "JavaScript"]
featured_image: "/assets/images/portfolio/coding01.jpg"
summary: ""
github_repo: ""
status: "active"
---
Project description.
`;
}

function main() {
  const [typeRaw, ...args] = process.argv.slice(2);
  const type = (typeRaw || "").toLowerCase();
  const force = hasFlag(args, "force");

  if (!["post", "log", "work"].includes(type)) {
    console.error("Usage: node scripts/new-entry.js <post|log|work> --title \"...\" [--slug ...] [--lang pl|en] [--date YYYY-MM-DD] [--translation-id ...] [--force]");
    process.exit(1);
  }

  const date = readArg(args, "date", todayISO());
  const lang = readArg(args, "lang", "pl");
  const title = readArg(args, "title", "New entry");
  const slug = readArg(args, "slug", slugify(title));
  const translationId = readArg(args, "translation-id", slug);

  if (!slug) {
    console.error("Could not derive slug. Pass --slug explicitly.");
    process.exit(1);
  }

  let dir = "";
  let filename = "";
  let content = "";

  if (type === "post") {
    dir = path.join(ROOT, "_posts");
    filename = `${date}-${slug}-${lang}.md`;
    content = buildPostTemplate({ title, date, lang, translationId });
  }

  if (type === "log") {
    dir = path.join(ROOT, "_logbook");
    filename = lang === "pl" ? `${date}-${slug}.md` : `${date}-${slug}-${lang}.md`;
    content = buildLogTemplate({ title, date, lang, translationId });
  }

  if (type === "work") {
    const year = date.slice(0, 4);
    dir = path.join(ROOT, "_works");
    filename = `${year}-${slug}-${lang}.md`;
    content = buildWorkTemplate({ title, date, lang, translationId: `work-${translationId}-${year}`, slug });
  }

  ensureDir(dir);
  const targetPath = path.join(dir, filename);
  writeFileSafe(targetPath, content, force);
  console.log(`Created: ${path.relative(ROOT, targetPath)}`);
}

try {
  main();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
