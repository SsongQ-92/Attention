import useBoundStore from '../../store/useBoundStore';

function ServiceHighlightLayer() {
  const highlightLayerInfo = useBoundStore((state) => state.highlightLayerInfo);

  console.log(highlightLayerInfo);

  return (
    <main className='fixed w-screen h-screen'>
      <div></div>
    </main>
  );
}

export default ServiceHighlightLayer;
