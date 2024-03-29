"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { DocumentsSchema } from "@/schemas";
import { z } from "zod";


export const addDocument = async(data: z.infer<typeof DocumentsSchema>)=>{
    const validateFields = DocumentsSchema.safeParse(data);
    if(!validateFields.success){
        return{
            error: "Informations invalides !"
        }
    }
    const {title, description, fileURL, sector, category, fileType} = validateFields.data;
    const session = await auth();
    try {
        await db.document.create({
            data:{
                title,
                description,
                fileURL,
                sector,
                category,
                userId: session?.user.id,
                fileType
            }
        });
        return{
            success: "Document ajouté avec succès !"
        }
    } catch (error) {
        console.log(error);
    }
}