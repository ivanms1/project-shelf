import { addApolloState, initializeApollo } from 'apollo';
import Users from '@/pages/Users';

export default Users;

import QUERY_GET_USERS_ADMIN from './queryGetUsers.graphql';

export async function getStaticProps() {
  try {
    const client = initializeApollo();

    const data = await client.query({
      query: QUERY_GET_USERS_ADMIN,
    });

    return addApolloState(client, {
      props: {
        users: data?.data?.getUsers,
      },
      revalidate: 60,
    });
  } catch (error) {
    console.log('error', error);

    return {
      props: {
        data: error.message,
      },
    };
  }
}
