import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import join from 'lodash/join';
import map from 'lodash/map';

export const validateFileExt = ({ name }: File, allowedExtensions: string[] = []) =>
  isEmpty(allowedExtensions) ||
  flow(
    (exts) => map(exts, (ext) => `\\.${ext}`),
    (exts) => join(exts, '|'),
    (regex) => new RegExp(`${regex}$`, 'i')
  )(allowedExtensions).test(name);

export const validateFileSize = ({ size }: File, uploadMaxSize = 100) =>
  size / 1024 / 1024 <= uploadMaxSize;
