import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
// ⚠️ 버셀(Vercel)을 도려내고, 진짜 우리가 사용하는 클라우드플레어 부품을 장착합니다!
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

// https://astro.build/config
export default defineConfig({
  output: "server",
  // ⚠️ 서버 가동 엔진 자물쇠를 클라우드플레어로 완벽하게 일치시킵니다!
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
    plugins: [tailwindcss()],
  },
});
