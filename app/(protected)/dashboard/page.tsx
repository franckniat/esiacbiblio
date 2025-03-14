import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import React from "react";
import DocsPerMonth from "@/components/charts/doc-per-month";
import { getUserDocuments } from "@/data/document";
import { getCurrentUser } from "@/lib/user";
import { notFound } from "next/navigation";
import ArticlesPerMonth from "@/components/charts/article-per-month";
import { getUserArticles } from "@/data/article";

export default async function Dashboard() {
	const user = await getCurrentUser();
	if (!user?.id) {
		notFound();
	}
	const documents = await getUserDocuments(user.id as string);
	const articles = await getUserArticles(user.id as string);
	return (
		<DashboardWrapper title="Tableau de bord" path={[]}>
			<h1 className="text-foreground/40">
				Bienvenue sur votre tableau de bord
			</h1>
			<div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
				<DocsPerMonth documents={documents} />
				<ArticlesPerMonth articles={articles} />
			</div>
		</DashboardWrapper>
	);
}
