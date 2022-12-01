import { styled } from '../stitches.config';

export const StyledButton = styled('button', {
  padding: '10px 16px',
  borderRadius: 8,
  fontSize: 15,
  cursor: 'pointer',
  height: '100%',
  width: 'max-content',
  fontFamily: 'Poppins, sans-serif',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  '&:hover': {
    transform: 'scale(1.005)',
    transition: '0.1s linear',
  },

  '&:active': {
    transform: 'translateY(2px) scale(1.02)',
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
    fontSize: {
      400: {
        fontWeight: 400,
      },
      500: {
        fontWeight: 400,
      },
      800: {
        fontWeight: 600,
      },
    },
    width: {
      '100%': {
        width: '100%',
      },
    },
  },
});
