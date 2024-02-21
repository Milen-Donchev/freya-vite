import React, { useEffect } from 'react';

import { useLogout } from '@hooks/useLogout';

const LogoutPage = () => {
  const { logout } = useLogout();

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default LogoutPage;
