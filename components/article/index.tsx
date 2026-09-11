"use client";
import Image from "next/image";
import Link from "next/link";
import { ArticleWithIncludes } from "@/types";
import { Clock, Calendar, User } from "lucide-react";

interface ArticleCardProps {
	article: ArticleWithIncludes;
}

export default function ArticleCard({ article }: ArticleCardProps) {
	function calculateReadingTime(text: string) {
		const wordsPerMinute = 200;
		const words = text.split(" ").length;
		const minutes = Math.max(1, Math.round(words / wordsPerMinute));
		return `${minutes} min de lecture`;
	}

	return (
		<div className="group flex flex-col justify-between rounded-2xl bg-card border border-border/80 hover:border-primary/50 transition-all shadow-xs hover:shadow-md overflow-hidden">
			<div>
				{/* Image Preview */}
				<Link
					href={`/articles/${article.slug}`}
					className="block aspect-[16/10] w-full overflow-hidden bg-muted relative"
				>
					{article.image ? (
						<Image
							src={article.image}
							alt={article.title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-muted-foreground bg-primary/5">
							ESIAC-BIBLIO
						</div>
					)}
				</Link>

				{/* Content */}
				<div className="p-5 space-y-3">
					{/* Tags */}
					{article.tags && article.tags.length > 0 && (
						<div className="flex flex-wrap gap-1.5">
							{article.tags.slice(0, 2).map((tag) => (
								<span
									key={tag.id}
									className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
								>
									{tag.value}
								</span>
							))}
						</div>
					)}

					{/* Title */}
					<Link href={`/articles/${article.slug}`} className="block">
						<h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
							{article.title}
						</h3>
					</Link>

					{/* Metadata */}
					<div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
						<span className="flex items-center gap-1">
							<Clock className="w-3.5 h-3.5" />
							{calculateReadingTime(article.content)}
						</span>
						<span>•</span>
						<span className="flex items-center gap-1">
							<Calendar className="w-3.5 h-3.5" />
							{new Date(article.createdAt).toLocaleDateString("fr-FR", {
								month: "short",
								year: "numeric",
							})}
						</span>
					</div>
				</div>
			</div>

			{/* Author Footer */}
			<div className="px-5 py-3.5 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground bg-foreground/[0.01]">
				<span className="flex items-center gap-1.5 font-medium text-foreground/80">
					<User className="w-3.5 h-3.5 text-primary" />
					{article.user?.name || "Auteur ESIAC"}
				</span>
				<Link
					href={`/articles/${article.slug}`}
					className="font-semibold text-primary group-hover:underline"
				>
					Lire l&apos;article →
				</Link>
			</div>
		</div>
	);
}
