
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { AllArticles } from "@/components/dashboard/data-tables/all-articles";
import React from "react";
import {getAllArticles} from "@/data/article";
import {getCurrentUser} from "@/lib/user";
import {redirect} from "next/navigation";

export default async function AdminArticlesPage() {
    const allArticles = await getAllArticles();
    const user = await getCurrentUser()
    if(!user?.role || user.role !== "admin") {
        redirect("/dashboard")
    }
    return (
        <DashboardWrapper title="Gestion des articles" path={[{ name: "Articles ajoutés", href: "/dashboard/articles"}]}>
            <p className="text-foreground/40">Gérer les articles ajoutés récemment.</p>
            <AllArticles data={allArticles} />
        </DashboardWrapper>
    );
}