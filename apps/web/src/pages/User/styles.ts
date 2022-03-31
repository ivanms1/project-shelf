import Image from 'next/image';
import { styled } from 'stitches/stitches.config';
import { Button } from 'ui';
export const StyledUser = styled('div', {
});
export const FollowButton = styled(Button, {
  position: 'absolute',
  alignItems: 'center',
  top: '55%',
  left: '47%',
  margintop: '25px',
  marginleft: '-100px',
  fontFamily: 'sans-serif',
});
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
    padding: '50px 100px',
    '& > p': {
      position: 'absolute',
      
      left: 340,
      fontSize: '1.1rem',
      top: '7.7rem',
      bottom: '1rem',
      padding: '19%',
      fontFamily: 'sans-serif',
    },
  },
});

export const StyledProjectsGrid = styled('div', {
  display: 'grid',
  gap: 50,
  gridTemplateColumns: 'repeat( auto-fit, minmax(330px, 1fr) )',
  justifyItems: 'center',
});
