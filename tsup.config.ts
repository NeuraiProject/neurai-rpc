import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "index.ts" },
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
