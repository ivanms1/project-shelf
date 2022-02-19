import { styled } from 'stitches/stitches.config';
import Image from 'next/image';

export const StyledMember = styled('div', {});

export const Card = styled('div', {
  height: '300px',
  width: '350px',
  marginBottom: 40,
  backgroundColor: 'black',
  color: 'white',
  '& > *': {
    marginBottom: '9px',
  },

  '@desktop': {
    paddingHorizontal: 100,
  },
});

export const ProfileImage = styled(Image, {
  borderRadius: '50%',
});
export const H1 = styled('h1', {
  fontSize: '40pt',
});
