import React, { useState, useEffect } from 'react';
import { useLazyQuery, NetworkStatus } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Waypoint } from 'react-waypoint';

import Cardtwo from '../../components/Cardv2';
import SearchInput from '../../components/Search/SearchInput';
import Spinner from '../../components/Spinner';

import { ReactComponent as SearchIcon } from '../../assets/search.svg';

import { Container, CardContainer, InitialSearchContainer } from './style';

const QUERY_WEEKLY_PROJECTS = loader('./queryGetProjects.graphql');

const CategoryOptions = [
  { value: 'title', label: 'Title' },
  { value: 'description', label: 'Description' },
  { value: 'tags', label: 'Tags' },
];

const SortOptions = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [sortBy, setSortBy] = useState({ field: 'title', value: 'asc' });
  const [checkByCreatedDate, setCheckByCreatedDate] = useState(false);
  const [filterBy, setFilterBy] = useState({
    field: CategoryOptions[0].value,
    value: '',
  });

  const debounceSave = (nextValue, sortValue = 'asc') => {
    console.log(sortValue, 'lazyFetch');
    lazyFetch({
      variables: {
        cursor: undefined,
        modifiers: {
          sortBy: {
            field: checkByCreatedDate ? 'createdAt' : 'title',
            value: sortValue ? sortValue : undefined,
          },
          filterBy: {
            field: filterBy?.field,
            value: nextValue ? nextValue : undefined,
          },
        },
      },
    });
  };

  const handleChange = (e) => {
    const { value: nextValue } = e.target;
    setFilterBy({ ...filterBy, value: nextValue });
  };

  const handleDropDownChange = (e) => {
    setCheckByCreatedDate(e.value == 'createdAt' ? true : false);
    setFilterBy({ field: e?.value, value: '' });
    debounceSave(filterBy.value, sortBy?.value);
  };

  const handleSortDropDownChange = (e) => {
    setSortBy({
      field: checkByCreatedDate ? 'createdAt' : 'title',
      value: e?.value,
    });
    debounceSave(filterBy.value, e?.value);
  };

  const handleCheckedChange = (e) => {
    setCheckByCreatedDate(e);
  };

  const [
    lazyFetch,
    { data, loading, error, fetchMore, networkStatus, called },
  ] = useLazyQuery(QUERY_WEEKLY_PROJECTS, {
    variables: {
      cursor: undefined,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debounceSave(filterBy?.value);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [filterBy?.value, checkByCreatedDate]);

  if (error) {
    return <p>Sorry, something went wrong.</p>;
  }

  const onRefetch = () => {
    if (!data?.projects?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        cursor: data?.projects?.nextCursor,
        modifiers: {
          sortBy,
          filterBy,
        },
      },
    });
  };

  return (
    <Container>
      {/* <p>Welcome! Here are some recently submitted projects</p> */}
      <div
        style={{
          width: '100%',
          // border: '2px solid green',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <InitialSearchContainer
          showSearch={showSearch}
          onClick={() => {
            setShowSearch(!showSearch);
          }}
        >
          <SearchIcon />
        </InitialSearchContainer>
      </div>
      {showSearch && (
        <div style={{ margin: '30px 0 80px 0' }}>
          <SearchInput
            SortOptions={SortOptions}
            options={CategoryOptions}
            inputValue={filterBy?.value}
            inputOnChange={(e) => handleChange(e)}
            dropDownValue={filterBy?.field}
            dropDownOnChange={(e) => handleDropDownChange(e)}
            sortDropDownOnChange={(e) => handleSortDropDownChange(e)}
            checked={handleCheckedChange}
            type='text'
          />
        </div>
      )}

      <CardContainer>
        {networkStatus === NetworkStatus.setVariables ||
        networkStatus === NetworkStatus.refetch ||
        !data?.projects?.results?.length ? (
          <p className='noproject'>No projects are currently live</p>
        ) : (
          <>
            {data?.projects?.results.map((project) => (
              <Cardtwo key={project.id} project={project} />
            ))}
          </>
        )}
      </CardContainer>
      {!loading && data?.projects?.nextCursor && (
        <Waypoint onEnter={onRefetch} bottomOffset='-20%' />
      )}
      {loading && data?.projects?.nextCursor && (
        <Spinner padding={20} type='black' />
      )}
    </Container>
  );
}

export default Home;
