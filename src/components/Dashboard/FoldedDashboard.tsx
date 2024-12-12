import { useState } from 'react';

import useParseDOM from '../../hooks/useParseDOM';
import useBoundStore from '../../store/useBoundStore';
import ArrowLineLeftIcon from '../Icon/ArrowLineLeftIcon';
import ArrowLineRightIcon from '../Icon/ArrowLineRightIcon';
import ArticleIcon from '../Icon/ArticleIcon';
import KeyboardIcon from '../Icon/KeyboardIcon';
import ServiceHighlightBar from '../ServiceHighlight/ServiceHighlightBar';

function FoldedDashboard() {
  const elementRects = useParseDOM();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isDashboardOpen = useBoundStore((state) => state.isDashboardOpen);
  const isHighlightBarOpen = useBoundStore((state) => state.isHighlightBarOpen);
  const isKeyboardMode = useBoundStore((state) => state.isKeyboardMode);
  const toggleDashboardOpen = useBoundStore((state) => state.toggleDashboardOpen);
  const toggleHighlightBarOpen = useBoundStore((state) => state.toggleHighlightBarOpen);
  const setHighlightLayerInfo = useBoundStore((state) => state.setHighlightLayerInfo);
  const toggleKeyboardMode = useBoundStore((state) => state.toggleKeyboardMode);
  const setKeyboardModeOff = useBoundStore((state) => state.setKeyboardModeOff);

  const handleArrowIconClick = () => {
    toggleDashboardOpen();
  };

  const handleArticleIconClick = () => {
    setHighlightLayerInfo({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    });

    toggleHighlightBarOpen();
    setKeyboardModeOff();
  };

  const handleKeyboardIconClick = () => {
    if (!isHighlightBarOpen) return;

    if (isKeyboardMode) {
      setHighlightLayerInfo({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      });
    } else {
      setHighlightLayerInfo({
        top: elementRects[0].tagStartRectY,
        left: elementRects[0].tagStartRectX,
        width: elementRects[0].tagWidth,
        height: elementRects[0].tagHeight,
      });
    }

    setActiveIndex(0);
    toggleKeyboardMode();
  };

  return (
    <main className='absolute flex flex-col justify-start items-center gap-30 p-10 py-30 top-0 -right-50 h-screen w-50 bg-white border-r-2 border-borderColor transform transition-all duration-500 ease-in-out'>
      <div
        onClick={handleArrowIconClick}
        className='flex-center rounded-[5px] size-35 hover:bg-backgroundColor-hover'
      >
        {isDashboardOpen ? (
          <ArrowLineLeftIcon className='size-25 hover:cursor-pointer' />
        ) : (
          <ArrowLineRightIcon className='size-25 hover:cursor-pointer' />
        )}
      </div>
      <div
        onClick={handleArticleIconClick}
        className={`flex-center rounded-[5px] size-35 ${isHighlightBarOpen ? 'bg-customBlack hover:bg-backgroundColor-darkHover' : 'hover:bg-backgroundColor-hover'}`}
      >
        <ArticleIcon
          className={`size-25 hover:cursor-pointer ${isHighlightBarOpen && 'fill-white'}`}
        />
      </div>
      <div
        onClick={handleKeyboardIconClick}
        className={`flex-center rounded-[5px] size-35 ${isHighlightBarOpen && (isKeyboardMode ? 'bg-customBlack hover:bg-backgroundColor-darkHover' : 'hover:bg-backgroundColor-hover')}`}
      >
        <KeyboardIcon
          className={`size-25 ${isHighlightBarOpen && 'hover:cursor-pointer'} ${isKeyboardMode && 'fill-white'}`}
        />
      </div>
      {isHighlightBarOpen && (
        <ServiceHighlightBar
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          elementRects={elementRects}
        />
      )}
    </main>
  );
}

export default FoldedDashboard;
