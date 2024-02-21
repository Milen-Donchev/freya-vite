import React, { memo } from 'react';
import ReactPlayer from 'react-player/lazy';

import { videoWrapper, video } from './video.scss';

interface VideoProps {
  videoSource: string;
  title?: string;
}

const Video = (props: VideoProps) => {
  const { videoSource, title } = props;

  return (
    <>
      {title && <div className="fw-bold py-24 fs-18">{title}</div>}
      <div className={`position-relative ${videoWrapper}`} data-testid="video-player">
        <ReactPlayer url={videoSource} controls width="100%" height="100%" className={video} />
      </div>
    </>
  );
};

export default memo(Video);
