import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config"; // Import Vitest config

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // Ensures DOM-like behavior
    setupFiles: "./src/setupTests.ts",
    exclude: [...configDefaults.exclude, "node_modules"], // Exclude `node_modules`
  },
});
