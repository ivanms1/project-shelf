import Image from 'next/future/image';

import type { MemberType } from '@/pages/About/About';
import { useTranslation } from 'next-i18next';
import useIsMobile from '@/hooks/useIsMobile';

import { Floating } from 'ui';

interface MemberProps {
  member: MemberType;
}

export const Member = ({ member }: MemberProps) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation('about');

  return (
    <>
      {isMobile ? (
        <Card member={member} />
      ) : (
        <Floating
          content={
            <div className='flex w-full items-center gap-4 rounded-full bg-black py-2 px-4 hover:scale-105 hover:bg-grey-dark'>
              <p className='text-sm capitalize'>{t('contributions')}</p>
              <p className='font-bold text-white'>{member.contributions}</p>
            </div>
          }
        >
          <Card member={member} />
        </Floating>
      )}
    </>
  );
};

const Card = ({ member }: MemberProps) => {
  const { t } = useTranslation('about');
  const isMobile = useIsMobile();
  return (
    <a
      target='_blank'
      href={member.html_url}
      rel='noreferrer'
      className='group relative flex w-[250px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md py-8 transition-all duration-150 ease-linear hover:scale-105 hover:bg-grey-dark'
    >
      <Image
        src={member.avatar_url}
        alt='github-profile'
        width={150}
        height={150}
        className=' overflow-hidden rounded-full sm:h-[100px] sm:w-[100px]'
      />

      <p className='text-center text-lg font-medium'>{member.login}</p>
      {isMobile && (
        <div className='flex w-full max-w-[200px] items-center justify-between gap-4 rounded-full  bg-grey-dark py-2 px-6 group-hover:bg-black'>
          <p className='text-sm capitalize'>{t('contributions')}</p>
          <p className='font-bold text-white'>{member.contributions}</p>
        </div>
      )}
    </a>
  );
};

export default Member;
