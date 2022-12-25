import { style } from '@vanilla-extract/css';
import { vars } from 'ui/variables.css';

export const baseLikeButtonStyle = style({
  width: 70,
});

export const notLikedButtonStyle = style({
  backgroundColor: vars.colors.gray,
  opacity: 0.5,
  ':hover': { backgroundColor: vars.colors.pink, color: 'white' },
});
