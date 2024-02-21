import React from 'react';
import classNames from 'classnames';

import { userFollowButton } from './user.scss';
import { useTranslation } from '@hooks/useTranslation';

interface UserFollowButtonProps {
  following: boolean;
  type?: 'icon' | 'icon-text';
}

const UserFollowButton = (props: UserFollowButtonProps) => {
  const { t } = useTranslation();
  const { following, type = 'icon' } = props;

  const toggleFollowUser = () => {};

  return (
    <button
      onClick={toggleFollowUser}
      data-testid="discussion-participant-follow-button"
      className={classNames('btn flex-shrink-0 ms-20 btn-lg', userFollowButton, {
        'btn-icon fs-16': type === 'icon',
        'btn-primary': following,
        'btn-outline-primary': !following
      })}>
      <i
        className={classNames('fa-light', {
          'me-8': type === 'icon-text',
          'fa-user-plus': !following,
          'fa-user-check': following
        })}
      />
      {type === 'icon-text' &&
        (following ? t('common.following', 'Following') : t('common.follow', 'Follow'))}
    </button>
  );
};

export default UserFollowButton;
