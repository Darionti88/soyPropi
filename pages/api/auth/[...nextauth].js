import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
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
  database: process.env.MONGODB_URI,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "dsjkbnfldsñ",
  },
  pages: {
    newUser: "/setup_account",
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return "/edit_account";
    },
    async session(session, token) {
      session.user.name = token.name;
      session.user.id = token.id;

      return session;
    },
  },
});
