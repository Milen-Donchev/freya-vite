import { configGet } from '../config';
import { normalizePath } from './helpers';

export const apiRoute = (
  path: string,
  params?: string[][] | Record<string, string> | string | URLSearchParams
) => {
  const url = normalizePath(`${configGet('apiUrl')}/${path}`);

  if (params) {
    return `${url}?${new URLSearchParams(params).toString()}`;
  }

  return url;
};
