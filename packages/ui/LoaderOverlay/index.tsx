import * as React from 'react';

import Loader, { LoaderInterface } from '../Loader';

import { containerStyle } from './LoaderOverlay.css';

export const LoaderOverlay = ({ size = 'sm', className }: LoaderInterface) => {
  return (
    <div className={containerStyle}>
      <Loader size={size} className={className} />
    </div>
  );
};

export default LoaderOverlay;
