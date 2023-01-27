import { style } from '@vanilla-extract/css';

export const detailsFormModalStyle = style({
  minWidth: '100%',
  '@media': {
    'screen and (min-width: 1296px)': {
      padding: 50,
      minWidth: 600,
    },
  },
});

export const titleStyle = style({
  fontSize: 24,
  fontWeight: 600,
  marginBottom: 30,
});

export const inputsContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  marginBottom: 45,
});

export const buttonsContainerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const publishButtonStyle = style({
  display: 'flex',
  justifyContent: 'center',
  minWidth: 100,
});
