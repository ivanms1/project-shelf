import React from 'react';

import { NextSeo } from 'next-seo';

const Home = () => {
  return (
    <div className='bg-gray-200'>
      <NextSeo
        title='Admin | Home'
        description='Admin home page'
        openGraph={{
          type: 'website',
          title: 'Admin | Home',
          description:
            'Control the users status, project and ban them if necessary',
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
