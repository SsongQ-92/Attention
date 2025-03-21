import { SERVICE_TITLE } from '../../config/consts';
import ErrorBoundary from '../../config/ErrorBoundary';
import useToggleDashboard from '../../hooks/useToggleDashboard';
import useBoundStore from '../../store/useBoundStore';
import MemoCardList from '../Memo/MemoCardList';
import MemoEditor from '../Memo/MemoEditor';
import MemoViewer from '../Memo/MemoViewer';
import FoldedDashboard from './FoldedDashboard';

function DashboardContainer() {
  const isDashboardOpen = useBoundStore((state) => state.isDashboardOpen);
  const isFoldedDashboardOpen = useBoundStore((state) => state.isFoldedDashboardOpen);
  const isCreatingMemoMode = useBoundStore((state) => state.isCreatingMemoMode);
  const isEditingMemoMode = useBoundStore((state) => state.isEditingMemoMode);
  const viewMemoMode = useBoundStore((state) => state.viewMemoMode);
  const setGlobalError = useBoundStore((state) => state.setGlobalError);

  useToggleDashboard();

  return (
    <ErrorBoundary onError={(error: Error) => setGlobalError(error.message)}>
      <main className='h-screen fixed top-0 left-0 z-dashboard'>
        {isDashboardOpen && (
          <div className='flex flex-col justify-start gap-20 p-10 py-30 w-270 h-full bg-white'>
            <h1 className='font-pretendard color-customBlack text-25 bg-yellow-100 px-10 font-bold'>
              {SERVICE_TITLE}
            </h1>
            {!viewMemoMode.isActive && !isCreatingMemoMode && !isEditingMemoMode && (
              <MemoCardList />
            )}
            {viewMemoMode.isActive && <MemoViewer />}
            {(isCreatingMemoMode || isEditingMemoMode) && <MemoEditor />}
          </div>
        )}
        {isFoldedDashboardOpen && <FoldedDashboard />}
      </main>
    </ErrorBoundary>
  );
}

export default DashboardContainer;
