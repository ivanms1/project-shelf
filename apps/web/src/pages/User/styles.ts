import Image from 'next/image';
import { styled } from 'stitches/stitches.config';
import { Button } from 'ui';

export const StyledUser = styled('div', {
  '@desktop': {
    padding: '40px 100px',
  },
});

export const FollowButton = styled(Button, {
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '-22px',
  marginBottom: '1px',
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
  '& > h4': {
    marginLeft: 'auto',
    marginTop: '5px',
    textAlign: 'center',
  },
});

export const StyledProjectsGrid = styled('div', {
  display: 'grid',
  gap: 50,
  gridTemplateColumns: 'repeat( auto-fit, minmax(330px, 1fr) )',
  justifyItems: 'center',
});
