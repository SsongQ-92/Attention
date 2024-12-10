import ArrowLineRightIcon from '../Icon/ArrowLineRightIcon';
import ArticleIcon from '../Icon/ArticleIcon';

interface Props {
  onArrowClick: () => void;
}

function FoldedDashboard({ onArrowClick }: Props) {
  return (
    <main className='fixed flex flex-col justify-start items-center gap-30 p-10 py-30 top-0 left-0 h-screen w-50 bg-white border-r-2 border-borderColor shadow-md transform transition-all duration-500 ease-in-out'>
      <div
        onClick={onArrowClick}
        className='flex-center rounded-[5px] size-35 hover:bg-backgroundColor-hover'
      >
        <ArrowLineRightIcon className='size-25 hover:cursor-pointer' />
      </div>
      <div className='flex-center rounded-[5px] size-35 hover:bg-backgroundColor-hover'>
        <ArticleIcon className='size-25 hover:cursor-pointer' />
      </div>
    </main>
  );
}

export default FoldedDashboard;
