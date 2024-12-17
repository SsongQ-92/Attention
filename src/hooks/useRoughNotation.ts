import { useEffect, useState } from 'react';

import { AnnotationInfo } from '../config/types';

const useRoughNotation = () => {
  const [isSelection, setIsSelection] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [renderingAnnotations, setRenderingAnnotations] = useState<AnnotationInfo[]>([]);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();

      if (selection && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setTooltipPosition({
          top: rect.top + window.scrollY - 30,
          left: rect.right + window.scrollX + 5,
        });

        setIsSelection(true);

        console.log(setRenderingAnnotations);
      } else {
        setIsSelection(false);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return { isSelection, tooltipPosition, renderingAnnotations };
};

export default useRoughNotation;
