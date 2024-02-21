import get from 'lodash/fp/get';

interface Breakpoints extends Array<string> {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export const breakpoints = ['0', '568px', '768px', '992px', '1200px', '1400px'] as Breakpoints;

const mediaQueries = {
  min: {
    xs: `@media screen and (min-width: ${breakpoints[0]})`,
    sm: `@media screen and (min-width: ${breakpoints[1]})`,
    md: `@media screen and (min-width: ${breakpoints[2]})`,
    lg: `@media screen and (min-width: ${breakpoints[3]})`,
    xl: `@media screen and (min-width: ${breakpoints[4]})`,
    xxl: `@media screen and (min-width: ${breakpoints[5]})`
  },
  max: {
    xs: `@media screen and (max-width: ${breakpoints[0]})`,
    sm: `@media screen and (max-width: ${breakpoints[1]})`,
    md: `@media screen and (max-width: ${breakpoints[2]})`,
    lg: `@media screen and (max-width: ${breakpoints[3]})`,
    xl: `@media screen and (max-width: ${breakpoints[4]})`,
    xxl: `@media screen and (max-width: ${breakpoints[5]})`
  }
};

const mediaVerticalQueries = {
  min: {
    xs: `@media screen and (min-height: ${breakpoints[0]})`,
    sm: `@media screen and (min-height: ${breakpoints[1]})`,
    md: `@media screen and (min-height: ${breakpoints[2]})`,
    lg: `@media screen and (min-height: ${breakpoints[3]})`,
    xl: `@media screen and (min-height: ${breakpoints[4]})`,
    xxl: `@media screen and (min-height: ${breakpoints[5]})`
  },
  max: {
    xs: `@media screen and (max-height: ${breakpoints[0]})`,
    sm: `@media screen and (max-height: ${breakpoints[1]})`,
    md: `@media screen and (max-height: ${breakpoints[2]})`,
    lg: `@media screen and (max-height: ${breakpoints[3]})`,
    xl: `@media screen and (max-height: ${breakpoints[4]})`,
    xxl: `@media screen and (max-height: ${breakpoints[5]})`
  }
};

export const getBreakpointMin = (prop: any) => get(`${prop}`)(mediaQueries.min);
export const getBreakpointMax = (prop: any) => get(`${prop}`)(mediaQueries.max);

export const getBreakpointVerticalMax = (prop: any) => get(`${prop}`)(mediaVerticalQueries.max);

export const getPortraitOnlyQuery = () =>
  `@media (max-height: 568px) and (min-width: 768px) and (orientation: landscape)`;
