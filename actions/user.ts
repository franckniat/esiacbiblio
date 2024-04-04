"use server";

import { db } from "@/lib/db";
import { ProfileUpdateSchema } from "@/schemas";
import { z } from "zod";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { revalidatePath } from "next/cache";


export const updateUser = async (values: z.infer<typeof ProfileUpdateSchema>) => {
  const session = await auth();
  const user = await getUserById(session?.user.id);
  if (!session) {
    return {
      error: "Accès non autorisé !",
    };
  }
  if (!user) {
    return {
      error: "Accès non autorisé !",
    };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      name: values.name,
      bio: values.bio,
      image: values.image,
    },
  });
  revalidatePath("/dashboard/settings")
  return {
    success: "Votre profil a été mis à jour avec succès !",
  };
};
