import {db} from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const record = await db.verification.findFirst({
            where: {
                identifier: email
            }
        });
        if (!record) return null;
        return {
            id: record.id,
            email: record.identifier,
            token: record.value,
            expiresAt: record.expiresAt,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const record = await db.verification.findFirst({
            where: {
                value: token
            }
        });
        if (!record) return null;
        return {
            id: record.id,
            email: record.identifier,
            token: record.value,
            expiresAt: record.expiresAt,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}