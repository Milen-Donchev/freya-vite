import React from 'react';

import UploadInputUnit from '@components/upload/UploadInputUnit';

interface UploadInputProps {
  onUpload: (file: File) => void;
}

const UploadInput = (props: UploadInputProps) => {
  const { onUpload } = props;

  const handleUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    input.onchange = async (e: any) => {
      const file = e.target?.files[0];
      if (!file) return;
      onUpload(file);
    };
  };

  return <UploadInputUnit onClick={handleUpload} data-testid="upload-resource-button" />;
};

export default UploadInput;
