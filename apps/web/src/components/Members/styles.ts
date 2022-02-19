import { styled } from 'stitches/stitches.config';

export const StyledMembers = styled('div', {});

export const Header = styled('h2', {
  marginTop: '2em',
  fontSize: '40pt',
});

export const FlexContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& > *': {
    margin: '5px',
    flexGrow: '1',
  },
});
