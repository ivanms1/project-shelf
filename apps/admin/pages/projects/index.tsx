import { addApolloState, initializeApollo } from 'apollo';
import Projects from '@/pages/Projects';

import QUERY_GET_PROJECTS_ADMIN from './queryGetProjectsAdmin.graphql';

export default Projects;

export async function getStaticProps() {
  try {
    const client = initializeApollo();

    const data = await client.query({
      query: QUERY_GET_PROJECTS_ADMIN,
    });

    return addApolloState(client, {
      props: {
        projects: data?.data?.getProjectsAdmin?.results,
      },
      revalidate: 60,
    });
  } catch (error) {
    return {
      props: {
        data: error.message,
      },
    };
  }
}
