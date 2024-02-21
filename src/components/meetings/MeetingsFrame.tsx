import React from 'react';
import Skeleton from 'react-loading-skeleton';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import type { Meeting } from '@freya/types/meeting';
import ContentFrame from '@components/ui/frames/ContentFrame';
import MeetingCard from '@components/meetings/MeetingCard';

export interface MeetingsFrameProps {
  meetings: Meeting[];
  headerTitle: string;
  isFetching: boolean;
  pastMeetings?: boolean;
}

const MeetingsFrame = (props: MeetingsFrameProps) => {
  const { meetings, headerTitle, isFetching, pastMeetings = false } = props;

  return (
    <ContentFrame
      className="p-20 p-lg-40 mb-32"
      isLoading={isFetching}
      contentVisible={!isEmpty(meetings)}
      LoadingSkeleton={<MeetingsSkeleton />}
      Header={<p className="fs-24 fw-semibold">{headerTitle}</p>}
      children={
        <div
          className={`row row-cols-1 row-cols-lg-2 row-cols-xxl-3 g-20 ${
            pastMeetings ? 'opacity-50' : ''
          }`}
          data-testid="meetings-frame">
          {map(meetings, (meeting: Meeting, index: number) => (
            <div className="col" key={`col-${index}`}>
              <MeetingCard meeting={meeting} key={index} pastMeeting={pastMeetings} />
            </div>
          ))}
        </div>
      }
    />
  );
};

export default MeetingsFrame;

const MeetingsSkeleton = () => (
  <div className="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 g-20" data-testid="meetings-skeleton">
    <div className="col">
      <Skeleton containerClassName="width-100" height={350} borderRadius={12} />
    </div>
    <div className="col">
      <Skeleton containerClassName="width-100" height={350} borderRadius={12} />
    </div>
    <div className="col">
      <Skeleton containerClassName="width-100" height={350} borderRadius={12} />
    </div>
  </div>
);
