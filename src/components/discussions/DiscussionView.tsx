import React from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import { type Discussion } from '@types';
import { ParticipantStatus } from '@models/Discussion';
import { useTranslation } from '@hooks/useTranslation';

import CardFrame from '@components/ui/frames/CardFrame';
import DiscussionTabs from '@components/discussions/DiscussionTabs';
import DiscussionCardInfo from '@components/discussions/DiscussionCardInfo';
import DiscussionCardCoverImage from '@components/discussions/DiscussionCardCoverImage';
import InlineMessage from '@components/ui/toast-message/InlineMessage';

interface DiscussionViewProps {
  discussion: Discussion;
}

const DiscussionView = (props: DiscussionViewProps) => {
  const { t } = useTranslation();
  const { discussion } = props;
  const currentStatus = get(discussion, 'participant.status', '');

  const hasPendingPayment = !!discussion?.is_sellable && !!discussion?.has_pending_order;

  return (
    <>
      {!hasPendingPayment && isEqual(currentStatus, ParticipantStatus.PENDING) && (
        <div className="mb-24">
          <InlineMessage
            type="warning"
            message={t('discussion.status_pending_description', 'Pending description')}
          />
        </div>
      )}
      {isEqual(currentStatus, ParticipantStatus.REJECTED) && (
        <div className="mb-24">
          <InlineMessage
            type="danger"
            message={t('discussion.status_rejected_description', 'Rejected description')}
          />
        </div>
      )}
      {hasPendingPayment && (
        <div className="mb-24">
          <InlineMessage
            type="warning"
            message={t(
              'discussion.status_pending_payment',
              'Your payment is pending. You will be notified per email, when it is processed.'
            )}
          />
        </div>
      )}
      <CardFrame className="overflow-hidden">
        <DiscussionCardCoverImage coverImage={discussion?.cover_image} />
        <DiscussionCardInfo />
      </CardFrame>
      <DiscussionTabs />
    </>
  );
};

export default DiscussionView;
