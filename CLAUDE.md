# kmong-works — 에이전트 규칙

## 이 프로젝트

- 크몽 판매용 **템플릿형 WordPress 사이트**. 호스팅은 **카페24 WordPress (고객 명의)**.
- 상품 방식: 템플릿 몇 종을 미리 만들어 두고, 주문이 오면 골라서 고객 정보(로고·색·문구·이미지)로 바꿔 납품.
  맞춤 제작(A to Z)은 기본 상품이 아님.
- 사용자는 **비개발 UI 디자이너**. 보고는 짧고 쉬운 한국어로: 바뀐 것 3~5줄 · 확인할 곳 1줄 · 질문 1개.

## 폴더

```
templates/{template}/   판매용 템플릿 원본 (WP Classic 테마 하나 = 폴더 하나)
clients/{client}/       주문별 작업본 — templates에서 복사 (npm run new-client)
shared/icons/           아이콘 원본. 테마에는 쓰는 것만 assets/icons/로 복사 (런타임 링크 금지)
kmong/listing|portfolio 크몽 상품 페이지·포트폴리오 자료
docs/                   business.md(상품·가격) · workflow.md(주문→납품) · decisions.md(결정 기록)
tools/                  dev.js · new-client.js · package.js
dist/                   ZIP 산출물 (git 제외)
```

- 템플릿·고객 폴더 이름(slug)은 **사용자 확인 후** 만든다. 영문 소문자-하이픈.
- 고객 작업본에서 고친 것 중 다른 고객에게도 좋은 개선이면 **템플릿 원본에도 반영할지** 물어본다.

## 테마 기술 규칙

- **WordPress Classic 테마** (PHP + CSS + JS). React/Next 금지. Elementor 등 빌더는 사용자가 요청할 때만.
- CSS/JS는 `wp_enqueue_*`로만. jQuery CDN 중복 로드 금지.
- 폰트 SUIT 기본. 모션은 필요할 때만 GSAP+ScrollTrigger, 슬라이더는 필요할 때만 Swiper.
- 템플릿은 재판매되므로 **고객마다 바뀌는 값(상호·연락처·주소·로고·대표색·SNS)은 한곳에 모은다** — 하드코딩 흩뿌리기 금지.
  어디에 모을지(Customizer / 옵션 페이지 / 설정 파일)는 첫 템플릿 만들 때 정하고 `docs/decisions.md`에 기록.
- 고객이 관리자에서 고칠 범위는 템플릿마다 `templates/{template}/README.md`에 적는다.
- 비밀키·비밀번호를 테마나 JS에 넣지 않는다.
- 병원·의원 업종은 초기 대상에서 제외 (의료광고 규제).

## 납품 ZIP

- `npm run package -- clients/{client}` → `dist/{client}.zip`
- ZIP은 `tar`로 만든다 — 경로 구분자가 `\`면 카페24(Linux)에서 style.css를 못 찾는 문제가 있었음.
- ZIP 최상위는 테마 폴더 하나. `dist/`, `node_modules/`, `.gitkeep`, `*.local.php`는 제외.

## 로컬 확인

- PHP·Docker 없이 **WordPress Playground CLI**(npx)로 돌린다: `npm run dev -- templates/{template}`
  → http://127.0.0.1:9400 (자동 로그인). 데이터는 껐다 켜면 초기화.
- 완료라고 말하기 전: 테마 활성화 오류 없음 · 767/1024/1600 폭 확인 · 관리자에서 고친 값이 화면에 반영되는지 확인.

## 참고 자료 (이전 맞춤 제작 레포)

`D:\project\kmong-templates` — 그대로 따르지 말고 필요한 것만 가져온다.
- 디자인 토큰: `.cursor/sot/05-design-tokens.md` · 디자인 취향: `.cursor/sot/06-design-do-dont.md`
- WP 보안: `.cursor/rules/71-wordpress-security.mdc` · 최종 검수: `72-wordpress-final-verify.mdc`
- 서브페이지 구성: `.cursor/sot/04-wordpress-subpage.md`
- 기존 테마 예시: `wordpress/template-a/` (Classic) · `wordpress/template-a-blocks/` (블록)

## git

- 커밋은 사용자가 요청할 때만. push 금지(원격 없음).
- 결정이 생기면 `docs/decisions.md`에 날짜와 함께 한 줄.
