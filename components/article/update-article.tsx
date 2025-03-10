"use client";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateArticleSchema } from "@/schemas";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { ArticleWithIncludes } from "@/types";
import Image from "next/image";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Sector, Tag } from "@prisma/client";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { updateArticle } from "@/actions/article";
import { getStringOfFile } from "@/firebase/functions";

export default function UpdateArticle({
	article,
	sectors,
	tags,
}: {
	article: ArticleWithIncludes;
	sectors: Sector[];
	tags: Tag[];
}) {
	const tagsList = tags.map((tag) => ({
		label: tag.label,
		value: tag.value,
	}));
	const defaultTags = article.tags.map((tag) => tag.value);
	const form = useForm<z.infer<typeof UpdateArticleSchema>>({
		resolver: zodResolver(UpdateArticleSchema),
		defaultValues: {
			title: article.title,
			sector: article.sector,
			tags: defaultTags,
			image: article.image,
		},
	});
	const [imgURL, setImgURL] = useState(article.image);
	const [imgFile, setImgFile] = useState<File>();
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
	const [isPending, startTransition] = useTransition();

	const onSubmit = (data: z.infer<typeof UpdateArticleSchema>) => {
		startTransition(async () => {
			if (!imgFile) {
				form.setValue("image", article.image);
			} else {
				data.image = await getStringOfFile(imgFile, `articles/images/${article.slug}`);
			}
            updateArticle(article.id, data).then((res) => {
                if (res?.error) {
                    setError(res.error);
                } else {
                    setSuccess(res!.success as string);
                }
            });
		});
	};
	return (
			<DashboardWrapper
				title="Mettre à jour un article"
				message="Remplissez les informations ci-dessous pour mettre à jour un article."
				path={[
					{ name: "Articles", href: "/dashboard/articles" },
					{
						name: article.title,
						href: `/dashboard/articles/${article.id}/edit`,
					},
				]}
			>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Titre</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
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
								defaultValue={article.sector}
								{...field}
							>
								<SelectTrigger>
									<SelectValue placeholder="Selectionnez une filière :" />
								</SelectTrigger>
								<SelectContent>
									{sectors.map((sector, index) => (
										<SelectItem
											key={index}
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
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tags</FormLabel>
							<FormControl>
								<MultiSelect
									options={tagsList}
									onValueChange={(tags) => {
										field.onChange(tags);
									}}
									defaultValue={article.tags.map((tag) => tag.value)}
									placeholder="Sélectionnez les tags"
									variant="default"
									maxCount={3}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					disabled={isPending}
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel
								htmlFor="image"
								className={`w-fit ${
									isPending
										? "cursor-not-allowed pointer-events-none"
										: "cursor-pointer"
								}`}
							>
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
												Cliquez pour ajouter une image
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
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										setImgFile(file);
										const imageURL =
											URL.createObjectURL(file);
										setImgURL(imageURL);
										field.onChange(file.name);
									}
								}}
							/>
							<FormDescription>
								Choisissez une image pour l&#039;article.
							</FormDescription>
							<FormMessage className="text-sm" />
						</FormItem>
					)}
				/>
				<div className="space-y-4 mt-[30px] pb-[50px]">
					{error && <FormError message={error} />}
					{success && <FormSuccess message={success} />}
					<Button disabled={isPending} type={"submit"}>
						{isPending && (
							<Loader2 className="animate-spin" size={18} />
						)}
						Mettre à jour l{"'"}article
					</Button>
				</div>
			</form>
		</Form>
		</DashboardWrapper>
	);
}
