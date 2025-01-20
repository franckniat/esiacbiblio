"use server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import { DocumentsSchema } from "@/schemas";
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
        revalidatePath("/dashboard/documents")
        return {
            success: "Document ajouté avec succès !"
        }
    } catch (error) {
        console.log(error);
    }
}