import { SERVICE_TITLE } from '../../config/consts';
import useToggleDashboard from '../../hooks/useToggleDashboard';
import useBoundStore from '../../store/useBoundStore';
import FoldedDashboard from './FoldedDashboard';

function DashboardContainer() {
  const isDashboardOpen = useBoundStore((state) => state.isDashboardOpen);
  const toggleDashboardOpen = useBoundStore((state) => state.toggleDashboardOpen);

  useToggleDashboard({ isDashboardOpen, toggleDashboardOpen });

  return (
    <main className='h-screen fixed top-0 left-0 z-50'>
      {isDashboardOpen && (
        <div className='flex flex-col justify-start gap-30 p-10 py-30 w-270 h-full bg-white'>
          <h1 className='font-pretendard color-customBlack text-25 bg-yellow-100 px-10 font-bold'>
            {SERVICE_TITLE}
          </h1>
        </div>
      )}
      <FoldedDashboard />
    </main>
  );
}

export default DashboardContainer;
