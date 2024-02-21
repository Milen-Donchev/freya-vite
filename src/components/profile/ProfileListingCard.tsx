import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Profile } from '@freya/types/profile';
import { useTranslation } from '@freya/hooks/useTranslation';
import { useTranslatedAttribute } from '@freya/hooks/useTranslatedAttribute';
import { getImage } from '@utils/helpers';
import Avatar from '@components/ui/avatar/Avatar';

interface ProfileListingCardProps {
  profile: Profile;
}

const ProfileListingCard = (props: ProfileListingCardProps) => {
  const { t } = useTranslation();
  const translate = useTranslatedAttribute();
  const { id, title, image, slug, profile_type } = props.profile;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/profile/${id}/${slug}`);
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-20 p-20 border border-primary-100 shadow rounded">
      <div
        onClick={handleNavigate}
        className="d-flex align-items-center gap-16 cursor-pointer"
        data-testid="profile-navigatie-wrapper">
        <Avatar image={image ? getImage(image, 'thumb') : ''} />
        <div>
          <p className="fw-bold text-primary-500 mb-0">{title}</p>
          <p className="fs-14 text-gray-400 mb-0">{translate(profile_type.name)}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleNavigate}
        className="btn btn-outline-primary btn-lg width-100 width-md-auto"
        data-testid="profile-navigatie-button">
        {t('common.see_more', 'See more')}
      </button>
    </div>
  );
};

export default ProfileListingCard;
