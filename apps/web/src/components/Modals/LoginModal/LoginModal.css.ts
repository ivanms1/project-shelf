import { style } from '@vanilla-extract/css';

export const likeButtonModalStyle = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'space-between',
  gap: 30,
  padding: 0,
  maxWidth: 550,
  width: '100%',

  '@media': {
    'screen and (max-width: 672px)': {
      maxWidth: '350px',
    },
  },
});

export const likeContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 18,
  gap: 5,

  borderTopLeftRadius: 'inherit',
  borderTopRightRadius: 'inherit',
  backgroundColor: '#f082ac',

  '@media': {
    'screen and (max-width: 672px)': {
      flexDirection: 'column',
      gap: 20,
    },
  },
});

export const likeContentInnerTextContainer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',

  gap: 10,

  '@media': {
    'screen and (max-width: 672px)': {
      flexDirection: 'column',
    },
  },
});

export const projectShelfImage = style({
  width: 150,
  height: 150,

  '@media': {
    'screen and (max-width: 672px)': {
      width: 150,
      height: 150,
    },
  },
});

export const likeTextContent = style({
  display: 'block',
  width: '100%',
  fontSize: 15,
  border: `2px solid #f2f3fc`,
  padding: 10,
  borderRadius: 5,
});

export const signUpButtonStyle = style({
  width: '100%',
});

export const likeButtonContainer = style({
  padding: 10,
  margin: 10,
});
