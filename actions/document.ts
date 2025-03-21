"use server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import {DocumentsSchema, UpdateDocumentSchema} from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {getDocumentById} from "@/data/document";
import {deleteFile} from "@/firebase/functions";
import { nanoid } from "nanoid";

export const addDocument = async (data: z.infer<typeof DocumentsSchema>) => {
    const validateFields = DocumentsSchema.safeParse(data);
    if (!validateFields.success) {
        return {
            error: "Informations invalides !"
        }
    }
    const { title, description, fileURL, sector, category } = validateFields.data;
    const normalizeString = (str: string) => {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	};
    const firebaseSlug = normalizeString(title)
					.toLowerCase()
					.replace(/[^a-z0-9\s-]/g, "")
					.replace(/\s+/g, "-")
					.replace(/-+$/, "") +
				"-" +
				nanoid(8);
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
                userId: user.id,
                firebaseSlug: firebaseSlug,
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
    const document = await getDocumentById(id);
    if(!document) return { error: "Document introuvable !" }
    try {
        await db.document.delete({
            where: {
                id
            }
        });
        await deleteFile(`documents/${document.firebaseSlug}`);
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

export const publishDocument = async (id: string) => {
    try {
        await db.document.update({
            where: {
                id
            },
            data: {
                isVisible: true
            }
        });
        revalidatePath("/dashboard/documents")
        return {
            success: "Document publié avec succès !"
        }
    } catch (error) {
        console.log(error);
        return {
            error: "Une erreur s'est produite lors de la publication du document !"
        }
    }
}

export const hideDocument = async (id: string) => {
    try {
        await db.document.update({
            where: {
                id
            },
            data: {
                isVisible: false
            }
        })
        revalidatePath("/dashboard/documents")
        return {
            success: "Document masqué avec succès !"
        }
    } catch (error) {
        console.log(error);
        return {
            error: "Une erreur s'est produite lors de la masquage du document !"
        }
    }
}
