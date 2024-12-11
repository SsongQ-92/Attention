import { TARGET_HIGHLIGHTS_SELECTORS } from '../config/consts';

const calculateReadingTime = () => {
  let text = '';

  TARGET_HIGHLIGHTS_SELECTORS.forEach((tagName) => {
    const tags = document.querySelectorAll(tagName);

    tags.forEach((tag) => {
      text += tag.textContent;
    });
  });

  const wordMatchRegExp = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegExp);

  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);

  return readingTime;
};

export default calculateReadingTime;
