
interface DashboardFormWrapperProps {
    title: string;
    headerMessage?: string;
    children: React.ReactNode;
    className?: string;
}

export default function DashboardFormWrapper({
    title, headerMessage, children, className
}:DashboardFormWrapperProps) {
  return (
    <>
        <div className={`flex flex-col gap-3 my-2 ${className}`}>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-slate-500">{headerMessage}</p>
        </div>
        {children}
    </>
  )
}
