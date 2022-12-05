import { style } from '@vanilla-extract/css';

import { vars } from '../variables.css';

export const containerStyles = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const labelStyles = style({
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 5,
});

export const errorMessageStyle = style({
  color: vars.colors.errorRed,
  position: 'absolute',
  bottom: '-23px',
  fontSize: 14,
  right: '0',
});
