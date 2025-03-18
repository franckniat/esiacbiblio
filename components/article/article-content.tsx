"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArticleWithIncludes } from "@/types";
import "./article-content.css";
import StyledMarkdownArticle from "../styled-markdown-article";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Eye, Heart, MessageSquareText } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-currentuser";
import { createLikeArticle } from "@/actions/like";
import { toast } from "sonner";
import { Facebook, Linkedin, TwitterX } from "react-bootstrap-icons";
import { cn } from "@/lib/utils";

export default function ArticleContent({
	article,
	isPreview=false,
}: {
	article: ArticleWithIncludes;
	isPreview?: boolean;
}) {
	const [views, setViews] = useState<number>(article.views);
    useEffect(() => {
        setViews(article.views);
      }, [article.views	]);
	function calculateReadingTime(text: string) {
		const wordsPerMinute = 200;
		const words = text.split(" ").length;
		const minutes = words / wordsPerMinute;
		const seconds = Math.ceil(minutes * 60);
		return { minutes: Math.floor(seconds / 60), seconds: seconds % 60 };
	}
	const { minutes } = calculateReadingTime(article.content);
	const [liked, setLiked] = useState(false);
	const { user } = useCurrentUser();

	useEffect(() => {
		if (user) {
			const isLiked = article.likes.find(
				(like) => like.userId === user.id
			);
			setLiked(!!isLiked);
		}
	}, [user, article]);

	const handleLike = useCallback(async () => {
		if (user?.id) {
			const userLike = article.likes.find(
				(like) => like.userId === user.id
			);
			await createLikeArticle(user.id, article.id, userLike?.id);
		} else {
			toast.error("Veuillez vous connecter pour pouvoir liker");
		}
	}, [user?.id, article.likes, article.id]);

	return (
		<div className="my-5 mx-2 md:mx-5">
			<div className="flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center gap-5">
				<div className="space-y-3">
					<div className="flex items-center gap-5">
						<span className="bg-primary/20 flex items-center gap-2 w-fit px-3 py-1 rounded-full">
							<span className="bg-primary w-1 h-1 rounded-full"></span>
							<span className="text-xs font-thin">
								{minutes} minutes de lecture
							</span>
						</span>
						<p className="flex gap-2 items-center">
							<Eye size={16} />
							<span className="font-bold">{views}</span>
						</p>
					</div>
					<h1 className="text-3xl md:text-5xl font-bold md:font-extrabold my-5 max-w-xl">
						{article.title}
					</h1>
					<div className="flex flex-wrap gap-3 items-center mt-2">
						{article.tags.map((tag, index) => (
							<Badge key={index} className="cursor-pointer">
								#{tag.value}
							</Badge>
						))}
					</div>
				</div>
				<Image
					src={article.image}
					alt={article.title}
					width={1200}
					height={1200}
					style={{
						borderRadius: "1.5rem",
					}}
					className="w-full h-auto max-h-[300px] md:h-[250px] md:w-[380px] object-cover rounded-lg p-2"
				/>
			</div>
			<div className="flex justify-between items-center gap-5 px-1 py-3">
				<div className="flex items-center gap-2">
					<div className="flex gap-2 items-center">
						<Avatar className="w-7 h-7">
							{article.user.image ? (
								<AvatarImage
									src={article.user.image}
									alt={article.user.name || ""}
								/>
							) : (
								<AvatarFallback className="group-hover:no-underline">
									{article.user.name?.charAt(0).toUpperCase()}
								</AvatarFallback>
							)}
						</Avatar>
						<span className="text-sm">{article.user.name}</span>
					</div>
					<span className="text-foreground/40">|</span>
					<span className="text-sm text-foreground/70">
						{article.createdAt.toLocaleDateString("fr-FR", {
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</span>
				</div>
			</div>
			<div className="flex">
				<div className="my-5 flex flex-grow">
					<div className={`my-5`}>
						<StyledMarkdownArticle content={article.content} />
					</div>
				</div>
				<div className={`flex-none hidden px-7 py-6 sticky top-[80px] h-fit ${isPreview ? "hidden" : "md:block"}`}>
					<div className="flex flex-col gap-3">
						<Button
							variant={"ghost"}
							onClick={handleLike}
							className="active:scale-95 transition-transform gap-3 w-fit h-fit p-0 my-2 hover:bg-background hover:underline"
						>
							<Heart
								size={20}
								fill={liked ? "#ef4444" : "none"}
							/>
							{article.likes.length > 0 && article.likes.length}
							{article.likes.length === 0 &&
								"Réagissez le premier"}
						</Button>
						<Button
							variant={"ghost"}
							className="active:scale-95 transition-transform gap-3 w-fit h-fit p-0 my-2 hover:bg-background hover:underline"
						>
							<MessageSquareText size={18} />
							Laissez un commentaire
						</Button>
						<div className="flex flex-col gap-2">
							<h2 className="text-lg font-bold">
								Partager sur :{" "}
							</h2>
							<div className="flex gap-2">
								<a
									href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
										`https://esiacbiblio.vercel.app/articles/${
											article.slug
										}&quote=${encodeURIComponent(
											article.title
										)}`
									)}`}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										buttonVariants({
											variant: "ghost",
											size: "icon",
										})
									)}
								>
									<Facebook size={20} />
								</a>
								<a
									href={`https://x.com/share?text=${encodeURIComponent(
										article.title
									)}&url=${encodeURIComponent(
										`https://esiacbiblio.vercel.app/articles/${article.slug}`
									)}`}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										buttonVariants({
											variant: "ghost",
											size: "icon",
										})
									)}
								>
									<TwitterX size={20} />
								</a>
								<a
									href={`https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(
										article.title
									)}&url=${encodeURIComponent(
										`https://esiacbiblio.vercel.app/articles/${article.slug}`
									)}`}
									target="_blank"
									rel="noopener noreferrer"
									className={cn(
										buttonVariants({
											variant: "ghost",
											size: "icon",
										})
									)}
								>
									<Linkedin size={20} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
