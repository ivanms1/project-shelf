import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '../variables.css';

globalStyle('.ReactModal__Overlay', {
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
});

globalStyle('.ReactModal__Overlay--after-open', {
  opacity: 1,
});

globalStyle('.ReactModal__Overlay--before-close', {
  opacity: 0,
});

export const overlayStyles = style({
  backgroundColor: vars.colors.modalOverlayBg,
  bottom: 0,
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: vars.zIndex.modalOverlay,
});

export const modalStyles = style({
  backgroundColor: '#fff',
  border: 'none',
  borderRadius: 15,
  left: '50%',
  outline: 0,

  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  transition: 'all 0.5s ease-in-out',
  padding: '1rem',

  ':focus': {
    outline: 0,
  },
});
