import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';

import ErrorBoundary from '@components/errors/ErrorBoundary';
import PageNotFound from '@pages/page-not-found/PageNotFound';

const ErrorLayout = () => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname} fallback={<PageNotFound shouldForceFullscreenView />}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default ErrorLayout;
