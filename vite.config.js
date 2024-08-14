import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 8001,
  },
  build: {
    sourcemap: true, // Enable source maps
  },
  esbuild: {
    sourcemap: true, // Enable source maps for esbuild
  },
});
