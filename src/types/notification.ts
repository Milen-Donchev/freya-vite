import type { Profile } from '@types';

export type NotificationData = {
  id?: string | number;
  message: string;
  link: string;
  profile: Profile;
};

export type Notification = {
  id: string | number;
  data: NotificationData;
  read_at: string | null;
  seen: boolean;
  created_at?: string | null;
};
