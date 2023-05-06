import React from 'react';
import Image from 'next/future/image';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

interface TopCreatorProps {
  creator: {
    id: string;
    name: string;
    avatar?: string | null;
    likesReceived: number;
  };
}

const TopCreator = ({ creator }: TopCreatorProps) => {
  const { t } = useTranslation('home');

  return (
    <Link
      href={`/user/${creator.id}`}
      className='flex h-[260px] w-[260px] flex-col items-center justify-center gap-5 rounded-lg bg-grey-dark p-5'
    >
      <Image
        src={creator?.avatar ?? ''}
        alt={creator.name}
        className='h-[120px] w-[120px] rounded-full'
        width={120}
        height={120}
      />
      <div className='flex flex-col items-center gap-1.5'>
        <p className='text-center text-[22px] font-semibold'>{creator.name}</p>
        <div className='flex gap-2.5'>
          <p className='text-grey-light'>{t('total-likes')}</p>
          <p className='font-mono '>{creator.likesReceived}</p>
        </div>
      </div>
    </Link>
  );
};

export default TopCreator;
