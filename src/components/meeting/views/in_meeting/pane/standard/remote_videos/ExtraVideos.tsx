import React from 'react';
import subtract from 'lodash/fp/subtract';
import { useNavigation } from '@components/meeting/providers/NavigationProvider';
import { StyledVideoTile } from '../video_tile';

export default ({ remoteSize, maxCount }: any) => {
  const { toggleRoster, showRoster } = useNavigation();

  return (
    <StyledVideoTile
      className={`ch-extra-tile ${showRoster ? 'active' : ''}`}
      onClick={toggleRoster}>
      <div
        style={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: 'auto auto',
          gridColumnGap: '0.625rem',
          placeContent: 'center',
          alignItems: 'center'
        }}>
        <i className="fa-solid fa-user-group fa-xl"></i>
        <label className="fw-semibold">{`+${subtract(remoteSize, maxCount)}`}</label>
      </div>
    </StyledVideoTile>
  );
};
