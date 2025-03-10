import React from "react";
import { getArticleBySlug } from "@/data/article";
import { notFound } from "next/navigation";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import ArticleContent from "@/components/article/article-content";

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
	return (
		<div>
			<DashboardWrapper
				title={""}
				path={[
					{
						name: "Articles",
						href: "/dashboard/articles",
					},
					{
						name: article.title,
						href: `/dashboard/articles/${article.slug}`,
					},
				]}
			>
				<div className="max-w-[1000px] mx-auto">
					<ArticleContent article={article} isPreview={true} />
				</div>
			</DashboardWrapper>
		</div>
	);
}
