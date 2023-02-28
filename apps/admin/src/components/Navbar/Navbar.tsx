import React from 'react';

const Navbar = ({}) => {
  return (
    <div className='bg-white w-full h-20 flex flex-row justify-between items-center px-20'>
      <div>search</div>
      <div className='rounded-full overflow-hidden  w-[50px] h-[50px]'>
        <img
          className='w-full object-fill h-full object-scale-down'
          alt='profile'
          src='https://res.cloudinary.com/dsptga4nz/image/upload/v1676539101/123255554_172092481220508_1926094990727541566_n_wkgoyo.jpg'
        />
      </div>
    </div>
  );
};

export default Navbar;
