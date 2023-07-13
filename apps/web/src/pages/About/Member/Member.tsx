import Image from 'next/image';

import type { MemberType } from '@/pages/About/About';
import { useTranslation } from 'next-i18next';

interface MemberProps {
  member: MemberType;
}

export const Member = ({ member }: MemberProps) => {
  const { t } = useTranslation('about');
  return (
    // <a target='_blank' href={member.html_url} rel='noreferrer'>
    //   <div className='transition-scale  flex   w-[250px] flex-col items-center rounded    bg-grey-dark transition-all duration-150 ease-linear hover:scale-105 hover:shadow-xl'>
    //     <Image
    //       className='h-[200px] rounded object-cover rounde-full'
    //       src={member.avatar_url}
    //       alt='github-profile'
    //       width={250}
    //       height={200}
    //     />
    //     <div className='flex  flex-col items-center justify-center p-5 '>
    //       <p className='text-center text-lg font-semibold'>@{member.login}</p>

    //       {/* <div className='flex w-full items-center justify-between '>
    //         <p className=' text-sm capitalize'>{t('contributions')}</p>
    //         <p className='text-center  text-2xl font-bold'>
    //           {member.contributions}
    //         </p>
    //       </div> */}
    //     </div>
    //   </div>
    // </a>

    <div className='group relative flex w-[250px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md   py-8 transition-all duration-150 ease-linear hover:scale-105 hover:bg-grey-dark'>
      <div className='relative h-[100px] w-[100px] overflow-hidden rounded-full'>
        <Image
          src={member.avatar_url}
          alt='github-profile'
          layout='fill'
          objectFit='cover'
        />
      </div>

      <div className=''>
        <p className='text-center text-lg font-semibold'>@{member.login}</p>
      </div>
      <div className='absolute bottom-14 -right-10 hidden items-center justify-end gap-4  rounded-full border border-gray-700 bg-black py-2 px-4 duration-150 ease-linear group-hover:flex'>
        <p className=' text-sm capitalize'>{t('contributions')}</p>
        <p className='text-center text-xl  font-medium'>
          {member.contributions}
        </p>
      </div>
    </div>
  );
};

export default Member;
