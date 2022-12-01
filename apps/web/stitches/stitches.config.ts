import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: '#ea4c89',
      primaryLight: '#f082ac',
      secondary: '#F3F3F4',
      pink: '#ea4c89',
      gray: '#9e9ea7',
      modalOverlayBg: 'rgba(30,30,30,0.7)',
    },
    zIndices: {
      modalOverlayIndex: 99999,
      loaderOverlayIndex: 999,
    },
  },
  media: {
    desktop: '(min-width: 1296px)',
    midDesktop: '(min-width: 990px)', // size for mobile devices with screen greator less than 990px
    ipad: '(max-width: 990px)', // size for mobile devices with screen size less than 990px
    mobile: '(max-width: 672px)', // size for mobile devices with screen size less than 672px
  },
  utils: {
    marginHorizontal: (value: string | number) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginVertical: (value: string | number) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingHorizontal: (value: string | number) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingVertical: (value: string | number) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});
