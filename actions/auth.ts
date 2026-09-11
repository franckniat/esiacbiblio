"use server";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(data);
    if (!validateFields.success) {
        return {
            error: "Informations invalides !"
        };
    }
    const { email, password } = validateFields.data;
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
            headers: await headers(),
        });
        return {
            success: "Connexion réussie !"
        };
    } catch (err: any) {
        return {
            error: err?.body?.message || err?.message || "Email ou mot de passe incorrect !"
        };
    }
};

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(data);
    if (!validateFields.success) {
        return {
            error: "Informations invalides !"
        };
    }
    const { email, password, name } = validateFields.data;
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
            headers: await headers(),
        });
        return {
            success: "Compte créé avec succès !"
        };
    } catch (err: any) {
        return {
            error: err?.body?.message || err?.message || "Cet email est peut-être déjà utilisé."
        };
    }
};

export const logout = async () => {
    try {
        await auth.api.signOut({
            headers: await headers(),
        });
    } catch (error) {
        console.error(error);
    }
};