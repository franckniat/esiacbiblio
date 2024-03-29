import type { Metadata } from "next";
import Navigation from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import DashboardMenu from "./_components/dashboard-menu";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Application de la communauté des étudiants de l'ESIAC.",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
        <Navigation />
        <main className="max-w-[1340px] mx-auto px-3">
            <section className="flex">
                <DashboardMenu />
                <div className="flex-1 mx-6 my-3">
                    {children}
                </div>
            </section>
        </main>
        <Footer />
    </>
  )
}