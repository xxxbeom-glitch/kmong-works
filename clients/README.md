# clients/

주문별 작업본. `npm run new-client -- {template} {client}` 로 템플릿을 복사해 만든다.

- 고객이 준 원본 자료(사진·문서) 중 git에 넣기 싫은 것은 `clients/{client}/_private/` 에 (git 제외, ZIP에도 안 들어감)
- 납품 ZIP: `npm run package -- clients/{client}` → `dist/{client}.zip`
