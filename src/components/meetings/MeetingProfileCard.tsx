import React, { memo } from 'react';
import Avatar from '@components/ui/avatar/Avatar';

interface MeetingProfileCardProps {
  image: string;
  title: string;
  meeting_type: string;
  meeting_type_color?: string;
  subTitle?: string;
  className?: string;
  imageSize?: string;
}

const MeetingProfileCard = (props: MeetingProfileCardProps) => {
  const {
    image,
    title,
    imageSize = 'width-16 height-16',
    subTitle,
    meeting_type,
    meeting_type_color = 'text-gray-400',
    className
  } = props;

  return (
    <div className={className}>
      <div className="d-flex align-items-center gap-16">
        <Avatar size={imageSize} image={image} />
        <div>
          <p className={`fs-18 fw-bold mb-0 ${meeting_type_color}`}>{meeting_type}</p>
          <p className="fs-18 fw-bold mb-0">{title}</p>
          {subTitle && <p className="fs-14 text-gray-400 mb-0">{subTitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default memo(MeetingProfileCard);
