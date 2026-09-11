"use server";

import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";
import {getVerificationTokenByToken} from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
        return {
            error: "Code de confirmation invalide !"
        }
    }
    const hasExpired = new Date() > new Date(existingToken.expiresAt);
    if (hasExpired) {
        return {
            error: "Code de confirmation expiré !"
        }
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {
            error: "Utilisateur non trouvé !"
        }
    }

    await db.user.update({
        where: {
            email: existingToken.email
        },
        data: {
            emailVerified: true
        }
    });

    await db.verification.delete({
        where: {
            id: existingToken.id
        }
    });

    return {
        success: 'Email vérifié avec succès !'
    }
}