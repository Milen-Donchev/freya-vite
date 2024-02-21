import React from 'react';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate } from 'react-router-dom';

import type { DiscussionListData } from '@types';

import { getImage } from '@utils/helpers';

interface DiscussionsListingCardProps {
  discussion: DiscussionListData;
}
const DiscussionsListingCard = (props: DiscussionsListingCardProps) => {
  const { t } = useTranslation();
  const { id, title, image, slug, comments_count, participants_count } = props.discussion;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/discussions/${id}/${slug}`);
  };

  return (
    <div
      className="d-flex flex-wrap flex-md-nowrap gap-20 mb-16 p-20 shadow rounded border border-gray-100"
      key={id}>
      <div onClick={handleNavigate} className="cursor-pointer">
        {image ? (
          <img
            src={getImage(image, 'thumb')}
            className="rounded width-10 width-sm-8 height-10 height-sm-8 object-fit-cover"
            alt="discussion_image"
          />
        ) : (
          <div className="rounded width-10 width-sm-8 height-10 height-sm-8 bg-primary-300 d-flex align-items-center justify-content-center">
            <i className="fa-light fa-screen-users fs-22 text-primary-500" />
          </div>
        )}
      </div>
      <div
        className="d-flex justify-content-lg-between gap-20 width-100 flex-wrap flex-lg-nowrap"
        data-testid="discussion-card-title">
        <div className="width-100 width-lg-40 align-self-center">
          <p
            className="fs-18 fw-bold mb-0 text-primary-500 text-pre-wrap cursor-pointer"
            onClick={handleNavigate}>
            {title}
          </p>
        </div>
        <div className="align-self-center">
          <p className="fs-14 mb-0 text-gray-400">{t('discussion.participants', 'Participants')}</p>
          <p className="fs-20 fw-bold mb-0">{participants_count}</p>
        </div>
        <div className="align-self-center">
          <p className="fs-14 mb-0 text-gray-400">{t('discussion.comments', 'Comments')}</p>
          <p className="fs-20 fw-bold mb-0">{comments_count}</p>
        </div>
        <button
          data-testid={`discussion-btn-${id}`}
          type="button"
          onClick={handleNavigate}
          className="btn btn-outline-primary btn-lg width-100 width-lg-auto flex-shrink-0 align-self-center">
          {t('common.see_more', 'See more')}
        </button>
      </div>
    </div>
  );
};

export default DiscussionsListingCard;
