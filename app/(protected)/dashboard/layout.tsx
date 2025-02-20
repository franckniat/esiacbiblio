
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cookies } from "next/headers";
import DashboardHeader from "@/components/dashboard/dashboard-header";


export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
	return (
		<>
			<SidebarProvider defaultOpen={defaultOpen}>
				<AppSidebar />
				<main className={"w-full"}>
					<DashboardHeader />
					<div className={"max-w-[1280px] mx-auto px-4 pt-[75px]"}>{children}</div>
				</main>
			</SidebarProvider>
		</>
	);
}
