import Image from 'next/image';
import { styled } from 'stitches/stitches.config';
import { Button } from 'ui';
export const StyledUser = styled('div', {});
export const FollowButton = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
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
    marginRight: 'auto',
    marginTop: '5px',
    justifyContent: 'center',
    display: 'flex',
    alignSelf: 'flex-start',
    textAlign: 'center',
    flexDirection: 'column',
  },
});

export const StyledProjectsGrid = styled('div', {
  display: 'grid',
  gap: 50,
  gridTemplateColumns: 'repeat( auto-fit, minmax(330px, 1fr) )',
  justifyItems: 'center',
});
