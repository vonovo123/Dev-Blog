# Dev_Blog 

> Headless CMS(Sanity)를 백엔드로 사용하는 개인 기술 블로그 애플리케이션.
> Next.js(Pages Router) 기반 SSR/SSG로 동작하며 Vercel에 배포되어 있습니다.

**🔗 라이브 데모:** https://dev-blog-woad.vercel.app/
**📦 저장소:** https://github.com/vonovo123/portpolio

---

## 📌 메타정보

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | Dynamic_Kwon Dev Blog & Portfolio |
| 한 줄 소개 | Next.JS / Sanity 헤드리스 CMS 기반의 개인 기술 블로그 |
| 유형 | 개인 프로젝트 (1인 개발 — 기획 · 프론트엔드 · CMS 연동 · 배포) |
| 기간 | _(작성 필요: 예) 2022.01 ~ 진행 중_ |
| 담당 역할 | 프론트엔드 개발 전반, Sanity 스키마/콘텐츠 모델링, 배포/운영 |
| 배포 | Vercel (GitHub 연동 자동 CI/CD) |
| 라이브 URL | https://dev-blog-woad.vercel.app/ |
| 저장소 URL | https://github.com/vonovo123/portpolio |
| 핵심 키워드 | `Next.js` `React 19` `SSR/SSG` `Headless CMS(Sanity)` `Ant Design 6` `Portable Text` `Vercel` `반응형 웹` |

---

## 🧭 프로젝트 개요

개발 학습 내용을 기록하는 **기술 블로그** 를 구현한 프로젝트입니다.
글·프로필 등 모든 콘텐츠는 코드 배포 없이 **Sanity(헤드리스 CMS)** 에서 관리하며, Next.js가 요청 시점(SSR) 또는 빌드 시점(SSG)에 이를 받아 렌더링합니다.

- **콘텐츠와 코드의 분리:** 글 작성·수정이 배포와 무관하게 이뤄지도록 CMS를 도입.
- **검색 최적화(SEO):** 서버 사이드 렌더링과 Open Graph 메타 태그로 크롤러 친화적 페이지 구현.
- **부가 기능:** 목차(TOC), 코드 하이라이팅, 반응형 레이아웃으로 블로그의 가독성을 위한 컴포넌트 개발에 집중.

---

## ✨ 주요 기능

### 블로그
- 카테고리 / 서브카테고리 기반 글 네비게이션 (데스크톱 · 모바일 메뉴 분리)
- 최근 글 · 인기 글 목록, 캐러셀(슬라이드)을 통한 최근 글 노출
- 글 목록 페이지네이션 및 무한 스크롤

### 콘텐츠 렌더링
- **Portable Text(Sanity Block Content)** 와 **Markdown** 혼합 렌더링
- 코드 블록 **신택스 하이라이팅** (`react-syntax-highlighter`)
- 문서 헤딩 기반 **목차(TOC) 자동 생성** 및 스크롤 위치 하이라이팅(IntersectionObserver)
- 글 **조회수** 집계

### 댓글
- 댓글 / 대댓글(중첩) 작성·조회
- 스크롤 하단 감지를 통한 댓글 **무한 스크롤 로딩**

### 공통 · UX
- 반응형(모바일/데스크톱) 레이아웃 및 모바일 슬라이드 메뉴
- `ABOUT ME` 프로필 패널 토글
- SEO/OG 메타 태그(`HeadMeta`, `_document`), Google AdSense 광고 영역

---

