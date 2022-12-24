import { style } from '@vanilla-extract/css';
import { media } from 'ui/variables.css';

export const mainWrapperStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
});

export const profileImageWrapperStyle = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 20,
  width: '100%',
  padding: 20,

  '@media': {
    [media.desktop]: {
      display: 'flex',
      flexDirection: 'row',
    },

    [media.ipad]: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
  },
});

export const profileImageStyle = style({
  objectFit: 'cover',
  borderRadius: '50%',
});

export const profileImageButtonWrapperStyle = style({
  display: 'flex',
  flexDirection: 'row',
  width: 'max-content',

  '@media': {
    [media.desktop]: {
      gap: 20,
    },
    [media.midDesktop]: {
      gap: 20,
    },
    [media.ipad]: {
      gap: 20,
      justifyContent: 'space-between',
    },
  },
});

export const formStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',

  '@media': {
    [media.desktop]: {
      maxWidth: '800px',
    },

    [media.midDesktop]: {
      maxWidth: '800px',
    },

    [media.ipad]: {
      maxWidth: '80%',
    },

    [media.mobile]: {
      maxWidth: '100%',
    },
  },
});

export const formDetailsStyle = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: 20,
  padding: 20,
});

export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const subTextStyle = style({
  color: '#9e9ea7',
  fontSize: 14,
});

export const inputsContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
});

export const saveProfileWrapper = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
});
