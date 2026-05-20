# HYPERDYNE GitHub Pages 정적 웹사이트 초안

## 1. 프로젝트 목적

본 프로젝트는 HYPERDYNE 소개를 위한 GitHub Pages용 정적 웹사이트 초안입니다.

React, Next.js, Vite, 백엔드 서버를 사용하지 않고 `HTML`, `CSS`, `JavaScript`만으로 구성하여 GitHub Pages에 바로 배포할 수 있도록 제작했습니다.

디자인 방향은 SpaceX 메인페이지처럼 어두운 배경, 강한 히어로 섹션, 제품 이미지 중심의 기술기업 랜딩페이지 스타일을 참고했습니다. 현재 단계에서는 회사 소개보다는 HYPERDYNE의 기술 비전과 핵심 포트폴리오를 간결하게 보여주는 것을 목표로 했습니다.

## 2. 파일 구조 설명

```text
hyperdyne-website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── bldc-motor.jpeg
    ├── hollow-bldc-motor.jpeg
    ├── long-rotor.jpg
    ├── wolfrom-reducer.png
    └── motor-winding.png
```

- `index.html`: 웹사이트의 전체 구조를 담당합니다. 상단 메뉴, 메인 히어로 영역, 기술 포트폴리오 섹션 등이 포함되어 있습니다.
- `style.css`: 웹사이트의 디자인, 레이아웃, 반응형 처리, 제품 이미지 fade 애니메이션을 담당합니다.
- `script.js`: 제품 이미지 자동 전환 로직과 상단 메뉴 클릭 시 안내 메시지를 표시하는 이벤트를 담당합니다.
- `assets/`: 웹사이트에 사용되는 제품 이미지 파일을 보관하는 폴더입니다.

## 3. 실행 방법

별도의 설치 과정 없이 바로 확인할 수 있습니다.

1. 프로젝트 폴더를 엽니다.
2. `index.html` 파일을 브라우저에서 직접 실행합니다.

또는 VS Code를 사용하는 경우 `Live Server` 확장 기능으로 실행할 수 있습니다.

1. VS Code에서 프로젝트 폴더를 엽니다.
2. `index.html` 파일을 선택합니다.
3. 마우스 오른쪽 버튼을 누른 뒤 `Open with Live Server`를 선택합니다.

## 4. GitHub Pages 배포 방법

1. GitHub에서 새 저장소를 생성합니다.
2. 현재 프로젝트의 `index.html`, `style.css`, `script.js`, `README.md`, `assets/` 폴더를 저장소에 업로드합니다.
3. 저장소의 `Settings` 메뉴로 이동합니다.
4. 왼쪽 메뉴에서 `Pages` 항목을 선택합니다.
5. 배포 방식은 `Deploy from a branch`를 선택합니다.
6. Branch는 `main`, Folder는 `/(root)`를 선택한 뒤 저장합니다.
7. 잠시 후 GitHub Pages에서 제공하는 주소로 웹사이트를 확인할 수 있습니다.

## 5. 현재 구현된 기능

- HYPERDYNE 기술 비전을 강조하는 메인 히어로 화면
- 제품 이미지가 부드럽게 전환되는 fade-in / fade-out 효과
- 상단 네비게이션 메뉴 구성
- 메뉴 클릭 시 `페이지 준비 중입니다.` 안내 메시지 표시
- 데스크톱과 모바일 화면에 대응하는 반응형 레이아웃

## 6. 추후 확장 가능 기능

- `Technology` 상세 페이지 추가
- `Products` 상세 페이지 추가
- `Applications` 상세 페이지 추가
- `Contact` 페이지 추가
- GitHub Pages 커스텀 도메인 연결
