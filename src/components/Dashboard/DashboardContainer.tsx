import useToggleDashboard from '../../hooks/useToggleDashboard';
import useBoundStore from '../../store/useBoundStore';

function DashboardContainer() {
  const isDashboardOpen = useBoundStore((state) => state.isDashboardOpen);

  useToggleDashboard(isDashboardOpen);

  return (
    <main
      className={`fixed top-0 left-0 h-screen w-400 bg-white border-2 border-borderColor shadow-md transform transition-transition duration-700 ease-in-out ${isDashboardOpen ? 'translate-x-0 flex-center visible' : '-translate-x-full invisible'}`}
    >
      <div>대시보드</div>
    </main>
  );
}

export default DashboardContainer;
