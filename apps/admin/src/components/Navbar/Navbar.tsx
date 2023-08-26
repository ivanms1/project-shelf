import React from 'react';
import Image from 'next/future/image';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

const Navbar = () => {
  const { currentUser } = useIsLoggedIn();

  return (
    <div className='flex h-20 w-full flex-row items-center justify-end px-20'>
      <div className='h-[50px] w-[50px] overflow-hidden rounded-full'>
        <Image
          className='h-full w-full cursor-pointer rounded-full object-cover'
          alt={currentUser?.name}
          src={currentUser?.avatar}
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};

export default Navbar;
