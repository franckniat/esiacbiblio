import {Tabs, TabsContent, TabsTrigger, TabsList} from "@/components/ui/tabs";
import { DashboardWrapper } from "../_components/dashboard-wrapper";
import {ProfileForm} from "../_components/profile-form";
import UserPreferences from "../_components/user-preferences";

export default function SettingsPage() {
  return (
    <>
        <DashboardWrapper
            title="Paramètres"
            path={[
                {name:"Paramètres", href:"/dashboard/settings"}
            ]}
            headerMessage="Configurez votre profil et ajustez vos préférences."
        >
            <Tabs defaultValue="profile" className="my-3">
                <TabsList>
                    <TabsTrigger value="profile">Votre profil</TabsTrigger>
                    <TabsTrigger value="preferences">Préférences</TabsTrigger>
                    {/* <TabsTrigger value="account">Compte</TabsTrigger> */}
                </TabsList>
                <TabsContent value="profile">
                    <ProfileForm/>
                </TabsContent>
                <TabsContent value="preferences">
                    <UserPreferences/>
                </TabsContent>
                {/* <TabsContent value="account">Change your password here.</TabsContent> */}
            </Tabs>
        </DashboardWrapper>
    </>
  )
}
