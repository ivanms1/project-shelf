import { style } from '@vanilla-extract/css';

export const userStyle = style({
  '@media': {
    'screen and (min-width: 1296px)': {
      padding: '40px 100px',
    },
  },
});

export const followButtonStyle = style({
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '-22px',
  marginBottom: '1px',
});

export const avatarStyle = style({
  borderRadius: '50%',
});

export const titleStyle = style({
  fontWeight: 'bold',
});

export const userContainerStyle = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: 26,
  width: '100%',
});

export const projectContainerStyle = style({
  width: '100%',
});

export const followerCountStyle = style({
  marginLeft: 'auto',
  marginTop: '5px',
  textAlign: 'center',
  marginBottom: 32,
});

export const projectsGridStyle = style({
  display: 'grid',
  gap: 50,
  gridTemplateColumns: 'repeat( auto-fit, minmax(330px, 1fr) )',
  justifyItems: 'center',
});
