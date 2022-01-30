import Image from 'next/image';
import { styled } from '@stitches/react';

import HeartIcon from '@/assets/icons/heart.svg';

export const StyledProjectCard = styled('div', {
  width: 330,
});

export const StyledPreview = styled(Image, {
  objectFit: 'cover',
  borderRadius: 5,
});

export const InfoBox = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const StyledAvatar = styled(Image, {
  objectFit: 'cover',
  borderRadius: '50%',
});

export const LikesContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
});

export const StyledHeart = styled(HeartIcon, {
  width: 15,
  marginRight: 5,
  variants: {
    isliked: {
      true: {
        '& > path': {
          fill: '#ea4c89',
        },
      },
      false: {
        '&:hover > path': { fill: '#ea4c89' },
        '& > path': {
          fill: '#9e9ea7',
        },
      },
    },
  },
});
