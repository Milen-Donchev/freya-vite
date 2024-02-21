import React from 'react';
import map from 'lodash/map';
import classNames from 'classnames';

import type { Attachment } from '@freya/types';

import CommentAttachment from '@components/discussions/comments/CommentAttachment';

interface CommentAttachmentListProps {
  attachments: Attachment[];
  onAttachmentDelete?: (deleteUrl: string) => void;
  showDeleteButton?: boolean;
  className?: string;
}

const CommentAttachmentList: React.FC<CommentAttachmentListProps> = ({
  attachments,
  onAttachmentDelete,
  showDeleteButton = false,
  className
}) => {
  return (
    <div
      className={classNames('d-flex flex-wrap gap-12 align-items-center', className)}
      data-testid="comment-attachment-list">
      {map(attachments, (attachment, index) => (
        <CommentAttachment
          key={attachment.id ?? index}
          onDelete={onAttachmentDelete}
          showDeleteButton={showDeleteButton}
          {...attachment}
        />
      ))}
    </div>
  );
};

export default CommentAttachmentList;
