import React from 'react';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import values from 'lodash/values';

import type { Language } from '@types';

import { configGet } from '@freya/config';
import { useLocale } from '@hooks/useLocale';

import CustomSelect from '../select-field/CustomSelect';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { setLocale, locale: chosenLocale } = useLocale();

  const handleChange = (e: Language | null) => {
    e && setLocale(e.locale);
  };

  return (
    <CustomSelect<Language, false>
      data-testid="language-switcher-wrapper"
      name="language-switcher"
      value={find(values(configGet('locales')), ({ locale }) => isEqual(locale, chosenLocale))}
      getOptionLabel={({ locale }) => locale.toUpperCase()}
      getOptionValue={({ locale }) => locale}
      options={values(configGet('locales'))}
      onChange={handleChange}
      placeholder={''}
      className={`compact fs-14 fw-bold ${className ?? ''}`}
    />
  );
};

export default LanguageSwitcher;
