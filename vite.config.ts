import { defineConfig } from "vite";
import path from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      unfetch: path.resolve(
        __dirname,
        "node_modules/isomorphic-unfetch/index.mjs"
      ),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "mem-sdk",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "umd", "es"],
    },
    rollupOptions: {
      // output: {
      //   exports: "named",
      // },
    },
  },
});
