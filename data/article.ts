"use server";
import { db } from "@/lib/db";

export const getAllArticles = async () => {
    return db.article.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true,
            likes: true,
            tags: true,
            comments: true
        }
    });
}

export const getActiveArticles = async () => {
    return db.article.findMany({
        where: {
            isVisible: true
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true,
            likes: true,
            tags: true,
            comments: true
        }
    });
}

export const getUserArticles = async (userId: string) => {
    return db.article.findMany({
        where: {
            user: {
                id: userId
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true,
            likes: true,
            tags: true,
            comments: true
        }
    });
}