import React, { memo } from 'react';
import classNames from 'classnames';

import { useTranslation } from '@hooks/useTranslation';

import { discussionResourceUpload } from '../discussions.scss';

const DiscussionUploadResourceButton = () => {
  const { t } = useTranslation();

  const handleUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    // input.onchange = async () => {
    /* TODO:: logic for uploading resource file */
    // };
  };

  return (
    <div
      data-testid="upload-resource-button"
      onClick={handleUpload}
      className={classNames(
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'cursor-pointer',
        'rounded-3',
        'bg-secondary-100',
        discussionResourceUpload
      )}>
      <div className="d-xxl-flex align-items-center text-center p-20">
        <i className="fa-light fa-cloud-arrow-up me-xxl-24 mb-16 mb-xxl-0 fs-40 text-primary" />
        <div className="text-primary fw-semibold">{t('common.upload', 'Upload file')}</div>
      </div>
    </div>
  );
};

export default memo(DiscussionUploadResourceButton);
