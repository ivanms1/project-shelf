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

export type Like = {
  __typename?: 'Like';
  author: User;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  project: Project;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new like */
  createLike: Like;
  /** Create a new project */
  createProject: Project;
  /** Delete a like */
  deleteLike: Like;
  /** Delete projects */
  deleteProjects: Array<Scalars['String']>;
  /** Follow or unfollow a user */
  followUser: User;
  /** Login in as a admin */
  loginAsAdmin: Scalars['String'];
  /** Create a new user */
  signup: Scalars['String'];
  /** Update a project */
  updateProject: Project;
  /** Update project status */
  updateProjectStatus: Project;
  /** Update the user information */
  updateUser: User;
  /** Update the user ban status */
  updateUserBanStatus: User;
  /** Update the user role */
  updateUserRole: User;
  uploadImage: Scalars['String'];
};


export type MutationCreateLikeArgs = {
  authorId: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationDeleteLikeArgs = {
  projectId: Scalars['String'];
};


export type MutationDeleteProjectsArgs = {
  projectIds: Array<Scalars['String']>;
};


export type MutationFollowUserArgs = {
  input: FollowUserInput;
};


export type MutationLoginAsAdminArgs = {
  token: Scalars['String'];
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
  input: UpdateUserInput;
};


export type MutationUpdateUserBanStatusArgs = {
  isBanned: Scalars['Boolean'];
  userId: Scalars['String'];
};


export type MutationUpdateUserRoleArgs = {
  role: Role;
  userId: Scalars['String'];
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
  likes: Array<Like>;
  likesCount: Scalars['Int'];
  preview: Scalars['String'];
  repoLink: Scalars['String'];
  siteLink: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};

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
  /** Get all users */
  getAllUsers: UserResponse;
  /** Get all users for admin table */
  getAllUsersAdmin: UsersResponse;
  /** Get approved projects */
  getApprovedProjects: ProjectsResponse;
  /** Get the current user */
  getCurrentUser: User;
  /** Get the current user for admin */
  getCurrentUserAdmin: User;
  /** Get most liked projects */
  getMostLikedProjects: ProjectsResponse;
  /** Get my projects */
  getMyProjects: ProjectsResponse;
  /** Get a project by id */
  getProject: Project;
  /** Get projects for admin */
  getProjectsAdmin: ProjectsResponse;
  /** Get top creators for home page */
  getTopCreatorsForHomePage: TopCreatorsResponse;
  /** Get top projects */
  getTopProjects: TopProjectsResponse;
  /** Get top projects for home page */
  getTopProjectsForHomePage: TopProjectsResponse;
  /** Get top users */
  getTopUsers: TopCreatorsResponse;
  /** Get a user by id */
  getUser: User;
  /** Get user projects */
  getUserProjects: ProjectsResponse;
};


export type QueryGetAllUsersAdminArgs = {
  input?: InputMaybe<SearchUsersInput>;
};


export type QueryGetApprovedProjectsArgs = {
  input?: InputMaybe<SearchProjectsInput>;
};


