import { initializeApollo } from 'apollo';
import { SignupMutation } from 'apollo-hooks';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';

import MUTATION_SIGNUP from './mutationSignup.graphql';

export default NextAuth({
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.JWT_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'identify email',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const apolloClient = initializeApollo();

      const { data } = await apolloClient.mutate<SignupMutation>({
        mutation: MUTATION_SIGNUP,
        variables: {
          token: account?.access_token,
          provider: account?.provider,
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
  },
});
