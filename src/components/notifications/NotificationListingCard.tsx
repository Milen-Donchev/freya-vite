import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import has from 'lodash/has';

import type { Notification } from '@types';

import { Routes } from '@models/Routes';
import { useTranslation } from '@hooks/useTranslation';
import { extractInitials, getImage } from '@utils/helpers';
import { formatNotificationDateTime } from '@utils/dateHelpers';
import { useReadNotificationMutation } from '@store/api/notificationApi';
import { invalidateDiscussion } from '@store/api/discussionApi';

import Avatar from '@components/ui/avatar/Avatar';

interface NotificationListingCardProps {
  notification: Notification;
}

const NotificationListingCard = (props: NotificationListingCardProps) => {
  const { notification } = props;
  const { id, created_at, data } = notification;
  const dispatch = useDispatch();

  const [readNotification] = useReadNotificationMutation();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const nameInitials = data?.profile?.title ? extractInitials(data.profile.title) : '';

  /** Using useRef in this context helps prevent the openNotification function from being called multiple times */
  const notificationOpenedRef = useRef(false);
  const openNotification = (clickedNotification: Notification) => {
    if (!notificationOpenedRef.current) {
      !clickedNotification.read_at && readNotification(clickedNotification.id);
      dispatch(invalidateDiscussion());
      navigate(`${Routes.DISCUSSIONS_LISTING}/${clickedNotification.data.link}`);
      notificationOpenedRef.current = true;
    }
  };

  const notificationClass = !notification.read_at ? 'bg-primary-200' : '';

  return (
    <div
      className={`d-flex align-items-center gap-20 mb-16 p-12 min-height-8 cursor-pointer rounded border border-primary-300 ${notificationClass}`}
      onClick={() => openNotification(notification)}>
      <Avatar
        image={data?.profile?.image ? getImage(data.profile.image, 'thumb') : ''}
        showInitials={has(data, 'profile.image')}
        initials={nameInitials}
      />
      <div
        className="flex-grow-1 gap-20 justify-content-between"
        data-testid="notification-card-title">
        <p className="mb-0">{data?.message}</p>
        <p className="fs-16 mb-0 text-gray-400 text-pre-wrap d-flex align-items-center">
          {created_at ? formatNotificationDateTime(created_at) : t('common.now', 'Now')}
        </p>
      </div>
      <div className="flex-shrink-0">
        <button
          data-testid={`notification-btn-${id}`}
          type="button"
          onClick={() => openNotification(notification)}
          className="btn btn-lg btn-outline-primary d-lg-block d-none flex-shrink-0">
          {t('common.see_more', 'See more')}
        </button>
      </div>
    </div>
  );
};

export default NotificationListingCard;
