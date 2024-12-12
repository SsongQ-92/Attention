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
    <div>
      <textarea
        name='markdownEditor'
        id='markdownEditor'
        value={markdown}
        onChange={handleTextareaChange}
      />

      <div>
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
