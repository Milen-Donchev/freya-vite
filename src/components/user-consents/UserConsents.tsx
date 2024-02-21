import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import get from 'lodash/get';
import map from 'lodash/map';

import { useTranslation } from '@hooks/useTranslation';
import { useSetUserConsentsMutation } from '@store/api/profileApi';
import { setCurrentUser, type Consent } from '@store/currentUserSlice';
import { Routes } from '@models/Routes';

const UserConsents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setUserConsents] = useSetUserConsentsMutation();
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);
  const [consents, setConsents] = useState<Consent[]>(get(currentUser, 'consents', []));
  const [step, setStep] = useState(1);

  const handleChange = (id: number, value: boolean) => {
    setConsents((prevConsents: Consent[]) =>
      map(prevConsents, (consent) => {
        if (consent.id === id) {
          return { ...consent, value: !value };
        }
        return consent;
      })
    );
  };

  const handleGetSettingsPage = () => {
    setStep(2);
  };

  const handleBackButton = () => {
    setStep(1);
  };

  const handleAcceptAll = () => {
    const acceptedConsents = consents.map((consent) => ({
      ...consent,
      value: true
    }));
    setUserConsents({ id: currentUser.id, formData: acceptedConsents });
    navigate(Routes.REGISTRATION_END_STEP);
  };

  const onSubmit = () => {
    setUserConsents({ id: currentUser.id, formData: consents });
    dispatch(setCurrentUser({ consents: consents }));

    navigate(Routes.REGISTRATION_END_STEP);
  };

  return (
    <div className="d-flex flex-fill flex-column mt-24">
      {step === 1 ? (
        <p>{ReactHtmlParser(t('register.consent_content', 'content'))}</p>
      ) : (
        <div data-testid="registation-step-three-form">
          {map(consents, ({ id, consent, value }, index) => (
            <div key={id} className="d-flex align-items-center flex-wrap flex-md-nowrap gap-16">
              <div className="d-flex justify-content-center align-items-center flex-shrink-0 bg-primary width-4 height-4 rounded-circle text-light mt-0 mt-md-4 order-1">
                {++index}
              </div>
              <div className="order-3 order-md-2 mb-0 flex-grow-1 d-flex align-items-center justify-content-start flex-wrap width-100 width-md-auto">
                <p className="fs-14 width-100 m-0">{t(`register.${consent}`, consent)}</p>
                <p className="fs-10 width-100">
                  {t(`register.${consent}_description`, 'description')}
                </p>
              </div>
              <div className="order-2 order-md-3 flex-shrink-0 align-self-center form-check form-switch">
                <input
                  id={id.toString()}
                  data-testid={`consent-toggle-button-${id}`}
                  onChange={() => handleChange(id, value)}
                  className={`form-check-input`}
                  type="checkbox"
                  role="switch"
                  checked={value}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="d-flex flex-column flex-fill justify-content-end">
        <div className="my-48 d-flex flex-column flex-sm-row gap-20 justify-content-between">
          <div className="d-flex flex-column flex-sm-row gap-20">
            {step === 1 ? (
              <button
                data-testid="settings-button"
                className="btn btn-outline-primary btn-xl width-100 width-sm-auto"
                onClick={handleGetSettingsPage}>
                {t('register.consents_cta_1', 'Settings')}
              </button>
            ) : (
              <button
                data-testid="back-button"
                className="btn btn-outline-primary btn-xl width-100 width-sm-auto"
                onClick={handleBackButton}>
                {t('register.consents_cta_3', 'Back')}
              </button>
            )}
          </div>
          <div className="d-flex flex-column flex-sm-row gap-20">
            {step !== 1 && (
              <button
                data-testid="save-and-exit-button"
                className="btn btn-outline-primary btn-xl width-100 width-sm-auto"
                onClick={onSubmit}>
                {t('register.consents_cta_4', 'Save and exit')}
              </button>
            )}
            <button
              data-testid="accept-all-button"
              className="btn btn-primary btn-xl width-100 width-sm-auto"
              onClick={handleAcceptAll}>
              {t('register.consents_cta_2', 'Accept all')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConsents;
