import {db} from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        return await db.verificationToken.findFirst({
            where: {
                email
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        return await db.verificationToken.findUnique({
            where: {
                token
            }
        })
    } catch (error) {
        console.log(error);
    }
}