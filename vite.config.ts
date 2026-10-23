import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import { generateSearchIndex, searchIndexInputFiles } from "./scripts/generate-search-index.mjs";

const projectRoot = import.meta.dirname;

function generateSearchIndexDuringDevelopment(): Plugin {
  const watchedPaths = searchIndexInputFiles.map((file) => resolve(projectRoot, file));
  const normalizePath = (file: string) => {
    const normalized = resolve(file).replaceAll("\\", "/");
    return process.platform === "win32" ? normalized.toLowerCase() : normalized;
  };
  const watchedFiles = new Set(watchedPaths.map(normalizePath));

  return {
    name: "generate-search-index",
    apply: "serve",
    configureServer(server) {
      generateSearchIndex({ root: projectRoot });
      server.watcher.add(watchedPaths);

      let timer: ReturnType<typeof setTimeout> | undefined;
      server.watcher.on("change", (file) => {
        if (!watchedFiles.has(normalizePath(file))) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          const { changed } = generateSearchIndex({ root: projectRoot });
          if (changed) server.ws.send({ type: "full-reload", path: "*" });
        }, 80);
      });
    }
  };
}

function copyRuntimeData(): Plugin {
  let outputDirectory = resolve(projectRoot, "dist");

  return {
    name: "copy-runtime-data",
    apply: "build",
    configResolved(config) {
      outputDirectory = config.build.outDir;
    },
    closeBundle() {
      const dataDirectory = resolve(outputDirectory, "data");
      mkdirSync(dataDirectory, { recursive: true });
      copyFileSync(resolve(projectRoot, "data", "site.json"), resolve(dataDirectory, "site.json"));
      copyFileSync(resolve(projectRoot, "data", "search-index.json"), resolve(dataDirectory, "search-index.json"));
    }
  };
}

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(projectRoot, "index.html"),
        kontakt: resolve(projectRoot, "pages/kontakt.html"),
        lab: resolve(projectRoot, "pages/lab.html"),
        portfolio: resolve(projectRoot, "pages/portfolio.html"),
        projekty: resolve(projectRoot, "pages/portfolio/projekty/index.html"),
        shelfstack: resolve(projectRoot, "pages/portfolio/projekty/shelfstack.html"),
        search: resolve(projectRoot, "pages/search-result.html"),
        uslugi: resolve(projectRoot, "pages/uslugi.html"),
      },
    }
  },
  plugins: [generateSearchIndexDuringDevelopment(), copyRuntimeData()]
});
