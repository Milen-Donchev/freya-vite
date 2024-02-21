import React from 'react';
import classNames from 'classnames';

import { useTranslation } from '@hooks/useTranslation';

interface DiscussionMembersAndOpinionsCountProps {
  membersCount?: number;
  opinionsCount?: number;
}

const DiscussionMembersAndOpinionsCount = (props: DiscussionMembersAndOpinionsCountProps) => {
  const { t } = useTranslation();
  const { membersCount = 0, opinionsCount = 0 } = props;

  return (
    <div className="d-flex align-items-center">
      {membersCount > 0 && (
        <div
          className={classNames({
            'border-end border-gray-300 border-3 pe-32': opinionsCount > 0
          })}>
          <span className="text-primary-600 fs-22 fw-bold">{membersCount}</span>
          <div className="text-gray-400 fs-14">{t('discussion.participants', 'Participants')}</div>
        </div>
      )}
      {opinionsCount > 0 && (
        <div
          className={classNames({
            'ps-32': membersCount > 0
          })}>
          <span className="text-primary-600 fs-22 fw-bold">{opinionsCount}</span>
          <div className="text-gray-400 fs-14">{t('discussion.opinions', 'Opinions')}</div>
        </div>
      )}
    </div>
  );
};

export default DiscussionMembersAndOpinionsCount;
