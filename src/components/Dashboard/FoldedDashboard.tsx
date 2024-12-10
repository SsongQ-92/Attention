import useBoundStore from '../../store/useBoundStore';
import ArrowLineRightIcon from '../Icon/ArrowLineRightIcon';
import ArticleIcon from '../Icon/ArticleIcon';
import ServiceHighlightBar from '../ServiceHighlight/ServiceHighlightBar';

interface Props {
  onArrowClick: () => void;
}

function FoldedDashboard({ onArrowClick }: Props) {
  const isHighlightBarOpen = useBoundStore((state) => state.isHighlightBarOpen);
  const toggleHighlightBarOpen = useBoundStore((state) => state.toggleHighlightBarOpen);

  const handleArticleIcon = () => {
    toggleHighlightBarOpen();
  };

  return (
    <main className='fixed flex flex-col justify-start items-center gap-30 p-10 py-30 top-0 left-0 h-screen w-50 bg-white border-r-2 border-borderColor shadow-md transform transition-all duration-500 ease-in-out'>
      {isHighlightBarOpen ? (
        <ServiceHighlightBar onRevertIconClick={handleArticleIcon} />
      ) : (
        <>
          <div
            onClick={onArrowClick}
            className='flex-center rounded-[5px] size-35 hover:bg-backgroundColor-hover'
          >
            <ArrowLineRightIcon className='size-25 hover:cursor-pointer' />
          </div>
          <div
            onClick={handleArticleIcon}
            className='flex-center rounded-[5px] size-35 hover:bg-backgroundColor-hover'
          >
            <ArticleIcon className='size-25 hover:cursor-pointer' />
          </div>
        </>
      )}
    </main>
  );
}

export default FoldedDashboard;
