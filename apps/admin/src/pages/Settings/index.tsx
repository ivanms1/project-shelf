import React from 'react';

import { NextSeo } from 'next-seo';

function Index() {
  return (
    <div className='w-full h-full bg-white p-[30px]'>
      <p className='text-gray-900 text-3xl font-bold'>Settings</p>
      <NextSeo title='Settings' />
    </div>
  );
}

export default Index;
