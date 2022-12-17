import { style } from '@vanilla-extract/css';

export const headerStyle = style({
  fontWeight: '600',
  fontSize: '45px',
  textAlign: 'center',
  margin: '70px 0',
});

export const flexContainerStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '30px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: '0 0 120px 0',
});
