"use client";
import React from 'react'
import { DashboardWrapper } from './dashboard-wrapper'
import { Input } from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription} from "@/components/ui/form";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import {useForm} from "react-hook-form";
import { z } from "zod";
import { DocumentsSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { useState, useTransition,  } from "react";
import { Textarea } from '@/components/ui/textarea';
import { storage } from '@/firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDocument } from '@/actions/document';
import { FormError } from '@/components/ui/form-error';
import { FormSuccess } from '@/components/ui/form-success';

export default function AddDocumentForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string|undefined>();
    const [success, setSuccess] = useState<string|undefined>();
    const [fileName, setFileName] = useState<string|undefined>();
    const form = useForm<z.infer<typeof DocumentsSchema>>({
        resolver: zodResolver(DocumentsSchema),
        defaultValues:{
            title:"",
            description:"",
            sector:"",
            category:"",
            fileURL:"",
            fileType:""
        }
    });

    const handleFileUpload = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(file){
            if(file?.size > 5242880){
                return setError("La taille du fichier ne doit pas dépasser 5 Mo.");
            }
            setFileName(file.name);
            const storageRef = ref(storage, `/documents/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const fileURL = await getDownloadURL(snapshot.ref);
            form.setValue("fileURL", fileURL);
            form.setValue("fileType", file.type);
        }
    }

    const onSubmit = async (data: z.infer<typeof DocumentsSchema>) => {
        setError("");
        setSuccess("");
        if(fileName === undefined){
            setError("Veuillez sélectionner un fichier à publier.");
            return false;
        }
        startTransition(()=>{
           addDocument(data).then((res)=>{
            setError(res?.error);
            setSuccess(res?.success);
           })
        })
    }
  return (
    <>
        <DashboardWrapper
            title="Ajouter un document"
            headerMessage="Participe à l'enrichissement de la bibliothèque de l'ESIAC en ajoutant un document."
            path={[
                {name: "Documents", href: "/dashboard/documents"},
                {name: "Ajouter un document", href: "/dashboard/documents/new"}
            ]}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-3xl pb-8'>
                    <div className="space-y-4">
                        <FormField control={form.control} name="title" render={({field})=>(
                            <FormItem>
                            <FormLabel>Titre du document : </FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} placeholder="Donnez un titre à votre document" type="text"/>
                            </FormControl>
                            <FormMessage className="text-sm"/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="description" render={({field})=>(
                            <FormItem>
                            <FormLabel>Description : </FormLabel>
                            <FormControl>
                                <Textarea {...field} disabled={isPending} placeholder="Donnez une description à votre document"/>
                            </FormControl>
                            <FormMessage className="text-sm"/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="sector" render={({field})=>(
                            <FormItem className='flex flex-col gap-1'>
                                <FormLabel>Filière : </FormLabel>
                                <Select onValueChange={field.onChange}>
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
                        )}/>
                        <FormField control={form.control} name="category" render={({field})=>(
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
                        )}/>
                        <div className='space-y-2'>
                            <FormLabel>Sélectionnez le document à publier : </FormLabel>
                            <Input  disabled={isPending} placeholder="Donnez un titre à votre document" type="file" onChange={handleFileUpload} required/>
                        </div>
                    </div>
                    <div className='my-2'>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                    </div>
                    <Button type="submit" disabled={isPending} className="w-full sm:w-fit mt-4">Créer un document</Button>
                </form>
            </Form>
        </DashboardWrapper>
    </>
  )
}