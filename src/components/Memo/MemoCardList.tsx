import { useEffect, useState } from 'react';

import { Memo } from '../../config/types';
import { asyncLoadMemo } from '../../utils/idbMemo';
import MemoCard from './MemoCard';

function MemoCardList() {
  const [memos, setMemos] = useState<Memo[]>();

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await asyncLoadMemo();

        setMemos(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMemo();
  }, []);

  if (!memos || memos.length === 0) {
    return <p className='flex-center text-gray-800'>현재 저장된 메모가 없습니다.</p>;
  }

  return (
    <div>
      {memos.map((memo) => {
        return <MemoCard key={memo.id} memo={memo} />;
      })}
    </div>
  );
}

export default MemoCardList;
