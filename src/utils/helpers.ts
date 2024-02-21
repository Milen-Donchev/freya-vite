import replace from 'lodash/replace';
import find from 'lodash/find';
import get from 'lodash/get';
import startsWith from 'lodash/startsWith';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import isNil from 'lodash/isNil';
import identity from 'lodash/identity';
import cond from 'lodash/cond';
import isFunction from 'lodash/isFunction';

import type { Image } from '@types';

import { ValidationErrors } from '@models/ValidationErrors';

export const normalizePath = (path: string): string =>
  replace(path, /([^:/]|^)\/{2}(?!\/)/g, '$1/');

export const getValidationDefault = (name: string) => {
  const validation = find(ValidationErrors, ({ key }) => key === name);

  return validation ? validation.defaultTranslation : 'There is an unexpected error.';
};

export const extractInitials = (name: string) => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
};

/**
 * Returns optimized image size
 * @param image
 * @param sizeKey
 */
export const getImage = (image: Image, sizeKey?: string) => {
  if (sizeKey) {
    return get(image, sizeKey, get(image, 'source', ''));
  }

  return get(image, 'source', '');
};

export const awaitAll = (promises: Promise<any>[]) => Promise.all(promises);

/**
 * Returns active navigation item
 * @param currentHref
 * @param navItemHref
 * @param navItemChilren
 */
export const isActiveNavItem = (
  currentHref: string,
  navItemHref: string,
  navItemChildren: string[]
) => {
  if (startsWith(currentHref, navItemHref)) {
    return true;
  }

  if (!isEmpty(navItemChildren)) {
    return some(navItemChildren, (childHref: string) => startsWith(currentHref, childHref));
  }

  return false;
};

/**
 * executes onTrue/onFalse callbacks based on condition
 * @param predicate
 * @param onTrue
 * @param onFalse
 */
export const eventually = (predicate: any, onTrue: () => void, onFalse?: () => void): any => {
  onFalse = !isNil(onFalse) ? onFalse : identity;
  return cond([
    [(predicate: any) => predicate && !isNil(onTrue), onTrue],
    [(predicate: any) => !predicate && !isNil(onFalse), onFalse]
  ])(isFunction(predicate) ? predicate() : predicate);
};
