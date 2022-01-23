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
  tags: Array<InputMaybe<Scalars['String']>>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
  deleteManyProjects?: Maybe<Scalars['JSONObject']>;
  deleteProject?: Maybe<Scalars['String']>;
  login: Scalars['JSONObject'];
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
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationReactToProjectArgs = {
  input?: InputMaybe<ReactToProjectInput>;
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
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
  getUsers: Array<Maybe<User>>;
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

export type ReactToProjectInput = {
  action: ProjectAction;
  projectId: Scalars['ID'];
  userId: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['String']>;
  repoLink?: InputMaybe<Scalars['String']>;
  siteLink?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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
  github?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  projects?: Maybe<Array<Project>>;
  projectsLiked?: Maybe<Array<Project>>;
  role: Role;
};

export type ProjectsResponseFragmentFragment = { __typename?: 'ProjectsResponse', nextCursor?: string | null | undefined, prevCursor?: string | null | undefined, totalCount?: number | null | undefined, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked?: boolean | null | undefined, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string } }> };

export type CreateUserProjectMutationVariables = Exact<{
  input?: InputMaybe<CreateProjectInput>;
}>;


export type CreateUserProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: string, title: string, preview: string, description: string, createdAt: any, siteLink: string, repoLink: string, isApproved: boolean, likes: Array<{ __typename?: 'User', id: string, name: string }> } | null | undefined };

export type GetAllProjectsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetAllProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResponse', nextCursor?: string | null | undefined, prevCursor?: string | null | undefined, totalCount?: number | null | undefined, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked?: boolean | null | undefined, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string } }> } };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: any };

export type GetMyProjectsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetMyProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResponse', nextCursor?: string | null | undefined, prevCursor?: string | null | undefined, totalCount?: number | null | undefined, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked?: boolean | null | undefined, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string } }> } };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', signup: any };

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
    }
    description
    isApproved
  }
}
    `;
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
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
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
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name)
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;