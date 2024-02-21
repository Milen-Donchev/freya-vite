import React from 'react';
import type { CommentLink } from '@types';

interface LinkPreviewProps {
  linkPreview: CommentLink;
  isCloseButtonShown?: boolean;
  onClose?: () => void;
}

const CommentLinkPreview = (props: LinkPreviewProps) => {
  const { linkPreview, isCloseButtonShown = true, onClose } = props;

  const handleHide = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      data-testid="link-preview"
      className={`border border-1 border-gray-200 rounded-1 overflow-hidden position-relative ${
        isCloseButtonShown ? 'm-12' : 'mb-12'
      }`}>
      <a
        href={linkPreview?.url}
        target="_blank"
        rel="noreferrer"
        className="d-flex flex-column flex-md-row align-items-md-center justify-content-center text-start p-12">
        {linkPreview?.image && (
          <div className="border-md-end border-md-1 me-md-12 pe-md-12 mb-12 mb-md-0">
            <img
              src={linkPreview?.image}
              alt={linkPreview?.title}
              className="align-self-center rounded-start-2 "
              style={{ maxWidth: '120px' }}
            />
          </div>
        )}
        <div className="flex-grow-1 text-dark">
          <p className="fs-14 mb-2 fw-semibold me-16">{linkPreview?.title}</p>
          <p className="fs-12 mb-0">{linkPreview?.description}</p>
        </div>
      </a>
      {isCloseButtonShown && onClose && (
        <button
          className="btn btn-ghost-primary btn-icon m-4 position-absolute end-0 top-0"
          data-testid="link-preview-close-btn"
          onClick={handleHide}>
          <i className="fa-solid fa-xmark" />
        </button>
      )}
    </div>
  );
};

export default CommentLinkPreview;
