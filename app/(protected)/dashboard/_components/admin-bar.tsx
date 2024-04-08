"use client";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
    {
        title: 'Console',
        href: '/dashboard/admin'
    },
    {
        title: 'Utilisateurs',
        href: '/dashboard/admin/users'
    },
    {
        title: 'Documents',
        href: '/dashboard/admin/documents'
    },
    {
        title: 'Articles',
        href: '/dashboard/admin/articles'
    },
    {
        title: 'Paramètres',
        href: '/dashboard/admin/settings'
    },
]

export default function AdminNavbar(){
    const pathname = usePathname();
    return(
        <nav className="sticky top-[60px] bg-white/90 dark:bg-slate-950/90 border-b backdrop-blur-sm border-slate-100 dark:border-slate-800 z-10">
            <div className="">
                <div className="sm:flex gap-2 items-center text-sm hidden">
                    {adminLinks.map((link, index) => (
                        <Link 
                            key={index} 
                            href={link.href}
                            className={`px-2 py-3 ${pathname === link.href ? 'text-green-600 ' : 'text-slate-900 dark:text-slate-50'} hover:text-green-600 dark:hover:text-green-600 transition-colors`}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <div className="flex sm:hidden justify-end">
                    <Button variant="ghost">
                        Menu
                    </Button>
                </div>
                
            </div>
        </nav>
    )
}