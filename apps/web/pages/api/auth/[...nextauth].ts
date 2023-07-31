import { initializeApollo } from 'apollo';
import { SignupMutation } from 'apollo-hooks';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import MUTATION_SIGNUP from './mutationSignup.graphql';

export default NextAuth({
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const apolloClient = initializeApollo();

      const { data } = await apolloClient.mutate<SignupMutation>({
        mutation: MUTATION_SIGNUP,
        variables: {
          token: account?.access_token,
        },
      });

      if (account) {
        account.serverToken = data?.signup;
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
      // @ts-expect-error TODO: find a way to add serverToken to the session type
      session.token = token?.serverToken;
      return session;
    },
    redirect({ baseUrl }) {
      return baseUrl;
    },
  },
});
