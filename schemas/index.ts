
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Adresse email obligatoire !"
    }),
    password: z.string().min(1, {
        message: "Mot de passe obligatoire ! "
    })
})

export const RegisterSchema = z.object({
    name: z.string({
        required_error: "Nom obligatoire !"
    }).max(32, {
        message: "Votre nom doit avoir maximum 32 caractères ! "
    }),
    email: z.string({
        required_error: "Adresse email obligatoire !"
    }).email({
        message: "Adresse email invalide !"
    }),
    password: z.string({
        required_error: "Mot de passe obligatoire !"
    }).min(8, {
        message: "Votre mot de passe doit avoir minimum 8 caractères ! "
    })
    .refine(value => {
        return /[A-Z]/.test(value)
    }, {
        message: "Votre mot de passe doit avoir au moins une majuscule ! "
    })
    .refine(value => {
        return /[0-9]/.test(value)
    }, {
        message: "Votre mot de passe doit avoir au moins un chiffre ! "
    })
    .refine(value => {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    }, {
        message: "Votre mot de passe doit avoir au moins un caractère spécial ! "
    })
})


export const ProfileUpdateSchema = z.object({
    name: z.optional(z.string().min(1, {
        message: "Veuillez entrer un nom !"
    })),
    bio: z.optional(z.string()),
    image: z.optional(z.string())
})


export const DocumentsSchema = z.object({
    sector: z.string({
        required_error: "Veuillez choisir une filière !"
    }).min(1,{
        message: "Veuillez choisir une filière !"
    }),
    category: z.string({
        required_error: "Veuillez choisir une catégorie !"
    }).min(1,{
        message: "Veuillez choisir une catégorie !"
    }),
    title: z.string({
        required_error: "Veuillez entrer un titre !"
    }).max(100, {
        message: "Le titre doit avoir maximum 32 caractères !"
    }).min(1,{
        message: "Veuillez entrer un titre !"
    }),
    description: z.string({
        required_error: "Veuillez entrer une description !"
    }).max(300, {
        message: "La description doit avoir maximum 300 caractères !"
    }).min(1,{
        message: "Veuillez entrer une description !"
    }),
    fileURL: z.string().min(1, {
        message: "Veuillez entrer un fichier !"
    })
})


export const UpdateDocumentSchema = z.object({
    sector: z.string({
        required_error: "Veuillez choisir une filière !"
    }).min(1,{
        message: "Veuillez choisir une filière !"
    }),
    category: z.string({
        required_error: "Veuillez choisir une catégorie !"
    }).min(1,{
        message: "Veuillez choisir une catégorie !"
    }),
    title: z.string({
        required_error: "Veuillez entrer un titre !"
    }).max(100, {
        message: "Le titre doit avoir maximum 32 caractères !"
    }).min(1,{
        message: "Veuillez entrer un titre !"
    }),
    description: z.string({
        required_error: "Veuillez entrer une description !"
    }).max(300, {
        message: "La description doit avoir maximum 300 caractères !"
    }).min(1,{
        message: "Veuillez entrer une description !"
    }),
})

export const AddArticleSchema = z.object({
    title: z.string({
        required_error: "Veuillez entrer un titre !"
    }).min(1, {
        message: "Votre article doit avoir un titre !"
    }).max(110, {
        message: "Votre titre doit avoir maximum 110 caractères !"
    }),
    content: z.string({
        required_error: "Veuillez entrer un contenu !"
    }).min(100,{
        message: "Votre article doit avoir minimum 100 caractères !"
    }).min(1,{
        message: "Votre article doit avoir un contenu !"
    }),
    tags: z.array(z.string(), {
        required_error: "Veuillez ajouter des tags !"
    }).min(1,{
        message: "Veuillez selectionner au moins un tag !"
    }),
    image: z.string({
        required_error: "Veuillez ajouter une bannière à votre article !"
    }),
    sector: z.string({
        required_error: "Veuillez choisir une filière !"
    }),
})

export const UpdateArticleSchema = z.object({
    title: z.string({
        required_error: "Veuillez entrer un titre !"
    }).min(1, {
        message: "Votre article doit avoir un titre !"
    }),
    tags: z.array(z.string(), {
        required_error: "Veuillez ajouter des tags !"
    }).min(1,{
        message: "Veuillez selectionner au moins un tag !"
    }),
    image: z.string({
        required_error: "Veuillez ajouter une bannière à votre article !"
    }),
    sector: z.string({
        required_error: "Veuillez choisir une filière !"
    }),
})
