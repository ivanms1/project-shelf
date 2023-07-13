import Image from 'next/image';

import type { MemberType } from '@/pages/About/About';
import { useTranslation } from 'next-i18next';

import { Floating } from 'ui';

interface MemberProps {
  member: MemberType;
}

export const Member = ({ member }: MemberProps) => {
  const { t } = useTranslation('about');
  return (
    <Floating
      content={
        <div className='flex w-full items-center gap-4 rounded-full bg-black py-2 px-4 hover:scale-105 hover:bg-grey-dark'>
          <p className='text-sm capitalize'>{t('contributions')}</p>
          <p className='font-bold text-white'>{member.contributions}</p>
        </div>
      }
    >
      <a
        target='_blank'
        href={member.html_url}
        rel='noreferrer'
        className='group relative flex w-[250px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md py-8 transition-all duration-150 ease-linear hover:scale-105 hover:bg-grey-dark'
      >
        <div className='relative h-[100px] w-[100px] overflow-hidden rounded-full'>
          <Image
            src={member.avatar_url}
            alt='github-profile'
            layout='fill'
            objectFit='cover'
          />
        </div>

        <p className='text-center text-lg font-medium'>{member.login}</p>
      </a>
    </Floating>
  );
};

export default Member;
