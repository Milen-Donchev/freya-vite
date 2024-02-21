import React from 'react';
import { Route } from 'react-router-dom';

import { Routes } from '@models/Routes';

import HomePage from '@pages/home/HomePage';
import LoginPage from '@pages/auth/login/LoginPage';
import ContactPage from '@pages/contacts/ContactPage';
import RegisterPage from '@pages/auth/register/RegisterPage';
import ResetPasswordPage from '@pages/auth/login/ResetPasswordPage';
import ForgottenPasswordPage from '@pages/auth/login/ForgottenPasswordPage';

import LoginLayout from '@components/layouts/login/LoginLayout';
import NavbarLayout from '@components/layouts/navbar-layout/NavbarLayout';
import ProtectedRoute from '@components/navigations/header-navigation/ProtectedRoute';
import RegistrationWizard from '@components/registration/registration-wizard/RegistrationWizard';
import RegistrationEndStep from '@components/registration/registration-wizard/RegistrationEndStep';
import RegistrationWizardLayout from '@components/layouts/registration-wizard/RegistrationWizardLayout';

interface GuestRouterProps {
  isAuthenticated: boolean;
  tempJWT: string | null;
  isGuestLoginAllowed: boolean;
}

const GuestRouter = ({ isAuthenticated, tempJWT, isGuestLoginAllowed }: GuestRouterProps) => {
  return (
    <Route
      element={
        <ProtectedRoute
          condition={!isAuthenticated}
          redirectPath={Routes.DISCUSSIONS_LISTING}
          shouldCheckOriginRoute
        />
      }>
      <Route element={<NavbarLayout isGuestLoginAllowed={isGuestLoginAllowed} />}>
        <Route path={Routes.HOME_PAGE} element={<HomePage />} />
        {!isAuthenticated && <Route path={Routes.CONTACTS} element={<ContactPage />} />}
      </Route>
      <Route element={<LoginLayout />}>
        <Route path={Routes.LOGIN} element={<LoginPage />} />
        <Route path={Routes.FORGOTTEN_PASSWORD} element={<ForgottenPasswordPage />} />
        <Route path={Routes.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={Routes.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute condition={!!tempJWT} redirectPath={Routes.REGISTER} />}>
        <Route element={<RegistrationWizardLayout />}>
          <Route path={Routes.REGISTRATION_WIZARD} element={<RegistrationWizard />} />
        </Route>
        <Route path={Routes.REGISTRATION_END_STEP} element={<RegistrationEndStep />} />
      </Route>
    </Route>
  );
};

export default GuestRouter;
