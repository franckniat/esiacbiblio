import { incrementArticleViews } from "@/actions/article";
import ArticleContent from "@/components/article/article-content";
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import { getArticleBySlug } from "@/data/article";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	noStore();
	const post = await getArticleBySlug(slug);
	if (!post) {
		return {
			title: "Article non trouvé",
			description: "L'article que vous cherchez n'existe pas.",
		};
	}
	return {
		title: post.title + " | " + post.user.name,
		description: post.content.slice(0, 400),
		openGraph: {
			title: post.title + " | " + post.user.name,
			description: post.content.slice(0, 400),
			images: [
				{
					url: post.image,
					alt: post.title,
				},
			],
		},
	};
}

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const article = await getArticleBySlug(slug);
	if (!article) {
		notFound();
	}
	await incrementArticleViews(article.id);
	return (
		<div className="max-w-[1280px] mx-auto px-2 pt-10 sm:pt-22">
			<CustomBreadcrumb
				path={[
					{ name: "Accueil", href: "/" },
					{ name: "Articles", href: "/articles" },
					{ name: article.title, href: `/blog/${article.slug}` },
				]}
			/>
			<ArticleContent article={article} />
		</div>
	);
}
