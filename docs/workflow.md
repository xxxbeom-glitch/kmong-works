# 작업 절차

## A. 템플릿 만들기 (판매 전 준비)

1. 템플릿 이름(slug)·대상 업종·페이지 구성 정하기 → `decisions.md`
2. `templates/{template}/` 에 테마 작성 — 고객마다 바뀌는 값은 한곳에 모으기
3. `templates/{template}/README.md` 에 적기: 페이지 구성 · 고객이 관리자에서 고칠 수 있는 것 · 바꿔야 할 값 목록
4. `npm run dev -- templates/{template}` 로 확인 (767 / 1024 / 1600 폭)
5. 샘플 콘텐츠로 스크린샷 → `kmong/portfolio/{template}/`

## B. 주문 들어왔을 때

1. 받을 자료 체크: 상호 · 로고 · 대표색 · 연락처/주소 · 문구 · 사진 · 원하는 템플릿 · 도메인 · 카페24 WP 개설 여부
2. `npm run new-client -- {template} {client}` → `clients/{client}/` 생성
3. 고객 값 반영 → `npm run dev -- clients/{client}` 로 확인
4. `npm run package -- clients/{client}` → `dist/{client}.zip`
5. 카페24 WordPress에 업로드·활성화 → 실제 화면 확인
6. 납품: ZIP + 관리자 사용 안내(글 쓰기, 이미지 바꾸기) + 백업·업데이트 안내
7. 고객 작업 중 좋은 개선이 생겼으면 템플릿 원본에도 반영할지 판단

## 완료 전 확인

- [ ] 테마 활성화 시 오류 없음
- [ ] 767 / 1024 / 1600 폭 레이아웃
- [ ] 고객 값이 전부 바뀌었는지 (샘플 상호·전화번호가 남아 있지 않은지 검색)
- [ ] 관리자에서 고친 값이 화면에 반영
- [ ] 고유주소(permalink) 저장 후 링크 정상
- [ ] 카페24 실서버 업로드 후 확인
