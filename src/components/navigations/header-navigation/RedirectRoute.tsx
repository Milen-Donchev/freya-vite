import React from 'react';
import { Navigate } from 'react-router-dom';

import { Routes } from '@models/Routes';

interface RedirectRouteProps {
  hasUser: boolean;
}

const RedirectRoute = (props: RedirectRouteProps) => {
  const { hasUser } = props;
  return <Navigate to={hasUser ? Routes.DISCUSSIONS_LISTING : Routes.HOME_PAGE} replace={true} />;
};

export default RedirectRoute;
