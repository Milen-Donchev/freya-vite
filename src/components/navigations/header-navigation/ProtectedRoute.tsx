import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { useAppSelector } from '@store/index';
import { resetOriginRoute, setOriginRoute } from '@store/navigationSlice';

interface ProtectedRouteProps {
  condition: boolean;
  children?: JSX.Element;
  redirectPath?: string;
  shouldSaveRedirectRoute?: boolean;
  shouldCheckOriginRoute?: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const {
    condition,
    children,
    redirectPath = Routes.LOGIN,
    shouldSaveRedirectRoute,
    shouldCheckOriginRoute
  } = props;

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const originRoute = useAppSelector((state) => state.navigationSlice.originRoute);

  const redirectTo = shouldCheckOriginRoute && originRoute ? originRoute : redirectPath;

  useEffect(() => {
    if (!condition && shouldSaveRedirectRoute && location.pathname !== Routes.LOGOUT) {
      dispatch(setOriginRoute(location));
    }
  }, [condition]);

  useEffect(() => {
    if (!condition) {
      navigate(redirectTo, { replace: true });
      if (shouldCheckOriginRoute) {
        dispatch(resetOriginRoute());
      }
    }
  }, [condition, shouldCheckOriginRoute]);

  return condition ? children ?? <Outlet /> : null;
};

export default ProtectedRoute;
