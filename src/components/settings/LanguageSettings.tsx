import React from 'react';

import { useTranslation } from '@hooks/useTranslation';

import LanguageSwitcher from '@components/ui/language-switcher/LanguageSwitcher';

const LanguageSettings = () => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="d-none d-sm-block">
        {t('settings.language_and_locale', 'Language and locale')}
      </h3>
      <p className="mb-24 text-gray-300">
        {t(
          'settings.language_description',
          'Personalize your experience in the platform by managing your preferred language and locale.'
        )}
      </p>

      <h4 className="fs-18 my-20">
        {t(
          'settings.choose_language',
          'Choose your preferred language for headers, buttons and other text in the platform.'
        )}
      </h4>

      <div className="mw-50">
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default LanguageSettings;
