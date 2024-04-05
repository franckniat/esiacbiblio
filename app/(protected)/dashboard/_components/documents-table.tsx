import { deleteDocument } from "@/actions/document";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserDocuments } from "@/data/documents";
import { getUserById } from "@/data/user";
import { Dot, PackageOpen, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./detete-button";
import { Badge } from "@/components/ui/badge";

export default async function DocumentsTable() {
    const session = await auth();
    const allUserDocuments = await getUserDocuments(session?.user.id);
    const documentsWithUser = allUserDocuments.map(async (document) => {
        const user = await getUserById(document.userId);
        return {
            ...document,
            user: user,
        };
    })
    const documents = await Promise.all(documentsWithUser);
    return (
        <>
            {documents.length > 0 && (
                <div className="flex justify-end">
                    <Link href="/dashboard/documents/new">
                        <Button variant={"success"}>Ajouter un document</Button>
                    </Link>
                </div>
            )}
            <div className="my-3 rounded-sm border border-slate-300 dark:border-slate-700">
                <div className="px-0 py-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Auteur</TableHead>
                                <TableHead>Date de création</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-sm">
                            {documents.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        <div className="flex flex-col items-center justify-center h-[250px] gap-4">
                                            <PackageOpen size={50} />
                                            Vous n{"'"}avez pas encore ajouté de documents.
                                            <Link href="/dashboard/documents/new">
                                                <Button variant={"success"}>Ajouter un document</Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                            {documents.map((document, index) => (
                                <TableRow key={index}>
                                    <TableCell>{document.title}</TableCell>
                                    <TableCell className="line-clamp-2">{document.description}</TableCell>
                                    <TableCell>{document.user?.name}</TableCell>
                                    <TableCell>{document.createdAt?.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })} à {document.createdAt?.toLocaleTimeString("fr-FR", { hour: "numeric", minute: "numeric" })}</TableCell>
                                    <TableCell>
                                        {document.isVisible ? (
                                            <Badge variant="success" className="rounded-full">
                                                <Dot className="text-green-600"/>
                                                <span>Validé</span>
                                            </Badge>
                                        ):(
                                            <Badge variant="warning" className="rounded-full">
                                                <Dot className="text-yellow-600"/>
                                                <span>En attente</span>
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="flex gap-2 items-center justify-center">
                                        <Link href={`/dashboard/documents/edit/${document.id}`}>
                                            <Button variant="success" size="sm"><SquarePen size={15} /></Button>
                                        </Link>
                                        <DeleteButton
                                            id={document.id}
                                            deleteFunc={deleteDocument}
                                            message="Document supprimé avec succès !"
                                        >
                                            <Trash2 size={15} />
                                        </DeleteButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={5}>Total de documents ajoutés : </TableCell>
                                <TableCell className="text-right">{documents.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </>
    )
}
