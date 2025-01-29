import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: "https://chat-front-i6td.vercel.app",
    proxy: {
      "/api": {
        target: `https://chat-backend-1-ukrx.onrender.com`,
        changeOrigin: true
      }
    }
  }
});
