import { useEffect, useState } from 'react';

import { AnnotationInfo, annotationType } from '../config/types';
import useBoundStore from '../store/useBoundStore';
import { asyncCreateHighlight, asyncLoadHighlight } from '../utils/idbUserHighlight';

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

  useEffect(() => {
    const loadHighlight = async () => {
      const annotations = await asyncLoadHighlight();

      const currentUrl = window.location.href;
      const currentAnnotations = annotations.filter((annotation) => annotation.url === currentUrl);

      setRenderingAnnotations(currentAnnotations);

      if (currentAnnotations.length > 0) {
        setUserHighlightMode(true);
      }
    };

    loadHighlight();
  }, [setUserHighlightMode]);

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

  const createAnnotation = (
    selectionInfo: Selection,
    annotationType: { type: annotationType; color: string }
  ) => {
    const range = selectionInfo.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const content = selectionInfo.toString();
    const tagName = range.commonAncestorContainer.nodeName;

    const beforeText = range.startContainer.parentElement?.previousSibling?.textContent || '';
    const afterText = range.endContainer.parentElement?.nextSibling?.textContent || '';
    const beforeTagName = range.startContainer.parentElement?.previousSibling?.nodeName || '';
    const afterTagName = range.endContainer.parentElement?.nextSibling?.nodeName || '';

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
        left: rect.left + window.scrollX,
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
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (selection.isSelection && selection.infoObject && annotationType) {
      const newAnnotation = createAnnotation(selection.infoObject, annotationType);

      setRenderingAnnotations((prev) => [...prev, newAnnotation]);
      asyncCreateHighlight(newAnnotation);
      resetSelectionState();
    }
  }, [selection, annotationType]);

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
