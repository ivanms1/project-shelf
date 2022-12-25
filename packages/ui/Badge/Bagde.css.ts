import { styleVariants } from '@vanilla-extract/css';
import { buttonBase } from '../Button/Button.css';
import { vars } from '../variables.css';

export const badgeStyle = styleVariants({
  solid: [
    buttonBase,
    {
      backgroundColor: vars.colors.defaultColor,
    },
  ],
  outline: [
    buttonBase,
    {
      backgroundColor: 'transparent',
      border: '1px solid black',
    },
  ],
});
