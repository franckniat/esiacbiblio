"use client";
import React from "react";
import DashboardFormWrapper from "./dashboard-form-wrapper";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  

export default function UserPreferences() {
    const {setTheme} = useTheme();
    return (
        <>
            <DashboardFormWrapper
                title="Modifier vos préférences"
                headerMessage="Personnalisez votre expérience utilisateur."
                className="mt-3 flex flex-col gap-6"
            >
                <div className="space-y-3">
                    <h1 className="text-sm font-medium">Thème : </h1>
                    <div className="flex gap-3 flex-col sm:flex-row">
                        <Image
                            alt="Illustration thème clair"
                            src={"/images/bibliolight.png"}
                            width={300}
                            height={200}
                            className="border-4 border-slate-300 dark:border-slate-700 rounded-md focus:ring-4 focus:ring-slate-400 dark:focus:ring-slate-700 hover:opacity-90"
                            onClick={()=>setTheme("light")}
                        />
                        <Image
                            alt="Illustration thème clair"
                            src={"/images/bibliodark.png"}
                            width={300}
                            height={200}
                            className="border-4 border-slate-300 dark:border-slate-700 rounded-md focus:ring-4 focus:ring-slate-400 dark:focus:ring-slate-700 hover:opacity-90"
                            onClick={()=>setTheme("dark")}
                        />
                    </div>
                </div>
                <div className="space-y-3 max-w-lg mt-3">
                    <h1 className="text-sm font-medium">Langue : </h1>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Choisissez une langue"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fr">🇫🇷Français</SelectItem>
                            <SelectItem value="en">🇺🇸Anglais</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
            </DashboardFormWrapper>
        </>
    );
}
