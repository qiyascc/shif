import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: 'esnext', // ESNext, modern tarayıcıları hedefler
  },
  base: '/static/',
  plugins: [react()],
  resolve: {
      alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
});