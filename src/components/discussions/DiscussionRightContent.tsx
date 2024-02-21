import React from 'react';

// import ImageBanner from './ImageBanner';
import DiscussionModerators from './DiscussionModerators';
import DiscussionResources from './resources/DiscussionResources';

const DiscussionRightContent = () => {
  return (
    <>
      <DiscussionModerators />
      <DiscussionResources />
      {/* <ImageBanner
        src={'https://www.airsoftgi.com/art/promo/airsoft-guns-lower-banner-3-on-sale.jpg'}
        className="d-none d-xl-block"
      /> */}
    </>
  );
};

export default DiscussionRightContent;
