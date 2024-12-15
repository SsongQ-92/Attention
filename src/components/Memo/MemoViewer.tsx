import { useEffect, useState } from 'react';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Memo } from '../../config/types';
import useBoundStore from '../../store/useBoundStore';
import getDate from '../../utils/getDate';
import { asyncDeleteMemoById, asyncLoadMemo } from '../../utils/idbMemo';
import RevertIcon from '../Icon/RevertIcon';

function MemoViewer() {
  const [memo, setMemo] = useState<Memo>();

  const viewMemoMode = useBoundStore((state) => state.viewMemoMode);
  const setViewMemoMode = useBoundStore((state) => state.setViewMemoMode);
  const setEditingMemoMode = useBoundStore((state) => state.setEditingMemoMode);

  const handleRevertIconClick = () => {
    setViewMemoMode({
      isActive: false,
      id: 0,
      title: '',
      content: '',
    });
  };

  const handleEditClick = () => {
    if (memo && memo.title && memo.content) {
      setViewMemoMode({
        isActive: false,
        id: viewMemoMode.id,
        title: memo.title,
        content: memo.content,
      });
    }
    setEditingMemoMode(true);
  };

  const handleDeleteClick = async () => {
    await asyncDeleteMemoById(viewMemoMode.id);

    setViewMemoMode({
      isActive: false,
      id: 0,
      title: '',
      content: '',
    });
  };

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = (await asyncLoadMemo()) as Memo[];
        const currentMemo = response.find((data) => data.id === viewMemoMode.id);

        setMemo(currentMemo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMemo();
  }, [viewMemoMode]);

  if (!memo) {
    return null;
  }

  const { title, content, url, metaTitle, createdAt, modifiedAt } = memo;

  const createdDate = getDate(createdAt);
  const modifiedDate = modifiedAt !== null ? getDate(modifiedAt) : '수정내역 없음';

  return (
    <div className='w-full h-full flex flex-col gap-10'>
      <div className='flex justify-between items-center'>
        <div
          onClick={handleRevertIconClick}
          className='flex-center rounded-[5px] size-26 hover:bg-backgroundColor-hover'
        >
          <RevertIcon className='size-22 hover:cursor-pointer' />
        </div>
        <div className='flex-center gap-10'>
          <button
            className='py-3 px-5 rounded-sm border-1 border-borderColor text-customBlack text-14 hover:bg-backgroundColor-hover '
            onClick={handleEditClick}
          >
            수정
          </button>
          <button
            className='py-3 px-5 rounded-sm border-1 border-borderColor text-customBlack text-14 hover:bg-backgroundColor-hover '
            onClick={handleDeleteClick}
          >
            삭제
          </button>
        </div>
      </div>
      <div className='w-full h-full flex-shrink-0 flex flex-col gap-10 border-1 rounded-sm p-10 pb-20 text-customBlack border-borderColor'>
        <h3 className='font-semibold text-20'>{title}</h3>
        <a href={url} rel='noopener noreferrer' target='_blank'>
          <p className='text-12 text-blue-300 hover:underline'>{`${url} | ${metaTitle}`}</p>
        </a>
        <div className='flex flex-col gap-3'>
          <p className='text-11 text-black/80'>
            최초 작성일:
            {` ${createdDate.year}-${createdDate.month}-${createdDate.date} ${createdDate.hour}:${createdDate.minute} ${createdDate.standard}`}
          </p>
          <p className='text-11 text-black/80'>
            마지막 업데이트:
            {typeof modifiedDate === 'string'
              ? ` ` + modifiedDate
              : ` ${modifiedDate.year}-${modifiedDate.month}-${modifiedDate.date} ${modifiedDate.hour}:${modifiedDate.minute} ${modifiedDate.standard}`}
          </p>
        </div>
        <div className='w-full border-t-1 border-borderColor' />
        <article className='prose prose-sm max-w-none w-full h-full flex-grow  overflow-y-auto'>
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </article>
      </div>
    </div>
  );
}

export default MemoViewer;
