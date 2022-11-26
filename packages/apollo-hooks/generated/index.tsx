import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

/** Fields necessary to create a new project */
export type CreateProjectInput = {
  description: Scalars['String'];
  preview: Scalars['String'];
  repoLink: Scalars['String'];
  siteLink: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

/** Fields necessary to follow or unfollow a user */
export type FollowUserInput = {
  action?: InputMaybe<UserFollowActions>;
  userId?: InputMaybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new project */
  createProject: Project;
  /** Delete projects */
  deleteProjects: Array<Scalars['String']>;
  /** Follow or unfollow a user */
  followUser: User;
  /** Like or remove like from a project */
  reactToProject: Project;
  /** Create a new user */
  signup: Scalars['String'];
  /** Update a project */
  updateProject: Project;
  /** Update project status */
  updateProjectStatus: Project;
  /** Update the user information */
  updateUser: User;
  uploadImage: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationDeleteProjectsArgs = {
  projectIds: Array<Scalars['String']>;
};


export type MutationFollowUserArgs = {
  input: FollowUserInput;
};


export type MutationReactToProjectArgs = {
  input: ReactToProjectInput;
};


export type MutationSignupArgs = {
  token: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  input: CreateProjectInput;
  projectId: Scalars['String'];
};


export type MutationUpdateProjectStatusArgs = {
  isApproved: Scalars['Boolean'];
  projectId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUploadImageArgs = {
  path: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  author: User;
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isApproved: Scalars['Boolean'];
  isLiked: Scalars['Boolean'];
  likes: Array<User>;
  likesCount: Scalars['Int'];
  preview: Scalars['String'];
  repoLink: Scalars['String'];
  siteLink: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

/** Project actions */
export enum ProjectActions {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

/** Projects response */
export type ProjectsResponse = {
  __typename?: 'ProjectsResponse';
  nextCursor?: Maybe<Scalars['String']>;
  prevCursor?: Maybe<Scalars['String']>;
  results: Array<Project>;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /** Get approved projects */
  getApprovedProjects: ProjectsResponse;
  /** Get the current user */
  getCurrentUser: User;
  /** Get my projects */
  getMyProjects: ProjectsResponse;
  /** Get a project by id */
  getProject: Project;
  /** Get projects for admin */
  getProjectsAdmin: ProjectsResponse;
  /** Get a user by id */
  getUser: User;
  /** Get user projects */
  getUserProjects: ProjectsResponse;
  /** Get all users */
  getUsers: Array<User>;
};


export type QueryGetApprovedProjectsArgs = {
  input?: InputMaybe<SearchProjectsInput>;
};


export type QueryGetMyProjectsArgs = {
  input?: InputMaybe<SearchProjectsInput>;
};


export type QueryGetProjectArgs = {
  id: Scalars['String'];
};


export type QueryGetProjectsAdminArgs = {
  input?: InputMaybe<SearchProjectsInput>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetUserProjectsArgs = {
  input?: InputMaybe<SearchProjectsInput>;
  userId: Scalars['String'];
};

/** React to project input */
export type ReactToProjectInput = {
  action: ProjectActions;
  projectId: Scalars['String'];
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

/** Search order */
export enum SearchOrder {
  Asc = 'asc',
  Desc = 'desc'
}

/** Search projects input */
export type SearchProjectsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<SearchOrder>;
  orderBy?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

/** Update the user information */
export type UpdateUserInput = {
  discord: Scalars['String'];
  email: Scalars['String'];
  github: Scalars['String'];
  name: Scalars['String'];
  role: Role;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  followerCount: Scalars['Int'];
  followers: Array<User>;
  following: Array<User>;
  followingCount: Scalars['Int'];
  github?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isFollowing: Scalars['Boolean'];
  name: Scalars['String'];
  projects?: Maybe<Array<Project>>;
  projectsLiked: Array<Project>;
  role: Role;
};

/** Actions of follow or unfollow */
export enum UserFollowActions {
  Follow = 'FOLLOW',
  Unfollow = 'UNFOLLOW'
}

export type SignupMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: string };

export type ProjectsResponseFragmentFragment = { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, totalCount: number, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked: boolean, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string, avatar?: string | null, name: string } }> };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: string, name: string, email: string, github?: string | null, discord?: string | null, avatar?: string | null } };

export type GetAllProjectsQueryVariables = Exact<{
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type GetAllProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, totalCount: number, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked: boolean, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string, avatar?: string | null, name: string } }> } };

