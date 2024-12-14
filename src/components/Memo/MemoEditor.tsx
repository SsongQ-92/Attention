import { ChangeEvent, useState } from 'react';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import 'github-markdown-css';

import ListIcon from '../Icon/ListIcon';

function MemoEditor() {
  const [markdownTitle, setMarkdownTitle] = useState<string>('');
  const [markdownContent, setMarkdownContent] = useState<string>('');

  const handleSaveClick = () => {};

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMarkdownTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value);
  };

  return (
    <div className='w-full h-full flex flex-col gap-10'>
      <div className='flex justify-between items-center'>
        <div className='flex-center rounded-[5px] size-26 hover:bg-backgroundColor-hover'>
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
        value={markdownTitle}
        onChange={handleTitleChange}
      />
      <textarea
        name='markdownEditor'
        id='markdownEditor'
        className='w-full flex-1 border-1 rounded-sm p-5 border-borderColor resize-none overflow-y-auto placeholder:text-15 text-15'
        placeholder='[마크다운 지원] 텍스트를 입력해주세요.'
        value={markdownContent}
        onChange={handleContentChange}
      />
      <article className='prose-sm max-w-none w-full flex-1 border-1 rounded-sm p-5 border-borderColor overflow-y-auto'>
        <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
      </article>
    </div>
  );
}

export default MemoEditor;
