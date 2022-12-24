import { style } from '@vanilla-extract/css';
import { media } from 'ui/variables.css';

export const buttonsContainerStyle = style({
  display: 'flex',
  padding: '25px 30px',
  justifyContent: 'space-between',
  top: 0,
  width: '100%',
  position: 'sticky',

  '@media': {
    [media.desktop]: {
      paddingBottom: 0,
    },
  },
});

export const formStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media': {
    [media.desktop]: {
      padding: '0 410px',
    },
  },
});

export const formTitleStyle = style({
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 16,
  textAlign: 'center',
});

export const formDescriptionStyle = style({
  marginBottom: 40,
  textAlign: 'center',
  color: '#6e6d7a',
});

export const titleInputStyle = style({
  fontSize: 24,
  padding: '40px 70px',
  width: '100%',
  fontWeight: 600,
});

export const descriptionInputStyle = style({
  fontSize: 20,
  padding: '40px 35px',
  height: '100%',
  width: 'calc(100% - 70px)',

  ':focus': {
    outline: 'none',
  },
});

export const uploadContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    [media.desktop]: {
      padding: 60,
      height: '100%',
    },
  },
});

export const imageIconStyle = style({
  width: 80,
});
