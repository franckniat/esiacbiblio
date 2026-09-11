"use server";
import { db } from "@/lib/db";

export const getAllArticles = async () => {
    try {
        return await db.article.findMany({
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
    } catch {
        return [];
    }
}

export const getActiveArticles = async () => {
    try {
        return await db.article.findMany({
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
    } catch {
        return [];
    }
}

export const getUserArticles = async (userId: string) => {
    try {
        return await db.article.findMany({
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
    } catch {
        return [];
    }
}

export const getArticleBySlug = async (slug: string) => {
    try {
        return await db.article.findFirst({
            where: {
                slug
            },
            include: {
                user: true,
                likes: true,
                tags: true,
                comments: true
            }
        });
    } catch {
        return null;
    }
}

export const getArticleById = async (id: string) => {
    try {
        return await db.article.findFirst({
            where: {
                id
            }
        });
    } catch {
        return null;
    }
}