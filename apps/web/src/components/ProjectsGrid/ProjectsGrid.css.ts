import { style } from '@vanilla-extract/css';

export const projectsGridStyle = style({
  display: 'grid',
  gap: 50,
  gridTemplateColumns: 'repeat( auto-fit, minmax(330px, 1fr) )',
  justifyItems: 'center',
});

export const loaderContainerStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const loaderStyles = style({
  borderColor: 'rgba(0, 0, 0, 0.2)',
  borderLeft: '0.5em solid #ffffff',
});
