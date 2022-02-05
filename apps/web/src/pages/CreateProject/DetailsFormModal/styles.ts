import { css, styled } from 'stitches/stitches.config';
import { Button } from 'ui';

export const modalStyles = css({
  minWidth: '100%',
  '@desktop': {
    padding: 50,
    minWidth: 600,
  },
})();

export const Title = styled('h1', {
  fontSize: 24,
  fontWeight: 600,
  marginBottom: 30,
});

export const InputsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  marginBottom: 45,
});

export const ButtonsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

export const PublishButton = styled(Button, {
  display: 'flex',
  justifyContent: 'center',
  minWidth: 100,
});
