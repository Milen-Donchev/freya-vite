import get from 'lodash/get';
import { useState } from 'react';

import { useTranslation } from '@hooks/useTranslation';
import { validateFileExt, validateFileSize } from '@utils/file-upload-helper';
import { useCreateUrlMutation } from '@store/api/fileUploadApi';
import { useUploadMutation } from '@store/api/cloudUploadApi';

export const useFileUpload = () => {
  const [upload, { isLoading: isUploading }] = useUploadMutation();
  const [createUrl, { isLoading: isCreatingUrl }] = useCreateUrlMutation();

  const { t } = useTranslation();

  const [error, setError] = useState<null | string>(null);

  const uploadFileToBucket = async (
    file: File,
    prefix = '/temp',
    allowedExtensions?: string[],
    allowedSize?: number /* in MBs */
  ) => {
    setError(null);
    if (allowedExtensions) {
      const isFileExtensionAllowed = validateFileExt(file, allowedExtensions);
      if (!isFileExtensionAllowed) {
        return setError(t('validation.file_extension', 'File extension is not allowed'));
      }
    }

    if (allowedSize) {
      const isFileSizeAllowed = validateFileSize(file, allowedSize);
      if (!isFileSizeAllowed) {
        return setError(t('validation.file_size', 'File is too large'));
      }
    }

    const urls = await createUrl({ file, prefix }).unwrap();

    await upload({ file, url: get(urls, 'putUrl') });
    return {
      path: get(urls, 'path'),
      deleteUrl: get(urls, 'deleteUrl')
    };
  };

  return {
    isLoading: isUploading || isCreatingUrl,
    error,
    uploadFileToBucket
  };
};
