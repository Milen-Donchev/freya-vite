import React, { useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@hooks/useTranslation';

import CardFrame from '../ui/frames/CardFrame';

import defaultImage from './assets/default-category-image.svg';

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
}

const CategoryCard = (props: CategoryCardProps) => {
  const { title, image, href } = props;

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = useCallback(() => navigate(href), [navigate, href]);

  return (
    <CardFrame
      className="d-flex flex-column height-100 overflow-hidden cursor-pointer"
      onClick={handleClick}>
      <div className="ratio ratio-109x75">
        <img src={!isEmpty(image) ? image : defaultImage} className="img-fluid rounded-3" />
      </div>
      <div className="d-flex flex-column flex-fill p-20">
        <p className="d-flex align-items-center justify-content-center flex-fill fs-18 fw-semibold">
          {title}
        </p>
        <button
          data-testid="category-card-see-more-button"
          onClick={handleClick}
          className="btn btn-outline-primary btn-lg width-100">
          {t('common.see_more', 'See more')}
        </button>
      </div>
    </CardFrame>
  );
};

export default CategoryCard;
