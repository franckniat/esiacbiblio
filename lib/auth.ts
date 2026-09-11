import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                required: false,
            },
            bio: {
                type: "string",
                required: false,
            },
            expPoints: {
                type: "number",
                defaultValue: 0,
                required: false,
            },
            status: {
                type: "string",
                defaultValue: "active",
                required: false,
            }
        }
    }
});

export type Session = typeof auth.$Infer.Session;
