import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { getAccountById } from '@/data/account';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            image: string;
            role: string;
            bio: string;
            is0Auth: boolean;
            expPoints: number;
            emailVerified: Date;
            createdAt: Date;
        };
    }
}

export const {
    auth, signIn, signOut,
    handlers
} = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: {
                    emailVerified: new Date(),
                    is0Auth: true
                }
            })
        },
    },
    callbacks: {
        //TODO: Implement email verification
         async signIn({user, account}){
            if (account?.provider !== "credentials") return true;
            if (account?.provider === "credentials") {
                const existingUser = await getUserById(user.id as string);
                if (!existingUser?.emailVerified) return false;
            }
            return true;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            const existingAccount = await getAccountById(existingUser.id)
            token.email = existingUser.email;
            token.name = existingUser.name;
            token.picture = existingUser.image;
            token.role = existingUser.role;
            token.bio = existingUser.bio;
            token.is0Auth = !!existingAccount;
            token.expPoints = existingUser.expPoints;
            token.emailVerified = existingUser.emailVerified;
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.sub as string;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            session.user.image = token.picture as string;
            session.user.role = token.role as string;
            session.user.bio = token.bio as string;
            session.user.is0Auth = token.is0Auth as boolean;
            session.user.expPoints = token.expPoints as number;
            session.user.emailVerified = token.emailVerified as Date;
            return session
        },

        
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});