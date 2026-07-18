/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // react-syntax-highlighter는 CommonJS 빌드에서 ESM 전용 패키지(refractor)를
  // require()로 불러온다. 이를 그대로 서버 외부 모듈로 두면 구버전 Node 런타임에서
  // ERR_REQUIRE_ESM이 발생하므로, 번들에 포함(transpile)시켜 런타임 require를 없앤다.
  transpilePackages: ["react-syntax-highlighter"],
  env: {
    // projectId만 클라에 노출 (이미지 URL 빌더용). AUTH 토큰은 서버 전용.
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  },
  async redirects() {
    return [
      {
        source: "/portpolio",
        destination: "/portfolio",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
