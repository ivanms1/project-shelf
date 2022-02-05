import { styled } from 'stitches/stitches.config';

export const LoaderContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  height: '100vh',
  width: '100vw',
});

export const loaderStyles = {
  borderColor: 'rgba(0, 0, 0, 0.2)',
  borderLeft: '0.5em solid #ffffff',
};
