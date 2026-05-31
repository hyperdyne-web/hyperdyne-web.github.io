# HYPERDYNE 웹사이트 — 깃허브 업로드 가이드

## ⚠️ 반드시 함께 올려야 할 카탈로그 PDF 2개

이번 버전에는 카탈로그 다운로드 버튼(히어로 + Contact)이 추가됐습니다.
아래 **두 PDF 파일을 깃허브 저장소 루트에 정확히 이 이름으로** 올려야 다운로드가 작동합니다:

```
Catalog_ENG_v4.pdf     ← 영문 카탈로그
Catalog_Kor_v4.pdf     ← 한글 카탈로그
```

(아직 안 올리면 다운로드 버튼이 404가 납니다. 파일명 대소문자까지 정확히 맞춰주세요.)

## 깃허브에 올릴 파일

```
저장소 루트/
├── index.html
├── style.css
├── script.js
├── CNAME
├── Catalog_ENG_v4.pdf      ← 직접 추가 (영문)
├── Catalog_Kor_v4.pdf      ← 직접 추가 (한글)
└── assets/
    ├── brand/
    │   ├── hyperdyne_logo.png
    │   └── hyperdyne_logo_small.png
    └── products/
        ├── QRHD.png  QLHD.png  RHD.png  LHD.png   ← 제품 4종
        └── m01~m12 ...                            ← 히어로 회전용
```

## 업로드 방법 (덮어쓰기)

1. `hyperdyne-web/hyperdyne-web.github.io` 저장소 → **Add file → Upload files**
2. 받은 `deploy` 폴더 내용물 전부 + 카탈로그 PDF 2개 드래그
3. 같은 이름은 자동 덮어쓰기됨 → 아래로 스크롤 → **Commit changes**
4. 1~2분 뒤 hyperdyne.co.kr 반영 → 강력 새로고침(Cmd/Ctrl+Shift+R)으로 확인

## 안 올려도 되는 파일 (작업·확인용)

- `mobile.html` — 모바일 프레임 미리보기
- `*.md`, `Mainpage_Middle_imagelist.txt`, `uploads/`, `deploy/README.md`

## 언어 전환 (ENG / KOR)

- 우상단 `EN / KOR` 버튼으로 전체 페이지가 영↔한 전환됩니다.
- **기본값은 영어(EN)**, 방문자 선택은 브라우저에 저장됩니다.
- 텍스트는 `index.html` 안에서 `<span data-lang="en">` / `<span data-lang="ko">` 쌍으로 관리됩니다. 문구 수정 시 두 언어를 함께 고쳐주세요.

## 메인 이미지 회전 / 카탈로그 항목

- 회전 순서·주기: `script.js` 의 `PRODUCT_IMAGES`, `setInterval(rotateHero, 2500)`
- 히어로 하단 흐르는 띠(13개 항목): `script.js` 의 `buildMarquee()` 안 `items` 배열
