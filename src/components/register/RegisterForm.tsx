import React, { Fragment, useCallback, useEffect } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import type { CustomError } from '@types';

import { Routes } from '@models/Routes';
import { useTranslation } from '@hooks/useTranslation';
import { setCurrentUser, resetCurrentUserSlice } from '@store/currentUserSlice';
import { setTempAccessToken, resetTempAuth } from '@store/tempAuthSlice';
import { useRegisterMutation } from '@store/api/authApi';
import { useLazyGetCurrentUserQuery } from '@store/api/userApi';

import FormField from '@components/ui/form-utils/FormField';
import FormFrame from '@components/ui/form-utils/FormFrame';
import FormSubmitButton from '@components/ui/form-utils/FormSubmitButton';
import FormCheckboxField from '@components/ui/form-utils/FormCheckboxField';

export const RegistrationStatus = { PENDING: 1, COMPLETED: 2 };

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [register, { error, isLoading }] = useRegisterMutation<{
    error: CustomError;
    isLoading: boolean;
  }>();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  const onSubmitRegisterForm = useCallback(async (formData: any) => {
    try {
      const { access_token, refresh_token, expires_in } = await register({
        identity: formData.identity,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      })?.unwrap();

      dispatch(setTempAccessToken({ access_token, refresh_token, expires_in }));
      const { data: user } = await getCurrentUser('');

      dispatch(setCurrentUser(user?.data));
      navigate(Routes.REGISTRATION_WIZARD, { replace: true });
    } catch (error) {}
  }, []);

  useEffect(() => {
    // ensure that authentication data will be cleared before registration
    dispatch(resetTempAuth(''));
    dispatch(resetCurrentUserSlice());
  }, []);

  return (
    <Fragment>
      <h1 className="fs-24 fw-semibold mb-20" data-testid="register-form-title">
        {t('register.register', 'Register')}
      </h1>
      <FormFrame
        formType="register"
        onSubmit={onSubmitRegisterForm}
        serverValidation={isEmpty(get(error, 'errors', [])) ? get(error, 'message') : ''}>
        <FormField
          name="identity"
          placeholder={t('register.identity_label', '+359xxxxxxxxx')}
          label={t('register.identity_label', 'Phone number (+359xxxxxxxxx)')}
          className="mb-20"
          serverValidation={get(error, 'errors.identity', [])}
        />
        <FormField
          name="password"
          type="password"
          label={t('register.password_label', 'Password')}
          placeholder={t('register.password_label', 'Password')}
          className="mb-20"
          serverValidation={get(error, 'errors.password', [])}
        />
        <FormField
          name="password_confirmation"
          type="password"
          label={t('register.password_repeat_label', 'Repeat password')}
          placeholder={t('register.password_repeat_label', 'Repeat password')}
          className="mb-20"
          serverValidation={get(error, 'errors.password_confirmation', [])}
        />
        <div className="d-flex justify-content-start flex-wrap align-items-center mb-20">
          <FormCheckboxField
            id="terms"
            name="terms"
            label={
              <>
                <span>{t('register.agree_with', 'Agree with the')}&nbsp;</span>
                <Link to={Routes.TERMS} target="_blank" className="fw-bold text-dark">
                  {t('register.terms_and_conditions', 'terms and conditions')}
                </Link>
              </>
            }
          />
        </div>
        <FormSubmitButton
          className="btn btn-primary btn-xl width-100"
          data-testid="register-btn"
          title={t('common.register', 'Register')}
          loading={isLoading}
          disabled={isLoading}
        />
      </FormFrame>
    </Fragment>
  );
};

export default RegisterForm;
