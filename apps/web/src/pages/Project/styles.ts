import { Button } from 'ui';

import { css, styled } from '@/stitches/stitches.config';

import CloseIcon from '@/assets/icons/close.svg';

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

export const modalStyles = css({
  height: 'calc(100vh - 30px)',
  marginTop: 30,
  maxHeight: 'none',
  width: '100vw',
  overflowY: 'auto',
  borderRadius: '12px 12px 0 0',
  paddingHorizontal: 360,
  paddingVertical: 40,
});

export const Header = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 40,
  paddingHorizontal: 100,
});

export const InfoBox = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  '& > p': {
    marginRight: 25,
  },
});

export const InfoText = styled('div', {
  '& > h1': {
    fontWeight: 600,
    fontSize: 16,
  },

  '& > p': {
    fontWeight: 400,
    fontSize: 14,
  },
});

export const ImageContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '85%',
  maxHeight: 730,
  marginBottom: 60,
});

export const imageStyles = css({
  borderRadius: 10,
});

export const Description = styled('p', {
  paddingHorizontal: 60,
});
