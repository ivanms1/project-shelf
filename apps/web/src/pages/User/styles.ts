import Image from 'next/image';
import { styled } from 'stitches/stitches.config';
export const StyledUser = styled('div', {});

export const StyledAvatar = styled(Image, {
  borderRadius: '50%',
});
export const StyledTitle = styled('p', {
  fontWeight: 'bold',
});
export const StyledUserContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: 26,
  width: '100%',
});

export const StyledProjectContainer = styled('div', {
  width: '100%',
  '@desktop': {
    padding: '40px 100px',
  },
});

export const StyledProjectsGrid = styled('div', {
  display: 'grid',
  gap: 50,
  gridTemplateColumns: 'repeat( auto-fit, minmax(330px, 1fr) )',
  justifyItems: 'center',
});
