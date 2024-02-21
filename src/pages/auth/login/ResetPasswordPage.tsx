import React, { useState } from 'react';
import { Routes } from '@models';
import { Link } from 'react-router-dom';
import { useTranslation } from '@hooks/useTranslation';
import get from 'lodash/get';

import FormFrame from '@components/ui/form-utils/FormFrame';
import FormField from '@components/ui/form-utils/FormField';
import FormSubmitButton from '@components/ui/form-utils/FormSubmitButton';

import { useResetPasswordMutation } from '@store';

import { loginGrid } from './login-page.scss';

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const [resetPassword, { error, isLoading }] = useResetPasswordMutation();

  const onSubmit = async (formData: any) => {
    try {
      const response = await resetPassword({
        identity: localStorage.getItem('IDENTITY') ?? '',
        code: formData.code,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      }).unwrap();

      if (response) {
        localStorage.removeItem('IDENTITY');
        setShowSubmitMessage(true);
      }
    } catch (error) {}
  };

  return (
    <div className={`${loginGrid} width-320`}>
      <div>
        <Link
          to={Routes.FORGOTTEN_PASSWORD}
          className={`btn btn-outline-primary btn-xl mb-48 ${showSubmitMessage ? 'd-none' : ''}`}>
          <i className="fa-light fa-circle-arrow-left me-8"></i>
          {t('common.back', 'Back')}
        </Link>
      </div>
      <div>
        {!showSubmitMessage && (
          <>
            <h1 className="fs-24 fw-semibold mb-4" data-testid="reset-password-title">
              {t('reset-password.title', 'Reset password')}
            </h1>
            <p className="text-gray-400 mb-24" data-testid="pre-submit-message">
              {t(
                'reset-password.subtitle',
                'Please check your email or phone for a message with your reset code. Your code is 6 numbers long.'
              )}
            </p>
            <FormFrame formType="resetPassword" onSubmit={onSubmit}>
              <FormField
                name="code"
                label={t('reset-password.code', 'Enter code')}
                placeholder={t('reset-password.code', '######')}
                className="mb-20"
                serverValidation={get(error, 'errors.code', [])}
                autoComplete={'one-time-code'}
              />
              <FormField
                name="password"
                type="password"
                label={t('register.password_label', 'Password')}
                placeholder={t('register.password_label', 'Password')}
                className="mb-20"
                autoComplete={'new-password'}
              />
              <FormField
                name="password_confirmation"
                type="password"
                label={t('register.password_repeat_label', 'Repeat password')}
                placeholder={t('register.password_repeat_label', 'Repeat password')}
                className="mb-20"
                autoComplete={'new-password'}
              />
              <FormSubmitButton
                className="btn btn-primary btn-xl width-100"
                title={t('common.send', 'Send')}
                loading={isLoading}
                disabled={isLoading}
              />
            </FormFrame>
          </>
        )}
        {showSubmitMessage && (
          <>
            <h1 className="fs-24 fw-semibold mb-4">
              {t('reset-password.title', 'Password reset successfully!')}
            </h1>
            <div className="width-100">
              <p className="mb-24" data-testid="submit-message">
                {t(
                  'reset-password.successful_reset_info',
                  'Your password has been successfully reset. Please use your new password to log in to your account.'
                )}
              </p>
              <Link to={Routes.LOGIN} className="btn btn-ghost-primary btn-xl width-100">
                {t('reset.go_to_login', 'Go to login page')}
              </Link>
            </div>
          </>
        )}
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

export default ResetPasswordPage;
