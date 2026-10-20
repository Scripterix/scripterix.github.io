import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

const projectRoot = import.meta.dirname;

function copyNavigationData(): Plugin {
  let outputDirectory = resolve(projectRoot, "dist");

  return {
    name: "copy-navigation-data",
    apply: "build",
    configResolved(config) {
      outputDirectory = config.build.outDir;
    },
    closeBundle() {
      const dataDirectory = resolve(outputDirectory, "data");
      mkdirSync(dataDirectory, { recursive: true });
      copyFileSync(resolve(projectRoot, "data", "site.json"), resolve(dataDirectory, "site.json"));
    }
  };
}

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: resolve(projectRoot, "index.html")
    }
  },
  plugins: [copyNavigationData()]
});