export type QueryGetMostLikedProjectsArgs = {
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


export type QueryGetTopProjectsArgs = {
  interval?: InputMaybe<Scalars['String']>;
};


export type QueryGetTopUsersArgs = {
  interval?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGetUserProjectsArgs = {
  input?: InputMaybe<SearchProjectsInput>;
  userId: Scalars['String'];
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

/** Search user input */
export type SearchUsersInput = {
  cursor?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<SearchOrder>;
  orderBy?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

/** Top users response */
export type TopCreatorsResponse = {
  __typename?: 'TopCreatorsResponse';
  results: Array<User>;
};

/** Top projects response */
export type TopProjectsResponse = {
  __typename?: 'TopProjectsResponse';
  results: Array<Project>;
};

/** Update the user information */
export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  banned?: InputMaybe<Scalars['Boolean']>;
  bio?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  banned: Scalars['Boolean'];
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  discord?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  followers: Array<User>;
  followersCount: Scalars['Int'];
  following: Array<User>;
  followingCount: Scalars['Int'];
  github?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isFollowing: Scalars['Boolean'];
  likesReceived: Scalars['Int'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  projects?: Maybe<Array<Project>>;
  projectsCount: Scalars['Int'];
  role: Role;
  twitter?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  website?: Maybe<Scalars['String']>;
};

/** Actions of follow or unfollow */
export enum UserFollowActions {
  Follow = 'FOLLOW',
  Unfollow = 'UNFOLLOW'
}

/** User response */
export type UserResponse = {
  __typename?: 'UserResponse';
  bannedUsers: Scalars['Int'];
  results: Array<User>;
  totalCount: Scalars['Int'];
};

/** User response */
export type UsersResponse = {
  __typename?: 'UsersResponse';
  nextCursor?: Maybe<Scalars['String']>;
  prevCursor?: Maybe<Scalars['String']>;
  results: Array<User>;
  totalCount: Scalars['Int'];
};

export type LoginAsAdminMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type LoginAsAdminMutation = { __typename?: 'Mutation', loginAsAdmin: string };

export type ProjectsResponseFragmentFragment = { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, totalCount: number, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked: boolean, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string, avatar?: string | null, name: string } }> };

export type GetCurrentUserAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserAdminQuery = { __typename?: 'Query', getCurrentUserAdmin: { __typename?: 'User', id: string, name: string, email?: string | null, github?: string | null, discord?: string | null, avatar?: string | null, cover?: string | null, bio?: string | null, location?: string | null, website?: string | null, twitter?: string | null } };

export type GetAllProjectsQueryVariables = Exact<{
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type GetAllProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, totalCount: number, results: Array<{ __typename?: 'Project', id: string, title: string, createdAt: any, isLiked: boolean, likesCount: number, tags: Array<string>, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, author: { __typename?: 'User', id: string, avatar?: string | null, name: string } }> } };

export type GetProjectsAdminQueryVariables = Exact<{
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type GetProjectsAdminQuery = { __typename?: 'Query', getProjectsAdmin: { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, totalCount: number, results: Array<{ __typename?: 'Project', id: string, isApproved: boolean, title: string, preview: string, description: string, createdAt: any, repoLink: string, siteLink: string, tags: Array<string>, author: { __typename?: 'User', name: string, avatar?: string | null } }> } };

export type UpdateUserBanStatusMutationVariables = Exact<{
  isBanned: Scalars['Boolean'];
  userId: Scalars['String'];
}>;


export type UpdateUserBanStatusMutation = { __typename?: 'Mutation', updateUserBanStatus: { __typename?: 'User', id: string, banned: boolean } };

export type UpdateUserRoleMutationVariables = Exact<{
  role: Role;
  userId: Scalars['String'];
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: { __typename?: 'User', id: string, role: Role } };

export type GetAllUsersAdminQueryVariables = Exact<{
  input?: InputMaybe<SearchUsersInput>;
}>;


export type GetAllUsersAdminQuery = { __typename?: 'Query', getAllUsersAdmin: { __typename?: 'UsersResponse', nextCursor?: string | null, prevCursor?: string | null, results: Array<{ __typename?: 'User', avatar?: string | null, banned: boolean, createdAt: any, email?: string | null, followersCount: number, followingCount: number, github?: string | null, id: string, location?: string | null, name: string, role: Role, projectsCount: number }> } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: { __typename?: 'UserResponse', totalCount: number, bannedUsers: number, results: Array<{ __typename?: 'User', name: string, avatar?: string | null, id: string, role: Role, website?: string | null, createdAt: any, banned: boolean, github?: string | null, email?: string | null, projects?: Array<{ __typename?: 'Project', preview: string }> | null }> } };

export type SignupMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: string };

export type GetApprovedProjectsQueryVariables = Exact<{
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type GetApprovedProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, totalCount: number, results: Array<{ __typename?: 'Project', id: string, title: string, likesCount: number, preview: string, isLiked: boolean, author: { __typename?: 'User', id: string, avatar?: string | null, name: string } }> } };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, title: string, preview: string, repoLink: string, siteLink: string, description: string, isApproved: boolean, likesCount: number, createdAt: any, tags: Array<string>, author: { __typename?: 'User', id: string, name: string, avatar?: string | null } } };

