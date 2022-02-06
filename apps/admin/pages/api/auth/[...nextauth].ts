import { gql } from "@apollo/client";
import { initializeApollo } from "apollo";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const apolloClient = initializeApollo();

      const { data } = await apolloClient.mutate({
        mutation: gql`
          mutation Signup($email: String!, $name: String!) {
            signup(email: $email, name: $name)
          }
        `,
        variables: {
          email: user?.email,
          name: user?.name,
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
