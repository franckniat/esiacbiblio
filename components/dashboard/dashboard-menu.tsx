/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { BadgeCheck } from "lucide-react";
import DashboardLinks from "./dashboard-links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-currentuser";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";

export default function DashboardMenu() {
	const { user } = useCurrentUser();
	const isAdmin = user?.role === "admin" || user?.role === "superadmin";
    const isDesktop = useMediaQuery("(min-width: 768px)");
	return (
		<>
			<div className={`flex flex-col h-screen fixed left-0 top-0 bg-background border-r border-foreground/5 justify-between gap-3 px-3 py-5 ${isDesktop ? "w-[220px]": "w-fit"}`}>
				<DashboardLinks />
                <Sheet>
                    <SheetTrigger asChild>
                        <div className="flex gap-2 items-center cursor-pointer border-foreground/5 border rounded-lg p-2 hover:bg-foreground/5">
                            <Avatar>
                                {user?.image && ( <AvatarImage src={user.image} alt={user.name} /> )}
                                { !user?.image && ( <AvatarFallback> { user?.name.charAt(0).toUpperCase() } </AvatarFallback> )}
                            </Avatar>
                            <div className={`space-y-1 ${isDesktop ? "block" : "hidden"}`}>
                                <p className="text-sm font-medium leading-none text-foreground/70">{user?.name} {isAdmin && <BadgeCheck className="w-4 h-4" />}</p>
                                {isAdmin && <p className="text-xs text-primary/60">Admin</p>}
                                {!isAdmin && <p className="text-xs text-primary/60">Etudiant</p>}
                            </div>
                        </div>
                    </SheetTrigger>
                    <SheetContent side={"right"}>
                        Salut
                    </SheetContent>
                </Sheet>
			</div>
		</>
	);
}
