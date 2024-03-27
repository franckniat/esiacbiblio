import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from './schemas';

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials){
          const parsedCredentials = LoginSchema.safeParse(credentials);
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
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;