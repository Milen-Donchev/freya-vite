import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { useTranslation, type TFunction } from '@hooks/useTranslation';
import type { Reaction } from '@freya/types/comments';

interface ReactionsCounterProps {
  commentsCount: number;
  reactions: Reaction[];
}

const renderUsernameAndCount = (reactions: Reaction[], t: TFunction) => {
  if (reactions.length === 1) return reactions[0]?.profile?.title;
  if (reactions.length === 2)
    return `${reactions[0]?.profile?.title} ${t('comment.and_one_more', 'and 1 other')}`;
  else
    return `${reactions[0]?.profile?.title} ${t('common.and', 'and')} ${reactions.length - 1} ${t(
      'comments.others',
      'others'
    )}`;
};

const ReactionsCounter = (props: ReactionsCounterProps) => {
  const { commentsCount, reactions } = props;

  const { t } = useTranslation();

  const reactionsCount = reactions?.length;

  return (
    <div className="d-flex align-items-center justify-content-between my-12">
      <div className="d-flex align-items-center">
        {!isEmpty(reactions) && (
          <>
            <div className="d-flex justify-content-center align-items-center rounded-circle width-2 height-2 bg-primary">
              <i className="fa-solid fa-heart text-white fs-10" />
            </div>
            <div className="d-none d-sm-block fs-15 text-gray-300 ms-8">
              {renderUsernameAndCount(reactions, t)}
            </div>
            <div className="d-block d-sm-none fs-14 text-gray-300 ms-8">{reactionsCount}</div>
          </>
        )}
      </div>
      <div data-testid="show-comments-button" className="d-block fs-14 text-primary">
        {commentsCount === 1
          ? t('comment.single_comment', '1 comment')
          : `${commentsCount} ${t('comment.multiple_comments', 'comments')}`}
      </div>
    </div>
  );
};

export default ReactionsCounter;
