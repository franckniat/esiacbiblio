"use client";
import React from 'react'
import { DashboardWrapper } from './dashboard-wrapper'
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DocumentsSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { useState, useTransition, } from "react";
import { Textarea } from '@/components/ui/textarea';
import { updateDocument } from '@/actions/document';
import { FormError } from '@/components/ui/form-error';
import { FormSuccess } from '@/components/ui/form-success';
import { getStringOfFile } from '@/firebase/functions';

interface UpdateDocumentFormProps {
    id: string;
    title: string | null;
    description: string | null;
    sector: string | null;
    category: string | null;
    fileURL: string | null;
}

export default function UpdateDocumentForm({id, title, description, sector, category, fileURL }: UpdateDocumentFormProps) {
    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [file, setFile] = useState<File | undefined>();

    const form = useForm<z.infer<typeof DocumentsSchema>>({
        resolver: zodResolver(DocumentsSchema),
        defaultValues: {
            title: title || "",
            description: description || "",
            sector: sector || "",
            category: category || "",
            fileURL: fileURL || "",
        }
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file?.size > 5242880) {
                return setError("La taille du fichier ne doit pas dépasser 5 Mo.");
            }
            setFile(file);
        }
    }

    const onSubmit = async (document: z.infer<typeof DocumentsSchema>) => {
        console.log(document)
        setError("");
        setSuccess("");
        startTransition(async() => {
            if (file) {
                const fileURL = await getStringOfFile(file, `documents/${title?.trim().replace(/\s/g, "-")}`);
                document.fileURL = fileURL;
            }
            updateDocument(id, document).then((res) => {
                setError(res?.error);
                setSuccess(res?.success);
            })
        })
    }
    return (
        <>
            <DashboardWrapper
                title="Modifier le document"
                headerMessage="Vous etes sur le point de modifier les données concernant votre document."
                path={[
                    { name: "Documents", href: "/dashboard/documents" },
                    { name: "Modifier le document", href: `/dashboard/documents/edit/${id}` }
                ]}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-3xl pb-8'>
                        <div className="space-y-4">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre du document : </FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder="Donnez un titre à votre document" type="text" />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description : </FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isPending} placeholder="Donnez une description à votre document" />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="sector" render={({ field }) => (
                                <FormItem className='flex flex-col gap-1'>
                                    <FormLabel>Filière : </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionnez une filière :" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Génie informatique">Génie informatique</SelectItem>
                                            <SelectItem value="Génie civil">Génie civil</SelectItem>
                                            <SelectItem value="Génie électrique">Génie électrique</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="category" render={({ field }) => (
                                <FormItem className='flex flex-col gap-1'>
                                    <FormLabel>Catégorie : </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionnez une catégorie :" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Cours">Cours</SelectItem>
                                            <SelectItem value="Exposés">Exposés</SelectItem>
                                            <SelectItem value="Mémoires">Mémoires</SelectItem>
                                            <SelectItem value="Rapport de stage">Rapport de stage</SelectItem>
                                            <SelectItem value="Travaux pratiques">Travaux pratiques</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className='space-y-2'>
                                <FormLabel>Sélectionnez le document à publier : </FormLabel>
                                <Input disabled={isPending} placeholder="Donnez un titre à votre document" type="file" onChange={handleFileUpload} />
                            </div>
                        </div>
                        <div className='my-2'>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                        </div>
                        <Button type="submit" disabled={isPending} className="w-full sm:w-fit mt-4">Créer un document</Button>
                    </form>
                </Form>
            </DashboardWrapper>
        </>
    )
}
