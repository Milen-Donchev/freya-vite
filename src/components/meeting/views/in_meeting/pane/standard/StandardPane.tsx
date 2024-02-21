import React from 'react';
import StandardGrid from './grid/Grid';
import StandardRemoteVideos from './remote_videos/RemoteVideos';
import StandardName from './attributes/StandardName';
import ContentShare from './content_share/ContentShare';

export default () => (
  <StandardGrid>
    <StandardRemoteVideos />
    <ContentShare />
    <StandardName />
  </StandardGrid>
);
