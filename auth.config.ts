import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from '@/lib/db';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } 
      return true;
    },
    /* async jwt({token}){
      console.log({token})
      return token
    } */
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  providers: [],
} satisfies NextAuthConfig;