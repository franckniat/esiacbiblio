import CustomBreadcrumb from "@/components/ui/custom-breadcrumb";
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
    children,
    title,
    headerMessage,
    path,
}: DashboardWrapperProps) => {
    return (
        <main className="">
            <div className="text-sm my-2">
                <CustomBreadcrumb
                    path={[
                        { name: "Tableau de bord", href: "/dashboard" },
                        ...path,
                    ]}
                />
            </div>
            <section className="space-y-3">
                <h1 className="text-2xl md:text-2xl font-bold">{title}</h1>
                {headerMessage && <p className="text-sm leading-6">{headerMessage}</p>}
            </section>
            <section>{children}</section>
        </main>
    );
};
