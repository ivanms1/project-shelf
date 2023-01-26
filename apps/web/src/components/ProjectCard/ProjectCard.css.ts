import { style, styleVariants } from '@vanilla-extract/css';

export const projectCardStyle = style({
  width: 330,
});

export const imageContainerStyle = style({
  width: 330,
  height: 247,
  position: 'relative',
});

export const previewStyle = style({
  objectFit: 'cover',
  borderRadius: 5,
  transition: '0.2s all ease-in-out',

  selectors: {
    [`${imageContainerStyle}:hover &`]: {
      filter: 'brightness(70%)',
    },
  },
});

export const titleStyle = style({
  opacity: 0,
  position: 'absolute',
  bottom: 0,
  color: '#fff',
  transition: '0.2s all ease-in-out',

  selectors: {
    [`${imageContainerStyle}:hover &`]: {
      padding: 20,
      opacity: 1,
    },
  },
});

export const infoBoxStyle = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const authorBoxStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '0 10',
  cursor: 'pointer',
});

export const avatarStyle = style({
  borderRadius: '50%',
});

export const authorNameStyle = style({
  marginLeft: 8,
});

export const likesContainerStyle = style({
  display: 'flex',
  flexDirection: 'row',
});

export const heartStyleBase = style({
  width: 15,
  marginRight: 5,
  transition: 'fill .4s ease',
  ':hover': {
    fill: '#ea4c89',
  },
});

export const heartStyleVariants = styleVariants({
  liked: [heartStyleBase, { fill: '#ea4c89' }],
  unliked: [
    heartStyleBase,
    {
      fill: '#9e9ea7',
    },
  ],
});

export const likeCountStyle = style({
  width: 15,
});
