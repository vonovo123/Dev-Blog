# Sanity 복붙용 — 경력 데이터 (NICE평가정보 UX개발실)

> 원본: `경력기술서_NICE평가정보_UX개발실.md`  
> Sanity `career` / `work` / `skill` 입력용  
> 날짜는 `YYYY-MM-DD` 형식 (Sanity datetime에 그대로 붙여넣기)

---

## career (회사/소속 1건)

```
name: 하나금융TI · 하나은행 플랫폼 개발부
from: 2019-01-01
to: 2026-07-18
```

> `to`는 재직 중이면 Studio에서 오늘 날짜로 맞추거나, 스키마에 종료일 없으면 비워도 됨.

---

## work (업무 단위 — 아래 블록을 각각 문서/항목으로 복붙)

각 블록 필드:
- **name** — 업무명
- **from** — 시작일
- **to** — 종료일
- **description** — 설명
- **skill** — 기술 (쉼표 구분 → Sanity skill reference로 연결)

---

### work 1

```
name: 대고객 간편 모바일 채널 BT WAS 개발
from: 2019-02-01
to: 2019-05-31
description: 새롭게 기획된 대고객 간편 모바일 채널에서 사용할 Business Tier WAS(BT WAS) 개발을 담당. 화면과 데이터가 결합해 있던 기존 앱의 JSP 중심 레거시 코드를 분석하여, BT WAS에서 처리된 비즈니스 로직 데이터가 JSON 형태로 PT WAS까지 전달되는 API를 개발. 주요 업무: (1) 구조 개선 및 레거시 분석 — 화면·데이터가 결합된 JSP 구조를 분석하여 WAS-to-WAS 통신이 가능하도록 비즈니스 로직 분리 (2) API 개발 및 DB 연동 — Java와 Oracle을 활용해 대고객 조회·이체 등의 비즈니스 로직 API 개발.
skill: Java, Oracle
```

---

### work 2

```
name: 대고객 간편 모바일 채널 오픈뱅킹(대외 연계) 서비스 도입
from: 2019-06-01
to: 2019-09-30
description: 네이티브 앱 내에서 웹뷰로 동작하는 오픈뱅킹 서비스의 화면과 서버 API 개발을 담당. 대외 오픈뱅킹 기관과 BT WAS를 연계하여 연계 데이터를 PT WAS로 전달하고, 기획 요구사항에 맞춰 최종 사용자 화면까지 구현. 주요 업무: (1) 대외 API / WAS 간 연계 — Java로 대외 오픈뱅킹 API·시스템과 BT WAS 연계 (2) API 개발 — API 정의서 기반 BT WAS 내 오픈뱅킹 서비스 API 개발 (3) 웹뷰 화면 구현 — 오픈뱅킹 조회·가입 화면을 PT WAS에 구현.
skill: Java, Oracle, jQuery
```

---

### work 3

```
name: 차세대 대고객 모바일 채널 BT WAS 개발
from: 2020-02-01
to: 2021-02-28
description: 차세대 대고객 모바일 채널의 BT WAS 개발을 담당. 레거시 JSP 구조를 분석하여 BT WAS의 비즈니스 로직 데이터를 XML DTO로 PT WAS에 전달했고, 코어뱅킹·채널계 DB 데이터를 바탕으로 복잡한 유효성 검증, DB 트랜잭션, 대외 기관 연계 등 실질적인 백엔드 로직을 개발. 주요 업무: (1) 핵심 비즈니스 로직·트랜잭션 구현 — 여신·수신·조회 등 채널 서비스의 핵심 로직 개발 및 정합성 있는 DB 트랜잭션 처리 (2) 금융 전문 파싱·데이터 매핑 — BT–PT 간 송수신 전문 데이터의 파싱 및 비즈니스 데이터 매핑 (3) Oracle DB 연동·쿼리 최적화 — 조회·적재 로직 작성 및 쿼리 튜닝을 통한 처리 성능 관리.
skill: Java, Oracle
```

---

### work 4

