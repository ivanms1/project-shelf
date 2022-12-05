import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../variables.css';

export const buttonBase = style({
  padding: '10px 16px',
  borderRadius: 8,
  fontSize: 15,
  cursor: 'pointer',

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  ':hover': {
    transform: 'scale(1.005)',
    transition: '0.1s linear',
  },

  ':active': {
    transform: 'translateY(2px) scale(1.02)',
  },
});

export const button = styleVariants({
  primary: [
    buttonBase,
    {
      backgroundColor: vars.colors.primary,
      color: 'white',
      ':hover': { backgroundColor: vars.colors.primaryLight },
    },
  ],
  secondary: [buttonBase, { backgroundColor: vars.colors.secondary }],
  ghost: [
    buttonBase,
    { background: 'transparent', padding: 0, borderRadius: 0 },
  ],
});
