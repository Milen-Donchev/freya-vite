import isNil from 'lodash/fp/isNil';
import { useContentShareState } from 'amazon-chime-sdk-component-library-react';

export default () => {
  const { tileId: sharingContentTileId } = useContentShareState();
  return !isNil(sharingContentTileId);
};
