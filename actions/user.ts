"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import { revalidatePath } from "next/cache";

export const updateUserProfile = async (data: { name?: string; bio?: string }) => {
    try {
        const user = await getCurrentUser();
        if (!user?.id) {
            return { error: "Vous devez être connecté !" };
        }

        const name = data.name?.trim();
        const bio = data.bio?.trim();

        if (name && name.length < 2) {
            return { error: "Le nom doit comporter au moins 2 caractères." };
        }

        await db.user.update({
            where: { id: user.id },
            data: {
                ...(name ? { name } : {}),
                ...(bio !== undefined ? { bio } : {}),
            },
        });

        revalidatePath("/dashboard/account");
        return { success: "Profil mis à jour avec succès !" };
    } catch (error) {
        console.error("Error updating user profile:", error);
        return { error: "Une erreur est survenue lors de la mise à jour du profil." };
    }
};

