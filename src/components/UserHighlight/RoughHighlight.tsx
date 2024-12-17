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
        color: 'blue',
        animate: true,
        animationDuration: 500,
        padding: 2,
      });

      console.log(roughAnnotation.color);

      roughAnnotation.show();
    }
  }, [annotation]);

  return (
    <div
      ref={elementRef}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      className='fixed z-30 pointer-events-none bg-slate-200'
    />
  );
}

export default RoughHighlight;
