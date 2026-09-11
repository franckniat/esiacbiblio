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
    CircleHelp,
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
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useTheme} from "next-themes";
import {useCurrentUser} from "@/hooks/use-currentuser";
import {signOut} from "@/lib/auth-client";
import {useEffect, useState} from "react";

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
    // The session is resolved on the client only: render a neutral placeholder
    // until mount so the server and client markup stay identical.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const sessionReady = mounted && !isLoading;

    // Barre transparente en haut de page, fond au premier défilement.
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => {
            // On ne repasse par setState que si le seuil est franchi.
            setScrolled((current) => {
                const next = window.scrollY > 10;
                return next === current ? current : next;
            });
        };
        // Le navigateur peut restaurer une position de défilement au chargement.
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut();
            router.push("/auth/login");
            router.refresh();
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <nav className="z-30 w-full sticky top-0">
            {/*
             * Le fond est un calque distinct dont on anime l'opacité : appliquer
             * backdrop-blur directement sur la nav flouterait le hero même une
             * fois transparente, et le flou ne se transitionne pas.
             */}
            <div
                aria-hidden="true"
                className={clsx(
                    "absolute inset-0 -z-10 backdrop-blur-md bg-background/85 border-b border-border/60 shadow-xs transition-opacity duration-300",
                    scrolled ? "opacity-100" : "opacity-0"
                )}
            />
            <section className="max-w-[1340px] mx-auto px-4 sm:px-6">
                <section className="flex items-center justify-between h-16">
                    <section className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-lg md:text-xl font-extrabold tracking-tight whitespace-nowrap hover:opacity-90 transition-opacity"
                        >
                            ESIAC<span className="text-brand">-</span>BIBLIO
                        </Link>
                        <div className="items-center hidden lg:flex gap-1">
                            {navlinks.map((nlink) => (
                                <Link
                                    key={nlink.id}
                                    href={nlink.href}
                                    aria-current={pathname === nlink.href ? "page" : undefined}
                                    className={clsx(
                                        pathname === nlink.href
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted",
                                        "px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors"
                                    )}
                                >
                                    {nlink.title}
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="hidden lg:flex items-center gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Changer de thème"
                            className="relative rounded-md"
                            onClick={toggleTheme}
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

                        {!sessionReady && (
                            <Skeleton className="w-24 h-9 rounded-md"/>
                        )}

                        {sessionReady && !user && (
                            <div className="flex items-center gap-2">
                                <Link href="/auth/login">
                                    <Button variant="ghost" size="sm" className="font-semibold">
                                        Se connecter
                                    </Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button variant="success" size="sm" className="font-semibold">
                                        S&apos;inscrire
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {sessionReady && user && (
                            <div className="flex gap-1 items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Créer"
                                            className="rounded-full"
                                        >
                                            <Plus size={18}/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="rounded-md mr-3 w-[200px] text-sm"
                                    >
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/dashboard/documents/new"
                                                className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                            >
                                                <BookOpen size={17}/>
                                                Nouveau document
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/dashboard/articles/new"
                                                className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                            >
                                                <BellPlus size={17}/>
                                                Nouvel article
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem disabled className="py-2">
                                            <MessageCircle size={17}/>
                                            Nouvelle discussion
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                        <Avatar>
                                            {user?.image ? (
                                                <AvatarImage src={user.image} alt={user.name}/>
                                            ) : (
                                                <AvatarFallback className="font-medium bg-primary/20">
                                                    {user?.name?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
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
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/dashboard"
                                                className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                            >
                                                <LayoutDashboard size={18}/>
                                                Tableau de bord
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/dashboard/account"
                                                className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                            >
                                                <User size={18}/>
                                                Votre compte
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/dashboard/settings"
                                                className="flex gap-2 items-center w-full h-full py-2 cursor-pointer"
                                            >
                                                <Settings size={18}/>
                                                Paramètres
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
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
                        )}
                    </section>

                    {/* ------------------------------------------------------ MOBILE */}
                    <div className="flex lg:hidden items-center gap-1">
                        <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Changer de thème"
                            className="relative rounded-md"
                            onClick={toggleTheme}
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
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="ghost" aria-label="Ouvrir le menu">
                                    <AlignJustify/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        ESIAC<span className="text-brand">-</span>BIBLIO
                                    </SheetTitle>
                                    <SheetDescription>
                                        Votre bibliothèque numérique
                                    </SheetDescription>
                                </SheetHeader>

                                <div className="flex flex-col mt-6">
                                    {navlinks.map((navlink) => (
                                        <SheetClose asChild key={navlink.id}>
                                            <Link
                                                href={navlink.href}
                                                className={clsx(
                                                    pathname === navlink.href
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                                                    "font-medium rounded-md px-3 py-2.5 text-sm transition-colors"
                                                )}
                                            >
                                                {navlink.title}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>

                                {sessionReady && user && (
                                    <>
                                        <div className="my-5 border-t border-border"/>
                                        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Espace membre
                                        </p>
                                        <div className="flex flex-col">
                                            {morelinks.map((navlink) => (
                                                <SheetClose asChild key={navlink.id}>
                                                    <Link
                                                        href={navlink.href}
                                                        className={clsx(
                                                            pathname === navlink.href
                                                                ? "bg-primary/10 text-primary"
                                                                : "text-muted-foreground hover:text-foreground hover:bg-muted",
                                                            "font-medium rounded-md px-3 py-2.5 text-sm transition-colors"
                                                        )}
                                                    >
                                                        {navlink.title}
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                            <SheetClose asChild>
                                                <button
                                                    onClick={handleLogout}
                                                    className="font-medium text-destructive hover:bg-destructive/10 rounded-md w-full py-2.5 px-3 text-sm flex justify-start gap-2 items-center transition-colors"
                                                >
                                                    <DoorClosed size={18}/>
                                                    Se déconnecter
                                                </button>
                                            </SheetClose>
                                        </div>
                                    </>
                                )}

                                {sessionReady && !user && (
                                    <div className="flex flex-col gap-2.5 mt-6 pt-5 border-t border-border">
                                        <SheetClose asChild>
                                            <Link href="/auth/register">
                                                <Button variant="success" className="w-full font-semibold">
                                                    S&apos;inscrire
                                                </Button>
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href="/auth/login">
                                                <Button variant="outline" className="w-full font-semibold">
                                                    Se connecter
                                                </Button>
                                            </Link>
                                        </SheetClose>
                                    </div>
                                )}
                            </SheetContent>
                        </Sheet>
                    </div>
                </section>
            </section>
        </nav>
    );
}
