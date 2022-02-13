import { styled } from 'stitches/stitches.config';

export const StyledMember = styled('div', {});

export const Card = styled('div', {
  height: '300px',
  width: '350px',
  marginBottom: 40,
  backgroundColor: 'grey',

  '@desktop': {
    paddingHorizontal: 100,
  },
});
