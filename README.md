# 🖍 Attention

<div align="center">
  <b>긴 글 읽기를 돕는 크롬 익스텐션</b><br/>
  <b>서비스 자체 가이드라인 하이라이트와 자유로운 주석 표시 및 메모 기능 제공</b>
</div>

<br />

<div align="center">
  <img width="90%" src="/public/대표이미지.png" alt="서비스 대표이미지" />
</div>

<br />

# 목차

<!-- toc -->

- [1. 기획 의도 및 목적](#1-%EA%B8%B0%ED%9A%8D-%EC%9D%98%EB%8F%84-%EB%B0%8F-%EB%AA%A9%EC%A0%81)
  * [1) 기획 의도](#1-%EA%B8%B0%ED%9A%8D-%EC%9D%98%EB%8F%84)
  * [2) 목적 및 기대 효과](#2-%EB%AA%A9%EC%A0%81-%EB%B0%8F-%EA%B8%B0%EB%8C%80-%ED%9A%A8%EA%B3%BC)
- [2. 기능](#2-%EA%B8%B0%EB%8A%A5)
  * [1) 서비스 자체 하이라이트 표시: Reading Assistant Mode](#1-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%9E%90%EC%B2%B4-%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8A%B8-%ED%91%9C%EC%8B%9C-reading-assistant-mode)
  * [2) 유저 생성 주석 표시: Self-annotation Mode](#2-%EC%9C%A0%EC%A0%80-%EC%83%9D%EC%84%B1-%EC%A3%BC%EC%84%9D-%ED%91%9C%EC%8B%9C-self-annotation-mode)
  * [3) 아티클 관련 메모 작성 및 아카이빙 대시보드: Memo edit & archive Mode](#3-%EC%95%84%ED%8B%B0%ED%81%B4-%EA%B4%80%EB%A0%A8-%EB%A9%94%EB%AA%A8-%EC%9E%91%EC%84%B1-%EB%B0%8F-%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B9%99-%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C-memo-edit--archive-mode)
- [3. 기술 스택](#3-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
  * [1) Zustand](#1-zustand)
  * [2) esbuild](#2-esbuild)
  * [3) PostCSS](#3-postcss)
- [4. 겪은 문제와 해결 과정](#4-%EA%B2%AA%EC%9D%80-%EB%AC%B8%EC%A0%9C%EC%99%80-%ED%95%B4%EA%B2%B0-%EA%B3%BC%EC%A0%95)
  * [1) 어떻게 기존 페이지의 전역 스타일과 DOM 구조로부터 격리할 수 있을까?](#1-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B8%B0%EC%A1%B4-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%9D%98-%EC%A0%84%EC%97%AD-%EC%8A%A4%ED%83%80%EC%9D%BC%EA%B3%BC-dom-%EA%B5%AC%EC%A1%B0%EB%A1%9C%EB%B6%80%ED%84%B0-%EA%B2%A9%EB%A6%AC%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    + [문제의 근본적 원인: 샌드박스 환경](#%EB%AC%B8%EC%A0%9C%EC%9D%98-%EA%B7%BC%EB%B3%B8%EC%A0%81-%EC%9B%90%EC%9D%B8-%EC%83%8C%EB%93%9C%EB%B0%95%EC%8A%A4-%ED%99%98%EA%B2%BD)
    + [1차 난관: Custom Elements가 만들어지지 않는 문제](#1%EC%B0%A8-%EB%82%9C%EA%B4%80-custom-elements%EA%B0%80-%EB%A7%8C%EB%93%A4%EC%96%B4%EC%A7%80%EC%A7%80-%EC%95%8A%EB%8A%94-%EB%AC%B8%EC%A0%9C)
    + [2차 난관: Shadow DOM 내부에 createRoot가 되지 않는 문제](#2%EC%B0%A8-%EB%82%9C%EA%B4%80-shadow-dom-%EB%82%B4%EB%B6%80%EC%97%90-createroot%EA%B0%80-%EB%90%98%EC%A7%80-%EC%95%8A%EB%8A%94-%EB%AC%B8%EC%A0%9C)
    + [3차 난관: Shadow DOM 내부에 TailwindCSS 스타일이 적용되지 않는 문제](#3%EC%B0%A8-%EB%82%9C%EA%B4%80-shadow-dom-%EB%82%B4%EB%B6%80%EC%97%90-tailwindcss-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%B4-%EC%A0%81%EC%9A%A9%EB%90%98%EC%A7%80-%EC%95%8A%EB%8A%94-%EB%AC%B8%EC%A0%9C)
  * [2) 웹 페이지 main DOM을 어떻게 파싱하여 서비스 하이라이트를 제공할까?](#2-%EC%9B%B9-%ED%8E%98%EC%9D%B4%EC%A7%80-main-dom%EC%9D%84-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%8C%8C%EC%8B%B1%ED%95%98%EC%97%AC-%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8A%B8%EB%A5%BC-%EC%A0%9C%EA%B3%B5%ED%95%A0%EA%B9%8C)
- [5. 개발과 감상](#5-%EA%B0%9C%EB%B0%9C%EA%B3%BC-%EA%B0%90%EC%83%81)
  * [1) 왜 indexedDB에 데이터를 저장하는 것으로 결정하게 되었을까?](#1-%EC%99%9C-indexeddb%EC%97%90-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EC%A0%80%EC%9E%A5%ED%95%98%EB%8A%94-%EA%B2%83%EC%9C%BC%EB%A1%9C-%EA%B2%B0%EC%A0%95%ED%95%98%EA%B2%8C-%EB%90%98%EC%97%88%EC%9D%84%EA%B9%8C)
  * [2) 향후 확장 계획](#2-%ED%96%A5%ED%9B%84-%ED%99%95%EC%9E%A5-%EA%B3%84%ED%9A%8D)
  * [3) 회고](#3-%ED%9A%8C%EA%B3%A0)

<!-- tocstop -->

<br />

# 1. 기획 의도 및 목적

## 1) 기획 의도

긴 글을 읽기 어려워하거나 집중력이 흐려지는 현대인들을 위해, 읽기 경험을 향상시키는 소프트웨어 서비스(SaaS; Software as a Service) 개발

## 2) 목적 및 기대 효과

긴 글을 제공하는 대표적인 블로그 사이트를 대상으로 개발

- **[서비스 자체 하이라이트 표시: Reading Assistant Mode]** <br/>
  긴 글을 읽을 때 현재 읽는 문단 또는 문장을 강조하여 집중력 향상을 기대
  - 짧은 글(문단 또는 문장)을 읽는 성취감을 반복적으로 느낄 수 있도록 설계

- **[유저 생성 주석 표시: Self-annotation Mode]** <br/>
  웹상에서 글을 읽을 때 지면의 글을 읽는 것처럼 텍스트에 하이라이트나 동그라미, 네모, 대괄호 등의 시각적 주석을 추가하여 가독성 향상을 기대

<br />

# 2. 기능

## 1) 서비스 자체 하이라이트 표시: Reading Assistant Mode

- 하이라이트 바 (ON/OFF)
  - 하이라이팅할 요소들을 선별하여 DOM 파싱
  - 하이라이트 바의 노란색 영역에 마우스를 올리면 해당 영역과 수평 위치에 있는 문장 또는 문단이 하이라이팅

- 키보드 모드 기능 (ON/OFF)
  - 하이라이트 바의 노란색 영역 클릭 또는 키보드 아이콘 클릭 시 진입
  - ↑, ↓, SpaceBar: 하이라이팅 위치를 이동하고 고정
  - Esc(escape): 키보드 모드 종료

<details>
  <summary><b>스크린샷: 서비스 자체 하이라이트 표시</b></summary>
  <div markdown="1">

  <div align="center">
    <img width="95%" src="/public/기능-1.png" alt="서비스 자체 하이라이트 기능"/>
  </div>

  </div>
</details>

## 2) 유저 생성 주석 표시: Self-annotation Mode

- 텍스트에 하이라이트, 동그라미, 네모, 대괄호 등 다양한 시각적 주석 추가 기능 제공 (지면의 글을 읽는 것처럼 직관적으로 표시 가능)
- 주석의 타입 변경, 삭제, ON/OFF 기능 지원
- 생성된 주석을 브라우저의 `indexedDB`에 저장해 해당 페이지를 재방문 시 주석을 그대로 복원하여 표시

<details>
  <summary><b>스크린샷: 유저 생성 주석 표시</b></summary>
  <div markdown="1">

  <div align="center">
    <img width="95%" src="/public/기능-2.png" alt="유저 생성 주석 표시 기능"/>
  </div>

  </div>
</details>

## 3) 아티클 관련 메모 작성 및 아카이빙 대시보드: Memo edit & archive Mode

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

<br />

# 3. 기술 스택

<div align="left">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-orange?style=flat-square&logo=Zustand&logoColor=white" />
  <img src="https://img.shields.io/badge/esbuild-FFCF00?style=flat-square&logo=esbuild&logoColor=white" />
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/postcss-DD3A0A?style=flat-square&logo=postcss&logoColor=white" />
</div>

## 1) Zustand

- 대시보드와 하이라이트 레이어의 렌더링 루트를 `Custom Elements`와 `Shadow DOM`을 통해 DOM 상에서 별도의 위치에 두었기 때문에, 중앙 집중형의 전역 상태 관리가 필요하였습니다.
- 추가적인 라이브러리 설치 없이 간결한 훅 기반 API를 제공하여, 스토어 생성 및 상태 관리를 빠르고 직관적으로 구현할 수 있습니다.

<details>
  <summary><b>실제 코드</b></summary>
  <div markdown="1">

<br />

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

## 2) esbuild

- React를 활용한 브라우저 확장 프로그램 개발에서는 모듈화되어 있는 여러 파일을 **빠르게 content-script, background와 같은 스크립트로 번들링**하여 변경 사항에 대한 결과물을 확인할 필요가 있었습니다.
- Esbuild의 `define` 옵션을 PostCSS와 함께 사용하여 빌드 시점에 `process.env.INLINE_CSS`을 문자열 CSS로 대체하였습니다. 대체된 문자열 CSS는 `shadow DOM` 내부의 `<style>` 태그의 내용으로 주입하였습니다.

<details>
  <summary><b>실제 코드</b></summary>
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

## 3) PostCSS

- 브라우저 확장 프로그램에 대한 개발이었기 때문에 DOM을 직접 조작하지 않고 **`Shadow DOM`을 활용해 격리된 스타일링**을 하였습니다.
- 이를 위해 Shadow DOM 내부에 `<style>` 태그를 동적으로 삽입할 필요가 있었으며, **PostCSS를 사용해 플러그인 배열을 전달, Processor 인스턴스을 생성한 뒤, process 메서드를 통해 CSS 문자열을 반환**받았습니다. 최종적으로 이 CSS 문자열을 `<style>` 태그의 내용으로 주입하여 Shadow DOM 내부에서 스타일을 적용하였습니다.

<details>
  <summary><b>사용한 플러그인</b></summary>
  <div markdown="1">

<br />

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

<br />

# 4. 겪은 문제와 해결 과정

## 1) 어떻게 기존 페이지의 전역 스타일과 DOM 구조로부터 격리할 수 있을까?

- 브라우저 확장 프로그램 서비스로써 구현한 하이라이트 레이어와 대시보드 UI가 기존 웹 페이지의 DOM과 스타일에 영향을 주지 않아야 하며, 동시에 웹 페이지의 스타일 및 동작에 영향을 받지 않도록 설계해야 했습니다. 이를 위해, 웹 표준 API인 `Custom Element`와 `Shadow DOM`를 사용하였습니다.
- `Custom Element`: 새로운 사용자 정의 요소를 만들 수 있게 해주는 JavaScript API입니다.
  - HTML 요소 기본 클래스 HTMLElement에서 상속받은 자율적인 사용자 정의 요소(Autonomous custom elements)로 구현하였습니다.
- `Shadow DOM`: 캡슐화, 즉, 만들어진 사용자 정의 요소 내부의 DOM 트리를 페이지에서 실행 중인 JavaScript 및 CSS로부터 숨기기 위하여 사용한 JavaScript API입니다.
  - Shadow DOM 내부의 DOM tree(Shadow tree) 내부에서는 일반적인 DOM 노드와 동일한 방식으로 자유롭게 자식을 추가하거나 속성을 설정하거나 `<style>` 요소 내부에 전체 shadow DOM 트리에 스타일을 추가하는 등의 설정이 가능합니다.

### [문제의 근본적 원인: 샌드박스 환경]

기획이 모두 끝나고 개발을 시작하면서 서비스가 제공하는 하이라이트 기능 구현에 대해 먼저 고민하였습니다. 기존 페이지인 main DOM에 스타일이나 요소를 주입하는 방식은 이미 적용이 되는 스타일 및 이벤트에 의해 실행될 추가적인 코드 스크립트와의 충돌을 야기할 것으로 예상되었습니다. 따라서, 별도의 레이어를 구성하여 구현하고자 했고, 웹 컴포넌트(`Web Components`)인 `Shadow DOM`과 `Custom Element`를 알게 되었습니다.

- 브라우저 확장 프로그램의 콘텐츠 스크립트는 백그라운드 스크립트나 팝업 스크립트 등 다른 스크립트의 환경과는 구별되는 웹페이지 컨텍스트에서 실행되는 파일입니다. 이는 웹페이지의 기본 JavaScript 코드(해당 페이지가 로드한 스크립트)와 격리된 환경에서 실행이 되는데요, 해당 환경을 샌드박스 환경이라고 합니다.
- 샌드박스 환경의 특징은 아래와 같습니다.
  - 웹페이지의 전역 스코프에 노출되지 않고, 웹페이지의 전역 스코프에 선언된 변수에도 접근할 수 없는 자체 전역 객체(window)를 가지고 있습니다. 
  - 보안을 위해 콘텐츠 스크립트가 웹페이지의 스크립트와 충돌하거나 악의적인 웹페이지가 콘텐츠 스크립트를 오염시키는 것을 방지합니다.
  - **브라우저 확장 전용 API(`chrome.runtime` 등)에 접근 가능하지만, 기본적으로 웹 페이지의 `Custom Element`나 `shadow DOM` API에 직접 접근할 수 없습니다.**

### [1차 난관: Custom Elements가 만들어지지 않는 문제]

- 문제 상황
  - 콘텐츠 스크립트가 실행되는 샌드박스 환경에서는 `window.customElements`가 null로 나타나 `Custom Elements` 정의가 불가능했습니다. 샌드박스 환경에서는 `Custom Element`나 `shadow DOM` API에 직접 접근할 수 없는 샌드박스의 특징을 알아내는 데 오랜 시간이 걸렸습니다.

<div align="center">
  <img width="80%" src="/public/겪은문제와해결과정-4.png" alt="Custom Elements 생성 에러 로그" />
</div>

<div align="center">
  <img width="60%" src="/public/겪은문제와해결과정-5.png" alt="Custom Elements 생성 에러 관련 소스" />
</div>

- 해결 과정
  - 처음에는 콘텐츠 스크립트 자체에서 생성한 `<script>` 태그에 코드를 직접 주입하여 실행하려 했지만, 아래와 같은 에러를 마주했고 `Custom Elements`와 `Shadow DOM`을 정의하는 코드를 외부 스크립트로 분리하기로 결정하였습니다.
  - 에러 내용: Content Security Policy (CSP)에 의해 인라인 스크립트 차단하는 내용입니다. 인라인 스크립트를 허용하려면 추가 설정이 필요한데, 위험성이 있다는 것을 확인하였습니다.
    > content-script.js:41 Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:* http://127.0.0.1:*". Either the 'unsafe-inline' keyword, a hash ('sha256-AFeThEgz+MMrLLEvU9Imz1lrWV2iHNplblOMBCTko0c='), or a nonce ('nonce-...') is required to enable inline execution.

```tsx
const codeToInject = `
  (() => {
    if (!window.customElements) {
      console.error("customElements is not available in this environment.");
      return;
    }

    class WebHighlightLayer extends HTMLElement {
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const reactRoot = document.createElement('div');
        shadowRoot.appendChild(reactRoot);
      }
    }

    class WebDashboard extends HTMLElement {
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const reactRoot = document.createElement('div');
        shadowRoot.appendChild(reactRoot);
      }
    }

    if (!customElements.get('web-highlight-layer')) {
      customElements.define('web-highlight-layer', WebHighlightLayer);
    }
    if (!customElements.get('web-dashboard')) {
      customElements.define('web-dashboard', WebDashboard);
    }
  })();
`;

const script = document.createElement('script');
script.textContent = codeToInject;
(document.head || document.documentElement).appendChild(script);
script.remove();
```

- 해결 방법
  - 콘텐츠 스크립트에서 `Custom Elements` 정의가 불가능했기에, 따라서 `Custom Elements`를 shadow host로 가질 `Shadow DOM`도 정의할 수 없다는 것을 알았습니다.
  - 이에 콘텐츠 스크립트가 실행되는 샌드박스 환경이 아닌, `웹 페이지 환경`에서 `Custom Elements`와 `Shadow DOM`을 정의하는 코드가 실행되도록 **스크립트를 주입하는 것을 결정**했습니다.
  - 주입된 스크립트는 샌드박스 외부에서 실행되고, `window.customElements`와 같은 브라우저 API에 접근할 수 있었습니다.
  - 실제 코드는 아래 토글을 참고 바랍니다.

### [2차 난관: Shadow DOM 내부에 createRoot가 되지 않는 문제]

- 문제 상황
  - Custom Elements는 정의되었지만, Shadow DOM 내부에 React 컴포넌트를 렌더링하려고 하면 계속 null이 반환되었습니다.

- 해결 방법
  - Custom Elements가 완전히 정의되지 않은 상태에서 Shadow DOM에 접근하려고 했기 때문에 null이 발생했습니다. 이를 해결하기 위해 `whenDefined` 메서드를 사용하여 Custom Elements가 정의될 때까지 대기하도록 했습니다.
  - 그 후, Custom Elements가 정의되었을 때, 정의되었음을 `window.postMessage`를 통해 콘텐츠 스크립트로 알렸습니다.
  - 콘텐츠 스크립트는 `window.addEventListener`로 메시지를 수신하고, Shadow DOM 내부 태그를 루트로 React 컴포넌트를 렌더링했습니다.
  - 실제 코드는 아래 토글을 참고 바랍니다.

### [3차 난관: Shadow DOM 내부에 TailwindCSS 스타일이 적용되지 않는 문제]

- 문제 상황
  - Shadow DOM은 외부 스타일과 격리되어 있기 때문에, TailwindCSS와 같은 유틸리티 클래스가 적용되지 않았습니다. 왜냐하면, TailwindCSS는 전역 스타일 규칙을 클래스에 적용하는 방식으로 작동합니다. 그러나 Shadow DOM 내부는 전역 스타일 정의를 참조하지 않기 때문에 TailwindCSS 클래스가 적용되지 않습니다.

- 해결 방법
  - Shadow DOM 내부에 `<style>` 태그를 만들고 자식으로 삽입했습니다.
  - esbuild로 CSS 빌드 시 문자열로 변환하여 Shadow DOM 내부의 `<style>` 태그에 동적으로 CSS 문자열을 삽입했습니다.
  - 실제 코드는 아래 토글을 참고 바랍니다.

<details>
  <summary><b>상세 설명: Custom Element와 Shadow DOM</b></summary>
  <div markdown="1">

<br />

**1. 스타일 격리**

- Shadow DOM 내부의 스타일은 전역 스타일과 완전히 분리되어, 확장 프로그램이 웹 페이지의 기존 스타일에 영향을 주지 않습니다.
- 반대로, 웹 페이지의 스타일이 확장 프로그램의 UI에 영향을 끼치지 않는다는 것도 보장합니다.
- 확장 프로그램을 사용할 때는 방문하는 웹 페이지가 다양하기 때문에, 스타일 충돌 방지를 위해 Shadow DOM을 사용했습니다.

**2. DOM 구조 격리**

- 확장 프로그램의 DOM 조작이 웹 페이지의 기존 DOM과 충돌하지 않습니다.
- 크롬 익스텐션에서 사용하는 content-script는 웹 페이지와 동일한 DOM에 접근하지만, Shadow DOM을 활용하면 이러한 접근을 격리할 수 있습니다.
- 예를 들어, 확장 프로그램이 특정 UI를 추가하거나 React 컴포넌트를 렌더링하더라도 웹 페이지의 JavaScript와 충돌하지 않습니다.
- 예를 들어,Custom Elements를 통해 `<web-highlight-layer>`와 같은 사용자 정의 태그를 생성하여 특정 역할을 담당하게 합니다.

**3. 확장 프로그램의 안전성**

- Shadow DOM은 확장 프로그램의 스크립트와 스타일이 웹 페이지의 기존 스크립트 및 스타일과 의도치 않게 상호작용하지 않도록 보장합니다.
- 특히, 이번 프로젝트에서 사용한 TailwindCSS와 같은 유틸리티 기반 CSS를 사용할 때 전역 클래스 네임 충돌을 피할 수 있다는 점도 큰 장점입니다.

  </div>
</details>

<details>
  <summary><b>실제 코드</b></summary>
  <div markdown="1">

<br />

1. Script 태그 주입하여 샌드박스 벗어나기(/content-script/index.tsx)

```tsx
const injectScript = async () => {
  const script = document.createElement('script');
  script.src = Browser.runtime.getURL('injected-customElements-script.js');
  (document.body || document.head || document.documentElement).appendChild(script);
  script.remove();
};
```

2. `whenDefined`로 Custom Elements의 정의 상태 확인 후 `window.postMessage`로 상태 전달(/content-script/injected-customElements-script.ts)

```ts
const notifyCustomElementsReady = async () => {
  await customElements.whenDefined('web-highlight-layer');
  await customElements.whenDefined('web-dashboard');

  window.postMessage({ type: 'ELEMENT_READY', element: 'web-highlight-layer' }, '*');
  window.postMessage({ type: 'ELEMENT_READY', element: 'web-dashboard' }, '*');
};

notifyCustomElementsReady();
```

3. `window.addEventListener`로 Custom Elements의 정의 확인에 대한 메시지를 수신하고, Shadow DOM 내부에서 React 컴포넌트 렌더링(/content-script/index.tsx)

```tsx
window.addEventListener('message', (event) => {
  if (event.data?.type === 'ELEMENT_READY' && event.data.element === 'web-highlight-layer') {
    const webHighlightLayer = document.querySelector('web-highlight-layer');
    const shadowRootForWebHighlightLayer = webHighlightLayer?.shadowRoot;
    const renderRoot = shadowRootForWebHighlightLayer?.querySelector('div');

    if (renderRoot) {
      createRoot(renderRoot).render(
        <StrictMode>
          <UserHighlightLayer />
          <ServiceHighlightLayer />
        </StrictMode>
      );
    }
  }
```

4. 빌드 시 문자열로 변환된 CSS를 Shadow DOM 내부에 주입

```ts
connectedCallback() {
  if (!this.shadowRoot) {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const styleTag = document.createElement('style');
    styleTag.textContent = process.env.INLINE_CSS as string;
    shadowRoot.appendChild(styleTag);

    const reactRoot = document.createElement('div');
    shadowRoot.appendChild(reactRoot);
  }
}
```

  </div>
</details>

<details>
  <summary><b>관련 이미지</b></summary>
  <div markdown="1">

<br />

1. Shadow DOM

<div align="center">
  <img width="80%" src="./public/겪은문제와해결과정-1.PNG" alt="Shadow DOM 구조"/>
</div>

1. `web-highlight-layer` Custom Element와 Shadow DOM 

<div align="center">
  <img width="80%" src="./public/겪은문제와해결과정-2.PNG" alt="Custom Element와 Shadow DOM 구조"/>
</div>

3. `web-dashboard` Custom Element와 Shadow DOM 

<div align="center">
  <img width="80%" src="./public/겪은문제와해결과정-3.PNG" alt="Custom Element와 Shadow DOM 구조"/>
</div>

  </div>
</details>

<br />

## 2) 웹 페이지 main DOM을 어떻게 파싱하여 서비스 하이라이트를 제공할까?

<br />

# 5. 개발과 감상

## 1) 왜 indexedDB에 데이터를 저장하는 것으로 결정하게 되었을까?

## 2) 향후 확장 계획

## 3) 회고
