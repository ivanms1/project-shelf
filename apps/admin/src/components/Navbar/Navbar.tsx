import React from 'react';
import Image from 'next/future/image';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

const Navbar = () => {
  const { currentUser } = useIsLoggedIn();

  return (
    <div className='bg-white w-full h-20 flex flex-row justify-end items-center px-20'>
      <div className='rounded-full overflow-hidden w-[50px] h-[50px]'>
        <Image
          className='w-full h-full cursor-pointer rounded-full object-cover'
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
