import { styled } from 'stitches/stitches.config';
import Image from 'next/image';

export const StyledMember = styled('div', {});

export const Card = styled('div', {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  textAlign: 'left',
  backgroundColor: '#2451b3',
  paddingLeft: '2em',
  paddingRight: '2em',
  margin: '10px',
  borderRadius: '12px',
  border: '1px solid grey',
  flexBasis: '370px',
  height: '130px',
  color: 'white',
  fontSize: '11pt',
  '&:hover': {
    border: '1px solid var(--colors-primary)',
  },
});

export const Wrapper = styled('div', {
  minWidth: '5.5em',
});

export const ProfileImage = styled(Image, {
  borderRadius: '50%',
  marginRight: '5px',
});
export const Title = styled('h1', {
  fontSize: '13pt',
  paddingTop: '0.5em',
});
export const CardLinks = styled('div', {
  paddingTop: '8px',
  paddingBottom: '8px',
});
