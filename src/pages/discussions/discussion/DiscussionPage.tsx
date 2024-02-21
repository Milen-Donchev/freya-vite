import React from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import type { Discussion } from '@freya/types';

import { useGetDiscussion } from '@store/api/discussionApi';
import { DiscussionProvider } from '@freya/providers/DiscussionProvider';

import DiscussionView from '@components/discussions/DiscussionView';
import DiscussionRightContent from '@components/discussions/DiscussionRightContent';

const DiscussionPage = () => {
  const params = useParams();

  const { data: discussion, isFetching } = useGetDiscussion(params.id as string);

  return (
    <div>
      {isFetching && <DiscussionPageSkeleton />}
      {!isFetching && (
        <DiscussionProvider discussion={discussion as Discussion}>
          <div className="row">
            <div className="col-12 col-xxl-8">
              <DiscussionView discussion={discussion!} />
            </div>
            {/* Only visible after "xl" breakpoint */}
            <div className="d-none d-xxl-block col-12 col-xl-4">
              <DiscussionRightContent />
            </div>
          </div>
        </DiscussionProvider>
      )}
    </div>
  );
};

export default DiscussionPage;

const DiscussionPageSkeleton = () => (
  <div className="row g-24">
    <div className="col-12 col-xxl-8">
      <Skeleton baseColor="white" height={400} borderRadius={12} className="mb-36" />
      <div className="d-flex mb-20">
        <Skeleton baseColor="white" width={150} height={40} borderRadius={100} className="me-16" />
        <Skeleton baseColor="white" width={150} height={40} borderRadius={100} />
      </div>
      <Skeleton baseColor="white" height={450} borderRadius={12} className="mb-20" />
    </div>
    <div className="col-12 col-xxl-4">
      <Skeleton baseColor="white" height={150} borderRadius={12} className="mb-20" />
      <Skeleton baseColor="white" height={250} borderRadius={12} className="mb-20" />
    </div>
  </div>
);
