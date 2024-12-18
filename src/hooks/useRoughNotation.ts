import { useEffect, useState } from 'react';

import { AnnotationInfo, annotationType } from '../config/types';

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

  useEffect(() => {
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

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [annotationType]);

  useEffect(() => {
    if (selection.isSelection && selection.infoObject !== null) {
      const selectionInfo = selection.infoObject;

      const content = selectionInfo.toString();
      const range = selectionInfo.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const tagName = range.commonAncestorContainer.nodeName;

      const beforeText = range.startContainer.parentElement?.previousSibling?.textContent || '';
      const afterText = range.endContainer.parentElement?.nextSibling?.textContent || '';
      const beforeTagName = range.startContainer.parentElement?.previousSibling?.nodeName || '';
      const afterTagName = range.endContainer.parentElement?.nextSibling?.nodeName || '';

      if (annotationType !== null) {
        const newAnnotation: AnnotationInfo = {
          tagName,
          content,
          type: annotationType.type,
          color: annotationType.color,
          context: {
            beforeText,
            afterText,
            beforeTagName,
            afterTagName,
          },
          position: {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height,
          },
        };

        selection.infoObject.removeAllRanges();

        setRenderingAnnotations((prev) => [...prev, newAnnotation]);
        setAnnotationType(null);
        setSelection({ isSelection: false, infoObject: null });
      }
    }
  }, [selection, annotationType]);

  return { selection, tooltipPosition, renderingAnnotations, setAnnotationType };
};

export default useRoughNotation;
