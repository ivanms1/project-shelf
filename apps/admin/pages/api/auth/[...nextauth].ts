import { initializeApollo } from 'apollo';
import { LoginAsAdminMutation } from 'apollo-hooks';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import MUTATION_LOGIN_AS_ADMIN from './mutationLoginAsAdmin.graphql';

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
    async signIn({ account }) {
      const apolloClient = initializeApollo();

      const { data } = await apolloClient.mutate<LoginAsAdminMutation>({
        mutation: MUTATION_LOGIN_AS_ADMIN,
        variables: {
          token: account.access_token,
        },
      });
      if (account) {
        account.serverToken = data?.loginAsAdmin;
      }

      return true;
    },
    jwt({ token, account }) {
      if (account) {
        token.serverToken = account.serverToken;
      }

      return token;
    },
    session({ session, token }) {
      session.token = token?.serverToken;
      return session;
    },
  },
});
