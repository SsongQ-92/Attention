import { useEffect, useState } from 'react';

import { TARGET_HIGHLIGHTS_SELECTORS } from '../config/consts';
import { TagRectData } from '../config/types';
import isElementInsideViewport from '../utils/isElementInsideViewport';

const useAnalyzeDOM = () => {
  const [elementRects, setElementsRects] = useState<TagRectData[]>([]);

  useEffect(() => {
    let observer: IntersectionObserver;

    const updateRects = (entries: IntersectionObserverEntry[]) => {
      setElementsRects((prevRects) => {
        const updatedRects: TagRectData[] = [...prevRects];

        entries.forEach((entry) => {
          const rect: DOMRect = entry.target.getBoundingClientRect();
          const trimmedTextContent = entry.target.textContent?.trim() ?? '';

          const currentRect: TagRectData = {
            tagName: entry.target.tagName.toLocaleLowerCase(),
            tagStartRectY: rect.top,
            tagEndRectY: rect.bottom,
            tagStartRectX: rect.left,
            tagWidth: rect.width,
            tagHeight: rect.height,
            tagVisiblePartially:
              entry.isIntersecting && isElementInsideViewport(rect.top, rect.bottom),
            tagTextContent: trimmedTextContent,
            tagUniqueKey:
              `${trimmedTextContent.length < 10 ? trimmedTextContent : trimmedTextContent.slice(0, 10)}` +
              rect.width +
              rect.height,
          };

          if (entry.isIntersecting) {
            const isExisted = updatedRects.some(
              (rect) =>
                rect.tagName === currentRect.tagName &&
                rect.tagUniqueKey === currentRect.tagUniqueKey
            );

            if (!isExisted && currentRect.tagTextContent !== '') {
              updatedRects.push(currentRect);
            }
          } else {
            const index = updatedRects.findIndex(
              (rect) =>
                rect.tagName === currentRect.tagName &&
                rect.tagUniqueKey === currentRect.tagUniqueKey
            );

            if (index !== -1) {
              updatedRects.splice(index, 1);
            }
          }
        });

        return updatedRects;
      });
    };

    const observeElements = () => {
      const targetElements = document.querySelectorAll(TARGET_HIGHLIGHTS_SELECTORS.join(', '));

      observer = new IntersectionObserver(updateRects, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      });

      targetElements.forEach((el) => observer.observe(el));
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      if (observer) observer.disconnect();
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer) {
        observer.disconnect();
      }
      mutationObserver.disconnect();
    };
  }, []);

  return elementRects;
};

export default useAnalyzeDOM;
