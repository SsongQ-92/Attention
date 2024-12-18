import { ANNOTATION_TYPES } from '../../config/consts';
import useRoughNotation from '../../hooks/useRoughNotation';
import useBoundStore from '../../store/useBoundStore';
import RoughHighlight from './RoughHighlight';

function UserHighlightLayer() {
  const { selection, tooltipPosition, renderingAnnotations, setAnnotationType } =
    useRoughNotation();

  const isUserHighlightMode = useBoundStore((state) => state.isUserHighlightMode);
  const setUserHighlightMode = useBoundStore((state) => state.setUserHighlightMode);

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

      {isUserHighlightMode &&
        renderingAnnotations.map((annotation) => {
          return <RoughHighlight key={annotation.id} annotation={annotation} />;
        })}
    </>
  );
}

export default UserHighlightLayer;
