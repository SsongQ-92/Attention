import useToggleDashboard from '../../hooks/useToggleDashboard';
import useBoundStore from '../../store/useBoundStore';
import ArrowLineLeftIcon from '../Icon/ArrowLineLeftIcon';
import FoldedDashboard from './FoldedDashboard';

function DashboardContainer() {
  const isDashboardOpen = useBoundStore((state) => state.isDashboardOpen);
  const toggleDashboardOpen = useBoundStore((state) => state.toggleDashboardOpen);

  const handleArrowIconClick = () => {
    toggleDashboardOpen();
  };

  useToggleDashboard({ isDashboardOpen, toggleDashboardOpen });

  if (!isDashboardOpen) {
    return <FoldedDashboard onArrowClick={handleArrowIconClick} />;
  }

  return (
    <main className='fixed flex flex-col justify-start gap-30 p-10 py-30 top-0 left-0 h-screen w-320 bg-white border-r-2 border-borderColor shadow-md transform transition-all duration-500 ease-in-out'>
      <div className='flex justify-between items-end'>
        <h1 className='font-pretendard color-customBlack text-25 bg-yellow-100 px-10 font-bold'>
          Attention
        </h1>
        <div
          onClick={handleArrowIconClick}
          className='flex-center rounded-[5px] size-35 hover:bg-backgroundColor-hover'
        >
          <ArrowLineLeftIcon className='size-25 hover:cursor-pointer' />
        </div>
      </div>
    </main>
  );
}

export default DashboardContainer;
