import Image from 'next/future/image';

import type { MemberType } from '@/pages/About/About';
import { useTranslation } from 'next-i18next';

interface MemberProps {
  member: MemberType;
}

export const Member = ({ member }: MemberProps) => {
  const { t } = useTranslation('about');
  return (
    <a target='_blank' href={member.html_url} rel='noreferrer'>
      <div className='flex h-[300px] w-[250px] flex-col items-center rounded-lg bg-grey-dark transition-shadow hover:shadow-xl'>
        <Image
          className='h-[200px] rounded-t-lg object-cover'
          src={member.avatar_url}
          alt='github-profile'
          width={250}
          height={200}
        />
        <div className='flex h-full flex-col items-center justify-center gap-1'>
          <p className='text-center font-mono text-xs'>@{member.login}</p>
          <p className='text-center font-mono text-4xl'>
            {member.contributions}
          </p>
          <p className='text-center font-mono text-xs'>{t('contributions')}</p>
        </div>
      </div>
    </a>
  );
};

export default Member;
