import * as React from 'react';
import classNames from 'classnames';

import { loaderStyles } from './Loader.css';

export interface LoaderInterface {
  size?: 'sm' | 'md' | 'lg';
  className?: string | undefined;
}

export const Loader = ({ size = 'sm', className }: LoaderInterface) => {
  return <div className={classNames(loaderStyles[size], className)} />;
};

export default Loader;
