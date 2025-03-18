import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function ProfilePage() {
    const user = await getCurrentUser();
    if (!user) {
        toast.error("Vous devez être connecté pour accéder à cette page");
        redirect("/auth/login");
    }
    return (
        <div className={"px-3"}>
            <DashboardWrapper title="Gérer votre compte" path={[{ name: "Compte", href: "/dashboard/account"}]}>
                <p className="text-foreground/40">
                    Vous pouvez modifier vos informations personnelles ici.
                </p>
            </DashboardWrapper>
        </div>
    )
}