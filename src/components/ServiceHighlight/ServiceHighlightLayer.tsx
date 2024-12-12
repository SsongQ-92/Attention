import useBoundStore from '../../store/useBoundStore';

function ServiceHighlightLayer() {
  const highlightLayerInfo = useBoundStore((state) => state.highlightLayerInfo);
  const { top, left, width, height } = highlightLayerInfo;

  const isMouseEnter =
    highlightLayerInfo.top !== 0 ||
    highlightLayerInfo.left !== 0 ||
    highlightLayerInfo.height !== 0 ||
    highlightLayerInfo.width !== 0;

  return (
    <main className='fixed inset-0 w-screen h-screen'>
      {isMouseEnter && (
        <div
          style={{
            position: 'absolute',
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className='bg-yellow-400/20'
        />
      )}
    </main>
  );
}

export default ServiceHighlightLayer;
