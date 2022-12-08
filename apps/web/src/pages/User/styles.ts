import Image from 'next/image';
import { styled } from 'stitches/stitches.config';
import { Button } from 'ui';

export const StyledUser = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  '@desktop': {
    padding: '40px 100px',
  },
});

export const FollowButton = styled(Button, {
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const StyledAvatar = styled(Image, {
  borderRadius: '50%',
});

export const StyledTitle = styled('p', {
  fontWeight: '600',
  fontSize: '22px',
  textTransform: 'capitalize',
});

export const StyledUserContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: 30,
  width: '100%',
  height: '100%',
  gap: '7px',

  '& > h4': {
    margin: 'auto',
  },
});

export const StyledProjectContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flex: 1,
  padding: '40px 100px',

  '@mobile': {
    padding: '40px 0px',
  },
});

export const StyledProjectsGrid = styled('div', {
  display: 'grid',
  gap: 50,
  gridTemplateColumns: 'repeat( auto-fit, minmax(330px, 1fr) )',
  justifyItems: 'center',
});
