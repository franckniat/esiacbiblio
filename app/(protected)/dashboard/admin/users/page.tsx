import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { AllUsers } from "@/components/dashboard/data-tables/all-users";
import { getAllUsers } from "@/data/user";

export default async function AdminUsersPage() {
    const users = await getAllUsers();
    return (    
        <DashboardWrapper title="Gestion des utilisateurs" path={[{ name: "Utilisateurs", href: "/dashboard/users"}]}>
            <AllUsers data={users} />
        </DashboardWrapper>
    )
}
