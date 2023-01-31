import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authorizeUser from "services/users/authorize";

import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import { AuthSession, UserAuth } from "types/common";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await authorizeUser({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: AuthSession; token: JWT }) {
      session.user.role = token?.role;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: UserAuth }) {
      if (user) {
        token.name = user?.name;
        token.role = user?.role;
      }
      return token;
    },
  },
});
