import map from 'lodash/fp/map';
import compose from 'lodash/fp/compose';
import join from 'lodash/fp/join';
import dropWhile from 'lodash/fp/dropWhile';
import isEmpty from 'lodash/fp/isEmpty';
import dropRightWhile from 'lodash/fp/dropRightWhile';
import split from 'lodash/fp/split';
import trimChars from 'lodash/fp/trimChars';
import get from 'lodash/fp/get';
import drop from 'lodash/fp/drop';
import size from 'lodash/fp/size';
import dropRight from 'lodash/fp/dropRight';
import head from 'lodash/fp/head';
import eq from 'lodash/fp/eq';
import repeat from 'lodash/fp/repeat';
import { fromObject, ensureArray, prependString } from '@components/meeting/utils/general';

const DEFAULT_INDENT = 2;

const prepareGridDef = compose(
  map(compose(dropRight(1), drop(2), split('|'))),
  drop(2), // remove column index and separator row
  dropWhile(isEmpty),
  dropRightWhile(isEmpty),
  map(trimChars('\t ')),
  split('\n')
);

const renderTemplateAreas = compose(
  join('\n'),
  map(
    // map rows
    compose(
      (row) => `'${row}'`,
      join(' '),
      map(trimChars('\t ')) // map columns in a row
    )
  )
);

const calculateRows = size;

const calculateColumns = compose(size, head);

const indentText = (indent: any) =>
  compose(join('\n'), map(prependString(repeat(indent)(' '))), split('\n'));

// single grid definition render function
const renderSingleGridDef = (gridDef: any) => {
  const parsed = compose(
    fromObject({
      templateAreas: renderTemplateAreas,
      rows: calculateRows,
      columns: calculateColumns
    }),
    prepareGridDef,
    get('def')
  )(gridDef);

  const extraRow = get('extraRow')(gridDef);
  const doRenderStyle = (indent: any) => `
    grid-template: repeat(${extraRow ? parsed.rows - 1 : parsed.rows}, auto) ${
    extraRow ? 'min-content' : ''
  } / repeat(${parsed.columns}, 1fr);
    grid-gap: ${get('gridGap')(gridDef)};
    grid-template-areas:\n ${indentText(indent)(parsed.templateAreas)};
`;

  const minWidth = get('minWidth')(gridDef);

  if (eq('default')(minWidth)) {
    return doRenderStyle(DEFAULT_INDENT);
  }

  return `
    @media(min-width: ${minWidth}) {
      ${indentText(DEFAULT_INDENT)(doRenderStyle(DEFAULT_INDENT))}
    }`;
};

// NB: gridDef (first and single argument) is either a single grid
// definition or an array of grid definitions
export const render = (gridDef: any) => {
  const input = ensureArray(gridDef);
  return compose(join('\n'), map(renderSingleGridDef))(input);
};
