import { NextSeo } from 'next-seo';
import React from 'react';

function Index() {
  return (
    <div className='w-full h-full bg-white p-[30px]'>
      <p className='text-gray-900 text-3xl font-bold'>Users</p>
      <NextSeo title='Users' />
    </div>
  );
}

export default Index;
