import { styled } from '@/stitches/stitches.config';
import Image from 'next/future/image';

export const StyledNavbar = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 30px',
  width: '100%',
  boxShadow: 'inset 0px -1px 0px #f3f3f4',
});

export const RightSection = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: 15,
  alignItems: 'center',
});

export const PopoverItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 0',
  background: 'white',
  zIndex: '99',
  borderRadius: '7px',
  boxShadow: '0px 10px 50px rgb(0 0 0/10%)',

  a: {
    display: 'flex',
  },

  span: {
    cursor: 'pointer',
    color: '#6e6d7a',
    padding: '12px 32px',
    width: '100%',

    '&:hover': {
      background: 'rgba(0,0,0,0.05)',
    },
  },
});

export const Avatar = styled(Image, {
  borderRadius: '50%',
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
});
