import { ChangeEvent, useState } from 'react';

import { omit } from 'lodash-es';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Memo } from '../../config/types';
import useBoundStore from '../../store/useBoundStore';
import { asyncCreateMemo, asyncUpdateMemoById } from '../../utils/idbMemo';
import ListIcon from '../Icon/ListIcon';

function MemoEditor() {
  const viewMemoMode = useBoundStore((state) => state.viewMemoMode);
  const isCreatingMemoMode = useBoundStore((state) => state.isCreatingMemoMode);
  const isEditingMemoMode = useBoundStore((state) => state.isEditingMemoMode);
  const setViewMemoMode = useBoundStore((state) => state.setViewMemoMode);
  const setCreatingMemoMode = useBoundStore((state) => state.setCreatingMemoMode);
  const setEditingMemoMode = useBoundStore((state) => state.setEditingMemoMode);

  const [newNote, setNewNote] = useState<{ title: string; content: string }>({
    title: viewMemoMode.title,
    content: viewMemoMode.content,
  });

  const handleListClick = () => {
    setCreatingMemoMode(false);
    setEditingMemoMode(false);

    setViewMemoMode({
      isActive: false,
      id: 0,
      title: '',
      content: '',
    });
  };

  const handleSaveClick = async () => {
    const memo: Memo = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      url: window.location.href,
      metaTitle: document.title,
      createdAt: new Date(),
      modifiedAt: isCreatingMemoMode ? null : new Date(),
    };

    try {
      if (isCreatingMemoMode) {
        await asyncCreateMemo(memo);

        setCreatingMemoMode(false);
      }

      if (isEditingMemoMode) {
        const editingMemo = omit(memo, ['createdAt']);

        await asyncUpdateMemoById(viewMemoMode.id, editingMemo);

        setEditingMemoMode(false);
        setViewMemoMode({
          isActive: false,
          id: 0,
          title: '',
          content: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote((prev) => ({ ...prev, content: e.target.value }));
  };

  return (
    <div className='w-full h-full flex flex-col gap-10'>
      <div className='flex justify-between items-center'>
        <div
          className='flex-center rounded-[5px] size-26 hover:bg-backgroundColor-hover'
          onClick={handleListClick}
        >
          <ListIcon className='size-22 hover:cursor-pointer' />
        </div>
        <button
          className='py-3 px-5 rounded-sm border-1 border-borderColor text-customBlack text-14 hover:bg-backgroundColor-hover '
          onClick={handleSaveClick}
        >
          저장
        </button>
      </div>
      <input
        className='w-full h-30 flex-shrink-0 border-1 rounded-sm p-5 border-borderColor placeholder:text-15 text-15'
        placeholder='제목을 입력해주세요.'
        value={newNote.title}
        onChange={handleTitleChange}
      />
      <textarea
        name='markdownEditor'
        id='markdownEditor'
        className='w-full flex-1 border-1 rounded-sm p-5 border-borderColor resize-none overflow-y-auto placeholder:text-15 text-15'
        placeholder='[마크다운 지원] 텍스트를 입력해주세요.'
        value={newNote.content}
        onChange={handleContentChange}
      />
      <article className='prose prose-sm max-w-none w-full flex-1 border-1 rounded-sm p-5 border-borderColor overflow-y-auto'>
        <Markdown remarkPlugins={[remarkGfm]}>{newNote.content}</Markdown>
      </article>
    </div>
  );
}

export default MemoEditor;
