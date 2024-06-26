
import Navbar from '@/components/ui/header';
import { ChevronRight } from 'lucide-react';
import Footer from '@/components/ui/footer';
import { getActiveDocuments } from '@/data/documents';
import DocumentCard from '@/components/document';
import { getUserById } from '@/data/user';
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import { Metadata } from "next";

export async function generateMetadata(
): Promise<Metadata> {
    return {
        title: "Documents - ESIAC BIBLIO",
        description: "Venez à la découverte d'une multitude de rapports, cours et documents.",
        
    }
}

export default async function Documents() {
    const allDocuments = await getActiveDocuments();
    const documentsWithUser = await Promise.all(allDocuments.map(async (document) => {
        const user = await getUserById(document.userId);
        return {
            ...document,
            user: user
        };
    }));
    const documents = documentsWithUser;
    return (
        <>
            <Navbar />
            <main className="max-w-[1340px] mx-auto px-2">
                <section className="mx-2 md:mx-5 pt-10 sm:pt-22">
                    <section className='text-sm'>
                        <CustomBreadcrumb
                            path={[
                                { name: "Accueil", href: "/" },
                                { name: "Documents", href: "/documents" }
                            ]}
                        />
                    </section>
                    <div className='space-y-4'>
                        <h1 className="text-3xl font-bold">
                            Documents
                        </h1>
                        <p className="text-sm">
                            Venez à la découverte d&#039;une multitude de rapports, cours et documents.
                        </p>
                    </div>
                </section>
                <section
                    className="px-2 md:px-5 mt-5 flex-wrap sm:flex-nowrap flex items-center gap-2 justify-center md:justify-end">

                </section>
                <section
                    className="px-2 md:px-5 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-10">
                    {documents && documents.map((document, index) => (
                        <DocumentCard
                            key={index}
                            id={document.id}
                            author={document.user?.name}
                            title={document.title}
                            description={document.description}
                            date={document?.createdAt?.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                            sector={document.sector}
                            fileURL={document.fileURL}
                        />
                    ))}
                </section>
            </main>
            <Footer />

        </>
    )
}