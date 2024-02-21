import {
  SM_GRID_GAP,
  MD_GRID_GAP,
  NO_BREAKPOINT,
  SM_BREAKPOINT,
  MD_BREAKPOINT,
  LG_BREAKPOINT
} from './defaults';

export default [
  {
    remoteVideoCount: 4,
    $contentShareMode: false,
    minWidth: NO_BREAKPOINT,

    gridGap: SM_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1    | 2    |
      |---+------+------|
      | 1 | vt-1 | vt-2 |
      | 2 | vt-3 | vt-4 |
      | 3 | lv   | .    |
    `
  },
  {
    remoteVideoCount: 4,
    $contentShareMode: false,
    minWidth: MD_BREAKPOINT,

    gridGap: MD_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1    | 2    | 3    | 4    | 5    | 6    |
      |---+------+------+------+------+------+------|
      | 1 | vt-1 | vt-1 | vt-1 | vt-2 | vt-2 | vt-2 |
      | 2 | vt-3 | vt-3 | vt-3 | vt-4 | vt-4 | vt-4 |
      | 3 | lv   | .    | .    | .    | .    | .    |
    `
  },
  {
    remoteVideoCount: 4,
    $contentShareMode: true,
    minWidth: NO_BREAKPOINT,

    gridGap: SM_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1  | 2     |
      |---+----+-------|
      | 1 | sc | sc    |
      | 2 | lv | extra |
    `
  },
  {
    remoteVideoCount: 4,
    $contentShareMode: true,
    minWidth: SM_BREAKPOINT,

    gridGap: SM_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1  | 2     | 3    | 4    | 5    | 6  |
      |---+----+-------+------+------+------|----|
      | 1 | sc | sc    | sc   | sc   | sc   | sc |
      | 2 | lv | extra | vt-1 | vt-2 | vt-3 | .  |
    `
  },
  {
    remoteVideoCount: 4,
    $contentShareMode: true,
    minWidth: MD_BREAKPOINT,

    gridGap: MD_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1  | 2    | 3    | 4    | 5    | 6  |
      |---+----+------+------+------+------|----|
      | 1 | sc | sc   | sc   | sc   | sc   | sc |
      | 2 | lv | vt-1 | vt-2 | vt-3 | vt-4 | .  |
    `
  },
  {
    remoteVideoCount: 4,
    $contentShareMode: true,
    minWidth: LG_BREAKPOINT,

    gridGap: MD_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1  | 2    | 3    | 4    | 5    | 6  |
      |---+----+------+------+------+------|----|
      | 1 | sc | sc   | sc   | sc   | sc   | sc |
      | 2 | lv | vt-1 | vt-2 | vt-3 | vt-4 | .  |
    `
  }
];
