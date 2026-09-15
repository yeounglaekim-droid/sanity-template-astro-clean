import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_STUDIO_URL,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");

const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET;
const studioUrl = PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: "2026-03-26", 
      stega: {
        studioUrl,
      },
    }),
    react(), 
  ],
  vite: {
    optimizeDeps: {
      include: [
        "react/compiler-runtime",
        "lodash/isObject.js",
        "lodash/groupBy.js",
        "lodash/keyBy.js",
        "lodash/partition.js",
        "lodash/sortedIndex.js",
      ],
    },
    // ⚠️ 에러 로그에 찍힌 Wrangler 번들러의 플랫폼 제한을 무력화하기 위해 Vite 빌드 대상을 강제로 정렬합니다.
    build: {
      ssr: true,
      rollupOptions: {
        external: ["fs", "child_process"]
      }
    },
    plugins: [tailwindcss()],
  },
});
