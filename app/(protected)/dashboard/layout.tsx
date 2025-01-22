
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cookies } from "next/headers"
import ScrollTop from "@/components/scroll-top";


export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = cookies()
	const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
	return (
		<>
			<SidebarProvider defaultOpen={defaultOpen}>
				<AppSidebar />
				<main className={"w-full"}>
					<SidebarTrigger className={"m-4"} />
					<ScrollTop />
					<div className={"max-w-[1280px] mx-auto px-4"}>{children}</div>
				</main>
			</SidebarProvider>
		</>
	);
}
