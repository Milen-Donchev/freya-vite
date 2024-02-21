import React, { useState } from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import fill from 'lodash/fill';
import isEmpty from 'lodash/isEmpty';
import Skeleton from 'react-loading-skeleton';

import type { Profile } from '@freya/types/profile';
import { useTranslation } from '@freya/hooks/useTranslation';
import { useGetAllProfilesQuery } from '@freya/store/api/profileApi';

import BasicPagination from '@components/ui/pagination/BasicPagination';
import ProfileListingCard from '@components/profile/ProfileListingCard';
import ContentFrame from '@components/ui/frames/ContentFrame';
import ProfileTypesSelect from '@components/profile/ProfileTypesSelect';

const ProfilesListingPage = () => {
  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = useState<number>();
  const [profileTypeFilterId, setProfileTypeFilter] = useState<number | null>(null);

  const { data: data, isFetching } = useGetAllProfilesQuery({
    page: pageNumber,
    profileTypeId: profileTypeFilterId
  });

  const profiles = get(data, 'data', []);
  const meta = get(data, 'meta', {});

  const clickHandler = (
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => {
    event.preventDefault();
    setPageNumber(pageNumber);
  };

  return (
    <div>
      <ContentFrame
        className="mb-32 p-20 p-lg-40 shadow-sm"
        isLoading={isFetching}
        contentVisible={!isEmpty(profiles)}
        LoadingSkeleton={<ProfilesListingSkeleton count={5} />}
        Header={
          <div className="d-flex justify-content-between flex-wrap mb-40 gap-20">
            <p className="fs-24 fw-semibold mb-0">{t('profile.title', 'Profiles')}</p>
            <div className="width-100 width-lg-24">
              <ProfileTypesSelect
                filterProfilesByType={(profileTypeId: number | null) => {
                  setProfileTypeFilter(profileTypeId);
                  setPageNumber(1);
                }}
                selectedProfileTypeId={profileTypeFilterId}
              />
            </div>
          </div>
        }
        children={
          <>
            <div className="d-flex flex-column gap-16 mb-20">
              {map(profiles, (profile: Profile, id) => (
                <ProfileListingCard key={id} profile={profile} />
              ))}
            </div>
            <div className="mt-12">
              {meta.last_page > 1 && <BasicPagination clickHandler={clickHandler} meta={meta} />}
            </div>
          </>
        }
      />
    </div>
  );
};

export default ProfilesListingPage;

const ProfilesListingSkeleton = ({ count }: { count: number }) => (
  <div data-testid="loader">
    {map(fill(Array(count), '.'), (_, index) => (
      <div className="d-flex" key={String(index)}>
        <Skeleton height={90} containerClassName="flex-fill" borderRadius={12} className="mb-12" />
      </div>
    ))}
  </div>
);
