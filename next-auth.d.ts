import { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
export const ExtendedUser = DefaultSession["user"] & {
    role: UserRole
};

declare module "next-auth"{
    interface Session{
        user: ExtendedUser
    }
}
