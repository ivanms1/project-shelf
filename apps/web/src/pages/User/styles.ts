import Image from 'next/image';
import { styled } from 'stitches/stitches.config';

export const StyledUser = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#F9F8FD',
  padding: 26,
  height: '100vh',
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
});

export const StyledCard = styled('div', {
  padding: 20,
  backgroundColor: '#fff',
});
export const StyledProjectContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  padding: 26,
});
