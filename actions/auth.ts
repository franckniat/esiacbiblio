"use server"
import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    
}

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(data);
    if(!validateFields.success){
        return{
            error:"Informations invalides !"
        }
    }
    const {email, password, name} = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if(existingUser){
        return {
            error: "Cet email est déjà utilisé"
        }
    }
    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })
    return{
        success:"Votre compte a été créé avec succès, nous vous avons envoyé un email de confirmation."
    }
}