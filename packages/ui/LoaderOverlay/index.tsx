import classNames from 'classnames';
import * as React from 'react';

import Loader, { LoaderInterface } from '../Loader';

export const LoaderOverlay = ({
  size = 'sm',
  className,
  transparent,
}: LoaderInterface) => {
  return (
    <div
      className={classNames(
        'absolute top-0 left-0 z-loading-overlay flex h-full w-full items-center justify-center bg-[#494848]',
        {
          'bg-[rgba(0,0,0,0.8)]': transparent,
        }
      )}
    >
      <Loader
        size={size}
        className={classNames('dark:text-[#494848]', className)}
      />
    </div>
  );
};

export default LoaderOverlay;
