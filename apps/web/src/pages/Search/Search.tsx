import React from 'react';
import { SearchOrder, useSearchProjectsQuery } from 'apollo-hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import ProjectsGrid from '@/components/ProjectsGrid';

import { StyledSearch } from './styles';

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
      <h1>Search</h1>
      <form onSubmit={handleSubmit(handleSearch)}>
        <input defaultValue={query?.search?.[0]} {...register('search')} />
      </form>
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
