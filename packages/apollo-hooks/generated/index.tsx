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
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

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
  action: UserFollowActions;
  userId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
  deleteManyProjects?: Maybe<Scalars['JSONObject']>;
  deleteProject?: Maybe<Scalars['String']>;
  /** Follow or unfollow a user */
  followUser: User;
  /** Like or remove like from project */
  reactToProject?: Maybe<Project>;
  signup: Scalars['JSONObject'];
  updateProject?: Maybe<Project>;
  updateProjectStatus?: Maybe<Project>;
  updateUser: User;
  uploadImage?: Maybe<Scalars['JSONObject']>;
};


export type MutationCreateProjectArgs = {
  input?: InputMaybe<CreateProjectInput>;
};


export type MutationDeleteManyProjectsArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationFollowUserArgs = {
  input?: InputMaybe<FollowUserInput>;
};


export type MutationReactToProjectArgs = {
  input?: InputMaybe<ReactToProjectInput>;
};


export type MutationSignupArgs = {
  avatar: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  input?: InputMaybe<UpdateProjectInput>;
  projectId: Scalars['ID'];
};


export type MutationUpdateProjectStatusArgs = {
  isApproved: Scalars['Boolean'];
  projectId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUsertInput>;
  userId: Scalars['String'];
};


export type MutationUploadImageArgs = {
  path: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  author: User;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isApproved: Scalars['Boolean'];
  /** If this project is liked by the current user */
  isLiked?: Maybe<Scalars['Boolean']>;
  likes: Array<User>;
  likesCount: Scalars['Int'];
  preview: Scalars['String'];
  repoLink: Scalars['String'];
  siteLink: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

/** Actions available to the user */
export enum ProjectAction {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

export type ProjectsResponse = {
  __typename?: 'ProjectsResponse';
  nextCursor?: Maybe<Scalars['String']>;
  prevCursor?: Maybe<Scalars['String']>;
  results: Array<Project>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get all approved projects */
  getApprovedProjects: ProjectsResponse;
  getCurrentUser?: Maybe<User>;
  /** Get all my projects */
  getMyProjects: ProjectsResponse;
  getProject?: Maybe<Project>;
  /** Admin query to get projects */
  getProjectsAdmin: ProjectsResponse;
  getUser?: Maybe<User>;
  /** Get all the projects from a certain user */
  getUserProjects: ProjectsResponse;
  getUsers: Array<Maybe<User>>;
  /** Search projects query */
  searchProjects: ProjectsResponse;
};


export type QueryGetApprovedProjectsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
};


export type QueryGetMyProjectsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
};


export type QueryGetProjectArgs = {
  id: Scalars['ID'];
};


export type QueryGetProjectsAdminArgs = {
  cursor?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserProjectsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QuerySearchProjectsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<SearchProjectsInput>;
};

/** Fields necessary to like or dislike a project */
export type ReactToProjectInput = {
  action: ProjectAction;
  projectId: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

/** Search order */
export enum SearchOrder {
  Asc = 'asc',
  Desc = 'desc'
}

/** Search input fields */
export type SearchProjectsInput = {
  order: SearchOrder;
  orderBy: Scalars['String'];
  search: Scalars['String'];
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['String']>;
  repoLink?: InputMaybe<Scalars['String']>;
  siteLink?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

/** Update the user information */
export type UpdateUsertInput = {
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
  followers?: Maybe<Array<User>>;
  following?: Maybe<Array<User>>;
  followingCount: Scalars['Int'];
  github?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** If this user is followed by the current user */
  isFollowing?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  projects?: Maybe<Array<Project>>;
  projectsLiked?: Maybe<Array<Project>>;
  role: Role;
};

/** Actions of follow or unfollow */
export enum UserFollowActions {
  Follow = 'FOLLOW',
  Unfollow = 'UNFOLLOW'
}

export type ProjectsResponseFragmentFragment = { __typename?: 'ProjectsResponse', nextCursor?: string | null | undefined, prevCursor?: string | null | undefined, totalCount?: number | null | undefined, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked?: boolean | null | undefined, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string, avatar?: string | null | undefined, name: string } }> };

export type GetAllProjectsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetAllProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResponse', nextCursor?: string | null | undefined, prevCursor?: string | null | undefined, totalCount?: number | null | undefined, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked?: boolean | null | undefined, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string, avatar?: string | null | undefined, name: string } }> } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  avatar: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: any };

