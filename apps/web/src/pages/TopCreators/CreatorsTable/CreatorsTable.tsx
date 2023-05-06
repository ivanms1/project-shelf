import React from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
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
      <div className='flex justify-between gap-5 rounded-lg border border-grey-light py-3 px-5 font-mono'>
        <p className='w-1/12 text-grey-light'>#</p>
        <p className='flex-1 text-grey-light'>{t('username')}</p>
        <p className='w-2/12 text-grey-light'>{t('likes')}</p>
        <p className='w-2/12 text-grey-light max-lg:hidden'>{t('followers')}</p>
      </div>
      <div className='flex flex-col gap-5'>
        {data?.getTopUsers?.results?.map((user, index) => (
          <div
            key={user?.id}
            className='flex w-full items-center justify-between gap-5 rounded-lg bg-grey-dark py-3 px-5 max-lg:py-[10px] max-lg:px-3'
          >
            <div className=' w-1/12'>
              <p className='flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black font-mono text-grey-light'>
                {index + 1}
              </p>
            </div>
            <Link
              href={`/user/${user.id}`}
              className='flex flex-1 items-center gap-5'
            >
              <Image
                src={user.avatar ?? ''}
                alt={user.name}
                width={60}
                height={60}
                className='rounded-full max-lg:h-6 max-lg:w-6'
              />
              <p className='text-[22px] font-semibold max-lg:text-base max-lg:font-normal'>
                {user?.name}
              </p>
            </Link>
            <p className='w-2/12 font-mono'>{user?.likesReceived}</p>
            <p className='w-2/12 font-mono max-lg:hidden'>
              {user?.followersCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorsTable;
