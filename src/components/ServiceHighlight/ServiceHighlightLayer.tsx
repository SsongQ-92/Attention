import useBoundStore from '../../store/useBoundStore';

function ServiceHighlightLayer() {
  const isKeyboardMode = useBoundStore((state) => state.isKeyboardMode);
  const highlightLayerInfo = useBoundStore((state) => state.highlightLayerInfo);
  const { top, left, width, height } = highlightLayerInfo;

  const isMouseEnter =
    highlightLayerInfo.top !== 0 ||
    highlightLayerInfo.left !== 0 ||
    highlightLayerInfo.height !== 0 ||
    highlightLayerInfo.width !== 0;

  return (
    <main className={`${isKeyboardMode ? 'fixed inset-0' : 'relative'} w-screen h-screen`}>
      {isKeyboardMode && (
        <div className='fixed top-20 w-full flex-center'>
          <div className='flex-center text-center bg-white text-red-600 p-10 border-customBlack border-2 rounded-md text-12 opacity-30 hover:opacity-100'>
            현재 키보드 모드입니다. 키보드 방향키(↑, ↓)로 움직여 주세요. <br />
            모드를 종료하시려면 하이라이트 바나 키보드 이모지를 눌러주세요.
          </div>
        </div>
      )}
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
