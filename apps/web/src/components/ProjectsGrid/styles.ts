import { styled } from 'stitches/stitches.config';

export const StyledProjectsGrid = styled('div', {
  display: 'grid',
  gap: 50,
  gridTemplateColumns: 'repeat( auto-fit, minmax(330px, 1fr) )',
  justifyItems: 'center',
  width: '100%',
});

export const LoaderContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const loaderStyles = {
  borderColor: 'rgba(0, 0, 0, 0.2)',
  borderLeft: '0.5em solid #ffffff',
};
