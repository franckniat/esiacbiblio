"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSearch() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/documents?title=${encodeURIComponent(trimmed)}`);
        } else {
            router.push("/documents");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            role="search"
            className="w-full max-w-2xl mx-auto flex items-center gap-2 p-1.5 rounded-full bg-card/80 backdrop-blur-md border border-border hover:border-primary/40 focus-within:border-primary/60 transition-colors shadow-xs"
        >
            <label htmlFor="hero-search" className="sr-only">
                Rechercher un document
            </label>
            <div className="pl-4">
                <Search className="w-5 h-5 text-primary" />
            </div>
            <input
                id="hero-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un cours, une annale, un mémoire..."
                className="w-full bg-transparent px-2 py-2 text-sm sm:text-base outline-none placeholder:text-muted-foreground/70 text-foreground"
            />
            <Button
                type="submit"
                variant="success"
                className="shrink-0 rounded-full font-semibold gap-1.5 h-10 sm:h-11 px-5 sm:px-7"
            >
                <span className="hidden sm:inline">Rechercher</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
        </form>
    );
}
