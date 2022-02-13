import { styled } from '../stitches.config';

export const StyledBadge = styled('button', {
  padding: '10px 16px',
  borderRadius: 10,
  fontSize: 15,
  variants: {
    variant: {
      solid: {
        backgroundColor: '$default',
      },

      outline: { backgroundColor: 'transparent', boder: '1px solid black' },
    },
  },
});
