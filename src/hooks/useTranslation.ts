/* istanbul ignore file */
import { useCallback, useState } from 'react';
import get from 'lodash/get';
import flow from 'lodash/flow';
import head from 'lodash/head';
import last from 'lodash/fp/last';
import reduce from 'lodash/reduce';
import isEmpty from 'lodash/isEmpty';
import replace from 'lodash/replace';
import toUpper from 'lodash/toUpper';
import isObject from 'lodash/isObject';
import upperFirst from 'lodash/upperFirst';

import { useLocale } from './useLocale';
import { configGet } from '@freya/config';
import { apiRoute } from '@utils/api-route';
import { eventually } from '@utils/helpers';
import { useDeepEqualsEffect } from '@hooks/useDeepEqualsEffect';

import { useTranslationsContext } from '@providers/Translations';

type UnsavedKeys = Record<string, string | undefined>;
export type TOptions = (Record<string, unknown> & { defaultValue?: string }) | string;
export type TFunction = (key: string, options?: TOptions) => any;

export const useTranslation = (namespace?: string) => {
  const { locale } = useLocale();
  const { translations, unsavedKeysRef } = useTranslationsContext();
  const defaultNamespace = namespace || configGet('defaultNamespace');
  const saveTranslations = configGet('saveTranslations');
  const [unsavedKeys, setUnsavedKeys] = useState<UnsavedKeys>({});

  // appends the default namespace to the key
  const parseKey = (key: string) => {
    const prefix = !key.includes('::') ? `${defaultNamespace}::` : '';
    return `${prefix}${key}`;
  };
  // returns default value based on argument type
  const getDefault = (options?: TOptions) => {
    if (!isEmpty(options)) {
      return isObject(options) ? get(options, 'defaultValue') : options;
    }
  };
  // replace the options placeholders into the translation
  const makeReplacements = (line: string, options: TOptions) =>
    flow(
      // converts the placeholders from options argument (copied from laravel Translator)
      (options) =>
        reduce(
          options,
          (output, value, key) => ({
            ...output,
            [`:${upperFirst(key)}`]: upperFirst(value),
            [`:${toUpper(key)}`]: toUpper(value),
            [`:${key}`]: value
          }),
          {}
        ),
      // replace the placeholders into the translation
      (placeholders) =>
        reduce(
          placeholders,
          (output, value, key) => {
            return replace(output, new RegExp(key, 'g'), String(value));
          },
          line
        )
    )(options);
  // saves not translated keys
  const save = (key: string, options?: TOptions) => {
    if (saveTranslations && !unsavedKeysRef?.current[key]) {
      unsavedKeysRef?.current && (unsavedKeysRef.current[key] = getDefault(options));
      setUnsavedKeys((state) => ({
        ...state,
        [key]: getDefault(options)
      }));
    }
  };
  // translates given key to the current locale
  const t = useCallback(
    (key: string, options?: TOptions) => {
      const parsedKey = parseKey(key);
      if (!translations) return getDefault(options) || parsedKey;

      return flow(
        (parsedKey) => {
          const line = get(translations, parsedKey);

          // sends the not translated key for translation
          if (!line) save(parsedKey, options);

          return {
            key: parsedKey,
            line: line || getDefault(options)
          };
        },
        ({ line, key }) => {
          // returns the key if line is undefined
          if (!line) return key;

          // makeReplacements placeholders only if options is an object
          if (isObject(options)) {
            return makeReplacements(line, options);
          }

          return line;
        }
      )(parsedKey);
    },
    [translations]
  );
  // translates plural based on the count argument
  const tChoice = useCallback(
    (key: string, count: number, options?: TOptions) => {
      // splits the translated  key by the pluralization divider
      const line = t(key, {
        ...(!isObject(options) ? { defaultValue: options } : options),
        count
      }).split('|');

      // returns either singular or plural translation based on the count argument
      return eventually(
        count > 0,
        () => last(line),
        () => head(line)
      );
    },
    [translations]
  );

  // sends unsaved keys with fetch instead of rtk to prevent additional rerender
  useDeepEqualsEffect(() => {
    if (isEmpty(unsavedKeys)) return;

    fetch(apiRoute(`/translations/${locale}`), {
      method: 'POST',
      body: JSON.stringify(unsavedKeys),
      headers: (() => {
        const headers = new Headers();
        headers.set('Content-type', 'application/json');
        return headers;
      })()
    }).finally(() => setUnsavedKeys({}));
  }, [unsavedKeys]);

  return { t, tChoice };
};
