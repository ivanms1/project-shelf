import { styled } from 'stitches/stitches.config';

export const StyledProjectsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat( auto-fit, minmax(330px, 1fr) )',
});
