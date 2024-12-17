import { ANNOTATION_TYPES } from '../../config/consts';
import useRoughNotation from '../../hooks/useRoughNotation';
import RoughHighlight from './RoughHighlight';

function UserHighlightLayer() {
  const { isSelection, tooltipPosition, renderingAnnotations } = useRoughNotation();

  return (
    <>
      {isSelection && (
        <div
          style={{
            position: 'absolute',
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
          className='flex gap-3 bg-white p-3 shadow-md border-2 border-borderColor rounded-sm z-[9999] text-14'
        >
          {ANNOTATION_TYPES.map((type) => {
            return (
              <button
                key={type}
                className='bg-white shadow-md border-1 border-borderColor rounded-sm p-1 hover:bg-backgroundColor-hover'
              >
                {type}
              </button>
            );
          })}
        </div>
      )}

      {renderingAnnotations.map((annotation) => {
        const {
          tagName,
          content,
          context: { beforeTagName, afterTagName, beforeText, afterText },
        } = annotation;
        const key = tagName + content + beforeTagName + afterTagName + beforeText + afterText;

        return <RoughHighlight key={key} annotation={annotation} />;
      })}
    </>
  );
}

export default UserHighlightLayer;
