import { defineConfig } from "tsup";

export default defineConfig({
  // Two independent entries: the root stays free of Node built-ins (browser
  // safe), the DePIN client is Node.js-only (raw TCP via node:net).
  entry: {
    index: "index.ts",
    depin: "depin.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  outDir: "dist",
  clean: true,
  platform: "node",
  target: "es2020",
  outExtension({ format }) {
    return { js: format === "esm" ? ".mjs" : ".cjs" };
  },
});
