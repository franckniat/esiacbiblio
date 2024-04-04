import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { UserRole } from '@prisma/client';
import { getUserById } from '@/data/user';
import { getAccountById } from './data/account';

export const { 
    auth, signIn, signOut, 
    handlers:{GET, POST} 
} = NextAuth({
    pages:{
      signIn: '/auth/login',
      error: '/auth/error',
    },
    events:{
      async linkAccount({user}){
        await db.user.update({
          where: {id: user.id},
          data:{
            emailVerified: new Date()
          }
        })
      }
    },
    callbacks:{
        //TODO: Implement email verification
        /* async signIn({user}){
            const existingUser = await getUserById(user.id);
            if(!existingUser || !existingUser.emailVerified) {
                return false;
            }
            return true;
        }, */
        async session({token, session}){
            if(token.sub && session.user){
              session.user.id = token.sub;
            }
            if(token.role && session.user){
              session.user.role = token.role as UserRole;
            }
            if(token.bio && session.user){
              session.user.bio = token.bio;
            }
            if(token.email && session.user){
              session.user.email = token.email;
            }
            if(token.name && session.user){
              session.user.name = token.name;
            }
            if(token.picture && session.user){
              session.user.image = token.picture;
            }
            if(token.is0Auth && session.user){
              session.user.is0Auth = token.is0Auth as boolean;
            }
            
            return session
          },
      
          async jwt({token}){
            if(!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if(!existingUser) return token;
            const existingAccount = await getAccountById(existingUser.id)
            token.email = existingUser.email;
            token.name = existingUser.name;
            token.picture = existingUser.image;
            token.role = existingUser.role;
            token.bio = existingUser.bio;
            token.is0Auth = !!existingAccount;
            return token;
          }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
});