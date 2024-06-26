
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message:"Adresse email obligatoire !"
    }),
    password: z.string().min(1,{
        message: "Mot de passe obligatoire ! "
    })
})

export const RegisterSchema = z.object({
    name: z.string().min(1,{
        message:"Veuillez entrer votre nom! "
    }),
    email: z.string().email({
        message:"Adresse email obligatoire!"
    }),
    password: z.string().min(6,{
        message: "Votre mot de passe doit avoir minimum 6 caractères ! "
    })
})


export const ProfileUpdateSchema = z.object({
    name: z.optional(z.string().min(1,{
        message:"Veuillez entrer un nom !"
    })),
    bio: z.optional(z.string()),
    image: z.optional(z.string())
})


export const DocumentsSchema = z.object({
    sector: z.string().min(1,{
        message:"Veuillez choisir une filière !"
    }),
    category: z.string().min(1,{
        message:"Veuillez choisir une catégorie !"
    }),
    title: z.string().min(1,{
        message:"Veuillez entrer un titre !"
    }),
    description: z.string().min(1,{
        message:"Veuillez entrer une description !"
    }),
    fileURL: z.optional(z.string().min(1,{
        message:"Veuillez entrer un fichier !"
    }))
})