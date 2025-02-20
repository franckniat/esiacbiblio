import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { DataArticles } from "@/components/dashboard/data-tables/user-articles";
import { getUserArticles } from "@/data/article";
import { getCurrentUser } from "@/lib/user";
import React from "react";

export default async function Documents() {
	const user = await getCurrentUser();
	const userArticles = await getUserArticles(user?.id as string);
	return (
		<DashboardWrapper title="Articles" path={[{ name: "Articles", href: "/dashboard/articles"}]}>
			<h1 className="text-foreground/40">Gérer vos articles</h1>
			<DataArticles data={userArticles} />
		</DashboardWrapper>
	);
}
