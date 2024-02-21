import React from 'react';
import { Image } from 'react-bootstrap';

interface AvatarProps {
  size?: string;
  initials?: string | null;
  image?: string;
  showInitials?: boolean;
  className?: string;
}

const Avatar = (props: AvatarProps) => {
  const { initials, size = 'width-5 height-5', image, showInitials = false, className } = props;

  return (
    <>
      {showInitials || !image ? (
        <div
          className={`${
            className ?? ''
          } ${size} d-flex align-items-center justify-content-center bg-primary-300 rounded-circle flex-shrink-0 fw-semibold text-primary-700`}>
          {showInitials ? initials : <i className="fa-regular fa-user fs-18" />}
        </div>
      ) : (
        <Image src={image} roundedCircle className={`${size} object-fit-cover flex-shrink-0`} />
      )}
    </>
  );
};

export default Avatar;
