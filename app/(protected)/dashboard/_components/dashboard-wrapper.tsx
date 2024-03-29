import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
type Path = {
    name: string;
    href: string;
};
interface DashboardWrapperProps {
    children: React.ReactNode;
    title: string;
    headerMessage?: string;
    path: Path[];
}

export const DashboardWrapper = ({
    children, title, headerMessage, path
}:DashboardWrapperProps)=>{
    return(
        <main className="">
            <div className="text-sm my-2">
                {path && (
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">Tableau de bord</BreadcrumbLink>
                            </BreadcrumbItem>
                            <ChevronRight size={15}/>
                            {path.map((item, index) => (
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                                    <ChevronRight size={15}/>
                                </BreadcrumbItem>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                )}
            </div>
            <section className="space-y-3">
                <h1 className="text-2xl md:text-2xl font-bold">{title}</h1>
                {headerMessage && <p className="text-sm leading-6">{headerMessage}</p>}
            </section>
            <section>
                {children}
            </section>
        </main>
    )

}