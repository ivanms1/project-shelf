import React, { useCallback, useEffect, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import {
  createEditor,
  Editor,
  Transforms,
  Element as SlateElement,
} from 'slate';
import { Editable, withReact, Slate, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';

import SendIcon from '@/assets/editor/send.svg';
import BoldIcon from '@/assets/editor/bold.svg';

import { Button } from './components/Button';

interface ElementProps {
  attributes: any; // Define the appropriate type for attributes
  children: React.ReactNode; // Define the appropriate type for children
  element: any; // Define the appropriate type for element
}

interface LeafProps {
  attributes: any; // Define the appropriate type for attributes
  children: React.ReactNode; // Define the appropriate type for children
  leaf: any; // Define the appropriate type for element
}

const HOTKEYS: { [key: string]: string } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const STORAGE_KEY = 'editor-content';

const RichEditor = () => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  console.log('what is editor', editor.children);

  const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });
    let newProperties: Partial<SlateElement>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      };
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      };
    }
    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const isBlockActive = (editor, format, blockType = 'type') => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      })
    );

    return !!match;
  };

  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const Element = ({ attributes, children, element }: ElementProps) => {
    const style = { textAlign: element.align };
    switch (element.type) {
      case 'block-quote':
        return (
          <blockquote style={style} {...attributes}>
            {children}
          </blockquote>
        );
      case 'bulleted-list':
        return (
          <ul style={style} {...attributes}>
            {children}
          </ul>
        );
      case 'heading-one':
        return (
          <h1 style={style} {...attributes}>
            {children}
          </h1>
        );
      case 'heading-two':
        return (
          <h2 style={style} {...attributes}>
            {children}
          </h2>
        );
      case 'list-item':
        return (
          <li style={style} {...attributes}>
            {children}
          </li>
        );
      case 'numbered-list':
        return (
          <ol style={style} {...attributes}>
            {children}
          </ol>
        );
      default:
        return (
          <p style={style} {...attributes}>
            {children}
          </p>
        );
    }
  };

  const Leaf = ({ attributes, children, leaf }: LeafProps) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.code) {
      children = <code>{children}</code>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underline) {
      children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
  };

  const BlockButton = ({
    format,
    icon,
  }: {
    format: string;
    icon: React.ReactNode;
  }) => {
    const editor = useSlate();
    return (
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        <i>{icon}</i>
      </button>
    );
  };

  const MarkButton = ({
    format,
    icon,
  }: {
    format: string;
    icon: React.ReactNode;
  }) => {
    const editor = useSlate();
    return (
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <i className='text-black'>{icon}</i>
      </button>
    );
  };

  const handleEditorChange = (newValue) => {
    console.log('what is value', newValue);
    setValue(newValue);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
  };

  useEffect(() => {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    if (storedValue) {
      setValue(JSON.parse(storedValue));
    }
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(e) => handleEditorChange(e)}
    >
      <div className='flex w-[1200px] flex-col gap-10 border-[1px]  border-white '>
        <Editable
          className='rounded-[5px]  p-[20px] text-base leading-6 text-black'
          autoFocus
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event.nativeEvent as any)) {
                event.preventDefault();
                console.log('what is abc', editor.children);
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
        <div className=' flex w-full flex-row justify-between  bg-white px-[20px] py-[5px] text-black'>
          <div className='flex flex-row  gap-[20px] text-black'>
            <MarkButton format='bold' icon={<BoldIcon />} />
            <MarkButton format='italic' icon={'I'} />
            <MarkButton format='underline' icon={'U'} />
          </div>

          <button className='text-black'>
            <SendIcon />
          </button>
        </div>
      </div>
    </Slate>
  );
};

export default RichEditor;
