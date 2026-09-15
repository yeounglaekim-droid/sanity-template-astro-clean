import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_STUDIO_DATASET || "production",
  useCdn: false, // 실시간 데이터 수급을 위해 false 고정
  apiVersion: "2026-03-26", // 아스트로 설정 파일과 버전을 완전히 일치시킵니다.
});
