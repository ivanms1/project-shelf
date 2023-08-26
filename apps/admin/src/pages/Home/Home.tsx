import React from 'react';
import { NextSeo } from 'next-seo';
import { useGetAllUsersQuery, useGetProjectsAdminQuery } from 'apollo-hooks';

import BarGraph from 'src/components/BarGraph';

const Home = () => {
  const { data } = useGetAllUsersQuery();
  const { data: projectsAdminData } = useGetProjectsAdminQuery();

  return (
    <div className='flex h-full  w-full flex-col'>
      <div className='flex flex-row gap-[100px] pb-10'>
        <div className='flex h-[266px] w-[232px] flex-col items-center justify-center gap-5 rounded-t-md py-5 px-14'>
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

        <div className='flex h-[266px] w-[232px] flex-col items-center justify-center gap-5 rounded-t-md py-5 px-14'>
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

        <div className='flex h-[266px] w-[232px] flex-col items-center justify-center gap-5 rounded-t-md py-5 px-14'>
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
        <div className='flex h-full w-full flex-col gap-5 rounded-t-md py-[22px] px-6'>
          <div className='text-5 flex flex-row text-dark-blue '>
            <span className='font-bold'>
              User <span className='font-normal'>Statistics</span>
            </span>
          </div>
          <BarGraph fillColor='#FF764C' />
        </div>

        <div className='flex h-full w-full flex-col gap-5 rounded-t-md py-[22px] px-6'>
          <div className='text-5 flex flex-row text-dark-blue '>
            <span className='font-bold'>
              Project <span className='font-normal'>Statistics</span>
            </span>
          </div>
          <BarGraph fillColor='#FF764C' />
        </div>
      </div>

      <NextSeo
        title='Admin | Home'
        description='Admin Home page'
        openGraph={{
          type: 'website',
          title: 'Admin | Home',
          site_name: 'Admin home page',
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

export default Home;
