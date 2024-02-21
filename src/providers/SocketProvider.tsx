import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type Dispatch,
  type SetStateAction
} from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';

import type { Notification, NotificationData } from '@types';

import { configGet } from '@freya/config';
import { useAppSelector } from '@store/store';
import { normalizePath } from '@utils/helpers';
import { useGetNotificationsQuery } from '@store/api/notificationApi';

(window as any).Pusher = Pusher;

type SocketContextWrapper = {
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  unseenNotificationsCount: number;
  setUnseenNotificationsCount: Dispatch<SetStateAction<number>>;
};

export const SocketContextWrapper = createContext<SocketContextWrapper>({
  notifications: [],
  setNotifications: () => [],
  unseenNotificationsCount: 0,
  setUnseenNotificationsCount: () => 0
});
const SocketContext = createContext<any>({});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socketConnection, setSocketConnection] = useState<Echo | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unseenNotificationsCount, setUnseenNotificationsCount] = useState(0);

  const currentUser = useAppSelector((store) => store.currentUserSlice.currentUser);
  const access_token = useAppSelector((store) => store.authSlice.access_token);

  // TODO:: fix currentUser type
  const profileId = (currentUser as any)?.id;

  const { data } = useGetNotificationsQuery(
    {},
    { refetchOnMountOrArgChange: true, skip: !profileId }
  );

  const notificationsList = data?.data ?? [];

  const allNotifications = useMemo(() => {
    return !isEmpty(notifications) ? [...notifications, ...notificationsList] : notificationsList;
  }, [notifications, notificationsList]);

  useEffect(() => {
    if (profileId) {
      const unseen = filter(allNotifications, (n) => !n.seen).length;
      setUnseenNotificationsCount(unseen);
    }
  }, [allNotifications, profileId]);

  const url = normalizePath(`${configGet('socketUrl')}/broadcasting/auth`);

  useEffect(() => {
    if (!access_token) return;

    setSocketConnection(
      new Echo({
        broadcaster: 'pusher',
        key: configGet('socketAppKey'),
        cluster: configGet('socketCluster'),
        wsHost: configGet('socketHost'),
        wsPort: configGet('socketPort'),
        wssPort: configGet('socketPort'),
        forceTLS: false,
        encrypted: true,
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: url,
        auth: {
          headers: {
            Authorization: 'Bearer ' + access_token
          }
        }
      })
    );
  }, [access_token]);

  useEffect(() => {
    if (!socketConnection || !profileId) return;

    if (typeof socketConnection.channel === 'function') {
      // Subscribe to a channel
      socketConnection
        .private(`App.Models.Profile.${profileId}`)
        .notification((notification: NotificationData) => {
          setNotifications((state) => [
            { id: notification.id!, data: notification, seen: false, read_at: null },
            ...state
          ]);
        });
    }
  }, [socketConnection, profileId]);

  const resetSocketProvider = () => {
    setNotifications([]);
    socketConnection?.leaveAllChannels();
    setSocketConnection(null);
  };

  useEffect(() => {
    if (socketConnection && !profileId) resetSocketProvider();
  }, [profileId]);

  return (
    <SocketContext.Provider value={socketConnection}>
      <SocketContextWrapper.Provider
        value={{
          notifications,
          setNotifications,
          unseenNotificationsCount,
          setUnseenNotificationsCount
        }}>
        {children}
      </SocketContextWrapper.Provider>
    </SocketContext.Provider>
  );
};
export const useNotifications = () => useContext(SocketContextWrapper);
