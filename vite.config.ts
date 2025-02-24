import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap"; // правильный импорт

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      sitemap({
        hostname: "https://sherzod-raxmon.vercel.app",
        exclude: ["/admin", "/login"], // Исключаем приватные страницы
      }),
    ],
  };
});
