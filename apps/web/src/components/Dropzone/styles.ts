import { styled } from 'stitches/stitches.config';

export const Container = styled('div', {
  position: 'relative',
  border: '2px dashed #e7e7e9',
  borderRadius: 5,
  width: 335,
  height: 251,
  display: 'flex',
  justifyContent: 'center',

  variants: {
    editProfile: {
      true: {
        '@desktop': {
          width: 200,
          height: 200,
        },
        '@midDesktop': {
          width: 200,
          height: 200,
        },
        '@ipad': {
          width: 160,
          height: 160,
        },
        '@mobile': {
          width: 160,
          height: 160,
        },
        borderRadius: '50%',
        alignItems: 'center',
        cursor: 'pointer',
      },
    },
  },

  '@desktop': {
    width: 800,
    height: 800,
  },
});
