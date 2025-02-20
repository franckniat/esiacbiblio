/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormDescription,
	FormLabel,
	FormMessage,
	FormItem,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { AddArticleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Router } from "lucide-react";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCreateBlockNote } from "@blocknote/react";
import { locales } from "@blocknote/core";
import { useLocalStorage } from "usehooks-ts";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { MultiSelect } from "@/components/ui/multi-select";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Sector, Tag } from "@prisma/client";
import { createArticle } from "@/actions/article";
import { getStringOfFile } from "@/firebase/functions";
import { nanoid } from 'nanoid';
import { useRouter } from "next/navigation";

const BlockNoteEditor = dynamic(() => import("@/components/article/editor"), {
	ssr: false,
});

export default function AddArticle({
	tags,
	sectors,
}: {
	tags: Tag[];
	sectors: Sector[];
}) {
	const [isPending, startTransaction] = React.useTransition();
	const [error, setError] = React.useState<string | undefined>();
	const [success, setSuccess] = React.useState<string | undefined>();
	const [imgURL, setImgURL] = React.useState<string>("");
	const [imgFile, setImgFile] = React.useState<File>();
	const router = useRouter()
	const [newArticleStore, setNewArticleStore, clearNewArticleStore] = useLocalStorage<
		z.infer<typeof AddArticleSchema>
	>("new-article", {
		title: "",
		tags: [],
		content: "",
		image: "",
		sector: "",
	});
	const form = useForm<z.infer<typeof AddArticleSchema>>({
		resolver: zodResolver(AddArticleSchema),
		defaultValues: {
			title: newArticleStore.title,
			tags: newArticleStore.tags,
			content: newArticleStore.content,
			image: "123",
			sector: newArticleStore.sector,
		},
	});
	form.watch((value) => {
		setNewArticleStore(value as z.infer<typeof AddArticleSchema>);
	});

	const normalizeString = (str: string) => {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	};

	const tagsList = tags.map((tag) => {
		return {
			label: tag.label,
			value: tag.value,
		};
	});

	const editor = useCreateBlockNote({
		dictionary: locales.fr,
	});

	const onChange = async () => {
		const markdown = await editor.blocksToMarkdownLossy(editor.document);
		setNewArticleStore({
			...newArticleStore,
			content: markdown,
		});
		form.setValue("content", markdown);
	};

	const onSubmit = async (data: z.infer<typeof AddArticleSchema>) => {
		startTransaction(async() => {
			if (!imgFile) {
				setError("Veuillez ajouter une image pour l'article.");
				return;
			}
			if(!data.content) {
				setError("Veuillez ajouter du contenu à l'article.");
			}
			const articleSlug = normalizeString(data.title)
						.toLowerCase()
						.replace(/[^a-z0-9\s-]/g, '')
						.replace(/\s+/g, '-')
						.replace(/-+$/, '') + '-' + nanoid(8);
			data.image = await getStringOfFile(imgFile, `articles/images/${articleSlug}`)
			createArticle(data).then((res) => {
				if (res?.error) {
					setError(res.error);
				} else if (res?.success) {
					setSuccess(res.success)
					form.reset();
					clearNewArticleStore();
					router.push("/dashboard/articles");
				}
			})
		})
	};
	return (
		<>
			<DashboardWrapper
				title="Créer un article"
				message="Remplissez les informations ci-dessous pour créer un nouvel article."
				path={[
					{ name: "Articles", href: "/dashboard/articles" },
					{
						name: "Créer un article",
						href: "/dashboard/articles/new",
					},
				]}
			>
				<Form {...form}>
					<form
						className="pb-10"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="flex flex-col gap-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Intitulé de l&#39; article :{" "}
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder="Titre de mon nouvel article"
												type="text"
											/>
										</FormControl>
										<FormDescription>
											Donnez un titre à votre article.
										</FormDescription>
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
										<Select
											onValueChange={field.onChange}
											disabled={isPending}
											defaultValue={
												newArticleStore.sector
											}
											{...field}
										>
											<SelectTrigger>
												<SelectValue placeholder="Selectionnez une filière :" />
											</SelectTrigger>
											<SelectContent>
												{sectors.map(
													(sector, index) => (
														<SelectItem
															key={index}
															value={sector.value}
														>
															{sector.label}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tags"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tags : </FormLabel>
										<FormControl>
											<MultiSelect
												options={tagsList}
												onValueChange={(tags) => {
													field.onChange(tags);
												}}
												defaultValue={
													newArticleStore.tags
												}
												placeholder="Sélectionnez les tags"
												variant="default"
												maxCount={3}
											/>
										</FormControl>
										<FormDescription>
											Les tags permettent de classer vos
											articles. Vous ne pouvez ajouter que 3 tags.
										</FormDescription>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="image"
								disabled={isPending}
								render={({ field }) => (
									<FormItem className="flex flex-col col-span-2">
										<FormLabel htmlFor="image" className={`${isPending ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"}`} >
											Bannière de l&#39; article :
											{imgURL && (
												<div className="w-full mt-4">
													<Image
														alt="Image de l'article"
														src={imgURL}
														className="w-full max-h-[400px] max-w-[600px] h-auto object-cover rounded-md p-1 border-2 border-foreground/10"
														width={500}
														height={500}
													/>
												</div>
											)}
											{!imgURL && (
												<div className="h-[200px] border border-dashed border-foreground/30 mt-3 rounded-md">
													<div className="flex items-center justify-center w-full h-full cursor-pointer">
														<span className="text-primary">
															Cliquez pour ajouter
															une image
														</span>
													</div>
												</div>
											)}
										</FormLabel>
										<Input
											type="file"
											disabled={isPending}
											className="hidden"
											id="image"
											accept={"image/*"}
											onChange={(e)=>{
												const file = e.target.files?.[0];
												if (file) {
													setImgFile(file);
													const imageURL = URL.createObjectURL(file);
													setImgURL(imageURL);
													field.onChange(file.name);
													setNewArticleStore({
														...newArticleStore,
														image: file.name,
													});
												}
											}}
										/>
										<FormDescription>
											Choisissez une image pour
											l&#039;article.
										</FormDescription>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<FormItem>
								<FormLabel htmlFor={"editor"}>
									Contenu de l&#39;article :{" "}
								</FormLabel>
								<BlockNoteEditor
									editor={editor}
									onChange={onChange}
									defaultValue={newArticleStore.content}
								/>
								<FormDescription>
									Rédigez le contenu de votre article.
								</FormDescription>
								<FormMessage className="text-sm" />
							</FormItem>
						</div>
						<div className="space-y-4 mt-[30px]">
							<FormError message={error} />
							<FormSuccess message={success} />
							<Button disabled={isPending} type={"submit"}>
								{isPending && (
									<Loader2
										className="animate-spin"
										size={18}
									/>
								)}
								Créer l{"'"}article
							</Button>
						</div>
					</form>
				</Form>
			</DashboardWrapper>
		</>
	);
}
