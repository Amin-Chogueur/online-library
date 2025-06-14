import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: 5173,
  },
  base: "/", // This is crucial for Vercel deployments
  build: {
    outDir: "dist", // Make sure this matches Vercel's output directory
  },
});
