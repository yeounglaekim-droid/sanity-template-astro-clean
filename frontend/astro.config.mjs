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
  // ⚠️ v14 최신 어댑터 규격에 부합하도록 순정 상태로 어댑터를 깨끗하게 초기화합니다.
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
    // ⚠️ 최신 아스트로 v7 엔진 기준, 샌드박스가 호출하는 구형 노드 모듈을 Vite 컴파일러가 완전히 무시하고 패스하게 만드는 치트키 코드입니다.
    ssr: {
      external: ["node:fs", "node:child_process"]
    },
    plugins: [tailwindcss()],
  },
});
