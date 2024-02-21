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
    remoteVideoCount: 2,
    $contentShareMode: false,
    minWidth: NO_BREAKPOINT,

    gridGap: SM_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1    | 2    |
      |---+------+------+
      | 1 | vt-1 | vt-1 |
      | 2 | vt-2 | vt-2 |
      | 3 | lv   | .    |
    `
  },
  {
    remoteVideoCount: 2,
    $contentShareMode: false,
    minWidth: MD_BREAKPOINT,

    gridGap: MD_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1    | 2    | 3    | 4    | 5    | 6    |
      |---+------+------+------+------+------+------|
      | 1 | vt-1 | vt-1 | vt-1 | vt-1 | vt-1 | vt-1 |
      | 2 | vt-2 | vt-2 | vt-2 | vt-2 | vt-2 | vt-2 |
      | 3 | lv   | .    | .    | .    | .    | .    |
    `
  },
  {
    remoteVideoCount: 2,
    $contentShareMode: false,
    minWidth: LG_BREAKPOINT,

    gridGap: MD_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1    | 2    | 3    | 4    | 5    | 6    |
      |---+------+------+------+------+------+------|
      | 1 | vt-1 | vt-1 | vt-1 | vt-2 | vt-2 | vt-2 |
      | 2 | lv   | .    | .    | .    | .    | .    |
    `
  },
  {
    remoteVideoCount: 2,
    $contentShareMode: true,
    minWidth: NO_BREAKPOINT,

    gridGap: SM_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1  | 2     |
      |---+----+-------+
      | 1 | sc | sc    |
      | 2 | lv | extra |
    `
  },
  {
    remoteVideoCount: 2,
    $contentShareMode: true,
    minWidth: SM_BREAKPOINT,

    gridGap: SM_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1  | 2    | 3    | 4  | 5  |
      |---+----+------+------+----+----+
      | 1 | sc | sc   | sc   | sc | sc |
      | 2 | lv | vt-1 | vt-2 | .  | .  |
    `
  },
  {
    remoteVideoCount: 2,
    $contentShareMode: true,
    minWidth: MD_BREAKPOINT,

    gridGap: MD_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1  | 2    | 3    | 4  | 5  | 6  |
      |---+----+------+------+----+----+----+
      | 1 | sc | sc   | sc   | sc | sc | sc |
      | 2 | lv | vt-1 | vt-2 | .  | .  | .  |
    `
  },
  {
    remoteVideoCount: 2,
    $contentShareMode: true,
    minWidth: LG_BREAKPOINT,

    gridGap: MD_GRID_GAP,
    extraRow: true,

    def: `
      |   | 1  | 2    | 3    | 4  | 5  | 6  |
      |---+----+------+------+----+----+----|
      | 1 | sc | sc   | sc   | sc | sc | sc |
      | 2 | lv | vt-1 | vt-2 | .  | .  | .  |
    `
  }
];
