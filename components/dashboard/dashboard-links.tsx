"use client";
import Link from "next/link";
import React, {Fragment} from "react";
import { usePathname } from "next/navigation";
import {
	Book,
	BookPlus,
	Feather,
	LayoutGrid,
	MessageCircle,
	MessageSquarePlus,
	ScrollText,
	Settings,
} from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import clsx from "clsx";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

const dashboardLinks = [
	{
		title: "Tableau de bord",
		path: "/dashboard",
		icon: <LayoutGrid size={20} />,
	},
	{
		title: "Documents",
		path: "/dashboard/documents",
		icon: <Book size={20} />,
	},
	{
		title: "Articles",
		path: "/dashboard/articles",
		icon: <ScrollText size={20} />,
	},
	{
		title: "Discussions",
		path: "/dashboard/discussions",
		icon: <MessageCircle size={20} />,
	},
	{
		title: "Paramètres",
		path: "/dashboard/settings",
		icon: <Settings size={20} />,
	},
];

const newLinks = [
	{
		title: "Nouvel article",
		path: "/dashboard/articles/new",
		icon: <Feather size={20} />,
	},
	{
		title: "Nouveau document",
		path: "/dashboard/documents/new",
		icon: <BookPlus size={20} />,
	},
	{
		title: "Nouvelle discussion",
		path: "/dashboard/newdiscussion",
		icon: <MessageSquarePlus size={20} />,
	},
];

export default function DashboardLinks() {
	const pathname = usePathname();
	const isDesktop = useMediaQuery("(min-width: 768px)");
	return (
		<>
			{isDesktop && (
				<Fragment>
					<div suppressHydrationWarning className="flex flex-col mt-5 gap-2">
							<Image
								src={"/images/logo_esiac.png"}
								alt="logo"
								width={80}
								height={80}
							/>
						<h2 className="text-sm text-foreground/50 side-text">
							Gérer vos informations.
						</h2>
						{dashboardLinks.map((link, index) => (
							<Link
								key={index}
								href={link.path}
								className={clsx(
									"flex text-sm items-center gap-2 py-2 rounded-lg hover:text-green-600 dark:hover:text-green-600 hover:translate-x-1 will-change-transform transition-all",
									pathname === link.path
										? "text-green-600"
										: " dark:text-slate-50 text-slate-950 "
								)}
							>
								{link.icon}
								<span>{link.title}</span>
							</Link>
						))}
					</div>
					<nav className="flex flex-col gap-2 mt-4">
						<h2 className="text-sm text-foreground/50 side-text">
							Laissez votre empreinte.
						</h2>
						{newLinks.map((link, index) => (
							<Link
								key={index}
								href={link.path}
								className={clsx(
									"flex text-sm items-center gap-2 py-2 rounded-lg hover:text-green-600 hover:translate-x-1 will-change-transform transition-all",
									pathname === link.path
										? "text-green-600"
										: " dark:text-slate-50 text-slate-950 "
								)}
							>
								{link.icon}
								<span>{link.title}</span>
							</Link>
						))}
					</nav>
				</Fragment>
			)}
			{!isDesktop && (
				<>
					<div className="flex flex-col mt-5 gap-2">
						{dashboardLinks.map((link, index) => (
							<TooltipProvider key={index}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Link
											href={link.path}
											className={clsx(
												"flex text-sm items-center justify-center gap-2 py-2 rounded-lg hover:text-green-600 dark:hover:text-green-600",
												pathname === link.path
													? "text-green-600"
													: " dark:text-slate-50 text-slate-950 "
											)}
										>
											{link.icon}
										</Link>
									</TooltipTrigger>
									<TooltipContent side="right">
										<p>{link.title}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						))}
					</div>
					<div className="flex flex-col gap-2 mt-4">
						{newLinks.map((link, index) => (
							<TooltipProvider key={index}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Link
											href={link.path}
											className={clsx(
												"flex text-sm items-center justify-center gap-2 py-2 rounded-lg hover:text-green-600 dark:hover:text-green-600",
												pathname === link.path
													? "text-green-600"
													: " dark:text-slate-50 text-slate-950 "
											)}
										>
											{link.icon}
										</Link>
									</TooltipTrigger>
									<TooltipContent side="right">
										<p>{link.title}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						))}
					</div>
				</>
			)}
		</>
	);
}
