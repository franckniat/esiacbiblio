import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        return session?.user ?? null;
    } catch {
        return null;
    }
};