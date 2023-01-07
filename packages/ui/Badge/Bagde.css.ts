import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../variables.css';

const badgeBase = style({
  padding: '10px 16px',
  borderRadius: 8,
  fontSize: 15,
  cursor: 'pointer',

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  ':active': {
    transform: 'translateY(2px)',
  },
});

export const badgeStyle = styleVariants({
  solid: [
    badgeBase,
    {
      backgroundColor: vars.colors.defaultColor,
    },
  ],
  outline: [
    badgeBase,
    {
      backgroundColor: 'transparent',
      border: '1px solid black',
    },
  ],
});
