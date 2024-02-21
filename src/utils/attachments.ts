import last from 'lodash/last';
import split from 'lodash/split';
import slice from 'lodash/slice';

export type FileType = keyof typeof DEFAULT_RESOURCE_ASSETS;

export const DEFAULT_RESOURCE_ASSETS = {
  image: {
    icon: 'fa-file-image',
    color: 'primary'
  },
  video: {
    icon: 'fa-file-video',
    color: 'success'
  },
  attachment: {
    icon: 'fa-file',
    color: 'danger'
  }
};

export const ASSETS = {
  gif: DEFAULT_RESOURCE_ASSETS.image,
  jpg: DEFAULT_RESOURCE_ASSETS.image,
  jpeg: DEFAULT_RESOURCE_ASSETS.image,
  png: DEFAULT_RESOURCE_ASSETS.image,
  bmp: DEFAULT_RESOURCE_ASSETS.image,
  tiff: DEFAULT_RESOURCE_ASSETS.image,
  pdf: {
    icon: 'fa-file-pdf',
    color: 'danger'
  },
  doc: {
    icon: 'fa-file-doc',
    color: 'danger'
  },
  odt: DEFAULT_RESOURCE_ASSETS.attachment,
  txt: {
    icon: 'fa-file-lines',
    color: 'danger'
  },
  csv: {
    icon: 'fa-file-csv',
    color: 'danger'
  },
  xis: DEFAULT_RESOURCE_ASSETS.attachment,
  ots: DEFAULT_RESOURCE_ASSETS.attachment,
  ppt: {
    icon: 'fa-file-powerpoint',
    color: 'danger'
  },
  djvu: DEFAULT_RESOURCE_ASSETS.attachment,
  mp3: {
    icon: 'fa-file-music',
    color: 'danger'
  },
  aac: {
    icon: 'fa-file-music',
    color: 'danger'
  },
  mpeg: DEFAULT_RESOURCE_ASSETS.video,
  '3gp': DEFAULT_RESOURCE_ASSETS.video,
  avi: DEFAULT_RESOURCE_ASSETS.video,
  m4v: DEFAULT_RESOURCE_ASSETS.video,
  webm: DEFAULT_RESOURCE_ASSETS.video,
  dicom: DEFAULT_RESOURCE_ASSETS.attachment,
  nifti: DEFAULT_RESOURCE_ASSETS.attachment,
  dcm: DEFAULT_RESOURCE_ASSETS.attachment
};

export const SUPPORTED_FORMATS = Object.keys(ASSETS);

export const getAssetsByExtension = (extension?: File['type']) =>
  extension && extension in ASSETS
    ? ASSETS[extension as keyof typeof ASSETS]
    : DEFAULT_RESOURCE_ASSETS.attachment;

/**
 * Returns file extension
 * @param filename
 */
export const getFileExtension = (filename: string) => {
  return last(split(filename, '.'));
};

/**
 * Returns file size
 * @param bytes
 */
export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';

  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;

  if (bytes < kilobyte) {
    return bytes + ' Bytes';
  } else if (bytes < megabyte) {
    return (bytes / kilobyte).toFixed(2) + ' KB';
  } else {
    return (bytes / megabyte).toFixed(2) + ' MB';
  }
};

/**
 * Trim the filename according to the specified max allowed size and the number of visible characters at the beginning and end
 * @param filename
 * @param maxLength above this value the string will be trimmed
 * @param startSymbolsLength the number of characters that will be visible at the beginning of the string
 * @param endSymbolsLength the number of characters that will be visible at the end of the string
 */
export const trimFilename = (
  filename: string,
  maxLength: number,
  startSymbolsLength: number,
  endSymbolsLength: number
) => {
  if (filename.length <= maxLength) {
    return filename;
  }

  const trimmedStart = slice(filename, 0, startSymbolsLength).join('');
  const trimmedEnd = slice(filename, -endSymbolsLength).join('');
  const middleEllipsis = '...';

  return `${trimmedStart}${middleEllipsis}${trimmedEnd}`;
};
