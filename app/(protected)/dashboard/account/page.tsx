import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";

export default function ProfilePage() {
    return (
        <div className={"px-3"}>
            <DashboardWrapper title="Gérer votre compte" path={[{ name: "Compte", href: "/dashboard/account"}]}>
                <h1 className="text-foreground/40"></h1>
            </DashboardWrapper>
        </div>
    )
}