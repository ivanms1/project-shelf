import React from 'react';

import { CSSProperties } from '@stitches/react';

import { StyledLoader } from './styles';

export interface LoaderInterface {
  size?: 'sm' | 'md' | 'lg';
  css?: Partial<CSSProperties>;
}

export const Loader = ({ size = 'sm', css }: LoaderInterface) => {
  return <StyledLoader size={size} css={css} />;
};

export default Loader;
