import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {Table,TableBody,TableCell,TableFooter,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { getUserDocuments } from "@/data/documents";
import { getUserById } from "@/data/user";
import { PackageOpen, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function DocumentsTable() {
    const session = await auth();
    const allUserDocuments = await getUserDocuments(session?.user.id);
    const documentsWithUser = allUserDocuments.map(async(document) => {
        const user = await getUserById(document.userId);
        return {
            ...document,
            user: user,
        };
    })
    const documents = await Promise.all(documentsWithUser);
  return (
    <Card className="my-3 rounded-sm">
        <CardContent className="px-0 py-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Date de création</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-sm">
                    {documents.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                <div className="flex flex-col items-center justify-center h-[250px] gap-4">
                                    <PackageOpen size={50}/>
                                    Vous n{"'"}avez pas encore ajouté de documents.
                                    <Link href="/dashboard/documents/new">
                                        <Button variant={"success"}>Ajouter un document</Button>
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                    {documents.map((document,index) => (
                        <TableRow key={index}>
                            <TableCell>{document.title}</TableCell>
                            <TableCell className="line-clamp-2">{document.description}</TableCell>
                            <TableCell>{document.user?.name}</TableCell>
                            <TableCell>{document.createdAt?.toLocaleDateString("fr-FR",{year:"numeric",month:"long",day:"numeric"})} à {document.createdAt?.toLocaleTimeString("fr-FR",{hour:"numeric", minute:"numeric"})}</TableCell>
                            <TableCell className="flex gap-2 items-center justify-center">
                                <Link href={`/dashboard/documents/${document.id}/edit`}>
                                    <Button variant="success" size="sm"><SquarePen size={15}/></Button>
                                </Link>
                                <Button variant="danger" size="sm"><Trash2 size={15}/></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}
