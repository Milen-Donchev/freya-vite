import React, { forwardRef, useEffect, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import isEmpty from 'lodash/isEmpty';
import ImageResize from 'quill-image-resize-module-react';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import MagicUrl from 'quill-magic-url';
import { useTranslation } from '@hooks/useTranslation';

import type { Attachment, CommentLink } from '@types';

import { EDITOR_CONFIG, type EditorConfig } from './editorConfig';

import { useProcessTextUrls } from '@hooks/useProcessTextUrls';

import CommentLinkPreview from '@components/discussions/comments/CommentLinkPreview';
import CommentAttachmentList from '@components/discussions/comments/CommentAttachmentList';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

export interface TextEditorProps {
  value?: ReactQuill.Value | string;
  placeholder?: string;
  maxImagesAllowed?: number;
  uploadMaxSize?: number;
  editorConfig?: EditorConfig;
  theme?: 'snow' | 'bubble';
  onChange: (editorValue: string) => void;
  wrapperClassName?: string;
  links?: CommentLink[];
  setLinks?: React.Dispatch<React.SetStateAction<CommentLink[]>>;
  linkPreview?: CommentLink;
  isLinkPreviewVisible?: boolean;
  setLinkPreviewVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  attachments?: Attachment[];
  onAttachmentDelete?: (deleteUrl: string) => void;
}

/**
 * Register custom sizes for text and transform class-based
 * styling, for 'align' option, to inline.
 * Register a custom className for all image elements
 */
const Sizes = Quill.import('attributors/style/size');
const Align = Quill.import('attributors/style/align');
const Image = Quill.import('formats/image');
Image.className = 'text-editor-image';
Sizes.whitelist = ['1rem', '0.75rem', '1.5rem', '2.5rem'];
Quill.register(Image, true);
Quill.register(Sizes, true);
Quill.register(Align, true);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
Quill.register('modules/magicUrl', MagicUrl);

/* istanbul ignore next */
const checkMaxImagesReached = (editorValue = '', maxImagesAllowed: number) =>
  (editorValue.match(/img/gi) ?? []).length < maxImagesAllowed;

const TextEditor = forwardRef<ReactQuill, TextEditorProps>(
  (
    {
      value = '',
      placeholder,
      maxImagesAllowed = 5,
      uploadMaxSize = 100,
      editorConfig = 'default',
      theme = 'snow',
      onChange,
      wrapperClassName,
      linkPreview,
      links,
      setLinks,
      isLinkPreviewVisible = true,
      setLinkPreviewVisible,
      attachments,
      onAttachmentDelete
    },
    ref: any
  ) => {
    const { t } = useTranslation();

    const { changeLinksProp } = useProcessTextUrls();

    // TODO:: Implement after upload image functionality is finished
    // const { uploadFileToBucket } = useFileUpload()

    /* istanbul ignore next */
    const customImageUploader = useCallback(async () => {
      // const currentEditorValue = ref.current.value.toString()
      // const canAddImage = checkMaxImagesReached(currentEditorValue, maxImagesAllowed)
      // if (!canAddImage) return alert(t('common.max_images_in_editor_error', 'Max number of images reached.'))
      // const input = document.createElement('input')
      // input.setAttribute('type', 'file')
      // input.setAttribute('accept', 'image/*')
      // input.click()
      // input.onchange = async (e: any) => {
      //   const file = e.target.files[0]
      //   const editor = ref.current.getEditor()
      //   const range = editor.getSelection()
      //   if (!validateFileSize(file, uploadMaxSize))
      //     return alert(t('common.max_image_size_error', 'Image is too large.'))
      //   const data = await uploadFileToBucket(file)
      //   const link = data.path
      //   editor.insertEmbed(range.index, 'image', link)
      // }
    }, [maxImagesAllowed, ref, t, uploadMaxSize]);

    /* istanbul ignore next */
    const customImageDragAndPasteHandler = (imageBase64: string, fileType: string) => {
      // 1. Convert base64 to file and upload to image server
      // 2. insert the image into the editor with the new url as 'src'
    };

    const handleChange = (val: string) => {
      /* ('<p><br></p>') gets returned by the editor, when its been focused and left empty */
      onChange(val === '<p><br></p>' ? '' : val);
    };

    const handlePreviewClose = () => {
      if (setLinkPreviewVisible && links && setLinks) {
        const changedLinks = changeLinksProp('has_preview', false, links);
        setLinks(changedLinks);
        setLinkPreviewVisible(false);
      }
    };

    /**
     * Adding the custom handler on mount, fixes this bug
     * https://github.com/zenoamaro/react-quill/issues/743
     */
    useEffect(() => {
      const editor = ref?.current?.getEditor();
      editor?.getModule('toolbar')?.addHandler('image', customImageUploader);

      if (editor) {
        editor.getModule('imageDropAndPaste').insert = customImageDragAndPasteHandler;
      }
    }, [customImageUploader, ref]);

    return (
      // Prevents dragging images from the browser
      <>
        <div
          data-testid="react-quill-wrapper"
          className={wrapperClassName}
          onDragOver={(e) => e.preventDefault()}>
          <ReactQuill
            ref={ref}
            theme={theme}
            modules={EDITOR_CONFIG[editorConfig]}
            onChange={handleChange}
            defaultValue={value}
            data-testid="react-quill"
            placeholder={
              placeholder ?? t('common.editor_placeholder', 'Write an opinion or ask a question')
            }
          />
          {!!attachments && !isEmpty(attachments) && (
            <CommentAttachmentList
              attachments={attachments}
              onAttachmentDelete={onAttachmentDelete!}
              className="m-12"
              showDeleteButton
            />
          )}
          {isLinkPreviewVisible && linkPreview && (
            <CommentLinkPreview linkPreview={linkPreview} onClose={handlePreviewClose} />
          )}
        </div>
      </>
    );
  }
);

export default TextEditor;
