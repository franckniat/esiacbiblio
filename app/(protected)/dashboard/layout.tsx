
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "@/components/dashboard/dashboard-header";


export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<SidebarProvider defaultOpen={true}>
				<AppSidebar />
				<main className={"w-full"}>
					<DashboardHeader />
					<div className={"max-w-[1280px] mx-auto px-4 pt-[75px]"}>{children}</div>
				</main>
			</SidebarProvider>
		</>
	);
}
