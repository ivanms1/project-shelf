import { style } from '@vanilla-extract/css';
import { vars, media } from 'ui/variables.css';

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
    [media.mobile]: {
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
  backgroundColor: vars.colors.primaryLight,

  '@media': {
    [media.mobile]: {
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
    [media.mobile]: {
      flexDirection: 'column',
    },
  },
});

export const projectShelfImage = style({
  width: 150,
  height: 150,

  '@media': {
    [media.mobile]: {
      width: 150,
      height: 150,
    },
  },
});

export const likeTextContent = style({
  display: 'block',
  width: '100%',
  fontSize: 15,
  border: `2px solid ${vars.colors.bgPrimary}`,
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
