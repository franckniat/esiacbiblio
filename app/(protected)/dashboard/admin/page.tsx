import {redirect} from "next/navigation";
import {getCurrentUser} from "@/lib/user";

export default async function AdminPage() {
    const user = await getCurrentUser()
    if(!user?.role || user.role !== "admin") {
        redirect("/dashboard")
    }
    redirect("/dashboard/admin/documents");
}