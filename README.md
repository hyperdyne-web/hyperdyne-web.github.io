# HYPERDYNE 웹사이트 — 깃허브 업로드 가이드

## 무엇을 깃허브에 올려야 하나요?

아래 **6개 항목만** 저장소(레포)의 루트에 업로드하시면 됩니다.
`preview.html`, `UPLOAD_GUIDE.md`, `Mainpage_Middle_imagelist.txt` 는 작업 확인용이라 올리지 않아도 사이트는 정상 동작합니다 (올려도 무방).

```
hyperdyne.co.kr/  ← 깃허브 저장소 루트
├── index.html              ← 메인 페이지
├── style.css               ← 디자인 / 반응형
├── script.js               ← 이미지 회전 · 별 · 시계
├── CNAME                   ← (이미 도메인 작업되어 있다면 그대로 두기)
└── assets/
    ├── brand/
    │   ├── hyperdyne_logo.png         ← 300dpi 풀로고
    │   └── hyperdyne_logo_small.png   ← 100dpi (favicon용)
    └── products/
        ├── m01_long_motor1.png
        ├── m02_long_motor2.png
        ├── m03_rotor_long.png
        ├── m04_rotor_long1.png
        ├── m05_bldc_rotor1.png
        ├── m06_bldc_hollow1.png
        ├── m07_bldc_hollow2.png
        ├── m08_elastic_single.png
        ├── m09_elastic2.png
        ├── m10_wolform_reducer.png
        └── m11_wolform_reducer2.png
```

## 업로드 안 해도 되는 파일 (작업·검토용)

- `mobile.html` — 모바일 프레임 안에 사이트 렌더링 (확인용).
- `UPLOAD_GUIDE.md` — 이 가이드 파일.
- `Mainpage_Middle_imagelist.txt` — 이미지 회전 리스트 메모.
- `uploads/` — 원본 자료 폴더.

## CNAME 파일

`hyperdyne.co.kr` 도메인이 이미 연결되어 있다면, 기존 저장소의 `CNAME` 파일을 그대로 유지하세요. 신규 저장소라면 한 줄짜리 파일을 만들어 주세요:

```
hyperdyne.co.kr
```

## 깃허브 페이지 활성화

1. 저장소 → **Settings** → **Pages**
2. Source: **Deploy from a branch** → Branch: **main** / Folder: **/(root)**
3. 저장 → 1~2분 뒤 배포 완료

## 이미지 회전 / 순서 변경

`script.js` 상단의 `PRODUCT_IMAGES` 배열에서 순서 / 표기 ID / 표기 이름을 자유롭게 바꾸시면 됩니다. 회전 주기는 `setInterval(rotateHero, 2500)` 의 `2500`(ms)을 수정.

## 향후 페이지 확장

`technology.html`, `products.html` 같은 식으로 별도 페이지를 만드시고 메뉴 링크의 `href="#..."` 를 해당 파일 경로로 바꾸면 됩니다. 추가 페이지 작업 시 고해상도 이미지가 필요하면 알려주세요. 페이지 안에는 다음과 같이 placeholder를 적어두겠습니다:

```html
<!-- 📷 PLACEHOLDER — 기술소개서 p.12 (우하단 페이지번호 기준)
     "BLDC 모터 절단도" 이미지 필요 -->
```
