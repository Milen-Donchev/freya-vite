import React from 'react';
import { useNavigate } from 'react-router-dom';
import map from 'lodash/map';

import { useTranslation } from '@hooks/useTranslation';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';
import { useDiscussion } from '@freya/providers/DiscussionProvider';
import { getImage } from '@freya/utils/helpers';

import CardFrame from '../ui/frames/CardFrame';
import DiscussionParticipant from './DiscussionParticipant';

interface DiscussionModeratorsProps {
  showIcon?: boolean;
  className?: string;
}

const DiscussionModerators = (props: DiscussionModeratorsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const translate = useTranslatedAttribute();
  const { discussion } = useDiscussion();
  const { showIcon = false, className } = props;

  const handleParticipantClick = (profileId: number, slug: string) => {
    navigate(`/profile/${profileId}/${slug}`);
  };

  return (
    <div className={className}>
      <CardFrame className="p-28 mb-28">
        <div className="fw-semibold fs-24 mb-24">{t('discussion.moderators', 'Moderators')}</div>
        <div className="row row-cols-1 row-cols-md-auto row-cols-xxl-1 g-20 g-md-32 g-xxl-20">
          {map(
            discussion.moderators,
            ({ id, image, title, type_title, profile_id, slug, isFollowing }, index) => (
              <div key={id} onClick={() => handleParticipantClick(profile_id, slug)}>
                <DiscussionParticipant
                  key={id}
                  image={getImage(image, 'thumb')}
                  name={title}
                  type={translate(type_title)}
                  following={isFollowing}
                  className="col"
                  typeClassName="text-success-400 fs-14"
                  {...(showIcon && { trailingButton: 'icon' })}
                />
                {index < discussion.moderators.length - 1 && (
                  <hr className="d-md-none d-xxl-block text-gray-400 mb-0 mt-20" />
                )}
              </div>
            )
          )}
        </div>
      </CardFrame>
    </div>
  );
};

export default DiscussionModerators;
