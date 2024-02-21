import React, { memo } from 'react';

import UserInfoRow from '@components/user/UserInfoRow';
import UserFollowButton from '@components/user/UserFollowButton';

interface DiscussionParticipantProps {
  name: string;
  type?: string;
  image?: string;
  trailingButton?: 'icon' | 'icon-text';
  following?: boolean;
  className?: string;
  typeClassName?: string;
}

const DiscussionParticipant = (props: DiscussionParticipantProps) => {
  const { name, type, trailingButton, image, following, className, typeClassName } = props;

  return (
    <div
      className={`${
        className ?? ''
      } d-flex cursor-pointer align-items-center justify-content-between`}>
      <UserInfoRow name={name} subtext={type} image={image} subtextClassName={typeClassName} />
      {/* {!!trailingButton && <UserFollowButton following={!!following} type={trailingButton} />} */}
    </div>
  );
};

export default memo(DiscussionParticipant);
