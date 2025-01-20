"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export const SortData = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-2 items-center relative">
            <Input type="search" placeholder="Rechercher un document" className="w-full sm:w-[400px] pl-7" />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-foreground/50" size={17} />
            <Select>
                <SelectTrigger className="w-full sm:w-[250px]">
                    <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name">Popularité</SelectItem>
                    <SelectItem value="date">Date d&apos;ajout</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}