import React from 'react';
import { NextSeo } from 'next-seo';

import BarGraph from '../../components/BarGraph';
import { useGetAllUsersQuery, useGetProjectsAdminQuery } from 'apollo-hooks';

const Dashboard = () => {
  const { data } = useGetAllUsersQuery();
  const { data: projectsAdminData } = useGetProjectsAdminQuery();

  return (
    <div className='w-full h-full  flex flex-col border-2'>
      <div className=' flex flex-row gap-[100px] pb-10'>
        <div className=' h-[266px] w-[232px] py-5 px-14 bg-white flex flex-col items-center justify-center gap-5 rounded-t-md border-2 border-[#72767C]-200'>
          <span className='w-10 h-10 rounded-circle flex items-center justify-center bg-red-200 ' />

          <div className='flex flex-col items-center gap-2.5 '>
            <span className='text-2xl text-dark-blue text-center'>
              Total Users
            </span>
            <span className='text-2xl text-dark-blue '>
              {data?.getAllUsers?.totalCount}
            </span>
          </div>
        </div>

        <div className=' h-[266px] w-[232px] py-5 px-14 bg-white flex flex-col items-center justify-center gap-5 rounded-t-md border-2 border-[#72767C]-200'>
          <span className='w-10 h-10 rounded-circle flex items-center justify-center bg-red-200 ' />

          <div className='flex flex-col gap-2.5 items-center'>
            <span className='text-5 text-dark-blue text-center'>
              Banned Users
            </span>
            <span className='text-2xl text-dark-blue '>
              {data?.getAllUsers?.bannedUsers}
            </span>
          </div>
        </div>

        <div className=' h-[266px] w-[232px] py-5 px-14 bg-white flex flex-col items-center justify-center gap-5 rounded-t-md border-2 border-[#72767C]-200'>
          <span className='w-10 h-10 rounded-circle flex items-center justify-center bg-red-200 ' />

          <div className='flex flex-col gap-2.5 items-center'>
            <span className='text-5 text-dark-blue text-center'>
              Total Projects
            </span>
            <span className='text-2xl text-dark-blue'>
              {projectsAdminData?.getProjectsAdmin?.totalCount}
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-row gap-12 h-full w-full '>
        <div className='flex flex-col h-full w-full gap-5 bg-white rounded-t-md py-[22px] px-6'>
          <div className='flex flex-row text-dark-blue text-5 '>
            <span className='font-bold'>
              User <span className='font-normal'>Statistics</span>
            </span>
          </div>
          <BarGraph fillColor='#FF764C' />
        </div>

        <div className='flex flex-col h-full w-full gap-5 bg-white rounded-t-md py-[22px] px-6'>
          <div className='flex flex-row text-dark-blue text-5 '>
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
};

export default Dashboard;
