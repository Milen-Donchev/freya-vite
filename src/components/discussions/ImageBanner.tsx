import React, { memo } from 'react';
import { Image } from 'react-bootstrap';

import { CardFrame } from '@components';

interface ImageBannerProps {
  src: string;
  className?: string;
}

const ImageBanner = (props: ImageBannerProps) => {
  const { src, className } = props;

  return (
    <div className={`mb-20 ${className}`}>
      <CardFrame>
        <Image src={src} className="rounded-3" />
      </CardFrame>
    </div>
  );
};

export default memo(ImageBanner);
