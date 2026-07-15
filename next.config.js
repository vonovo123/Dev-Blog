/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // react-syntax-highlighter는 CommonJS 빌드에서 ESM 전용 패키지(refractor)를
  // require()로 불러온다. 이를 그대로 서버 외부 모듈로 두면 구버전 Node 런타임에서
  // ERR_REQUIRE_ESM이 발생하므로, 번들에 포함(transpile)시켜 런타임 require를 없앤다.
  transpilePackages: ["react-syntax-highlighter"],
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_AUTH_TOKEN: process.env.SANITY_AUTH_TOKEN,
  },
};

module.exports = nextConfig;
