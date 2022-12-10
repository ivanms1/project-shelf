import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from 'ui/variables.css';

export const projectCardStyle = style({
  width: 330,
});

export const previewStyle = style({
  objectFit: 'cover',
  borderRadius: 5,
  transition: '0.2s all',
});

export const titleStyle = style({
  opacity: 0,
  position: 'absolute',
  bottom: 0,
  color: '#fff',
});

export const imageContainerStyle = style({
  width: 330,
  height: 247,
  position: 'relative',

  ':hover': {
    [`${previewStyle}`]: {
      filter: 'brightness(70%)',
    },
    [`${titleStyle}`]: {
      padding: 20,
      bottom: 0,
      opacity: 1,
      position: 'absolute',
      color: '#fff',
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
    fill: vars.colors.pink,
  },
});

export const heartStyleVariants = styleVariants({
  liked: [heartStyleBase, { fill: vars.colors.pink }],
  unliked: [
    heartStyleBase,
    {
      fill: vars.colors.gray,
    },
  ],
});

export const likeCountStyle = style({
  width: 15,
});
