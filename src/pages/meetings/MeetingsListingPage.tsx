import React, { useState } from 'react';
import get from 'lodash/get';

import type { Meeting } from '@freya/types/meeting';
import { configGet } from '@freya/config';
import { useTranslation } from '@hooks/useTranslation';
import { useGetMeetingsQuery } from '@store/api/meetingApi';

import MeetingsFrame from '@components/meetings/MeetingsFrame';
import BasicPagination from '@components/ui/pagination/BasicPagination';

interface FilteredMeetings {
  futureMeetings: Meeting[];
  pastMeetings: Meeting[];
}

const MeetingsListingPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { endTimeBuffer } = configGet('meetingActiveBtnDurationInMin');

  const now = new Date();
  const todayStartDateTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    0,
    0
  ).getTime();

  const { t } = useTranslation();
  const { data, isFetching } = useGetMeetingsQuery({
    page: pageNumber
  });

  const meetings = data?.data;
  const meta = data?.meta;

  const filteredMeetings = meetings?.reduce(
    (acc: FilteredMeetings, meeting: Meeting) => {
      const endTime = new Date(meeting.end_date).getTime();
      const meetingEndTime = endTimeBuffer * 60 * 1000 + endTime;
      if (meetingEndTime >= todayStartDateTime) {
        acc.futureMeetings.push(meeting);
      } else {
        acc.pastMeetings.push(meeting);
      }
      return acc;
    },
    { futureMeetings: [], pastMeetings: [] } as FilteredMeetings
  );

  const onPageClick = (e: React.MouseEvent | React.KeyboardEvent, pageNumber: number) => {
    e.preventDefault();
    setPageNumber(pageNumber);
  };

  return (
    <div className="mb-28">
      {/* FUTURE MEETINGS LIST */}
      <MeetingsFrame
        isFetching={isFetching}
        meetings={get(filteredMeetings, 'futureMeetings', [])}
        headerTitle={t('meeting.incoming_meetings_title', 'Incoming Meetings')}
      />

      {/* PAST MEETINGS LIST */}
      <MeetingsFrame
        isFetching={isFetching}
        meetings={get(filteredMeetings, 'pastMeetings', [])}
        headerTitle={t('meeting.past_meetings_title', 'Past Meetings')}
        pastMeetings={true}
      />

      {/* PAGINATION */}
      {!isFetching && meta && meta.last_page && meta.last_page > 1 && (
        <div className="mt-28 d-flex justify-content-center">
          <BasicPagination meta={meta} clickHandler={onPageClick} />
        </div>
      )}
    </div>
  );
};

export default MeetingsListingPage;
