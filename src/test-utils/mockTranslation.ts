import type { TOptions } from '@hooks/useTranslation';

export const mockTranslation = (str: string, options?: string | TOptions) =>
  options ? (typeof options === 'string' ? options : options.defaultValue) : str;
