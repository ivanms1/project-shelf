import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../variables.css';

export const button = recipe({
  base: {
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
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.colors.primary,
        color: 'white',
        ':hover': { backgroundColor: vars.colors.primaryLight },
      },

      secondary: { backgroundColor: vars.colors.secondary },
      ghost: { background: 'transparent', padding: 0, borderRadius: 0 },
    },
  },
});
