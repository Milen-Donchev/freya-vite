import React from 'react';
import classNames from 'classnames';

import { useTranslation } from '@hooks/useTranslation';

import { uploadInput } from './upload.scss';

interface UploadInputUnitProps {
  className?: string;
  onClick?: () => void;
}

const UploadInputUnit = (props: UploadInputUnitProps) => {
  const { className, onClick, ...rest } = props;
  const { t } = useTranslation();

  return (
    <div className={className} {...rest}>
      <div
        className={classNames(
          'd-flex',
          'justify-content-center',
          'align-items-center',
          'cursor-pointer',
          'rounded-3',
          'bg-secondary-100',
          'height-100',
          uploadInput
        )}
        onClick={onClick}>
        <div className="text-center p-20">
          <i className="fa-light fa-cloud-arrow-up mb-16 mb-xxl-0 fs-40 text-primary" />
          <div className="text-primary fw-semibold mt-12">
            {t('common.upload', 'Click to upload a file')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadInputUnit;
