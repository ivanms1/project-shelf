import React from 'react';
import Image from 'next/future/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

interface TopCreatorProps {
  creator: {
    id: string;
    name: string;
    avatar?: string;
    likesReceived: number;
  };
  idx?: number;
}

const TopCreator = ({ creator, idx }: TopCreatorProps) => {
  const { t } = useTranslation('home');
  return (
    <Link
      href={`/user/${creator.id}`}
      className='bg-grey-dark p-5 flex flex-col gap-5 justify-center items-center rounded-lg w-[260px] h-[260px] relative '
    >
      <span className='w-[30px] h-[30px] absolute left-[20px] top-[30px] bg-black rounded-full flex items-center justify-center text-[12px] text-grey-light '>
        {idx}
      </span>
      <Image
        src={creator?.avatar}
        alt={creator.name}
        className='rounded-full w-[120px] h-[120px]'
        width={120}
        height={120}
      />
      <div className='flex flex-col gap-1.5 items-center'>
        <p className='text-[22px] font-semibold text-center'>{creator.name}</p>
        <div className='flex gap-2.5  items-center justify-center'>
          <p className='text-grey-light'>{t('total-likes')}</p>
          <p className='font-mono '>{creator.likesReceived}</p>
        </div>
      </div>
    </Link>
  );
};

export default TopCreator;
