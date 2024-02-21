import React, { memo, useState } from 'react';
import classNames from 'classnames';

import { Breakpoints } from '@models/Breakpoints';
import { useTranslation } from '@hooks/useTranslation';
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import {
  type FileType,
  formatBytes,
  getFileExtension,
  getAssetsByExtension,
  trimFilename
} from '@utils/attachments';

import FileViewer from '@components/ui/file-viewer/FileViewer';
import { Popup } from '@components/ui/popup/Popup';

interface ResourceBoxProps {
  resource_type: FileType;
  filename: string;
  path: string;
  size: string;
  hideActions?: boolean;
  className?: string;
  forceMobileVariant?: boolean;
}

const ResourceBox = (props: ResourceBoxProps) => {
  const { t } = useTranslation();
  const {
    filename,
    size,
    path,
    resource_type,
    hideActions = false,
    className,
    forceMobileVariant = false
  } = props;
  const { width } = useWindowDimensions();
  const isXXL = !forceMobileVariant && width >= Breakpoints.XXL;
  const fileExtension = getFileExtension(filename);
  const { icon, color } = getAssetsByExtension(fileExtension);
  const [showPopup, setShowPopup] = useState(false);
  const isPdf = resource_type === 'attachment' && getFileExtension(path) === 'pdf';

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div
        className={classNames(
          `bg-${color}`,
          'p-20',
          'bg-opacity-10',
          'rounded-3',
          'd-flex',
          'flex-column',
          'flex-xxl-row',
          'justify-content-between',
          'height-100',
          'gap-12',
          'border',
          `border-${color}-400`,
          className
        )}>
        <div className="d-flex">
          <i className={`fa-light ${icon} fs-48 text-${color}-400 me-16`} />
          <div>
            <div className="fw-semibold text-break lh-sm">{trimFilename(filename, 30, 10, 10)}</div>
            <div className="fs-14 text-gray-300 mt-4 lh-sm">{formatBytes(Number(size))}</div>
          </div>
        </div>
        {!hideActions && (
          <div className="d-flex gap-12 justify-content-end align-items-center">
            {(resource_type === 'image' || isPdf) && (
              <button
                onClick={handleShowPopup}
                className={`btn btn-ghost-primary ${isXXL && 'btn-icon btn-lg'}`}
                data-testid="preview-attachment">
                <i className={`fa-light fa-eye ${!isXXL && 'me-8'}`} />

                {!isXXL && t('common.preview', 'Preview')}
              </button>
            )}
            <a
              href={path}
              target="_blank"
              className={`btn btn-ghost-primary ${isXXL && 'btn-icon btn-lg'}`}>
              <i className={`fa-light fa-folder-arrow-down ${!isXXL && 'me-8'}`} />
              {!isXXL && t('common.download', 'Download')}
            </a>
          </div>
        )}
      </div>
      <Popup
        show={showPopup}
        onHide={handleHidePopup}
        size="lg"
        body={
          <div className="text-center">
            {resource_type === 'image' && (
              <img src={path} alt="attachment-image" className="img-fluid" />
            )}
            {isPdf && <FileViewer fileUrl={path} />}
          </div>
        }
      />
    </>
  );
};

export default memo(ResourceBox);
