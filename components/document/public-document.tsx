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
} from "@/components/ui/select"


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
    const [search, setSearch] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const documentsPerPage = 8;
    const [filteredDocuments, setFilteredDocuments] = React.useState<DocumentWithUserAndLikes[]>(documents);
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
    const [selectedSector, setSelectedSector] = React.useState<string>("all");
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
    const displayedDocuments = filteredDocuments.slice(0, currentPage * documentsPerPage);

    const loadMoreDocuments = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
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
                <Select onValueChange={(value) => {
                    handleSortByCategory(value);
                }}>
                    <SelectTrigger className={"w-fit"}>
                        <SelectValue placeholder="Sélectionnez une catégorie"/>
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
                <Select onValueChange={(value) => {
                    handleSortBySector(value);
                }}>
                    <SelectTrigger className={"w-fit"}>
                        <SelectValue placeholder="Sélectionnez une filière"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Toutes les catégories</SelectItem>
                        {sectors.map((sector) => (
                            <SelectItem key={sector.id} value={sector.value}>
                                {sector.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </section>
            {displayedDocuments.length > 0 &&
                <div className="px-2 md:px-5 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-10">
                    {displayedDocuments.map((document, index) => (
                        <DocumentCard
                            key={index}
                            id={document.id}
                            document={document}
                        />
                    ))}
                </div>
            }
            {displayedDocuments.length === 0 &&
                <div
                    className="flex justify-center gap-3 flex-col items-center mt-5 h-[300px] border border-dashed rounded-md border-foreground/30 text-foreground/40">
                    <BookText size={40}/>
                    <p className="text-lg">Aucun document trouvé.</p>
                </div>
            }
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