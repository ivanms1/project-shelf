import { styled } from 'stitches/stitches.config';

export const Container = styled('div', {
  position: 'relative',
  border: '2px dashed #e7e7e9',
  borderRadius: 5,
  width: 335,
  height: 251,
  display: 'flex',
  justifyContent: 'center',

  '@desktop': {
    width: 800,
    height: 600,
  },
});
