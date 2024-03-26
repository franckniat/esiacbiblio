import type { NextAuthConfig } from 'next-auth';
import { DefaultSession } from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from '@/lib/db';
import { getUserById } from './data/user';
import { UserRole } from '@prisma/client';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async session({token, session}){
      if(token.sub && session.user){
        session.user.id = token.sub;
      }
      if(token.role && session.user){
        session.user.role = token.role as UserRole;
      }
      return session
    },
    async jwt({token}){
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  providers: [],
} satisfies NextAuthConfig;