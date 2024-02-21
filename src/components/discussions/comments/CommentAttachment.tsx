import React, { useState } from 'react';
import classNames from 'classnames';

import {
  type FileType,
  getFileExtension,
  getAssetsByExtension,
  trimFilename
} from '@utils/attachments';

import { Popup } from '@components/ui/popup/Popup';

interface CommentAttachmentProps {
  id: number;
  name: string;
  path: string;
  resource_type: FileType;
  deleteUrl?: string;
  className?: string;
  onDelete?: (deleteUrl: string) => void;
  showDeleteButton?: boolean;
}

const CommentAttachment: React.FC<CommentAttachmentProps> = ({
  name,
  path,
  resource_type,
  deleteUrl,
  className,
  onDelete,
  showDeleteButton = false
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const fileExtension = getFileExtension(name);
  const { icon, color } = getAssetsByExtension(fileExtension);

  const handleDelete = () => onDelete!(deleteUrl ?? path);
  const openPreviewPopup = () => setShowPopup(true);
  const closePreviewPopup = () => setShowPopup(false);

  return (
    <>
      <div
        className={classNames(
          `d-flex bg-${color}-100 align-items-center justify-content-between mw-320 border mb-8 px-16 rounded-5 border-1 border-${color}-400`,
          className
        )}>
        <div className="d-flex align-items-center gap-8 py-8" title={name}>
          <i className={`fa-light ${icon} text-${color}-400 fs-20`} />
          <span className="fw-semibold text-break me-8 fs-12">
            {trimFilename(name, 30, 10, 10)}
          </span>
        </div>

        {showDeleteButton && (
          <button
            onClick={handleDelete}
            className="btn btn-ghost-primary btn-icon"
            data-testid="delete-attachment">
            <i className="fa-light fa-circle-xmark" />
          </button>
        )}
        {!showDeleteButton && (
          <div className="d-flex gap-4 justify-content-end align-items-center">
            {resource_type === 'image' && (
              <button
                onClick={openPreviewPopup}
                className="btn btn-ghost-primary btn-icon"
                data-testid="preview-attachment">
                <i className="fa-light fa-eye" />
              </button>
            )}
            <a href={path} target="_blank" className="btn btn-ghost-primary btn-icon">
              <i className="fa-light fa-folder-arrow-down" />
            </a>
          </div>
        )}
      </div>
      <Popup
        data-testid="attachment-popup"
        show={showPopup}
        onHide={closePreviewPopup}
        size="lg"
        body={
          <div className="text-center">
            <img src={path} alt="attachment-image" className="img-fluid" />
          </div>
        }
      />
    </>
  );
};

export default CommentAttachment;
