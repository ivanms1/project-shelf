import React from 'react';
import { SearchOrder, useSearchProjectsQuery } from 'apollo-hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import ProjectsGrid from '@/components/ProjectsGrid';

import {
  headerStyle,
  projectsGridStyle,
  resultsTitleStyle,
  searchFormStyle,
  searchInputStyle,
  subtitleStyle,
  titleStyle,
  totalCountStyle,
} from './Search.css';

function Search() {
  const { query, push } = useRouter();

  const { t } = useTranslation('search');

  const { register, handleSubmit } = useForm<{ search: string }>();

  const search = query?.search?.[0];

  const { loading, data, fetchMore } = useSearchProjectsQuery({
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
    <div>
      <div className={headerStyle}>
        <h1 className={titleStyle}>{t('search')}</h1>
        <p className={subtitleStyle}>{t('subtitle')}</p>
      </div>
      <form className={searchFormStyle} onSubmit={handleSubmit(handleSearch)}>
        <input
          className={searchInputStyle}
          name='project-search'
          placeholder={t('Search')}
          defaultValue={search}
          {...register('search')}
        />
      </form>
      {!!search && (
        <>
          <h1 className={resultsTitleStyle}>{search}</h1>
          <p className={totalCountStyle}>
            {t('search-total', {
              count: data?.searchProjects?.totalCount ?? 0,
            })}
          </p>
        </>
      )}
      <div className={projectsGridStyle}>
        <ProjectsGrid
          projects={data?.searchProjects?.results ?? []}
          nextCursor={data?.searchProjects?.nextCursor}
          onRefetch={onRefetch}
          loading={loading}
        />
      </div>
      <NextSeo title={t('seo-title')} />
    </div>
  );
}

export default Search;
