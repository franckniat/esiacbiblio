"use client";
import {
    AlignJustify,
    DoorClosed,
    SunMedium,
    Moon,
    Plus,
    BookOpen,
    BellPlus,
    MessageCircle,
    LayoutDashboard,
    Settings,
    User,
    CircleHelp, Loader2,
} from "lucide-react";
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useTheme} from "next-themes";
import {useCurrentUser} from "@/hooks/use-currentuser";
import {signOut} from "@/lib/auth-client";

const navlinks = [
    {
        id: 1,
        title: "Accueil",
        href: "/",
    },
    {
        id: 2,
        title: "Documents",
        href: "/documents",
    },
    {
        id: 3,
        title: "Articles",
        href: "/articles",
    },
    {
        id: 4,
        title: "A propos",
        href: "/about",
    },
];
const morelinks = [
    {
        id: 1,
        title: "Nouveau document",
        href: "/dashboard/documents/new",
    },
    {
        id: 2,
        title: "Nouvel article",
        href: "/dashboard/articles/new",
    },
    {
        id: 3,
        title: "Nouveau forum",
        href: "#",
    },
    {
        id: 4,
        title: "Tableau de bord",
        href: "/dashboard",
    },
    {
        id: 5,
        title: "Compte",
        href: "/dashboard/account",
    },
    {
        id: 6,
        title: "Paramètres",
        href: "/dashboard/settings",
    },
];
export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const {theme, setTheme} = useTheme();
    const {user, isLoading} = useCurrentUser();

    const handleLogout = async () => {
        try {
            await signOut();
            router.push("/auth/login");
            router.refresh();
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    return (
        <>
            <nav className="z-[30] w-full sticky top-0 backdrop-blur-md bg-background/85 border-b border-border/50 transition-all">
                <section className="max-w-[1340px] mx-auto px-4 sm:px-6">
                    <section className="flex items-center justify-between h-[64px]">
                        <section className="flex items-center gap-6">
                            <Link
                                href="/"
                                className="flex items-center gap-1.5 text-lg md:text-xl font-extrabold tracking-tight"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                                <span>ESIAC<span className="text-primary">.</span>BIBLIO</span>
                            </Link>
                            <div className="items-center hidden md:flex gap-1">
                                {navlinks.map((nlink) => (
                                    <Link
                                        key={nlink.id}
                                        href={nlink.href}
                                        className={clsx(
                                            pathname == nlink.href
                                                ? "bg-primary/10 text-primary font-semibold"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                            "px-3.5 py-1.5 rounded-lg text-sm transition-all"
                                        )}
                                    >
                                        {nlink.title}
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section className="hidden md:flex items-center gap-3">
                            <Button
                                size={"icon"}
                                className="relative rounded-lg hover:bg-muted/60"
                                variant="ghost"
                                onClick={() => {
                                    setTheme(
                                        theme === "light" ? "dark" : "light"
                                    );
                                }}
                            >
                                <SunMedium
                                    className="dark:scale-0 scale-100 rotate-45 transition-all dark:rotate-0"
                                    size={17}
                                />
                                <Moon
                                    className="absolute dark:scale-100 scale-0 rotate-45 transition-all dark:rotate-0"
                                    size={17}
                                />
                            </Button>
                            <div className="hidden md:flex gap-2">
                                <div
                                    className={`text-sm gap-2 items-center font-medium ${user ? "hidden" : "flex"}`}
                                >
                                    <Link href="/auth/login">
                                        <Button variant="ghost" size="sm" className="font-semibold text-sm">
                                            Se connecter
                                        </Button>
                                    </Link>
                                    <Link href="/auth/register">
                                        <Button variant="success" size="sm" className="font-semibold text-sm rounded-lg shadow-xs">
                                            S&apos;inscrire
                                        </Button>
                                    </Link>
                                </div>
                                <div className={`flex gap-4 items-center ${user ? "flex" : "hidden"}`}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="px-2 py-2 rounded-full"
                                            >
                                                <Plus/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="rounded-md mr-3 w-[200px] text-sm"
                                        >
                                            <DropdownMenuItem
                                                asChild
                                            >
                                                <Link
                                                    href="/dashboard/documents/new"
                                                    className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                                >
                                                    <BookOpen size={17}/>
                                                    Nouveau document
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                asChild
                                            >
                                                <Link
                                                    href="/dashboard/articles/new"
                                                    className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                                >
                                                    <BellPlus size={17}/>
                                                    Nouvel article
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                asChild
                                            >
                                                <Link
                                                    href="#"
                                                    className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                                >
                                                    <MessageCircle size={17}/>
                                                    Nouvelle discussion
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="rounded-full focus:ring-2 focus:ring-primary">
                                            {!isLoading &&
                                                <Avatar>
                                                    {user?.image ?
                                                        <AvatarImage src={user.image} alt={user.name}/>
                                                        :
                                                        <AvatarFallback className={"font-medium bg-primary/20"}>
                                                            {user?.name?.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    }
                                                </Avatar>
                                            }
                                            {isLoading &&
                                                <Avatar>
                                                    <Loader2 size={18}/>
                                                </Avatar>
                                            }
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            aria-label="Static Actions"
                                            className="mr-3 rounded-md w-[200px]"
                                        >
                                            <DropdownMenuLabel className="text-xs line-clamp-2 font-normal">
                                                Connecté en tant que <span
                                                className="font-medium block text-primary">{user?.name}</span>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem
                                                asChild
                                            >
                                                <Link
                                                    href="/dashboard"
                                                    className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                                >
                                                    <LayoutDashboard
                                                        size={18}
                                                    />
                                                    Tableau de bord
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                asChild
                                            >
                                                <Link
                                                    href="/dashboard/account"
                                                    className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                                >
                                                    <User size={18}/>
                                                    Votre compte
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                asChild
                                            >
                                                <Link
                                                    href="/dashboard/settings"
                                                    className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                                >
                                                    <Settings size={18}/>
                                                    Paramètres
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                asChild
                                            >
                                                <Link
                                                    href="/help"
                                                    className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                                >
                                                    <CircleHelp size={18}/>
                                                    Assistance
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem
                                                onClick={handleLogout}
                                                className="flex gap-2 items-center w-full py-2 cursor-pointer text-destructive focus:text-destructive"
                                            >
                                                <DoorClosed size={18}/>
                                                Se déconnecter
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </section>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="flex md:hidden"
                                >
                                    <AlignJustify/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>ESIAC-BIBLIO</SheetTitle>
                                    <SheetDescription>
                                        Votre bibliothèque numérique
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col gap-3 mt-4">
                                    {navlinks.map((navlink, index) => (
                                        <div key={index}>
                                            <SheetClose asChild>
                                                <Link
                                                    href={navlink.href}
                                                    className={clsx(
                                                        pathname == navlink.href
                                                            ? "text-green-600 font-semibold"
                                                            : "text-gray-600 dark:text-neutral-50",
                                                        "font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm block"
                                                    )}
                                                >
                                                    {navlink.title}
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    ))}
                                </div>
                                <div className={`flex-col mt-4 gap-3 ${user ? "flex" : "hidden"}`}>
                                    {morelinks.map((navlink, index) => (
                                        <div key={index}>
                                            <SheetClose asChild>
                                                <Link
                                                    href={navlink.href}
                                                    className={clsx(
                                                        pathname == navlink.href
                                                            ? "text-green-600 font-semibold"
                                                            : "text-gray-600 dark:text-neutral-50",
                                                        "font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm block"
                                                    )}
                                                >
                                                    {navlink.title}
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    ))}
                                    <SheetClose asChild>
                                        <button
                                            onClick={handleLogout}
                                            className="font-medium text-red-600 hover:text-red-400 w-full py-3 px-4 text-sm flex justify-start gap-2 items-center">
                                            <DoorClosed size={20}/>
                                            Se déconnecter
                                        </button>
                                    </SheetClose>
                                </div>
                                <div
                                    className={`text-sm flex-col gap-3 font-medium ml-4 mt-3 ${user ? "hidden" : "flex"}`}
                                >
                                    <SheetClose asChild>
                                        <Link
                                            href={"/auth/login"}
                                            className="text-green-600 hover:text-green-600/90 flex font-semibold"
                                        >
                                            Se connecter
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href={"/auth/register"}
                                            className="hover:text-opacity-90"
                                        >
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
    );
}
