import { useCallback, useEffect, useMemo, useState } from 'react';

import { throttle } from 'lodash-es';

import { AnnotationInfo, annotationType } from '../config/types';
import useBoundStore from '../store/useBoundStore';
import {
  asyncCreateHighlight,
  asyncDeleteHighlightById,
  asyncLoadHighlight,
} from '../utils/idbUserHighlight';

const useRoughNotation = () => {
  const [selection, setSelection] = useState<{
    isSelection: boolean;
    infoObject: Selection | null;
  }>({
    isSelection: false,
    infoObject: null,
  });
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [annotationType, setAnnotationType] = useState<{
    type: annotationType;
    color: string;
  } | null>(null);
  const [renderingAnnotations, setRenderingAnnotations] = useState<AnnotationInfo[]>([]);
  const [lastWindowWidth, setLastWindowWidth] = useState(document.body.clientWidth);

  const setUserHighlightMode = useBoundStore((state) => state.setUserHighlightMode);

  const handleMouseUp = () => {
    const selection = window.getSelection();

    if (selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setTooltipPosition({
        top: rect.top < 30 ? rect.bottom + window.scrollY : rect.top + window.scrollY - 40,
        left: rect.right + window.scrollX - 130,
      });

      setSelection({ isSelection: true, infoObject: selection });
    } else {
      setSelection({ isSelection: false, infoObject: null });
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const createAnnotation = useCallback(
    (selectionInfo: Selection, annotationType: { type: annotationType; color: string }) => {
      const getXPath = (node: Node): string => {
        const paths: string[] = [];

        while (node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            let index = 0;
            let sibling = element.previousSibling;

            while (sibling) {
              if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === element.nodeName) {
                index++;
              }

              sibling = sibling.previousSibling;
            }

            const tagName = element.nodeName.toLowerCase();
            const pathIndex = `[${index + 1}]`;

            paths.unshift(`${tagName}${pathIndex}`);
          } else if (node.nodeType === Node.TEXT_NODE) {
            const parent = node.parentNode;

            if (parent && parent.nodeType === Node.ELEMENT_NODE) {
              let textIndex = 0;
              let sibling = parent.firstChild;

              while (sibling && sibling !== node) {
                if (sibling.nodeType === Node.TEXT_NODE) {
                  textIndex++;
                }

                sibling = sibling.nextSibling;
              }

              paths.unshift(`text()[${textIndex + 1}]`);
              node = parent;

              continue;
            } else {
              break;
            }
          } else {
            break;
          }

          if (node.parentNode) {
            node = node.parentNode;
          } else {
            break;
          }
        }

        return paths.length ? '/' + paths.join('/') : '';
      };

      const range = selectionInfo.getRangeAt(0);
      const content = selectionInfo.toString();

      const firstNode = range.startContainer;
      const lastNode = range.endContainer;

      const firstNodeXPath = getXPath(firstNode);
      const lastNodeXPath = getXPath(lastNode);

      const rect = range.getBoundingClientRect();

      return {
        id: `${firstNodeXPath} + ${lastNodeXPath} + ${content}`,
        tagName: range.commonAncestorContainer.nodeName,
        content,
        type: annotationType.type,
        color: annotationType.color,
        url: window.location.href,
        context: {
          firstNodeXPath,
          lastNodeXPath,
          startOffset: range.startOffset,
          endOffset: range.endOffset,
        },
        position: {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          right: rect.right + window.scrollX,
          width: rect.width,
          height: rect.height,
        },
      };
    },
    []
  );

  const resetSelectionState = () => {
    setAnnotationType(null);
    setSelection({ isSelection: false, infoObject: null });
    window.getSelection()?.removeAllRanges();
  };

  useEffect(() => {
    if (selection.isSelection && selection.infoObject && annotationType) {
      const newAnnotation = createAnnotation(selection.infoObject, annotationType);

      setRenderingAnnotations((prev) => [...prev, newAnnotation]);
      asyncCreateHighlight(newAnnotation);
      resetSelectionState();
    }
  }, [selection, annotationType, createAnnotation]);

  const getNodeByXPath = useCallback(
    (xpath: string, documentRoot: Document = document): Node | null => {
      const result = documentRoot.evaluate(
        xpath,
        documentRoot,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );

      const node = result.singleNodeValue;

      if (node?.nodeType === Node.TEXT_NODE) {
        return node;
      }

      if (node?.nodeType === Node.ELEMENT_NODE) {
        const match = xpath.match(/text\(\)\[(\d+)\]$/);

        if (match && node.childNodes.length > 0) {
          const textIndex = parseInt(match[1], 10) - 1;
          let currentTextIndex = 0;

          for (const child of node.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
              if (currentTextIndex === textIndex) {
                return child;
              }

              currentTextIndex++;
            }
          }
        }
      }

      return null;
    },
    []
  );

  const throttledRecalculatePositions = useMemo(
    () =>
      throttle(() => {
        try {
          requestAnimationFrame(() => {
            setRenderingAnnotations((prevAnnotations) => {
              return prevAnnotations
                .map((annotation) => {
                  const { context } = annotation;
                  const { firstNodeXPath, lastNodeXPath, startOffset, endOffset } = context;

                  const firstNode = getNodeByXPath(firstNodeXPath);
                  const lastNode = getNodeByXPath(lastNodeXPath);

                  if (
                    firstNode &&
                    lastNode &&
                    firstNode.nodeType === Node.TEXT_NODE &&
                    lastNode.nodeType === Node.TEXT_NODE
                  ) {
                    const range = document.createRange();

                    range.setStart(firstNode, startOffset);
                    range.setEnd(lastNode, endOffset);

                    const rect = range.getBoundingClientRect();

                    return {
                      ...annotation,
                      position: {
                        top: rect.top + window.scrollY,
                        bottom: rect.bottom + window.scrollY,
                        left: rect.left + window.scrollX,
                        right: rect.right + window.scrollX,
                        width: rect.width,
                        height: rect.height,
                      },
                    };
                  } else {
                    asyncDeleteHighlightById(annotation.id);

                    return null;
                  }
                })
                .filter(Boolean) as AnnotationInfo[];
            });
          });
        } catch (error) {
          console.error('Error in recalculatePositions:', error);
        }
      }, 100),
    [setRenderingAnnotations, getNodeByXPath]
  );

  const recalculatePositions = useCallback(() => {
    throttledRecalculatePositions();
  }, [throttledRecalculatePositions]);

  useEffect(() => {
    const handleRecalculate = () => {
      const currentWidth = document.body.clientWidth;

      if (currentWidth !== lastWindowWidth) {
        setLastWindowWidth(currentWidth);
        recalculatePositions();
      }
    };

    const resizeObserver = new ResizeObserver(handleRecalculate);

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, [lastWindowWidth, recalculatePositions]);

  useEffect(() => {
    let previousUrl = window.location.href;

    const loadHighlight = async () => {
      const annotations = await asyncLoadHighlight();

      const currentUrl = window.location.href;
      const currentAnnotations = annotations.filter((annotation) => annotation.url === currentUrl);

      setRenderingAnnotations(currentAnnotations);

      if (currentAnnotations.length > 0) {
        setUserHighlightMode(true);
        recalculatePositions();
      }
    };

    const observer = new MutationObserver(() => {
      if (window.location.href !== previousUrl) {
        console.log(`URL 변경 감지: ${window.location.href}`);
        previousUrl = window.location.href;

        loadHighlight();
      }
    });

    loadHighlight();

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [setUserHighlightMode, recalculatePositions]);

  useEffect(() => {
    if (renderingAnnotations.length === 0) {
      setUserHighlightMode(false);
    }
  }, [renderingAnnotations, setUserHighlightMode]);

  return {
    selection,
    tooltipPosition,
    renderingAnnotations,
    setRenderingAnnotations,
    setAnnotationType,
  };
};

export default useRoughNotation;
