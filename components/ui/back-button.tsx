"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton(){
    const router = useRouter();
    return(
        <div className="hidden sm:flex" title="Retour à la page précédente">
            <Button
                variant="ghost"
                className="absolute top-[60px] left-[60px] rounded-md py-5 px-5 gap-2 flex group"
                onClick={() => router.back()}
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
                <span className="text-sm">Retour</span>
            </Button>
        </div>
    )
}