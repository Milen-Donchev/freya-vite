import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { TabKeys } from '../ui/tabs/HorizontalTabs';

import HorizontalTabs from '../ui/tabs/HorizontalTabs';
import ProfileInformation from './ProfileInformation';
import ProfileOrdersHistory from './ProfileOrdersHistory';
import ProfileAttachments from './ProfileAttachments';
// import ProfileSubscription from './ProfileSubscription';

interface ProfileTabsProps {
  profileId: number;
  isMyAccount: boolean;
}

const ProfileTabs = (props: ProfileTabsProps) => {
  const { profileId, isMyAccount } = props;
  const { hash } = useLocation();

  const TABS = useMemo(
    () =>
      [
        {
          id: 1,
          key: 'profile',
          title: 'common.tabs_profile_information',
          content: (
            <>
              <ProfileInformation profileId={profileId} isMyAccount={isMyAccount} />
              {/* P.1. Temporarily hide subscription card as it is not essential to the functionality. */}
              {/* {isMyAccount && <ProfileSubscription profileId={profileId} />} */}
              <ProfileAttachments profileId={profileId} isMyAccount={isMyAccount} />
            </>
          )
        },
        {
          id: 2,
          key: 'orders_history',
          title: 'common.tabs_profile_orders_history',
          content: <ProfileOrdersHistory />
        }
      ] as const,
    []
  );

  const [selectedTab, setSelectedTab] = useState<TabKeys<typeof TABS>>(
    hash ? (hash.replace('#', '') as TabKeys<typeof TABS>) : 'profile'
  );

  return <HorizontalTabs tabs={TABS} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />;
};

export default ProfileTabs;
