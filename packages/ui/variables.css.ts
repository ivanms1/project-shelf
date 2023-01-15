import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  colors: {
    primary: '#ea4c89',
    primaryLight: '#f082ac',
    secondary: '#F3F3F4',
    errorRed: '#d61b1b',
    defaultColor: '#dbdbde',
    bgPrimary: '#f2f3fc',
    modalOverlayBg: 'rgba(30,30,30,0.7)',
    pink: '#ea4c89',
    gray: '#9e9ea7',
    black: '#000000',
  },
  zIndex: {
    modalOverlay: '99999',
    loaderOverlay: '999',
  },
});

export const media = {
  desktop: 'screen and (min-width: 1296px)',
  midDesktop: 'screen and (min-width: 990px)', // size for mobile devices with screen greator less than 990px
  ipad: 'screen and (max-width: 990px)', // size for mobile devices with screen size less than 990px
  mobile: 'screen and (max-width: 672px)', // size for mobile devices with screen size less than 672px
} as const;