export type GetTopCreatorsForHomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopCreatorsForHomePageQuery = { __typename?: 'Query', getTopCreatorsForHomePage: { __typename?: 'TopCreatorsResponse', results: Array<{ __typename?: 'User', id: string, likesReceived: number, name: string, avatar?: string | null }> } };

export type GetTopProjectsForHomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopProjectsForHomePageQuery = { __typename?: 'Query', getTopProjectsForHomePage: { __typename?: 'TopProjectsResponse', results: Array<{ __typename?: 'Project', id: string, preview: string, title: string, likesCount: number, author: { __typename?: 'User', avatar?: string | null, id: string, name: string } }> } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getAllUsers: { __typename?: 'UserResponse', totalCount: number, results: Array<{ __typename?: 'User', id: string, name: string, email?: string | null, github?: string | null, avatar?: string | null }> } };

export type GetUserForPageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserForPageQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, bio?: string | null, name: string, email?: string | null, github?: string | null, avatar?: string | null, cover?: string | null, website?: string | null, twitter?: string | null, discord?: string | null, likesReceived: number, location?: string | null } };

export type CreateLikeMutationVariables = Exact<{
  authorId: Scalars['String'];
  projectId: Scalars['String'];
}>;


export type CreateLikeMutation = { __typename?: 'Mutation', createLike: { __typename?: 'Like', id: string, project: { __typename?: 'Project', id: string, likesCount: number, isLiked: boolean } } };

export type DeleteLikeMutationVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type DeleteLikeMutation = { __typename?: 'Mutation', deleteLike: { __typename?: 'Like', id: string, project: { __typename?: 'Project', id: string, likesCount: number, isLiked: boolean } } };

export type ProjectCardFragmentFragment = { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, totalCount: number, results: Array<{ __typename?: 'Project', id: string, title: string, likesCount: number, preview: string, isLiked: boolean, author: { __typename?: 'User', id: string, avatar?: string | null, name: string } }> };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: string, name: string, email?: string | null, github?: string | null, discord?: string | null, avatar?: string | null, cover?: string | null, bio?: string | null, location?: string | null, website?: string | null, twitter?: string | null } };

export type CreateUserProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateUserProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, title: string, preview: string, description: string, createdAt: any, siteLink: string, repoLink: string, isApproved: boolean } };

export type UploadImageMutationVariables = Exact<{
  path: Scalars['String'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', image: string };

export type GetProjectLikedStatusQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProjectLikedStatusQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, isLiked: boolean, likesCount: number } };

export type DeleteProjectsMutationVariables = Exact<{
  projectIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteProjectsMutation = { __typename?: 'Mutation', deleteProjects: Array<string> };

export type UpdateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
  projectId: Scalars['String'];
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, preview: string, repoLink: string, siteLink: string, tags: Array<string>, title: string, updatedAt: any } };

export type SearchProjectsQueryVariables = Exact<{
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type SearchProjectsQuery = { __typename?: 'Query', searchProjects: { __typename?: 'ProjectsResponse', totalCount: number, nextCursor?: string | null, prevCursor?: string | null, results: Array<{ __typename?: 'Project', title: string, description: string, preview: string, id: string, likesCount: number, isLiked: boolean, author: { __typename?: 'User', id: string, name: string, avatar?: string | null } }> } };

export type GetTopUsersQueryVariables = Exact<{
  interval?: InputMaybe<Scalars['String']>;
}>;


export type GetTopUsersQuery = { __typename?: 'Query', getTopUsers: { __typename?: 'TopCreatorsResponse', results: Array<{ __typename?: 'User', id: string, name: string, avatar?: string | null, likesReceived: number, followersCount: number }> } };

export type GetTopProjectsQueryVariables = Exact<{
  interval?: InputMaybe<Scalars['String']>;
}>;


export type GetTopProjectsQuery = { __typename?: 'Query', getTopProjects: { __typename?: 'TopProjectsResponse', results: Array<{ __typename?: 'Project', title: string, likesCount: number, id: string, preview: string, tags: Array<string> }> } };

export type FollowUserMutationVariables = Exact<{
  input: FollowUserInput;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: { __typename?: 'User', id: string, name: string, isFollowing: boolean, followersCount: number } };

export type IsUserFollowingQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IsUserFollowingQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, isFollowing: boolean, followersCount: number } };

