import { style } from '@vanilla-extract/css';

export const baseLikeButtonStyle = style({
  width: 70,
});

export const notLikedButtonStyle = style({
  backgroundColor: '#F9F8FD',
  opacity: 0.5,
  ':hover': { backgroundColor: 'pink', color: 'white' },
});
