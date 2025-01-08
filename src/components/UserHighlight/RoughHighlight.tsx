import { Dispatch, SetStateAction, useLayoutEffect, useRef } from 'react';

import { annotate } from 'rough-notation';
import { RoughAnnotation } from 'rough-notation/lib/model';

import { editTooltip } from '../../config/consts';
import { AnnotationInfo, annotationType } from '../../config/types';

interface highlightPosition {
  top: number;
  right: number;
}

interface Props {
  annotation: AnnotationInfo;
  setEditHighlight: Dispatch<
    SetStateAction<{
      isEditHighlight: boolean;
      position: highlightPosition | null;
      id: string | null;
    }>
  >;
}

function RoughHighlight({ annotation, setEditHighlight }: Props) {
  const {
    position: { top, left, right, width, height },
  } = annotation;

  const elementRef = useRef<HTMLDivElement>(null);
  const roughAnnotationRef = useRef<RoughAnnotation | null>(null);

  const handleHighlightClick = () => {
    const positionTop = top - editTooltip.height;
    const positionRight = right - editTooltip.width;

    setEditHighlight((prev) => ({
      ...prev,
      isEditHighlight: true,
      position: { top: positionTop, right: positionRight },
      id: annotation.id,
    }));
  };

  useLayoutEffect(() => {
    const getAnnotationStrokeWidth = (annotationType: annotationType) => {
      switch (annotationType) {
        case 'circle':
          return 2;
        case 'bracket':
          return 4;
        default:
          return 3;
      }
    };

    if (elementRef.current) {
      if (roughAnnotationRef.current) {
        roughAnnotationRef.current.remove();
      }

      roughAnnotationRef.current = annotate(elementRef.current, {
        type: annotation.type,
        color: annotation.type === 'highlight' ? annotation.color + '24' : annotation.color + 'B3',
        animate: false,
        strokeWidth: getAnnotationStrokeWidth(annotation.type),
        brackets: ['left', 'right'],
      });

      roughAnnotationRef.current.show();
    }

    return () => {
      if (roughAnnotationRef.current) {
        roughAnnotationRef.current.remove();
      }
    };
  }, [annotation]);

  return (
    <div
      ref={elementRef}
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      className='z-annotation pointer-events-auto cursor-pointer'
      onClick={handleHighlightClick}
    />
  );
}

export default RoughHighlight;
