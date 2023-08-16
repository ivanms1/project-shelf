import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import Toolbar from './Toolbar';
import CodeHighlightPlugin from './CodeHighlight';
import { EditorState } from 'lexical';

function Placeholder({ isReadOnly }: { isReadOnly: boolean }) {
  return (
    <div className='editor-placeholder'>
      {isReadOnly ? 'No Description added' : 'Start editing here...'}
    </div>
  );
}

const exampleTheme = {
  ltr: 'text-left',
  rtl: 'text-right',
  placeholder:
    'text-grey-light overflow-hidden absolute overflow-ellipsis top-4 left-2.5 user-select-none inline-block pointer-events-none',
  paragraph: 'margin-0 mb-2 relative',
  quote: 'margin-0 ml-5 color-grey-lighter border-l-4 border-grey-lighter pl-4',
  heading: {
    h1: 'margin-0 mb-3 p-0 text-2xl text-black',
    h2: 'm-0 mt-2.5 p-0 font-bold uppercase text-grey-lighter',
    h3: '',
    h4: '',
    h5: '',
  },
  list: {
    nested: {
      listitem: 'list-none',
    },
    ol: ' m-0 ml-4 p-0',
    ul: ' m-0 ml-4 p-0',
    listitem: 'my-2 mx-8',
  },
  image: '',
  link: 'text-blue-light no-underline editor-link',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    overflowed: '',
    hashtag: '',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    code: 'bg-grey-light py-0.5 px-1 text-[94%] rounded',
  },
  code: 'relative mx-0 my-2 overflow-x-auto whitespace-pre bg-grey-light p-2 pb-12 text-sm',
  codeHighlight: {
    atrule: 'text-[#07a]',
    attr: 'text-[#07a]',
    boolean: 'text-[#905]',
    builtin: 'editor-tokenSelector',
    cdata: 'editor-tokenComment',
    char: 'editor-tokenSelector',
    class: 'editor-tokenFunction',
    'class-name': 'editor-tokenFunction',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenProperty',
    deleted: 'editor-tokenProperty',
    doctype: 'editor-tokenComment',
    entity: 'editor-tokenOperator',
    function: 'editor-tokenFunction',
    important: 'editor-tokenVariable',
    inserted: 'editor-tokenSelector',
    keyword: 'text-[#07a]',
    namespace: 'editor-tokenVariable',
    number: 'editor-tokenProperty',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenComment',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenVariable',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenSelector',
    symbol: 'editor-tokenProperty',
    tag: 'editor-tokenProperty',
    url: 'editor-tokenOperator',
    variable: 'editor-tokenVariable',
  },
};

const editorConfig = {
  namespace: 'project-shelf-editor',
  theme: exampleTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  canShowPlaceholder: true,
  editable: true,
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export default function Editor({ onChange, value, readOnly }: any) {
  const changeHandler = (editorState: EditorState) => {
    onChange(JSON.stringify(editorState.toJSON()));
  };

  editorConfig.editable = !readOnly;

  return (
    <LexicalComposer
      initialConfig={
        value ? { ...editorConfig, editorState: value } : editorConfig
      }
    >
      <div className='editor-container'>
        {!readOnly && (
          <>
            <Toolbar /> <OnChangePlugin onChange={changeHandler} />
          </>
        )}
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`editor-input ${
                  readOnly ? 'min-h-0' : 'min-h-[150px]'
                }`}
              />
            }
            placeholder={<Placeholder isReadOnly={readOnly} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <CodeHighlightPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
