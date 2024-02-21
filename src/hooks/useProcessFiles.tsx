import get from 'lodash/get';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import has from 'lodash/has';
import assign from 'lodash/assign';

import { useFileUpload } from '@hooks/useFileUpload';
import { ValidationErrors } from '@models/ValidationErrors';
import { validateFileExt, validateFileSize } from '@utils/file-upload-helper';

const prefix = 'temp/';
const allowedExtensions = ['jpeg', 'jpg', 'webp', 'png'];
const uploadMaxSize = 1000;

export const useProcessFiles = () => {
  const { uploadFileToBucket } = useFileUpload();

  const processFiles = (uploadedFiles: FileList) => {
    return Promise.all(
      map(uploadedFiles, async (file: File) => {
        const errors = [];

        if (!validateFileSize(file, uploadMaxSize)) errors.push(ValidationErrors.MAX_FILE_SIZE.key);
        if (!validateFileExt(file, allowedExtensions))
          errors.push(ValidationErrors.INVALID_FILE_TYPE.key);

        const result = {
          errors,
          ...pick(file, ['name', 'size', 'type'])
        };

        if (isEmpty(errors) && !has(result, 'path')) {
          const data = await uploadFileToBucket(file, prefix);
          assign(result, {
            path: get(data, 'path'),
            deleteUrl: get(data, 'deleteUrl')
          });
        }

        return result;
      })
    );
  };

  return {
    processFiles
  };
};
