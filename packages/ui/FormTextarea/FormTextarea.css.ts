import { style } from '@vanilla-extract/css';

export const formTextArea = style({
  backgroundColor: '#f3f3f4',
  height: 140,
  padding: '10px 16px',
  width: '100%',
  outline: 'none',
  borderRadius: 8,
  fontSize: 14,
  border: '1px solid transparent',
  transition:
    'background-color 200ms ease, outline 200ms ease, color 200ms ease, box-shadow 200ms ease, -webkit-box-shadow 200ms ease',

  ':focus': {
    backgroundColor: '#fff',
    borderColor: 'rgba(234,76,137,0.4)',
    boxShadow: '0 0 0 4px rgb(234 76 137 / 10%)',
  },
});
