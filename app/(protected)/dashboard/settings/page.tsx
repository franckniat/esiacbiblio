import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";

export default function SettingPage(){
    return (
        <DashboardWrapper title="Paramètres" path={[{ name: "Paramètres", href: "/dashboard/settings"}]}>
            <div>
                <h1>Paramètres</h1>
            </div>
        </DashboardWrapper>
    )
}