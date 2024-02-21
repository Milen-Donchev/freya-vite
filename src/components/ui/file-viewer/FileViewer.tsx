import React from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

interface FileViewerProps {
  fileUrl: string;
}

const FileViewer = (props: FileViewerProps) => {
  const { fileUrl } = props;

  const documents = [
    {
      uri: fileUrl
    }
  ];

  return <DocViewer documents={documents} pluginRenderers={DocViewerRenderers} />;
};

export default FileViewer;
