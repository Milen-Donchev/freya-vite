import React from 'react';

import type { Attachment } from '@types';

import Can from '@components/can/Can';
import FileUploadPopup from '@components/upload/FileUploadPopup';

import { commentPaperclip } from './comments.scss';

interface CommentAttachmentButtonProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onConfirm: (files: Partial<Attachment>[]) => void;
}

const CommentAttachmentButton: React.FC<CommentAttachmentButtonProps> = ({
  isOpen,
  onOpen,
  onClose,
  onConfirm
}) => {
  return (
    <Can permissions={['attach_to_comment']}>
      <button onClick={onOpen} className={`btn btn-ghost-primary btn-icon ${commentPaperclip}`}>
        <i className="fa-light fa-paperclip fs-24" />
      </button>
      <FileUploadPopup show={isOpen} onClose={onClose} onConfirm={onConfirm} />
    </Can>
  );
};

export default CommentAttachmentButton;
