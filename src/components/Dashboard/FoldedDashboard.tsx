import useBoundStore from '../../store/useBoundStore';
import ArrowLineLeftIcon from '../Icon/ArrowLineLeftIcon';
import ArrowLineRightIcon from '../Icon/ArrowLineRightIcon';
import ArticleIcon from '../Icon/ArticleIcon';
import ServiceHighlightBar from '../ServiceHighlight/ServiceHighlightBar';

function FoldedDashboard() {
  const isHighlightBarOpen = useBoundStore((state) => state.isHighlightBarOpen);
  const isDashboardOpen = useBoundStore((state) => state.isDashboardOpen);
  const toggleHighlightBarOpen = useBoundStore((state) => state.toggleHighlightBarOpen);
  const setKeyboardModeOff = useBoundStore((state) => state.setKeyboardModeOff);
  const setHighlightLayerInfo = useBoundStore((state) => state.setHighlightLayerInfo);
  const toggleDashboardOpen = useBoundStore((state) => state.toggleDashboardOpen);

  const handleArrowIconClick = () => {
    toggleDashboardOpen();
  };

  const handleArticleIcon = () => {
    requestAnimationFrame(() => {
      if (isDashboardOpen) {
        document.body.style.marginLeft = isHighlightBarOpen ? '330px' : '358px';
      } else {
        document.body.style.marginLeft = isHighlightBarOpen ? '50px' : '78px';
      }
    });

    setHighlightLayerInfo({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    });

    toggleHighlightBarOpen();
    setKeyboardModeOff();
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
        onClick={handleArticleIcon}
        className={`flex-center rounded-[5px] size-35 ${isHighlightBarOpen ? 'bg-customBlack hover:bg-backgroundColor-darkHover' : 'hover:bg-backgroundColor-hover'}`}
      >
        <ArticleIcon
          className={`size-25 hover:cursor-pointer ${isHighlightBarOpen && 'fill-white'}`}
        />
      </div>
      {isHighlightBarOpen && <ServiceHighlightBar />}
    </main>
  );
}

export default FoldedDashboard;
