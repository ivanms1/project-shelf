import Image from 'next/future/image';

import type { MemberType } from '@/pages/About/About';
import { useTranslation } from 'react-i18next';

interface MemberProps {
  member: MemberType;
}

export const Member = ({ member }: MemberProps) => {
  const { t } = useTranslation('about');
  return (
    <a target='_blank' href={member.html_url} rel='noreferrer'>
      <div className='flex flex-col items-center bg-grey-dark rounded-sm h-[300px] w-[250px] hover:shadow-xl transition-shadow'>
        <Image
          className='h-[200px] object-cover rounded-t-sm'
          src={member.avatar_url}
          alt='github-profile'
          width={250}
          height={200}
        />
        <div className='flex justify-center gap-1 flex-col items-center h-full'>
          <p className='text-xs font-mono text-center'>@{member.login}</p>
          <p className='text-4xl font-mono text-center'>
            {member.contributions}
          </p>
          <p className='text-xs font-mono text-center'>{t('contributions')}</p>
        </div>
      </div>
    </a>
  );
};

export default Member;
