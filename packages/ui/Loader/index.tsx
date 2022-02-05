import { CSSProperties } from '@stitches/react';
import React from 'react';

import { StyledLoader } from './styles';

interface Loader {
  size?: 'sm' | 'md' | 'lg';
  css?: Partial<CSSProperties>;
}

export const Loader = ({ size = 'sm', css }: Loader) => {
  return <StyledLoader size={size} css={css} />;
};

export default Loader;