export type GetUserProjectsQueryVariables = Exact<{
  userId: Scalars['String'];
  input?: InputMaybe<SearchProjectsInput>;
}>;


export type GetUserProjectsQuery = { __typename?: 'Query', getUserProjects: { __typename?: 'ProjectsResponse', nextCursor?: string | null, prevCursor?: string | null, totalCount: number, results: Array<{ __typename?: 'Project', id: string, title: string, preview: string, likesCount: number, isLiked: boolean, author: { __typename?: 'User', id: string, name: string, avatar?: string | null } }> } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, discord?: string | null, website?: string | null, twitter?: string | null, bio?: string | null, location?: string | null, avatar?: string | null, cover?: string | null } };

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
export const ProjectCardFragmentFragmentDoc = gql`
    fragment ProjectCardFragment on ProjectsResponse {
  nextCursor
  prevCursor
  totalCount
  results {
    id
    title
    likesCount
    preview
    isLiked
    author {
      id
      avatar
      name
    }
  }
}
    `;
export const LoginAsAdminDocument = gql`
    mutation LoginAsAdmin($token: String!) {
  loginAsAdmin(token: $token)
}
    `;
export type LoginAsAdminMutationFn = Apollo.MutationFunction<LoginAsAdminMutation, LoginAsAdminMutationVariables>;

