"use server"
import { db } from "@/lib/db";

export const getAccountById = async (id: string) => {
    try {
        const result = await db.account.findUnique({
            where: {
                id,
            },
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}