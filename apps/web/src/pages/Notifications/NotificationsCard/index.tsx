import React from 'react';

import HeartIcon from '@/assets/icons/heart.svg';
import classNames from 'classnames';

const NotificationsCard = () => {
  return (
    <div className='flex rounded  bg-grey-dark px-[40px] py-[20px]'>
      <div className='flex w-full items-center justify-between gap-10 '>
        <div className='flex w-full gap-6'>
          <div className='flex h-[50px] w-[55px] items-center justify-center overflow-hidden rounded-full '>
            <img
              src='https://avatars.githubusercontent.com/u/105509363?v=4'
              style={{
                display: 'block',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
          <div className='flex w-full flex-col '>
            <div>
              <span className='text-bold '>
                <a>this like</a>
              </span>{' '}
              your{' '}
              <span className='text-bold '>
                <a>project name</a>
              </span>
            </div>
            <div className='text-sm'>about 2 months ago</div>
          </div>
        </div>

        <div className='flex items-center justify-center rounded-full bg-black p-3'>
          <HeartIcon
            className={classNames('h-[20px] w-[20px] fill-pink-light')}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationsCard;
