import { existsSync, readFileSync, watch, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const defaultRoot = resolve(scriptDirectory, "..");
const outputFile = "data/search-index.json";
const heroSourceFile = "src/components/hero.ts";

const publicPages = [
  {
    page: "home",
    source: "index.html",
    href: "index.html",
    slug: "/",
    topics: ["development", "automatyzacje", "aplikacje", "współpraca"]
  },
  {
    page: "services",
    source: "pages/uslugi.html",
    href: "pages/uslugi.html",
    slug: "/pages/uslugi.html",
    topics: ["development", "automation", "AI engineering", "API", "TypeScript", "Python"]
  },
  {
    page: "portfolio",
    source: "pages/portfolio.html",
    href: "pages/portfolio.html",
    slug: "/pages/portfolio.html",
    topics: ["projekty", "Agentic Studio", "wyszukiwarka", "mikrointerakcje", "Vite MPA"]
  },
  {
    page: "lab",
    source: "pages/lab.html",
    href: "pages/lab.html",
    slug: "/pages/lab.html",
    topics: ["LAB", "eksperymenty", "dane", "agenci AI", "prototypy"]
  },
  {
    page: "contact",
    source: "pages/kontakt.html",
    href: "pages/kontakt.html",
    slug: "/pages/kontakt.html",
    topics: ["kontakt", "współpraca", "projekt", "wycena"]
  }
];

export const searchIndexInputFiles = [
  ...publicPages.map(({ source }) => source),
  heroSourceFile
];

function decodeHtml(value) {
  const namedEntities = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"'
  };

  return value.replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, (entity, code) => {
    if (code.startsWith("#x")) return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    if (code.startsWith("#")) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    return namedEntities[code.toLowerCase()] ?? entity;
  });
}

function normalizeText(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function extractElementContent(html, element) {
  return html.match(new RegExp(`<${element}\\b[^>]*>([\\s\\S]*?)<\\/${element}>`, "i"))?.[1] ?? "";
}

function extractMetaContent(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const attributes = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)].map((match) => [match[1].toLowerCase(), match[3]])
    );
    if (attributes.name?.toLowerCase() === name.toLowerCase()) return normalizeText(attributes.content ?? "");
  }
  return "";
}

function extractVisibleMainText(html) {
  const main = extractElementContent(html, "main")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|template|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, " ");
  return normalizeText(main);
}

function extractObjectBlock(source, key) {
  const marker = new RegExp(`\\b${key}\\s*:\\s*\\{`, "g").exec(source);
  if (!marker) return "";

  const start = source.indexOf("{", marker.index);
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = "";
      continue;
    }
    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }
    if (character === "{") depth += 1;
    if (character === "}" && --depth === 0) return source.slice(start, index + 1);
  }

  throw new Error(`Nie zamknięto konfiguracji hero: ${key}`);
}

function extractHeroText(html, heroSource) {
  const heroKey = html.match(/\bdata-hero\s*=\s*(["'])(.*?)\1/i)?.[2];
  if (!heroKey) return "";

  const block = extractObjectBlock(heroSource, heroKey);
  const searchableProperties = ["kicker", "title", "lead", "detail", "imageLabel", "imageStrong", "footnote", "footnoteLabel"];
  const values = searchableProperties.flatMap((property) => {
    const match = block.match(new RegExp(`\\b${property}\\s*:\\s*("(?:\\\\.|[^"\\\\])*")`));
    return match ? [JSON.parse(match[1])] : [];
  });
  return normalizeText(values.join(" "));
}

function normalizeTitle(html) {
  const documentTitle = normalizeText(extractElementContent(html, "title"));
  if (!documentTitle) throw new Error("Brak znacznika <title>.");
  if (documentTitle.startsWith("Scripterix Studio |")) return "Scripterix Studio";
  return documentTitle.replace(/\s*\|\s*Scripterix Studio$/, "");
}

function validateManifest() {
  const uniqueFields = ["page", "href", "slug"];
  for (const field of uniqueFields) {
    const values = publicPages.map((entry) => entry[field]);
    if (new Set(values).size !== values.length) throw new Error(`Duplikat pola ${field} w manifeście wyszukiwarki.`);
  }
  if (publicPages.some(({ source }) => source.includes("search-result") || source.startsWith("dist/") || source.startsWith("docs/"))) {
    throw new Error("Manifest zawiera niedozwolone źródło wyszukiwarki.");
  }
}

export function createSearchIndex(root = defaultRoot) {
  validateManifest();
  const heroSourcePath = resolve(root, heroSourceFile);
  const heroSource = existsSync(heroSourcePath) ? readFileSync(heroSourcePath, "utf8") : "";

  return publicPages.map(({ source, ...metadata }) => {
    const sourcePath = resolve(root, source);
    if (!existsSync(sourcePath)) throw new Error(`Brak publicznej strony: ${source}`);
    const html = readFileSync(sourcePath, "utf8");
    const description = extractMetaContent(html, "description");
    if (!description) throw new Error(`Brak meta description: ${source}`);

    return {
      page: metadata.page,
      title: normalizeTitle(html),
      href: metadata.href,
      slug: metadata.slug,
      topics: metadata.topics,
      description,
      content: normalizeText([description, extractHeroText(html, heroSource), extractVisibleMainText(html)].join(" "))
    };
  });
}

function serializeIndex(index) {
  return `${JSON.stringify(index, null, 2)}\n`;
}

export function generateSearchIndex({ root = defaultRoot, check = false, silent = false } = {}) {
  const target = resolve(root, outputFile);
  const nextContent = serializeIndex(createSearchIndex(root));
  const currentContent = existsSync(target) ? readFileSync(target, "utf8") : "";
  const changed = currentContent !== nextContent;

  if (check) {
    if (changed) throw new Error(`${outputFile} jest nieaktualny. Uruchom npm run search:index.`);
    if (!silent) console.log(`[search-index] Aktualny: ${outputFile}`);
    return { changed: false, target };
  }

  if (changed) writeFileSync(target, nextContent, "utf8");
  if (!silent) console.log(`[search-index] ${changed ? "Zaktualizowano" : "Bez zmian"}: ${outputFile}`);
  return { changed, target };
}

export function watchSearchIndex({ root = defaultRoot } = {}) {
  generateSearchIndex({ root });
  let timer;
  const watchers = searchIndexInputFiles.map((file) => watch(resolve(root, file), () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        generateSearchIndex({ root });
      } catch (error) {
        console.error(`[search-index] ${error instanceof Error ? error.message : String(error)}`);
      }
    }, 80);
  }));

  console.log(`[search-index] Obserwuję ${searchIndexInputFiles.length} źródeł. Ctrl+C kończy pracę.`);
  const close = () => {
    clearTimeout(timer);
    watchers.forEach((watcher) => watcher.close());
  };
  process.once("SIGINT", close);
  process.once("SIGTERM", close);
  return close;
}

function runCli() {
  const argumentsList = new Set(process.argv.slice(2));
  const knownArguments = new Set(["--check", "--watch"]);
  const unknownArgument = [...argumentsList].find((argument) => !knownArguments.has(argument));
  if (unknownArgument) throw new Error(`Nieznany argument: ${unknownArgument}`);
  if (argumentsList.has("--check") && argumentsList.has("--watch")) {
    throw new Error("Tryby --check i --watch nie mogą działać jednocześnie.");
  }
  if (argumentsList.has("--watch")) watchSearchIndex();
  else generateSearchIndex({ check: argumentsList.has("--check") });
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    runCli();
  } catch (error) {
    console.error(`[search-index] ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
