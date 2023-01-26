import classNames from 'classnames';
import * as React from 'react';

import Loader, { LoaderInterface } from '../Loader';

export const LoaderOverlay = ({ size = 'sm', className }: LoaderInterface) => {
  return (
    <div className='flex w-full h-full bg-[#494848] justify-center items-center absolute top-0 left-0 z-loading-overlay'>
      <Loader
        size={size}
        className={classNames('dark:text-[#494848]', className)}
      />
    </div>
  );
};

export default LoaderOverlay;
