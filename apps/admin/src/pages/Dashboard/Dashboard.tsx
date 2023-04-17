import React from 'react';
import { NextSeo } from 'next-seo';

import BarGraph from '../../components/BarGraph';
import { useGetAllUsersQuery, useGetProjectsAdminQuery } from 'apollo-hooks';

function Dashboard() {
  const { data } = useGetAllUsersQuery();
  const { data: projectsAdminData } = useGetProjectsAdminQuery();

  return (
    <div className='w-full h-full  flex flex-col border-2'>
      <div className=' flex flex-row gap-[100px] pb-[40px]'>
        <div className=' h-[266px] w-[232px] py-[20px] px-[60px] bg-white flex flex-col items-center justify-center gap-[20px] rounded-[14px] border-2 border-[#72767C]-200'>
          <span className='w-[40px] h-[40px] rounded-circle flex items-center justify-center bg-red-200 '></span>

          <div className='flex flex-col items-center gap-[10px] '>
            <span className='text-[24px] text-[#242731] text-center'>
              Total Users
            </span>
            <span className='text-[24px] text-[#242731] '>
              {data?.getAllUsers?.totalCount}
            </span>
          </div>
        </div>

        <div className=' h-[266px] w-[232px] py-[20px] px-[60px] bg-white flex flex-col items-center justify-center gap-[20px] rounded-[14px] border-2 border-[#72767C]-200'>
          <span className='w-[40px] h-[40px] rounded-circle flex items-center justify-center bg-red-200 '></span>

          <div className='flex flex-col gap-[10px] items-center'>
            <span className='text-[20px] text-[#242731] text-center'>
              Banned Users
            </span>
            <span className='text-[24px] text-[#242731] '>
              {data?.getAllUsers?.bannedUsers}
            </span>
          </div>
        </div>

        <div className=' h-[266px] w-[232px] py-[20px] px-[60px] bg-white flex flex-col items-center justify-center gap-[20px] rounded-[14px] border-2 border-[#72767C]-200'>
          <span className='w-[40px] h-[40px] rounded-circle flex items-center justify-center bg-red-200 '></span>

          <div className='flex flex-col gap-[10px] items-center'>
            <span className='text-[20px] text-[#242731] text-center'>
              Total Projects
            </span>
            <span className='text-[24px] text-[#242731]'>
              {projectsAdminData?.getProjectsAdmin?.totalCount}
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-row gap-[50px] h-full w-full '>
        <div className='flex flex-col h-full w-full gap-[20px] bg-white rounded-[14px] py-[22px] px-[24px]'>
          <div className='flex flex-row text-[#242731] text-[20px] '>
            <span className='font-bold'>
              User <span className='font-normal'>Statistics</span>
            </span>
          </div>
          <BarGraph fillColor='#FF764C' />
        </div>

        <div className='flex flex-col h-full w-full gap-[20px] bg-white rounded-[14px] py-[22px] px-[24px]'>
          <div className='flex flex-row text-[#242731] text-[20px] '>
            <span className='font-bold'>
              Project <span className='font-normal'>Statistics</span>
            </span>
          </div>
          <BarGraph fillColor='#FF764C' />
        </div>
      </div>

      <NextSeo title='Dashboard' />
    </div>
  );
}

export default Dashboard;
