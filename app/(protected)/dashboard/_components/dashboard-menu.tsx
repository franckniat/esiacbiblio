
import { BadgeCheck, Loader2, } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import DashboardLinks from "./dashboard-links";
import { getUserById } from "@/data/user";
import { Suspense } from "react";




export default async function DashboardMenu() {
    const user = await auth();
    const userInfo = await getUserById(user?.user.id);
    const isAdmin = userInfo?.role === "ADMIN" || userInfo?.role === "SUPERADMIN";
  return (
    <>
    <aside className="mb-4 border-r border-slate-100 dark:border-slate-900 hidden md:block">
        <div className="flex flex-col items-start h-full px-4 py-3 pt-6">
            <div className="flex flex-col max-w-[250px]">
                <div className="flex flex-col gap-2 items-center">
                    <Suspense fallback={<Loader2 className="animate-spin" size={60}/>}>
                        <Avatar className={`w-20 h-20 cursor-pointer flex justify-center items-center ${isAdmin ? "border-4 border-amber-600":" border-none"}`}>
                            {
                                user?.user.image === null || 
                                user?.user.image === undefined || 
                                user?.user.image === ""  ?  
                                <AvatarFallback className="text-xl font-extrabold">{user?.user.name?.charAt(0).toUpperCase()}</AvatarFallback> :
                                <AvatarImage src={user?.user.image} className="object-cover"/>
                            }
                        </Avatar>
                    </Suspense>
                    <span className="text-lg md:text-xl font-bold flex gap-1 items-center">
                        {user?.user.name}
                        {isAdmin && <BadgeCheck size={15}/>}
                    </span>
                </div>
                <div className="py-2 flex flex-col gap-2 text-sm">
                    <p className="whitespace-pre-line text-slate-500">{userInfo?.bio}</p>
                    <p className="text-green-600">⭐{userInfo?.expPoints} EXP</p>
                </div>
            </div>
            <DashboardLinks/>
        </div>

    </aside>
    </>
  )
}
