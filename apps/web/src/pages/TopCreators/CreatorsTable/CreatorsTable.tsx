import React from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useGetTopUsersQuery } from 'apollo-hooks';

interface CreatorsTableProps {
  interval?: string;
}

const CreatorsTable = ({ interval }: CreatorsTableProps) => {
  const { t } = useTranslation('top');

  const { data } = useGetTopUsersQuery({
    variables: {
      interval,
    },
  });

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between font-mono border border-grey-light rounded-lg py-3 px-5 gap-5'>
        <p className='text-grey-light w-1/12'>#</p>
        <p className='text-grey-light flex-1'>{t('username')}</p>
        <p className='text-grey-light w-2/12'>{t('likes')}</p>
        <p className='text-grey-light w-2/12 max-lg:hidden'>{t('followers')}</p>
      </div>
      <div className='flex flex-col gap-5'>
        {data?.getTopUsers?.results?.map((user, index) => (
          <div
            key={user?.id}
            className='flex justify-between w-full bg-grey-dark items-center py-3 px-5 rounded-lg gap-5 max-lg:py-[10px] max-lg:px-3'
          >
            <div className=' w-1/12'>
              <p className='bg-black h-[30px] w-[30px] flex justify-center items-center rounded-full text-grey-light font-mono'>
                {index + 1}
              </p>
            </div>
            <Link
              href={`/user/${user.id}`}
              className='flex items-center gap-5 flex-1'
            >
              {user?.avatar && (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={60}
                  height={60}
                  className='rounded-full max-lg:w-6 max-lg:h-6'
                />
              )}
              <p className='text-[22px] font-semibold max-lg:text-base max-lg:font-normal'>
                {user?.name}
              </p>
            </Link>
            <p className='font-mono w-2/12'>{user?.likesReceived}</p>
            <p className='font-mono w-2/12 max-lg:hidden'>
              {user?.followersCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorsTable;
