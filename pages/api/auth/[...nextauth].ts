import NextAuth from "next-auth";
import { NextApiHandler } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    newUser: "/setup_account",
  },

  callbacks: {
    //   async jwt({ token, user }) {
    //     if (user) {
    //       token.id = user.id;
    //     }
    //     return token;
    //   },
    async session({ session, token, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};
