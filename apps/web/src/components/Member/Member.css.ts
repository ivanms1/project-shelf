import { style } from '@vanilla-extract/css';

export const cardStyle = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  borderRadius: '7px',
  height: '280px',
  width: '250px',
  color: 'black',
  boxShadow: '1px 1px 20px 0px rgba(45, 78, 255, 0.15)',

  ':hover': {
    boxShadow: '10px 10px 40px 4px rgba(45, 78, 255, 0.15)',
  },
});

export const imageContainerStyle = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const profileImageStyle = style({
  display: 'block',
  borderRadius: '50%',
});

export const wrapperStyle = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

export const titleStyle = style({
  width: '100%',
  textAlign: 'center',
  display: 'block',
  fontSize: '23px',
});

export const usernameStyle = style({
  fontSize: '15px',
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  padding: '10px 0',
  justifyContent: 'center',
});

export const cardLinksStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});
