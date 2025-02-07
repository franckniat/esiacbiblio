import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { DataDocuments } from "@/components/dashboard/data-tables/user-documents";
import { getUserDocuments } from "@/data/document";
import { getCurrentUser } from "@/lib/user";
import React from "react";

export default async function Documents() {
	const user = await getCurrentUser();
	const userDocuments = await getUserDocuments(user?.id as string);
	return (
		<DashboardWrapper title="Documents" path={[{ name: "Documents", href: "/dashboard/documents"}]}>
			<h1 className="text-foreground/40">Gérer vos documents</h1>
			<DataDocuments data={userDocuments}/>
		</DashboardWrapper>
	);
}
