import React from 'react';
import { Link } from 'react-router-dom';
import type { HomeColorsData, KeyString } from '@types';
import { useAuthStatus } from '@hooks/useAuthStatus';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';
import { useTranslation } from '@hooks/useTranslation';
import { Routes } from '@models';

interface TitleAndDescriptionProps {
  title: KeyString;
  colors: HomeColorsData;
  description?: KeyString;
  isMainSection?: boolean;
}

const TitleAndDescription = (props: TitleAndDescriptionProps) => {
  const { title, description, colors, isMainSection = false } = props;

  const translate = useTranslatedAttribute();
  const { t } = useTranslation();
  const { isGuestLoginAllowed, canVisitDiscussions, canVisitKnowledgeCenter, canVisitProfiles } =
    useAuthStatus();

  // If isGuestLoginAllowed is false, the guestNavigationRoute will navigate to Routes.DASHBOARD, but
  // this case won't happen because, in such a scenario, all guest login configurations (canVisitDiscussions,
  // canVisitKnowledgeCenter, canVisitProfiles) are assumed to be false and the cta button "View Platform" won't be visible
  const guestNavigationRoute = canVisitDiscussions
    ? Routes.DISCUSSIONS_LISTING
    : canVisitKnowledgeCenter
    ? Routes.KNOWLEDGE_CENTER_CATEGORIES
    : canVisitProfiles
    ? Routes.PROFILES_LISTING
    : Routes.DASHBOARD;

  return (
    <div className="position-relative z-1">
      <p className={`fs-24 fs-md-32 fs-lg-40 fw-bold text-${colors.title}`}>{translate(title)}</p>
      {description && (
        <p
          className={`fs-18 ${colors.description ? `text-${colors.description}` : ''}`}
          data-testid="description-paragraph">
          {translate(description)}
        </p>
      )}
      {isGuestLoginAllowed && isMainSection && (
        <Link
          to={guestNavigationRoute}
          className="btn btn-primary mt-28 width-100 width-lg-auto"
          data-testid="view-platform-btn">
          {t('login.view_platform', 'View Platform')}
        </Link>
      )}
    </div>
  );
};

export default TitleAndDescription;
