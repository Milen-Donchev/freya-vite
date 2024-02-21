import React, { useState } from 'react';
import map from 'lodash/map';

import type { Attachment } from '@freya/types';
import { useTranslation } from '@hooks/useTranslation';
import { trimFilename } from '@utils/attachments';

import ResourceBox from '@components/upload/ResourceBox';
import FileUploadPopup from '@components/upload/FileUploadPopup';
import UploadInputUnit from '@components/upload/UploadInputUnit';

const ATTACHMENTS_SUPPORTED_FILE_FORMATS = ['jpeg', 'png', 'pdf'];

interface ScheduleAttachmentsProps {
  attachments: Partial<Attachment>[];
  setAttachments: React.Dispatch<React.SetStateAction<Partial<Attachment>[]>>;
}

const ScheduleAttachments = (props: ScheduleAttachmentsProps) => {
  const { attachments, setAttachments } = props;
  const { t } = useTranslation();
  const [fileUploadPopupState, setFileUploadPopupState] = useState<boolean>(false);

  const handleToggleFileUploadPopupState = () => {
    setFileUploadPopupState((prev) => !prev);
  };

  const onConfirm = (files: Partial<Attachment>[]) => {
    if (files) {
      setAttachments(files);
    }
  };

  const handleRemoveFile = (path: string) => {
    setAttachments(attachments.filter((file) => file.deleteUrl !== path));
  };

  return (
    <>
      <div className="width-100">
        <p className="mb-12 fw-bold">
          {t(
            'schedules.details_page_attach_files',
            `Attaching documents and/or studies ${ATTACHMENTS_SUPPORTED_FILE_FORMATS}`
          )}
        </p>
      </div>
      <div className="row row-cols-1 row-cols-lg-2 g-20">
        <UploadInputUnit className="col" onClick={handleToggleFileUploadPopupState} />
        <FileUploadPopup
          show={fileUploadPopupState}
          supportedFormats={ATTACHMENTS_SUPPORTED_FILE_FORMATS}
          onClose={handleToggleFileUploadPopupState}
          onConfirm={onConfirm}
        />
        {map(attachments, ({ name, resource_type, path, size, deleteUrl }) => (
          <div key={deleteUrl} className="col position-relative">
            <ResourceBox
              filename={trimFilename(name!, 30, 10, 10)}
              path={path!}
              resource_type={resource_type!}
              size={size!}
            />
            <button
              onClick={() => handleRemoveFile(deleteUrl ?? '')}
              className="btn btn-ghost-primary btn-icon position-absolute end-0 top-0 me-12"
              data-testid="preview-attachment">
              <i className="fa-light fa-circle-xmark text-primary" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ScheduleAttachments;
