import multiply from 'lodash/fp/multiply';
import isNil from 'lodash/fp/isNil';
import curry from 'lodash/fp/curry';
import mapValues from 'lodash/fp/mapValues';
import isArray from 'lodash/fp/isArray';

export const fromObject = curry((template: any, input: any) =>
  mapValues((f: any) => f(input))(template)
);

export const ensureArray = (v: any) => (isArray(v) ? v : [v]);

export const prependString = curry((prefix: any, str: any) => (isNil(prefix) ? str : prefix + str));

export const seconds = multiply(1000);
