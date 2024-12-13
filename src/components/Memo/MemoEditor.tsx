import { ChangeEvent, useState } from 'react';

import Markdown from 'react-markdown';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

import 'github-markdown-css';

function MemoEditor() {
  const [markdown, setMarkdown] = useState<string>('');

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className='w-full h-full flex flex-col gap-30'>
      <textarea
        name='markdownEditor'
        id='markdownEditor'
        className='w-full flex-grow border-1 rounded-sm p-5 border-borderColor'
        value={markdown}
        onChange={handleTextareaChange}
      />

      <div className='prose prose-sm max-w-none w-full flex-grow border-1 rounded-sm p-5 border-borderColor'>
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypePrettyCode, { theme: 'github-dark' }]]}
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  );
}

export default MemoEditor;
