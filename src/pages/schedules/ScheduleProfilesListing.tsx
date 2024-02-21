import React, { useState } from 'react';
import map from 'lodash/map';
import get from 'lodash/get';
import fill from 'lodash/fill';
import isEmpty from 'lodash/isEmpty';
import Skeleton from 'react-loading-skeleton';

import type { Profile } from '@freya/types/profile';

import { useTranslation } from '@hooks/useTranslation';
import { useGetProfilesWithSchedulesQuery } from '@store/api/profileApi';

import ContentFrame from '@components/ui/frames/ContentFrame';
import BasicPagination from '@components/ui/pagination/BasicPagination';
import ScheduleProfileCard from '@components/schedules/ScheduleProfileCard';

const ScheduleProfilesListing = () => {
  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = useState<number>();
  const { data, isFetching } = useGetProfilesWithSchedulesQuery({ page: pageNumber });
  const meta = get(data, 'meta', {});

  const clickHandler = (
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => {
    event.preventDefault();
    setPageNumber(pageNumber);
  };

  return (
    <ContentFrame
      className="p-20 p-lg-40 mb-32"
      Header={<p className="fs-24 fw-semibold">{t('schedules.title', 'Choose a doctor')}</p>}
      isLoading={isFetching}
      contentVisible={data?.data && !isEmpty(data.data)}
      LoadingSkeleton={
        <div className="row row-cols-1 row-cols-xl-2 g-16">
          <ScheduleProfilesListingSkeleton count={5} />
        </div>
      }>
      <div className="row row-cols-1 row-cols-xl-2 g-16">
        {map(get(data, 'data'), (profile: Profile, id: string) => (
          <div key={id} className="col">
            <ScheduleProfileCard key={id} profile={profile} />
          </div>
        ))}
      </div>
      {meta.last_page > 1 && (
        <div className="mt-20">
          <BasicPagination clickHandler={clickHandler} meta={meta} />
        </div>
      )}
    </ContentFrame>
  );
};

const ScheduleProfilesListingSkeleton = ({ count }: { count: number }) => (
  <div className="row row-cols-1 row-cols-xl-2 g-16 width-100" data-testid="loader">
    {map(fill(Array(count), '.'), (_, index) => (
      <div className="col" key={String(index)}>
        <Skeleton height={90} borderRadius={12} />
      </div>
    ))}
  </div>
);

export default ScheduleProfilesListing;
