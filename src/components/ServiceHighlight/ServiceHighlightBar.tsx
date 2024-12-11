import useAnalyzeDOM from '../../hooks/useAnalyzeDOM';

function ServiceHighlightBar() {
  const elementRects = useAnalyzeDOM();

  return (
    <div className='absolute top-0 -right-28 w-28 h-full px-1 bg-borderColor'>
      {elementRects.map((rect, index) => {
        const marginTop =
          index === 0
            ? Math.round(rect.tagStartRectY)
            : Math.round(rect.tagStartRectY - elementRects[index - 1].tagEndRectY);
        const height = Math.round(rect.tagHeight);

        console.log(elementRects, rect.tagName, marginTop, height);

        return (
          <div
            key={rect.tagUniqueKey}
            style={{
              height: `${height}px`,
              marginTop: `${marginTop}px`,
            }}
            className={`w-full bg-yellow-100`}
          />
        );
      })}
    </div>
  );
}

export default ServiceHighlightBar;
