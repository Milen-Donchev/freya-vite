import React from 'react';

import RegisterForm from '@components/register/RegisterForm';
import AlreadyHaveProfilePartial from '@components/layouts/register/AlreadyHaveProfilePartial';

import { loginGrid, formWrapper, footerWrapper } from '@pages/auth/login/login-page.scss';

const RegisterPage = () => {
  return (
    <div className={`${loginGrid} width-320`}>
      <div className={`${formWrapper} align-self-md-start`}>
        <RegisterForm />
      </div>
      <div className={`${footerWrapper} align-self-md-end mt-48`}>
        <AlreadyHaveProfilePartial />
      </div>
    </div>
  );
};

export default RegisterPage;
