"use client"
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Article} from "@prisma/client";
import {ArticleWithUserCommentsAndLikes} from "@/components/article/public-article";

interface ArticleCardProps {
    article: ArticleWithUserCommentsAndLikes;
}

export default function ArticleCard({
    article
}:ArticleCardProps){
    function calculateReadingTime(text: string) {
        const wordsPerMinute = 200;
        const words = text.split(" ").length;
        const minutes = words / wordsPerMinute;
        const seconds = Math.ceil(minutes * 60);
        return { minutes: Math.floor(seconds / 60), seconds: seconds % 60 };
    }
    const { minutes, seconds } = calculateReadingTime(article.content);
    return(
        <div className="flex items-start gap-3">
            <Link
                href={`/articles/${article.id}`}
                className="rounded-md h-full w-full sm:min-w-[250px] sm:max-h-[250px] sm:max-w-[300px] object-cover hover:opacity-85 transition-opacity overflow-hidden">
                <Image
                    src={article.image}
                    alt={article.title}
                    width={500}
                    height={500}
                    className="rounded-md h-full w-full sm:min-w-[250px] sm:max-h-[250px] object-cover hover:opacity-90 hover:scale-105 transition-all"
                />
            </Link>
            <div className="space-y-3 px-3 py-3">
                <Link href={`/articles/${article.slug}`} className="text-lg font-bold hover:text-primary">{article.title}</Link>
                <Link href={`/${article.user.name?.toLowerCase().split(" ").join("-")}`} className="flex items-center gap-2 group w-fit">
                    <Avatar>
                        {article.user.image ? (
                            <AvatarImage src={article.user.image} alt={article.user.name || ""} />
                        ):(
                            <AvatarFallback className="group-hover:no-underline">{article.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        )}
                    </Avatar>
                    <h2 className="group-hover:underline text-sm font-medium">{article.user.name}</h2>
                </Link>
                <p className="text-sm text-foreground/70">
                    Publié le {article.createdAt.toLocaleDateString("fr-FR",{
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}
                </p>
                <p className="max-w-sm tracking-tight text-sm text-justify text-foreground/50 line-clamp-3">{article.content}</p>
            </div>
        </div>
    )
}
