import { format } from 'date-fns';
import { useTranslation } from '@hooks/useTranslation';
import { useLocale } from '@hooks/useLocale';

export const formatDateTime = (inputDate: string) => {
  const dateToken = new Date(inputDate);
  const { locale } = useLocale();

  return `${dateToken.toLocaleDateString(locale)} ${dateToken.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  })}`;
};

export const areDatesEqual = (firstDate: string, secondDate: string) =>
  firstDate.toUpperCase() === secondDate.toUpperCase();

export const formatNotificationDateTime = (inputDate: string) => {
  const { t } = useTranslation();
  const targetDate = new Date(inputDate);
  const now = new Date();

  const timeDiff = now.getTime() - targetDate.getTime();
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));

  if (hoursDiff > 0 && hoursDiff <= 12) {
    return hoursDiff + ' ' + t('common.hours_ago', 'hours ago');
  } else if (hoursDiff === 0 && minutesDiff > 0 && minutesDiff <= 59) {
    return minutesDiff + ' ' + t('common.min_ago', 'minutes ago');
  } else {
    return `${targetDate.toLocaleDateString()} ${targetDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })}`;
  }
};

export const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

export const createDateTime = (hours: number, minutes: number) => {
  const dateTime = new Date();
  dateTime.setHours(hours);
  dateTime.setMinutes(minutes);
  return dateTime;
};

export const formatTime = (time: Date) => format(time, 'HH:mm');

export const daysToMilliseconds = (days: number) => {
  //Multiplying all these values together gives the total number of milliseconds in one year.
  // 365 days in a year
  // 24 hours in a day
  // 60 minutes in an hour
  // 60 seconds in a minute
  // 1000 milliseconds in a second
  return new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000);
};
