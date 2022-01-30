import { styled, css } from '@stitches/react';

export const StyledNavbar = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 30px',
  width: '100%',
  boxShadow: 'inset 0px -1px 0px #f3f3f4',
});

export const RightSection = styled('div', {
  display: 'flex',
  flexDirection: 'row',
});

export const searchButtonStyles = css({
  marginRight: 15,
});
