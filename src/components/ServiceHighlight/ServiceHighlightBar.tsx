import useParseDOM from '../../hooks/useParseDOM';
import useBoundStore from '../../store/useBoundStore';

function ServiceHighlightBar() {
  const elementRects = useParseDOM();
  const setHighlightLayerInfo = useBoundStore((state) => state.setHighlightLayerInfo);

  return (
    <div className='absolute top-0 -right-28 w-28 h-full px-1 bg-borderColor'>
      {elementRects.map((rect, index) => {
        const marginTop =
          index === 0
            ? Math.round(rect.tagStartRectY)
            : Math.round(rect.tagStartRectY - elementRects[index - 1].tagEndRectY);
        const height = Math.round(rect.tagHeight);

        return (
          <div
            key={rect.tagUniqueKey}
            style={{
              height: `${height}px`,
              marginTop: `${marginTop}px`,
            }}
            className={`w-full bg-yellow-100`}
            onMouseEnter={() => {
              setHighlightLayerInfo({
                top: rect.tagStartRectY,
                left: rect.tagStartRectX,
                width: rect.tagWidth,
                height: rect.tagHeight,
              });
            }}
            onMouseLeave={() => {
              setHighlightLayerInfo({
                top: 0,
                left: 0,
                width: 0,
                height: 0,
              });
            }}
          />
        );
      })}
    </div>
  );
}

export default ServiceHighlightBar;
