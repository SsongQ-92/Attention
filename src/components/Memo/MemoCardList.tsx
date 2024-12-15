import { useEffect, useState } from 'react';

import { pagination } from '../../config/consts';
import { Memo } from '../../config/types';
import useBoundStore from '../../store/useBoundStore';
import getPagination from '../../utils/getPagination';
import { asyncLoadMemo } from '../../utils/idbMemo';
import SortNewestIcon from '../Icon/SortNewestIcon';
import SortOldestIcon from '../Icon/SortOldestIcon';
import MemoCard from './MemoCard';

function MemoCardList() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');

  const setCreatingMemoMode = useBoundStore((state) => state.setCreatingMemoMode);
  const { pages, hasPrev, hasNext } = getPagination(memos.length, currentPage);

  const startIndex = pagination.pageSize * (currentPage - 1);
  const endIndex = pagination.pageSize * (currentPage - 1) + 4;

  const handleSortClick = () => {
    if (sort === 'newest') {
      setSort('oldest');
    } else {
      setSort('newest');
    }
  };

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

  const slicedMemos = memos.slice(startIndex, endIndex);

  if (sort === 'newest') {
    slicedMemos.sort((a, b) => b.id - a.id);
  } else {
    slicedMemos.sort((a, b) => a.id - b.id);
  }

  return (
    <div className='h-full flex flex-col gap-15 pb-20'>
      <div className='flex justify-between items-center'>
        <div
          className='flex-center rounded-[5px] size-26 hover:cursor-pointer hover:bg-backgroundColor-hover'
          onClick={handleSortClick}
        >
          {sort === 'newest' ? (
            <SortNewestIcon classNames='size-18' />
          ) : (
            <SortOldestIcon classNames='size-18' />
          )}
        </div>
        <button
          className='py-3 px-5 rounded-sm border-1 border-borderColor text-customBlack text-14 hover:bg-backgroundColor-hover '
          onClick={handleCreateClick}
        >
          새 메모
        </button>
      </div>
      <div className='flex flex-col gap-15 flex-grow w-full'>
        {slicedMemos.map((memo) => {
          return <MemoCard key={memo.id} memo={memo} />;
        })}
      </div>
      <div className='w-full flex-center gap-5'>
        {hasPrev && (
          <button className='text-14 py-1 px-3 border-1 bg-white border-borderColor hover:bg-backgroundColor-hover'>{`<`}</button>
        )}
        {pages.map((page) => {
          return (
            <button
              className='text-14 py-1 px-5 border-1 rounded-sm bg-white border-borderColor hover:bg-backgroundColor-hover'
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
        {hasNext && (
          <button className='text-14 py-1 px-3 border-1 bg-white border-borderColor hover:bg-backgroundColor-hover'>{`>`}</button>
        )}
      </div>
    </div>
  );
}

export default MemoCardList;
