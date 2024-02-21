import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import fill from 'lodash/fill';
import React, { useState } from 'react';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import type { DiscussionParticipant as TDiscussionParticipant } from '@types';

import { Breakpoints } from '@models/Breakpoints';
import { useGetParticipantsQuery } from '@store/api/discussionApi';

import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import CardFrame from '@components/ui/frames/CardFrame';
import SearchField from '@components/fields/SearchField';
import DiscussionParticipant from './DiscussionParticipant';
import NoResults from '@components/layouts/no-results/NoResults';
import BasicPagination from '@components/ui/pagination/BasicPagination';

const DiscussionParticipants = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const translate = useTranslatedAttribute();

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useGetParticipantsQuery({
    id: id!,
    params: { page: String(currentPage), search: searchValue }
  });

  const participants = data?.data;
  const meta = data?.meta;

  const isViewportMedium = width <= Breakpoints.MD;

  const onPageClick = (e: any, pageNumber: number) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
    if (value) setCurrentPage(1);
  };

  const handleParticipantClick = (profileId: number, slug: string) => {
    navigate(`/profile/${profileId}/${slug}`);
  };

  return (
    <div className="mb-20">
      <CardFrame className="p-28">
        {/* TAB HEADER */}
        <div className="d-flex gap-20 gap-md-0 flex-md-row flex-column justify-content-between align-items-md-center mb-28">
          <div className="fs-24 fw-semibold">{t('discussion.participants', 'Participants')}</div>
          <SearchField onSearch={onSearch} />
        </div>

        {/* LOADER */}
        {isFetching && <DiscussionParticipantsSkeleton count={3} />}

        {/* EMPTY PARTICIPANTS LISTING */}
        {!isFetching &&
          (isUndefined(participants) || (isArray(participants) && isEmpty(participants))) && (
            <NoResults message={t('common.no_results', 'There is no result.')} />
          )}

        {/* PARTICIPANTS LIST */}
        {!isFetching &&
          participants &&
          map(
            participants,
            (
              { id, title, type_title, profile_id, image, email, slug }: TDiscussionParticipant,
              index: number
            ) => (
              <div onClick={() => handleParticipantClick(profile_id, slug)} key={id}>
                <DiscussionParticipant
                  image={image?.thumb ?? image?.source}
                  name={!isEmpty(title) ? title : email}
                  {...(type_title && { type: translate(type_title) })}
                  trailingButton={isViewportMedium ? 'icon' : 'icon-text'}
                  typeClassName="text-success-400 fs-14"
                />
                {participants.length - 1 !== index && <Separator />}
              </div>
            )
          )}

        {/* PAGINATION */}
        {!isFetching && meta && (
          <div className="mt-28 d-fled justify-content-center">
            <BasicPagination meta={meta} clickHandler={onPageClick} />
          </div>
        )}
      </CardFrame>
    </div>
  );
};

export default DiscussionParticipants;

const Separator = () => <hr className="my-24 text-gray-400" />;

const DiscussionParticipantsSkeleton = ({ count }: { count: number }) => (
  <>
    {map(fill(Array(count), '.'), (_, index) => (
      <div key={String(index)}>
        <div className="d-flex align-items-center">
          <Skeleton circle width={50} height={50} className="me-8" />
          <Skeleton height={50} containerClassName="flex-fill" borderRadius={12} />
        </div>
        {count - 1 !== index && <Separator />}
      </div>
    ))}
  </>
);
