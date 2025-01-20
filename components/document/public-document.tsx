"use client";
import {Document, LikeDocument, User} from "@prisma/client";
import * as React from "react";
import DocumentCard from "@/components/document/index";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type DocumentWithUserAndLikes = Document & {
    user: User;
    likes: LikeDocument[];
}

interface PublicDocumentsProps {
    documents: DocumentWithUserAndLikes[];
}

export default function PublicDocuments({documents}: PublicDocumentsProps) {
    const [search, setSearch] = React.useState("");
    const [filteredDocuments, setFilteredDocuments] = React.useState<DocumentWithUserAndLikes[]>(documents);
    React.useEffect(() => {
        if (search) {
            setFilteredDocuments(
                documents.filter((doc) =>
                    doc.title.toLowerCase().startsWith(search.toLowerCase())
                )
            );
        } else {
            setFilteredDocuments(documents);
        }
    }, [search, documents]);
    return (
        <>
            <section
                className="px-2 md:px-5 mt-5 flex-wrap sm:flex-nowrap flex items-center gap-2 justify-center md:justify-end">
                <div className="flex flex-col sm:flex-row gap-2 items-center relative">
                    <Input
                        type="search"
                        onChange={
                            (e) => setSearch(e.target.value)
                        }
                        placeholder="Rechercher un document"
                        className="w-full sm:w-[400px] pl-7"
                    />
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-foreground/50" size={17}/>
                </div>
            </section>
            <div
                className="px-2 md:px-5 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-10">
                {filteredDocuments && filteredDocuments.map((document, index) => (
                    <DocumentCard
                        key={index}
                        id={document.id}
                        document={document}
                    />
                ))}
            </div>
        </>
    );
}