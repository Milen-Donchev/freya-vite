import React, { useState } from 'react';
import map from 'lodash/map';
import concat from 'lodash/concat';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import { useTranslation } from '@hooks/useTranslation';
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { Breakpoints } from '@models/Breakpoints';
import { useDiscussion } from '@providers/DiscussionProvider';
import { trimFilename } from '@utils/attachments';

import CardFrame from '@components/ui/frames/CardFrame';
import ResourceBox from '@components/upload/ResourceBox';
import DiscussionUploadResourceButton from '@components/discussions/resources/DiscussionUploadResourceButton';
import NoResults from '@components/layouts/no-results/NoResults';
import { discussionResourceGrid } from '../discussions.scss';

interface DiscussionResourcesProps {
  canUploadFile?: boolean;
}

const DiscussionResources = (props: DiscussionResourcesProps) => {
  const { t } = useTranslation();
  const { discussion } = useDiscussion();
  const { canUploadFile = false } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const { width } = useWindowDimensions();

  const toggleExpanded = () => setIsExpanded((x) => !x);

  const isXXL = width >= Breakpoints.XXL;
  const shouldSliceResources = !isExpanded && isXXL;
  const isParticipant = get(discussion, 'participant', false);
  const resources = isParticipant
    ? concat(discussion.private_attachments ?? [], discussion.public_attachments)
    : discussion.public_attachments;

  return (
    <CardFrame className="p-28 mb-28">
      <div className="fs-24 fw-semibold mb-24">{t('discussion.resources', 'Resources')}</div>
      {(!isParticipant || isEmpty(discussion?.public_attachments)) && (
        <NoResults
          message={t(
            isParticipant
              ? 'discussion.no_resources_for_participant'
              : 'discussion.no_resources_for_non_participant',
            'There are no uploaded resources yet.'
          )}
        />
      )}
      {!isEmpty(resources) && (
        <div>
          <div className={discussionResourceGrid}>
            {canUploadFile && <DiscussionUploadResourceButton />}
            {map(
              shouldSliceResources ? resources.slice(0, canUploadFile ? 3 : 4) : resources,
              ({ id, size, name, resource_type, path }) => (
                <ResourceBox
                  key={String(id)}
                  resource_type={resource_type}
                  filename={trimFilename(name!, 30, 10, 10)}
                  path={path}
                  size={size}
                />
              )
            )}
          </div>
          {isXXL && resources.length > 4 && (
            <button
              data-testid="resources-expand-collapse-button"
              className="btn btn-ghost-primary mt-16"
              onClick={toggleExpanded}>
              {isExpanded ? t('common.see_less', 'See less') : t('common.see_more', 'See more')}
            </button>
          )}
        </div>
      )}
    </CardFrame>
  );
};

export default DiscussionResources;
