import React, { forwardRef, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import type ReactQuill from 'react-quill';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import { useParams } from 'react-router-dom';

import type { Attachment } from '@freya/types/knowledgeCenter';

import { getImage } from '@utils/helpers';
import { useComments } from '@providers/CommentsProvider';
import { useProcessTextUrls } from '@hooks/useProcessTextUrls';
import { useTranslation } from '@hooks/useTranslation';
import { useGetDiscussion } from '@store/api/discussionApi';
import { useDeleteMutation } from '@store/api/cloudUploadApi';

import Avatar from '@components/ui/avatar/Avatar';
import TextEditor from '@components/ui/text-editor/TextEditor';
import AnonymousCheckbox from '@components/discussions/comments/AnonymousCheckbox';
import CommentAttachmentButton from '@components/discussions/comments/CommentAttachmentButton';

import { commentInputGrid, commentInput, commentSubmit } from './comments.scss';

interface CommentInputProps {
  parentId?: number | null;
  pinOrderId?: number | null;
}

const CommentInput = forwardRef<HTMLInputElement, CommentInputProps>((props, ref: any) => {
  const { parentId = null, pinOrderId = null } = props;
  const { id } = useParams();
  const { data: discussion } = useGetDiscussion(id as string);

  const { t } = useTranslation();
  const { createComment } = useComments();
  const { processUrls, links, setLinks } = useProcessTextUrls();
  const editorRef = useRef<ReactQuill>(null);
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);

  const [isLinkPreviewVisible, setLinkPreviewVisible] = useState<boolean>(true);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isAttachmentPopupOpen, setIsAttachmentPopupOpen] = useState(false);
  const [attachments, setAttachments] = useState<Partial<Attachment>[]>([]);

  const [deleteAttachment] = useDeleteMutation();

  const openAttachmentPopup = () => setIsAttachmentPopupOpen(true);
  const closeAttachmentPopup = () => setIsAttachmentPopupOpen(false);

  const handleChange = (editorValue: string) => {
    if (editorRef.current) {
      setLinkPreviewVisible(true);
      processUrls({ editorRef });
    }

    setComment(editorValue);
  };

  const addComment = () => {
    if (!comment && isEmpty(attachments)) return;
    createComment(comment, isAnonymous, parentId, pinOrderId, links, attachments);

    setLinkPreviewVisible(true);
    setComment('');
    setAttachments([]);
    // Clear editor value after submit comment.
    forEach(document.getElementsByClassName('ql-editor'), (editor) => {
      editor.innerHTML = '';
    });
  };

  const handleAttachmentUpload = (files: Partial<Attachment>[]) => {
    setAttachments(files);
  };

  const handleAttachmentDelete = (deleteUrl: string) => {
    deleteAttachment({ deleteUrl });
    const newAttachments = filter(attachments, (a) => a.deleteUrl !== deleteUrl);
    setAttachments(newAttachments);
  };

  return (
    <div className={commentInputGrid}>
      {/* User Avatar */}
      <Avatar
        size="width-4 height-4 width-sm-5 height-sm-5"
        image={getImage(currentUser?.image, 'thumb')}
        className="commentAvatar"
      />
      {/* Input field */}
      <div ref={ref} className={commentInput}>
        <TextEditor
          theme="bubble"
          ref={editorRef}
          value={comment}
          editorConfig="comment"
          onChange={handleChange}
          placeholder={t(
            'comments.share_opinion_or_ask_question',
            'Share an opinion or ask a question'
          )}
          wrapperClassName="border border-1 border-primary-400 rounded-1"
          links={links}
          setLinks={setLinks}
          linkPreview={links && links[links?.length - 1]}
          isLinkPreviewVisible={isLinkPreviewVisible}
          setLinkPreviewVisible={setLinkPreviewVisible}
          attachments={attachments as Attachment[]}
          onAttachmentDelete={handleAttachmentDelete}
        />
      </div>

      {!isEmpty(discussion) && discussion?.allow_anonymous_comment && (
        <AnonymousCheckbox onToggle={setIsAnonymous} />
      )}

      {/* Paperclip Button */}
      {!isEmpty(discussion) && discussion?.allow_comment_attachment && (
        <CommentAttachmentButton
          isOpen={isAttachmentPopupOpen}
          onOpen={openAttachmentPopup}
          onClose={closeAttachmentPopup}
          onConfirm={handleAttachmentUpload}
        />
      )}

      {/* Comment Button */}
      <div
        data-testid="create-comment-button"
        onClick={addComment}
        className={`btn btn-primary ${commentSubmit}`}>
        {t('comment.add_comment', 'Comment')}
      </div>
    </div>
  );
});

export default CommentInput;
