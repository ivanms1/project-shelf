import Image from 'next/image';
import { styled } from 'stitches/stitches.config';

import HeartIcon from '@/assets/icons/heart.svg';

export const StyledProjectCard = styled('div', {
  width: 330,
});

export const StyledPreview = styled(Image, {
  objectFit: 'cover',
  borderRadius: 5,
  transition: '0.2s all',
});

export const ImageContainer = styled('a', {
  width: 330,
  height: 247,
  position: 'relative',

  '& > p': {
    opacity: 0,
    position: 'absolute',
    color: '#fff',
  },

  '&:hover': {
    [`& ${StyledPreview}`]: {
      filter: 'brightness(70%)',
    },

    '& > p': {
      padding: 20,
      bottom: 0,
      opacity: 1,
      position: 'absolute',
      color: '#fff',
    },
  },
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
          fill: '$pink',
        },
      },
      false: {
        '&:hover > path': { fill: '$pink' },
        '& > path': {
          fill: '$gray',
        },
      },
    },
  },
});
