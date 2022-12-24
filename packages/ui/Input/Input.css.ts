import { style } from '@vanilla-extract/css';

export const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const labelStyle = style({
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 5,
});

export const inputStyle = style({
  backgroundColor: '#f3f3f4',
  height: 40,
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

  '::placeholder': {
    color: '#9e9ea7',
  },
});