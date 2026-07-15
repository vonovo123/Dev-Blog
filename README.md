# Dynamic_Kwon Dev Blog & Portfolio

Sanity(headless CMS)를 백엔드로 사용하는 개인 기술 블로그 겸 포트폴리오 웹 애플리케이션입니다. Next.js(Pages Router) 기반 SSR/SSG로 동작합니다.

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| 프레임워크 | [Next.js](https://nextjs.org/) 16 (Pages Router) |
| UI 라이브러리 | [React](https://react.dev/) 19 |
| 컴포넌트 | [Ant Design](https://ant.design/) 6, [@ant-design/icons](https://ant.design/components/icon) 6 |
| CMS / 데이터 | [Sanity](https://www.sanity.io/) — `@sanity/client` 7, `@sanity/image-url` 2 |
| 콘텐츠 렌더링 | `@portabletext/react` 6 (Portable Text), `react-markdown` 10 + `remark-gfm` 4, `react-syntax-highlighter` 16 |
| 유틸 | `dayjs`, `lodash`, `classnames`, `react-transition-group` |
| 린팅 | ESLint 9 (flat config) + `eslint-config-next` 16 |
| 스타일 | CSS Modules + Ant Design CSS-in-JS |

## 주요 기능

- **블로그**: 카테고리 / 서브카테고리별 글 목록, 최근 글 · 인기 글, 무한 스크롤 댓글/대댓글
- **포트폴리오 & 커리어**: 프로젝트 소개, 경력 타임라인
- **콘텐츠 렌더링**: Sanity Portable Text(Block Content)와 Markdown 혼합 지원, 코드 하이라이팅
- **부가 기능**: 목차(TOC) 자동 생성, 조회수 증가, 반응형 레이아웃


## 프로젝트 구조

```
portpolio/
├── pages/                # 라우트 (index, career, portpolio, post/[slug], 404, _app, _document, api)
├── components/           # UI 컴포넌트 (About, Header, Footer, Carousel, Comment, Element 등)
├── services/             # 데이터 접근 계층 (SanityService, GitProfileService)
├── utils/                # 헬퍼 (Observer, Headings, LocalStorage 등)
├── styles/               # 전역 스타일 및 CSS Modules
├── fonts/                # 폰트 파일
├── assets/ · public/     # 정적 리소스
├── next.config.js        # Next.js 설정 (env 매핑)
└── eslint.config.mjs     # ESLint flat config
```