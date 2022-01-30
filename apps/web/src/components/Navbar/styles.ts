import { styled, css } from '@stitches/react';

export const StyledNavbar = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '15px 30px',
  width: '100%',
});

export const RightSection = styled('div', {
  display: 'flex',
  flexDirection: 'row',
});

export const searchButtonStyles = css({
  marginRight: 15,
});
