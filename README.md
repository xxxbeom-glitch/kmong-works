# kmong-works

크몽에서 파는 **템플릿형 워드프레스 사이트** 작업 공간.
카페24 WordPress 호스팅(고객 명의)에 올리는 Classic 테마를 만든다.

- 처음부터 맞춤 제작(A to Z)이 아니라, **미리 만든 템플릿 몇 종**을 골라 고객 정보로 바꿔서 납품
- 이전 맞춤 제작 레포: `D:\project\kmong-templates` (참고용)

| 폴더 | 뭐가 들어가요 |
|------|---------------|
| `templates/` | 판매용 템플릿 원본 테마 (템플릿마다 한 폴더) |
| `clients/` | 주문별 작업본 (템플릿을 복사해서 고객 것으로 수정) |
| `shared/` | 템플릿끼리 같이 쓰는 아이콘 원본 등 |
| `kmong/` | 크몽 상품 등록 자료 (상세페이지, 포트폴리오 이미지) |
| `docs/` | 사업 정리 · 작업 절차 · 결정 기록 |
| `tools/` | 로컬 실행 · 새 주문 만들기 · ZIP 만들기 스크립트 |

## 자주 쓰는 명령

```bash
npm run dev -- templates/{이름}      # 로컬 워드프레스에서 테마 미리보기
npm run new-client -- {템플릿} {고객slug}   # 템플릿 복사해서 주문 작업본 만들기
npm run package -- clients/{고객slug}      # 업로드용 ZIP 만들기 → dist/
```

자세한 규칙은 `CLAUDE.md`, 절차는 `docs/workflow.md`.
