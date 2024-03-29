import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


export default async function Dashboard() {
    const session = await auth()
  return (
    <div className='px-3 py-1'>
      <div className="my-3 flex flex-col gap-3">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Tableau de bord</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='space-y-3'>
                <h1 className="text-2xl tracking-tight font-semibold text-neutral-950 dark:text-white">Tableau de bord</h1>
                <p className='text-sm leading-6 indent-1'>Hello {session?.user.name}, </p>
            </div>
        </div>
    </div>
  )
}
