import React from 'react';
import map from 'lodash/map';
import get from 'lodash/get';
import { Form } from 'react-bootstrap';
import classNames from 'classnames';

import type { TArticle } from '@types';

import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import CardFrame from '@components/ui/frames/CardFrame';

import { navigationButton } from './knowledge-center.scss';

interface TopicNavigationProps {
  articles: TArticle[];
  currentArticleId: string;
  handleClick: (articleId: number) => void;
}

const TopicNavigation = (props: TopicNavigationProps) => {
  const { articles, currentArticleId, handleClick } = props;
  const translate = useTranslatedAttribute();

  /* istanbul ignore next */
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (get(event, 'target.value', false)) {
      handleClick(Number(event.target.value));
    }
  };

  return (
    <>
      <div className="d-block d-lg-none">
        <Form.Select onChange={handleChange} defaultValue={currentArticleId}>
          {map(articles, ({ id, title }: TArticle) => (
            <option value={id} key={`article-${id}`}>
              {translate(title)}
            </option>
          ))}
        </Form.Select>
      </div>
      <CardFrame className="d-none d-lg-flex overflow-hidden">
        {map(articles, (article: TArticle) => (
          <div
            data-testid="topic-navigation-button"
            key={article.id}
            className={classNames(
              'py-18 px-36 text-primary-600 cursor-pointer smooth-transition',
              navigationButton,
              {
                'bg-tertiary-300': currentArticleId === String(article.id)
              }
            )}
            onClick={() => handleClick(article.id)}>
            {translate(article.title)}
          </div>
        ))}
      </CardFrame>
    </>
  );
};

export default TopicNavigation;
