"use server";
import { db } from "@/lib/db";
import { AddArticleSchema } from "@/schemas";
import { z } from "zod";
import { getCurrentUser } from "@/lib/user";
import { revalidatePath } from "next/cache";

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