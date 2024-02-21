import { useCookies } from 'react-cookie';

import { configGet } from '@freya/config';

export const useLocale = () => {
  const [cookies, setCookie] = useCookies(['locale']);

  return {
    locales: configGet('locales'),
    languages: configGet('languages'),
    locale: cookies?.locale ?? configGet('fallbackLocale'),
    setLocale: (locale: string) => setCookie('locale', locale)
  };
};
