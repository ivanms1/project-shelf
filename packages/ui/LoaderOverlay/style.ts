import { styled } from '../stitches.config';

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0,0,0,0.75)',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: 999,
});
