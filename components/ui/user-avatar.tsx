"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";

interface UserAvatarProps {
    className?: string;
}
export default function UserAvatar({className}: UserAvatarProps) {
    const session = useSession();
    const isAdmin = session.data?.user?.role==="ADMIN" || session.data?.user?.role==="SUPERADMIN";
  return (
    <div>
      <Avatar
        className={`hover:bg-opacity-80 flex items-center justify-center ${
          isAdmin ? "border-2 border-amber-600" : "border-none"
        }` + ` ${className}`}
      >
        {session.status === "loading" ? (
          <Loader size={20} className="animate-spin" />
        ) : (session.data?.user && session.data?.user.image === "") ||
          session.data?.user.image === undefined ||
          session.data?.user.image === null ? (
          <AvatarFallback className="font-bold">
            {session.data?.user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        ) : (
          <AvatarImage className="object-cover" src={session.data?.user.image} />
        )}
      </Avatar>
    </div>
  );
}
