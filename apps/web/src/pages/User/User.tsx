import { useGetUserForPageQuery, useGetUserProjectsQuery } from 'apollo-hooks';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'react-i18next';
import Image from 'next/future/image';
import { Loader } from 'ui';

import ProjectsGrid from '@/components/ProjectsGrid';
import UserInfo from './UserInfo';

const COVER_PLACEHOLDER = 'https://via.placeholder.com/1665x288';

const User = () => {
  const { query } = useRouter();
  const { t } = useTranslation('user');

  const { data, loading: userLoading } = useGetUserForPageQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const {
    data: projectsData,
    fetchMore,
    loading,
  } = useGetUserProjectsQuery({
    variables: {
      userId: data?.user?.id,
      input: {
        cursor: null,
      },
    },
    skip: !data?.user?.id,
  });

  const { user } = data ?? {};

  const onRefetch = () => {
    if (!projectsData?.getUserProjects?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        userId: data?.user?.id,
        input: {
          cursor: projectsData?.getUserProjects?.nextCursor,
        },
      },
    });
  };

  if (userLoading) {
    return (
      <div className='flex justify-center items-center bg-black'>
        <Loader size='lg' />
      </div>
    );
  }

  if (!user) {
    return (
      <div className='w-full h-full flex justify-center items-center bg-black'>
        <p className='text-white'>{t('user_not_found')}</p>
      </div>
    );
  }

  return (
    <div className='bg-black'>
      <div className='relative flex flex-col items-center lg:items-start'>
        <Image
          className='w-full h-[320px] object-cover'
          src={data?.user?.cover || COVER_PLACEHOLDER}
          alt={user?.name}
          width={1000}
          height={1000}
        />

        {user?.avatar && (
          <Image
            className='absolute top-[250px] left-none lg:left-[150px]  rounded-lg border-2 border-black'
            src={user?.avatar}
            alt={user?.name}
            height={320}
            width={150}
          />
        )}
      </div>

      <div className='mt-8 lg:mt-16 py-[40px] px-10 lg:px-[155px]'>
        <UserInfo />
      </div>
      <div className='bg-grey-dark py-[40px] px-10 lg:px-[155px]'>
        <ProjectsGrid
          projects={projectsData?.getUserProjects?.results}
          onRefetch={onRefetch}
          loading={loading}
          nextCursor={projectsData?.getUserProjects?.nextCursor}
        />
      </div>

      <NextSeo
        title={user?.name}
        description={user?.name}
        openGraph={{
          type: 'website',
          title: user?.name,
          description: user?.bio,
          site_name: 'Project Shelf',
          images: [
            {
              url: user?.avatar ?? '',
              width: 200,
              height: 200,
              alt: user?.name,
            },
          ],
        }}
      />
    </div>
  );
};

export default User;
