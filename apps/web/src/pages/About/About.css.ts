import { style } from '@vanilla-extract/css';
import { vars } from 'ui/variables.css';

export const aboutStyles = style({
  backgroundColor: vars.colors.bgPrimary,
  height: '100%',
  flex: '1',
});

export const headerStyle = style({
  fontWeight: '600',
  fontSize: '45px',
  textAlign: 'center',
  margin: '70px 0',
});
