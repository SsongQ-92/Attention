import { useEffect, useState } from 'react';

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

  const createAnnotation = (
    selectionInfo: Selection,
    annotationType: { type: annotationType; color: string }
  ) => {
    const range = selectionInfo.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const content = selectionInfo.toString();
    const tagName = range.commonAncestorContainer.nodeName;

    const beforeText = range.startContainer.textContent?.slice(0, range.startOffset) || '';
    const afterText = range.endContainer.textContent?.slice(range.endOffset) || '';
    const beforeTagName =
      range.startContainer.parentElement?.nodeName || range.startContainer.nodeName;
    const afterTagName = range.endContainer.parentElement?.nodeName || range.endContainer.nodeName;

    return {
      id: `${tagName} + ${content} + ${beforeTagName} + ${afterTagName} + ${beforeText} + ${afterText}`,
      tagName,
      content,
      type: annotationType.type,
      color: annotationType.color,
      url: window.location.href,
      context: { beforeText, afterText, beforeTagName, afterTagName },
      position: {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: rect.right + window.scrollX,
        width: rect.width,
        height: rect.height,
      },
    };
  };

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
  }, [selection, annotationType]);

  const findMatchingNode = (content: string, context: AnnotationInfo['context']) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (node.nodeType === Node.TEXT_NODE && typeof node.nodeValue === 'string') {
          if (node.nodeValue?.includes(content) || content.includes(node.nodeValue)) {
            return NodeFilter.FILTER_ACCEPT;
          }
        }

        return NodeFilter.FILTER_REJECT;
      },
    });

    console.log(context);

    let currentNode = walker.nextNode();
    let combinedText = '';
    let firstNode: Node | null = null;
    let lastNode: Node | null = null;

    while (currentNode) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        const nodeText = currentNode.nodeValue || '';

        if (combinedText === '' && content.includes(nodeText)) {
          combinedText += nodeText;
          firstNode = currentNode;
          lastNode = currentNode;
        } else if (combinedText && content.includes(combinedText + nodeText)) {
          combinedText += nodeText;
          lastNode = currentNode;
        }

        if (combinedText.includes(content)) {
          break;
        }
      }

      currentNode = walker.nextNode();
    }

    if (combinedText.includes(content) && firstNode && lastNode) {
      return { firstNode, lastNode };
    }

    return null;
  };

  const recalculatePositions = throttle(() => {
    try {
      requestAnimationFrame(() => {
        setRenderingAnnotations((prevAnnotations) => {
          return prevAnnotations
            .map((annotation) => {
              const { content, context } = annotation;

              const foundNode = findMatchingNode(content, context);

              console.log(foundNode);

              if (foundNode) {
                const { firstNode, lastNode } = foundNode;

                const range = document.createRange();

                range.setStart(firstNode, 0);
                range.setEnd(lastNode, lastNode.textContent?.length || 0);

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
  }, 100);

  useEffect(() => {
    const handleRecalculate = () => recalculatePositions();

    const resizeObserver = new ResizeObserver(handleRecalculate);
    const mutationObserver = new MutationObserver(handleRecalculate);

    resizeObserver.observe(document.body);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [recalculatePositions]);

  useEffect(() => {
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

    loadHighlight();
  }, [setUserHighlightMode, recalculatePositions]);

  return {
    selection,
    tooltipPosition,
    renderingAnnotations,
    setRenderingAnnotations,
    setAnnotationType,
  };
};

export default useRoughNotation;
