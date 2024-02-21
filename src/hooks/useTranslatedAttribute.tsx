import get from 'lodash/get';

import { configGet } from '@freya/config';
import { useLocale } from './useLocale';

export const useTranslatedAttribute = () => {
  const { locale } = useLocale();

  return (attribute: { [key: string]: string }): string => {
    return get(attribute, locale, get(attribute, configGet('fallbackLocale'), ''));
  };
};
