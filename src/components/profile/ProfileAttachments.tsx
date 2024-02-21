import map from 'lodash/map';
import omit from 'lodash/omit';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import mapValues from 'lodash/mapValues';
import Skeleton from 'react-loading-skeleton';
import React, { useEffect, useState } from 'react';

import type { Profile, ProfileAttachment } from '@freya/types/profile';
import type { Attachment } from '@freya/types/knowledgeCenter';

import { useTranslation } from '@hooks/useTranslation';
import { useGetProfileQuery, useEditProfileMutation } from '@store/api/profileApi';

import ContentFrame from '@components/ui/frames/ContentFrame';
import FileUploadPopup from '@components/upload/FileUploadPopup';
import CommentAttachmentList from '@components/discussions/comments/CommentAttachmentList';
import ResourceBox from '@components/upload/ResourceBox';
import Can from '@components/can/Can';

import { profileAttachmentsGrid } from './profile.scss';

interface ProfileAttachmentsProps {
  profileId: number;
  isMyAccount: boolean;
}

const ProfileAttachments: React.FC<ProfileAttachmentsProps> = ({ profileId, isMyAccount }) => {
  const { t } = useTranslation();

  const { data: profile, isFetching } = useGetProfileQuery<{
    data: { data: Profile };
    isFetching: boolean;
  }>({
    id: profileId
  });
  const [editProfile] = useEditProfileMutation();

  const attachments = profile?.data?.attachments;
  const hasAttachments = !!attachments && !isEmpty(attachments);

  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newAttachments, setNewAttachments] = useState<ProfileAttachment[]>();

  const openUploadPopup = () => setIsUploadPopupOpen(true);
  const closeUploadPopup = () => setIsUploadPopupOpen(false);
  const openEditMode = () => setIsEditMode(true);
  const closeEditMode = () => setIsEditMode(false);

  const editProfileAttachments = (attachments: Partial<Attachment>[]) => {
    // Flattens feature to have ID only - "feature1: {id: 1, data: 'bla bla'}" => "feature1: 1"
    const flattenedFeatures = mapValues(profile?.data?.features, (o: any) => o.id ?? o);
    editProfile({
      id: profileId,
      formData: {
        first_name: profile?.data?.entity?.first_name,
        last_name: profile?.data?.entity?.last_name,
        features: omit(flattenedFeatures, ['first_name', 'last_name']),
        profile_type: profile?.data?.profile_type.id,
        attachments,
        image: profile?.data?.image?.default ?? ''
      }
    });
  };

  const onUploadConfirm = (files: Partial<Attachment>[]) => {
    const newAttachments = attachments ? [...attachments, ...files] : [...files];
    editProfileAttachments(newAttachments);
  };

  const onEditConfirmClick = async () => {
    await editProfileAttachments(newAttachments as ProfileAttachment[]);
    closeEditMode();
  };

  const onEditCancelClick = () => {
    closeEditMode();
    setNewAttachments(attachments);
  };

  const onAttachmentDelete = (path: string) => {
    const edittedAttachments = filter(newAttachments, (a) => a.path !== path);
    setNewAttachments(edittedAttachments);
  };

  useEffect(() => {
    if (hasAttachments) {
      setNewAttachments(attachments);
    }
  }, [attachments]);

  return (
    <ContentFrame
      className="p-20 p-lg-40 mb-32"
      isLoading={isFetching}
      contentVisible={hasAttachments}
      LoadingSkeleton={<ProfileAttachmentsSkeleton />}
      Header={
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-20">
          <h3 className="">{t('profile.attachments_title', 'Resources')}</h3>
          {isMyAccount && (
            <div className="d-flex align-items-center gap-20">
              {!isEditMode && hasAttachments && (
                <button onClick={openEditMode} className="btn btn-lg btn-outline-primary-500">
                  <i className="fa-light fa-pencil me-8" />
                  {t('common.edit', 'Edit')}
                </button>
              )}
              <Can permissions={['attach_to_profile']}>
                <button onClick={openUploadPopup} className="btn btn-lg btn-outline-primary-500">
                  <i className="fa-light fa-cloud-arrow-up me-8" />
                  {t('common.upload_file', 'Upload')}
                </button>
              </Can>
              <FileUploadPopup
                show={isUploadPopupOpen}
                onClose={closeUploadPopup}
                onConfirm={onUploadConfirm}
              />
            </div>
          )}
        </div>
      }>
      {isEditMode && (
        <CommentAttachmentList
          attachments={newAttachments as ProfileAttachment[]}
          onAttachmentDelete={onAttachmentDelete}
          showDeleteButton
        />
      )}
      {!isEditMode && (
        <div className={profileAttachmentsGrid}>
          {map(attachments, ({ id, name, resource_type, path, size }) => (
            <div key={id} className="position-relative">
              <ResourceBox
                filename={name}
                path={path}
                resource_type={resource_type}
                size={size}
                className="flex-xxl-column"
                forceMobileVariant
              />
            </div>
          ))}
        </div>
      )}

      {isEditMode && (
        <div className="d-flex flex-column flex-sm-row gap-20 width-100 justify-content-end mt-20">
          <button onClick={onEditCancelClick} className="btn btn-outline-primary-500 btn-lg">
            {t('common.cancel', 'Cancel')}
          </button>
          <button onClick={onEditConfirmClick} className="btn btn-lg btn-primary-500">
            {!isEditMode && <i className="fa-light fa-pen me-8" />}
            {t('common.confirm', 'Confirm')}
          </button>
        </div>
      )}
    </ContentFrame>
  );
};

export default ProfileAttachments;

const ProfileAttachmentsSkeleton = () => (
  <>
    <div className="row mb-20">
      <div className="col-6">
        <Skeleton width={250} height={40} borderRadius={12} />
      </div>
      <div className="col-6 text-end d-none d-md-block">
        <Skeleton width={100} height={40} borderRadius={100} />
      </div>
    </div>
    <div className="row">
      <div className="col-12 flex-fill">
        <Skeleton height={260} borderRadius={12} />
      </div>
    </div>
  </>
);
