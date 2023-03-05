import { useGetUserForPageQuery, useGetUserProjectsQuery } from 'apollo-hooks';
import { useRouter } from 'next/router';

import Image from 'next/future/image';

import ProjectsGrid from '@/components/ProjectsGrid';
import UserInfo from './UserInfo';

const COVER_PLACEHOLDER = 'https://via.placeholder.com/1665x288';

const User = () => {
  const { query } = useRouter();

  const { data } = useGetUserForPageQuery({
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

  const { user } = data;

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

  return (
    <div className='bg-black'>
      <div className='relative flex flex-col items-center lg:items-start'>
        <Image
          className='w-full h-[320px] object-cover'
          src={data?.user?.cover ?? COVER_PLACEHOLDER}
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
    </div>
  );
};

export default User;
