"use client"
import {SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import React, {useEffect} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Bell, Moon, SunMedium} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {BellSlash} from "react-bootstrap-icons";
import {useTheme} from "next-themes";


export default function DashboardHeader() {
    const { open } = useSidebar()
    const {theme, setTheme} = useTheme()
    const navbar = React.useRef<HTMLElement>(null)
    useEffect(() => {
        if (open && navbar.current) {
            navbar.current.style.width = "calc(100% - 16rem)"
        }
        if (!open && navbar.current) {
            navbar.current.style.width = "calc(100% - 3rem)"
        }
    }, [open, navbar])
    return (
        <nav className={`fixed top-0 right-0 bg-background/90 backdrop-blur`} ref={navbar}>
            <div className={"h-[60px] flex justify-between gap-3 px-3"}>
                <SidebarTrigger className={"m-4"}/>
                <div className={"flex gap-3 items-center"}>
                    <Button
                        size={"icon"}
                        className="relative"
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"}>
                                <Bell size={18}/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={"min-w-[250px] mr-2"}>
                            <DropdownMenuLabel>Vos notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <ScrollArea className={""}>
                                <div className={"text-sm font-medium flex flex-col gap-3 justify-center items-center min-h-[200px]"}>
                                    <BellSlash size={20}/>
                                    <span>Aucune notification</span>
                                </div>
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}