import NextAuth from "next-auth";
import { NextApiHandler } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "../../../lib/prisma";
import fs from "fs";

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
  secret: "ihd/sR8OLzZzR+VGEuQfId9DC6Pyy3GP9p4In9cfpN0=",
  adapter: PrismaAdapter(prisma),
  // session: {
  //   strategy: "jwt",
  // },
  pages: {
    newUser: "/",
  },
  // ssl: {
  //   rejectUnauthorized: false,
  //   ca: fs.readFileSync("./certificates/localhost.crt").toString(),
  // },
  callbacks: {
    //   async jwt({ token, user }) {
    //     if (user) {
    //       token.id = user.id;
    //     }
    //     return token;
    //   },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = user.id;
      return session;
    },
    // async session({ session, token }) {
    //   session.user.name = token.name;
    //   session.user.id = token.id;
    //   return session;
    // },
  },
};
