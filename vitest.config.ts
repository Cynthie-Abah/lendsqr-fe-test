import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('./', import.meta.url).pathname,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./app/tests/setupTests.ts",
    css: false,
  },
});
