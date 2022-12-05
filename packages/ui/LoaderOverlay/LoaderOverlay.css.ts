import { style } from '@vanilla-extract/css';
import { vars } from '../variables.css';

export const containerStyle = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0,0,0,0.75)',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: vars.zIndex.loaderOverlay,
});
