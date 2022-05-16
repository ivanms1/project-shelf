import React from 'react';
import { SearchOrder, useSearchProjectsQuery } from 'apollo-hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import ProjectsGrid from '@/components/ProjectsGrid';

import {
  Header,
  ResultsTitle,
  SearchForm,
  SearchInput,
  StyledSearch,
  Subtitle,
  Title,
  TotalCount,
} from './styles';

function Search() {
  const { query, push } = useRouter();

  const { register, handleSubmit } = useForm<{ search: string }>();

  const { loading, data, fetchMore } = useSearchProjectsQuery({
    variables: {
      input: {
        search: query?.search?.[0],
        orderBy: 'createdAt',
        order: SearchOrder.Asc,
      },
    },
    skip: !query?.search?.[0],
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
        cursor: data?.searchProjects?.nextCursor,
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
          defaultValue={query?.search?.[0]}
          {...register('search')}
        />
      </SearchForm>
      {!!query?.search?.[0] && (
        <>
          <ResultsTitle>{query?.search?.[0]}</ResultsTitle>
          <TotalCount>
            {data?.searchProjects?.totalCount ?? 0} projects
          </TotalCount>
        </>
      )}

      <ProjectsGrid
        projects={data?.searchProjects?.results ?? []}
        nextCursor={data?.searchProjects?.nextCursor}
        onRefetch={onRefetch}
        loading={loading}
        previous={`/search/${query?.search?.[0]}`}
      />
    </StyledSearch>
  );
}

export default Search;
