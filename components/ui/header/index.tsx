"use client";
import {AlignJustify, DoorClosed, SunMedium, Moon, Plus, BookOpen, BellPlus, MessageCircle, LayoutDashboard, User, Settings, DoorOpen, Loader} from "lucide-react";
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTrigger, SheetTitle} from "@/components/ui/sheet";
import {DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useTheme} from "next-themes";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/auth";
import UserAvatar from "../user-avatar";

const navlinks = [
    {
        id:1,
        title:"Accueil",
        href: "/",
    },
    {
        id:2,
        title:"Documents",
        href:"/documents"
    },
    {
        id:3,
        title:"Articles",
        href:"/articles"
    },
    {
        id:4,
        title:"A propos",
        href:"/about"
    }
];
const morelinks = [
    {
        id:1,
        title:"Nouveau document",
        href: "/dashboard/newdocument",
    },
    {
        id:2,
        title:"Nouvel article",
        href:"/dashboard/newarticle"
    },
    {
        id:3,
        title:"Nouveau forum",
        href:"/dashboard/newforum"
    },
    {
        id:4,
        title:"Tableau de bord",
        href:"/dashboard"
    },
    {
        id:5,
        title:"Profil",
        href:"/dashboard/profile"
    },
    {
        id:6,
        title:"Paramètres",
        href:"/dashboard/settings"
    }
];
export default function Navbar(){
    const pathname = usePathname();
    const {theme, setTheme} = useTheme();
    const session = useSession();
    const isAdmin = session.data?.user?.role === "ADMIN" || session.data?.user?.role === "SUPERADMIN";
    const handleLogout = () => {
        logout();
    }
    return(
        <>
            <nav className="z-[30] w-full sticky top-0 backdrop-blur-sm bg-white/90 dark:bg-slate-950/90 transition">
                <section className="max-w-[1340px] mx-auto px-2">
                    <section className="flex items-center justify-between h-[60px]">
                        <section className="flex items-center gap-5">
                            <Link href="/"
                                  className="mx-2 flex items-center gap-0 text-lg md:text-xl lg:text-2xl font-serif">
                                E-BIBLIO
                            </Link>
                            <div className="items-center hidden md:flex">
                                {navlinks.map((nlink) => (
                                    <Link
                                        key={nlink.id}
                                        href={nlink.href}
                                        className={clsx(pathname == nlink.href ? "text-green-600" : "text-gray-600 dark:text-neutral-50", "font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm")}
                                    >
                                        {nlink.title}
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section className="flex items-center gap-3">
                            <Button size={"icon"} className="relative rounded-full" variant="ghost" onClick={() => {
                                setTheme(theme === "light" ? "dark" : "light")
                            }}>
                                <SunMedium 
                                className="dark:scale-0 scale-100 rotate-45 transition-all dark:rotate-0"
                                size={20}/>
                                <Moon 
                                className="absolute dark:scale-100 scale-0 rotate-45 transition-all dark:rotate-0"
                                size={20}/>
                            </Button>
                            <div className="hidden md:flex gap-2">
                                <div
                                    className={`text-sm flex gap-3 items-center font-medium ${session.data?.user ? "hidden":"flex"}`}>
                                    <Link href={"/auth/login"} className="text-green-600 hover:text-green-600/90 flex">Se
                                        connecter</Link>
                                    ●
                                    <Link href={"/auth/register"} className="hover:text-opacity-90">S{"'"}inscrire</Link>
                                </div>
                                <div className={`flex gap-4 ${session.data?.user ? "flex" : "hidden"}`}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="px-2 py-2 rounded-full">
                                                <Plus/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent aria-label="Static Actions"
                                                             className="rounded-md mr-3 w-[200px]">
                                            <DropdownMenuItem asChild className="rounded-md">
                                                <Link href="/dashboard/newdocument"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <BookOpen size={20}/>
                                                    Nouveau document
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="rounded-md">
                                                <Link href="/dashboard/newarticle"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <BellPlus size={20}/>
                                                    Nouvel article
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="rounded-md">
                                                <Link href="/dashboard/newforum"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <MessageCircle size={20}/>
                                                    Nouvelle discussion
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="rounded-full">
                                            <UserAvatar />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent aria-label="Static Actions"
                                                             className="mr-3 rounded-md w-[200px]">
                                            <DropdownMenuLabel className="text-xs line-clamp-2">Connecté en tant
                                                que <br/> {session.data?.user.email}</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem className="rounded-md" asChild>
                                                <Link href="/dashboard"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <LayoutDashboard size={20}/>
                                                    Tableau de bord
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-md" asChild>
                                                <Link href="/dashboard/settings"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <Settings size={20}/>
                                                    Paramètres
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="rounded-md text-red-600 hover:text-red-600 flex gap-2 items-center w-full h-full" onClick={handleLogout}>
                                                <DoorOpen size={20}/>
                                                Se déconnecter
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </section>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="ghost" className="flex md:hidden">
                                    <AlignJustify/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>ESIAC-BIBLIO</SheetTitle>
                                    <SheetDescription>Votre bibliothèque numérique</SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col gap-3 mt-4">
                                    {navlinks.map((navlink, index) => (
                                        <div key={index}>
                                            <SheetClose asChild>
                                                <Link
                                                    href={navlink.href}
                                                    className={clsx(pathname == navlink.href ? "text-green-600" : "text-gray-600 dark:text-neutral-50", "font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm")}>
                                                    {navlink.title}
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    ))}
                                </div>
                                <div className={`flex-col mt-4 gap-3 ${session.data?.user ? "flex" : "hidden"}`}>
                                    {morelinks.map((navlink, index) => (
                                        <div key={index}>
                                            <SheetClose asChild>
                                                <Link
                                                    href={navlink.href}
                                                    className={clsx(pathname == navlink.href ? "text-green-600" : "text-gray-600 dark:text-neutral-50", "font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm")}>
                                                    {navlink.title}
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    ))}
                                    <SheetClose>
                                        <button
                                            className="font-medium text-red-600 hover:text-red-400 w-full py-3 text-sm flex justify-start gap-2">
                                            <DoorClosed size={20}/>
                                            Se déconnecter
                                        </button>
                                    </SheetClose>
                                </div>
                                <div
                                    className={`text-sm flex-col gap-3 font-medium ml-4 mt-3 ${session.data?.user ? "hidden" : "flex"}`}>
                                    <SheetClose asChild>
                                        <Link href={"/signin"} className="text-green-600 hover:text-green-600/90 flex">
                                            Se connecter
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href={"/signup"} className="hover:text-opacity-90">
                                            S{"'"}inscrire
                                        </Link>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </section>
                </section>
            </nav>
        </>
    )
}