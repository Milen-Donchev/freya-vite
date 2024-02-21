import reduce from 'lodash/fp/reduce';
import concat from 'lodash/fp/concat';
import zero from './0';
import one from './1';
import two from './2';
import three from './3';
import four from './4';

export default reduce((acc: any, a: any) => concat(acc)(a), [])([zero, one, two, three, four]);
