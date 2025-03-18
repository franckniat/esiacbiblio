"use client";
import Image from "next/image";
import Link from "next/link";
import { ArticleWithIncludes } from "@/types";
import { Badge } from "../ui/badge";

interface ArticleCardProps {
	article: ArticleWithIncludes;
}

export default function ArticleCard({ article }: ArticleCardProps) {
	function calculateReadingTime(text: string) {
		const wordsPerMinute = 200;
		const words = text.split(" ").length;
		const minutes = words / wordsPerMinute;
		const seconds = Math.ceil(minutes * 60);
		return { minutes: Math.floor(seconds / 60), seconds: seconds % 60 };
	}
	const { minutes, seconds } = calculateReadingTime(article.content);
	return (
		<div className="flex flex-col gap-3">
			<Link
				href={`/articles/${article.slug}`}
				className="rounded-md max-h-[250px] w-full object-cover hover:opacity-85 transition-opacity overflow-hidden"
			>
				<Image
					src={article.image}
					alt={article.title}
					width={500}
					height={500}
					className="rounded-md w-full min-h-[250px] object-cover hover:opacity-90 hover:scale-105 transition-all"
				/>
			</Link>
			<div className="space-y-3 px-3 py-2">
				<div className="flex gap-2 py-2">
					{article.tags.map((tag) => (
						<Badge key={tag.id} title={tag.value} className="inline-flex items-center gap-2 cursor-pointer bg-primary/30 hover:bg-primary/40" variant={"outline"}>
							<span className="text-sm text-foreground">●</span>
							<span className="line-clamp-1">{tag.value}</span>
						</Badge>
					))}
				</div>
				<Link
					href={`/articles/${article.slug}`}
					className="text-lg font-bold hover:text-primary"
				>
					{article.title}
				</Link>
				<p className="group-hover:underline text-sm font-medium">
					{minutes} minutes et{" "}
					{seconds > 0 ? seconds + " secondes" : ""}
				</p>
				<p className="text-sm text-foreground/70">
					Publié le{" "}
					{article.createdAt.toLocaleDateString("fr-FR", {
						day: "numeric",
						month: "long",
						year: "numeric",
					})}
				</p>
				<Link
					href={`#`}
					className="flex items-center gap-2 group w-fit"
				>
					Par
					<h2 className="group-hover:underline text-sm font-bold text-primary">
						{article.user.name}
					</h2>
				</Link>
			</div>
		</div>
	);
}
