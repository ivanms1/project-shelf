import { Button } from 'ui';
import { css, styled } from '@/stitches/stitches.config';
export const Header = styled('h1', {
  fontSize: '36pt',
  marginBottom: '16px',
});

export const StyledSignin = styled('div', {
  backgroundImage:
    'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/assets/images/shelf-login.jpg")',
  height: '600px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export const LoginContent = styled('div', {
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
});

export const LoginButton = styled(Button, {
  height: 60,
  width: 170,
});