## 🛠 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| 프레임워크 | [Next.js](https://nextjs.org/) 16 (Pages Router) |
| UI 라이브러리 | [React](https://react.dev/) 19 |
| 컴포넌트 | [Ant Design](https://ant.design/) 6, [@ant-design/icons](https://ant.design/components/icon) 6 |
| CMS / 데이터 | [Sanity](https://www.sanity.io/) — `@sanity/client` 7, `@sanity/image-url` 2 |
| 콘텐츠 렌더링 | `@portabletext/react` 6 (Portable Text), `react-markdown` 10 + `remark-gfm` 4, `react-syntax-highlighter` 16 |
| 유틸 | `dayjs`, `lodash`, `classnames`, `react-transition-group` |
| 스타일 | CSS Modules + Ant Design CSS-in-JS |
| 린팅 | ESLint 9 (flat config) + `eslint-config-next` 16 |
| 배포 / 인프라 | Vercel (Node 22.x 서버리스) |

---

## 🏗 아키텍처 & 데이터 흐름

```mermaid
flowchart LR
  A["Sanity CMS<br/>(콘텐츠 · 이미지)"] -->|GROQ 쿼리| B["services/SanityService"]
  B --> C{"Next.js Data Fetching"}
  C -->|getServerSideProps| D["SSR 페이지<br/>/ · /career · /portfolio · /post/[slug]"]
  C -->|getStaticProps| E["정적 페이지<br/>/404 · /page"]
  D --> F["React 19 + Ant Design 6 렌더"]
  E --> F
  F --> G["Vercel 서버리스 배포"]
```

- **데이터 접근 계층(`services/`)** 에서 Sanity GROQ 쿼리를 캡슐화하여 페이지 로직과 분리.
- 콘텐츠 성격에 따라 **요청 시점 렌더링(SSR)** 과 **빌드 시점 정적 생성(SSG)** 을 혼용.

---

## 🔍 Troubleshooting

### 1. Vercel 프로덕션 500 에러 디버깅 (ERR_REQUIRE_ESM)
- **문제:** 로컬은 정상인데 배포 후 SSR 페이지만 500. 정적 페이지·API는 정상이라 원인 파악이 까다로움.
- **분석:** "정적 페이지·API 정상 / SSR 페이지만 실패" 로 범위를 좁히고, 런타임 로그에서 원인 확인 →
  `react-syntax-highlighter`(CommonJS)가 **ESM 전용 패키지 `refractor`를 `require()`** 하면서 구버전 Node에서 `ERR_REQUIRE_ESM` 발생. (로컬 Node 24는 `require(ESM)`을 허용해 문제가 드러나지 않았음)
- **해결:** `next.config.js`의 `transpilePackages`로 해당 패키지를 **서버 번들에 포함**시켜 런타임의 외부 `require`를 제거하고, 배포 Node 버전을 `22.x`로 고정.

### 2. 민감 정보(토큰) 분리
- **문제:** Sanity 프로젝트 ID와 토큰이 코드/설정에 하드코딩되어 노출.
- **해결:** `.env.local` 및 Vercel 환경 변수로 분리하고, 필요한 키를 `.env.example`로 문서화.

---

## 📂 프로젝트 구조

```
Dev-Blog/
├── pages/                # 라우트 (index, career, portfolio, post/[slug], 404, _app, _document, api)
├── components/           # UI 컴포넌트 (About, Header, Footer, Carousel, Comment, Element 등)
├── services/             # 데이터 접근 계층 (SanityService, GitProfileService)
├── utils/                # 헬퍼 (Observer, Headings, LocalStorage, sanityApi 등)
├── styles/               # 전역 스타일 및 CSS Modules
├── fonts/ · assets/ · public/   # 폰트 · 정적 리소스
├── next.config.js        # Next.js 설정 (env 매핑, transpilePackages, /portpolio → /portfolio 리다이렉트)
└── eslint.config.mjs     # ESLint flat config
```

## 📝 변경 이력 — 2026.07.18 UI/UX · 안정성 개선

오늘 세션에서 진행한 soft-light 톤 리프레시와 가독성·네비게이션 개선 요약입니다.

### 비주얼 / 브랜드
- soft-light 팔레트·CSS 토큰 정리 (`--muted-font-color`, elevated 배경 등)
- 헤더 브랜드(`Dynamic_Kwon` + favicon 마크) 및 ABOUT ME 배치 조정
- 푸터 개선: 브랜드·Posts/Career/Portfolio/GitHub 링크·저작권
- About Me: 기술 스택 표시, 둥근 사각형 프로필 이미지, 닫기 버튼(전 구간)
- 모바일: ABOUT ME를 메뉴 하단으로 이동

### 네비게이션 / 라우팅
- 푸터·페이지 전환 시 stale `menuType`/`post`로 인한 홈↔포트폴리오 교차 이동 루프 수정
- Career/Portfolio 데이터 방어 코드 (`works`, `markdown` 등)
- 모바일 메뉴 리디자인: 토글 버튼, 메뉴/카테고리 2열, 배경 유지 + 텍스트만 교체, 자연스러운 열림 애니메이션
- 카테고리 패널 그라데이션 제거(단색)

### 포스트 목록 / 상세(Slug)
- 목록 날짜 `MM.DD` 표기
- 모바일 리스트: 이미지 위 오버레이(날짜·제목·부제·미리보기)
- 데스크톱 리스트 썸네일 120×120 정사각 정렬
- 상세 히어로: 어두운 오버레이 위 타이틀/서브타이틀
- 경로(브레드크럼) 글자 크기 축소
- 마크다운 가독성: `react-markdown` + `remark-gfm` prose 타이포, 코드 언어 라벨, 줄간 조정
- 댓글 입력 UI 패널/포커스/primary·secondary 버튼 정리

### 데이터 / 인프라
- 카테고리·서브카테고리 목록 `[0...5]` 하드 리밋 제거 → 전체 글 조회
- Sanity 호출을 `/api/sanity/*`로 분리해 클라이언트 토큰 노출 완화
- `/portpolio` → `/portfolio` 리다이렉트
- Turbopack CSS 파싱 오류(`:global(> *)`) 수정

### Sanity 경력 데이터
- 경력기술서 기준 Sanity 복붙용 문서 정리 (`sanity_career_paste_NICE_UX개발실.md`)

---

## 🔑 환경 변수

| 변수 | 설명 |
| --- | --- |
| `SANITY_PROJECT_ID` | Sanity 프로젝트 ID |
| `SANITY_AUTH_TOKEN` | Sanity 읽기 토큰 |
