import map from 'lodash/map';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import fill from 'lodash/fill';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useTranslation } from '@hooks/useTranslation';
import type { DiscussionListData } from '@types';
import { useGetDiscussions } from '@store/api/discussionApi';

import CardFrame from '@components/ui/frames/CardFrame';
import SearchField from '@freya/components/fields/SearchField';
import NoResults from '@components/layouts/no-results/NoResults';
import BasicPagination from '@components/ui/pagination/BasicPagination';
import DiscussionsListingCard from '@components/discussions/DiscussionsListingCard';

const DiscussionsListingPage = () => {
  const { t } = useTranslation();

  const [pageNumber, setPageNumber] = useState<number>();
  const [searchByTitleField, setSearchByTitleField] = useState<string>('');

  const { data, isLoading } = useGetDiscussions({
    page: pageNumber,
    title: searchByTitleField
  });

  const discussion = data ? data.data : [];

  const filteredDiscussions = filter(discussion, (discussion: DiscussionListData) => {
    return discussion.title.toLowerCase().includes(searchByTitleField);
  });

  const renderSpinner = () => {
    return <DiscussionsListingSkeleton count={5} />;
  };

  const renderDiscussionsList = () => {
    if (filteredDiscussions && !isEmpty(filteredDiscussions)) {
      return map(filteredDiscussions, (discussion: DiscussionListData) => {
        return <DiscussionsListingCard discussion={discussion} key={discussion.id} />;
      });
    } else {
      const message =
        isEmpty(discussion) && searchByTitleField === ''
          ? t('discussion.no_results', 'There are no groups.')
          : t('common.no_results', 'There is no result.');

      return isLoading ? (
        renderSpinner()
      ) : (
        <NoResults
          message={message}
          className="mb-36"
          showButton={isEmpty(discussion) && searchByTitleField === ''}
        />
      );
    }
  };

  const clickHandler = (
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => {
    event.preventDefault();
    setPageNumber(pageNumber);
  };

  const emptyDiscussionListClass = isEmpty(discussion)
    ? 'bg-primary-100 bg-sm-white shadow-sm border-0 p-0'
    : '';

  return (
    <div>
      <CardFrame className={`mb-32 p-20 p-lg-40 shadow-sm ${emptyDiscussionListClass}`}>
        <div className="row mb-36 px-16">
          <div className="col-12 col-md-6 col-lg-4 p-0">
            <p className="fs-24 fw-semibold">{t('discussion.groups', 'Groups')}</p>
          </div>
          <div className="col-12 col-md-6 col-lg-4 p-0">
            <SearchField
              onSearch={(title: string) => {
                setPageNumber(0); // reset pages when searching
                setSearchByTitleField(title);
              }}
            />
          </div>
        </div>
        {isLoading ? renderSpinner() : renderDiscussionsList()}
        {data?.meta.last_page > 1 && (
          <BasicPagination clickHandler={clickHandler} meta={data?.meta} />
        )}
      </CardFrame>
    </div>
  );
};

export default DiscussionsListingPage;

const DiscussionsListingSkeleton = ({ count }: { count: number }) => (
  <div data-testid="loader">
    {map(fill(Array(count), '.'), (_, index) => (
      <div key={String(index)} className="d-flex">
        <Skeleton height={120} containerClassName="flex-fill" borderRadius={12} className="mb-12" />
      </div>
    ))}
  </div>
);
