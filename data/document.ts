"use server"
import { db } from "@/lib/db";

/**
 * Finds all documents in the database.
 *
 * @returns An array of all documents in the database.
 */
export const getAllDocuments = async () => {
    try {
        const data = await db.document.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: true,
                likes: true
            }
        });
        return data;
    } catch {
        return [];
    }
}

/**
 * Finds all visible documents in the database.
 *
 * @returns An array of all visible documents in the database, sorted by creation date in descending order.
 */
export const getActiveDocuments = async () => {
    try {
        const data = await db.document.findMany({
            where: {
                isVisible: true
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: true,
                likes: true,
            }
        });
        return data;
    } catch {
        return [];
    }
}

/**
 * Finds all documents created by a user in the database.
 *
 * @param userId The id of the user to search for.
 *
 * @returns An array of all documents created by the user, sorted by creation date in descending order.
 */
export const getUserDocuments = async (userId: string) => {
    try {
        const data = await db.document.findMany({
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
                likes: true
            }
        });
        return data;
    } catch {
        return [];
    }
}

export const getDocumentById = async (id: string) => {
    try {
        const data = await db.document.findUnique({
            where: {
                id
            }
        });
        return data;
    } catch {
        return null;
    }
}