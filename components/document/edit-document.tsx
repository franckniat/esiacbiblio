"use client";

import {Category, Document, Sector} from "@prisma/client";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FormError} from "@/components/ui/form-error";
import {FormSuccess} from "@/components/ui/form-success";
import {Button} from "@/components/ui/button";
import React, {useState, useTransition} from "react";
import {useLocalStorage} from "usehooks-ts";
import * as z from "zod";
import {UpdateDocumentSchema} from "@/schemas";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateDocument} from "@/actions/document";

export default function EditDocumentForm({id, document, sectors, categories}: {id:string, document: Document, sectors:Sector[], categories: Category[]}) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [value, setValue, removeValue] = useLocalStorage<z.infer<typeof UpdateDocumentSchema>>('update document', {
        title: document.title,
        description: document.description,
        sector: document.sector,
        category: document.category,
    });
    const router = useRouter();
    const form = useForm<z.infer<typeof UpdateDocumentSchema>>({
        resolver: zodResolver(UpdateDocumentSchema),
        defaultValues: {
            title: value?.title,
            description: value?.description,
            sector: value?.sector,
            category: value?.category,
        },
    });

    form.watch((value) => {
        setValue(value as z.infer<typeof UpdateDocumentSchema>);
    });

    const onSubmit = async (document: z.infer<typeof UpdateDocumentSchema>) => {
        setError("");
        setSuccess("");
        startTransition(async () => {
            updateDocument(id, document).then((response) => {
                if (response?.error) {
                    setError(response.error);
                    return;
                }
                setSuccess(response?.success);
            })
            removeValue()
        });
    };
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="pb-8"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Titre du document :{" "}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Donnez un titre à votre document"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description : </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Donnez une description à votre document"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sector"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1">
                                    <FormLabel>Filière : </FormLabel>
                                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionnez une filière :" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sectors.map((sector) => (
                                                <SelectItem
                                                    key={sector.value}
                                                    value={sector.value}
                                                >
                                                    {sector.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-1">
                                    <FormLabel>Catégorie : </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isPending}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionnez une catégorie :" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.value}
                                                    value={category.value}
                                                >
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="my-2">
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </div>
                    <div className={"flex items-center gap-3"}>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full sm:w-fit mt-4"
                        >
                            Modifier le document
                        </Button>
                        <Button
                            disabled={isPending}
                            variant={"outline"}
                            className="w-full sm:w-fit mt-4"
                            onClick={()=> {
                                removeValue();
                                setError("");
                                router.back();
                            }}
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}