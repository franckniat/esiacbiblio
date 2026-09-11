"use client";
import { useSession } from "@/lib/auth-client";

export type AuthUser = {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role?: string;
    bio?: string | null;
    expPoints?: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export const useCurrentUser = () => {
    const { data: session, isPending } = useSession();
    return {
        user: (session?.user as (AuthUser & Record<string, any>)) ?? null,
        isLoading: isPending,
    };
};