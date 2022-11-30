import { styled } from 'stitches/stitches.config';

export const MainWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
});

export const Container = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',

  '@desktop': {
    maxWidth: '800px',
  },

  '@midDesktop': {
    maxWidth: '800px',
  },

  '@ipad': {
    maxWidth: '80%',
  },

  '@mobile': {
    maxWidth: '100%',
  },
});

export const FormDetails = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: '20px',
  padding: 20,
});

export const SubText = styled('span', {
  color: '#9e9ea7',
  fontSize: '14px',
});

export const ProfileImageWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
  width: '100%',
  padding: '20px 20px 20px 20px',

  img: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    overflow: 'hidden',
    borderRadius: '50%',
  },

  '@desktop': {
    display: 'flex',
    flexDirection: 'row',
  },

  '@ipad': {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
});

export const ProfileImageButtonWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: 'max-content',

  '@desktop': {
    gap: 20,
  },

  '@midDesktop': {
    gap: 20,
  },

  '@ipad': {
    gap: 20,
    justifyContent: 'space-between',
  },
});

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const FlexRowWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
});

export const SaveProfileWrapper = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
});
