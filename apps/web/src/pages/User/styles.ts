import Image from 'next/image';
import { styled } from 'stitches/stitches.config';

export const StyledUser = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 26,
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
export const StyledProject = styled(Image, {
  borderRadius: 10,
});
export const StyledProjectContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: 20,

  justifyContent: 'space-between',
  padding: 26,
});
