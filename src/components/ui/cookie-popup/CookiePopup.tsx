import React, { useMemo, useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import forEach from 'lodash/forEach';
import every from 'lodash/every';
import includes from 'lodash/includes';
import keys from 'lodash/keys';
import Cookies from 'js-cookie';

import { cookiePopupValues } from '@utils/form-validations/validation/cookie-pop-up';
import { useTranslation } from '@hooks/useTranslation';

import FormFrame from '@components/ui/form-utils/FormFrame';
import FormSubmitButton from '@components/ui/form-utils/FormSubmitButton';
import FormSwitch from '@components/ui/form-utils/FormSwitch';
import { Popup } from '@components/ui/popup/Popup';
import { daysToMilliseconds } from '@freya/utils/dateHelpers';

const cookieNamesToCheck = keys(cookiePopupValues);

interface FormData {
  facebook_pixel: boolean;
  google_ad_manager: boolean;
  google_ads_remarketing: boolean;
  google_analytics: boolean;
  hotjar: boolean;
  linkedin: boolean;
  youtube: boolean;
}

const CookiePopup = () => {
  const cookies = Cookies.get();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isAcceptAllClicked, setAcceptAllClicked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const existingCookies = useMemo(() => Object.keys(cookies), [cookies]);

  const checkIsCookieConsentAccepted = useMemo(
    () => every(cookieNamesToCheck, (cookieName) => includes(existingCookies, cookieName)),
    [cookieNamesToCheck, existingCookies]
  );

  const handleGetSettingsPage = () => {
    setStep(2);
  };

  const handleBackButton = () => {
    setStep(1);
  };

  const handleSubmit = (formData: FormData) => {
    const expirationTime = daysToMilliseconds(365);

    if (isAcceptAllClicked) {
      forEach(Object.entries(cookiePopupValues), ([key]) => {
        Cookies.set(key, true as any, { expires: expirationTime });
      });
    } else {
      forEach(Object.entries(formData), ([key, value]) => {
        Cookies.set(key, value, { expires: expirationTime });
      });
    }
    setModalOpen(false);
  };

  const handleAllCookiesAccepted = () => {
    setAcceptAllClicked(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!checkIsCookieConsentAccepted) {
      timeout = setTimeout(() => {
        setModalOpen(true);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [checkIsCookieConsentAccepted]);

  return (
    <FormFrame formType="cookie_popup" onSubmit={handleSubmit}>
      <Popup
        backdrop={'static'}
        closeButton={false}
        show={isModalOpen}
        scrollable={true}
        title={
          step === 1
            ? t('cookie.popup_title', 'My preferences')
            : t('cookie.popup_settings_title', 'Settings')
        }
        body={
          <div>
            {step === 1 ? (
              <div>{ReactHtmlParser(t('cookie.popup_content', 'content'))}</div>
            ) : (
              <>
                <div className="mb-16">
                  <h5 className="width-100 m-0">
                    {t('cookie.facebook_pixel_title', 'Facebook Pixel')}
                  </h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-12 m-0 pe-12">
                      {t(
                        'cookie.facebook_pixel_description',
                        'Records events with information about whether Facebook users visit CredoWeb or a specific page (marketing)'
                      )}
                    </p>
                    <FormSwitch
                      id="facebook_pixel"
                      name="facebook_pixel"
                      defaultChecked={false}
                      className="order-2 order-md-3 flex-shrink-0 align-self-center"
                    />
                  </div>
                </div>

                <div className="mb-16">
                  <h5 className="width-100 m-0">{t('cookie.hotJar_title', 'HotJar')}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-12 pe-12">
                      {t(
                        'cookie.hotJar_description',
                        'Records heatmaps, videos, surveys on specifically specified pages (analytical and marketing)'
                      )}
                    </p>
                    <FormSwitch
                      id="hotjar"
                      name="hotjar"
                      defaultChecked={false}
                      className="order-2 order-md-3 flex-shrink-0 align-self-center"
                    />
                  </div>
                </div>

                <div className="mb-16">
                  <h5 className="width-100 m-0">
                    {t('cookie.google_analytics_title', 'Google Analytics 4/Universal')}
                  </h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-12 pe-12">
                      {t(
                        'cookie.google_analytics_description',
                        'Provides analytical data on the behaviour of users who use CredoWeb (analytical and marketing)'
                      )}
                    </p>
                    <FormSwitch
                      id="google_analytics"
                      name="google_analytics"
                      defaultChecked={false}
                      className="order-2 order-md-3 flex-shrink-0 align-self-center"
                    />
                  </div>
                </div>

                <div className="mb-16">
                  <h5 className="width-100 m-0">
                    {t('cookie.google_ad_manager_title', 'Google AdManager')}
                  </h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-12 pe-12">
                      {t(
                        'cookie.google_ad_manager_description',
                        'Manages the banners in CredoWeb (marketing and advertising)'
                      )}
                    </p>
                    <FormSwitch
                      id="google_ad_manager"
                      name="google_ad_manager"
                      defaultChecked={false}
                      className="order-2 order-md-3 flex-shrink-0 align-self-center"
                    />
                  </div>
                </div>

                <div className="mb-16">
                  <h5 className="width-100 m-0">
                    {t('cookie.google_ads_remarketing_title', 'Google Ads remarketing')}
                  </h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-12 pe-12">
                      {t(
                        'cookie.google_ads_remarketing_description',
                        'Analytical data about users and their behaviour in CredoWeb (analytical and marketing)'
                      )}
                    </p>
                    <FormSwitch
                      id="google_ads_remarketing"
                      name="google_ads_remarketing"
                      defaultChecked={false}
                      className="order-2 order-md-3 flex-shrink-0 align-self-center"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        }
        size="lg"
        footer={
          <div className="d-flex width-100 flex-column flex-sm-row gap-20 justify-content-end">
            {step === 1 ? (
              <button
                data-testid="settings-button"
                className="btn btn-lg btn-outline-primary width-100 width-sm-auto"
                onClick={handleGetSettingsPage}>
                {t('cookie.popup_cta_1', 'Settings')}
              </button>
            ) : (
              <>
                <button
                  data-testid="back-button"
                  className="btn btn-lg btn-outline-primary width-100 width-sm-auto"
                  onClick={handleBackButton}>
                  {t('cookie.popup_cta_4', 'Back')}
                </button>

                <FormSubmitButton
                  data-testid="se-btn"
                  className="btn btn-lg btn-outline-primary width-100 width-sm-auto"
                  title={t('cookie.popup_cta_2', 'Save and exit')}
                  loading={false}
                  disabled={false}
                />
              </>
            )}
            <FormSubmitButton
              className="btn btn-lg btn-primary width-100 width-sm-auto"
              data-testid="accept-all-button"
              title={t('cookie.popup_cta_3', 'Accept all')}
              onClick={handleAllCookiesAccepted}
              loading={false}
              disabled={false}
            />
          </div>
        }
      />
    </FormFrame>
  );
};

export default CookiePopup;
