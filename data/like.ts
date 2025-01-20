"use server";
import { db } from "@/lib/db";

export const hasUserLikedDocument = async (userId: string, documentId: string) => {
    const data = await db.likeDocument.findMany({
        where: {
            userId,
            documentId
        }
    });
    return data.length > 0;
}