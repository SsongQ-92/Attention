import { useState } from 'react';

import useParseDOM from '../../hooks/useParseDOM';
import useBoundStore from '../../store/useBoundStore';
import ArrowLineLeftIcon from '../Icon/ArrowLineLeftIcon';
import ArrowLineRightIcon from '../Icon/ArrowLineRightIcon';
import ArticleIcon from '../Icon/ArticleIcon';
import HighlightIcon from '../Icon/HighlightIcon';
import KeyboardIcon from '../Icon/KeyboardIcon';
import WarningIcon from '../Icon/WarningIcon';
import ServiceHighlightBar from '../ServiceHighlight/ServiceHighlightBar';

function FoldedDashboard() {
  const elementRects = useParseDOM();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevScrollY, setPrevScrollY] = useState<number>(window.scrollY);
  const [isMouseOverWarningIcon, setIsMouseOverWarningIcon] = useState(false);

  const globalError = useBoundStore((state) => state.globalError);
  const isDashboardOpen = useBoundStore((state) => state.isDashboardOpen);
  const isHighlightBarOpen = useBoundStore((state) => state.isHighlightBarOpen);
  const isKeyboardMode = useBoundStore((state) => state.isKeyboardMode);
  const isUserHighlightMode = useBoundStore((state) => state.isUserHighlightMode);
  const toggleDashboardOpen = useBoundStore((state) => state.toggleDashboardOpen);
  const toggleHighlightBarOpen = useBoundStore((state) => state.toggleHighlightBarOpen);
  const toggleKeyboardMode = useBoundStore((state) => state.toggleKeyboardMode);
  const toggleUserHighlightMode = useBoundStore((state) => state.toggleUserHighlightMode);
  const setHighlightLayerInfo = useBoundStore((state) => state.setHighlightLayerInfo);
  const setKeyboardModeOff = useBoundStore((state) => state.setKeyboardModeOff);
  const setKeyboardIconHover = useBoundStore((state) => state.setKeyboardIconHover);

  const isGlobalError = globalError.length === 0 ? false : true;

  const handleArrowIconClick = () => {
    toggleDashboardOpen();
  };

  const handleArticleIconClick = () => {
    setHighlightLayerInfo({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      content: '',
    });

    toggleHighlightBarOpen();
    setKeyboardModeOff();
    setPrevScrollY(window.scrollY);
  };

  const handleKeyboardIconClick = () => {
    if (!isHighlightBarOpen) return;

    if (isKeyboardMode) {
      setHighlightLayerInfo({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        content: '',
      });
    } else {
      setHighlightLayerInfo({
        top: elementRects[0].tagStartRectY,
        left: elementRects[0].tagStartRectX,
        width: elementRects[0].tagWidth,
        height: elementRects[0].tagHeight,
        content: elementRects[0].tagTextContent,
      });
    }

    setActiveIndex(0);
    toggleKeyboardMode();
    setPrevScrollY(window.scrollY);
  };

  const handleHighlightIconClick = () => {
    toggleUserHighlightMode();
  };

  return (
    <main className='absolute flex flex-col justify-between items-center p-10 py-30 top-0 -right-50 h-screen w-50 bg-white border-r-2 border-borderColor transform transition-all duration-500 ease-in-out'>
      <div className='flex flex-col justify-start items-center gap-30'>
        <div
          onClick={handleArrowIconClick}
          className='flex-center rounded-[5px] size-35 hover:cursor-pointer hover:bg-backgroundColor-hover'
        >
          {isDashboardOpen ? (
            <ArrowLineLeftIcon className='size-25' />
          ) : (
            <ArrowLineRightIcon className='size-25' />
          )}
        </div>
        <div
          onClick={handleArticleIconClick}
          className={`flex-center rounded-[5px] size-35 hover:cursor-pointer ${isHighlightBarOpen ? 'bg-customBlack hover:bg-backgroundColor-darkHover' : 'hover:bg-backgroundColor-hover'}`}
        >
          <ArticleIcon className={`size-25 ${isHighlightBarOpen && 'fill-white'}`} />
        </div>
        <div
          onClick={handleKeyboardIconClick}
          onMouseEnter={() => setKeyboardIconHover(true)}
          onMouseLeave={() => setKeyboardIconHover(false)}
          className={`flex-center rounded-[5px] size-35 ${isHighlightBarOpen && (isKeyboardMode ? 'bg-customBlack hover:cursor-pointer hover:bg-backgroundColor-darkHover' : 'hover:cursor-pointer hover:bg-backgroundColor-hover')}`}
        >
          <KeyboardIcon className={`size-25 ${isKeyboardMode && 'fill-white'}`} />
        </div>
        <div
          onClick={handleHighlightIconClick}
          className={`flex-center rounded-[5px] size-35 hover:cursor-pointer ${isUserHighlightMode ? 'bg-customBlack hover:bg-backgroundColor-darkHover' : 'hover:bg-backgroundColor-hover'}`}
        >
          <HighlightIcon className={`size-25 ${isUserHighlightMode && 'fill-white'}`} />
        </div>
      </div>
      {isGlobalError && (
        <div
          className='flex-center rounded-[5px] size-35 hover:bg-backgroundColor-hover'
          onMouseEnter={() => setIsMouseOverWarningIcon(true)}
          onMouseLeave={() => setIsMouseOverWarningIcon(false)}
        >
          <WarningIcon className='size-25' />
          {isMouseOverWarningIcon && (
            <p className='absolute bottom-80 bg-customBlack text-white text-11 rounded-sm'>
              에러가 발생하였습니다. 새로고침 후 서비스를 이용 부탁드립니다.
            </p>
          )}
        </div>
      )}

      {isHighlightBarOpen && (
        <ServiceHighlightBar
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          elementRects={elementRects}
          prevScrollY={prevScrollY}
          setPrevScrollY={setPrevScrollY}
        />
      )}
    </main>
  );
}

export default FoldedDashboard;
