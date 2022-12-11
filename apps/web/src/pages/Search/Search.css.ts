import { style } from '@vanilla-extract/css';
import { media } from 'ui/variables.css';

export const headerStyle = style({
  width: '100vw',
  height: 357,
  backgroundImage: 'url(/assets/images/search-banner.jpeg)',
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
});

export const titleStyle = style({
  fontSize: 48,
  fontWeight: 700,
  marginBottom: 16,
  textAlign: 'center',
});

export const subtitleStyle = style({
  fontSize: 20,
  fontWeight: 400,
  textAlign: 'center',
});

export const searchFormStyle = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: -32,
  marginBottom: 32,
  padding: '0 16px',
});

export const searchInputStyle = style({
  height: 64,
  borderRadius: 8,
  background: '#fff',
  boxShadow: '0px 8px 20px rgb(0 0 0 / 6%)',
  fontSize: 16,
  padding: 24,
  width: '100%',
  maxWidth: 628,

  ':focus': {
    outline: 'none',
  },
});

export const resultsTitleStyle = style({
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 12,
  textAlign: 'center',
  textTransform: 'capitalize',
});

export const totalCountStyle = style({
  fontSize: 16,
  fontWeight: 400,
  color: '#6e6d7a',
  textAlign: 'center',
  marginBottom: 32,
});

export const projectsGridStyle = style({
  '@media': {
    [media.desktop]: {
      padding: '40px 100px',
    },
  },
});
