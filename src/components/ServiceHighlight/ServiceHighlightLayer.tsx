import useBoundStore from '../../store/useBoundStore';

function ServiceHighlightLayer() {
  const highlightLayerInfo = useBoundStore((state) => state.highlightLayerInfo);
  const isMouseEnter =
    highlightLayerInfo.top !== 0 ||
    highlightLayerInfo.left !== 0 ||
    highlightLayerInfo.height !== 0 ||
    highlightLayerInfo.width !== 0;

  console.log(highlightLayerInfo, isMouseEnter);

  return (
    <main className='fixed w-screen h-screen'>
      <div></div>
    </main>
  );
}

export default ServiceHighlightLayer;