```
name: 대고객 웹 채널 서비스 고도화
from: 2021-02-01
to: 2021-06-30
description: 대고객 웹 채널의 학생증 발급·퇴직연금 서비스 고도화를 위해 BT WAS와 PT WAS를 함께 개발. Java 기반 비즈니스 로직과 JavaScript/jQuery 기반 화면을 모두 담당. 주요 업무: (1) BT WAS 비즈니스 로직 개발 — 발급·연금 처리 가이드에 따른 검증·정보 조회·원장 연계 API 개발 (2) PT WAS 화면·데이터 제어 — 사용자가 단계별로 수행하는 화면 UI와 입력 데이터 제어 로직 구현 (3) DB 연동·쿼리 최적화 — 신청 데이터 적재·조회 쿼리 작성, 원장 연동 결과와 채널계 DB 간 정합성 관리.
skill: Java, JavaScript, jQuery, Oracle
```

---

### work 5

```
name: 대고객 모바일 채널 BT WAS 운영 및 PT WAS 개발
from: 2021-06-01
to: 2025-12-31
description: 차세대 채널 도입 이후 BT WAS 운영과 신규 서비스 개발을 병행. 운영 중 발생하는 장애·수정 요건에 대응하는 한편, PT WAS에 도입된 Vue.js로 자산관리 서비스·대고객 이벤트 화면 등의 대고객 서비스를 개발했고, 순수 JavaScript(Vanilla JS)로 관계사 제휴 공통 모듈을 구축. 주요 업무: (1) BT WAS 운영·장애 대응 — 안정화 기간 중 시스템 장애·연계 오류 대응, 비즈니스 로직 수정 요건 반영 (2) Vue.js 기반 채널 서비스 개발 — 자산관리 서비스·대고객 이벤트 등 대고객 서비스 프론트 로직 개발 (3) 관계사 제휴 공통 모듈 개발 — 라이브러리 의존성 없는 순수 JS 기반 공통 제휴 모듈 구축 (4) BT–PT 통합 개발 — 화면 데이터 처리부터 백엔드 로직·DB 연동까지 병행 개발.
skill: Java, Oracle, JavaScript, Vue.js
```

---

### work 6

```
name: 차세대 대고객 모바일 채널 공통 서비스 개발 및 운영
from: 2026-01-01
to: 2026-07-18
description: 차세대 채널 프로젝트 후반부에 운영 담당자로 합류하여 3개월간 체계적인 인수인계·직무 교육을 마침. React 기반 PT WAS와 Spring MVC 기반 BT WAS 환경에서 채널 공통 영역(인증·로그인, 네이티브 앱–웹뷰 연계)의 안정적 운영과 신규 서비스 병행 개발을 전담. 주요 업무: (1) 채널 공통 영역 장애 대응·유지보수 — 오픈 초기 안정화 기간에 로그인·본인 인증·네이티브 연계 인터페이스 결함 보수 (2) PT–BT 통합 공통 기능 개발 — React(PT)·Spring Boot(BT)로 인증 절차·네이티브 브릿지 통신 등 공통 기능 개발 (3) 운영 프로세스 내재화 — 빌드/배포 파이프라인·시스템 사양 파악을 통해 오픈 이후 안정 운영에 기여.
skill: React, Spring Boot, Java, JavaScript, TypeScript, Oracle
```

> `to`는 재직 중이면 오늘 날짜로 갱신.

---

### work 7

```
name: 대고객 채널 배치(Batch) 서비스 개발
from: 2019-01-01
to: 2026-07-18
description: 앱푸시 재발송, 누락 파일 일괄 전송, 상품 예약 가입, 이벤트 관리 등 대고객 서비스 운영에 필요한 정기/실시간 배치 프로그램을 개발·운영. (원문 기간: 상시)
skill: Java
```

> 원문이 「상시」라 `from`/`to`는 회사 재직 기간으로 맞춤. Studio에서 조정 가능.

---

## skill (중복 제거 목록 — skill 문서로 먼저 만들어 두면 편함)

아래 name만 skill 문서로 만들고, work의 skill 칸에서 reference로 연결.

```
Java
Oracle
jQuery
JavaScript
Vue.js
React
Spring Boot
TypeScript
```

---

## 복붙 순서 추천

1. Sanity에서 **skill** 문서부터 생성 (위 목록)  
2. **work** 문서 7개 생성 (name / from / to / description / skills 연결)  
3. **career** 문서 1개 생성 후 `works`에 work 1~7 reference 연결  

---

## 참고 — UI에서 쓰는 필드

| Sanity 필드 | 화면 |
| --- | --- |
| career.name | 회사/소속명 |
| career.from / to | 재직 기간 |
| work.name | 업무명 |
| work.from / to | 업무 기간 |
| work.description | 업무 설명 |
| skill.name | 기술 태그 |
