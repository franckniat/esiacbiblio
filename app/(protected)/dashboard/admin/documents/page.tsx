
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { AllDocuments } from "@/components/dashboard/data-tables/all-documents";
import React from "react";
import {getAllDocuments} from "@/data/document";
import {getCurrentUser} from "@/lib/user";
import {redirect} from "next/navigation";

export default async function AdminDocumentsPage() {
    const allDocuments = await getAllDocuments();
    const user = await getCurrentUser()
    if(!user?.role || user.role !== "admin") {
        redirect("/dashboard")
    }
    return (
        <DashboardWrapper title="Gestion des documents" path={[{ name: "Documents ajoutés", href: "/dashboard/documents"}]}>
            <p className="text-foreground/40">Gérer les documents ajoutés récemment.</p>
            <AllDocuments data={allDocuments} />
        </DashboardWrapper>
    );
}