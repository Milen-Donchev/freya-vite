import React from 'react';

import { useHasPermissions } from '@freya/hooks/useHasPermissions';

interface CanProps {
  children: React.ReactNode;
  permissions?: string[];
}

const Can = ({ children, permissions }: CanProps) => {
  const { hasPermissions: checkHasPermissions, checkPermissionsIncludeSellable } =
    useHasPermissions();

  const hasPermissions = checkHasPermissions(permissions);
  const permissionsIncludeSellable = checkPermissionsIncludeSellable(permissions);

  return <>{(hasPermissions || permissionsIncludeSellable) && children}</>;
};

export default Can;
