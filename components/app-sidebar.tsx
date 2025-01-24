"use client"
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar"
import {
    Book, BookCopy,
    BookPlus,
    ChevronUp,
    CirclePlus, CircleUserRound, DoorOpen,
    Home,
    MessageSquarePlus,
    Newspaper, ScrollText, User, Users, Wrench
} from "lucide-react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {useCurrentUser} from "@/hooks/use-currentuser";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {logout} from "@/actions/auth";

export function AppSidebar() {
    const items = [
        {
            title: "Tableau de bord",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "Documents",
            url: "/dashboard/documents",
            icon: Book,
        },
        {
            title: "Articles",
            url: "/dashboard/articles",
            icon: Newspaper,
        }
    ]
    const items2 = [
        {
            title: "Nouveau document",
            url: "/dashboard/documents/new",
            icon: BookPlus,
        },
        {
            title: "Nouvel article",
            url: "/dashboard/articles/new",
            icon: CirclePlus,
        },
        {
            title: "Nouvelle discussion",
            url: "/dashboard/discussions/new",
            icon: MessageSquarePlus,
        }
    ]
    const items3 = [
        {
            title: "Utilisateurs",
            url: "/dashboard/admin/users",
            icon: Users,
        },
        {
            title: "Documents ajoutés",
            url: "/dashboard/admin/documents",
            icon: BookCopy,
        },
        {
            title: "Articles ajoutés",
            url: "/dashboard/admin/articles",
            icon: ScrollText,
        }
    ]
    const pathname = usePathname();
    const {user} = useCurrentUser();
    const isAdmin = user?.role === "admin" || user?.role === "superadmin" || user?.role === "teacher";
    const {open} = useSidebar();
    const router = useRouter();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link href={"/"} className={"flex justify-center flex-col gap-2 items-center"}>
                    <Image src={"/images/logo_esiac.png"} alt={""} className={"object-cover"} width={50} height={50}/>
                    {open && <h1 className={"text-lg font-bold"}>ESIAC-BIBLIO</h1>}
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Gérer vos informations</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className={"gap-2 font-medium"}>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild
                                                       className={`${pathname === item.url && "text-primary hover:text-primary bg-foreground/5"}`}>
                                        <Link href={item.url}>
                                            <item.icon size={20}/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Laissez votre empreinte</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className={"gap-2 font-medium"}>
                            {items2.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild
                                                       className={`${pathname === item.url && "text-primary hover:text-primary bg-foreground/5"}`}>
                                        <Link href={item.url}>
                                            <item.icon size={20}/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {isAdmin && (
                    <SidebarGroup className={"mb-10"}>
                        <SidebarGroupLabel>Pour les administrateurs</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className={"gap-2 font-medium"}>
                                {items3.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild
                                                           className={`${pathname === item.url && "text-primary hover:text-primary bg-foreground/5"}`}>
                                            <Link href={item.url}>
                                                <item.icon size={20}/>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <Avatar className={`${!open && " flex justify-center"} w-7 h-7`}>
                                        {user?.image && <AvatarImage src={user.image} alt={user.name}/>}
                                        {!user?.image &&
                                            <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>}
                                    </Avatar>
                                    <span>{user?.name}</span>
                                    <ChevronUp className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem className={"flex gap-2 items-center w-full"}
                                                  onClick={() => router.push("/dashboard/profile")}>
                                    <User size={16}/><span>Profil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className={"flex gap-2 items-center w-full"}
                                                  onClick={() => router.push("/dashboard/account")}>
                                    <CircleUserRound size={16}/><span>Compte</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className={"flex gap-2 items-center w-full"}
                                                  onClick={() => router.push("/dashboard/settings")}>
                                    <Wrench size={16}/><span>Paramètres</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className={"flex gap-2 items-center w-full"} onClick={() => logout()}>
                                    <DoorOpen size={16}/><span>Se déconnecter</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
