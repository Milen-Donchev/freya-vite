import some from 'lodash/some';

import { GuestModules } from '@models/GuestModules';

import { useAppSelector } from '@store';
import { useGetDictionaryQuery } from '@store/api/configApi';

// Keys for guest unlocked modules, returned by the API and mapped to more usable values
const MODULE_CONFIG_KEYS_MAPPING = {
  'knowledge-center-visible-for-guests': GuestModules.KNOWLEDGE_CENTER,
  'profiles-visible-for-guests': GuestModules.PROFILES,
  'discussions-visible-for-guests': GuestModules.DISCUSSIONS,
  'book-appointment-available-for-guests': GuestModules.BOOK_APPOINTMENT,
  'products-visible-for-guests': GuestModules.PRODUCTS
} as const;

type ModuleApiKey = keyof typeof MODULE_CONFIG_KEYS_MAPPING;

export const useAuthStatus = () => {
  const tempJWT = useAppSelector((store) => store.tempAuthSlice.access_token);
  const isAuthenticated = useAppSelector((store) => store.authSlice.isRegistrationCompleted);

  const { data: dictionary } = useGetDictionaryQuery('');

  const adminConfig = dictionary?.configurations ?? [];

  const isGuestLoginAllowed = some(adminConfig, (option) => option.value === true);

  const guestAvailableModules = adminConfig.reduce((acc, val) => {
    if (val.value === true && val.key in MODULE_CONFIG_KEYS_MAPPING) {
      acc.push(MODULE_CONFIG_KEYS_MAPPING[val.key as ModuleApiKey]);
    }
    return acc;
  }, [] as GuestModules[]);

  return {
    tempJWT,
    isAuthenticated,
    isGuestLoginAllowed,
    guestAvailableModules,
    canVisitDiscussions:
      isAuthenticated ||
      (!isAuthenticated && guestAvailableModules.includes(GuestModules.DISCUSSIONS)),
    canVisitKnowledgeCenter:
      isAuthenticated ||
      (!isAuthenticated && guestAvailableModules.includes(GuestModules.KNOWLEDGE_CENTER)),
    canVisitProfileListingSchedules:
      isAuthenticated ||
      (!isAuthenticated && guestAvailableModules.includes(GuestModules.BOOK_APPOINTMENT)),
    // prettier-ignore
    // ^ helps better format this return statement
    canVisitProfiles:
      isAuthenticated || 
      (!isAuthenticated && guestAvailableModules.includes(GuestModules.PROFILES)),
    canVisitProducts:
      isAuthenticated || (!isAuthenticated && guestAvailableModules.includes(GuestModules.PRODUCTS))
  };
};
