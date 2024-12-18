import { useLayoutEffect, useRef } from 'react';

import { annotate } from 'rough-notation';

import { AnnotationInfo } from '../../config/types';

interface Props {
  annotation: AnnotationInfo;
}

function RoughHighlight({ annotation }: Props) {
  const {
    position: { top, left, width, height },
  } = annotation;

  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (elementRef.current) {
      const roughAnnotation = annotate(elementRef.current, {
        type: annotation.type,
        color: annotation.color,
        animate: false,
      });

      const parent = elementRef.current.parentElement;

      if (parent) {
        const svgs = parent.querySelectorAll('svg');

        svgs.forEach((svg) => {
          svg.style.opacity = '0.4';
        });
      }

      roughAnnotation.show();
    }
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
      className='z-annotation pointer-events-none'
    />
  );
}

export default RoughHighlight;
