import { styled } from 'stitches/stitches.config';

export const Overlay = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  opacity: 0,
  position: 'absolute',
  bottom: 0,
  background: 'rgba(0,0,0,0.6)',
  fontWeight: 400,
  fontSize: '20px',
  zIndex: 999,

  variants: {
    editProfile: {
      edit: {
        borderRadius: '50%',
      },
    },
  },
});

export const Container = styled('div', {
  position: 'relative',
  borderRadius: 5,
  width: 335,
  height: 251,
  display: 'flex',
  justifyContent: 'center',
  border: '2px dashed #e7e7e9',

  variants: {
    editProfile: {
      edit: {
        border: '0',

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
        alignItems: 'center',
        cursor: 'pointer',
      },
    },
  },

  '@desktop': {
    width: 800,
    height: 800,
  },

  '&:hover': {
    [`& ${Overlay}`]: {
      opacity: 1,
      transition: '0.2s linear',
    },
  },
});
