import { style, keyframes, styleVariants } from '@vanilla-extract/css';

const load = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const base = style({
  borderRadius: '50%',
  fontSize: 8,
  position: 'relative',
  textIndent: '-9999em',
  transform: 'translateZ(0)',
  borderStyle: 'solid',
  animation: `${load} 1.1s infinite linear`,
  borderColor: 'rgba(255, 255, 255, 0.2)',
});

export const loaderStyles = styleVariants({
  sm: [
    base,
    {
      width: '2em',
      height: '2em',
      borderWidth: '0.4em',
      borderLeft: '0.4em solid #ffffff',
      ':after': {
        borderRadius: '50%',
        width: '2em',
        height: '2em',
      },
    },
  ],
  md: [
    base,
    {
      width: '5em',
      height: '5em',
      borderWidth: '0.5em',
      borderLeft: '0.5em solid #ffffff',

      ':after': {
        borderRadius: '50%',
        width: '5em',
        height: '5em',
      },
    },
  ],
  lg: [
    base,
    {
      width: '10em',
      height: '10em',
      borderWidth: '1.1em',
      borderStyle: 'solid',
      borderLeft: '1.1em solid #ffffff',

      ':after': {
        borderRadius: '50%',
        width: '10em',
        height: '10em',
      },
    },
  ],
});
