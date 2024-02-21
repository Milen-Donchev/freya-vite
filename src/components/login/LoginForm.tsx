import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import type { LoginFormData } from '@types';

import { useTranslation } from '@hooks/useTranslation';
import { Routes } from '@models/Routes';
import { setCurrentUser, resetCurrentUserSlice } from '@store/currentUserSlice';
import { setAuthData, setIsRegistrationCompleted } from '@store/authSlice';
import { useLoginMutation } from '@store/api/authApi';
import { useLazyGetCurrentUserQuery } from '@store/api/userApi';
import { resetTempAuth, setTempAccessToken } from '@store/tempAuthSlice';

import FormField from '@components/ui/form-utils/FormField';
import FormFrame from '@components/ui/form-utils/FormFrame';
import { RegistrationStatus } from '@components/register/RegisterForm';
import FormSubmitButton from '@components/ui/form-utils/FormSubmitButton';

const LoginForm = () => {
  const [getCurrentUser] = useLazyGetCurrentUserQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { error, isLoading }] = useLoginMutation();

  const onSubmitLoginForm = async (formData: LoginFormData) => {
    try {
      const response = await login({
        identity: formData.identity,
        password: formData.password
      }).unwrap();

      if (response) {
        dispatch(setTempAccessToken(response));
        const { data: user } = await getCurrentUser('');

        if (user) {
          dispatch(setCurrentUser(user.data));

          if (user?.data?.entity?.registration_status === RegistrationStatus.COMPLETED) {
            dispatch(setAuthData(response));
            dispatch(resetTempAuth(''));
            dispatch(setIsRegistrationCompleted(true));
          } else {
            navigate(Routes.REGISTRATION_WIZARD);
          }
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    // ensure that authentication data will be cleared before login
    dispatch(resetTempAuth(''));
    dispatch(resetCurrentUserSlice());
  }, []);

  return (
    <Fragment>
      <h1 className="fs-24 fw-semibold mb-20" data-testid="login-form-title">
        {t('common.login', 'Login')}
      </h1>
      <FormFrame
        formType="login"
        serverValidation={isEmpty(get(error, 'errors', [])) ? get(error, 'message') : ''}
        onSubmit={onSubmitLoginForm}>
        <FormField
          name="identity"
          type="text"
          placeholder={t('login.identity_label', '+359xxxxxxxxx')}
          label={t('login.identity_label', 'Phone number (+359xxxxxxxxx)')}
          serverValidation={get(error, 'errors.identity', [])}
          className="mb-20"
        />
        <FormField
          name="password"
          type="password"
          placeholder={t('login.password_label', 'Password')}
          label={t('login.password_label', 'Password')}
          serverValidation={get(error, 'errors.password', [])}
          className="mb-20"
        />
        <div className="text-end mb-24">
          <Link to={Routes.FORGOTTEN_PASSWORD} className="btn-link text-end">
            {t('login.forgotten_password', 'Forgotten password?')}
          </Link>
        </div>
        <FormSubmitButton
          className="btn btn-primary btn-xl width-100"
          title={t('common.login', 'Login')}
          loading={isLoading}
          disabled={isLoading}
        />
      </FormFrame>
    </Fragment>
  );
};

export default LoginForm;
