import { useEffect, useRef, useState } from 'react';

import { ANNOTATION_COLOR, ANNOTATION_TYPES } from '../../config/consts';
import ErrorBoundary from '../../config/ErrorBoundary';
import useRoughNotation from '../../hooks/useRoughNotation';
import useBoundStore from '../../store/useBoundStore';
import { asyncDeleteHighlightById, asyncUpdateHighlightById } from '../../utils/idbUserHighlight';
import TrashIcon from '../Icon/TrashIcon';
import GetHighlightTypeIcon from './GetHighlightTypeIcon';
import RoughHighlight from './RoughHighlight';

interface highlightPosition {
  top: number;
  right: number;
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
  const setGlobalError = useBoundStore((state) => state.setGlobalError);

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
    <ErrorBoundary onError={(error: Error) => setGlobalError(error.message)}>
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
                  setAnnotationType((prev) => ({
                    ...prev,
                    type,
                    color: ANNOTATION_COLOR,
                  }));
                }}
                className='bg-white shadow-md border-1 border-borderColor rounded-sm p-1 hover:bg-backgroundColor-hover'
              >
                <GetHighlightTypeIcon type={type} size={20} />
              </button>
            );
          })}
        </div>
      )}

      {editHighlight.isEditHighlight && editHighlight.position !== null && (
        <div
          id='editToolTip'
          ref={editHighlightRef}
          style={{
            position: 'absolute',
            top: `${editHighlight.position.top}px`,
            left: `${editHighlight.position.right}px`,
          }}
          className='flex gap-3 bg-white p-3 shadow-md border-2 border-borderColor rounded-sm z-toolTip text-14'
          onMouseUp={(e) => e.stopPropagation()}
        >
          {ANNOTATION_TYPES.map((type) => {
            return (
              <button
                key={type}
                onClick={async () => {
                  const updatedRenderingAnnotations = renderingAnnotations.map((annotation) => {
                    if (annotation.id === editHighlight.id) {
                      return { ...annotation, type };
                    }

                    return annotation;
                  });

                  const currentAnnotation = renderingAnnotations.find(
                    (annotation) => annotation.id === editHighlight.id
                  );

                  await asyncUpdateHighlightById(editHighlight.id as string, {
                    ...currentAnnotation,
                    type,
                  });

                  setRenderingAnnotations(updatedRenderingAnnotations);
                  setEditHighlight({ isEditHighlight: false, position: null, id: null });
                }}
                className='bg-white shadow-md border-1 border-borderColor rounded-sm p-1 hover:bg-backgroundColor-hover'
              >
                <GetHighlightTypeIcon type={type} size={20} />
              </button>
            );
          })}
          <div
            onClick={async () => {
              const updatedRenderingAnnotations = renderingAnnotations.filter(
                (annotation) => annotation.id !== editHighlight.id
              );

              await asyncDeleteHighlightById(editHighlight.id as string);

              setRenderingAnnotations(updatedRenderingAnnotations);
              setEditHighlight({ isEditHighlight: false, position: null, id: null });
            }}
            className='flex-center rounded-sm size-24 cursor-pointer bg-white hover:bg-backgroundColor-hover'
          >
            <TrashIcon className='size-20' />
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
    </ErrorBoundary>
  );
}

export default UserHighlightLayer;
