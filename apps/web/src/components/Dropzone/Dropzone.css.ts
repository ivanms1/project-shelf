import { style } from '@vanilla-extract/css';
import { media } from 'ui/variables.css';

export const containerStyle = style({
  position: 'relative',
  border: '2px dashed #e7e7e9',
  borderRadius: 5,
  width: 335,
  height: 251,
  display: 'flex',
  justifyContent: 'center',
  '@media': {
    [media.desktop]: {
      width: 800,
      height: 600,
    },
  },
});
