import React from 'react';
import { NextSeo } from 'next-seo';

function Index() {
  return (
    <div className='w-full h-full bg-white p-[30px]'>
      <p className='text-gray-900 text-3xl font-bold'>Dashboard</p>

      <div className='py-[60px] flex flex-row gap-[100px]'>
        <div className=' h-[266px] w-[232px] py-[20px] px-[60px] bg-white flex flex-col items-center justify-center gap-[20px] rounded-[14px] border-2 border-[#72767C]-200'>
          <span className='w-[40px] h-[40px] rounded-circle flex items-center justify-center bg-red-200 '></span>

          <div className='flex flex-col gap-[10px] items-center'>
            <span className='text-[24px] text-[#242731] font-bold'>Users</span>
            <span className='text-[24px] text-[#242731] font-bold'>120</span>
          </div>
        </div>

        <div className=' h-[266px] w-[232px] py-[20px] px-[60px] bg-white flex flex-col items-center justify-center gap-[20px] rounded-[14px] border-2 border-[#72767C]-200'>
          <span className='w-[40px] h-[40px] rounded-circle flex items-center justify-center bg-red-200 '></span>

          <div className='flex flex-col gap-[10px] items-center'>
            <span className='text-[24px] text-[#242731] font-bold'>
              Projects
            </span>
            <span className='text-[24px] text-[#242731] font-bold'>1000</span>
          </div>
        </div>
      </div>
      <NextSeo title='Dashboard' />
    </div>
  );
}

export default Index;
