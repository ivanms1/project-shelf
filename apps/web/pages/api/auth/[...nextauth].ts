import { initializeApollo } from 'apollo';
import { SignupMutation } from 'apollo-hooks';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import MUTATION_SIGNUP from './mutationSignup.graphql';

export default NextAuth({
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.JWT_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const apolloClient = initializeApollo();

      const { data } = await apolloClient.mutate<SignupMutation>({
        mutation: MUTATION_SIGNUP,
        variables: {
          email: user?.email,
          name: user?.name,
          avatar: user?.image,
        },
      });

      if (account) {
        account.serverToken = data?.signup?.token;
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.serverToken = account.serverToken;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.token = token?.serverToken;
      return session;
    },
  },
});
