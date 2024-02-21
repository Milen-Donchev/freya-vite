import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

import type { Attachment } from '@types';

import { useFileUpload } from '@hooks/useFileUpload';
import { useTranslation } from '@hooks/useTranslation';
import { SUPPORTED_FORMATS } from '@utils/attachments';

import UploadInput from '@components/upload/UploadInput';
import ResourceBox from '@components/upload/ResourceBox';
import { Popup, type PopupProps } from '@components/ui/popup/Popup';
import InlineMessage from '@components/ui/toast-message/InlineMessage';

interface FileUploadPopupProps extends Partial<PopupProps> {
  onClose: (...args: any) => any;
  onConfirm: (files: Partial<Attachment>[]) => void;
  supportedFormats?: string[];
  maxSizePerFile?: number; // in MBs
}

const FileUploadPopup = (props: FileUploadPopupProps) => {
  const { onClose, onConfirm, supportedFormats, maxSizePerFile, ...rest } = props;

  const { t } = useTranslation();
  const { uploadFileToBucket, isLoading: isUploading, error: uploadError } = useFileUpload();

  const [files, setFiles] = useState<Partial<Attachment>[]>([]);

  const handleConfirm = () => {
    files && onConfirm(files);
    handleClose();
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  const handleUpload = async (file: File) => {
    const result = await uploadFileToBucket(
      file,
      undefined,
      supportedFormats ?? SUPPORTED_FORMATS,
      maxSizePerFile ?? 50
    );
    if (result?.path && result?.deleteUrl) {
      setFiles((files) => [
        ...files,
        {
          name: file.name,
          path: result.path,
          deleteUrl: result.deleteUrl,
          resource_type: 'attachment',
          size: String(file.size),
          type: file.type
        }
      ]);
    }
  };

  return (
    <Popup
      title={t('attachments.upload_file', 'Upload file')}
      onHide={handleClose}
      body={
        <div>
          <UploadInput onUpload={handleUpload} />
          <p className="text-gray-300 fs-12 mt-12">
            {`${t('attachments.supported_formats', `Supported formats:`)} ${
              supportedFormats ?? SUPPORTED_FORMATS.join(', ')
            }`}
          </p>
          {!!uploadError && <InlineMessage type="danger" message={uploadError as string} />}
          {isUploading && <Spinner variant="primary" animation="border" />}
          {!!files && !isEmpty(files) && (
            <div className="d-flex flex-column gap-12">
              {map(files, ({ name, path, resource_type, size }, i) => (
                <ResourceBox
                  key={i}
                  filename={name!}
                  path={path!}
                  resource_type={resource_type!}
                  size={size!}
                  hideActions
                />
              ))}
            </div>
          )}
        </div>
      }
      footer={
        <div className="d-flex flex-column flex-sm-row gap-20 width-100 justify-content-end">
          <button
            onClick={handleClose}
            className="width-100 width-sm-auto btn btn-outline-primary btn-lg">
            {t('common.cancel', 'Cancel')}
          </button>
          <button
            disabled={isUploading}
            onClick={handleConfirm}
            className="width-100 width-sm-auto btn btn-lg btn-primary-500">
            {t('common.confirm', 'Confirm')}
          </button>
        </div>
      }
      {...rest}
    />
  );
};

export default FileUploadPopup;
