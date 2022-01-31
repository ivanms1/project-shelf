import { css, styled } from '@/stitches/stitches.config';

export const StyledHome = styled('div', {});

export const StyledSignInBox = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F9F8FD',
  justifyContent: 'space-between',
  padding: '50px 100px',
});

export const StyledContentBox = styled('div', {
  width: '40%',
  '& > h1': {
    fontSize: 45,
    marginBottom: 30,
  },

  '& > p': {
    marginBottom: 30,
  },
});

export const GridContainer = styled('div', {
  padding: '40px 100px',
});

export const searchButtonStyles = css({
  marginRight: 15,
});
