export const vw = (px: number) => `${(px / 360) * 100}vw`;

export const breakpoints = {
  xs: 320,
  sm: 360,
  md: 374,
  lg: 414,
  xl: 430,
};

export const media = {
  xs: `(max-width: ${breakpoints.xs}px)`,
  sm: `(max-width: ${breakpoints.sm}px)`,
  md: `(max-width: ${breakpoints.md}px)`,
  lg: `(max-width: ${breakpoints.lg}px)`,
  xl: `(max-width: ${breakpoints.xl}px)`,
  short: `(max-height: 600px)`,
  veryShort: `(max-height: 500px)`,
};
