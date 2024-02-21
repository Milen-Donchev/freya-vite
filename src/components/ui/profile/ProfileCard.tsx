import React, { memo } from 'react';
import isObject from 'lodash/isObject';
import Skeleton from 'react-loading-skeleton';

import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import Avatar from '@components/ui/avatar/Avatar';

interface ProfileCardProps {
  image: string;
  title: string;
  titleSize?: string;
  className?: string;
  isLoading?: boolean;
  imageSize?: string;
  subTitle?: Record<string, string> | string;
  additionalInfo?: string | { [key: string]: string };
}

const ProfileCard = (props: ProfileCardProps) => {
  const {
    image,
    title,
    titleSize = 'fs-18',
    isLoading = false,
    imageSize = 'width-5 height-5',
    subTitle,
    className,
    additionalInfo
  } = props;
  const translate = useTranslatedAttribute();

  return (
    <>
      {isLoading ? (
        <ProfileCardSkeleton />
      ) : (
        <div className={`d-flex align-items-center ${className}`}>
          <Avatar size={imageSize} image={image} />
          <div>
            {additionalInfo && (
              <p className="mb-0 fs-14 text-quarterly-500 fw-semibold">
                {isObject(additionalInfo) ? translate(additionalInfo) : additionalInfo}
              </p>
            )}
            <p className={`${titleSize} fw-semibold mb-0`}>{title}</p>
            {subTitle && (
              <p className="fs-14 mb-0">{isObject(subTitle) ? translate(subTitle) : subTitle}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const ProfileCardSkeleton = () => (
  <div data-testid="loader">
    <div className="d-flex gap-20 width-100">
      <Skeleton height={160} width={160} borderRadius={100} className="mb-12" />
      <div className="d-flex flex-column justify-content-center">
        <Skeleton height={35} width={160} className="mb-12" />
        <Skeleton height={25} width={125} className="mb-12" />
      </div>
    </div>
  </div>
);

export default memo(ProfileCard);
