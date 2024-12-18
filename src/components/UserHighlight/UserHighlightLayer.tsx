import { useEffect, useRef, useState } from 'react';

import { ANNOTATION_TYPES } from '../../config/consts';
import useRoughNotation from '../../hooks/useRoughNotation';
import useBoundStore from '../../store/useBoundStore';
import TrashIcon from '../Icon/TrashIcon';
import RoughHighlight from './RoughHighlight';

interface highlightPosition {
  top: number;
  left: number;
}

function UserHighlightLayer() {
  const [editHighlight, setEditHighlight] = useState<{
    isEditHighlight: boolean;
    position: highlightPosition | null;
    id: string | null;
  }>({
    isEditHighlight: false,
    position: null,
    id: null,
  });
  const {
    selection,
    tooltipPosition,
    renderingAnnotations,
    setRenderingAnnotations,
    setAnnotationType,
  } = useRoughNotation();

  const isUserHighlightMode = useBoundStore((state) => state.isUserHighlightMode);
  const setUserHighlightMode = useBoundStore((state) => state.setUserHighlightMode);

  const editHighlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (editHighlightRef.current && !editHighlightRef.current.contains(event.target as Node)) {
        setEditHighlight({ isEditHighlight: false, position: null, id: null });
      }
    };

    document.addEventListener('mouseup', handleOutsideClick);
    return () => document.removeEventListener('mouseup', handleOutsideClick);
  }, []);

  return (
    <>
      {selection.isSelection && (
        <div
          style={{
            position: 'absolute',
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
          className='flex gap-3 bg-white p-3 shadow-md border-2 border-borderColor rounded-sm z-toolTip text-14'
        >
          {ANNOTATION_TYPES.map((type) => {
            return (
              <button
                key={type}
                onClick={() => {
                  setUserHighlightMode(true);
                  setAnnotationType((prev) => ({ ...prev, type, color: '#d4ff00' }));
                }}
                className='bg-white shadow-md border-1 border-borderColor rounded-sm p-1 hover:bg-backgroundColor-hover'
              >
                {type}
              </button>
            );
          })}
        </div>
      )}

      {editHighlight.isEditHighlight && editHighlight.position !== null && (
        <div
          ref={editHighlightRef}
          style={{
            position: 'absolute',
            top: `${editHighlight.position.top}px`,
            left: `${editHighlight.position.left}px`,
          }}
          className='flex gap-3 bg-white p-3 shadow-md border-2 border-borderColor rounded-sm z-toolTip text-14'
          onMouseUp={(e) => e.stopPropagation()}
        >
          {ANNOTATION_TYPES.map((type) => {
            return (
              <button
                key={type}
                onClick={() => {
                  const updatedRenderingAnnotations = renderingAnnotations.map((annotation) => {
                    if (annotation.id === editHighlight.id) {
                      return { ...annotation, type };
                    }

                    return annotation;
                  });

                  setRenderingAnnotations(updatedRenderingAnnotations);
                  setEditHighlight({ isEditHighlight: false, position: null, id: null });
                }}
                className='bg-white shadow-md border-1 border-borderColor rounded-sm p-1 hover:bg-backgroundColor-hover'
              >
                {type}
              </button>
            );
          })}
          <div
            onClick={() => {}}
            className='flex-center rounded-sm size-25 cursor-pointer bg-white hover:bg-backgroundColor-hover'
          >
            <TrashIcon className='size-15' />
          </div>
        </div>
      )}

      {isUserHighlightMode &&
        renderingAnnotations.map((annotation) => {
          return (
            <RoughHighlight
              key={annotation.id}
              annotation={annotation}
              setEditHighlight={setEditHighlight}
            />
          );
        })}
    </>
  );
}

export default UserHighlightLayer;
