import { style } from '@vanilla-extract/css';

export const containerStyle = style({
  position: 'relative',
  borderRadius: 5,
  width: 335,
  height: 251,
  display: 'flex',
  justifyContent: 'center',
  border: '0',
  alignItems: 'center',
  cursor: 'pointer',

  '@media': {
    'screen and (min-width: 1296px)': {
      width: 200,
      height: 200,
    },
    'screen and (min-width: 990px)': {
      width: 200,
      height: 200,
    },
    'screen and (max-width: 990px)': {
      width: 160,
      height: 160,
    },
    'screen and (max-width: 672px)': {
      width: 160,
      height: 160,
    },
  },
});

export const overlayStyle = style({
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
  zIndex: '999',
  borderRadius: '50%',

  selectors: {
    [`${containerStyle}:hover &`]: {
      opacity: 1,
      transition: 'all 0.2s linear',
    },
  },
});
