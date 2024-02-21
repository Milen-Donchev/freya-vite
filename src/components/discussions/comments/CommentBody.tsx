import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import type ReactQuill from 'react-quill';
import ReactHtmlParser from 'react-html-parser';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';

import type { Attachment, CommentLink } from '@types';

import { useTranslation } from '@hooks/useTranslation';
import { useComments } from '@providers/CommentsProvider';
import { useProcessTextUrls } from '@hooks/useProcessTextUrls';
import { useGetDiscussion } from '@store/api/discussionApi';

import TextEditor from '@components/ui/text-editor/TextEditor';
import AnonymousCheckbox from '@components/discussions/comments/AnonymousCheckbox';
import CommentLinkPreview from '@components/discussions/comments/CommentLinkPreview';
import CommentAttachmentList from '@components/discussions/comments/CommentAttachmentList';
import CommentAttachmentButton from '@components/discussions/comments/CommentAttachmentButton';

import { htmlText } from './comments.scss';

interface CommentBodyProps {
  commentId: number;
  commentText: string;
  editModeOn: boolean;
  toggleEditMode: () => void;
  isAnonymousDefault?: boolean;
  links?: CommentLink[];
  setLinks?: React.Dispatch<React.SetStateAction<CommentLink[]>>;
  isScraping?: boolean;
  attachments?: Attachment[];
}

const CommentBody = (props: CommentBodyProps) => {
  const {
    commentId,
    commentText,
    editModeOn,
    toggleEditMode,
    isAnonymousDefault = false,
    links = [],
    isScraping,
    attachments
  } = props;

  const { t } = useTranslation();
  const {
    editComment,
    isLoadingEditComment,
    editRequestArgs,
    anchorCommentId,
    clearAnchorCommentId,
    isLoading,
    isLoadingChildren,
    isLoadingSpecific
  } = useComments();
  const { setLinks, processUrls, links: processedLinks } = useProcessTextUrls();
  const editorRef = useRef<ReactQuill>(null);
  const commentRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();
  const { data: discussion } = useGetDiscussion(id as string);

  const [comment, setComment] = useState(commentText);
  const [isAnonymous, setIsAnonymous] = useState(isAnonymousDefault);
  const [isLinkPreviewVisible, setLinkPreviewVisible] = useState<boolean>(true);
  // Used for attachment editting purposes
  const [currentAttachments, setCurrentAttachments] = useState<Attachment[]>(attachments ?? []);
  const [isAttachmentPopupOpen, setIsAttachmentPopupOpen] = useState(false);

  const isEdittingCurrentComment = isLoadingEditComment && editRequestArgs?.commentId === commentId;

  const openAttachmentPopup = () => setIsAttachmentPopupOpen(true);
  const closeAttachmentPopup = () => setIsAttachmentPopupOpen(false);

  const handleChange = (editorValue: string) => {
    if (editorRef.current) {
      setLinkPreviewVisible(true);
      processUrls({ editorRef });
    }

    setComment(editorValue);
  };

  const handleSubmit = () => {
    toggleEditMode();

    if (!comment) return;
    editComment(commentId, comment, isAnonymous, processedLinks, currentAttachments);
  };

  const cancelEdit = () => {
    setComment(commentText);
    toggleEditMode();
  };

  const scrollToCommentAfterRender = () => {
    commentRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
    clearAnchorCommentId();
  };

  const handleDeleteAttachment = (path: string) => {
    const newAttachments = filter(currentAttachments, (attacment) => attacment.path !== path);
    setCurrentAttachments(newAttachments);
  };

  const handleAttachmentUploadConfirm = (files: Partial<Attachment>[]) => {
    setCurrentAttachments((a) => [...a, ...(files as Attachment[])]);
  };

  useEffect(() => {
    if (
      anchorCommentId &&
      String(commentId) === anchorCommentId &&
      !isLoading &&
      !isLoadingSpecific &&
      !isLoadingChildren
    ) {
      scrollToCommentAfterRender();
    }
  }, [isLoadingSpecific, isLoading, isLoadingChildren, anchorCommentId]);

  return editModeOn ? (
    <div className="my-20 d-flex flex-column">
      <div className="border border-1 border-primary-400 rounded-1 mb-8">
        <TextEditor
          ref={editorRef}
          value={comment}
          onChange={handleChange}
          editorConfig="comment"
          theme="bubble"
          links={processedLinks}
          setLinks={setLinks}
          linkPreview={processedLinks[processedLinks.length - 1]}
          isLinkPreviewVisible={isLinkPreviewVisible}
          setLinkPreviewVisible={setLinkPreviewVisible}
          attachments={currentAttachments}
          onAttachmentDelete={handleDeleteAttachment}
        />
      </div>
      <div className="d-md-flex justify-content-between align-items-center mt-20">
        {!isEmpty(discussion) && discussion?.allow_anonymous_comment && (
          <AnonymousCheckbox onToggle={setIsAnonymous} />
        )}
        <div className="d-flex mt-20 mt-md-0">
          {!isEmpty(discussion) && discussion?.allow_comment_attachment && (
            <CommentAttachmentButton
              isOpen={isAttachmentPopupOpen}
              onOpen={openAttachmentPopup}
              onClose={closeAttachmentPopup}
              onConfirm={handleAttachmentUploadConfirm}
            />
          )}
          <button
            onClick={cancelEdit}
            data-testid="cancel-edit-button"
            className="btn btn-outline-primary mx-16 width-50 width-md-auto">
            {t('common.cancel', 'Cancel')}
          </button>
          <button
            data-testid="comment-body-submit-edit-button"
            onClick={handleSubmit}
            className="btn btn-primary width-50 width-md-auto">
            {t('common.submit', 'Submit')}
          </button>
        </div>
      </div>
    </div>
  ) : isEdittingCurrentComment ? (
    <CommentSkeleton />
  ) : (
    <>
      <div ref={commentRef} className={`mt-20 ${htmlText}`}>
        {ReactHtmlParser(commentText)}
      </div>
      {attachments && <CommentAttachmentList attachments={attachments} />}
      {!isScraping &&
        map(links, (link, key) => {
          if (link.has_preview)
            return (
              <CommentLinkPreview
                linkPreview={link}
                key={key}
                isCloseButtonShown={false}
                {...link}
              />
            );
        })}
    </>
  );
};

export default CommentBody;

const CommentSkeleton = () => (
  <div className="d-flex">
    <Skeleton height={50} containerClassName="flex-fill my-16" borderRadius={12} />
  </div>
);