export type GetApprovedProjectsQueryVariables = Exact<{
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type GetApprovedProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, totalCount: number, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked: boolean, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string, avatar?: string | null, name: string } }> } };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, title: string, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, likesCount: number, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: string, name: string, avatar?: string | null } } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, name: string, email: string, github?: string | null, avatar?: string | null, followerCount: number }> };

export type GetUserForPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserForPageQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, email: string, github?: string | null, avatar?: string | null, followerCount: number } };

export type ReactToProjectMutationVariables = Exact<{
  input: ReactToProjectInput;
}>;


export type ReactToProjectMutation = { __typename?: 'Mutation', reactToProject: { __typename?: 'Project', id: string, likesCount: number, isLiked: boolean } };

export type CreateUserProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateUserProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, title: string, preview: string, description: string, createdAt: any, siteLink: string, repoLink: string, isApproved: boolean, likes: Array<{ __typename?: 'User', id: string, name: string }> } };

export type UploadImageMutationVariables = Exact<{
  path: Scalars['String'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', image: string };

export type GetMyProjectsQueryVariables = Exact<{
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type GetMyProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, totalCount: number, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked: boolean, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string, avatar?: string | null, name: string } }> } };

export type GetProjectLikedStatusQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProjectLikedStatusQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, isLiked: boolean, likesCount: number } };

export type SearchProjectsQueryVariables = Exact<{
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type SearchProjectsQuery = { __typename?: 'Query', searchProjects: { __typename?: 'ProjectsResponse', totalCount: number, nextCursor?: string | null, prevCursor?: string | null, results: Array<{ __typename?: 'Project', title: string, description: string, preview: string, id: string, likesCount: number, isLiked: boolean, author: { __typename?: 'User', id: string, name: string, avatar?: string | null } }> } };

export type FollowUserMutationVariables = Exact<{
  input: FollowUserInput;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: { __typename?: 'User', id: string, name: string, isFollowing: boolean, followerCount: number } };

export type IsUserFollowingQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IsUserFollowingQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, isFollowing: boolean } };

export type GetUserProjectsQueryVariables = Exact<{
  userId: Scalars['String'];
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type GetUserProjectsQuery = { __typename?: 'Query', getUserProjects: { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, results: Array<{ __typename?: 'Project', id: string, title: string, preview: string, likesCount: number, isLiked: boolean, author: { __typename?: 'User', id: string, name: string, avatar?: string | null } }> } };

export const ProjectsResponseFragmentFragmentDoc = gql`
    fragment ProjectsResponseFragment on ProjectsResponse {
  nextCursor
  prevCursor
  totalCount
  results {
    id
    title
    createdAt
    isLiked
    likesCount
    tags
    preview
    repoLink
    siteLink
    author {
      id
      avatar
      name
    }
    description
    isApproved
  }
}
    `;
export const SignupDocument = gql`
    mutation Signup($token: String!) {
  signup(token: $token)
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    name
    email
    github
    discord
    avatar
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetAllProjectsDocument = gql`
    query GetAllProjects($input: SearchProjectsInput) {
  projects: getApprovedProjects(input: $input) {
    ...ProjectsResponseFragment
  }
}
    ${ProjectsResponseFragmentFragmentDoc}`;

/**
 * __useGetAllProjectsQuery__
 *
 * To run a query within a React component, call `useGetAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
      }
export function useGetAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
        }
export type GetAllProjectsQueryHookResult = ReturnType<typeof useGetAllProjectsQuery>;
export type GetAllProjectsLazyQueryHookResult = ReturnType<typeof useGetAllProjectsLazyQuery>;
export type GetAllProjectsQueryResult = Apollo.QueryResult<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const GetApprovedProjectsDocument = gql`
    query GetApprovedProjects($input: SearchProjectsInput) {
  projects: getApprovedProjects(input: $input) {
    ...ProjectsResponseFragment
  }
}
    ${ProjectsResponseFragmentFragmentDoc}`;

