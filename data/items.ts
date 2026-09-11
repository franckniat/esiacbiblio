"use server";

import { db } from "@/lib/db";

export const getCategories = async () => {
    try {
        return await db.category.findMany();
    } catch {
        return [];
    }
}

export const getSectors = async () => {
    try {
        return await db.sector.findMany();
    } catch {
        return [];
    }
}

export const getTags = async () => {
    try {
        return await db.tag.findMany();
    } catch {
        return [];
    }
}