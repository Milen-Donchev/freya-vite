import { Image } from './ui';
import type { Attachment, Profile } from '@types';

export enum MeetingType {
  ONLINE = 'Online',
  PHYSICAL = 'Physical',
  WRITTEN = 'Written'
}

export type ParticipantInfoProps = {
  title: string;
  address: string;
  email: string | null;
  phone: string | null;
};

export type UpdateParticipantInfoProps = {
  personal_info: ParticipantInfoProps;
};

export type ParticipantProfile = {
  chime_attendee_id: null | string;
  id: number;
  meeting_id: string | number;
  personal_info: ParticipantInfoProps;
  profile_id: number;
  profile: Profile;
};

export type NestedFeature = {
  [key: string]: {
    id: number;
    feature_id: number;
    value: Record<string, string>;
  };
};

export type Meeting = {
  id: number;
  title: Record<string, string>;
  description: string | null;
  profile_id: number;
  profile: {
    id: number;
    image: Image | null;
    slug: string;
    title: string;
    features: Record<string, string> | NestedFeature | null;
  };
  start_date: string;
  end_date: string;
  chime_meeting_id: null | string;
  participants_count: number;
  type: string;
  type_title: Record<string, string>;
  profile_participant: ParticipantProfile;
  status: string;
  status_title: Record<string, string>;
  created_at: string;
  updated_at: string;
  payment_status?: string;
  participants?: ParticipantProfile[];
  attachments?: Attachment[];
};

export type CreateMeetingProps = {
  profile_id: number;
  type: string;
  start_date: string;
  end_date: string;
  participants: number[];
  description?: string;
  attachments?: Partial<Attachment>[];
};

export type UpdateMeetingProps = {
  description: string;
  end_date: string;
  start_date: string;
  status: string;
  payment_status?: string;
  participants?: number[];
  attachments?: Partial<Attachment>[];
};
