import ErrorBoundary from '../../config/ErrorBoundary';
import useBoundStore from '../../store/useBoundStore';

function ServiceHighlightLayer() {
  const isHighlightBarOpen = useBoundStore((state) => state.isHighlightBarOpen);
  const isKeyboardMode = useBoundStore((state) => state.isKeyboardMode);
  const isKeyboardIconHover = useBoundStore((state) => state.isKeyboardIconHover);
  const highlightLayerInfo = useBoundStore((state) => state.highlightLayerInfo);
  const setGlobalError = useBoundStore((state) => state.setGlobalError);

  const { top, left, width, height } = highlightLayerInfo;

  const isMouseEnter =
    highlightLayerInfo.top !== 0 ||
    highlightLayerInfo.left !== 0 ||
    highlightLayerInfo.height !== 0 ||
    highlightLayerInfo.width !== 0;

  return (
    <ErrorBoundary onError={(error: Error) => setGlobalError(error.message)}>
      {isHighlightBarOpen && isKeyboardMode && (
        <div className='fixed left-0 z-50 top-20 w-full flex-center pointer-events-none'>
          <div className='flex-center text-center bg-white text-red-600 p-10 border-customBlack border-2 rounded-md text-12 opacity-40 pointer-events-auto hover:opacity-100'>
            현재 키보드 모드입니다. 키보드 방향키(↑, ↓)로 움직여 주세요. <br />
            모드를 종료하시려면 하이라이트 바 / 키보드 아이콘 / ESC 키를 눌러주세요.
          </div>
        </div>
      )}
      {isHighlightBarOpen && !isKeyboardMode && isKeyboardIconHover && (
        <div className='fixed left-0 z-50 top-20 w-full flex-center pointer-events-none'>
          <div className='flex-center text-center bg-white text-red-600 p-10 border-customBlack border-2 rounded-md text-12 pointer-events-auto'>
            키보드 모드 진입을 위해서는 <br />
            하이라이트 바나 키보드 이모지를 눌러주세요.
          </div>
        </div>
      )}
      {isMouseEnter && (
        <div
          style={{
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className='fixed z-40 bg-yellow-400/20'
        />
      )}
    </ErrorBoundary>
  );
}

export default ServiceHighlightLayer;
