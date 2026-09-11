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
            className="w-full max-w-2xl mx-auto flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-background/80 backdrop-blur-md border border-border shadow-lg shadow-primary/5 hover:border-primary/40 transition-all"
        >
            <div className="pl-3 text-muted-foreground">
                <Search className="w-5 h-5 text-emerald-500" />
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un rapport, un cours de génie logiciel, un examen..."
                className="w-full bg-transparent px-2 py-2 text-sm sm:text-base outline-none placeholder:text-muted-foreground/70 text-foreground"
            />
            <Button
                type="submit"
                variant="success"
                className="shrink-0 rounded-xl font-medium gap-1.5 h-10 sm:h-11 px-4 sm:px-6 shadow-xs"
            >
                <span className="hidden sm:inline">Rechercher</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
        </form>
    );
}
