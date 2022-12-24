import { style } from '@vanilla-extract/css';
import { media, vars } from 'ui/variables.css';

export const closeButtonStyle = style({
  position: 'absolute',
  right: 15,
  top: 15,
  zIndex: `calc(${vars.zIndex.modalOverlay} + 1)`,
});

export const closeIconStyle = style({
  height: 20,
  width: 20,
  stroke: '#dbdbde',
  ':hover': {
    stroke: 'white',
  },
});

export const extLinkIconStyle = style({
  height: 22,
  width: 22,
  marginRight: 10,
  fill: 'gray',
});

export const githubIconStyle = style({
  height: 22,
  width: 22,
  marginRight: 10,
  fill: 'gray',
});

export const modalStyle = style({
  width: '100vw',
  overflowY: 'auto',
  borderRadius: 12,
  maxHeight: 'calc(100vh - 30px)',
  marginTop: 30,
  paddingBottom: '2rem',

  '@media': {
    [media.desktop]: {
      height: 'calc(100vh - 30px)',
      padding: '40px 360px',
      borderRadius: '12px 12px 0 0',
    },
  },
});

export const headerStyle = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 40,

  '@media': {
    [media.desktop]: {
      padding: '0 100px',
    },
  },
});

export const infoBoxStyle = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const avatarStyle = style({
  borderRadius: '50%',
});

export const infoTextStyle = style({
  marginLeft: 15,
});

export const titleStyle = style({
  fontWeight: 600,
  fontSize: 16,
});

export const nameLinkStyle = style({
  fontWeight: 400,
  fontSize: 14,
});

export const imageContainerStyle = style({
  position: 'relative',
  height: 251,
  maxHeight: 730,
  marginBottom: 40,

  '@media': {
    [media.desktop]: {
      width: '100%',
      height: '85%',
      padding: '0 60px',
    },
  },
});

export const imageStyle = style({
  borderRadius: 10,
});

export const descriptionContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 25,
  '@media': {
    [media.desktop]: {
      padding: '0 60px',
    },
  },
});

export const descriptionStyle = style({
  '@media': {
    [media.desktop]: {
      padding: '5px 0px',
    },
  },
});

export const tagsContainerStyle = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '10px',
});

export const hStackStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 15,
});

export const linkStyle = style({
  display: 'flex',
  alignItems: 'center',
});

export const projectOptionsStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  fontSize: 14,
  margin: '0 auto',
  justifyContent: 'center',
});

export const deleteModalStyle = style({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: 40,
  gap: 30,

  '@media': {
    [media.midDesktop]: {
      width: 'fit-content',
    },
  },
});

export const deleteButtonStyle = style({
  color: vars.colors.errorRed,
});

export const deleteModalTitleStyle = style({
  fontSize: 20,
});

export const buttonContainerStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '40px',
  justifyContent: 'space-between',
});
