import React from 'react';
import { Container } from './style';

import Loader, { LoaderInterface } from '../Loader';

export const LoaderOverlay = ({ size = 'sm', css }: LoaderInterface) => {
  return (
    <Container>
      <Loader size={size} css={css} />
    </Container>
  );
};

export default LoaderOverlay;
