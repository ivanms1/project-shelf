import { style } from '@vanilla-extract/css';

export const nativeSelectStyle = style({
  border: '1px solid transparent',
  boxShadow: 'none',
  backgroundColor: '#f3f3f4',
  borderRadius: 8,
  height: 40,

  ':focus': {
    border: '1px solid rgba(234,76,137,0.4)',
    boxShadow: '0 0 0 4px rgb(234 76 137 / 10%)',
    backgroundColor: '#fff',
  },

  ':hover': {
    border: '1px solid transparent',
  },
});
