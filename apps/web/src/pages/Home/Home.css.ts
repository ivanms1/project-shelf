import { style } from '@vanilla-extract/css';

export const signinBox = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column-reverse',
  backgroundColor: '#F9F8FD',
  justifyContent: 'space-between',
  padding: 26,
  '@media': {
    'screen and (min-width: 1296px)': {
      flexDirection: 'row',
      padding: '50px 100px',
    },
  },
});

export const contentBoxStyle = style({
  '@media': {
    'screen and (min-width: 1296px)': {
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
  padding: '40px 0',
  '@media': {
    'screen and (min-width: 1296px)': {
      padding: '40px 100px',
    },
  },
});
