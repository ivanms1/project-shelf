import { style } from '@vanilla-extract/css';
import { media } from 'ui/variables.css';

export const signinBox = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column-reverse',
  backgroundColor: '#F9F8FD',
  justifyContent: 'space-between',
  padding: 26,
  '@media': {
    [media.desktop]: {
      flexDirection: 'row',
      padding: '50px 100px',
    },
  },
});

export const contentBoxStyle = style({
  '@media': {
    [media.desktop]: {
      width: '45%',
    },
  },
});

export const titleStyle = style({
  fontSize: 45,
  marginBottom: 30,
});

export const descriptionStyle = style({
  marginBottom: 30,
});

export const gridStyle = style({
  '@media': {
    [media.desktop]: {
      padding: '40px 100px',
    },
  },
});
