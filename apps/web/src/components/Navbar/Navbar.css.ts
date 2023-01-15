import { style } from '@vanilla-extract/css';

export const navbarStyle = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 30px',
  width: '100%',
  boxShadow: 'inset 0px -1px 0px #f3f3f4',
});

export const logoStyle = style({
  cursor: 'pointer',
});

export const rightSectionStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 15,
  alignItems: 'center',
});

export const popoverItemsStyle = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 0',
  background: 'white',
  zIndex: 99,
  boxShadow: '0px 10px 50px rgb(0 0 0/10%)',
});

export const popoverItemStyle = style({
  color: '#6e6d7a',
  padding: '12px 32px',
  width: '100%',
  textAlign: 'center',
  background: 'white',
  borderRadius: 0,

  ':hover': {
    background: 'rgba(0,0,0,0.05)',
  },
});

export const avatarStyle = style({
  borderRadius: '50%',
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
});

export const flagStyle = style({
  width: 25,
});
