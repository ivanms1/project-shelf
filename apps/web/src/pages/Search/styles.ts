import { styled } from '@/stitches/stitches.config';

export const StyledSearch = styled('div', {});

export const Header = styled('div', {
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

export const Title = styled('h1', {
  fontSize: 48,
  fontWeight: 700,
  marginBottom: 16,
  textAlign: 'center',
});

export const Subtitle = styled('p', {
  fontSize: 20,
  fontWeight: 400,
  textAlign: 'center',
});

export const SearchForm = styled('form', {
  display: 'flex',
  justifyContent: 'center',
  marginTop: -32,
  marginBottom: 32,
  padding: '0 16px',
});

export const SearchInput = styled('input', {
  height: 64,
  borderRadius: 8,
  background: '#fff',
  boxShadow: '0px 8px 20px rgb(0 0 0 / 6%)',
  fontSize: 16,
  padding: 24,
  width: '100%',
  maxWidth: 628,
});

export const ResultsTitle = styled('h1', {
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 12,
  textAlign: 'center',
  textTransform: 'capitalize',
});

export const TotalCount = styled('p', {
  fontSize: 16,
  fontWeight: 400,
  color: '#6e6d7a',
  textAlign: 'center',
  marginBottom: 32,
});
