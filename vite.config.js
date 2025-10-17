// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // Output directory for the bundled files
    outDir: "dist",
    // Empty the output directory before each build
    emptyOutDir: true,
    // Configuration for Rollup, Vite's underlying bundler
    rollupOptions: {
      // Define the entry points for your extension
      input: {
        // Your content script bundle
        content: resolve(__dirname, "content/content.js"),
        // Your background script bundle
        background: resolve(__dirname, "background.js"),
      },
      output: {
        // Use a consistent naming format for output files, without hashes
        entryFileNames: "[name].js",
        // Ensure assets are placed correctly
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
