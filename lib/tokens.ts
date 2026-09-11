import {v4 as uuidv4} from 'uuid';
import {getVerificationTokenByEmail} from "@/data/verification-token";
import {db} from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000);
    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await db.verification.delete({
            where:{
                id: existingToken.id
            }
        });
    }

    const verification = await db.verification.create({
        data: {
            id: uuidv4(),
            identifier: email,
            value: token,
            expiresAt: expires,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    });
    return {
        id: verification.id,
        email: verification.identifier,
        token: verification.value,
        expiresAt: verification.expiresAt,
    };
}