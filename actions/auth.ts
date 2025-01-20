"use server"
import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(data);
    if (!validateFields.success) {
        return {
            error: "Informations invalides !"
        }
    }
    const { email, password } = validateFields.data;
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.cause?.err instanceof Error) {
                return {
                    error: error.cause.err.message
                }; // return "custom error"
            }
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Email ou mot de passe incorrect ! " }
                default:
                    return { error: "Something went wrong !" }
            }
        }
        throw error;
    }
}

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(data);
    if (!validateFields.success) {
        return {
            error: "Informations invalides !"
        }
    }
    const { email, password, name } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return {
            error: "Cet email est déjà utilisé"
        }
    }
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            emailVerified: new Date()
        }
    })
    return {
        success: "Votre compte a été créé avec succès, nous vous avons envoyé un email de confirmation."
    }
}

export const logout = async () => {
    await signOut();
}