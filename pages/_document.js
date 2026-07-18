import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta property="og:title" content={"Dynamic_Kwon Dev Blog"} />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content={"금융권 프론트엔드 개발자 권현우의 기술 블로그입니다."}
        />
        <meta property="og:article:author" content="dynamic_kwon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
