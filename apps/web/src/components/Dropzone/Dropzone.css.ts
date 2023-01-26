import { style } from '@vanilla-extract/css';

export const containerStyle = style({
  position: 'relative',
  border: '2px dashed #e7e7e9',
  borderRadius: 5,
  width: 335,
  height: 251,
  display: 'flex',
  justifyContent: 'center',
  '@media': {
    'screen and (min-width: 1296px)': {
      width: 800,
      height: 600,
    },
  },
});
