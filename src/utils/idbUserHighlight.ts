import { get, set } from 'idb-keyval';

import { AnnotationInfo } from '../config/types';

export const asyncLoadHighlight = async (): Promise<AnnotationInfo[] | []> => {
  return (await get('highlights')) || [];
};

export const asyncCreateHighlight = async (newHighlight: AnnotationInfo) => {
  try {
    const existingHighlights = (await get('highlights')) || [];

    const updatedHighlights = [...existingHighlights, newHighlight];

    await set('highlights', updatedHighlights);
  } catch (err) {
    console.error(err);
  }
};

export const asyncUpdateHighlightById = async (
  id: string,
  updatedHighlight: Partial<AnnotationInfo>
) => {
  try {
    const existingHighlights = (await get('highlights')) || [];

    const updatedHighlights = existingHighlights.map((highlight: AnnotationInfo) =>
      highlight.id === id ? { ...highlight, ...updatedHighlight } : highlight
    );

    await set('highlights', updatedHighlights);
  } catch (err) {
    console.error(err);
  }
};

export const asyncDeleteHighlightById = async (id: string) => {
  try {
    const existingHighlights = (await get('highlights')) || [];

    const updatedHighlights = existingHighlights.filter(
      (highlight: AnnotationInfo) => highlight.id !== id
    );

    await set('highlights', updatedHighlights);
  } catch (err) {
    console.error(err);
  }
};
