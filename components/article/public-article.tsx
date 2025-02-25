"use client";
import {Tag, Sector} from "@prisma/client";
import * as React from "react";
import ArticleCard from "@/components/article/index";
import {Input} from "@/components/ui/input";
import {ScrollText, Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import { ArticleWithIncludes } from "@/types";

interface PublicArticlesProps {
    articles: ArticleWithIncludes[];
    sectors: Sector[];
    tags: Tag[];
}

export default function PublicArticles({articles, tags, sectors}: PublicArticlesProps) {
    const [search, setSearch] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const documentsPerPage = 8;
    const [filteredArticles, setFilteredArticles] = React.useState<ArticleWithIncludes[]>(articles);
    const [selectedTag, setSelectedTag] = React.useState<string>("all");
    const [selectedSector, setSelectedSector] = React.useState<string>("all");

    React.useEffect(() => {
        let filtered = articles;
        if (search) {
            filtered = filtered.filter((article) =>
                article.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedSector !== "all") {
            filtered = filtered.filter((article) => article.sector === selectedSector);
        }
        setFilteredArticles(filtered);
    }, [search, articles, selectedTag, selectedSector]);

    const handleSortByCategory = (category: string) => {
        setSelectedTag(category);
    };

    const handleSortBySector = (sector: string) => {
        setSelectedSector(sector);
    };
    const displayedArticles = filteredArticles.slice(0, currentPage * documentsPerPage);

    const loadMoreArticles = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
    return (
        <main className="max-w-[1340px] mx-auto px-2">
            <section
                className="px-3 md:px-0 mt-5 flex-wrap sm:flex-nowrap flex items-center gap-2 justify-center md:justify-end">
                <div className="flex flex-col sm:flex-row gap-2 items-center relative">
                    <Input
                        type="search"
                        onChange={
                            (e) => setSearch(e.target.value)
                        }
                        placeholder="Rechercher un article"
                        className="w-full sm:w-[400px] pl-7"
                    />
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-foreground/50" size={17}/>
                </div>
                <Select onValueChange={(value) => {
                    handleSortByCategory(value);
                }}>
                    <SelectTrigger className={"w-fit"}>
                        <SelectValue placeholder="Sélectionnez un tag"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Toutes les tags</SelectItem>
                        {tags.map((tag) => (
                            <SelectItem key={tag.id} value={tag.id}>
                                {tag.value}
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
                        <SelectItem value="all">Toutes les filières</SelectItem>
                        {sectors.map((sector) => (
                            <SelectItem key={sector.id} value={sector.id}>
                                {sector.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </section>
            {displayedArticles.length > 0 &&
                <section className="px-2 md:px-5 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pb-10">
                    {displayedArticles.map((article) => (
                        <ArticleCard article={article} key={article.id}/>
                    ))}
                </section>
            }
            {displayedArticles.length === 0 &&
                <div className="flex justify-center gap-3 flex-col items-center mt-5 h-[300px] border border-dashed rounded-md border-foreground/30 text-foreground/50">
                    <ScrollText size={40}/>
                    <p className="text-lg">Aucun article trouvé.</p>
                </div>
            }
            <div className="flex justify-center mt-5 gap-3 my-5">
                {displayedArticles.length < filteredArticles.length && (
                    <div className="flex justify-center mt-5">
                        <Button variant={"outline"} onClick={loadMoreArticles}>Charger plus d&#039;articles</Button>
                    </div>
                )}
            </div>
        </main>
    )
}