"use client";
import {Category, Document, LikeDocument, Sector, User} from "@prisma/client";
import * as React from "react";
import DocumentCard from "@/components/document/index";
import {Input} from "@/components/ui/input";
import {BookText, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQueryState, parseAsInteger } from 'nuqs';


type DocumentWithUserAndLikes = Document & {
    user: User;
    likes: LikeDocument[];
}

interface PublicDocumentsProps {
    documents: DocumentWithUserAndLikes[];
    categories: Category[];
    sectors: Sector[];
}

export default function PublicDocuments({documents, categories, sectors}: PublicDocumentsProps) {
    const [search, setSearch] = useQueryState("title", {defaultValue: ""});
    const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger);
    const documentsPerPage = 8;
    const [filteredDocuments, setFilteredDocuments] = React.useState<DocumentWithUserAndLikes[]>(documents);
    const [selectedCategory, setSelectedCategory] = useQueryState("category", {defaultValue: "all"});
    const [selectedSector, setSelectedSector] = useQueryState("sector", {defaultValue: "all"});
    React.useEffect(() => {
        let filtered = documents;
        if (search) {
            filtered = filtered.filter((doc) =>
                doc.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedCategory !== "all") {
            filtered = filtered.filter((doc) => doc.category === selectedCategory);
        }

        if (selectedSector !== "all") {
            filtered = filtered.filter((doc) => doc.sector === selectedSector);
        }
        setFilteredDocuments(filtered);
    }, [search, documents, selectedCategory, selectedSector]);
    const handleSortByCategory = (category: string) => {
        setSelectedCategory(category);
    };

    const handleSortBySector = (sector: string) => {
        setSelectedSector(sector);
    };
    const displayedDocuments = filteredDocuments.slice(0, (currentPage ?? 1) * documentsPerPage);

    const loadMoreDocuments = () => {
        setCurrentPage(prevPage => (prevPage ?? 1) + 1);
    };
    return (
        <>
            <section className="p-3 sm:p-4 rounded-2xl bg-card border border-border/80 shadow-xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="w-full md:w-[360px] relative">
                    <Input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher par titre, matière..."
                        className="w-full pl-9 h-10 rounded-xl bg-background/60"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5 items-center">
                    <Select onValueChange={(value) => handleSortByCategory(value)} value={selectedCategory}>
                        <SelectTrigger className="w-full sm:w-[200px] h-10 rounded-xl">
                            <SelectValue placeholder="Toutes les catégories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Toutes les catégories</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.value}>
                                    {category.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => handleSortBySector(value)} value={selectedSector}>
                        <SelectTrigger className="w-full sm:w-[200px] h-10 rounded-xl">
                            <SelectValue placeholder="Toutes les filières" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Toutes les filières</SelectItem>
                            {sectors.map((sector) => (
                                <SelectItem key={sector.id} value={sector.value}>
                                    {sector.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </section>
            {displayedDocuments.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-12">
                    {displayedDocuments.map((document) => (
                        <DocumentCard
                            key={document.id}
                            id={document.id}
                            document={document}
                        />
                    ))}
                </div>
            )}
            {displayedDocuments.length === 0 && (
                <div className="flex justify-center gap-3 flex-col items-center py-20 px-4 border border-dashed rounded-2xl border-border bg-card/40 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-muted/60 text-muted-foreground flex items-center justify-center">
                        <BookText size={28} />
                    </div>
                    <p className="text-lg font-bold text-foreground">Aucun document trouvé</p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Essayez de modifier votre recherche ou vos filtres pour trouver le document souhaité.
                    </p>
                </div>
            )}
            <div className="flex justify-center mt-5 gap-3 my-5">
                {/*<Pagination>
                    <PaginationContent>
                        {Array.from({length: Math.ceil(filteredDocuments.length / documentsPerPage)}, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={i + 1 === currentPage}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`cursor-pointer ${cn(buttonVariants({variant: i + 1 === currentPage ? "link" : "ghost", size: "icon"}))}`}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>*/}
                {displayedDocuments.length < filteredDocuments.length && (
                    <div className="flex justify-center mt-5">
                        <Button variant={"outline"} onClick={loadMoreDocuments}>Charger plus de documents</Button>
                    </div>
                )}
            </div>
        </>
    );
}