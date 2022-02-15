import User from '@/pages/User';

export default User;

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;

  return {
    props: {
      userId: id,
    },
  };
}
