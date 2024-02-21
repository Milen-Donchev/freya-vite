import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import isEmpty from 'lodash/isEmpty';

import Avatar from '../ui/avatar/Avatar';

interface ProfileImageProps {
  name: string;
  isEditModeActive: boolean;
  isProfileStatusShown?: boolean;
  size?: number;
  image?: string;
  fontStyles?: string;
  className?: string;
  isImageProcessing?: boolean;
  setImages?: React.Dispatch<React.SetStateAction<FileList | undefined>>;
}

const ProfileImage = (props: ProfileImageProps) => {
  const {
    name,
    isProfileStatusShown = false,
    isEditModeActive,
    image,
    size = 5,
    className,
    isImageProcessing,
    setImages
  } = props;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (setImages && files) {
      setImages(files);
    }
  };

  return (
    <div className={`position-relative width-${size} height-${size} flex-shrink-0`}>
      {isImageProcessing && (
        <div className="width-100 height-100 d-flex justify-content-center align-items-center position-absolute">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <Avatar
        size={`width-${size} height-${size}`}
        initials={name}
        showInitials={isEmpty(image)}
        image={image}
        className={className}
      />
      {isEditModeActive && (
        <>
          <input
            type="file"
            id="file"
            accept="image/*"
            hidden
            data-testid="image-input-field"
            onChange={(e) => handleFileUpload(e)}
          />
          <label htmlFor="file">
            <span className="position-absolute end-0 me-n12 top-15 btn btn-ghost-primary btn-icon btn-lg bg-white">
              <i className="fa-light fa-pen text-primary fs-18" />
            </span>
          </label>
        </>
      )}
      {isProfileStatusShown && (
        <span className="position-absolute end-0 me-20 bottom-0 width-2 height-2 bg-success rounded-circle border border-3 border-white"></span>
      )}
    </div>
  );
};

export default ProfileImage;
