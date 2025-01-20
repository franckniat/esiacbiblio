"use server"
import { db } from "@/lib/db";

/**
 * Finds a user by email.
 *
 * @param email The email to search for.
 *
 * @returns The user with the given email, if found.
 */

export const getUserByEmail = async(email:string)=>{
    return db.user.findUnique({
        where:{
            email
        }
    })
}

/**
 * Finds a user by id.
 *
 * @param id The id of the user to find.
 * @returns The user with the given id.
 */
export const getUserById = async(id:string)=>{
    return db.user.findUnique({
        where:{
            id
        },
    })
}

/**
 * Finds all users in the database.
 *
 * @returns An array of all users in the database.
 */
export const getAllUsers = async()=>{
    return db.user.findMany()
}

/**
 * Finds a user by id, and also includes all of their associated documents.
 *
 * @param id The id of the user to find.
 * @returns The user with their associated documents.
 */
export const getUserWithDocs = async(id: string)=> {
    return db.user.findUnique({
        where: {
            id
        },
        include: {
            documents: true
        }
    })
}

/**
 * Finds a user by id, and also includes all of their associated articles.
 *
 * @param id The id of the user to find.
 *
 * @returns The user with their associated articles.
 */
export const getUserWithArticles = async(id: string)=> {
    return db.user.findUnique({
        where: {
            id
        },
        include: {
            articles: true
        }
    })
}