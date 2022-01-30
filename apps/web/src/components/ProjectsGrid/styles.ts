import { styled } from '@stitches/react';

export const StyledProjectsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat( auto-fit, minmax(330px, 1fr) )',
});
