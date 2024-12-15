import { useEffect, useState } from 'react';

import { Memo } from '../../config/types';
import useBoundStore from '../../store/useBoundStore';
import { asyncLoadMemo } from '../../utils/idbMemo';
import MemoCard from './MemoCard';

function MemoCardList() {
  const [memos, setMemos] = useState<Memo[]>();

  const setCreatingMemoMode = useBoundStore((state) => state.setCreatingMemoMode);

  const handleCreateClick = () => {
    setCreatingMemoMode(true);
  };

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const response = await asyncLoadMemo();

        setMemos(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMemos();
  }, []);

  if (!memos || memos.length === 0) {
    return (
      <div className='w-full h-full flex-center text-gray-800'>현재 저장된 메모가 없습니다.</div>
    );
  }

  return (
    <div className='h-full flex flex-col gap-15'>
      <div className='flex justify-between items-center'>
        <button
          className='py-3 px-5 rounded-sm border-1 border-borderColor text-customBlack text-14 hover:bg-backgroundColor-hover '
          onClick={handleCreateClick}
        >
          새 메모
        </button>
      </div>
      {memos.map((memo) => {
        return <MemoCard key={memo.id} memo={memo} />;
      })}
    </div>
  );
}

export default MemoCardList;
