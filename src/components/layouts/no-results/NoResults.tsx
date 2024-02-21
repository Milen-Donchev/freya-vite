import React from 'react';
import { useTranslation } from '@hooks/useTranslation';
import intro from '../../layouts/login/intro.svg';

export interface NoResultsProps {
  message: string;
  img?: string;
  className?: string;
  showButton?: boolean;
}

const NoResults = (props: NoResultsProps) => {
  const { t } = useTranslation();
  const { message, img, className, showButton = false } = props;

  return (
    <div className={className} data-testid="no-result">
      <div className="text-center">
        {/* TODO: Load this image from backend when logic is ready. */}
        <img
          src={img ? img : intro}
          alt="intro"
          className="align-self-center mb-28 mb-36 px-32 width-100 width-md-320"
          loading="lazy"
        />
        <div className="w-100 text-center">
          <p className="fs-18 fw-bold text-pre-wrap">{message}</p>
        </div>
        {showButton && (
          <div className="d-flex justify-content-center">
            <button type="button" className={`btn btn-lg btn-primary`} disabled>
              {t('common.create_content', 'Create content')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoResults;