export type GetApprovedProjectsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetApprovedProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResponse', nextCursor?: string | null | undefined, prevCursor?: string | null | undefined, totalCount?: number | null | undefined, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked?: boolean | null | undefined, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string, avatar?: string | null | undefined, name: string } }> } };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, title: string, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, likesCount: number, createdAt: any, tags: Array<string>, isLiked?: boolean | null | undefined, author: { __typename?: 'User', id: string, name: string, avatar?: string | null | undefined } } | null | undefined };

export type GetUserForPageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserForPageQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, github?: string | null | undefined, avatar?: string | null | undefined, isFollowing?: boolean | null | undefined, followerCount: number } | null | undefined };

export type ReactToProjectMutationVariables = Exact<{
  input?: InputMaybe<ReactToProjectInput>;
}>;


export type ReactToProjectMutation = { __typename?: 'Mutation', reactToProject?: { __typename?: 'Project', id: string, likesCount: number, isLiked?: boolean | null | undefined } | null | undefined };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, name: string, email: string, github?: string | null | undefined, discord?: string | null | undefined, avatar?: string | null | undefined } | null | undefined };

export type CreateUserProjectMutationVariables = Exact<{
  input?: InputMaybe<CreateProjectInput>;
}>;


export type CreateUserProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: string, title: string, preview: string, description: string, createdAt: any, siteLink: string, repoLink: string, isApproved: boolean, likes: Array<{ __typename?: 'User', id: string, name: string }> } | null | undefined };

export type UploadImageMutationVariables = Exact<{
  path: Scalars['String'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', image?: any | null | undefined };

export type GetMyProjectsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetMyProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResponse', nextCursor?: string | null | undefined, prevCursor?: string | null | undefined, totalCount?: number | null | undefined, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked?: boolean | null | undefined, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string, avatar?: string | null | undefined, name: string } }> } };

export type SearchProjectsQueryVariables = Exact<{
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type SearchProjectsQuery = { __typename?: 'Query', searchProjects: { __typename?: 'ProjectsResponse', totalCount?: number | null | undefined, nextCursor?: string | null | undefined, prevCursor?: string | null | undefined, results: Array<{ __typename?: 'Project', title: string, description: string, preview: string, id: string, likesCount: number, isLiked?: boolean | null | undefined, author: { __typename?: 'User', id: string, name: string, avatar?: string | null | undefined } }> } };

export type FollowUserMutationVariables = Exact<{
  input?: InputMaybe<FollowUserInput>;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: { __typename?: 'User', id: string, name: string, isFollowing?: boolean | null | undefined, followerCount: number } };

export type GetUserProjectsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
}>;


export type GetUserProjectsQuery = { __typename?: 'Query', getUserProjects: { __typename?: 'ProjectsResponse', nextCursor?: string | null | undefined, prevCursor?: string | null | undefined, results: Array<{ __typename?: 'Project', id: string, title: string, preview: string, likesCount: number, isLiked?: boolean | null | undefined, author: { __typename?: 'User', id: string, name: string, avatar?: string | null | undefined } }> } };

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
export const GetAllProjectsDocument = gql`
    query GetAllProjects($cursor: String = null) {
  projects: getApprovedProjects(cursor: $cursor) {
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
 *      cursor: // value for 'cursor'
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
export const SignupDocument = gql`
    mutation Signup($email: String!, $name: String!, $avatar: String!) {
  signup(email: $email, name: $name, avatar: $avatar)
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
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      avatar: // value for 'avatar'
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
export const GetApprovedProjectsDocument = gql`
    query GetApprovedProjects($cursor: String = null) {
  projects: getApprovedProjects(cursor: $cursor) {
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
 *      cursor: // value for 'cursor'
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
    query GetProject($id: ID!) {
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
    isLiked
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
export const GetUserForPageDocument = gql`
    query GetUserForPage($id: ID!) {
  user: getUser(id: $id) {
    id
    name
    email
    github
    avatar
    isFollowing
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
    mutation ReactToProject($input: ReactToProjectInput) {
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
export const CreateUserProjectDocument = gql`
    mutation CreateUserProject($input: CreateProjectInput) {
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
    query GetMyProjects($cursor: String = null) {
  projects: getMyProjects(cursor: $cursor) {
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
 *      cursor: // value for 'cursor'
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
export const SearchProjectsDocument = gql`
    query SearchProjects($input: SearchProjectsInput) {
  searchProjects(input: $input) {
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
    mutation FollowUser($input: FollowUserInput) {
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
export const GetUserProjectsDocument = gql`
    query GetUserProjects($cursor: String, $userId: String) {
  getUserProjects(cursor: $cursor, userId: $userId) {
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
 *      cursor: // value for 'cursor'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
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