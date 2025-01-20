"use client"
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArticleProps{
    title:string,
    author:string, 
    author_image:string,
    description:string, 
    article_image:string,
    date:string,
    id:string
}

export default function ArticleCard({
    title,
    author, 
    author_image, 
    description,
    article_image,
    date,
    id
}:ArticleProps){
    return(
        <div className="flex gap-2 items-start flex-col sm:flex-row">
            <Link href={`/articles/${id}`} className="w-full sm:w-[300px] h-[200px]">
                <Image src={article_image || ""} alt={title || ""} width={400} height={200} className="rounded-lg shadow-lg w-full h-full sm:w-[400px] sm:h-[200px] hover:opacity-75 dark:hover:opacity-85 cursor-pointer object-cover"/>
            </Link>
            <div className="px-2 flex flex-col gap-2">
                <Link href={`/articles/${id}`} className="text-lg hover:text-primary text-wrap font-bold">{title}</Link>
                <Link href={`/users/${author?.toLowerCase().split(" ").join("-")}`} className="flex items-center gap-2 group w-fit">
                    <Avatar>
                        {author_image ? (
                            <AvatarImage src={author_image} alt={author || ""} />
                        ):(
                            <AvatarFallback className="group-hover:no-underline">{author?.charAt(0).toUpperCase()}</AvatarFallback>
                        )}
                    </Avatar>
                    <h2 className="group-hover:underline text-sm font-medium">{author}</h2>
                </Link>
                <p className="text-sm text-foreground/70">publié le {date}</p>
                <p className="max-w-sm tracking-tight text-sm text-justify text-foreground/50 line-clamp-3">{description}</p>
            </div>
        </div>
    )
}
