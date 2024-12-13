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
        className='w-full flex-grow border-1 rounded-sm p-5 border-borderColor resize-none overflow-y-auto'
        value={markdown}
        onChange={handleTextareaChange}
      />

      <div className='prose prose-sm max-w-none w-full flex-grow border-1 rounded-sm p-5 border-borderColor'>
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>
    </div>
  );
}

export default MemoEditor;
