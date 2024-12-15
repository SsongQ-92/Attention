import { ChangeEvent, useState } from 'react';

import { omit } from 'lodash-es';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { modalText } from '../../config/consts';
import { Memo } from '../../config/types';
import useBoundStore from '../../store/useBoundStore';
import { asyncCreateMemo, asyncUpdateMemoById } from '../../utils/idbMemo';
import ListIcon from '../Icon/ListIcon';
import ConfirmModal from '../Modal/ConfirmModal';

function MemoEditor() {
  const viewMemoMode = useBoundStore((state) => state.viewMemoMode);
  const isCreatingMemoMode = useBoundStore((state) => state.isCreatingMemoMode);
  const isEditingMemoMode = useBoundStore((state) => state.isEditingMemoMode);
  const isKeyboardMode = useBoundStore((state) => state.isKeyboardMode);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);
  const addModal = useBoundStore((state) => state.addModal);
  const highlightLayerInfo = useBoundStore((state) => state.highlightLayerInfo);
  const setViewMemoMode = useBoundStore((state) => state.setViewMemoMode);
  const setCreatingMemoMode = useBoundStore((state) => state.setCreatingMemoMode);
  const setEditingMemoMode = useBoundStore((state) => state.setEditingMemoMode);

  const [newNote, setNewNote] = useState<{ title: string; content: string }>({
    title: viewMemoMode.title,
    content: viewMemoMode.content,
  });

  const handleConfirmClick = () => {
    setCreatingMemoMode(false);
    setEditingMemoMode(false);

    setViewMemoMode({
      isActive: false,
      id: 0,
      title: '',
      content: '',
    });
  };

  const handleListClick = () => {
    addModal('confirm');
  };

  const handleCopyClick = () => {
    const highlightedText = highlightLayerInfo.content;

    navigator.clipboard.writeText(highlightedText);
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
          className='flex-center rounded-[5px] size-26 hover:cursor-pointer hover:bg-backgroundColor-hover'
          onClick={handleListClick}
        >
          <ListIcon className='size-22' />
        </div>
        <div className='flex items-center gap-6'>
          {isKeyboardMode && (
            <button
              className='py-3 px-5 rounded-sm border-1 bg-yellow-100 text-customBlack text-14 hover:bg-yellow-300 '
              onClick={handleCopyClick}
            >
              하이라이트 복사
            </button>
          )}
          <button
            className='py-3 px-5 rounded-sm border-1 bg-white border-borderColor text-customBlack text-14 hover:bg-backgroundColor-hover '
            onClick={handleSaveClick}
          >
            저장
          </button>
        </div>
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
      {openModalTypeList.includes('confirm') && (
        <ConfirmModal confirmText={modalText.backToList} onConfirmClick={handleConfirmClick} />
      )}
    </div>
  );
}

export default MemoEditor;