/**
 * __useLoginAsAdminMutation__
 *
 * To run a mutation, you first call `useLoginAsAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAsAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAsAdminMutation, { data, loading, error }] = useLoginAsAdminMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useLoginAsAdminMutation(baseOptions?: Apollo.MutationHookOptions<LoginAsAdminMutation, LoginAsAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginAsAdminMutation, LoginAsAdminMutationVariables>(LoginAsAdminDocument, options);
      }
export type LoginAsAdminMutationHookResult = ReturnType<typeof useLoginAsAdminMutation>;
export type LoginAsAdminMutationResult = Apollo.MutationResult<LoginAsAdminMutation>;
export type LoginAsAdminMutationOptions = Apollo.BaseMutationOptions<LoginAsAdminMutation, LoginAsAdminMutationVariables>;
export const GetCurrentUserAdminDocument = gql`
    query GetCurrentUserAdmin {
  getCurrentUserAdmin {
    id
    name
    email
    github
    discord
    avatar
    cover
    bio
    location
    website
    twitter
  }
}
    `;

/**
 * __useGetCurrentUserAdminQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserAdminQuery, GetCurrentUserAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserAdminQuery, GetCurrentUserAdminQueryVariables>(GetCurrentUserAdminDocument, options);
      }
export function useGetCurrentUserAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserAdminQuery, GetCurrentUserAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserAdminQuery, GetCurrentUserAdminQueryVariables>(GetCurrentUserAdminDocument, options);
        }
export type GetCurrentUserAdminQueryHookResult = ReturnType<typeof useGetCurrentUserAdminQuery>;
export type GetCurrentUserAdminLazyQueryHookResult = ReturnType<typeof useGetCurrentUserAdminLazyQuery>;
export type GetCurrentUserAdminQueryResult = Apollo.QueryResult<GetCurrentUserAdminQuery, GetCurrentUserAdminQueryVariables>;
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
export const GetProjectsAdminDocument = gql`
    query GetProjectsAdmin($input: SearchProjectsInput) {
  getProjectsAdmin(input: $input) {
    nextCursor
    prevCursor
    totalCount
    results {
      id
      isApproved
      title
      author {
        name
        avatar
      }
      preview
      description
      createdAt
      repoLink
      siteLink
      tags
    }
  }
}
    `;

/**
 * __useGetProjectsAdminQuery__
 *
 * To run a query within a React component, call `useGetProjectsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsAdminQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProjectsAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsAdminQuery, GetProjectsAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsAdminQuery, GetProjectsAdminQueryVariables>(GetProjectsAdminDocument, options);
      }
export function useGetProjectsAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsAdminQuery, GetProjectsAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsAdminQuery, GetProjectsAdminQueryVariables>(GetProjectsAdminDocument, options);
        }
export type GetProjectsAdminQueryHookResult = ReturnType<typeof useGetProjectsAdminQuery>;
export type GetProjectsAdminLazyQueryHookResult = ReturnType<typeof useGetProjectsAdminLazyQuery>;
export type GetProjectsAdminQueryResult = Apollo.QueryResult<GetProjectsAdminQuery, GetProjectsAdminQueryVariables>;
export const UpdateUserBanStatusDocument = gql`
    mutation UpdateUserBanStatus($isBanned: Boolean!, $userId: String!) {
  updateUserBanStatus(isBanned: $isBanned, userId: $userId) {
    id
    banned
  }
}
    `;
export type UpdateUserBanStatusMutationFn = Apollo.MutationFunction<UpdateUserBanStatusMutation, UpdateUserBanStatusMutationVariables>;

/**
 * __useUpdateUserBanStatusMutation__
 *
 * To run a mutation, you first call `useUpdateUserBanStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserBanStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserBanStatusMutation, { data, loading, error }] = useUpdateUserBanStatusMutation({
 *   variables: {
 *      isBanned: // value for 'isBanned'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserBanStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserBanStatusMutation, UpdateUserBanStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserBanStatusMutation, UpdateUserBanStatusMutationVariables>(UpdateUserBanStatusDocument, options);
      }
export type UpdateUserBanStatusMutationHookResult = ReturnType<typeof useUpdateUserBanStatusMutation>;
export type UpdateUserBanStatusMutationResult = Apollo.MutationResult<UpdateUserBanStatusMutation>;
export type UpdateUserBanStatusMutationOptions = Apollo.BaseMutationOptions<UpdateUserBanStatusMutation, UpdateUserBanStatusMutationVariables>;
export const UpdateUserRoleDocument = gql`
    mutation UpdateUserRole($role: Role!, $userId: String!) {
  updateUserRole(role: $role, userId: $userId) {
    id
    role
  }
}
    `;
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      role: // value for 'role'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument, options);
      }
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>;
export type UpdateUserRoleMutationResult = Apollo.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
export const GetAllUsersAdminDocument = gql`
    query GetAllUsersAdmin($input: SearchUsersInput) {
  getAllUsersAdmin(input: $input) {
    nextCursor
    prevCursor
    results {
      avatar
      banned
      createdAt
      email
      followersCount
      followingCount
      github
      id
      location
      name
      role
      projectsCount
    }
  }
}
    `;

/**
 * __useGetAllUsersAdminQuery__
 *
 * To run a query within a React component, call `useGetAllUsersAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersAdminQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllUsersAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersAdminQuery, GetAllUsersAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersAdminQuery, GetAllUsersAdminQueryVariables>(GetAllUsersAdminDocument, options);
      }
export function useGetAllUsersAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersAdminQuery, GetAllUsersAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersAdminQuery, GetAllUsersAdminQueryVariables>(GetAllUsersAdminDocument, options);
        }
export type GetAllUsersAdminQueryHookResult = ReturnType<typeof useGetAllUsersAdminQuery>;
export type GetAllUsersAdminLazyQueryHookResult = ReturnType<typeof useGetAllUsersAdminLazyQuery>;
export type GetAllUsersAdminQueryResult = Apollo.QueryResult<GetAllUsersAdminQuery, GetAllUsersAdminQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    results {
      name
      avatar
      id
      role
      website
      createdAt
      banned
      github
      email
      projects {
        preview
      }
    }
    totalCount
    bannedUsers
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
export const GetApprovedProjectsDocument = gql`
    query GetApprovedProjects($input: SearchProjectsInput) {
  projects: getApprovedProjects(input: $input) {
    ...ProjectCardFragment
  }
}
    ${ProjectCardFragmentFragmentDoc}`;

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
export const GetTopCreatorsForHomePageDocument = gql`
    query GetTopCreatorsForHomePage {
  getTopCreatorsForHomePage {
    results {
      id
      likesReceived
      name
      avatar
    }
  }
}
    `;

/**
 * __useGetTopCreatorsForHomePageQuery__
 *
 * To run a query within a React component, call `useGetTopCreatorsForHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopCreatorsForHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopCreatorsForHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopCreatorsForHomePageQuery(baseOptions?: Apollo.QueryHookOptions<GetTopCreatorsForHomePageQuery, GetTopCreatorsForHomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopCreatorsForHomePageQuery, GetTopCreatorsForHomePageQueryVariables>(GetTopCreatorsForHomePageDocument, options);
      }
export function useGetTopCreatorsForHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopCreatorsForHomePageQuery, GetTopCreatorsForHomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopCreatorsForHomePageQuery, GetTopCreatorsForHomePageQueryVariables>(GetTopCreatorsForHomePageDocument, options);
        }
export type GetTopCreatorsForHomePageQueryHookResult = ReturnType<typeof useGetTopCreatorsForHomePageQuery>;
export type GetTopCreatorsForHomePageLazyQueryHookResult = ReturnType<typeof useGetTopCreatorsForHomePageLazyQuery>;
export type GetTopCreatorsForHomePageQueryResult = Apollo.QueryResult<GetTopCreatorsForHomePageQuery, GetTopCreatorsForHomePageQueryVariables>;
export const GetTopProjectsForHomePageDocument = gql`
    query GetTopProjectsForHomePage {
  getTopProjectsForHomePage {
    results {
      id
      author {
        avatar
        id
        name
      }
      preview
      title
      likesCount
    }
  }
}
    `;

/**
 * __useGetTopProjectsForHomePageQuery__
 *
 * To run a query within a React component, call `useGetTopProjectsForHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopProjectsForHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopProjectsForHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopProjectsForHomePageQuery(baseOptions?: Apollo.QueryHookOptions<GetTopProjectsForHomePageQuery, GetTopProjectsForHomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopProjectsForHomePageQuery, GetTopProjectsForHomePageQueryVariables>(GetTopProjectsForHomePageDocument, options);
      }
export function useGetTopProjectsForHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopProjectsForHomePageQuery, GetTopProjectsForHomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopProjectsForHomePageQuery, GetTopProjectsForHomePageQueryVariables>(GetTopProjectsForHomePageDocument, options);
        }
export type GetTopProjectsForHomePageQueryHookResult = ReturnType<typeof useGetTopProjectsForHomePageQuery>;
export type GetTopProjectsForHomePageLazyQueryHookResult = ReturnType<typeof useGetTopProjectsForHomePageLazyQuery>;
export type GetTopProjectsForHomePageQueryResult = Apollo.QueryResult<GetTopProjectsForHomePageQuery, GetTopProjectsForHomePageQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getAllUsers {
    results {
      id
      name
      email
      github
      avatar
    }
    totalCount
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserForPageDocument = gql`
    query GetUserForPage($id: String!) {
  user: getUser(id: $id) {
    id
    bio
    name
    email
    github
    avatar
    cover
    website
    twitter
    discord
    likesReceived
    location
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
export const CreateLikeDocument = gql`
    mutation CreateLike($authorId: String!, $projectId: String!) {
  createLike(authorId: $authorId, projectId: $projectId) {
    id
    project {
      id
      likesCount
      isLiked
    }
  }
}
    `;
export type CreateLikeMutationFn = Apollo.MutationFunction<CreateLikeMutation, CreateLikeMutationVariables>;

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateLikeMutation, CreateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CreateLikeDocument, options);
      }
export type CreateLikeMutationHookResult = ReturnType<typeof useCreateLikeMutation>;
export type CreateLikeMutationResult = Apollo.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationOptions = Apollo.BaseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables>;
export const DeleteLikeDocument = gql`
    mutation DeleteLike($projectId: String!) {
  deleteLike(projectId: $projectId) {
    id
    project {
      id
      likesCount
      isLiked
    }
  }
}
    `;
export type DeleteLikeMutationFn = Apollo.MutationFunction<DeleteLikeMutation, DeleteLikeMutationVariables>;

/**
 * __useDeleteLikeMutation__
 *
 * To run a mutation, you first call `useDeleteLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeMutation, { data, loading, error }] = useDeleteLikeMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteLikeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLikeMutation, DeleteLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(DeleteLikeDocument, options);
      }
export type DeleteLikeMutationHookResult = ReturnType<typeof useDeleteLikeMutation>;
export type DeleteLikeMutationResult = Apollo.MutationResult<DeleteLikeMutation>;
export type DeleteLikeMutationOptions = Apollo.BaseMutationOptions<DeleteLikeMutation, DeleteLikeMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    name
    email
    github
    discord
    avatar
    cover
    bio
    location
    website
    twitter
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
export const DeleteProjectsDocument = gql`
    mutation DeleteProjects($projectIds: [String!]!) {
  deleteProjects(projectIds: $projectIds)
}
    `;
export type DeleteProjectsMutationFn = Apollo.MutationFunction<DeleteProjectsMutation, DeleteProjectsMutationVariables>;

/**
 * __useDeleteProjectsMutation__
 *
 * To run a mutation, you first call `useDeleteProjectsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectsMutation, { data, loading, error }] = useDeleteProjectsMutation({
 *   variables: {
 *      projectIds: // value for 'projectIds'
 *   },
 * });
 */
