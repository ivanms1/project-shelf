import { styled } from '../stitches.config';

export const StyledButton = styled('button', {
  padding: '10px 16px',
  borderRadius: 8,
  fontSize: 15,
  cursor: 'pointer',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
        '&:hover': { backgroundColor: '$primaryLight' },

        '&:disabled': {
          '&:hover': { backgroundColor: '$primary' },
        },
      },
      secondary: { backgroundColor: '$secondary' },
      ghost: { backgroundColor: 'transparent', padding: 0, borderRadius: 0 },
    },
  },
});
