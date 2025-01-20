"use server"
import { db } from "@/lib/db";

/**
 * Finds all documents in the database.
 *
 * @returns An array of all documents in the database.
 */
export const getAllDocuments = async () => {
    const data = await db.document.findMany();
    return data;
}

/**
 * Finds all visible documents in the database.
 *
 * @returns An array of all visible documents in the database, sorted by creation date in descending order.
 */
export const getActiveDocuments = async () => {
    const data = await db.document.findMany({
        where: {
            isVisible: true
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
}



/**
 * Finds all documents created by a user in the database.
 *
 * @param userId The id of the user to search for.
 *
 * @returns An array of all documents created by the user, sorted by creation date in descending order.
 */
export const getUserDocuments = async (userId: string) => {
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
}

export const getDocumentById = async (id: string) => {
    const data = await db.document.findUnique({
        where: {
            id
        }
    });
    return data;
}