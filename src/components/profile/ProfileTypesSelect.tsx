import React from 'react';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import capitalize from 'lodash/capitalize';

import { type ProfileTypeFilter } from '@freya/types/profile';

import { useTranslation } from '@hooks/useTranslation';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import { useGetProfileTypesQuery } from '@store/api/profileApi';
import CustomSelect from '@components/ui/select-field/CustomSelect';
import { profileTypeSelect } from './profile.scss';

interface ProfileTypeProps {
  filterProfilesByType: (profileTypeId: number | null) => void;
  selectedProfileTypeId: number | null;
}

const ProfileTypesSelect = (props: ProfileTypeProps) => {
  const { filterProfilesByType, selectedProfileTypeId } = props;

  const { data } = useGetProfileTypesQuery({ entity: 'user' });
  const { t } = useTranslation();
  const translate = useTranslatedAttribute();

  const profileTypesOptions = data?.data
    ? [{ id: null, name: t('profile.all', 'All') }, ...data.data]
    : [];

  const handleChange = (profileType: ProfileTypeFilter | null) => {
    if (profileType) {
      filterProfilesByType(profileType.id);
    }
  };

  return (
    <CustomSelect<ProfileTypeFilter, false>
      data-testid="profile-type-wrapper"
      name="profile-type"
      getOptionLabel={({ name }) =>
        isObject(name) ? capitalize(translate(name)) : capitalize(name)
      }
      value={find(profileTypesOptions, ({ id }) => isEqual(id, selectedProfileTypeId))}
      getOptionValue={({ id }) => String(id)}
      options={profileTypesOptions}
      onChange={handleChange}
      placeholder={t('profile.profile_type_select_title', 'Profile Type')}
      className={`compact fs-14 fw-semibold ${profileTypeSelect}`}
    />
  );
};

export default ProfileTypesSelect;
