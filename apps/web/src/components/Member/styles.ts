import { styled } from 'stitches/stitches.config';
import Image from 'next/image';

export const StyledMember = styled('div', {});

export const Card = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  borderRadius: '7px',
  height: '280px',
  width: '250px',
  color: 'black',
  boxShadow: '1px 1px 20px 0px rgba(45, 78, 255, 0.15)',

  '&:hover': {
    boxShadow: '10px 10px 40px 4px rgba(45, 78, 255, 0.15)',
  },
});

export const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

export const ImageContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ProfileImage = styled(Image, {
  display: 'block',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
});

export const Title = styled('span', {
  width: '100%',
  textAlign: 'center',
  display: 'block',
  fontSize: '23px',
});

export const Username = styled('span', {
  fontSize: '15px',
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  padding: '10px 0',
  justifyContent: 'center',
});

export const CardLinks = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

export const StyledLink = styled('a', {});
