"use server";
import { db } from "@/lib/db";
import { AddArticleSchema, UpdateArticleSchema } from "@/schemas";
import { z } from "zod";
import { getCurrentUser } from "@/lib/user";
import { revalidatePath } from "next/cache";
import { getArticleById } from "@/data/article";
import { deleteFile } from "@/firebase/functions";

/**
 * Creates a new article in the database with the given data.
 * 
 * @param {AddArticleSchema} data The data to use for creating the article.
 * 
 * @returns {Promise<{error: string} | {success: string}>}
 * A promise that resolves to an object with an error string if the data is invalid, or with a success string if the article was created successfully.
 */
export const createArticle = async (data: z.infer<typeof AddArticleSchema>, articleSlug: string) => {
    try {
        const validateFields = AddArticleSchema.safeParse(data);
        if (!validateFields.success) {
            return {
                error: validateFields.error.message,
            }
        }
        const user = await getCurrentUser()
        const { title, content, image, sector, tags } = validateFields.data;
        const articleTags = await db.tag.findMany({
            where: {
                value: {
                    in: tags
                }
            }
        });
        await db.article.create({
            data: {
                title,
                content,
                image,
                sector,
                tags: {
                    connect: articleTags.map((tag) => ({ id: tag.id }))
                },
                slug: articleSlug,
                author: user?.id as string
            }
        });
        await db.user.update({
            where: {
                id: user?.id
            },
            data: {
                expPoints: {
                    increment: 50
                }
            }
        })
        revalidatePath("/dashboard/articles")
        return {
            success: "Article ajouté avec succès",
        }
    } catch (error) {
        console.error(error);
    }
}


export const updateArticle = async (id: string, data: z.infer<typeof UpdateArticleSchema>) => {
    try {
        const validateFields = UpdateArticleSchema.safeParse(data);
        if (!validateFields.success) {
            return {
                error: validateFields.error.message,
            }
        }
        const { title, image, sector, tags } = validateFields.data;
        const articleTags = await db.tag.findMany({
            where: {
                value: {
                    in: tags
                }
            }
        });
        await db.article.update({
            where: {
                id
            },
            data: {
                title,
                image,
                sector,
                tags: {
                    connect: articleTags.map((tag) => ({ id: tag.id }))
                }
            }   
        });
        revalidatePath("/dashboard/articles")
        return {
            success: "Article modifié avec succès",
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteArticle = async (id: string) => {
    const article = await getArticleById(id);
    if (!article) {
        return {
            error: "Article introuvable",
        }
    }
    try {
        await db.article.delete({
            where: {
                id
            }
        });
        await deleteFile(`articles/images/${article.slug}`);
        revalidatePath("/dashboard/articles")
        return {
            success: "Article supprimé avec succès !",
        }
    } catch (error) {
        console.error(error);
        return {
            error: "Une erreur est survenue lors de la suppression de l'article"
        }
    }
}

export const publishArticle = async (id: string) => {
    try {
        await db.article.update({
            where: {
                id
            },
            data: {
                isVisible: true
            }
        })
        revalidatePath("/dashboard/articles")
        return {
            success: "Article publié avec succès",
        }
    } catch (error) {
        console.error(error);
        return {
            error: "Une erreur est survenue lors de la publication de l'article"
        }
    }
}

export const hideArticle = async (id: string) => {
    try {
        await db.article.update({
            where: {
                id
            },
            data: {
                isVisible: false
            }
        })
        revalidatePath("/dashboard/articles")
        return {
            success: "Article masqué avec succès",
        }
    } catch (error) {
        console.error(error);
        return {
            error: "Une erreur est survenue lors de la masquage de l'article"
        }
    }
}

export const incrementArticleViews = async (id: string) => {
    try {
        const article = await getArticleById(id);
        await db.article.update({
            where: {
                id
            },
            data: {
                views: {
                    increment: 1
                }
            }
        })
        revalidatePath("/articles/" + article?.slug)
    } catch (error) {
        console.error(error);
    }
}
