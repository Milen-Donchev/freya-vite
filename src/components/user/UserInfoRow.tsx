import React, { memo } from 'react';
import { useTranslation } from '@hooks/useTranslation';

import Avatar from '@components/ui/avatar/Avatar';

interface UserInfoRowProps {
  name: string | null;
  image?: string;
  subtext?: string;
  subtextClassName?: string;
  isAnonymous?: boolean;
  showInitials?: boolean;
}

const UserInfoRow = (props: UserInfoRowProps) => {
  const { name, subtext, image, subtextClassName, isAnonymous, showInitials } = props;

  const { t } = useTranslation();

  return (
    <div className="d-flex align-items-center">
      <Avatar initials={name} image={image} showInitials={showInitials} />
      <div className="ms-12">
        <div className="fw-semibold">{isAnonymous ? t('common.anonymous', 'Anonymous') : name}</div>
        {subtext && <div className={subtextClassName ?? 'text-gray-400 fs-14'}>{subtext}</div>}
      </div>
    </div>
  );
};

export default memo(UserInfoRow);
