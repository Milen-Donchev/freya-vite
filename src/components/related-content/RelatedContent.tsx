import React from 'react';
import { useNavigate } from 'react-router-dom';
import map from 'lodash/map';
import isObject from 'lodash/isObject';
import type { Discussion, Profile, TArticle } from '@types';

import { getImage } from '@utils/helpers';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import Avatar from '@components/ui/avatar/Avatar';
import CardFrame from '@components/ui/frames/CardFrame';

type Content = Discussion | Profile | TArticle;

interface RelatedContentProps {
  content: Content[];
  content_type: 'discussions' | 'profile' | 'article';
  title: string;
}

const RelatedContent = (props: RelatedContentProps) => {
  const { content, content_type, title } = props;
  const translate = useTranslatedAttribute();

  const navigate = useNavigate();

  const handleNavigate = (id?: number | string, slug?: string) => {
    if (!id || !slug) return;

    content_type !== 'article'
      ? navigate(`/${content_type}/${id}/${slug}`)
      : navigate(`/${content_type}/${id}/${slug}`);
  };

  return (
    <CardFrame className="p-20 gap-20">
      <p className="fs-24 fw-semibold mb-0">{title}</p>
      {map(content, (item) => (
        <div
          className="d-flex gap-20 cursor-pointer"
          key={String(item.id)}
          onClick={() => handleNavigate(item.id, item.slug)}>
          {content_type === 'profile' && <Avatar image={getImage(item.image || {}, 'thumb')} />}
          {(content_type === 'discussions' || content_type === 'article') && (
            <>
              {item.image ? (
                <img
                  src={getImage(item.image, 'thumb')}
                  className="width-8 width-md-10 height-8 height-md-10 object-fit-cover rounded-3"
                />
              ) : (
                <div className="rounded width-8 width-md-10 height-8 height-md-10 bg-primary-300 d-flex align-items-center justify-content-center">
                  <i className="fa-light fa-screen-users fs-22 text-primary-500" />
                </div>
              )}
            </>
          )}
          <p className="fs-18 fw-semibold mb-0">
            {isObject(item.title) ? translate(item.title) : item.title}
          </p>
        </div>
      ))}
    </CardFrame>
  );
};

export default RelatedContent;
