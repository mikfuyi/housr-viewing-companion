import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    outDir: "dist",
  },
  // 🔥 THIS FIXES THE WHITE BLANK PAGE
  optimizeDeps: {
    include: ["react-router-dom"],
  }
});
