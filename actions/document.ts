"use server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import {DocumentsSchema, UpdateDocumentSchema} from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addDocument = async (data: z.infer<typeof DocumentsSchema>) => {
    const validateFields = DocumentsSchema.safeParse(data);
    if (!validateFields.success) {
        return {
            error: "Informations invalides !"
        }
    }
    const { title, description, fileURL, sector, category } = validateFields.data;
    const user = await getCurrentUser();
    try {
        if(!user?.id) return { error: "Vous devez être connecté pour effectuer cette action !" }
        await db.document.create({
            data: {
                title,
                description,
                fileURL,
                sector,
                category,
                userId: user.id
            }
        });
        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                expPoints: {
                    increment: 25
                }
            }
        })
        revalidatePath("/dashboard/documents")
        return {
            success: "Document ajouté avec succès !"
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateDocument = async (id:string, data: z.infer<typeof UpdateDocumentSchema>) => {
    const validateFields = UpdateDocumentSchema.safeParse(data);
    if (!validateFields.success) {
        return {
            error: "Informations invalides !"
        }
    }
    const { title, description, sector, category } = validateFields.data;
    try {
        await db.document.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                sector,
                category
            }
        });
        revalidatePath("/dashboard/documents")
        return {
            success: "Document modifié avec succès !"
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteDocument = async (id: string) => {
    console.log(id)
    try {
        await db.document.delete({
            where: {
                id
            }
        });
        revalidatePath("/dashboard/documents")
        return {
            success: "Document supprimé avec succès !"
        }
    } catch (error) {
        console.log(error);
        return {
            error: "Une erreur s'est produite lors de la suppression du document !"
        }
    }
}