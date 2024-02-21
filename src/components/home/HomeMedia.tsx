import React from 'react';

import type { HomeMediaSection } from '@types';

import TitleAndDescription from './TitleAndDescription';
import Video from '@components/video/Video';

interface MediaComponentProps {
  data: HomeMediaSection;
}

const HomeMedia = (props: MediaComponentProps) => {
  const { data } = props;
  const { media, colors, title, description } = data;
  const { alignment, source } = media;

  const titleOrderClass = alignment === 'left' ? 'order-lg-1' : 'order-lg-2';
  const mediaOrderClass = alignment === 'left' ? 'order-lg-2' : 'order-lg-1';

  return (
    <>
      <section className={`py-48 position-relative overflow-hidden bg-${colors.background}`}>
        {media.backgroundImage && (
          <img
            className="d-none d-lg-block position-absolute z-0 top-50 start-50 translate-middle height-90"
            src={media.backgroundImage}
            alt="bg_img"
          />
        )}
        <div className="container position-relative z-1">
          <div className="row g-28 g-lg-48 align-items-center justify-content-center">
            <div
              className={`col-12 col-lg-5 ${titleOrderClass}`}
              data-testid="media-title-and-description">
              <TitleAndDescription title={title} description={description} colors={colors} />
            </div>
            <div
              className={`col-12 col-lg-5 ${mediaOrderClass}`}
              data-testid="media-image-or-video">
              {media.type === 'image' && <img className="img-fluid" src={source} alt="media_alt" />}
              {media.type === 'video' && <Video videoSource={source} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeMedia;
