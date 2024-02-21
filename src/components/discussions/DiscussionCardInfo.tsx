import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import get from 'lodash/get';
import classNames from 'classnames';

import { getImage } from '@utils/helpers';
import { DiscussionParticipantType } from '@models/Discussion';
import DiscussionJoinButton from '@components/discussions/DiscussionJoinButton';
import DiscussionParticipant from '@components/discussions/DiscussionParticipant';
import DiscussionMembersAndOpinionsCount from '@components/discussions/DiscussionMembersAndOpinionsCount';

import { useDiscussion } from '@providers/DiscussionProvider';

import { discussionCardInfoWrapper } from './discussions.scss';

const DiscussionCardInfo = () => {
  const navigate = useNavigate();
  const { discussion } = useDiscussion();
  const isCreator = get(discussion, 'participant.type', '') === DiscussionParticipantType.CREATOR;
  const discussionAuthor = get(discussion, 'profile');

  const handleParticipantClick = () => {
    const profileId = get(discussionAuthor, 'id', 0);
    const slug = get(discussionAuthor, 'slug', '');

    navigate(`/profile/${profileId}/${slug}`);
  };

  return (
    <div className={classNames('p-28', discussionCardInfoWrapper)}>
      {/* AUTHOR INFO */}
      <div onClick={handleParticipantClick}>
        <DiscussionParticipant
          name={get(discussionAuthor, 'title', '')}
          image={discussionAuthor?.image ? getImage(discussionAuthor.image, 'thumb') : ''}
        />
      </div>

      {/* TITLE */}
      <div className="fw-bold fs-24 mt-24">{discussion.title}</div>

      {/* MEMBERS AND OPINIONS */}
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between flex-wrap mt-24 gap-24">
        <div className="width-100 width-md-auto">{!isCreator && <DiscussionJoinButton />}</div>
        {(discussion.comments_count > 0 || discussion.participants_count > 0) && (
          <DiscussionMembersAndOpinionsCount
            opinionsCount={discussion.comments_count}
            membersCount={discussion.participants_count}
          />
        )}
      </div>
    </div>
  );
};

export default memo(DiscussionCardInfo);
