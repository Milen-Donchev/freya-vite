import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { bg } from 'date-fns/locale';
import map from 'lodash/map';
import get from 'lodash/get';
import slice from 'lodash/slice';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { addDays, eachDayOfInterval, format, isToday, isSameDay, parseISO } from 'date-fns';

import type { CreateMeetingProps, Slot } from '@types';

import { useAppSelector } from '@store';
import { Breakpoints } from '@models/Breakpoints';
import { useTranslation } from '@hooks/useTranslation';
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { useGetProfileSchedulesQuery } from '@store/api/profileApi';
import { useDisableBrowserBackButton } from '@hooks/useDisableBrowserBackButton';

import CalendarHeader from '@components/schedules/CalendarHeader';
import TimeSlotButton from '@components/schedules/TimeSlotButton';
import AvailabilityInfo from '@components/schedules/AvailabilityInfo';
import InlineMessage from '@components/ui/toast-message/InlineMessage';
import DateTimePicker from '@components/ui/date-time-picker/DateTimePicker';

import { scheduleWrapper } from '@components/schedules/ScheduleCalendar.scss';

type Schedule = {
  date: string;
  type: string;
  slots: [];
};

const calculateDays = (width: number) => {
  if (width < Breakpoints.LG) return 1;
  if (width < Breakpoints.XXL) return 2;
  return 3;
};

const numberOfDays = 10;

const getDatesInRange = (startDate: Date, endDate: Date) => {
  const datesInRange = eachDayOfInterval({ start: startDate, end: endDate });

  return map(datesInRange, (date) => {
    const month = format(date, 'MMM', { locale: bg });
    const weekDay = format(date, 'EEE', { locale: bg });

    return {
      fullDate: date,
      month,
      weekDay: weekDay,
      dayOfMonth: date.getDate()
    } as ViewDaysProps;
  });
};

interface ViewDaysProps {
  fullDate: Date;
  month: string;
  weekDay: string;
  dayOfMonth: number;
  schedule?: Schedule;
}

interface ScheduleCalendarProps {
  profile_id: number;
  meeting: CreateMeetingProps | undefined;
  setMeeting: React.Dispatch<React.SetStateAction<CreateMeetingProps | undefined>>;
}