export function useDeleteProjectsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectsMutation, DeleteProjectsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectsMutation, DeleteProjectsMutationVariables>(DeleteProjectsDocument, options);
      }
export type DeleteProjectsMutationHookResult = ReturnType<typeof useDeleteProjectsMutation>;
export type DeleteProjectsMutationResult = Apollo.MutationResult<DeleteProjectsMutation>;
export type DeleteProjectsMutationOptions = Apollo.BaseMutationOptions<DeleteProjectsMutation, DeleteProjectsMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($input: CreateProjectInput!, $projectId: String!) {
  updateProject(input: $input, projectId: $projectId) {
    id
    preview
    repoLink
    siteLink
    tags
    title
    updatedAt
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
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
export const GetTopUsersDocument = gql`
    query GetTopUsers($interval: String) {
  getTopUsers(interval: $interval) {
    results {
      id
      name
      avatar
      likesReceived
      followersCount
    }
  }
}
    `;

/**
 * __useGetTopUsersQuery__
 *
 * To run a query within a React component, call `useGetTopUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopUsersQuery({
 *   variables: {
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useGetTopUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetTopUsersQuery, GetTopUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopUsersQuery, GetTopUsersQueryVariables>(GetTopUsersDocument, options);
      }
export function useGetTopUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopUsersQuery, GetTopUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopUsersQuery, GetTopUsersQueryVariables>(GetTopUsersDocument, options);
        }
export type GetTopUsersQueryHookResult = ReturnType<typeof useGetTopUsersQuery>;
export type GetTopUsersLazyQueryHookResult = ReturnType<typeof useGetTopUsersLazyQuery>;
export type GetTopUsersQueryResult = Apollo.QueryResult<GetTopUsersQuery, GetTopUsersQueryVariables>;
export const GetTopProjectsDocument = gql`
    query GetTopProjects($interval: String) {
  getTopProjects(interval: $interval) {
    results {
      title
      likesCount
      id
      preview
      tags
    }
  }
}
    `;

/**
 * __useGetTopProjectsQuery__
 *
 * To run a query within a React component, call `useGetTopProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopProjectsQuery({
 *   variables: {
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useGetTopProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopProjectsQuery, GetTopProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopProjectsQuery, GetTopProjectsQueryVariables>(GetTopProjectsDocument, options);
      }
export function useGetTopProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopProjectsQuery, GetTopProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopProjectsQuery, GetTopProjectsQueryVariables>(GetTopProjectsDocument, options);
        }
export type GetTopProjectsQueryHookResult = ReturnType<typeof useGetTopProjectsQuery>;
export type GetTopProjectsLazyQueryHookResult = ReturnType<typeof useGetTopProjectsLazyQuery>;
export type GetTopProjectsQueryResult = Apollo.QueryResult<GetTopProjectsQuery, GetTopProjectsQueryVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($input: FollowUserInput!) {
  followUser(input: $input) {
    id
    name
    isFollowing
    followersCount
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
    followersCount
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
    totalCount
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
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    discord
    website
    twitter
    bio
    location
    avatar
    cover
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;