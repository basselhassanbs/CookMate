import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../lib/prisma';

// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
// export default NextAuth(options);

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  // session: {
  //   strategy: 'jwt',

  //   // ** Seconds - How long until an idle session expires and is no longer valid
  //   maxAge: 30 * 24 * 60 * 60, // ** 30 days
  // },

  //   // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  //   pages: {
  //     signIn: '/login',
  //     signOut: '/login',
  //     error: '/404',
  //   },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  // callbacks: {
  //   /*
  //    * While using `jwt` as a strategy, `jwt()` callback will be called before
  //    * the `session()` callback. So we have to add custom parameters in `token`
  //    * via `jwt()` callback to make them accessible in the `session()` callback
  //    */
  //   async jwt({ token, user }) {
  //     if (user) {
  //       /*
  //        * For adding custom parameters to user in session, we first need to add those parameters
  //        * in token which then will be available in the `session()` callback
  //        */
  //       token.name = user.name;
  //     }

  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (session.user) {
  //       // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
  //       session.user.name = token.name;
  //     }

  //     return session;
  //   },
  // },
};
export default NextAuth(options);
