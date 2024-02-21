import type { Image } from './ui';

export interface FeatureValue {
  id: number;
  value: Record<string, string>;
}

export interface ProfileFeature {
  id: number;
  feature_values: FeatureValue[];
  label: Record<string, string>;
  name: string;
  placeholder: Record<string, string>;
  slug: string;
  type: string;
  is_required: boolean;
}

export interface ProfileType {
  id: number;
  name: Record<string, string>;
  features?: ProfileFeature[];
  required_attributes?: string[];
}

export interface ProfileEntity {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  image: Image;
  phone: string;
  registration_status: number;
  registration_status_title: Record<string, string>;
}

export type ResourceType = 'image' | 'video' | 'attachment';

export interface ProfileAttachment {
  id: number;
  name: string;
  path: string;
  resource_type: ResourceType;
  size: string;
  thumb: string;
  type: string;
}

export interface Profile {
  id: number;
  title: string;
  slug: string;
  profile_type: ProfileType;
  is_verified: boolean;
  image: Image;
  features: ProfileFeature[];
  entity: ProfileEntity;
  permissions: string[];
  attachments?: ProfileAttachment[];
}

export interface ProfileTypeFilter {
  id: number | null;
  name: string | Record<string, string>;
}
