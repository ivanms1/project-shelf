import React from 'react';

import { NextSeo } from 'next-seo';

function Settings() {
  return (
    <div className='h-full w-full p-[30px]'>
      <p className='text-3xl font-bold'>Settings</p>
      <NextSeo
        title='Admin | Settings'
        description='Admin settings page'
        openGraph={{
          type: 'website',
          title: 'Admin | Settings',
          description:
            'Control the users status, project and ban them if necessary',
          site_name: 'Admin Settings page',
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
}

export default Settings;
