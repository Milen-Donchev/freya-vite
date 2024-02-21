import React, { useEffect, useMemo, useState } from 'react';
import get from 'lodash/get';

import { Breakpoints } from '@models/Breakpoints';
import { ParticipantStatus } from '@models/Discussion';
import CommentsProvider from '@providers/CommentsProvider';
import { useDiscussion } from '@providers/DiscussionProvider';
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { useHasPermissions } from '@hooks/useHasPermissions';
import { checkIsDiscussionAdmin } from '@utils/discussions';

// import DiscussionFaq from '@components/discussions/DiscussionFaq';
import DiscussionResources from '@components/discussions/resources/DiscussionResources';
import DiscussionDescription from '@components/discussions/DiscussionDescription';
import DiscussionParticipants from '@components/discussions/DiscussionParticipants';
import DiscussionModerators from '@components/discussions/DiscussionModerators';
// import ImageBanner from '@components/discussions/ImageBanner';
import type { TabKeys } from '@components/ui/tabs/HorizontalTabs';
import CardFrame from '@components/ui/frames/CardFrame';
import CommentInput from '@components/discussions/comments/CommentInput';
import DiscussionComments from '@components/discussions/comments/DiscussionComments';
import HorizontalTabs from '@components/ui/tabs/HorizontalTabs';
import Can from '@components/can/Can';

const DiscussionTabs = () => {
  const { discussion } = useDiscussion();
  const { hasPermissions } = useHasPermissions();
  const participantType = get(discussion, 'participant.type', '');
  const isDiscussionAdmin = checkIsDiscussionAdmin(participantType);

  const COMMON_TABS = useMemo(
    () => [
      {
        id: 1,
        key: 'description',
        title: 'common.tabs_description',
        content: (
          <>
            <DiscussionDescription />
            {/* (START) Visible only under XXL breakpoint */}
            <DiscussionModerators className="d-block d-xxl-none" />
            {/* <ImageBanner
             src="https://www.airsoftgi.com/art/promo/airsoft-guns-lower-banner-3-on-sale.jpg"
             className="d-block d-xxl-none"
           /> */}
            {/* (END) Visible only under XXL breakpoint */}
            {!!discussion.participant &&
              discussion?.participant?.status === ParticipantStatus.JOINED && (
                <CommentsProvider>
                  <Can permissions={['create_comment']}>
                    <CardFrame className="p-28 mb-28">
                      <CommentInput />
                    </CardFrame>
                  </Can>
                  <Can permissions={['view_any_comment']}>
                    <DiscussionComments />
                  </Can>
                </CommentsProvider>
              )}
          </>
        )
      },
      {
        id: 2,
        key: 'resources',
        title: 'common.tabs_resources',
        content: <DiscussionResources />
      }
      // {
      //   id: 3,
      //   key: 'faq',
      //   title: 'common.tabs_faq',
      //   content: <DiscussionFaq />
      // },
    ],
    []
  );

  const PARTICIPANT_TABS = useMemo(
    () =>
      [
        ...COMMON_TABS,
        {
          id: 4,
          key: 'participants',
          title: 'common.tabs_participants',
          content: <DiscussionParticipants />
        }
      ] as const,
    [COMMON_TABS]
  );

  const [selectedTab, setSelectedTab] = useState<TabKeys<typeof PARTICIPANT_TABS>>('description');

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > Breakpoints.XXL && selectedTab === 'resources') {
      setSelectedTab('description');
    }
  }, [width]);

  return (
    <HorizontalTabs
      tabs={
        isDiscussionAdmin && hasPermissions(['view_any_participant'])
          ? PARTICIPANT_TABS
          : COMMON_TABS
      }
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      className="mt-32"
    />
  );
};

export default DiscussionTabs;
