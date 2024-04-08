import AdminNavbar from "../_components/admin-bar";

export default function AdminLayout({
     children 
}: {
    children: React.ReactNode}) {
    return(
        <>
            <AdminNavbar/>
            <section className="px-1 py-2 sm:px-2 md:px-4 min-h-screen">
                {children}
            </section>
        </>
    )
}