import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDotenv } from "dotenv";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000", // For local development
        changeOrigin: true
      }
    }
  },
  define: {
    // In development, it will fall back to '/api'. In production, it will use the VITE_API_URL.
    "process.env.API_URL": JSON.stringify(process.env.VITE_URL || "/api")
  }
});
