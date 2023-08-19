import React from 'react';
import { NextSeo } from 'next-seo';

import BarGraph from '../../components/BarGraph';
import { useGetAllUsersQuery, useGetProjectsAdminQuery } from 'apollo-hooks';

const Dashboard = () => {
  const { data } = useGetAllUsersQuery();
  const { data: projectsAdminData } = useGetProjectsAdminQuery();

  return (
    <div className='flex h-full  w-full flex-col border-2'>
      <div className=' flex flex-row gap-[100px] pb-10'>
        <div className=' border-[#72767C]-200 flex h-[266px] w-[232px] flex-col items-center justify-center gap-5 rounded-t-md border-2 bg-white py-5 px-14'>
          <span className='flex h-10 w-10 items-center justify-center rounded-circle bg-red-200 ' />

          <div className='flex flex-col items-center gap-2.5 '>
            <span className='text-center text-2xl text-dark-blue'>
              Total Users
            </span>
            <span className='text-2xl text-dark-blue '>
              {data?.getAllUsers?.totalCount}
            </span>
          </div>
        </div>

        <div className=' border-[#72767C]-200 flex h-[266px] w-[232px] flex-col items-center justify-center gap-5 rounded-t-md border-2 bg-white py-5 px-14'>
          <span className='flex h-10 w-10 items-center justify-center rounded-circle bg-red-200 ' />

          <div className='flex flex-col items-center gap-2.5'>
            <span className='text-5 text-center text-dark-blue'>
              Banned Users
            </span>
            <span className='text-2xl text-dark-blue '>
              {data?.getAllUsers?.bannedUsers}
            </span>
          </div>
        </div>

        <div className=' border-[#72767C]-200 flex h-[266px] w-[232px] flex-col items-center justify-center gap-5 rounded-t-md border-2 bg-white py-5 px-14'>
          <span className='flex h-10 w-10 items-center justify-center rounded-circle bg-red-200 ' />

          <div className='flex flex-col items-center gap-2.5'>
            <span className='text-5 text-center text-dark-blue'>
              Total Projects
            </span>
            <span className='text-2xl text-dark-blue'>
              {projectsAdminData?.getProjectsAdmin?.totalCount}
            </span>
          </div>
        </div>
      </div>

      <div className='flex h-full w-full flex-row gap-12 '>
        <div className='flex h-full w-full flex-col gap-5 rounded-t-md bg-white py-[22px] px-6'>
          <div className='text-5 flex flex-row text-dark-blue '>
            <span className='font-bold'>
              User <span className='font-normal'>Statistics</span>
            </span>
          </div>
          <BarGraph fillColor='#FF764C' />
        </div>

        <div className='flex h-full w-full flex-col gap-5 rounded-t-md bg-white py-[22px] px-6'>
          <div className='text-5 flex flex-row text-dark-blue '>
            <span className='font-bold'>
              Project <span className='font-normal'>Statistics</span>
            </span>
          </div>
          <BarGraph fillColor='#FF764C' />
        </div>
      </div>

      <NextSeo
        title='Admin | Dashboard'
        description='Admin dashboard page'
        openGraph={{
          type: 'website',
          title: 'Admin | Dashboard',
          description:
            'Control the users status, project and ban them if necessary',
          site_name: 'Admin dashboard page',
          images: [
            {
              url: 'https://project-shelf-dev.netlify.app/assets/images/shelf.png',
              width: 200,
              height: 200,
              alt: 'Project Shelf',
            },
          ],
        }}
      />
    </div>
  );
};

export default Dashboard;
