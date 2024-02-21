import cloneDeep from 'lodash/cloneDeep';
import { Predicate } from '@types';

export const findValueDeep = <T extends any[]>(
  data: T,
  predicate: Predicate<T[number]>,
  childrenPath: string = 'children'
): T[number] | null => {
  let foundItem;
  const s = (data: T, predicate: Predicate<T[number]>): T[number] | null =>
    data.find((x: T[number]) =>
      predicate(x) ? (foundItem = x) : x[childrenPath] ? s(x[childrenPath], predicate) : null
    );
  s(data, predicate);
  return foundItem ?? null;
};

export const insertIntoPosition = (
  array: any[],
  startIndex: number,
  element: any,
  afterElementAtIndex?: boolean
) => {
  const arrayCopy = cloneDeep(array);
  arrayCopy.splice(afterElementAtIndex ? startIndex + 1 : startIndex, 0, element);
  return arrayCopy;
};
