"use server";

import { db } from "@/lib/db";
import {revalidatePath} from "next/cache";

export const createLikeDocument = async (userId: string, documentId: string, id: string|undefined) => {
    if (id) {
        await db.likeDocument.delete({
            where: {
                id,
                userId
            }
        });
    } else {
        await db.likeDocument.create({
            data: {
                userId,
                documentId
            }
        })
    }
    revalidatePath(`/documents/`);
}

export const createLikeArticle = async (userId: string, articleId: string, id: string|undefined) => {
    if (id) {
        await db.likeArticle.delete({
            where: {
                id,
                userId
            }
        });
    } else {
        await db.likeArticle.create({
            data: {
                userId,
                articleId
            }
        })
    }
    revalidatePath(`/articles/${articleId}`);
}