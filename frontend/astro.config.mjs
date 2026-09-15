import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_STUDIO_URL,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");

const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET;
const studioUrl = PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

// https://astro.build
export default defineConfig({
  // 에러를 유발하던 output: "server"와 adapter 설정을 완전히 제거하여 순정(SSG) 모드로 돌립니다.
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