/**
 * __useGetApprovedProjectsQuery__
 *
 * To run a query within a React component, call `useGetApprovedProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApprovedProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApprovedProjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetApprovedProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetApprovedProjectsQuery, GetApprovedProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApprovedProjectsQuery, GetApprovedProjectsQueryVariables>(GetApprovedProjectsDocument, options);
      }
export function useGetApprovedProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApprovedProjectsQuery, GetApprovedProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApprovedProjectsQuery, GetApprovedProjectsQueryVariables>(GetApprovedProjectsDocument, options);
        }
export type GetApprovedProjectsQueryHookResult = ReturnType<typeof useGetApprovedProjectsQuery>;
export type GetApprovedProjectsLazyQueryHookResult = ReturnType<typeof useGetApprovedProjectsLazyQuery>;
export type GetApprovedProjectsQueryResult = Apollo.QueryResult<GetApprovedProjectsQuery, GetApprovedProjectsQueryVariables>;
export const GetProjectDocument = gql`
    query GetProject($id: String!) {
  project: getProject(id: $id) {
    id
    title
    preview
    repoLink
    siteLink
    description
    isApproved
    likesCount
    createdAt
    tags
    author {
      id
      name
      avatar
    }
  }
}
    `;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getUsers {
    id
    name
    email
    github
    avatar
    followerCount
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserForPageDocument = gql`
    query GetUserForPage($id: String!) {
  user: getUser(id: $id) {
    id
    name
    email
    github
    avatar
    followerCount
  }
}
    `;

/**
 * __useGetUserForPageQuery__
 *
 * To run a query within a React component, call `useGetUserForPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserForPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserForPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserForPageQuery(baseOptions: Apollo.QueryHookOptions<GetUserForPageQuery, GetUserForPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserForPageQuery, GetUserForPageQueryVariables>(GetUserForPageDocument, options);
      }
export function useGetUserForPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserForPageQuery, GetUserForPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserForPageQuery, GetUserForPageQueryVariables>(GetUserForPageDocument, options);
        }
export type GetUserForPageQueryHookResult = ReturnType<typeof useGetUserForPageQuery>;
export type GetUserForPageLazyQueryHookResult = ReturnType<typeof useGetUserForPageLazyQuery>;
export type GetUserForPageQueryResult = Apollo.QueryResult<GetUserForPageQuery, GetUserForPageQueryVariables>;
export const ReactToProjectDocument = gql`
    mutation ReactToProject($input: ReactToProjectInput!) {
  reactToProject(input: $input) {
    id
    likesCount
    isLiked
  }
}
    `;
export type ReactToProjectMutationFn = Apollo.MutationFunction<ReactToProjectMutation, ReactToProjectMutationVariables>;

/**
 * __useReactToProjectMutation__
 *
 * To run a mutation, you first call `useReactToProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactToProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactToProjectMutation, { data, loading, error }] = useReactToProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReactToProjectMutation(baseOptions?: Apollo.MutationHookOptions<ReactToProjectMutation, ReactToProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReactToProjectMutation, ReactToProjectMutationVariables>(ReactToProjectDocument, options);
      }
export type ReactToProjectMutationHookResult = ReturnType<typeof useReactToProjectMutation>;
export type ReactToProjectMutationResult = Apollo.MutationResult<ReactToProjectMutation>;
export type ReactToProjectMutationOptions = Apollo.BaseMutationOptions<ReactToProjectMutation, ReactToProjectMutationVariables>;
export const CreateUserProjectDocument = gql`
    mutation CreateUserProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    title
    preview
    description
    createdAt
    siteLink
    repoLink
    isApproved
    likes {
      id
      name
    }
  }
}
    `;
export type CreateUserProjectMutationFn = Apollo.MutationFunction<CreateUserProjectMutation, CreateUserProjectMutationVariables>;

/**
 * __useCreateUserProjectMutation__
 *
 * To run a mutation, you first call `useCreateUserProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserProjectMutation, { data, loading, error }] = useCreateUserProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserProjectMutation, CreateUserProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserProjectMutation, CreateUserProjectMutationVariables>(CreateUserProjectDocument, options);
      }
export type CreateUserProjectMutationHookResult = ReturnType<typeof useCreateUserProjectMutation>;
export type CreateUserProjectMutationResult = Apollo.MutationResult<CreateUserProjectMutation>;
export type CreateUserProjectMutationOptions = Apollo.BaseMutationOptions<CreateUserProjectMutation, CreateUserProjectMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($path: String!) {
  image: uploadImage(path: $path)
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const GetMyProjectsDocument = gql`
    query GetMyProjects($input: SearchProjectsInput) {
  projects: getMyProjects(input: $input) {
    ...ProjectsResponseFragment
  }
}
    ${ProjectsResponseFragmentFragmentDoc}`;

/**
 * __useGetMyProjectsQuery__
 *
 * To run a query within a React component, call `useGetMyProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProjectsQuery, GetMyProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProjectsQuery, GetMyProjectsQueryVariables>(GetMyProjectsDocument, options);
      }
export function useGetMyProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProjectsQuery, GetMyProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProjectsQuery, GetMyProjectsQueryVariables>(GetMyProjectsDocument, options);
        }
export type GetMyProjectsQueryHookResult = ReturnType<typeof useGetMyProjectsQuery>;
export type GetMyProjectsLazyQueryHookResult = ReturnType<typeof useGetMyProjectsLazyQuery>;
export type GetMyProjectsQueryResult = Apollo.QueryResult<GetMyProjectsQuery, GetMyProjectsQueryVariables>;
export const GetProjectLikedStatusDocument = gql`
    query GetProjectLikedStatus($id: String!) {
  project: getProject(id: $id) {
    id
    isLiked
    likesCount
  }
}
    `;

/**
 * __useGetProjectLikedStatusQuery__
 *
 * To run a query within a React component, call `useGetProjectLikedStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectLikedStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectLikedStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectLikedStatusQuery(baseOptions: Apollo.QueryHookOptions<GetProjectLikedStatusQuery, GetProjectLikedStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectLikedStatusQuery, GetProjectLikedStatusQueryVariables>(GetProjectLikedStatusDocument, options);
      }
export function useGetProjectLikedStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectLikedStatusQuery, GetProjectLikedStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectLikedStatusQuery, GetProjectLikedStatusQueryVariables>(GetProjectLikedStatusDocument, options);
        }
export type GetProjectLikedStatusQueryHookResult = ReturnType<typeof useGetProjectLikedStatusQuery>;
export type GetProjectLikedStatusLazyQueryHookResult = ReturnType<typeof useGetProjectLikedStatusLazyQuery>;
export type GetProjectLikedStatusQueryResult = Apollo.QueryResult<GetProjectLikedStatusQuery, GetProjectLikedStatusQueryVariables>;
export const SearchProjectsDocument = gql`
    query SearchProjects($input: SearchProjectsInput) {
  searchProjects: getApprovedProjects(input: $input) {
    results {
      title
      description
      preview
      id
      likesCount
      author {
        id
        name
        avatar
      }
      isLiked
    }
    totalCount
    nextCursor
    prevCursor
  }
}
    `;

/**
 * __useSearchProjectsQuery__
 *
 * To run a query within a React component, call `useSearchProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchProjectsQuery(baseOptions?: Apollo.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
      }
export function useSearchProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
        }
export type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>;
export type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>;
export type SearchProjectsQueryResult = Apollo.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($input: FollowUserInput!) {
  followUser(input: $input) {
    id
    name
    isFollowing
    followerCount
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const IsUserFollowingDocument = gql`
    query IsUserFollowing($id: String!) {
  user: getUser(id: $id) {
    id
    isFollowing
  }
}
    `;

/**
 * __useIsUserFollowingQuery__
 *
 * To run a query within a React component, call `useIsUserFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserFollowingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIsUserFollowingQuery(baseOptions: Apollo.QueryHookOptions<IsUserFollowingQuery, IsUserFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsUserFollowingQuery, IsUserFollowingQueryVariables>(IsUserFollowingDocument, options);
      }
export function useIsUserFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUserFollowingQuery, IsUserFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsUserFollowingQuery, IsUserFollowingQueryVariables>(IsUserFollowingDocument, options);
        }
export type IsUserFollowingQueryHookResult = ReturnType<typeof useIsUserFollowingQuery>;
export type IsUserFollowingLazyQueryHookResult = ReturnType<typeof useIsUserFollowingLazyQuery>;
export type IsUserFollowingQueryResult = Apollo.QueryResult<IsUserFollowingQuery, IsUserFollowingQueryVariables>;
export const GetUserProjectsDocument = gql`
    query GetUserProjects($userId: String!, $input: SearchProjectsInput) {
  getUserProjects(userId: $userId, input: $input) {
    nextCursor
    prevCursor
    results {
      id
      title
      preview
      likesCount
      isLiked
      author {
        id
        name
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetUserProjectsQuery__
 *
 * To run a query within a React component, call `useGetUserProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProjectsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, options);
      }
export function useGetUserProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, options);
        }
export type GetUserProjectsQueryHookResult = ReturnType<typeof useGetUserProjectsQuery>;
export type GetUserProjectsLazyQueryHookResult = ReturnType<typeof useGetUserProjectsLazyQuery>;
export type GetUserProjectsQueryResult = Apollo.QueryResult<GetUserProjectsQuery, GetUserProjectsQueryVariables>;