# 🖍 Attention

<div align="center">
  <b>긴 글 읽기를 돕는 크롬 익스텐션</b><br/>
  <b>서비스 자체 가이드라인 하이라이트와 사용자의 자유로운 주석 표시 및 메모 기능 제공</b>
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
  웹 상에서 글을 읽을 때 지면의 글을 읽는 것처럼 텍스트에 하이라이트나 동그라미, 네모, 대괄호 등의 시각적 주석을 추가하여 가독성을 향상을 기대

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
- 서비스 자체 하이라이트의 키보드 모드 동작 시, 하이라이트된 텍스트를 즉시 복사할 수 있는 기능 제공

<details>
  <summary><b>스크린샷: 아티클 관련 메모 작성 및 아카이빙 대시보드</b></summary>
  <div markdown="1">

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

  <div align="center">
    <img width="95%" src="/public/기능-3.png" alt="아티클 관련 메모 작성 및 아카이빙 대시보드"/>
  </div>

  <div align="center">
    <img width="95%" src="/public/기능-4.png" alt="아티클 관련 메모 작성 및 아카이빙 대시보드"/>
  </div>

  <div align="center">
    <img width="95%" src="/public/기능-5.png" alt="아티클 관련 메모 작성 및 아카이빙 대시보드"/>
  </div>

  </div>
</details>

## 3. 기술 스택
