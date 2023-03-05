import React from 'react';
import { NextSeo } from 'next-seo';

function Index() {
  return (
    <div className='w-full h-full bg-white p-[30px]'>
      <p className='text-gray-900 text-3xl font-bold'>Projects</p>
      <NextSeo title='Projects' />
    </div>
  );
}

export default Index;
