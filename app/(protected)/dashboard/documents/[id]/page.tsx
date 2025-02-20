import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import {getDocumentById} from "@/data/document";
import {getCategories, getSectors} from "@/data/items";
import React from "react";
import EditDocumentForm from "@/components/document/edit-document";
import {Document} from "@prisma/client";
import { getCurrentUser } from "@/lib/user";
import { toast } from "sonner";

export default async function EditDocument({params,}: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const document = await getDocumentById(id) as Document;
    const userId = document.userId;
    const user = await getCurrentUser();
    if (userId !== user!.id) {
        toast.error("Vous n'êtes pas autorisé à modifier ce document.");
        return {
            redirect: {
                destination: "/dashboard/documents",
                permanent: false,
            },
        };
    }
    const sectors = await getSectors();
    const categories = await getCategories();
    return (
        <DashboardWrapper
            title="Modifier le document"
            path={[{name: "Documents", href: "/dashboard/documents"}, {name: document?.title, href: `/dashboard/documents/${id}`}]}
        >
            <h1 className="text-foreground/40 text-sm">Vous pouvez seulement modifier les éléments descriptifs de votre document.</h1>
            <EditDocumentForm id={id} sectors={sectors} categories={categories} document={document}/>
        </DashboardWrapper>
    );

}