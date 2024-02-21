import React, {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';

import { Locale } from '@models/Locale';
import { apiRoute } from '@utils/api-route';
import { useLocale } from '@freya/hooks/useLocale';
import { configGet, configSet } from '@freya/config';
import { useLazyGetLocalesQuery } from '@store/api/configApi';

const TranslationsContext = createContext<{
  translations: any;
  unsavedKeysRef: MutableRefObject<Record<string, string | undefined>> | undefined;
}>({
  translations: {},
  unsavedKeysRef: undefined
});

export const Translations = ({ children }: { children: ReactNode }) => {
  const { locale } = useLocale();
  const { namespaces } = configGet();
  const unsavedKeysRef = useRef({});

  const [getLocales] = useLazyGetLocalesQuery();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [translations, setTranslations] = useState();

  const prepareTranslations = async () => {
    const locales = await getLocales('').unwrap();

    const fallbackLocale = find(locales, (locale: Locale) => locale.is_fallback);
    const queryLocales = map(locales, (locale) => locale.locale).join(',');
    const queryNamespaces = namespaces.join(',');

    configSet('fallbackLocale', fallbackLocale?.locale);
    configSet('locales', locales);

    fetch(apiRoute(`translations/${queryLocales}/${queryNamespaces}`))
      .then((response) => response && response.json())
      .then(({ data }) => setTranslations(data))
      .catch()
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    prepareTranslations();
  }, []);

  return (
    <TranslationsContext.Provider
      value={{ translations: get(translations, locale), unsavedKeysRef }}>
      <>{!isLoading && children}</>
    </TranslationsContext.Provider>
  );
};

export const useTranslationsContext = () => useContext(TranslationsContext);
