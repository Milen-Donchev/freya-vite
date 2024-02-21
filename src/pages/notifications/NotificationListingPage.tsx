import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '@hooks/useTranslation';
import fill from 'lodash/fill';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { useNotifications } from '@providers/SocketProvider';
import { useGetNotificationsQuery, useSeeNotificationsMutation } from '@store/api/notificationApi';

import CardFrame from '@components/ui/frames/CardFrame';
import NoResults from '@components/layouts/no-results/NoResults';
import BasicPagination from '@components/ui/pagination/BasicPagination';
import NotificationListingCard from '@components/notifications/NotificationListingCard';

const NotificationListingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const { notifications, setNotifications } = useNotifications();

  const [seeAllNotifications] = useSeeNotificationsMutation();

  const { data, isLoading } = useGetNotificationsQuery(
    { page: pageNumber },
    { refetchOnMountOrArgChange: true }
  );

  let notificationsList = data ? data.data : [];

  const seeNotifications = () => {
    // reset notification counter when notification page is opened.
    setNotifications([]);

    seeAllNotifications({});
  };

  useEffect(() => {
    seeNotifications();
  }, []);

  const allNotifications = useMemo(
    () =>
      // The new notifications are displayed exclusively on the first page.
      pageNumber === 1 ? [...notifications, ...notificationsList] : notificationsList,
    [notifications, notificationsList]
  );

  const clickHandler = (
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => {
    event.preventDefault();
    setPageNumber(pageNumber);
    seeNotifications();
  };

  const goToNotificationSettings = () => navigate(`${Routes.SETTINGS}/notifications`);

  return (
    <div>
      <CardFrame className="mt-sm-0 mb-32 p-20 p-lg-40 shadow-sm">
        <div className="d-flex justify-content-between">
          <p className="fs-24 fw-semibold">{t('notification.title', 'Notifications')}</p>
          <button onClick={goToNotificationSettings} className="btn btn-ghost-primary btn-icon">
            <i className="fa-light fa-gear" />
          </button>
        </div>
        {isLoading && <NotificationListingSkeleton count={5} />}
        {!isEmpty(allNotifications) &&
          !isLoading &&
          map(allNotifications, (notification) => (
            <NotificationListingCard
              key={`notification_card_${notification.id}`}
              notification={notification}
            />
          ))}
        {isEmpty(allNotifications) && !isLoading && (
          <NoResults
            message={t('notification.no_notifications', 'There are no notifications')}
            showButton={false}
          />
        )}
        {data?.meta?.last_page && data?.meta.last_page > 1 && (
          <BasicPagination clickHandler={clickHandler} meta={data.meta} />
        )}
      </CardFrame>
    </div>
  );
};

export default NotificationListingPage;

const NotificationListingSkeleton = ({ count }: { count: number }) => (
  <div data-testid="loader">
    {map(fill(Array(count), '.'), (_, index) => (
      <div key={String(index)} className="d-flex">
        <Skeleton height={80} containerClassName="flex-fill" borderRadius={12} className="mb-12" />
      </div>
    ))}
  </div>
);
