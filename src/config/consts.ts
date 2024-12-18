import { annotationType } from './types';

export const ALLOW_URL = ['https://velog.io/'];
export const SERVICE_TITLE = 'Attention';

export const TARGET_HIGHLIGHTS_SELECTORS = ['p', 'li', 'h1', 'h2', 'h3', 'pre'];

export const ANNOTATION_TYPES: annotationType[] = ['circle', 'box', 'highlight'];

export const msgAction = Object.freeze({
  ICON_CLICKED: 'ICON_CLICKED',
  PAGE_LOADED: 'PAGE_LOADED',
});

export const badgeText = Object.freeze({
  ON: 'ON',
  OFF: 'OFF',
});

export const modalText = Object.freeze({
  backToList: '목록으로 돌아가시겠습니까? 현재 작성 중인 내용은 저장되지 않습니다.',
  confirmDelete: '해당 글을 삭제하시겠습니까?',
  copyHighlightText: '하이라이트 텍스트가 클립보드에 복사 되었습니다.',
});

export const pagination = Object.freeze({
  pageSize: 4,
  pageGroupSize: 5,
});
