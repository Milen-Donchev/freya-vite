import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';

import { getImage } from '@freya/utils/helpers';
import { useComments } from '@providers/CommentsProvider';
import { useProcessTextUrls } from '@hooks/useProcessTextUrls';
import { useGetDiscussion } from '@store/api/discussionApi';

import HierarchyBorder from './HierarchyBorder';
import Avatar from '@components/ui/avatar/Avatar';
import TextEditor from '@components/ui/text-editor/TextEditor';
import AnonymousCheckbox from '@components/discussions/comments/AnonymousCheckbox';
import Can from '@components/can/Can';

interface SubcommentInputProps {
  taggedUser: string;
  parentCommentId: number;
}

const SubcommentInput = (props: SubcommentInputProps) => {
  const { taggedUser, parentCommentId } = props;

  const { id } = useParams();
  const { data: discussion } = useGetDiscussion(id as string);
  const { processUrls, links, setLinks } = useProcessTextUrls();
  const { createComment } = useComments();
  const editorRef = useRef<any>();
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);
  const [comment, setComment] = useState('');
  const [isLinkPreviewVisible, setLinkPreviewVisible] = useState<boolean>(true);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleChange = (editorValue: string) => {
    if (editorRef.current) {
      processUrls({ editorRef });
    }

    setComment(editorValue);
  };

  const addComment = () => {
    if (!comment) return;

    createComment(comment, isAnonymous, parentCommentId, null, links);
    setComment('');
    setLinkPreviewVisible(true);
    // Clear editor value after submit comment.
    forEach(document.getElementsByClassName('ql-editor'), (editor) => {
      editor.innerHTML = '';
    });
  };

  return (
    <>
      <div className="d-flex">
        <HierarchyBorder addBottomConnection={false} />

        <div className="width-100">
          {/* Comment input */}
          <div className="form-floating flex-grow-1 position-relative bg-white">
            <TextEditor
              ref={editorRef as any}
              theme="bubble"
              editorConfig="comment"
              onChange={handleChange}
              placeholder={`@${taggedUser}`}
              value={comment}
              wrapperClassName="ps-24 pe-48 border border-1 border-primary-400 rounded-1"
              links={links}
              setLinks={setLinks}
              linkPreview={links && links[links?.length - 1]}
              isLinkPreviewVisible={isLinkPreviewVisible}
              setLinkPreviewVisible={setLinkPreviewVisible}
            />
            <div className="position-absolute top-50 start-0 translate-middle ms-20">
              <Avatar size="width-3 height-3" image={getImage(currentUser?.image, 'thumb')} />
            </div>
            <Can permissions={['attach_to_comment']}>
              <div
                data-testid="subcomment-submit-button"
                onClick={addComment}
                className="btn btn-ghost-primary btn-icon position-absolute top-50 end-0 translate-middle">
                <i className="fa-light fa-paper-plane-top" />
              </div>
            </Can>
          </div>
        </div>
      </div>
      {/* Anonymous checkbox */}
      <div className="mt-12 ms-28 mb-20">
        {!isEmpty(discussion) && discussion?.allow_anonymous_comment && (
          <AnonymousCheckbox onToggle={setIsAnonymous} />
        )}
      </div>
    </>
  );
};

export default SubcommentInput;