const ScheduleCalendar = (props: ScheduleCalendarProps) => {
  const { profile_id, meeting, setMeeting } = props;
  const currentUser = useAppSelector((store) => store.currentUserSlice.currentUser);
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const days = calculateDays(width);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(startDate, numberOfDays - 1));
  const [selectedSlot, setSelectedSlot] = useState('');
  const [viewDays, setViewDays] = useState<ViewDaysProps[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(days);
  const [isFutureDateSelected, setIsFutureDateSelected] = useState<boolean>(false);
  const [showMoreButtonState, setShowMoreButtonState] = useState<boolean>(false);
  const [initialSlotState, setInitialSlotState] = useState<{
    nextNDaysEmpty: boolean;
    allSlotsEmpty: boolean;
  }>();

  const slicedViewDays = useMemo(
    () => slice(viewDays, startIndex, endIndex),
    [viewDays, startIndex, endIndex]
  );
  const initialSchedule = slicedViewDays[0] || {};

  const hasMoreThan10SlotsInSchedule = useMemo(() => {
    return slicedViewDays.some((day) => day?.schedule && day?.schedule?.slots?.length > 10);
  }, [slicedViewDays]);

  const showEarliestHour = initialSlotState?.allSlotsEmpty || initialSlotState?.nextNDaysEmpty;

  useDisableBrowserBackButton();

  const { data, isFetching } = useGetProfileSchedulesQuery({
    id: Number(profile_id),
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString()
  });

  const handleRequestNextDays = () => {
    const nextStart = addDays(startDate, numberOfDays);
    const nextEnd = addDays(nextStart, numberOfDays - 1);

    setStartDate(nextStart);
    setEndDate(nextEnd);

    setStartIndex(viewDays.length);
    setEndIndex(viewDays.length + days);
  };

  const handleGetNextDay = () => {
    if (endIndex < viewDays.length) {
      setStartIndex((prev) => ++prev);
      setEndIndex((prev) => ++prev);
    } else {
      handleRequestNextDays();
    }
  };

  const handleGetPreviousDay = () => {
    if (startIndex === 0) return;

    setStartIndex((prev) => --prev);
    setEndIndex((prev) => --prev);
  };

  const getSlotsByDate = (date: Date) => {
    if (!isFetching) {
      return data?.schedule.find((item: Schedule) =>
        isSameDay(parseISO(item.date), date)
      ) as Schedule;
    }
  };

  const fetchSchedules = useCallback(
    (start_date: Date, end_date: Date) => {
      const dates = getDatesInRange(start_date, end_date);

      const datesWithSchedules = dates.map((date) => {
        let schedule = undefined;

        if (data) {
          const fetchedSchedule = getSlotsByDate(date.fullDate);

          if (fetchedSchedule) {
            schedule = fetchedSchedule;
          }
        }

        return { ...date, schedule: schedule };
      });

      const updatedViewDays = [...viewDays, ...datesWithSchedules];

      if (isFutureDateSelected) {
        setViewDays([...datesWithSchedules]);
        setStartIndex(0);
        setEndIndex(days);
        setIsFutureDateSelected(false);
        return;
      }

      setViewDays(updatedViewDays);

      // Check for the next N days being empty.
      const nextNDaysHaveEmptySlots = updatedViewDays
        .slice(0, days)
        .every((day) => !day.schedule || isEmpty(day.schedule.slots));

      const allSlotsEmpty = updatedViewDays.every(
        (day) => !day.schedule || isEmpty(day.schedule.slots)
      );

      return { nextNDaysEmpty: nextNDaysHaveEmptySlots, allSlotsEmpty: allSlotsEmpty };
    },
    [data]
  );

  const handleStartDateChange = useCallback((date: Date) => {
    setStartDate(date);
    setEndDate(addDays(date, numberOfDays - 1));
    setIsFutureDateSelected(true);
  }, []);

  const toggleShowMoreButtonState = () => {
    setShowMoreButtonState((prev) => !prev);
  };

  useEffect(() => {
    if (!isFetching) {
      const initialSlotStateData = fetchSchedules(startDate, endDate);
      setInitialSlotState(initialSlotStateData);
    }
  }, [isFetching, startDate, endDate, fetchSchedules]);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center border border-primary-300 rounded-4 pt-12 pb-12 position-relative">
        <div className="d-flex justify-content-end width-100 pe-12 pb-12">
          <DateTimePicker
            mode="date"
            showCustomInput
            customInputTitle={t('schedules.choose_another_date', 'Choose another date')}
            startDate={startDate}
            setStartDate={handleStartDateChange}
          />
        </div>

        {isFetching ? (
          <ScheduleCalendarSkeleton count={days} />
        ) : (
          <>
            {showEarliestHour ? (
              <div
                key={`${initialSchedule.month}`}
                className={classNames(
                  'align-items-center col-12 px-20 px-md-40 px-xxl-20 d-flex flex-column w-100'
                )}>
                <CalendarHeader
                  month={initialSchedule?.month}
                  dayOfMonth={initialSchedule.dayOfMonth}
                  weekDay={initialSchedule.weekDay}
                  isToday={isToday(initialSchedule.fullDate)}
                  disableLeftArrow={true}
                  showLeftArrow={true}
                  showRightArrow={true}
                  disableRightArrow={true}
                  onLeftArrowClick={handleGetPreviousDay}
                  onRightArrowClick={handleGetNextDay}
                />

                {showEarliestHour && (
                  <AvailabilityInfo
                    nextAvailableSlot={get(data, 'nextAvailableSlot')}
                    onStartDateChange={handleStartDateChange}
                  />
                )}
              </div>
            ) : (
              <>
                {slicedViewDays &&
                  map(slicedViewDays, ({ month, dayOfMonth, weekDay, fullDate, schedule }, i) => {
                    const hasViewMoreButton = schedule && schedule.slots.length > 10;

                    return (
                      <div
                        key={`${month}${i}`}
                        className={classNames(
                          !showEarliestHour
                            ? 'col-12 col-md-8 col-lg-6 col-xxl-4 px-40 px-xxl-20 d-flex flex-column w-100'
                            : 'align-items-center col-12 px-40 px-xxl-20 d-flex flex-column w-100',
                          {
                            'border-start border-gray-200': days === 2 && i === 1,
                            'border-start border-end border-gray-200': days + 1 === 3 && i === 1
                          }
                        )}>
                        <CalendarHeader
                          month={month}
                          dayOfMonth={dayOfMonth}
                          weekDay={weekDay}
                          isToday={isToday(fullDate)}
                          showLeftArrow={i === 0}
                          disableLeftArrow={isToday(fullDate) || startIndex === 0}
                          showRightArrow={days === i + 1}
                          onLeftArrowClick={handleGetPreviousDay}
                          onRightArrowClick={handleGetNextDay}
                        />

                        {isEmpty(schedule?.slots) && (
                          <div>
                            <div className="flex-grow-1 mt-24 bg-primary-100 py-100 px-40 px-xxl-20 text-center rounded-2">
                              <i className="fa-light fa-calendar p-20 rounded-5 fs-30 text-primary bg-primary-200" />
                              <p className="mt-16">
                                {t('schedules.no_available_time', 'There is no available time.')}
                              </p>
                            </div>
                          </div>
                        )}

                        {!showEarliestHour && (
                          <div
                            className={`row row-cols-2 g-16 mt-24 ${
                              !showMoreButtonState && hasViewMoreButton
                                ? scheduleWrapper
                                : 'height-auto'
                            }`}>
                            {schedule &&
                              map(get(schedule, 'slots'), (slot: Slot, i) => {
                                return (
                                  <TimeSlotButton
                                    key={`${slot.from}-${i}`}
                                    slot={slot}
                                    meetingType={get(schedule, 'type', '')}
                                    slotDate={new Date(Date.parse(get(schedule, 'date')!))}
                                    scheduleDate={get(schedule, 'date', '')}
                                    currentUser={currentUser}
                                    profile_id={profile_id}
                                    selectedSlot={selectedSlot}
                                    setSelectedSlot={setSelectedSlot}
                                    setMeeting={setMeeting}
                                  />
                                );
                              })}
                          </div>
                        )}
                      </div>
                    );
                  })}

                {hasMoreThan10SlotsInSchedule && (
                  <div className="col-12 d-flex justify-content-center align-items-center pb-12">
                    <button
                      onClick={toggleShowMoreButtonState}
                      className="btn btn-outline-primary fs-14 mt-20">
                      {showMoreButtonState
                        ? t('schedules.show_less', 'Show less')
                        : t('schedules.show_more', 'Show more')}
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      {meeting && (
        <div className="d-flex justify-content-center align-content-center mt-16">
          <InlineMessage
            type="info"
            message={t(
              'schedules.inline_message',
              'The selected time will be reserved for you in the next 30 minutes'
            )}
            size="small"
          />
        </div>
      )}
    </>
  );
};

const ScheduleCalendarSkeleton = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className={classNames(
          'col-12 col-md-8 col-lg-6 col-xxl-4 px-40 px-xxl-20 d-flex flex-column'
        )}>
        <div className="d-flex justify-content-center width-100 align-items-center position-relative">
          <div
            className={classNames(
              'd-flex flex-column justify-content-center align-items-center py-8 px-24 rounded-4 position-relative'
            )}>
            <Skeleton width={70} height={80} style={{ marginTop: 8 }} className="rounded-4" />
          </div>
        </div>
        <div className="row row-cols-2 g-16 mt-24">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="col">
              <Skeleton height={40} style={{ borderRadius: 8 }} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
);

export default ScheduleCalendar;
