import { Quill } from 'react-quill';

const parchment = Quill.import('parchment');

const DEFAULT = {
  clipboard: {
    matchVisual: false
  },
  toolbar: {
    container: [
      [{ size: ['1rem', '0.75rem', '1.5rem', '2.5rem'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'blockquote', 'code-block', 'image'],
      [{ script: 'sub' }, { script: 'super' }],
      ['clean']
    ]
  },
  imageResize: {
    parchment,
    modules: ['Resize', 'DisplaySize']
  },
  imageDropAndPaste: {}
};

const COMMENT = {
  ...DEFAULT,
  magicUrl: true,
  toolbar: {
    container: []
  }
};

export const EDITOR_CONFIG = {
  default: DEFAULT,
  comment: COMMENT
} as const;

export type EditorConfig = keyof typeof EDITOR_CONFIG;
