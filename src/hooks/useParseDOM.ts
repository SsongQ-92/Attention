import { useEffect, useState } from 'react';

import { throttle } from 'lodash-es';

import { TARGET_HIGHLIGHTS_SELECTORS } from '../config/consts';
import { TagRectData } from '../config/types';
import isElementInsideViewport from '../utils/isElementInsideViewport';

const useParseDOM = () => {
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
            tagUniqueKey: `${trimmedTextContent.length < 10 ? trimmedTextContent : trimmedTextContent.slice(0, 10)}_${rect.width}_${rect.height}`,
          };

          const index = updatedRects.findIndex(
            (rect) => rect.tagUniqueKey === currentRect.tagUniqueKey
          );

          if (entry.isIntersecting) {
            if (index === -1 && currentRect.tagTextContent !== '') {
              updatedRects.push(currentRect);
            }
          } else if (index !== -1) {
            updatedRects.splice(index, 1);
          }
        });

        return updatedRects.sort((a, b) => a.tagStartRectY - b.tagStartRectY);
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

    const handleScroll = throttle(() => {
      requestAnimationFrame(() => {
        setElementsRects((prevRects) =>
          prevRects.map((rect) => {
            const elements = Array.from(document.querySelectorAll(rect.tagName)) as HTMLElement[];

            const element = elements.find((el) => el.textContent?.trim() === rect.tagTextContent);

            if (element) {
              const newRect = element.getBoundingClientRect();

              return {
                ...rect,
                tagStartRectY: newRect.top,
                tagEndRectY: newRect.bottom,
                tagVisiblePartially: isElementInsideViewport(newRect.top, newRect.bottom),
              };
            }

            return { ...rect };
          })
        );
      });
    }, 100);

    window.addEventListener('scroll', handleScroll);

    const mutationObserver = new MutationObserver(() => {
      if (observer) observer.disconnect();
      setElementsRects([]);

      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const resizeObserver = new ResizeObserver(() => {
      if (observer) observer.disconnect();
      setElementsRects([]);

      observeElements();
    });

    resizeObserver.observe(document.body);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      mutationObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return elementRects;
};

export default useParseDOM;
