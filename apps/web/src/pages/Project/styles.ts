import Image from 'next/image';
import { Button } from 'ui';

import { css, styled } from '@/stitches/stitches.config';

import CloseIcon from '@/assets/icons/close.svg';
import ExtLinkIcon from '@/assets/icons/ext-link.svg';
import GithubIcon from '@/assets/icons/github.svg';

export const CloseButton = styled(Button, {
  position: 'absolute',
  right: 15,
  top: 15,
  zIndex: 'calc($modalOverlayIndex + 1)',
});

export const StyledCloseIcon = styled(CloseIcon, {
  height: 20,
  width: 20,
  stroke: '#dbdbde',
  '&:hover': {
    stroke: 'white',
  },
});
export const StyledExtLinkIcon = styled(ExtLinkIcon, {
  height: 20,
  width: 20,
  marginRight: 10,
});
export const StyledGithubIcon = styled(GithubIcon, {
  height: 22,
  width: 22,
  marginRight: 10,
  fill: 'gray',
});

export const modalStyles = css({
  marginTop: 30,
  maxHeight: 'none',
  width: '100vw',
  overflowY: 'auto',
  borderRadius: 12,

  '@desktop': {
    height: 'calc(100vh - 30px)',
    paddingHorizontal: 360,
    paddingVertical: 40,
    borderRadius: '12px 12px 0 0',
  },
});

export const Header = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 40,

  '@desktop': {
    paddingHorizontal: 100,
  },
});

export const InfoBox = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  '& > p': {
    marginRight: 25,
  },
});

export const StyledAvatar = styled(Image, {
  borderRadius: '50%',
});

export const InfoText = styled('div', {
  marginLeft: 15,
  '& > h1': {
    fontWeight: 600,
    fontSize: 16,
  },

  '& > p': {
    fontWeight: 400,
    fontSize: 14,
  },
});
export const StyledLike = styled('div', {
  padding: '10px 16px',
  borderRadius: 8,
  variants: {
    isliked: {
      true: {
        backgroundColor: '$pink',
        color: 'white',
      },
      false: {
        backgroundColor: '$gray',
        opacity: 0.5,
        '&:hover': { backgroundColor: '$pink', color: 'white' },
      },
    },
  },
});
export const ImageContainer = styled('div', {
  position: 'relative',
  width: 335,
  height: 251,
  maxHeight: 730,
  marginBottom: 40,

  '@desktop': {
    width: '100%',
    height: '85%',
    paddingHorizontal: 60,
  },
});

export const imageStyles = css({
  borderRadius: 10,
});

export const DescriptionContainer = styled('div', {
  '@desktop': {
    paddingHorizontal: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
});
export const HStack = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  padding: '5px 0',
});
export const Description = styled('p', {
  '@desktop': {
    paddingVertical: 5,
  },
});

export const StyledLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
});
