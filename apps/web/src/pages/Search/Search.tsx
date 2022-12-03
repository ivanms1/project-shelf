import React from 'react';
import { SearchOrder, useSearchProjectsQuery } from 'apollo-hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import ProjectsGrid from '@/components/ProjectsGrid';

import {
  Header,
  ResultsTitle,
  SearchForm,
  SearchInput,
  StyledProjectsGrid,
  StyledSearch,
  Subtitle,
  Title,
  TotalCount,
} from './styles';

function Search() {
  const { query, push } = useRouter();

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
    <StyledSearch>
      <Header>
        <Title>Search Project Shelf</Title>
        <Subtitle>
          18,100,000+ projects from thousands of inspirational developers
        </Subtitle>
      </Header>
      <SearchForm onSubmit={handleSubmit(handleSearch)}>
        <SearchInput
          name='project-search'
          placeholder='Search...'
          defaultValue={search}
          {...register('search')}
        />
      </SearchForm>
      {!!search && (
        <>
          <ResultsTitle>{search}</ResultsTitle>
          <TotalCount>
            {data?.searchProjects?.totalCount ?? 0} projects
          </TotalCount>
        </>
      )}
      <StyledProjectsGrid>
        <ProjectsGrid
          projects={data?.searchProjects?.results ?? []}
          nextCursor={data?.searchProjects?.nextCursor}
          onRefetch={onRefetch}
          loading={loading}
          previous={`/search/${search}`}
        />
      </StyledProjectsGrid>

      <NextSeo title='Search Projects' />
    </StyledSearch>
  );
}

export default Search;
