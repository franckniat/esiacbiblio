/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {Tag, Sector} from "@prisma/client";
import * as React from "react";
import ArticleCard from "@/components/article/index";
import {Input} from "@/components/ui/input";
import {ScrollText, Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import { ArticleWithIncludes } from "@/types";
import { useQueryState, parseAsInteger } from 'nuqs';

interface PublicArticlesProps {
    articles: ArticleWithIncludes[];
    sectors: Sector[];
    tags: Tag[];
}

export default function PublicArticles({articles, tags, sectors}: PublicArticlesProps) {
    const [search, setSearch] = useQueryState("title");
    const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger);
    const documentsPerPage = 8;
    const [filteredArticles, setFilteredArticles] = React.useState<ArticleWithIncludes[]>(articles);
    const [selectedTag, setSelectedTag] = useQueryState("tag", {defaultValue: "all"});
    const [selectedSector, setSelectedSector] = useQueryState("sector", {defaultValue: "all"});

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
    const displayedArticles = filteredArticles.slice(0, (currentPage ?? 1) * documentsPerPage);

    const loadMoreArticles = () => {
        setCurrentPage(prevPage => (prevPage ?? 1) + 1);
    };
    return (
        <div>
            <section className="p-3 sm:p-4 rounded-2xl bg-card border border-border/80 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="w-full sm:w-[380px] relative">
                    <Input
                        type="search"
                        value={search ?? ""}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher par titre ou sujet..."
                        className="w-full pl-9 h-10 rounded-xl bg-background/60"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                </div>
            </section>
            {displayedArticles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-12">
                    {displayedArticles.map((article) => (
                        <ArticleCard article={article} key={article.id} />
                    ))}
                </div>
            )}
            {displayedArticles.length === 0 && (
                <div className="flex justify-center gap-3 flex-col items-center py-20 px-4 border border-dashed rounded-2xl border-border bg-card/40 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-muted/60 text-muted-foreground flex items-center justify-center">
                        <ScrollText size={28} />
                    </div>
                    <p className="text-lg font-bold text-foreground">Aucun article trouvé</p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Aucun article ne correspond à vos critères de recherche.
                    </p>
                </div>
            )}
            <div className="flex justify-center mt-5 gap-3 my-5">
                {displayedArticles.length < filteredArticles.length && (
                    <div className="flex justify-center mt-5">
                        <Button variant={"outline"} onClick={loadMoreArticles} className="rounded-xl px-6">
                            Charger plus d&apos;articles
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}