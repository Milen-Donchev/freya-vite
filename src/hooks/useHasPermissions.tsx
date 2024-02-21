import { useCallback, useMemo } from 'react';
import get from 'lodash/get';
import some from 'lodash/some';
import union from 'lodash/union';
import isEmpty from 'lodash/isEmpty';
import flatMap from 'lodash/flatMap';
import difference from 'lodash/difference';
import intersection from 'lodash/intersection';

import { useAppSelector } from '@store/index';
import { useGetCurrentUserQuery } from '@store/api/userApi';
import { useGetDictionaryQuery } from '@store/api/configApi';

export const useHasPermissions = () => {
  const currentUser = useAppSelector((store: any) => store.currentUserSlice.currentUser);
  const { data: user } = currentUser ? useGetCurrentUserQuery({}) : { data: {} };
  const { data: dictionary } = useGetDictionaryQuery('');

  const allPermissions = useMemo(
    () =>
      union(
        get(user, 'data.permissions', []),
        flatMap(get(user, 'data.roles', []), (role) => role.permissions)
      ),
    [user]
  );

  // Check if user has ALL required permissions
  const hasPermissions = useCallback(
    (permissions: string[] = []) => {
      return isEmpty(difference(permissions, allPermissions));
    },
    [allPermissions]
  );

  // Check if user has at least ONE of the required permissions
  const hasOneOfPermissions = useCallback(
    (permissions: string[]) => {
      return !isEmpty(intersection(permissions, allPermissions));
    },
    [allPermissions]
  );

  // Check if permission is sellable
  const isPermissionSellable = useCallback((permission: string) => {
    const sellablePermissions = get(dictionary, 'sellable_permissions', [] as string[]);
    return sellablePermissions.includes(permission);
  }, []);

  /**
   * Check if a list of permissions has any that are sellable
   * (Used in Can.tsx to determine if children should be shown regardless of the user not having a permission - because they can be purchased)
   */
  const checkPermissionsIncludeSellable = useCallback(
    (permissions: string[] = []) => {
      return some(permissions, (permission) => isPermissionSellable(permission));
    },
    [isPermissionSellable]
  );

  return {
    hasPermissions,
    hasOneOfPermissions,
    isPermissionSellable,
    checkPermissionsIncludeSellable
  };
};
