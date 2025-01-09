import { ChangeEvent } from 'react';

import { omit } from 'lodash-es';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { modalText } from '../../config/consts';
import { Memo } from '../../config/types';
import useBoundStore from '../../store/useBoundStore';
import { asyncCreateMemo, asyncUpdateMemoById } from '../../utils/idbMemo';
import ListIcon from '../Icon/ListIcon';
import ConfirmModal from '../Modal/ConfirmModal';
import InformModal from '../Modal/InformModal';

function MemoEditor() {
  const viewMemoMode = useBoundStore((state) => state.viewMemoMode);
  const newNote = useBoundStore((state) => state.newNote);
  const isCreatingMemoMode = useBoundStore((state) => state.isCreatingMemoMode);
  const isEditingMemoMode = useBoundStore((state) => state.isEditingMemoMode);
  const isKeyboardMode = useBoundStore((state) => state.isKeyboardMode);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);
  const addModal = useBoundStore((state) => state.addModal);
  const highlightLayerInfo = useBoundStore((state) => state.highlightLayerInfo);
  const setViewMemoMode = useBoundStore((state) => state.setViewMemoMode);
  const setNewNote = useBoundStore((state) => state.setNewNote);
  const setCreatingMemoMode = useBoundStore((state) => state.setCreatingMemoMode);
  const setEditingMemoMode = useBoundStore((state) => state.setEditingMemoMode);

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

    addModal('informCopyHighlight');
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
        if (!memo.title) {
          addModal('informNoMemoTitle');

          return;
        }

        if (!memo.content) {
          addModal('informNoMemoContent');

          return;
        }

        await asyncCreateMemo(memo);

        setCreatingMemoMode(false);
        setNewNote({ title: '', content: '' });
      }

      if (isEditingMemoMode) {
        if (!memo.title) {
          addModal('informNoMemoTitle');

          return;
        }

        if (!memo.content) {
          addModal('informNoMemoContent');

          return;
        }

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
    setNewNote({ ...newNote, title: e.target.value });
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote({ ...newNote, content: e.target.value });
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
      {newNote.content ? (
        <article className='prose prose-sm max-w-none w-full flex-1 border-1 rounded-sm p-5 border-borderColor overflow-y-auto'>
          <Markdown remarkPlugins={[remarkGfm]}>{newNote.content}</Markdown>
        </article>
      ) : (
        <article className='max-w-none w-full flex-1 border-1 rounded-sm p-5  border-borderColor text-15 text-slate-400 pointer-events-none'>
          입력하는 메모 내용을 이 곳에서 확인할 수 있습니다.
        </article>
      )}
      {openModalTypeList.includes('confirm') && (
        <ConfirmModal confirmText={modalText.backToList} onConfirmClick={handleConfirmClick} />
      )}
      {openModalTypeList.includes('informCopyHighlight') && (
        <InformModal confirmText={modalText.copyHighlightText} />
      )}
      {openModalTypeList.includes('informNoMemoTitle') && (
        <InformModal confirmText={modalText.NoMemoTitle} />
      )}
      {openModalTypeList.includes('informNoMemoContent') && (
        <InformModal confirmText={modalText.NoMemoContent} />
      )}
    </div>
  );
}

export default MemoEditor;
