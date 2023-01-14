import { style } from '@vanilla-extract/css';
import { vars, media } from 'ui/variables.css';

export const likeButtonModalStyle = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'space-between',
  gap: 30,

  maxWidth: '500px',
  width: '100%',

  // This is for margin on small devices
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
  padding: 30,
  backgroundColor: vars.colors.bgPrimary,
  borderRadius: 8,
});

export const likeTextContent = style({
  fontSize: 15,
  border: `2px solid ${vars.colors.primary}`,
  padding: 10,
  borderRadius: 5,
});

export const signUpButtonStyle = style({
  width: '100%',
});

export const likeButtonContainer = style({
  backgroundColor: vars.colors.bgPrimary,
});
