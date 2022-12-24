import { style } from '@vanilla-extract/css';
import { media, vars } from 'ui/variables.css';

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
    [media.desktop]: {
      width: 200,
      height: 200,
    },
    [media.midDesktop]: {
      width: 200,
      height: 200,
    },
    [media.ipad]: {
      width: 160,
      height: 160,
    },
    [media.mobile]: {
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
  zIndex: vars.zIndex.loaderOverlay,
  borderRadius: '50%',

  selectors: {
    [`${containerStyle}:hover &`]: {
      opacity: 1,
      transition: 'all 0.2s linear',
    },
  },
});
