import { ChangeEvent, useState } from 'react';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import 'github-markdown-css';

function MemoEditor() {
  const [markdown, setMarkdown] = useState<string>('');

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className='w-full h-full flex flex-col gap-10'>
      <textarea
        name='markdownEditor'
        id='markdownEditor'
        className='w-full flex-1 border-1 rounded-sm p-5 border-borderColor resize-none overflow-y-auto'
        placeholder='[마크다운 지원] 텍스트를 입력해주세요.'
        value={markdown}
        onChange={handleTextareaChange}
      />
      <div className='prose prose-sm max-w-none w-full flex-1 border-1 rounded-sm p-5 border-borderColor overflow-y-auto'>
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>
    </div>
  );
}

export default MemoEditor;
