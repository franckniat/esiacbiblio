import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import {z} from "zod";
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';

export const { auth, signIn, signOut, handlers:{GET, POST} } = NextAuth({
    ...authConfig,
    providers: [
        Github,
        Google,
        Credentials({
            async authorize(credentials){
                const parsedCredentials = z.object({
                    email : z.string().email(),
                    password: z.string().min(6)
                }).safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                  }
                  return null;
            },
        }),
    ]
});