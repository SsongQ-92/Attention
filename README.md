# 🖍 Attention

<div align="center">
  <b>긴 글 읽기를 돕는 크롬 익스텐션</b><br/>
  <b>서비스 자체 가이드라인 하이라이트와 자유로운 주석 표시 및 메모 기능 제공</b>
</div>

<br />

## 목차

<!-- toc -->

- [1. 기획 의도 및 목적](#1-%EA%B8%B0%ED%9A%8D-%EC%9D%98%EB%8F%84-%EB%B0%8F-%EB%AA%A9%EC%A0%81)
  * [기획 의도](#%EA%B8%B0%ED%9A%8D-%EC%9D%98%EB%8F%84)
  * [목적 및 기대 효과](#%EB%AA%A9%EC%A0%81-%EB%B0%8F-%EA%B8%B0%EB%8C%80-%ED%9A%A8%EA%B3%BC)
- [2. 기능](#2-%EA%B8%B0%EB%8A%A5)
  * [서비스 자체 하이라이트 표시: Reading Assistant Mode](#%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%9E%90%EC%B2%B4-%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8A%B8-%ED%91%9C%EC%8B%9C-reading-assistant-mode)
  * [유저 생성 주석 표시: Self-annotation Mode](#%EC%9C%A0%EC%A0%80-%EC%83%9D%EC%84%B1-%EC%A3%BC%EC%84%9D-%ED%91%9C%EC%8B%9C-self-annotation-mode)
  * [아티클 관련 메모 작성 및 아카이빙 대시보드: Memo edit & archive Mode](#%EC%95%84%ED%8B%B0%ED%81%B4-%EA%B4%80%EB%A0%A8-%EB%A9%94%EB%AA%A8-%EC%9E%91%EC%84%B1-%EB%B0%8F-%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B9%99-%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C-memo-edit--archive-mode)
- [3. 기술 스택](#3-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
  * [Zustand](#zustand)
  * [esbuild](#esbuild)
  * [PostCSS](#postcss)
- [4. 겪은 문제와 해결 과정](#4-%EA%B2%AA%EC%9D%80-%EB%AC%B8%EC%A0%9C%EC%99%80-%ED%95%B4%EA%B2%B0-%EA%B3%BC%EC%A0%95)
  * [어떻게 기존 페이지의 전역 스타일과 DOM 구조로부터 격리할 수 있을까?](#%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B8%B0%EC%A1%B4-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%9D%98-%EC%A0%84%EC%97%AD-%EC%8A%A4%ED%83%80%EC%9D%BC%EA%B3%BC-dom-%EA%B5%AC%EC%A1%B0%EB%A1%9C%EB%B6%80%ED%84%B0-%EA%B2%A9%EB%A6%AC%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)

<!-- tocstop -->

<br />

## 1. 기획 의도 및 목적

### 기획 의도

긴 글을 읽기 어려워하거나 집중력이 흐려지는 현대인들을 위해, 읽기 경험을 향상시키는 소프트웨어 서비스(SaaS; Software as a Service) 개발

### 목적 및 기대 효과

긴 글을 제공하는 대표적인 블로그 사이트를 대상으로 개발

- **[서비스 자체 하이라이트 표시: Reading Assistant Mode]** <br/>
  긴 글을 읽을 때 현재 읽는 문단 또는 문장을 강조하여 집중력 향상을 기대
  - 짧은 글(문단 또는 문장)을 읽는 성취감을 반복적으로 느낄 수 있도록 설계

- **[유저 생성 주석 표시: Self-annotation Mode]** <br/>
  웹상에서 글을 읽을 때 지면의 글을 읽는 것처럼 텍스트에 하이라이트나 동그라미, 네모, 대괄호 등의 시각적 주석을 추가하여 가독성 향상을 기대

<br />

## 2. 기능

### 서비스 자체 하이라이트 표시: Reading Assistant Mode

- 특수한 하이라이트 바 (ON/OFF)
  - 하이라이팅할 요소들을 선별하여 DOM 파싱
  - 하이라이트 바의 노란색 영역에 마우스를 올리면 해당 영역과 수평 위치에 있는 문장 또는 문단이 하이라이팅

- 키보드 모드 기능 (ON/OFF)
  - 하이라이트 바의 노란색 영역 클릭 또는 키보드 아이콘 클릭 시 진입
  - ↑, ↓, SpaceBar: 하이라이팅 위치를 이동하고 고정
  - Esc(escape): 키보드 모드 종료

<details>
  <summary><b>스크린샷: 서비스 자체 하이라이트 표시</b></summary>
  <div markdown="1">

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

  <div align="center">
    <img width="95%" src="/public/기능-1.png" alt="서비스 자체 하이라이트 기능"/>
  </div>

  </div>
</details>

### 유저 생성 주석 표시: Self-annotation Mode

- 텍스트에 하이라이트, 동그라미, 네모, 대괄호 등 다양한 시각적 주석 추가 기능 제공 (지면의 글을 읽는 것처럼 직관적으로 표시 가능)
- 주석의 타입 변경, 삭제, ON/OFF 기능 지원
- 생성된 주석을 브라우저의 `indexedDB`에 저장해 해당 페이지를 재방문 시 주석을 그대로 복원하여 표시

<details>
  <summary><b>스크린샷: 유저 생성 주석 표시</b></summary>
  <div markdown="1">

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

  <div align="center">
    <img width="95%" src="/public/기능-2.png" alt="유저 생성 주석 표시 기능"/>
  </div>

  </div>
</details>

### 아티클 관련 메모 작성 및 아카이빙 대시보드: Memo edit & archive Mode

- 웹 페이지 본문 옆 사이드 영역에 메모용 대시보드 표시 (ON/OFF)
- 메모를 마크다운 형식으로 생성, 조회, 수정, 삭제(CRUD) 가능
- 작성된 메모는 브라우저의 `indexedDB`와 동기화되어 데이터 영속성 보장
- 서비스 자체 하이라이트의 키보드 모드 동작 시, 하이라이트 된 텍스트를 즉시 복사할 수 있는 기능 제공

<details>
  <summary><b>스크린샷: 아티클 관련 메모 작성 및 아카이빙 대시보드</b></summary>
  <div markdown="1">

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
  <br />

  **1. 메모 작성**

  <div align="center">
    <img width="95%" src="/public/기능-3.png" alt="아티클 관련 메모 작성 및 아카이빙 대시보드"/>
  </div>

  <br />

  **2. 메모 조회**

  <div align="center">
    <img width="95%" src="/public/기능-4.png" alt="아티클 관련 메모 작성 및 아카이빙 대시보드"/>
  </div>

  <div align="center">
    <img width="95%" src="/public/기능-5.png" alt="아티클 관련 메모 작성 및 아카이빙 대시보드"/>
  </div>

  </div>
</details>

## 3. 기술 스택

<div align="left">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-orange?style=flat-square&logo=Zustand&logoColor=white" />
  <img src="https://img.shields.io/badge/esbuild-FFCF00?style=flat-square&logo=esbuild&logoColor=white" />
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/postcss-DD3A0A?style=flat-square&logo=postcss&logoColor=white" />
</div>

### Zustand

- 대시보드와 하이라이트 레이어의 렌더링 루트를 `Custom Elements`와 `Shadow DOM`을 통해 DOM 상에서 별도의 위치에 두었기 때문에, 중앙 집중형의 전역 상태 관리가 필요하였습니다.
- 추가적인 라이브러리 설치 없이 간결한 훅 기반 API를 제공하여, 스토어 생성 및 상태 관리를 빠르고 직관적으로 구현할 수 있습니다.

<details>
  <summary><b>Slice 예시 코드</b></summary>
  <div markdown="1">

**modalSlice.ts**

```ts
type modalType = 'confirm' | 'informCopyHighlight' | 'informNoMemoTitle' | 'informNoMemoContent';

interface ModalState {
  openModalTypeList: modalType[];
  addModal: (modalType: modalType) => void;
  closeModal: (modalType: modalType) => void;
  clearOpenModalTypeList: () => void;
}

export const createModalSlice: StateCreator<ModalState> = (set) => ({
  openModalTypeList: [],
  addModal: (modalType) =>
    set((state) => ({ openModalTypeList: [...state.openModalTypeList, modalType] })),
  closeModal: (modalType) =>
    set((state) => ({
      openModalTypeList: state.openModalTypeList.filter((name) => name !== modalType),
    })),
  clearOpenModalTypeList: () => set(() => ({ openModalTypeList: [] })),
});
```

  </div>
</details>

### esbuild

- React를 활용한 브라우저 확장 프로그램 개발에서는 모듈화되어 있는 여러 파일을 **빠르게 content-script, background와 같은 스크립트로 번들링**하여 변경 사항에 대한 결과물을 확인할 필요가 있었습니다.
- Esbuild의 `define` 옵션을 PostCSS와 함께 사용하여 빌드 시점에 `process.env.INLINE_CSS`을 문자열 CSS로 대체하였습니다. 대체된 문자열 CSS는 `shadow DOM` 내부의 `<style>` 태그의 내용으로 주입하였습니다.

<details>
  <summary><b>관련 코드</b></summary>
  <div markdown="1">

```js
const runEsbuild = async (inlineCSS) => {
  await esbuild.build({
    entryPoints: [
      'src/content-script/index.tsx',
      'src/content-script/injected-customElements-script.ts',
      'src/background/index.ts',
    ],
    bundle: true,
    outdir: outdir,
    treeShaking: true,
    minify: true,
    legalComments: 'none',
    jsx: 'automatic',
    define: {
      'process.env.INLINE_CSS': JSON.stringify(inlineCSS),
    },
  });
};
```

  </div>
</details>

### PostCSS

- 브라우저 확장 프로그램에 대한 개발이었기 때문에 DOM을 직접 조작하지 않고 **`Shadow DOM`을 활용해 격리된 스타일링**을 하였습니다.
- 이를 위해 Shadow DOM 내부에 `<style>` 태그를 동적으로 삽입할 필요가 있었으며, **PostCSS를 사용해 플러그인 배열을 전달, Processor 인스턴스을 생성한 뒤, process 메서드를 통해 CSS 문자열을 반환**받았습니다. 최종적으로 이 CSS 문자열을 `<style>` 태그의 내용으로 주입하여 Shadow DOM 내부에서 스타일을 적용하였습니다.

<details>
  <summary><b>플러그인</b></summary>
  <div markdown="1">

1. tailwindCSS의 PostCSS 플러그인

- `@tailwind base`, `@tailwind components`, `@tailwind utilities` 와 `tailwind.config.js`을 기반으로 최종 CSS 생성

2. Autoprefixer

- 브라우저 호환성을 위해 벤더 접두사(prefixer) 추가

3. CSSNano

- CSS 압축 및 로딩 속도 최적화

4. PostCSS Preset Env

- 구형 브라우저에서도 동작할 수 있도록 대상 브라우저 또는 런타임 환경에 맞는 폴리필 결정
- 최신 CSS를 대부분의 브라우저에서 이해할 수 있는 CSS로 변환 (`stage: 2`로 안정적인 최신 CSS 기능만 사용)

```js
const buildCSS = async () => {
  const css = `
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css');
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer utilities {
      .flex-center {
        @apply flex flex-row items-center justify-center;
      }
      .flex-col-center {
        @apply flex flex-col items-center justify-center;
      }
    }
  `;

  const result = await postcss([
    tailwindcss,
    autoprefixer,
    cssnano({
      preset: 'default',
    }),
    postcssPresetEnv({
      stage: 2,
      autoprefixer: { grid: true },
    }),
  ]).process(css, { from: undefined });

  return result.css;
};
```

  </div>
</details>


## 4. 겪은 문제와 해결 과정

### 어떻게 기존 페이지의 전역 스타일과 DOM 구조로부터 격리할 수 있을까?
