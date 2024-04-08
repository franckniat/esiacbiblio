"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { DocumentsSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";


export const addDocument = async(data: z.infer<typeof DocumentsSchema>)=>{
    const validateFields = DocumentsSchema.safeParse(data);
    if(!validateFields.success){
        return{
            error: "Informations invalides !"
        }
    }
    const {title, description, fileURL, sector, category} = validateFields.data;
    const session = await auth();
    try {
        await db.document.create({
            data:{
                title,
                description,
                fileURL,
                sector,
                category,
                userId: session?.user.id
            }
        });
        revalidatePath("/dashboard/documents")
        return{
            success: "Document ajouté avec succès !"
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateDocument = async(id: string, data: z.infer<typeof DocumentsSchema>)=>{
    const validateFields = DocumentsSchema.safeParse(data);
    if(!validateFields.success){
        return{
            error: "Informations invalides !"
        }
    }
    const {title, description, fileURL, sector, category} = validateFields.data;
    try {
        await db.document.update({
            where:{
                id
            },
            data:{
                title,
                description,
                fileURL,
                sector,
                category
            }
        });
        return{
            success: "Document modifié avec succès !"
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteDocument = async(id: string)=>{
    try {
        await db.document.delete({
            where:{
                id
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const validateDocument = async(id: string)=>{
    const document = await db.document.findUnique({
        where:{
            id
        }
    });
    try {
        await db.document.update({
            where:{
                id
            },
            data:{
                isVisible: true
            }
        });
        await db.user.update({
            where:{
                id: document?.userId,
            },
            data:{
                expPoints:{
                    increment: 15
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}