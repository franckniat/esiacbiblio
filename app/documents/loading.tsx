import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
import DocumentSkeleton from "@/components/document/document-skeleton";


export default async function LoadingDocuments() {
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
                    <DocumentSkeleton/>
                    <DocumentSkeleton/>
                    <DocumentSkeleton/>
                </section>
            </main>
            <Footer />

        </>
    )
}