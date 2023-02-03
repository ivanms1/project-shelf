import React from 'react';
import { SearchOrder, useSearchProjectsQuery } from 'apollo-hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import ProjectsGrid from '@/components/ProjectsGrid';

function Search() {
  const { query, push } = useRouter();

  const { t } = useTranslation('search');

  const { register, handleSubmit } = useForm<{ search: string }>();

  const search = query?.search?.[0];

  const { loading, data, fetchMore, called } = useSearchProjectsQuery({
    variables: {
      input: {
        search,
        orderBy: 'createdAt',
        order: SearchOrder.Asc,
        cursor: undefined,
      },
    },
    skip: !search,
  });

  const handleSearch: SubmitHandler<{ search: string }> = (values) => {
    push(`/search/${values.search}`);
  };

  const onRefetch = () => {
    if (!data?.searchProjects?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        input: {
          search,
          orderBy: 'createdAt',
          order: SearchOrder.Asc,
          cursor: data?.searchProjects?.nextCursor,
        },
      },
    });
  };

  return (
    <div className='bg-black flex flex-col px-28 pt-10 pb-[3px] max-lg:px-[30px]'>
      <div className='flex flex-col gap-3 mb-8'>
        <h1 className='font-semibold text-5xl'>{t('title')}</h1>
        <p className='text-[22px]'>{t('subtitle')}</p>
      </div>
      <form
        className='mb-20 max-lg:mb-10'
        onSubmit={handleSubmit(handleSearch)}
      >
        <input
          className='p-5 bg-black text-white border border-grey-dark rounded-lg w-full'
          name='project-search'
          placeholder={t('search-placeholder')}
          defaultValue={search}
          {...register('search')}
        />
      </form>
      {!!search && !!data?.searchProjects?.totalCount && (
        <>
          <div className='flex gap-4 px-48 w-fit py-4 border-b-[2px] border-b-grey-light justify-center items-center'>
            <p className='capitalize text-[22px]'>{t('projects')}</p>
            <p className='bg-grey-light rounded-lg px-4 py-[5px] font-mono'>
              {data?.searchProjects?.totalCount}
            </p>
          </div>
          <div className='bg-grey-dark py-14 px-28 max-lg:px-[30px] -mx-28 max-lg:mx-[-30px]'>
            <ProjectsGrid
              projects={data?.searchProjects?.results ?? []}
              nextCursor={data?.searchProjects?.nextCursor}
              onRefetch={onRefetch}
              loading={loading}
            />
          </div>
        </>
      )}
      {data?.searchProjects?.totalCount === 0 && called && (
        <div className='flex flex-col gap-4 items-center'>
          <p className='text-[22px]'>{t('no-results')}</p>
          <p className='text-lg text-grey-light'>
            {t('no-results-description')}
          </p>
        </div>
      )}

      <NextSeo title={t('seo-title')} />
    </div>
  );
}

export default Search;
