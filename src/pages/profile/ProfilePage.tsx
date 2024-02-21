import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProfileTabs from '@freya/components/profile/ProfileTabs';
import ProfileInformation from '@freya/components/profile/ProfileInformation';
import ProfileAttachments from '@freya/components/profile/ProfileAttachments';

const ProfilePage = () => {
  const { profileId } = useParams();
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);
  const isMyAccount = currentUser?.id === Number(profileId);

  return isMyAccount ? (
    <ProfileTabs profileId={Number(profileId)} isMyAccount={isMyAccount} />
  ) : (
    <>
      <ProfileInformation profileId={Number(profileId)} isMyAccount={isMyAccount} />
      <ProfileAttachments profileId={Number(profileId)} isMyAccount={isMyAccount} />
    </>
  );
};

export default ProfilePage;
