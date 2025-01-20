"use client";
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import {Home} from "lucide-react";
import {usePathname} from "next/navigation";


interface DashboardWrapperProps {
	children: React.ReactNode;
	title: string;
	message?: string;
	className?: string;
	path : {
		name: React.ReactNode;
		href: string;
	}[];
}

export default function DashboardWrapper({
	children,
	title,
	message,
	path,
	className,
}: DashboardWrapperProps) {
	const pathname = usePathname()
	return (
		<div className={`space-y-3 ${className}`}>
			<CustomBreadcrumb
				path={[
					{
						name: pathname === "/dashboard" ? "" :<Home size={15}/>,
						href: "/dashboard",
					},
					...path,
				]}
			/>
			<h1 className="text-xl font-semibold">{title}</h1>
			<p className="text-sm font-medium text-foreground/50">{message}</p>
			{children}
		</div>
	);
}
