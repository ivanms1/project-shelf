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
    <div className='flex min-h-[52vh] flex-col bg-black px-28 pt-20 pb-[3px] max-lg:min-h-[70vh] max-lg:px-[30px]'>
      <div className='mb-8 flex flex-col gap-3'>
        <h1 className='text-5xl font-semibold'>{t('title')}</h1>
        <p className='text-[22px]'>{t('subtitle')}</p>
      </div>
      <form
        className='mb-20 max-lg:mb-10'
        onSubmit={handleSubmit(handleSearch)}
      >
        <input
          className='w-full rounded-lg border border-grey-dark bg-black p-5 text-white focus:outline-none'
          placeholder={t('search-placeholder')}
          autoFocus
          defaultValue={search}
          {...register('search')}
        />
      </form>
      {!!search && !!data?.searchProjects?.totalCount && (
        <>
          <div className='flex w-fit items-center justify-center gap-4 border-b-[2px] border-b-grey-light px-48 py-4 max-lg:px-7'>
            <p className='text-[22px] capitalize'>{t('projects')}</p>
            <p className='rounded-lg bg-grey-light px-4 py-[5px] font-mono'>
              {data?.searchProjects?.totalCount}
            </p>
          </div>
          <div className='-mx-28 bg-grey-dark py-14 px-28 max-lg:mx-[-30px] max-lg:px-[30px]'>
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
        <div className='flex flex-col items-center gap-2'>
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
