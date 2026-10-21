import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

const projectRoot = import.meta.dirname;

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
        search: resolve(projectRoot, "pages/search-result.html"),
        uslugi: resolve(projectRoot, "pages/uslugi.html"),
      },
    }
  },
  plugins: [copyRuntimeData()]
});
