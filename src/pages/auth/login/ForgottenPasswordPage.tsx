import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '@hooks/useTranslation';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { Routes } from '@models/Routes';

import FormFrame from '@components/ui/form-utils/FormFrame';
import FormField from '@components/ui/form-utils/FormField';
import FormSubmitButton from '@components/ui/form-utils/FormSubmitButton';

import { useForgottenPasswordMutation } from '@store';

import { loginGrid } from './login-page.scss';

const ForgottenPasswordPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [forgottenPassword, { error, isLoading }] = useForgottenPasswordMutation();

  const onSubmit = async (formData: any) => {
    try {
      const response = await forgottenPassword({
        identity: formData.identity
      }).unwrap();

      if (response) {
        localStorage.setItem('IDENTITY', formData.identity);
        navigate(Routes.RESET_PASSWORD);
      }
    } catch (error) {}
  };

  return (
    <div className={`${loginGrid} width-320`}>
      <div>
        <Link to={Routes.LOGIN} className="btn btn-outline-primary btn-xl mb-48">
          <i className="fa-light fa-circle-arrow-left me-8"></i>
          {t('common.back', 'Back')}
        </Link>
      </div>
      <div>
        <h1 className="fs-24 fw-semibold mb-4">
          {t('forgotten-password.title', 'Forgotten password')}
        </h1>
        <p className="text-gray-400 mb-24" data-testid="pre-submit-message">
          {t('forgotten-password.subtitle', 'Please fill your registration email or phone number.')}
        </p>
        <FormFrame
          formType="forgottenPassword"
          onSubmit={onSubmit}
          serverValidation={isEmpty(get(error, 'errors', [])) ? get(error, 'message') : ''}>
          <FormField
            name="identity"
            placeholder={t('login.identity_label', 'Email or phone number')}
            label={t('login.identity_label', 'Email or phone number')}
            className="mb-20"
            serverValidation={get(error, 'errors.code', [])}
          />
          <FormSubmitButton
            className="btn btn-primary btn-xl width-100"
            title={t('common.send', 'Send')}
            loading={isLoading}
            disabled={isLoading}
          />
        </FormFrame>
      </div>
      <div className="align-self-md-end mt-48">
        <p className="mb-8">{t('login.no_account', "You don't have an account?")}</p>
        <Link to={Routes.REGISTER} className="btn btn-outline-primary btn-xl width-100">
          {t('common.register', 'Register')}
        </Link>
      </div>
    </div>
  );
};

export default ForgottenPasswordPage;
