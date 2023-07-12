import classNames from 'classnames';
import * as React from 'react';

import Loader, { LoaderInterface } from '../Loader';

export const LoaderOverlay = ({
  size = 'sm',
  className,
  transparent,
}: LoaderInterface) => {
  React.useEffect(() => {
    // Add a class to the body element to disable scrolling
    document.body.classList.add('overflow-hidden');

    return () => {
      // Remove the class from the body element when the component unmounts
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div
      className={classNames(
        'fixed top-0 left-0 z-loading-overlay flex h-screen w-screen cursor-pointer items-center justify-center bg-overlay',
        {
          'bg-overlay': transparent,
        }
      )}
    >
      <Loader
        size={size}
        className={classNames('text-grey-medium', className)}
      />
    </div>
  );
};

export default LoaderOverlay;
