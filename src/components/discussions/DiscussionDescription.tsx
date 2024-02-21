import React, { memo, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import map from 'lodash/map';
import get from 'lodash/get';
import concat from 'lodash/concat';
import isEmpty from 'lodash/isEmpty';
import truncate from 'lodash/truncate';

import { useTranslation } from '@hooks/useTranslation';
import { useDiscussion } from '@providers/DiscussionProvider';

import CardFrame from '@components/ui/frames/CardFrame';
import Video from '@components/video/Video';

import { discussionDescription } from './discussions.scss';
import classNames from 'classnames';

const DiscussionDescription = () => {
  const { discussion } = useDiscussion();
  const resources = get(discussion, 'participant', false)
    ? concat(discussion.private_attachments ?? [], discussion.public_attachments)
    : discussion.public_attachments;
  const { t } = useTranslation();

  const description =
    discussion.participant && discussion.private_description
      ? discussion.private_description
      : discussion.public_description;

  const shouldTruncate =
    description && description.length > 200 && !isEmpty(discussion.participant);
  const [isTruncated, setIsTruncated] = useState(shouldTruncate);

  const toggleTruncated = () => setIsTruncated((trunc) => !trunc);

  return (
    <CardFrame className="p-40 mb-20">
      <div className="fs-18 editor-content">
        {ReactHtmlParser(
          shouldTruncate && isTruncated ? truncate(description, { length: 400 }) : description
        )}
      </div>
      {shouldTruncate && (
        <div
          className={classNames('bg-white text-center mb-20 p-20 mx-n40', discussionDescription, {
            'mt-n24': isTruncated
          })}>
          <button
            onClick={toggleTruncated}
            className="btn btn-outline-primary"
            data-testid="truncate-btn">
            {isTruncated ? t('common.see_more', 'See more') : t('common.see_less', 'See less')}
            <i className={`fa-regular ${isTruncated ? 'fa-chevron-down' : 'fa-chevron-up'} ms-8`} />
          </button>
        </div>
      )}
      {!isEmpty(resources) && (
        <div className="d-flex flex-column gap-20">
          {map(
            resources,
            ({ id, path, resource_type }) =>
              resource_type === 'video' && <Video key={id} videoSource={path} />
          )}
        </div>
      )}
    </CardFrame>
  );
};

export default memo(DiscussionDescription);
