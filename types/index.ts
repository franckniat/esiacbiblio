import { Article, User, LikeArticle, Comment, Tag, Document, LikeDocument } from "@prisma/client"

export type ArticleWithIncludes = Article & {
    likes: LikeArticle[];
    user: User;
    comments: Comment[];
    tags: Tag[];
}

export type DocumentWithIncludes = Document & {
    likes: LikeDocument[];
    user: User;
}