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
      errorRed: '#d61b1b',
      default: '#dbdbde',
      bgPrimary: '#f2f3fc',
    },
    zIndices: {
      modalOverlayIndex: 99999,
      loaderOverlayIndex: 999,
    },
  },
  media: {
    desktop: '(min-width: 769px)',
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
