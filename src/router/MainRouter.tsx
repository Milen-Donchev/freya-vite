import React from 'react';
import { BrowserRouter as Router, Routes as BrowserRoutes, Route } from 'react-router-dom';

import { useAuthStatus } from '@freya/hooks/useAuthStatus';

import ScrollToTop from '@components/navigations/ScrollToTop';
import ErrorLayout from '@components/layouts/ErrorLayout';

import AuthRouter from './AuthRouter';
import GuestRouter from './GuestRouter';
import AlwaysAvailableRouter from './AlwaysAvailableRouter';

const MainRouter = () => {
  const { isAuthenticated, isGuestLoginAllowed, tempJWT } = useAuthStatus();

  return (
    <Router>
      <ScrollToTop />
      <BrowserRoutes>
        <Route element={<ErrorLayout />}>
          {AuthRouter()}
          {GuestRouter({ isAuthenticated, tempJWT, isGuestLoginAllowed })}
          {AlwaysAvailableRouter({ isAuthenticated, isGuestLoginAllowed })}
        </Route>
      </BrowserRoutes>
    </Router>
  );
};

export default MainRouter;
