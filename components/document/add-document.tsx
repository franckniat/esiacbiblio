"use client";
import React, {useState, useTransition} from "react";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {DocumentsSchema} from "@/schemas";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {addDocument} from "@/actions/document";
import {FormError} from "@/components/ui/form-error";
import {FormSuccess} from "@/components/ui/form-success";
import DashboardWrapper from "../dashboard/dashboard-wrapper";
import {getStringOfFile} from "@/firebase/functions";
import {Category, Sector} from "@prisma/client";
import {useLocalStorage} from "usehooks-ts";
import {useRouter} from "next/navigation";


export default function AddDocument({
	categories,
	sectors
}:{
	categories: Category[],
	sectors: Sector[]
}) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [file, setFile] = useState<File | undefined>();
	const [value, setValue, removeValue] = useLocalStorage<z.infer<typeof DocumentsSchema>>('new document', {
		title: "",
		description: "",
		sector: "",
		category: "",
		fileURL: ""
	});
	const router = useRouter();
	const form = useForm<z.infer<typeof DocumentsSchema>>({
		resolver: zodResolver(DocumentsSchema),
		defaultValues: {
			title: value?.title,
			description: value?.description,
			sector: value?.sector,
			category: value?.category,
			fileURL: ""
		},
	});

	form.watch((value) => {
		setValue(value as z.infer<typeof DocumentsSchema>);
	});
	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file?.size > 5242880) {
				return setError(
					"La taille du fichier ne doit pas dépasser 5 Mo."
				);
			}
			if (file?.type !== "application/pdf") {
				return setError("Le fichier doit être un document PDF.");
			}
            setFile(file);
			form.setValue('fileURL', new URL(file.name, "http://localhost:3000").href);
		}
	};

	const onSubmit = async (document: z.infer<typeof DocumentsSchema>) => {
		if (!file) {
			return setError("Veuillez sélectionner un fichier à publier !");
		}
		setError("");
		setSuccess("");
		startTransition(async () => {
			if (file) {
				document.fileURL = await getStringOfFile(file, `documents/${document.title}`);
			}
			addDocument(document).then((res) => {
				setError(res?.error);
				setSuccess(res?.success);
			});
			removeValue()
		});
	};
	return (
		<div className={""}>
			<DashboardWrapper
				title="Ajouter un document"
				message="Participe à l'enrichissement de la bibliothèque de l'ESIAC en ajoutant un document."
				path={[
					{ name: "Documents", href: "/dashboard/documents" },
					{
						name: "Ajouter un document",
						href: "/dashboard/documents/new",
					},
				]}
			>
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
										<Select onValueChange={field.onChange} defaultValue={field.value}>
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
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="fileURL"
									render={() => (
										<FormItem>
											<FormLabel>
												Sélectionnez le document à publier :{" "}
											</FormLabel>
											<Input
												disabled={isPending}
												placeholder="Donnez un titre à votre document"
												type="file"
												accept=".pdf"
												onChange={handleFileUpload}
											/>
											<FormDescription>
												Le fichier doit être un document PDF et ne doit pas
												dépasser 5 Mo.
											</FormDescription>
											<FormMessage className="text-sm" />
										</FormItem>
									)}
								/>
							</div>
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
								Créer un document
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
			</DashboardWrapper>
		</div>
	);
}
