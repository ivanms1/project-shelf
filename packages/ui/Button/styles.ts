import { styled } from '@stitches/react';

export const StyledButton = styled('button', {
  padding: '10px 16px',
  borderRadius: 8,
  fontSize: 15,
  cursor: 'pointer',
  variants: {
    variant: {
      primary: {
        backgroundColor: '#ea4c89',
        color: '#fff',
        '&:hover': { backgroundColor: '#f082ac' },
      },
      secondary: { backgroundColor: '#F3F3F4' },
      ghost: { backgroundColor: 'transparent', padding: 0, borderRadius: 0 },
    },
  },
});
