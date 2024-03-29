"use client"
import { Book, BookPlus, DoorOpen, Feather, FeatherIcon, LayoutGrid, Loader2, MessageCircle, MessageSquarePlus, ScrollText, Settings, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/auth";

const dashboardLinks = [
    {
        title: 'Tableau de bord',
        path: '/dashboard',
        icon: <LayoutGrid size={20}/>,
    },
    {
        title:"Documents",
        path: "/dashboard/documents",
        icon: <Book size={20}/>,
    },
    {
        title: 'Articles',
        path: '/dashboard/articles',
        icon: <ScrollText size={20}/>,
    },
    {
        title: 'Discussions',
        path: '/dashboard/discussions',
        icon: <MessageCircle size={20}/>,
    },
    {
        title: 'Paramètres',
        path: '/dashboard/settings',
        icon: <Settings size={20}/>,
    },
];

const newLinks = [
    {
        title: 'Nouvel article',
        path: '/dashboard/articles/new',
        icon : <Feather size={20}/>,
    },
    {
        title: 'Nouveau document',
        path: '/dashboard/documents/new',
        icon : <BookPlus size={20}/>,
    },
    {
        title: 'Nouvelle discussion',
        path: '/dashboard/newdiscussion',
        icon : <MessageSquarePlus size={20}/>,
    },
];


export default function DashboardMenu() {
    const pathname = usePathname();
    const user = useSession();
    const handleLogout = ()=>{
        logout();
    }
  return (
    <>
    <aside className=" mb-4 border-r border-slate-100 dark:border-slate-900">
        <div className="flex flex-col items-start justify-between h-full px-4 py-3 pt-6">
            <div className="flex flex-col max-w-[250px]">
                <div className="flex flex-col gap-2 items-center">
                    <Avatar className="w-20 h-20 cursor-pointer flex justify-center items-center">
                        {user.status==="loading" ? <Loader2 size={40} className="animate-spin"/> : 
                        <>
                            {
                                user.data?.user.image === null || 
                                user.data?.user.image === undefined || 
                                user.data?.user.image === ""  ?  
                                <AvatarFallback className="text-xl">{user.data?.user.name?.charAt(0).toUpperCase()}</AvatarFallback> :
                                <AvatarImage src={user.data?.user.image} className="object-cover"/>
                            }
                        </>
                        }
                    </Avatar>
                    <span className="text-lg md:text-xl font-bold">{user.status ==="loading" ?<Skeleton className="w-40 h-5"/> : user.data?.user.name}</span>
                </div>
                <nav className="flex flex-col mt-5 gap-2">
                    <h2 className="text-sm text-neutral-400 dark:text-slate-600">
                        Gérer vos informations.
                    </h2>
                    {dashboardLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.path}
                            className={clsx("flex text-sm items-center gap-2 py-2 rounded-lg hover:text-green-600 hover:translate-x-1 will-change-transform transition-all", pathname === link.path ? "text-green-600":" dark:text-slate-50 text-slate-950 ")}
                        >
                            {link.icon}{link.title}
                        </Link>
                    ))}
                </nav>
                <nav className="flex flex-col gap-2 mt-4">
                    <h2 className="text-sm text-neutral-400 dark:text-slate-600">
                        Laissez votre empreinte.
                    </h2>
                    {newLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.path}
                            className={clsx("flex text-sm items-center gap-2 py-2 rounded-lg hover:text-green-600 hover:translate-x-1 will-change-transform transition-all", pathname === link.path ? "text-green-600":" dark:text-slate-50 text-slate-950 ")}
                        >
                            {link.icon}{link.title}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mb-3 w-full">
                <Button variant={"outline"} className="w-full flex items-center gap-3 shadow" onClick={handleLogout}>
                    <DoorOpen/>
                    <span>Se déconnecter</span>
                </Button>
            </div>
        </div>

    </aside>
    </>
  )
}
